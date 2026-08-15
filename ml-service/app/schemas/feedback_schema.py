from pydantic import BaseModel

class FeedbackSentimentRequest(BaseModel):
    feedback_id: int
    comment: str

class FeedbackSentimentResponse(BaseModel):
    feedback_id: int
    sentiment: str
    score: float
