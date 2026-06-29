"""CSV Parser for Estonian bank transaction exports.

Supports Swedbank EE, SEB, and LHV CSV formats.
Detects recurring transactions (subscriptions) by amount + merchant name.
"""
from __future__ import annotations

import csv
import io
import re
from collections import defaultdict
from datetime import datetime, timedelta
from typing import Optional

from app.schemas.schemas import (
    CSVParseResponse,
    DetectedSubscription,
    ParsedTransaction,
)


# --- Date parsing ---

_DATE_PATTERNS = [
    (re.compile(r"^\d{2}\.\d{2}\.\d{4}$"), "%d.%m.%Y"),     # DD.MM.YYYY
    (re.compile(r"^\d{4}-\d{2}-\d{2}$"), "%Y-%m-%d"),        # YYYY-MM-DD
    (re.compile(r"^\d{2}/\d{2}/\d{4}$"), "%d/%m/%Y"),        # DD/MM/YYYY
]


def _parse_date(date_str: str) -> datetime | None:
    """Try multiple date formats, return datetime or None."""
    date_str = date_str.strip()
    for pattern, fmt in _DATE_PATTERNS:
        if pattern.match(date_str):
            try:
                return datetime.strptime(date_str, fmt)
            except ValueError:
                continue
    return None


# --- Amount normalization ---

def _normalize_amount(value) -> float:
    """Normalize amount to negative float (outgoing payment).

    Bank exports mix conventions — some have positive amounts with a separate
    "type" column, others use negative numbers directly. We normalise
    everything so outgoing = negative.
    """
    if isinstance(value, (int, float)):
        return -abs(float(value))

    s = str(value).strip().replace(",", ".").replace(" ", "")
    try:
        num = float(s)
        return -abs(num)
    except (ValueError, TypeError):
        return 0.0


# --- Bank type detection ---

# Key identifying headers for each bank (at least 3 must match)
_SWBEDBANK_KEYS = {"kuupäev", "kirjeldus", "summa", "valuuta", "laekumine/makse"}
_SEB_KEYS = {"date", "description", "amount", "type", "balance"}
_LHV_KEYS = {"booking date", "beneficiary/payer name", "amount", "currency", "payment type"}

_MATCH_THRESHOLD = 3


def _detect_bank_type(content: str) -> str | None:
    """Detect bank type from CSV header line."""
    header_line = content.split("\n")[0].lower().strip().replace('"', "")
    # Strip BOM if present at start of line
    if header_line.startswith("\ufeff"):
        header_line = header_line[1:]
    # Split on both comma and semicolon to handle all formats
    header_set = {h.strip() for h in re.split(r"[;,]", header_line)}

    # Count matching keywords for each bank
    swed_score = len(_SWBEDBANK_KEYS & header_set)
    seb_score = len(_SEB_KEYS & header_set)
    lhv_score = len(_LHV_KEYS & header_set)

    scores = [("swedbank", swed_score), ("seb", seb_score), ("lhv", lhv_score)]
    scores.sort(key=lambda x: x[1], reverse=True)

    if scores[0][1] >= _MATCH_THRESHOLD:
        return scores[0][0]
    return None


# --- Swedbank EE parser ---

def _parse_swedbank_csv(raw_bytes: bytes) -> list[ParsedTransaction]:
    """Parse Swedbank EE CSV (semicolon delimited, UTF-8 with BOM)."""
    text = raw_bytes.decode("utf-8-sig")
    # Strip any remaining BOM character from the start
    if text.startswith("\ufeff"):
        text = text[1:]
    reader = csv.DictReader(io.StringIO(text), delimiter=";")

    transactions: list[ParsedTransaction] = []
    for row in reader:
        date = _parse_date(row.get("Kuupäev", ""))
        if date is None:
            continue

        desc = row.get("Kirjeldus", "").strip()
        raw_amount = row.get("Summa", "0")
        currency = row.get("Valuuta", "EUR").strip()
        tx_type = row.get("Laekumine/Makse", "").strip()

        amount = _normalize_amount(raw_amount)
        # Swedbank "Laekumine" = incoming, "Makse" = outgoing
        if tx_type.lower() == "laekumine":
            amount = abs(amount)

        transactions.append(ParsedTransaction(
            date=date,
            description=desc,
            amount=amount,
            currency=currency,
            transaction_type=tx_type,
        ))

    return transactions


# --- SEB parser ---

def _parse_seb_csv(raw_bytes: bytes) -> list[ParsedTransaction]:
    """Parse SEB CSV (comma delimited, YYYY-MM-DD dates)."""
    text = raw_bytes.decode("utf-8-sig")
    reader = csv.DictReader(io.StringIO(text), delimiter=",")

    transactions: list[ParsedTransaction] = []
    for row in reader:
        date = _parse_date(row.get("Date", ""))
        if date is None:
            continue

        desc = row.get("Description", "").strip()
        raw_amount = row.get("Amount", "0")
        currency = row.get("Currency", "EUR").strip() if "Currency" in row else "EUR"
        tx_type = row.get("Type", "").strip()

        amount = _normalize_amount(raw_amount)
        # SEB uses Debit/Credit labels
        if tx_type.lower() == "credit":
            amount = abs(amount)

        transactions.append(ParsedTransaction(
            date=date,
            description=desc,
            amount=amount,
            currency=currency,
            transaction_type=tx_type,
        ))

    return transactions


