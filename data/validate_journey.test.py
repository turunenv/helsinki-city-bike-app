from populate_db import validate_journey
import unittest

test_cases = {
    "valid": ("2021-05-31T23:57:25", "2021-06-01T00:05:46", "094", "100", "1010"),
    "journey_too_short": (
        "2021-03-31T23:57:25",
        "2021-03-31T23:57:26",
        "094",
        "100",
        "1010",
    ),
    "distance_too_short": (
        "2021-03-31T23:57:25",
        "2021-03-31T23:59:26",
        "023",
        "112",
        "9",
    ),
    "missing_arrival_time": ("2021-03-31T23:57:25", "", "023", "112", "9"),
    "negative_station_id": (
        "2021-03-31T23:57:25",
        "2021-03-31T23:59:26",
        "033",
        "-12",
        "9",
    ),
}

class TestJourneyValidation(unittest.TestCase):
    def test_valid_returns_true(self):
        self.assertEqual(validate_journey(test_cases["valid"]), True)

    def test_journey_too_short_returns_false(self):
        self.assertEqual(validate_journey(test_cases["journey_too_short"]), False)

    def test_distance_too_short_returns_false(self):
        self.assertEqual(validate_journey(test_cases["distance_too_short"]), False)

    def test_missing_arrival_time_returns_false(self):
        self.assertEqual(validate_journey(test_cases["missing_arrival_time"]), False)

    def test_missing_arrival_time_returns_false(self):
        self.assertEqual(validate_journey(test_cases["missing_arrival_time"]), False)

    def test_negative_station_id_returns_false(self):
        self.assertEqual(validate_journey(test_cases["negative_station_id"]), False)


if __name__ == "__main__":
    unittest.main()
