-- Migration: 20260712_091200_create_vehicle_insurance
-- Description: Create vehicle_insurance table

CREATE TABLE vehicle_insurance (
    insurance_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vehicle_id UUID NOT NULL REFERENCES vehicles(vehicle_id) ON DELETE CASCADE,
    provider TEXT,
    policy_number TEXT,
    issue_date DATE,
    expiry_date DATE,
    coverage_amount NUMERIC(14, 2),
    document_path TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_vehicle_insurance_vehicle_id ON vehicle_insurance(vehicle_id);
CREATE INDEX idx_vehicle_insurance_expiry_date ON vehicle_insurance(expiry_date);

CREATE TRIGGER trg_vehicle_insurance_updated_at
    BEFORE UPDATE ON vehicle_insurance
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
