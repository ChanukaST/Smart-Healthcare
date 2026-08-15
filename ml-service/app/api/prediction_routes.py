from fastapi import APIRouter
from app.schemas.appointment_schema import AppointmentPredictionRequest, AppointmentPredictionResponse
from app.schemas.health_schema import HealthRiskRequest, HealthRiskResponse
from app.schemas.feedback_schema import FeedbackSentimentRequest, FeedbackSentimentResponse
from app.services.noshow_service import predict_noshow
from app.services.health_risk_service import calculate_health_risk
from app.services.sentiment_service import analyze_sentiment

router = APIRouter(prefix="/predict", tags=["predictions"])

@router.post("/no-show", response_model=AppointmentPredictionResponse)
def get_no_show_prediction(req: AppointmentPredictionRequest):
    risk, score = predict_noshow(req.lead_days, req.previous_noshows)
    return AppointmentPredictionResponse(appointment_id=req.appointment_id, no_show_risk=risk, risk_score=score)

@router.post("/health-risk", response_model=HealthRiskResponse)
def get_health_risk(req: HealthRiskRequest):
    category, conf = calculate_health_risk(req.blood_pressure_systolic, req.bmi, req.glucose_level)
    return HealthRiskResponse(patient_id=req.patient_id, risk_category=category, confidence=conf)

@router.post("/sentiment", response_model=FeedbackSentimentResponse)
def get_sentiment(req: FeedbackSentimentRequest):
    label, score = analyze_sentiment(req.comment)
    return FeedbackSentimentResponse(feedback_id=req.feedback_id, sentiment=label, score=score)
