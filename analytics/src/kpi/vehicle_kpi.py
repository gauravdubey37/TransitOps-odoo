from src.core.postgres_client import postgres_client

class VehicleKPIEngine:
    """
    Calculates Vehicle-level KPIs using deterministic queries.
    """
    
    @staticmethod
    def get_vehicle_mileage(vehicle_id: str):
        query = """
        SELECT mileage
        FROM vehicles
        WHERE vehicle_id = %s
        """
        results = postgres_client.fetch_all(query, (vehicle_id,))
        return results[0]['mileage'] if results else 0.0

    @staticmethod
    def get_fuel_efficiency(vehicle_id: str):
        query = """
        SELECT 
            SUM(distance) / NULLIF(SUM(fuel_used), 0) AS fuel_efficiency
        FROM trips
        WHERE vehicle_id = %s AND status = 'completed'
        """
        results = postgres_client.fetch_all(query, (vehicle_id,))
        return round(results[0]['fuel_efficiency'] or 0.0, 2)

    @staticmethod
    def get_maintenance_cost_per_km(vehicle_id: str):
        query = """
        SELECT 
            SUM(v.maintenance_cost) / NULLIF(SUM(t.distance), 0) AS cost_per_km
        FROM vehicles v
        LEFT JOIN trips t ON v.vehicle_id = t.vehicle_id
        WHERE v.vehicle_id = %s
        """
        results = postgres_client.fetch_all(query, (vehicle_id,))
        return round(results[0]['cost_per_km'] or 0.0, 2)

vehicle_kpi_engine = VehicleKPIEngine()
