import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import prediction_routes, health_routes

app = FastAPI(
    title="Smart Sri Lankan Healthcare ML Service",
    description="Microservice for No-show Prediction, Health Risk Analysis, Sentiment Classification & Anomaly Detection",
    version="1.0.0"
)

allowed_origins_env = os.getenv("ALLOWED_ORIGINS")
if allowed_origins_env:
    allowed_origins = [origin.strip() for origin in allowed_origins_env.split(",")]
else:
    allowed_origins = [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://localhost:8080",
    ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_routes.router)
app.include_router(prediction_routes.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
