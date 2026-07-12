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
