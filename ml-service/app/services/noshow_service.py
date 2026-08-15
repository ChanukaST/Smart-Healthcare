def predict_noshow(lead_days: int, previous_noshows: int) -> tuple[str, float]:
    score = min(1.0, max(0.0, (lead_days * 0.03) + (previous_noshows * 0.25)))
    if score > 0.6:
        return "HIGH", round(score, 2)
    elif score > 0.3:
        return "MEDIUM", round(score, 2)
    return "LOW", round(score, 2)
