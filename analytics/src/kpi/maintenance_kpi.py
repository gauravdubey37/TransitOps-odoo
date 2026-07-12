from src.core.postgres_client import postgres_client

class MaintenanceKPIEngine:
    """
    Calculates Maintenance-level KPIs using deterministic queries.
    """
    
    @staticmethod
    def get_overdue_maintenance_count():
        query = """
        SELECT COUNT(*) AS overdue_count
        FROM maintenance_logs
        WHERE status = 'pending' AND scheduled_date < CURRENT_DATE
        """
        results = postgres_client.fetch_all(query)
        return results[0]['overdue_count'] if results else 0

    @staticmethod
    def get_average_repair_time():
        query = """
        SELECT AVG(EXTRACT(EPOCH FROM (completed_date - date))/3600) AS avg_repair_hours
        FROM maintenance_logs
        WHERE status = 'completed'
        """
        results = postgres_client.fetch_all(query)
        return round(results[0]['avg_repair_hours'] or 0.0, 2) if results else 0.0

maintenance_kpi_engine = MaintenanceKPIEngine()
