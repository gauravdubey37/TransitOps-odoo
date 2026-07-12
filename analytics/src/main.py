from fastapi import FastAPI
from src.api.health import router as health_router
from src.api.kpi_api import router as kpi_router
from src.api.recommendation_api import router as recommendation_router
from src.api.nlp_api import router as nlp_router
from src.api.voice_api import router as voice_router
from src.api.graph_api import router as graph_router

app = FastAPI(
    title="TransitOps Analytics API",
    description="Analytics Engine API for TransitOps",
    version="1.0.0"
)

app.include_router(health_router)
app.include_router(kpi_router)
app.include_router(recommendation_router)
app.include_router(nlp_router)
app.include_router(voice_router)
app.include_router(graph_router)

@app.get("/")
def read_root():
    return {"message": "Welcome to TransitOps Analytics API"}
