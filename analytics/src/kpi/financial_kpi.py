from src.core.postgres_client import postgres_client

class FinancialKPIEngine:
    """
    Calculates Financial-level KPIs using deterministic queries.
    """
    
    @staticmethod
    def get_total_fleet_cost(start_date: str, end_date: str):
        query = """
        SELECT SUM(cost + toll_cost) AS total_cost
        FROM trips
        WHERE DATE(start_time) BETWEEN %s AND %s
        """
        results = postgres_client.fetch_all(query, (start_date, end_date))
        return round(results[0]['total_cost'] or 0.0, 2) if results else 0.0

    @staticmethod
    def get_average_cost_per_trip():
        query = """
        SELECT AVG(cost + toll_cost) AS avg_cost_per_trip
        FROM trips
        WHERE status = 'completed'
        """
        results = postgres_client.fetch_all(query)
        return round(results[0]['avg_cost_per_trip'] or 0.0, 2) if results else 0.0

    @staticmethod
    def get_total_maintenance_cost(start_date: str, end_date: str):
        query = """
        SELECT SUM(amount) AS total_maintenance_cost
        FROM maintenance_logs
        WHERE DATE(date) BETWEEN %s AND %s
        """
        results = postgres_client.fetch_all(query, (start_date, end_date))
        return round(results[0]['total_maintenance_cost'] or 0.0, 2) if results else 0.0

financial_kpi_engine = FinancialKPIEngine()
