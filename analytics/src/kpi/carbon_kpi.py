from src.core.postgres_client import postgres_client

class CarbonKPIEngine:
    """
    Calculates Carbon-level KPIs using deterministic queries.
    """
    
    @staticmethod
    def get_total_fleet_carbon(start_date: str, end_date: str):
        query = """
        SELECT SUM(carbon) AS total_carbon
        FROM trips
        WHERE DATE(start_time) BETWEEN %s AND %s
        """
        results = postgres_client.fetch_all(query, (start_date, end_date))
        return round(results[0]['total_carbon'] or 0.0, 2) if results else 0.0

    @staticmethod
    def get_average_carbon_per_km():
        query = """
        SELECT SUM(carbon) / NULLIF(SUM(distance), 0) AS avg_carbon_per_km
        FROM trips
        WHERE status = 'completed'
        """
        results = postgres_client.fetch_all(query)
        return round(results[0]['avg_carbon_per_km'] or 0.0, 2) if results else 0.0

carbon_kpi_engine = CarbonKPIEngine()
