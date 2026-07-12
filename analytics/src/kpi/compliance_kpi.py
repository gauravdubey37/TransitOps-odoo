from src.core.postgres_client import postgres_client

class ComplianceKPIEngine:
    """
    Calculates Compliance-level KPIs using deterministic queries.
    """
    
    @staticmethod
    def get_hours_of_service_violations():
        query = """
        SELECT COUNT(*) AS violations
        FROM driver_logs
        WHERE driving_hours > 11 OR on_duty_hours > 14
        """
        results = postgres_client.fetch_all(query)
        return results[0]['violations'] if results else 0

    @staticmethod
    def get_expired_licenses_count():
        query = """
        SELECT COUNT(*) AS expired_count
        FROM drivers
        WHERE license_expiry_date < CURRENT_DATE
        """
        results = postgres_client.fetch_all(query)
        return results[0]['expired_count'] if results else 0

compliance_kpi_engine = ComplianceKPIEngine()
