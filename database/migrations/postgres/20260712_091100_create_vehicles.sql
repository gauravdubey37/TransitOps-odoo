-- Migration: 20260712_091100_create_vehicles
-- Description: Create vehicles table

CREATE TABLE vehicles (
    vehicle_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    registration_number TEXT NOT NULL UNIQUE,
    vehicle_class TEXT,
    manufacturer TEXT,
    model TEXT,
    manufacturing_year INTEGER,
    fuel_type TEXT,
    mileage NUMERIC(8, 2),
    load_capacity NUMERIC(10, 2),
    current_odometer NUMERIC(12, 2) NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'Available',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_vehicles_registration_number ON vehicles(registration_number);
CREATE INDEX idx_vehicles_status ON vehicles(status);

CREATE TRIGGER trg_vehicles_updated_at
    BEFORE UPDATE ON vehicles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
