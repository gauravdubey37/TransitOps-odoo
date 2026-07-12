from src.core.neo4j_client import neo4j_client

class FleetRecommendationEngine:
    def recommend_fleet_rebalancing(self):
        query = "MATCH (d:Depot) RETURN d.depot_id as id, d.capacity as cap LIMIT 2"
        res = neo4j_client.execute_read(query)
        if len(res) == 2:
            return [{"action": "Move Vehicles", "from": res[0]["id"], "to": res[1]["id"]}]
        return []

fleet_recommendations = FleetRecommendationEngine()
