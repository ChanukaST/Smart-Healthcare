import os

def load_ml_model(model_name: str):
    """
    Mock/Utility model loader to return model references or fallback algorithms.
    """
    path = os.path.join(os.path.dirname(__file__), "..", "..", "models", f"{model_name}.pkl")
    if os.path.exists(path):
        try:
            import joblib
            return joblib.load(path)
        except Exception:
            pass
    return None
