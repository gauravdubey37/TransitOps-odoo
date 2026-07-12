-- Migration: 20260712_092700_create_views
-- Description: Create reporting views

CREATE OR REPLACE VIEW v_active_drivers AS
SELECT
    d.driver_id,
    d.employee_code,
    d.first_name,
    d.last_name,
    d.driver_status,
    r.region_name,
    dp.depot_name
FROM drivers d
LEFT JOIN regions r ON d.current_region_id = r.region_id
LEFT JOIN depots dp ON d.current_depot_id = dp.depot_id
WHERE d.driver_status NOT IN ('Inactive');

CREATE OR REPLACE VIEW v_active_vehicles AS
SELECT
    vehicle_id,
    registration_number,
    vehicle_class,
    manufacturer,
    model,
    status,
    current_odometer
FROM vehicles
WHERE status NOT IN ('Inactive', 'Retired');

CREATE OR REPLACE VIEW v_trip_summary AS
SELECT
    t.trip_id,
    t.status,
    t.start_time,
    t.end_time,
    t.actual_distance,
    t.carbon_emission,
    d.employee_code AS driver_code,
    v.registration_number AS vehicle_registration,
    rt.source AS route_source,
    rt.destination AS route_destination
FROM trips t
LEFT JOIN drivers d ON t.driver_id = d.driver_id
LEFT JOIN vehicles v ON t.vehicle_id = v.vehicle_id
LEFT JOIN routes rt ON t.route_id = rt.route_id;
