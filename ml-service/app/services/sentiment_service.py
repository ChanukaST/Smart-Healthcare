def analyze_sentiment(text: str) -> tuple[str, float]:
    lowered = text.lower()
    positives = ["good", "great", "excellent", "attentive", "friendly", "caring", "best"]
    negatives = ["bad", "poor", "delay", "disappointed", "slow", "rude", "horrible"]

    pos_score = sum(1 for w in positives if w in lowered)
    neg_score = sum(1 for w in negatives if w in lowered)

    if pos_score > neg_score:
        return "POSITIVE", 0.92
    elif neg_score > pos_score:
        return "NEGATIVE", 0.85
    return "NEUTRAL", 0.65
