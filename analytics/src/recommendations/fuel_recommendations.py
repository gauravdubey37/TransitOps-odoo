from src.core.neo4j_client import neo4j_client

class FuelRecommendationEngine:
    def recommend_fuel_saving(self):
        query = "MATCH (d:Driver) WHERE d.efficiency_score < 50 RETURN d.driver_id as id"
        res = neo4j_client.execute_read(query)
        return [{"action": "Fuel Coaching", "driver_id": r["id"]} for r in res]

fuel_recommendations = FuelRecommendationEngine()
