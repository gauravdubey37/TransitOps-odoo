from src.core.neo4j_client import neo4j_client

class DriverRecommendationEngine:
    def recommend_driver_training(self):
        query = "MATCH (d:Driver) WHERE d.fatigue_level > 80 RETURN d.driver_id as id, d.name as name"
        res = neo4j_client.execute_read(query)
        return [{"action": "Mandatory Rest", "driver_id": r["id"]} for r in res]

driver_recommendations = DriverRecommendationEngine()
