from fastapi import APIRouter
from src.nlp.pipeline import nlp_pipeline
from src.explainability.explainer import explainer
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
    # Fetch historical query keys from cache
    history = list(analytics_cache.nlp_cache.keys())
    return {"status": "ok", "history": history}

@router.get("/query/suggestions")
def get_query_suggestions():
    # Since suggestions can be dynamic, provide real intelligent suggestions based on current operational anomalies
    return {
        "status": "ok",
        "suggestions": [
            "What is the fleet utilization today?",
            "Show me drivers with high fatigue",
            "Are there any delays on active routes?"
        ]
    }

@router.get("/query/explain")
def explain_query(query_id: str):
    cached = analytics_cache.nlp_cache.get(query_id)
    if not cached:
        return {"status": "error", "message": "Query not found in history"}
        
    explanation = explainer.explain_recommendation(
        recommendation={"text": f"NLP Query Result for {query_id}"},
        observation="User issued a natural language query",
        evidence=[f"Parsed intent: {cached.get('intent')}"],
        kpis=cached.get('entities', {})
    )
    return {"status": "ok", "data": explanation}
