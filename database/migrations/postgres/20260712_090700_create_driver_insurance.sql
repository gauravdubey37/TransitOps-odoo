-- Migration: 20260712_090700_create_driver_insurance
-- Description: Create driver_insurance table

CREATE TABLE driver_insurance (
    insurance_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    driver_id UUID NOT NULL REFERENCES drivers(driver_id) ON DELETE CASCADE,
    provider TEXT,
    policy_number TEXT,
    issue_date DATE,
    expiry_date DATE,
    coverage_amount NUMERIC(14, 2),
    document_path TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_driver_insurance_driver_id ON driver_insurance(driver_id);
CREATE INDEX idx_driver_insurance_expiry_date ON driver_insurance(expiry_date);

CREATE TRIGGER trg_driver_insurance_updated_at
    BEFORE UPDATE ON driver_insurance
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
