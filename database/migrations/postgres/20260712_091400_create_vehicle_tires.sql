-- Migration: 20260712_091400_create_vehicle_tires
-- Description: Create vehicle_tires table

CREATE TABLE vehicle_tires (
    tire_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vehicle_id UUID NOT NULL REFERENCES vehicles(vehicle_id) ON DELETE CASCADE,
    position TEXT,
    installation_date DATE,
    replacement_date DATE,
    expected_lifespan_km NUMERIC(10, 2),
    current_distance NUMERIC(10, 2) NOT NULL DEFAULT 0,
    manufacturer TEXT,
    model TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_vehicle_tires_vehicle_id ON vehicle_tires(vehicle_id);

CREATE TRIGGER trg_vehicle_tires_updated_at
    BEFORE UPDATE ON vehicle_tires
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
