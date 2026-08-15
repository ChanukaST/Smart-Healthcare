from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import prediction_routes, health_routes

app = FastAPI(
    title="Smart Sri Lankan Healthcare ML Service",
    description="Microservice for No-show Prediction, Health Risk Analysis, Sentiment Classification & Anomaly Detection",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_routes.router)
app.include_router(prediction_routes.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
