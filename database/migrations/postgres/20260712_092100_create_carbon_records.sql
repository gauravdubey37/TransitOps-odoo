-- Migration: 20260712_092100_create_carbon_records
-- Description: Create carbon_records table

CREATE TABLE carbon_records (
    carbon_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trip_id UUID REFERENCES trips(trip_id),
    vehicle_id UUID REFERENCES vehicles(vehicle_id),
    emission_factor NUMERIC(10, 6),
    total_emission NUMERIC(12, 4),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_carbon_records_trip_id ON carbon_records(trip_id);
CREATE INDEX idx_carbon_records_vehicle_id ON carbon_records(vehicle_id);
