from fastapi import APIRouter
from src.recommendations.recommendation_engine import recommendation_engine
from src.explainability.explainer import explainer
from src.cache.analytics_cache import analytics_cache
from pydantic import BaseModel
from src.core.neo4j_client import neo4j_client

router = APIRouter(prefix="/recommendations", tags=["Recommendations"])

class DriverRecommendationRequest(BaseModel):
    route_id: str
    vehicle_class: str

@router.post("/drivers")
def get_driver_recommendations(req: DriverRecommendationRequest):
    cache_key = f"driver_rec_{req.route_id}_{req.vehicle_class}"
    cached = analytics_cache.get_recommendation(cache_key)
    if cached:
        return cached

    # Generate raw recommendations
    raw_recs = recommendation_engine.get_driver_assignment_recommendations(req.route_id, req.vehicle_class)
    
    explained_recs = []
    for rec in raw_recs:
        # Attach explainability layer
        explained = explainer.explain_recommendation(
            recommendation={"text": f"Assign Driver {rec['name']} to route {req.route_id}", "score": rec['score'], "expected_impact": "High Route Efficiency"},
            observation=f"Driver {rec['name']} has completed multiple trips on this route.",
            evidence=[rec['reasoning']],
            kpis={"familiarity_score": rec['score']}
        )
        explained_recs.append(explained)
    
    analytics_cache.set_recommendation(cache_key, explained_recs)
    return explained_recs

@router.get("/")
def get_all_recommendations():
    records = neo4j_client.execute_read("MATCH (r:Recommendation {status: 'active'}) RETURN r")
    data = [rec["r"] for rec in records] if records else []
    return {"status": "ok", "data": data}

@router.get("/history")
def get_recommendation_history():
    records = neo4j_client.execute_read("MATCH (r:Recommendation {status: 'resolved'}) RETURN r")
    data = [rec["r"] for rec in records] if records else []
    return {"status": "ok", "data": data}

@router.get("/{rec_id}")
def get_recommendation(rec_id: str):
    records = neo4j_client.execute_read("MATCH (r:Recommendation {rec_id: $rec_id}) RETURN r", rec_id=rec_id)
    if not records:
        return {"status": "error", "message": "Recommendation not found"}
    return {"status": "ok", "data": records[0]["r"]}
