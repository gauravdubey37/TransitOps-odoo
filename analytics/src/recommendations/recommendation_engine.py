from src.core.neo4j_client import neo4j_client

class RecommendationEngine:
    """
    Generates explainable operational recommendations.
    """
    
    @staticmethod
    def get_driver_assignment_recommendations(route_id: str, vehicle_class: str):
        """
        Recommends drivers for a given route and vehicle class.
        """
        # A simple graph heuristic: Find drivers who are familiar with the route AND the vehicle class
        query = """
        MATCH (d:Driver)-[:COMPLETED]->(t1:Trip)-[:FOLLOWED]->(r:Route {route_id: $route_id})
        MATCH (d)-[:COMPLETED]->(t2:Trip)-[:USED]->(v:Vehicle {vehicle_class: $vehicle_class})
        WHERE d.status = 'active'
        WITH d, count(t1) as route_exp, count(t2) as vehicle_exp
        RETURN d.driver_id as driver_id, d.name as name, 
               (route_exp * 0.6 + vehicle_exp * 0.4) as score
        ORDER BY score DESC
        LIMIT 5
        """
        results = neo4j_client.execute_read(query, route_id=route_id, vehicle_class=vehicle_class)
        
        recommendations = []
        for res in results:
            recommendations.append({
                "driver_id": res["driver_id"],
                "name": res["name"],
                "score": round(res["score"], 2),
                "reasoning": f"Driver has high familiarity with the route and {vehicle_class} vehicles."
            })
            
        return recommendations

recommendation_engine = RecommendationEngine()
