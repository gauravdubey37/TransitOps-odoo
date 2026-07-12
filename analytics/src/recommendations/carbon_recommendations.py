from src.core.neo4j_client import neo4j_client

class CarbonRecommendationEngine:
    def recommend_carbon_reduction(self):
        query = "MATCH (v:Vehicle) WHERE v.type = 'Diesel' RETURN v.vehicle_id as id LIMIT 2"
        res = neo4j_client.execute_read(query)
        return [{"action": "Consider EV Upgrade", "vehicle_id": r["id"]} for r in res]

carbon_recommendations = CarbonRecommendationEngine()
