from src.core.neo4j_client import neo4j_client

class RouteIntelligence:
    """
    Graph-based analytical intelligence for Routes.
    """
    
    @staticmethod
    def get_route_bottlenecks(route_id: str):
        """
        Identifies if a route frequently causes delays based on graph traversal.
        """
        query = """
        MATCH (r:Route {route_id: $route_id})<-[:FOLLOWED]-(t:Trip)
        WITH count(t) as total_trips, 
             sum(CASE WHEN t.delay_minutes > 15 THEN 1 ELSE 0 END) as delayed_trips
        RETURN total_trips, delayed_trips, 
               (toFloat(delayed_trips) / total_trips) * 100 as delay_percentage
        """
        results = neo4j_client.execute_read(query, route_id=route_id)
        
        if not results or results[0]['total_trips'] == 0:
            return "Unknown"
            
        delay_pct = results[0]['delay_percentage']
        
        if delay_pct > 30:
            return "High Bottleneck Risk"
        elif delay_pct > 10:
            return "Moderate Bottleneck Risk"
        else:
            return "Low Risk"

route_intel = RouteIntelligence()
