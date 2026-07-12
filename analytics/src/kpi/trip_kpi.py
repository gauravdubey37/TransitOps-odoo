from src.core.postgres_client import postgres_client

class TripKPIEngine:
    """
    Calculates Trip-level KPIs using deterministic queries.
    """
    
    @staticmethod
    def get_trip_delay(trip_id: str):
        query = """
        SELECT 
            EXTRACT(EPOCH FROM (actual_end_time - scheduled_end_time))/60 AS delay_minutes
        FROM trips
        WHERE trip_id = %s AND status = 'completed'
        """
        results = postgres_client.fetch_all(query, (trip_id,))
        return round(results[0]['delay_minutes'] or 0.0, 2) if results else 0.0

    @staticmethod
    def get_trip_cost(trip_id: str):
        query = """
        SELECT cost, toll_cost, (cost + toll_cost) as total_cost
        FROM trips
        WHERE trip_id = %s
        """
        results = postgres_client.fetch_all(query, (trip_id,))
        if not results:
            return 0.0
        return round(results[0]['total_cost'] or 0.0, 2)

    @staticmethod
    def get_trip_carbon_emission(trip_id: str):
        query = """
        SELECT carbon
        FROM trips
        WHERE trip_id = %s
        """
        results = postgres_client.fetch_all(query, (trip_id,))
        return round(results[0]['carbon'] or 0.0, 2) if results else 0.0

trip_kpi_engine = TripKPIEngine()
