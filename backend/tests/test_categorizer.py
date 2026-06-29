"""Tests for the subscription categorizer service."""
import pytest

from app.services.categorizer import (
    DEFAULT_CATEGORIES,
    categorize,
    categorize_batch,
    get_category_for_merchant,
)


class TestCategorizerDefaults:
    def test_netflix_is_entertainment(self):
        assert categorize("NETFLIX.COM") == "Entertainment"
        assert categorize("Netflix") == "Entertainment"

    def test_spotify_is_entertainment(self):
        assert categorize("Spotify AB") == "Entertainment"

    def test_telia_is_telecom(self):
        assert categorize("TELIA EESTI AS") == "Telecom"

    def test_elisa_is_telecom(self):
        assert categorize("Elisa Eesti") == "Telecom"

    def test_swedbank_is_banking(self):
        assert categorize("Swedbank AS") == "Banking"
        assert categorize("LHV PANK") == "Banking"

    def test_unknown_returns_none(self):
        assert categorize("Some Random Store") is None

    def test_case_insensitive(self):
        assert categorize("netflix.com") == "Entertainment"
        assert categorize("NETFLIX") == "Entertainment"


class TestCategorizerBatch:
    def test_batch_categorize(self):
        merchants = ["NETFLIX.COM", "TELIA EESTI AS", "Unknown Store"]
        results = categorize_batch(merchants)
        assert results["NETFLIX.COM"] == "Entertainment"
        assert results["TELIA EESTI AS"] == "Telecom"
        assert results["Unknown Store"] is None


class TestCustomOverrides:
    def test_custom_override(self):
        overrides = {"MyFitnessApp": "Health & Fitness"}
        assert categorize("MyFitnessApp", custom_overrides=overrides) == "Health & Fitness"

    def test_override_takes_precedence(self):
        # Netflix is normally Entertainment, but override should win
        overrides = {"Netflix": "CustomCategory"}
        assert categorize("Netflix", custom_overrides=overrides) == "CustomCategory"

    def test_empty_overrides(self):
        assert categorize("NETFLIX.COM", custom_overrides={}) == "Entertainment"

    def test_no_match_with_overrides(self):
        overrides = {"OtherApp": "Other"}
        assert categorize("UnknownStore", custom_overrides=overrides) is None


class TestGetCategoryForMerchant:
    def test_returns_category(self):
        cat = get_category_for_merchant("Spotify AB")
        assert cat == "Entertainment"

    def test_returns_none_for_unknown(self):
        cat = get_category_for_merchant("XYZ123")
        assert cat is None
