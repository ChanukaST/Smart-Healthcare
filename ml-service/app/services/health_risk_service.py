def calculate_health_risk(bp_sys: int, bmi: float, glucose: float) -> tuple[str, float]:
    risk_points = 0
    if bp_sys >= 140:
        risk_points += 2
    if bmi >= 30:
        risk_points += 2
    if glucose >= 140:
        risk_points += 2
    
    if risk_points >= 4:
        return "HIGH_RISK", 0.88
    elif risk_points >= 2:
        return "MODERATE_RISK", 0.72
    return "LOW_RISK", 0.95
