-- Migration: 20260712_091300_create_vehicle_puc
-- Description: Create vehicle_puc table

CREATE TABLE vehicle_puc (
    puc_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vehicle_id UUID NOT NULL REFERENCES vehicles(vehicle_id) ON DELETE CASCADE,
    certificate_number TEXT,
    issue_date DATE,
    expiry_date DATE,
    document_path TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_vehicle_puc_vehicle_id ON vehicle_puc(vehicle_id);
CREATE INDEX idx_vehicle_puc_expiry_date ON vehicle_puc(expiry_date);

CREATE TRIGGER trg_vehicle_puc_updated_at
    BEFORE UPDATE ON vehicle_puc
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
