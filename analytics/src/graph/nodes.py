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

    @staticmethod
    def merge_route(route_data: dict):
        query = """
        MERGE (r:Route {route_id: $route_id})
        SET r.start_point = $start_point,
            r.end_point = $end_point,
            r.distance = $distance,
            r.typical_duration = $typical_duration
        """
        neo4j_client.execute_write(query, **route_data)

    @staticmethod
    def merge_depot(depot_data: dict):
        query = """
        MERGE (d:Depot {depot_id: $depot_id})
        SET d.name = $name,
            d.location = $location,
            d.capacity = $capacity
        """
        neo4j_client.execute_write(query, **depot_data)

    @staticmethod
    def merge_region(region_data: dict):
        query = """
        MERGE (r:Region {region_id: $region_id})
        SET r.name = $name
        """
        neo4j_client.execute_write(query, **region_data)

    @staticmethod
    def merge_fuel_log(fuel_data: dict):
        query = """
        MERGE (f:FuelLog {log_id: $log_id})
        SET f.amount = $amount,
            f.cost = $cost,
            f.date = $date
        """
        neo4j_client.execute_write(query, **fuel_data)

    @staticmethod
    def merge_expense(expense_data: dict):
        query = """
        MERGE (e:Expense {expense_id: $expense_id})
        SET e.type = $type,
            e.amount = $amount,
            e.date = $date
        """
        neo4j_client.execute_write(query, **expense_data)

    @staticmethod
    def merge_maintenance(maintenance_data: dict):
        query = """
        MERGE (m:Maintenance {maintenance_id: $maintenance_id})
        SET m.type = $type,
            m.cost = $cost,
            m.date = $date
        """
        neo4j_client.execute_write(query, **maintenance_data)

    @staticmethod
    def merge_carbon_record(carbon_data: dict):
        query = """
        MERGE (c:CarbonRecord {record_id: $record_id})
        SET c.emissions = $emissions,
            c.date = $date
        """
        neo4j_client.execute_write(query, **carbon_data)

    @staticmethod
    def merge_recommendation(rec_data: dict):
        query = """
        MERGE (r:Recommendation {rec_id: $rec_id})
        SET r.type = $type,
            r.confidence = $confidence,
            r.status = $status
        """
        neo4j_client.execute_write(query, **rec_data)

    @staticmethod
    def merge_notification(notif_data: dict):
        query = """
        MERGE (n:Notification {notif_id: $notif_id})
        SET n.type = $type,
            n.severity = $severity,
            n.message = $message
        """
        neo4j_client.execute_write(query, **notif_data)

node_manager = NodeManager()
