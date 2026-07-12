-- Migration: 20260712_090600_create_driver_licenses
-- Description: Create driver_licenses table

CREATE TABLE driver_licenses (
    license_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    driver_id UUID NOT NULL REFERENCES drivers(driver_id) ON DELETE CASCADE,
    license_number TEXT NOT NULL,
    license_type TEXT,
    issue_date DATE,
    expiry_date DATE,
    issuing_authority TEXT,
    document_path TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_driver_licenses_driver_id ON driver_licenses(driver_id);
CREATE INDEX idx_driver_licenses_expiry_date ON driver_licenses(expiry_date);

CREATE TRIGGER trg_driver_licenses_updated_at
    BEFORE UPDATE ON driver_licenses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
