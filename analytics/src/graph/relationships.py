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

    @staticmethod
    def create_vehicle_depot(vehicle_id: str, depot_id: str):
        query = """
        MATCH (v:Vehicle {vehicle_id: $vehicle_id})
        MATCH (d:Depot {depot_id: $depot_id})
        MERGE (v)-[rel:LOCATED_AT]->(d)
        """
        neo4j_client.execute_write(query, vehicle_id=vehicle_id, depot_id=depot_id)

    @staticmethod
    def create_driver_depot(driver_id: str, depot_id: str):
        query = """
        MATCH (dr:Driver {driver_id: $driver_id})
        MATCH (d:Depot {depot_id: $depot_id})
        MERGE (dr)-[rel:BASED_AT]->(d)
        """
        neo4j_client.execute_write(query, driver_id=driver_id, depot_id=depot_id)

    @staticmethod
    def create_trip_expense(trip_id: str, expense_id: str):
        query = """
        MATCH (t:Trip {trip_id: $trip_id})
        MATCH (e:Expense {expense_id: $expense_id})
        MERGE (t)-[rel:INCURRED]->(e)
        """
        neo4j_client.execute_write(query, trip_id=trip_id, expense_id=expense_id)

    @staticmethod
    def create_trip_fuel(trip_id: str, log_id: str):
        query = """
        MATCH (t:Trip {trip_id: $trip_id})
        MATCH (f:FuelLog {log_id: $log_id})
        MERGE (t)-[rel:CONSUMED]->(f)
        """
        neo4j_client.execute_write(query, trip_id=trip_id, log_id=log_id)

relationship_manager = RelationshipManager()
