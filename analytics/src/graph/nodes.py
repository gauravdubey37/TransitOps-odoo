from src.core.neo4j_client import neo4j_client

class NodeManager:
    @staticmethod
    def merge_driver(driver_data: dict):
        query = """
        MERGE (d:Driver {driver_id: $driver_id})
        SET d.employee_code = $employee_code,
            d.name = $name,
            d.experience_years = $experience_years,
            d.completed_trips = $completed_trips,
            d.total_hours = $total_hours,
            d.fatigue_level = $fatigue_level,
            d.salary = $salary,
            d.license_type = $license_type,
            d.status = $status
        """
        neo4j_client.execute_write(query, **driver_data)

    @staticmethod
    def merge_vehicle(vehicle_data: dict):
        query = """
        MERGE (v:Vehicle {vehicle_id: $vehicle_id})
        SET v.registration_number = $registration_number,
            v.vehicle_class = $vehicle_class,
            v.fuel_type = $fuel_type,
            v.mileage = $mileage,
            v.load_capacity = $load_capacity,
            v.maintenance_cost = $maintenance_cost,
            v.status = $status
        """
        neo4j_client.execute_write(query, **vehicle_data)

    @staticmethod
    def merge_trip(trip_data: dict):
        query = """
        MERGE (t:Trip {trip_id: $trip_id})
        SET t.status = $status,
            t.distance = $distance,
            t.duration = $duration,
            t.fuel_used = $fuel_used,
            t.carbon = $carbon,
            t.cost = $cost,
            t.toll_cost = $toll_cost,
            t.start_time = $start_time,
            t.end_time = $end_time
        """
        neo4j_client.execute_write(query, **trip_data)

node_manager = NodeManager()
