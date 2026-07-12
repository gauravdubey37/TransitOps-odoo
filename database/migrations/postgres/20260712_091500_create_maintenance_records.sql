-- Migration: 20260712_091500_create_maintenance_records
-- Description: Create maintenance_records table

CREATE TABLE maintenance_records (
    maintenance_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vehicle_id UUID NOT NULL REFERENCES vehicles(vehicle_id) ON DELETE CASCADE,
    service_type TEXT NOT NULL,
    service_date DATE NOT NULL,
    workshop TEXT,
    cost NUMERIC(12, 2),
    odometer NUMERIC(12, 2),
    remarks TEXT,
    next_service_date DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_maintenance_records_vehicle_id ON maintenance_records(vehicle_id);
CREATE INDEX idx_maintenance_records_service_date ON maintenance_records(service_date);

CREATE TRIGGER trg_maintenance_records_updated_at
    BEFORE UPDATE ON maintenance_records
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
