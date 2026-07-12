from fastapi import APIRouter
from src.nlp.pipeline import nlp_pipeline
from src.cache.analytics_cache import analytics_cache
from pydantic import BaseModel

router = APIRouter(prefix="/nlp", tags=["NLP"])

class QueryRequest(BaseModel):
    query: str

@router.post("/query")
def process_natural_language_query(req: QueryRequest):
    cache_key = f"nlp_{req.query.strip().lower()}"
    cached = analytics_cache.nlp_cache.get(cache_key)
    if cached:
        return cached

    result = nlp_pipeline.process_query(req.query)
    
    analytics_cache.nlp_cache[cache_key] = result
    return result

@router.get("/query/history")
def get_query_history():
    return {"status": "ok", "message": "Returning user mock query history", "history": []}

@router.get("/query/suggestions")
def get_query_suggestions():
    return {
        "status": "ok",
        "suggestions": [
            "What is the fleet utilization?",
            "Show me fatigued drivers",
            "Are there any delays on Route A?"
        ]
    }

@router.get("/query/explain")
def explain_query(query_id: str):
    return {"status": "ok", "message": f"Explainability tree for query {query_id}"}
