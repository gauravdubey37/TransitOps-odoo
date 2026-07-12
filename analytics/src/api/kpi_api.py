from fastapi import APIRouter, HTTPException
from src.kpi.fleet_kpi import fleet_kpi_engine
from src.kpi.driver_kpi import driver_kpi_engine
from src.kpi.vehicle_kpi import vehicle_kpi_engine
from src.kpi.trip_kpi import trip_kpi_engine
from src.kpi.carbon_kpi import carbon_kpi_engine
from src.kpi.financial_kpi import financial_kpi_engine
from src.kpi.compliance_kpi import compliance_kpi_engine
from src.kpi.maintenance_kpi import maintenance_kpi_engine
from src.cache.analytics_cache import analytics_cache
from src.core.neo4j_client import neo4j_client

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
    records = neo4j_client.execute_read("MATCH (d:Driver) RETURN d.driver_id as id")
    drivers = []
    for r in records:
        d_id = r["id"]
        drivers.append({
            "driver_id": d_id,
            "fatigue_level": driver_kpi_engine.get_driver_fatigue_level(d_id),
            "efficiency_score": driver_kpi_engine.get_driver_efficiency_score(d_id),
            "total_trips": driver_kpi_engine.get_driver_total_trips(d_id)
        })
    return {"status": "ok", "data": drivers}

@router.get("/vehicles")
def get_all_vehicles_kpis():
    records = neo4j_client.execute_read("MATCH (v:Vehicle) RETURN v.vehicle_id as id")
    vehicles = []
    for r in records:
        v_id = r["id"]
        vehicles.append({
            "vehicle_id": v_id,
            "mileage": vehicle_kpi_engine.get_vehicle_mileage(v_id),
            "fuel_efficiency": vehicle_kpi_engine.get_fuel_efficiency(v_id),
            "maintenance_cost_per_km": vehicle_kpi_engine.get_maintenance_cost_per_km(v_id)
        })
    return {"status": "ok", "data": vehicles}

@router.get("/trips")
def get_trip_kpis():
    created = neo4j_client.execute_read("MATCH (t:Trip) RETURN count(t) as cnt")[0]["cnt"]
    completed = neo4j_client.execute_read("MATCH (t:Trip {status: 'completed'}) RETURN count(t) as cnt")[0]["cnt"]
    rate = completed / created if created > 0 else 0
    return {
        "trips_created": created,
        "trips_completed": completed,
        "completion_rate": rate
    }

@router.get("/carbon")
def get_carbon_kpis():
    return {
        "fleet_carbon": carbon_kpi_engine.get_total_fleet_carbon("2020-01-01", "2099-01-01"),
        "carbon_per_km": carbon_kpi_engine.get_average_carbon_per_km()
    }

@router.get("/cost")
def get_cost_kpis():
    return {
        "fleet_cost": financial_kpi_engine.get_total_fleet_cost("2020-01-01", "2099-01-01"),
        "cost_per_trip": financial_kpi_engine.get_average_cost_per_trip()
    }

@router.get("/compliance")
def get_compliance_kpis():
    return {
        "hours_violations": compliance_kpi_engine.get_hours_of_service_violations(),
        "expired_licenses": compliance_kpi_engine.get_expired_licenses_count()
    }

@router.get("/maintenance")
def get_maintenance_kpis():
    return {
        "maintenance_cost": financial_kpi_engine.get_total_maintenance_cost("2020-01-01", "2099-01-01"),
        "overdue_maintenance": maintenance_kpi_engine.get_overdue_maintenance_count(),
        "average_repair_time": maintenance_kpi_engine.get_average_repair_time()
    }
