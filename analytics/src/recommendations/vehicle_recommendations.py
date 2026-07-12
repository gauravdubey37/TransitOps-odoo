from src.core.neo4j_client import neo4j_client

class VehicleRecommendationEngine:
    def recommend_vehicle_rotation(self):
        query = "MATCH (v:Vehicle) WHERE v.status = 'idle' RETURN v.vehicle_id as id LIMIT 5"
        res = neo4j_client.execute_read(query)
        return [{"action": "Rotate Vehicle", "vehicle_id": r["id"]} for r in res]

vehicle_recommendations = VehicleRecommendationEngine()
