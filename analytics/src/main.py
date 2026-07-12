from fastapi import FastAPI
from src.api.health import router as health_router

app = FastAPI(
    title="TransitOps Analytics API",
    description="Analytics Engine API for TransitOps",
    version="1.0.0"
)

app.include_router(health_router)

@app.get("/")
def read_root():
    return {"message": "Welcome to TransitOps Analytics API"}
