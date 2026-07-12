from src.core.neo4j_client import neo4j_client

class DriverIntelligence:
    """
    Graph-based analytical intelligence for Drivers.
    """
    
    @staticmethod
    def get_route_familiarity(driver_id: str, route_id: str):
        """
        Determines a driver's familiarity with a route based on past trips.
        """
        query = """
        MATCH (d:Driver {driver_id: $driver_id})-[:COMPLETED]->(t:Trip)-[:FOLLOWED]->(r:Route {route_id: $route_id})
        RETURN count(t) as trips_on_route
        """
        results = neo4j_client.execute_read(query, driver_id=driver_id, route_id=route_id)
        count = results[0]['trips_on_route'] if results else 0
        
        if count >= 10:
            return "Expert"
        elif count >= 3:
            return "Familiar"
        else:
            return "Unfamiliar"

    @staticmethod
    def get_vehicle_familiarity(driver_id: str, vehicle_class: str):
        """
        Determines a driver's familiarity with a specific class of vehicle.
        """
        query = """
        MATCH (d:Driver {driver_id: $driver_id})-[:COMPLETED]->(t:Trip)-[:USED]->(v:Vehicle {vehicle_class: $vehicle_class})
        RETURN count(t) as trips_in_vehicle_class
        """
        results = neo4j_client.execute_read(query, driver_id=driver_id, vehicle_class=vehicle_class)
        count = results[0]['trips_in_vehicle_class'] if results else 0
        
        if count >= 20:
            return "Expert"
        elif count >= 5:
            return "Familiar"
        else:
            return "Unfamiliar"

driver_intel = DriverIntelligence()
