def detect_anomalies(data_records: list) -> list:
    anomalies = []
    for idx, rec in enumerate(data_records):
        if rec.get("value", 0) > 200 or rec.get("value", 0) < 30:
            anomalies.append({"record_index": idx, "flag": "OUT_OF_BOUNDS", "severity": "HIGH"})
    return anomalies