# --- LHV parser ---

def _parse_lhv_csv(raw_bytes: bytes) -> list[ParsedTransaction]:
    """Parse LHV CSV (comma delimited with quoted fields, DD.MM.YYYY dates)."""
    text = raw_bytes.decode("utf-8-sig")
    reader = csv.DictReader(io.StringIO(text), delimiter=",")

    transactions: list[ParsedTransaction] = []
    for row in reader:
        date_str = row.get("Booking date", "")
        date = _parse_date(date_str)
        if date is None:
            continue

        desc = row.get("Beneficiary/Payer name", "").strip()
        raw_amount = row.get("Amount", "0")
        currency = row.get("Currency", "EUR").strip()
        tx_type = row.get("Payment type", "").strip()

        amount = _normalize_amount(raw_amount)
        # Outgoing payments are negative; card payments going out are "Card payment"
        if "incoming" in tx_type.lower() or "deposit" in tx_type.lower():
            amount = abs(amount)

        transactions.append(ParsedTransaction(
            date=date,
            description=desc,
            amount=amount,
            currency=currency,
            transaction_type=tx_type,
        ))

    return transactions


# --- Subscription detection ---

# Threshold: need at least N occurrences to be considered a subscription
_MIN_OCCURRENCES = 2
# Max day gap variation for "same cycle" (in days)
_MAX_CYCLE_VARIATION = 7


def _detect_subscriptions(transactions: list[ParsedTransaction]) -> list[DetectedSubscription]:
    """Detect subscriptions by finding recurring amounts + merchant names.

    A subscription candidate needs:
    - At least _MIN_OCCURRENCES occurrences of similar amount from same merchant
    - Regular timing (roughly monthly/weekly pattern)
    """
    # Group by (normalized_merchant, rounded_amount) for negative amounts only
    groups: dict[tuple[str, float], list[ParsedTransaction]] = defaultdict(list)
    for tx in transactions:
        if tx.amount >= 0:
            continue  # skip incoming transactions
        # Normalize merchant name: uppercase, strip whitespace
        merchant_key = " ".join(tx.description.upper().split())
        amount_key = round(abs(tx.amount), 2)
        groups[(merchant_key, amount_key)].append(tx)

    results: list[DetectedSubscription] = []

    for (merchant, amount), txs in groups.items():
        if len(txs) < _MIN_OCCURRENCES:
            continue

        # Sort by date
        sorted_txs = sorted(txs, key=lambda t: t.date)

        # Calculate day gaps between consecutive transactions
        gaps = []
        for i in range(1, len(sorted_txs)):
            delta = (sorted_txs[i].date - sorted_txs[i - 1].date).days
            if delta > 0:
                gaps.append(delta)

        if not gaps:
            continue

        avg_gap = sum(gaps) / len(gaps)
        max_gap = max(gaps)
        min_gap = min(gaps)

        # Check regularity
        if max_gap - min_gap > _MAX_CYCLE_VARIATION * 2:
            continue  # too irregular

        # Determine billing cycle
        if 25 <= avg_gap <= 35:
            billing_cycle = "monthly"
        elif 6 <= avg_gap <= 8:
            billing_cycle = "weekly"
        elif 13 <= avg_gap <= 16:
            billing_cycle = "bi-weekly"
        elif 350 <= avg_gap <= 380:
            billing_cycle = "yearly"
        else:
            billing_cycle = "irregular"

        # Confidence: based on regularity and count
        regularity_score = 1.0 - min(1.0, (max_gap - min_gap) / 30.0)
        count_score = min(1.0, len(sorted_txs) / 6.0)
        confidence = round(0.5 * regularity_score + 0.5 * count_score, 2)

        results.append(DetectedSubscription(
            merchant_name=merchant.title(),
            amount=sorted_txs[0].amount,
            currency=sorted_txs[0].currency,
            billing_cycle=billing_cycle,
            confidence=confidence,
            occurrences=len(sorted_txs),
            first_seen=sorted_txs[0].date,
            last_seen=sorted_txs[-1].date,
        ))

    # Sort by confidence descending
    results.sort(key=lambda r: r.confidence, reverse=True)
    return results


# --- Public API ---

def parse_csv(file_obj: io.BytesIO) -> CSVParseResponse:
    """Parse a bank CSV file and detect subscriptions.

    Args:
        file_obj: A file-like object containing the CSV data.

    Returns:
        CSVParseResponse with detected bank type, transactions count, and subscriptions.
    """
    raw_bytes = file_obj.read()

    # Detect encoding & decode
    content = raw_bytes.decode("utf-8-sig")

    # Detect bank type
    bank_type = _detect_bank_type(content)

    # Parse with appropriate parser
    if bank_type == "swedbank":
        transactions = _parse_swedbank_csv(raw_bytes)
    elif bank_type == "seb":
        transactions = _parse_seb_csv(raw_bytes)
    elif bank_type == "lhv":
        transactions = _parse_lhv_csv(raw_bytes)
    else:
        # Fallback: try comma-delimited (SEB-like)
        transactions = _parse_seb_csv(raw_bytes)

    # Detect subscriptions
    subscriptions = _detect_subscriptions(transactions)

    return CSVParseResponse(
        bank_type=bank_type,
        total_transactions=len(transactions),
        detected_subscriptions=subscriptions,
    )
