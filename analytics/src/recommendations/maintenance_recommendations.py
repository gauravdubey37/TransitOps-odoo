from src.core.neo4j_client import neo4j_client

class MaintenanceRecommendationEngine:
    def recommend_maintenance(self):
        query = "MATCH (v:Vehicle) WHERE v.mileage > 100000 RETURN v.vehicle_id as id"
        res = neo4j_client.execute_read(query)
        return [{"action": "Schedule Maintenance", "vehicle_id": r["id"]} for r in res]

maintenance_recommendations = MaintenanceRecommendationEngine()
