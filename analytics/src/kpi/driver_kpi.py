from src.core.postgres_client import postgres_client

class DriverKPIEngine:
    """
    Calculates Driver-level KPIs using deterministic queries.
    """
    
    @staticmethod
    def get_driver_fatigue_level(driver_id: str):
        query = """
        SELECT 
            SUM(duration) AS total_driving_hours_today
        FROM trips
        WHERE driver_id = %s AND DATE(start_time) = CURRENT_DATE
        """
        results = postgres_client.fetch_all(query, (driver_id,))
        hours = results[0]['total_driving_hours_today'] if results and results[0]['total_driving_hours_today'] else 0.0
        
        # Simple heuristic mapping for fatigue level (0-100) based on max 10 hours
        fatigue = min((hours / 10.0) * 100, 100.0)
        return round(fatigue, 2)

    @staticmethod
    def get_driver_efficiency_score(driver_id: str):
        query = """
        SELECT 
            AVG(CASE WHEN actual_end_time <= scheduled_end_time THEN 1.0 ELSE 0.0 END) * 100.0 AS efficiency
        FROM trips
        WHERE driver_id = %s AND status = 'completed'
        """
        results = postgres_client.fetch_all(query, (driver_id,))
        return round(results[0]['efficiency'] or 0.0, 2)

    @staticmethod
    def get_driver_total_trips(driver_id: str):
        query = """
        SELECT COUNT(*) AS total_trips
        FROM trips
        WHERE driver_id = %s AND status = 'completed'
        """
        results = postgres_client.fetch_all(query, (driver_id,))
        return results[0]['total_trips'] if results else 0

driver_kpi_engine = DriverKPIEngine()
