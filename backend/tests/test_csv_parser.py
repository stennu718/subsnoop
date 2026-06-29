"""Tests for the CSV parser service."""
import io

import pytest

from app.services.csv_parser import (
    _detect_bank_type,
    _normalize_amount,
    _parse_date,
    _parse_seb_csv,
    _parse_swedbank_csv,
    _parse_lhv_csv,
    _detect_subscriptions,
    parse_csv,
    ParsedTransaction,
)


class TestDateParsing:
    def test_dd_mm_yyyy(self):
        result = _parse_date("15.01.2024")
        assert result is not None
        assert result.year == 2024
        assert result.month == 1
        assert result.day == 15

    def test_yyyy_mm_dd(self):
        result = _parse_date("2024-01-15")
        assert result is not None
        assert result.year == 2024
        assert result.month == 1
        assert result.day == 15

    def test_invalid_date(self):
        assert _parse_date("not-a-date") is None

    def test_empty_string(self):
        assert _parse_date("") is None


class TestAmountNormalization:
    def test_negative_float(self):
        assert _normalize_amount(-9.99) == -9.99

    def test_positive_float(self):
        assert _normalize_amount(9.99) == -9.99

    def test_string_with_comma(self):
        assert _normalize_amount("9,99") == -9.99

    def test_string_negative(self):
        assert _normalize_amount("-9.99") == -9.99

    def test_zero(self):
        assert _normalize_amount(0) == 0.0


class TestBankDetection:
    def test_swedbank_detected(self):
        content = "Kuupäev;Kirjeldus;Summa;Valuuta"
        assert _detect_bank_type(content) == "swedbank"

    def test_seb_detected(self):
        content = "Date,Description,Amount,Type,Balance"
        assert _detect_bank_type(content) == "seb"

    def test_lhv_detected(self):
        content = '"Booking date","Beneficiary/Payer name","Amount"'
        assert _detect_bank_type(content) == "lhv"

    def test_unknown(self):
        content = "foo,bar,baz"
        assert _detect_bank_type(content) is None


class TestSwedbankParsing:
    def test_parse_swedbank_csv(self, swedbank_csv_bytes):
        transactions = _parse_swedbank_csv(swedbank_csv_bytes)
        assert len(transactions) == 13
        # First transaction
        assert transactions[0].description == "NETFLIX.COM"
        assert transactions[0].amount == -9.99
        assert transactions[0].currency == "EUR"

    def test_swedbank_bom_handling(self):
        """Ensure BOM is stripped properly."""
        content = "\ufeffKuupäev;Kirjeldus;Summa;Valuuta;Laekumine/Makse\n01.01.2024;Test;-5.00;EUR;Makse"
        transactions = _parse_swedbank_csv(content.encode("utf-8-sig"))
        assert len(transactions) == 1
        assert transactions[0].description == "Test"


class TestSEBParsing:
    def test_parse_seb_csv(self, sebb_csv_bytes):
        transactions = _parse_seb_csv(sebb_csv_bytes)
        assert len(transactions) == 9
        assert transactions[0].description == "Spotify AB"
        assert transactions[0].amount == -11.99


class TestLhvParsing:
    def test_parse_lhv_csv(self, lhv_csv_bytes):
        transactions = _parse_lhv_csv(lhv_csv_bytes)
        assert len(transactions) == 10
        assert transactions[0].description == "Netflix.com"
        assert transactions[0].amount == -9.99


class TestSubscriptionDetection:
    def test_detect_recurring(self):
        transactions = [
            ParsedTransaction(date=_parse_date("01.01.2024"), description="NETFLIX.COM", amount=-9.99, currency="EUR"),
            ParsedTransaction(date=_parse_date("01.02.2024"), description="NETFLIX.COM", amount=-9.99, currency="EUR"),
            ParsedTransaction(date=_parse_date("01.03.2024"), description="NETFLIX.COM", amount=-9.99, currency="EUR"),
            ParsedTransaction(date=_parse_date("01.04.2024"), description="NETFLIX.COM", amount=-9.99, currency="EUR"),
        ]
        subs = _detect_subscriptions(transactions)
        assert len(subs) >= 1
        netflix = [s for s in subs if "NETFLIX" in s.merchant_name.upper()]
        assert len(netflix) == 1
        assert netflix[0].occurrences == 4
        assert netflix[0].billing_cycle == "monthly"

    def test_no_subscriptions_for_onetime(self):
        transactions = [
            ParsedTransaction(date=_parse_date("01.01.2024"), description="Random Store", amount=-23.99, currency="EUR"),
            ParsedTransaction(date=_parse_date("15.01.2024"), description="Another Store", amount=-45.00, currency="EUR"),
        ]
        subs = _detect_subscriptions(transactions)
        assert len(subs) == 0

    def test_confidence_high_for_frequent(self):
        transactions = [
            ParsedTransaction(date=_parse_date(f"01.{m:02d}.2024"), description="SPOTIFY", amount=-11.99, currency="EUR")
            for m in range(1, 13)
        ]
        subs = _detect_subscriptions(transactions)
        spotify = [s for s in subs if "SPOTIFY" in s.merchant_name.upper()]
        assert len(spotify) == 1
        assert spotify[0].confidence > 0.8


class TestFullPipeline:
    def test_parse_swedbank_full(self, swedbank_csv_bytes):
        result = parse_csv(io.BytesIO(swedbank_csv_bytes))
        assert result.bank_type == "swedbank"
        assert result.total_transactions == 13
        assert len(result.detected_subscriptions) >= 3  # Netflix, Telia, LHV

    def test_parse_seb_full(self, sebb_csv_bytes):
        result = parse_csv(io.BytesIO(sebb_csv_bytes))
        assert result.bank_type == "seb"
        assert result.total_transactions == 9
        assert len(result.detected_subscriptions) >= 2  # Spotify, Elisa

    def test_parse_lhv_full(self, lhv_csv_bytes):
        result = parse_csv(io.BytesIO(lhv_csv_bytes))
        assert result.bank_type == "lhv"
        assert result.total_transactions == 10
        assert len(result.detected_subscriptions) >= 2  # Netflix, Swedbank

    def test_parse_onetime_no_subscriptions(self, onetime_csv_bytes):
        result = parse_csv(io.BytesIO(onetime_csv_bytes))
        assert result.total_transactions == 2
        assert len(result.detected_subscriptions) == 0
