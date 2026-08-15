from pydantic import BaseModel

class AppointmentPredictionRequest(BaseModel):
    appointment_id: int
    lead_days: int
    previous_noshows: int
    age: int
    gender: str

class AppointmentPredictionResponse(BaseModel):
    appointment_id: int
    no_show_risk: str
    risk_score: float
