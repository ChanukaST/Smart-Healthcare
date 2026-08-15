-- 13_predictions.sql: ML Predictions Record Table
CREATE TABLE IF NOT EXISTS predictions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    entity_type VARCHAR(50) NOT NULL, -- APPOINTMENT, HEALTH_RISK, SENTIMENT, ANOMALY
    entity_id BIGINT NOT NULL,
    prediction_type VARCHAR(50) NOT NULL,
    predicted_result TEXT NOT NULL,
    confidence_score DECIMAL(5,4),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
