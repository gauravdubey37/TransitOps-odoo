-- Migration: 20260712_091800_create_fuel_logs
-- Description: Create fuel_logs table

CREATE TABLE fuel_logs (
    fuel_log_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trip_id UUID REFERENCES trips(trip_id),
    driver_id UUID REFERENCES drivers(driver_id),
    vehicle_id UUID REFERENCES vehicles(vehicle_id),
    quantity NUMERIC(10, 3) NOT NULL,
    cost NUMERIC(10, 2),
    fuel_station TEXT,
    odometer NUMERIC(12, 2),
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_fuel_logs_trip_id ON fuel_logs(trip_id);
CREATE INDEX idx_fuel_logs_driver_id ON fuel_logs(driver_id);
CREATE INDEX idx_fuel_logs_vehicle_id ON fuel_logs(vehicle_id);
CREATE INDEX idx_fuel_logs_timestamp ON fuel_logs(timestamp);
