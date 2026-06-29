"""Pytest configuration and shared fixtures for SubSnoop backend tests."""
import io

import pytest


# --- Sample CSV data fixtures ---

SWAEDBANK_CSV = """\ufeffKuupäev;Kirjeldus;Summa;Valuuta;Laekumine/Makse
01.01.2024;NETFLIX.COM;-9.99;EUR;Makse
02.01.2024;TELIA EESTI AS;-15.50;EUR;Makse
03.01.2024;LHV PANK;-5.00;EUR;Makse
05.01.2024;Some Random Store;-23.99;EUR;Makse
01.02.2024;NETFLIX.COM;-9.99;EUR;Makse
02.02.2024;TELIA EESTI AS;-15.50;EUR;Makse
03.02.2024;LHV PANK;-5.00;EUR;Makse
01.03.2024;NETFLIX.COM;-9.99;EUR;Makse
02.03.2024;TELIA EESTI AS;-15.50;EUR;Makse
03.03.2024;LHV PANK;-5.00;EUR;Makse
01.04.2024;NETFLIX.COM;-9.99;EUR;Makse
02.04.2024;TELIA EESTI AS;-15.50;EUR;Makse
03.04.2024;LHV PANK;-5.00;EUR;Makse
"""

SEB_CSV = """Date,Description,Amount,Type,Balance
2024-01-05,Spotify AB,-11.99,Debit,1200.00
2024-01-10,Elisa Eesti,-25.00,Debit,1175.00
2024-01-15,Grocery Store,-45.30,Debit,1129.70
2024-02-05,Spotify AB,-11.99,Debit,1117.71
2024-02-10,Elisa Eesti,-25.00,Debit,1092.71
2024-03-05,Spotify AB,-11.99,Debit,1080.72
2024-03-10,Elisa Eesti,-25.00,Debit,1055.72
2024-04-05,Spotify AB,-11.99,Debit,1043.73
2024-04-10,Elisa Eesti,-25.00,Debit,1018.73
"""


LHV_CSV = """\"Booking date\",\"Beneficiary/Payer name\",\"Amount\",\"Currency\",\"Payment type\"
15.01.2024,\"Netflix.com\",-9.99,\"EUR\",\"Card payment\"
20.01.2024,\"Swedbank AS\",-3.99,\"EUR\",\"Service fee\"
15.02.2024,\"Netflix.com\",-9.99,\"EUR\",\"Card payment\"
20.02.2024,\"Swedbank AS\",-3.99,\"EUR\",\"Service fee\"
15.03.2024,\"Netflix.com\",-9.99,\"EUR\",\"Card payment\"
20.03.2024,\"Swedbank AS\",-3.99,\"EUR\",\"Service fee\"
15.04.2024,\"Netflix.com\",-9.99,\"EUR\",\"Card payment\"
20.04.2024,\"Swedbank AS\",-3.99,\"EUR\",\"Service fee\"
15.05.2024,\"Netflix.com\",-9.99,\"EUR\",\"Card payment\"
20.05.2024,\"Swedbank AS\",-3.99,\"EUR\",\"Service fee\"
"""

ONETIME_CSV = """Date,Description,Amount
2024-01-15,iStore Purchase,49.99
2024-02-20,Restaurant Dinner,35.00
"""


@pytest.fixture
def swedbank_csv_bytes():
    return SWAEDBANK_CSV.encode("utf-8-sig")


@pytest.fixture
def sebb_csv_bytes():
    return SEB_CSV.encode("utf-8")


@pytest.fixture
def lhv_csv_bytes():
    return LHV_CSV.encode("utf-8-sig")


@pytest.fixture
def onetime_csv_bytes():
    return ONETIME_CSV.encode("utf-8")


@pytest.fixture
def swedbank_csv_fileobj(swedbank_csv_bytes):
    return io.BytesIO(swedbank_csv_bytes)


@pytest.fixture
def seb_csv_fileobj(sebb_csv_bytes):
    return io.BytesIO(sebb_csv_bytes)


@pytest.fixture
def lhv_csv_fileobj(lhv_csv_bytes):
    return io.BytesIO(lhv_csv_bytes)
