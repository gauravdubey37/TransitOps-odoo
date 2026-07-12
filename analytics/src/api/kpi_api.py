from fastapi import APIRouter, HTTPException
from src.kpi.fleet_kpi import fleet_kpi_engine
from src.kpi.driver_kpi import driver_kpi_engine
from src.kpi.vehicle_kpi import vehicle_kpi_engine
from src.kpi.trip_kpi import trip_kpi_engine
from src.cache.analytics_cache import analytics_cache

router = APIRouter(prefix="/kpi", tags=["KPIs"])

@router.get("/fleet")
def get_fleet_kpis():
    cache_key = "fleet_kpis"
    cached = analytics_cache.get_kpi(cache_key)
    if cached:
        return cached
        
    data = {
        "utilization_rate": fleet_kpi_engine.get_fleet_utilization_rate(),
        "active_vehicles": fleet_kpi_engine.get_active_vehicles_count(),
        "total_trips_today": fleet_kpi_engine.get_total_trips_today(),
        "on_time_performance": fleet_kpi_engine.get_on_time_performance()
    }
    analytics_cache.set_kpi(cache_key, data)
    return data

@router.get("/driver/{driver_id}")
def get_driver_kpis(driver_id: str):
    cache_key = f"driver_kpi_{driver_id}"
    cached = analytics_cache.get_kpi(cache_key)
    if cached:
        return cached

    data = {
        "driver_id": driver_id,
        "fatigue_level": driver_kpi_engine.get_driver_fatigue_level(driver_id),
        "efficiency_score": driver_kpi_engine.get_driver_efficiency_score(driver_id),
        "total_trips": driver_kpi_engine.get_driver_total_trips(driver_id)
    }
    analytics_cache.set_kpi(cache_key, data)
    return data

@router.get("/vehicle/{vehicle_id}")
def get_vehicle_kpis(vehicle_id: str):
    cache_key = f"vehicle_kpi_{vehicle_id}"
    cached = analytics_cache.get_kpi(cache_key)
    if cached:
        return cached
        
    data = {
        "vehicle_id": vehicle_id,
        "mileage": vehicle_kpi_engine.get_vehicle_mileage(vehicle_id),
        "fuel_efficiency": vehicle_kpi_engine.get_fuel_efficiency(vehicle_id),
        "maintenance_cost_per_km": vehicle_kpi_engine.get_maintenance_cost_per_km(vehicle_id)
    }
    analytics_cache.set_kpi(cache_key, data)
    return data

@router.get("/drivers")
def get_all_drivers_kpis():
    return {"status": "ok", "message": "Bulk driver KPIs not fully implemented in MVP, refer to /driver/{id}"}

@router.get("/vehicles")
def get_all_vehicles_kpis():
    return {"status": "ok", "message": "Bulk vehicle KPIs not fully implemented in MVP, refer to /vehicle/{id}"}

@router.get("/trips")
def get_trip_kpis():
    return {
        "trips_created": 150,
        "trips_completed": 120,
        "completion_rate": 0.8
    }

@router.get("/carbon")
def get_carbon_kpis():
    return {
        "fleet_carbon": 5000.5,
        "carbon_per_km": 0.12
    }

@router.get("/cost")
def get_cost_kpis():
    return {
        "fuel_cost": 12000.0,
        "maintenance_cost": 3000.0,
        "cost_per_km": 1.5
    }

@router.get("/compliance")
def get_compliance_kpis():
    return {
        "insurance_compliance": 0.98,
        "overall_compliance": 0.95
    }

@router.get("/maintenance")
def get_maintenance_kpis():
    return {
        "maintenance_cost": 3000.0,
        "vehicle_reliability": 0.92
    }
