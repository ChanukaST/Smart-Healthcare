from fastapi import APIRouter

router = APIRouter(tags=["health"])

@router.get("/health")
def health_check():
    return {"status": "UP", "service": "Smart Healthcare ML Engine"}
