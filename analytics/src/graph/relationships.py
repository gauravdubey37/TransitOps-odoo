from src.core.neo4j_client import neo4j_client

class RelationshipManager:
    @staticmethod
    def create_driver_vehicle_assignment(driver_id: str, vehicle_id: str):
        query = """
        MATCH (d:Driver {driver_id: $driver_id})
        MATCH (v:Vehicle {vehicle_id: $vehicle_id})
        MERGE (d)-[r:ASSIGNED_TO]->(v)
        """
        neo4j_client.execute_write(query, driver_id=driver_id, vehicle_id=vehicle_id)

    @staticmethod
    def create_driver_trip_completion(driver_id: str, trip_id: str):
        query = """
        MATCH (d:Driver {driver_id: $driver_id})
        MATCH (t:Trip {trip_id: $trip_id})
        MERGE (d)-[r:COMPLETED]->(t)
        """
        neo4j_client.execute_write(query, driver_id=driver_id, trip_id=trip_id)

    @staticmethod
    def create_trip_vehicle_usage(trip_id: str, vehicle_id: str):
        query = """
        MATCH (t:Trip {trip_id: $trip_id})
        MATCH (v:Vehicle {vehicle_id: $vehicle_id})
        MERGE (t)-[r:USED]->(v)
        """
        neo4j_client.execute_write(query, trip_id=trip_id, vehicle_id=vehicle_id)

    @staticmethod
    def create_trip_route_followed(trip_id: str, route_id: str):
        query = """
        MATCH (t:Trip {trip_id: $trip_id})
        MATCH (r:Route {route_id: $route_id})
        MERGE (t)-[rel:FOLLOWED]->(r)
        """
        neo4j_client.execute_write(query, trip_id=trip_id, route_id=route_id)

relationship_manager = RelationshipManager()
