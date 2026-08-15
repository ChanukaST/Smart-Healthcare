from pydantic import BaseModel

class HealthRiskRequest(BaseModel):
    patient_id: int
    age: int
    blood_pressure_systolic: int
    blood_pressure_diastolic: int
    bmi: float
    glucose_level: float

class HealthRiskResponse(BaseModel):
    patient_id: int
    risk_category: str
    confidence: float
