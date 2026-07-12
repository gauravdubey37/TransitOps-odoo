-- Migration: 20260712_091700_create_trips
-- Description: Create trips table

CREATE TABLE trips (
    trip_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    driver_id UUID REFERENCES drivers(driver_id),
    vehicle_id UUID REFERENCES vehicles(vehicle_id),
    route_id UUID REFERENCES routes(route_id),
    status TEXT NOT NULL DEFAULT 'Scheduled',
    start_time TIMESTAMPTZ,
    end_time TIMESTAMPTZ,
    planned_distance NUMERIC(10, 2),
    actual_distance NUMERIC(10, 2),
    planned_duration NUMERIC(8, 2),
    actual_duration NUMERIC(8, 2),
    toll_cost NUMERIC(10, 2),
    carbon_emission NUMERIC(10, 4),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_trips_driver_id ON trips(driver_id);
CREATE INDEX idx_trips_vehicle_id ON trips(vehicle_id);
CREATE INDEX idx_trips_route_id ON trips(route_id);
CREATE INDEX idx_trips_status ON trips(status);
CREATE INDEX idx_trips_start_time ON trips(start_time);

CREATE TRIGGER trg_trips_updated_at
    BEFORE UPDATE ON trips
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
