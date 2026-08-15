-- 12_feedback.sql: Patient Feedback & Sentiment Analysis Input
CREATE TABLE IF NOT EXISTS feedback (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    patient_id BIGINT NOT NULL,
    comments TEXT NOT NULL,
    rating INT DEFAULT 5,
    sentiment_label VARCHAR(30), -- POSITIVE, NEUTRAL, NEGATIVE
    sentiment_score DECIMAL(5,4),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
