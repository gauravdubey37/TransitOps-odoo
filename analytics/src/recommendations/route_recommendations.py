from src.core.neo4j_client import neo4j_client

class RouteRecommendationEngine:
    def recommend_alternative_route(self, current_route_id: str):
        query = "MATCH (r:Route) WHERE r.route_id <> $current_route_id AND r.average_delay < 15 RETURN r.route_id as id LIMIT 1"
        res = neo4j_client.execute_read(query, current_route_id=current_route_id)
        if res:
            return [{"action": "Switch Route", "new_route_id": res[0]["id"]}]
        return []

route_recommendations = RouteRecommendationEngine()
