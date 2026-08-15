# Smart Sri Lankan Healthcare ML Service (FastAPI / Scikit-Learn)

Machine Learning microservice providing predictive clinical intelligence for the Sri Lankan Healthcare Platform.

## Machine Learning Capabilities
1. **No-Show Prediction**: Predicts likelihood of appointment no-shows based on lead time, previous attendance, and patient demographics.
2. **Health Risk Classification**: Classifies cardiovascular and metabolic health risk from patient vitals (Blood Pressure, BMI, Blood Glucose).
3. **Sentiment Analysis**: Evaluates patient feedback and reviews to classify sentiment (Positive, Neutral, Negative) with confidence scoring.
4. **Trend Analysis & Anomaly Detection**: Tracks patient attendance trends and flags vital anomalies for medical review.

## Running Locally

```bash
pip install -r requirements.txt
python -m uvicorn app.main:app --port 8000 --reload
```

Interactive Swagger API documentation is available at `http://localhost:8000/docs`.
