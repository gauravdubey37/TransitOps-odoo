from fastapi import APIRouter
from src.recommendations.recommendation_engine import recommendation_engine
from src.explainability.explainer import explainer
from src.cache.analytics_cache import analytics_cache
from pydantic import BaseModel

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
    return {"status": "ok", "message": "Bulk recommendations returning mock active recs", "data": []}

@router.get("/history")
def get_recommendation_history():
    return {"status": "ok", "message": "Historical recommendations returning mock resolved recs", "data": []}

@router.get("/{rec_id}")
def get_recommendation(rec_id: str):
    return {"status": "ok", "message": f"Details for recommendation {rec_id}"}
