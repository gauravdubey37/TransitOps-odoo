from src.core.postgres_client import postgres_client

class FleetKPIEngine:
    """
    Calculates Fleet-level KPIs using deterministic queries.
    """
    
    @staticmethod
    def get_fleet_utilization_rate():
        query = """
        SELECT 
            COUNT(*) FILTER (WHERE status = 'active' OR status = 'in_trip') * 100.0 / NULLIF(COUNT(*), 0) AS utilization_rate
        FROM vehicles
        """
        results = postgres_client.fetch_all(query)
        return results[0]['utilization_rate'] if results else 0.0

    @staticmethod
    def get_active_vehicles_count():
        query = """
        SELECT COUNT(*) AS active_vehicles
        FROM vehicles
        WHERE status = 'active' OR status = 'in_trip'
        """
        results = postgres_client.fetch_all(query)
        return results[0]['active_vehicles'] if results else 0

    @staticmethod
    def get_total_trips_today():
        query = """
        SELECT COUNT(*) AS total_trips
        FROM trips
        WHERE DATE(start_time) = CURRENT_DATE
        """
        results = postgres_client.fetch_all(query)
        return results[0]['total_trips'] if results else 0

    @staticmethod
    def get_on_time_performance():
        query = """
        SELECT 
            COUNT(*) FILTER (WHERE status = 'completed' AND actual_end_time <= scheduled_end_time) * 100.0 / 
            NULLIF(COUNT(*) FILTER (WHERE status = 'completed'), 0) AS on_time_performance
        FROM trips
        WHERE DATE(start_time) = CURRENT_DATE
        """
        results = postgres_client.fetch_all(query)
        return results[0]['on_time_performance'] if results else 0.0

fleet_kpi_engine = FleetKPIEngine()
