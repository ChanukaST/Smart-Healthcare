import pytest
from app.services.noshow_service import predict_noshow

def test_predict_noshow_exact_lower_boundary():
    # L=10, P=0 => score = 0.3 exactly. Since 0.3 is not > 0.3, it should be LOW.
    category, score = predict_noshow(lead_days=10, previous_noshows=0)
    assert category == "LOW"
    assert score == 0.3

def test_predict_noshow_just_above_lower_boundary():
    # L=11, P=0 => score = 0.33. Since 0.33 > 0.3, it should be MEDIUM.
    category, score = predict_noshow(lead_days=11, previous_noshows=0)
    assert category == "MEDIUM"
    assert score == 0.33

def test_predict_noshow_exact_upper_boundary():
    # L=20, P=0 => score = 0.6 exactly. Since 0.6 is not > 0.6, it should be MEDIUM.
    category, score = predict_noshow(lead_days=20, previous_noshows=0)
    assert category == "MEDIUM"
    assert score == 0.6

def test_predict_noshow_just_above_upper_boundary():
    # L=21, P=0 => score = 0.63. Since 0.63 > 0.6, it should be HIGH.
    category, score = predict_noshow(lead_days=21, previous_noshows=0)
    assert category == "HIGH"
    assert score == 0.63

def test_predict_noshow_minimum_clamp():
    # Negative values should be clamped to 0.0
    category, score = predict_noshow(lead_days=-10, previous_noshows=-1)
    assert category == "LOW"
    assert score == 0.0

def test_predict_noshow_maximum_clamp():
    # Values yielding > 1.0 should be clamped to 1.0
    category, score = predict_noshow(lead_days=40, previous_noshows=5)
    assert category == "HIGH"
    assert score == 1.0

def test_predict_noshow_exact_zero():
    # L=0, P=0 => score = 0.0
    category, score = predict_noshow(lead_days=0, previous_noshows=0)
    assert category == "LOW"
    assert score == 0.0

def test_predict_noshow_exact_one():
    # L=0, P=4 => score = 1.0
    category, score = predict_noshow(lead_days=0, previous_noshows=4)
    assert category == "HIGH"
    assert score == 1.0
