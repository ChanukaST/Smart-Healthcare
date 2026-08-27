from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

app = Flask(__name__)
CORS(app)

# ==========================================
# 1. Train Appointment No-Show ML Model
# ==========================================
def train_no_show_model():
    np.random.seed(42)
    n_samples = 1000
    
    age = np.random.randint(18, 80, n_samples)
    previous_no_shows = np.random.poisson(0.8, n_samples)
    lead_time_days = np.random.randint(0, 30, n_samples)
    appointment_hour = np.random.randint(8, 17, n_samples)
    is_weekend = np.random.choice([0, 1], n_samples, p=[0.8, 0.2])
    
    logits = -1.5 + (previous_no_shows * 0.9) + (lead_time_days * 0.08) - (age * 0.01) + (is_weekend * 0.5)
    prob = 1 / (1 + np.exp(-logits))
    no_show = (np.random.rand(n_samples) < prob).astype(int)
    
    X = pd.DataFrame({
        'age': age,
        'previous_no_shows': previous_no_shows,
        'lead_time_days': lead_time_days,
        'appointment_hour': appointment_hour,
        'is_weekend': is_weekend
    })
    
    clf = RandomForestClassifier(n_estimators=100, random_state=42)
    clf.fit(X, no_show)
    return clf

no_show_model = train_no_show_model()

# ==========================================
# 2. Train Health Risk Decision Support Model
# ==========================================
def train_health_risk_model():
    np.random.seed(101)
    n_samples = 800
    
    age = np.random.randint(20, 85, n_samples)
    systolic_bp = np.random.randint(90, 180, n_samples)
    blood_sugar = np.random.randint(70, 250, n_samples)
    chest_pain = np.random.choice([0, 1], n_samples, p=[0.7, 0.3])
    fever = np.random.choice([0, 1], n_samples, p=[0.6, 0.4])
    
    scores = (systolic_bp > 140) + (blood_sugar > 140) + (chest_pain * 2) + (fever * 1) + ((age > 60) * 1)

    conditions = [
        scores >= 3,
        scores >= 1
    ]
    choices = [
        "HIGH_RISK",
        "MODERATE_RISK"
    ]
    risk = np.select(conditions, choices, default="LOW_RISK").tolist()
            
    X = pd.DataFrame({
        'age': age,
        'systolic_bp': systolic_bp,
        'blood_sugar': blood_sugar,
        'chest_pain': chest_pain,
        'fever': fever
    })
    
    clf = GradientBoostingClassifier(random_state=42)
    clf.fit(X, risk)
    return clf

health_risk_model = train_health_risk_model()

# ==========================================
# 3. Train Patient Feedback Sentiment Model
# ==========================================
def train_sentiment_model():
    texts = [
        "The doctor was extremely attentive and caring, fantastic hospital service!",
        "Very clean facility and polite nursing staff, highly recommend.",
        "Smooth OPD queue process and fast medicine dispensing.",
        "Waiting time was too long, doctor spent only two minutes.",
        "Rude receptionist and terrible crowded waiting area.",
        "High consultation fee for very brief checkup, disappointed.",
        "Average experience, nothing special but got my prescription.",
        "Standard hospital care, acceptable facilities.",
        "Excellent laboratory diagnostic speed and helpful lab technicians."
    ]
    labels = ["POSITIVE", "POSITIVE", "POSITIVE", "NEGATIVE", "NEGATIVE", "NEGATIVE", "NEUTRAL", "NEUTRAL", "POSITIVE"]
    
    vectorizer = TfidfVectorizer()
    X = vectorizer.fit_transform(texts)
    
    clf = LogisticRegression()
    clf.fit(X, labels)
    return vectorizer, clf

sentiment_vectorizer, sentiment_model = train_sentiment_model()

# ==========================================
# REST API Endpoints
# ==========================================

