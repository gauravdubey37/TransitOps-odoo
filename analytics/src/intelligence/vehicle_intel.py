from src.core.neo4j_client import neo4j_client

class VehicleIntelligence:
    """
    Graph-based analytical intelligence for Vehicles.
    """
    
    @staticmethod
    def get_vehicle_route_suitability(vehicle_id: str, route_id: str):
        """
        Determines if a vehicle is well-suited for a specific route based on historical performance.
        """
        query = """
        MATCH (v:Vehicle {vehicle_id: $vehicle_id})<-[:USED]-(t:Trip)-[:FOLLOWED]->(r:Route {route_id: $route_id})
        WITH avg(t.delay_minutes) as avg_delay, avg(t.fuel_used) as avg_fuel
        RETURN avg_delay, avg_fuel
        """
        results = neo4j_client.execute_read(query, vehicle_id=vehicle_id, route_id=route_id)
        
        if not results or results[0]['avg_delay'] is None:
            return "Unknown (No Data)"
            
        avg_delay = results[0]['avg_delay']
        
        if avg_delay <= 0:
            return "Highly Suitable"
        elif avg_delay <= 15:
            return "Suitable"
        else:
            return "Not Suitable (High Delay)"

vehicle_intel = VehicleIntelligence()
