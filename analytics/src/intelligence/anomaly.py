from src.core.postgres_client import postgres_client

class AnomalyDetector:
    """
    Detects anomalies in operational data.
    """
    
    @staticmethod
    def detect_expense_anomalies():
        """
        Identifies trips where the total cost is significantly higher than average.
        """
        query = """
        WITH avg_cost AS (
            SELECT AVG(cost + toll_cost) as expected_cost
            FROM trips
        )
        SELECT t.trip_id, (t.cost + t.toll_cost) as actual_cost, a.expected_cost
        FROM trips t, avg_cost a
        WHERE (t.cost + t.toll_cost) > (a.expected_cost * 2.5)
        """
        results = postgres_client.fetch_all(query)
        return results

    @staticmethod
    def detect_fuel_anomalies():
        """
        Identifies trips where fuel consumption is abnormally high compared to distance.
        """
        query = """
        SELECT trip_id, distance, fuel_used, (fuel_used / NULLIF(distance, 0)) as fuel_rate
        FROM trips
        WHERE status = 'completed' AND (fuel_used / NULLIF(distance, 0)) > 0.8
        """
        results = postgres_client.fetch_all(query)
        return results

anomaly_detector = AnomalyDetector()