@app.route('/predict/no-show', methods=['POST'])
def predict_no_show():
    try:
        data = request.json or {}
        age = data.get('age', 40)
        previous_no_shows = data.get('previousNoShows', 1)
        lead_time_days = data.get('leadTimeDays', 7)
        appointment_hour = data.get('appointmentHour', 10)
        is_weekend = data.get('isWeekend', 0)
        
        df = pd.DataFrame([{
            'age': age,
            'previous_no_shows': previous_no_shows,
            'lead_time_days': lead_time_days,
            'appointment_hour': appointment_hour,
            'is_weekend': is_weekend
        }])
        
        proba = no_show_model.predict_proba(df)[0][1]
        no_show_pct = round(float(proba) * 100, 1)
        
        if no_show_pct >= 65:
            risk_tier = "HIGH_RISK"
            recommendation = "Send extra SMS reminder and offer early confirmation call."
        elif no_show_pct >= 35:
            risk_tier = "MODERATE_RISK"
            recommendation = "Standard automated SMS reminder."
        else:
            risk_tier = "LOW_RISK"
            recommendation = "Standard appointment flow."
            
        return jsonify({
            "noShowProbabilityPercent": no_show_pct,
            "riskTier": risk_tier,
            "recommendation": recommendation
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/predict/health-risk', methods=['POST'])
def predict_health_risk():
    try:
        data = request.json or {}
        age = data.get('age', 45)
        systolic_bp = data.get('systolicBp', 120)
        blood_sugar = data.get('bloodSugar', 95)
        chest_pain = data.get('chestPain', 0)
        fever = data.get('fever', 0)
        
        df = pd.DataFrame([{
            'age': age,
            'systolic_bp': systolic_bp,
            'blood_sugar': blood_sugar,
            'chest_pain': chest_pain,
            'fever': fever
        }])
        
        predicted_risk = health_risk_model.predict(df)[0]
        probas = health_risk_model.predict_proba(df)[0]
        confidence = round(float(max(probas)) * 100, 1)
        
        return jsonify({
            "predictedRiskCategory": predicted_risk,
            "confidencePercent": confidence,
            "disclaimer": "AI Decision Support Tool - Clinical correlation required."
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/analyze/sentiment', methods=['POST'])
def analyze_sentiment():
    try:
        data = request.json or {}
        feedback_text = data.get('feedbackText', '')
        if not feedback_text.strip():
            return jsonify({"sentiment": "NEUTRAL", "confidencePercent": 50.0})
            
        X = sentiment_vectorizer.transform([feedback_text])
        pred = sentiment_model.predict(X)[0]
        probas = sentiment_model.predict_proba(X)[0]
        confidence = round(float(max(probas)) * 100, 1)
        
        return jsonify({
            "sentiment": pred,
            "confidencePercent": confidence,
            "feedbackText": feedback_text
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/analytics/trends', methods=['GET'])
def get_analytics_trends():
    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"]
    opd_volume = [450, 520, 610, 580, 690, 750, 810, 890]
    revenue_lkr = [3.2, 3.8, 4.4, 4.1, 5.0, 5.6, 6.1, 6.8] # in Millions
    no_show_rates = [18.5, 16.2, 19.0, 15.4, 14.1, 12.8, 11.5, 10.2]
    
    return jsonify({
        "months": months,
        "opdVolumeTrend": opd_volume,
        "revenueMillionLkr": revenue_lkr,
        "noShowRatePercentage": no_show_rates,
        "sentimentDistribution": {"POSITIVE": 72, "NEUTRAL": 18, "NEGATIVE": 10},
        "anomaliesDetected": [
            {"date": "2026-08-04", "type": "OPD Volume Spike", "severity": "MODERATE", "description": "Unusually high Monday walk-in volume (+35% vs average)"}
        ]
    })

if __name__ == '__main__':
    print("Starting Python Smart Healthcare ML Microservice on port 5001...")
    app.run(host='0.0.0.0', port=5001, debug=False)
