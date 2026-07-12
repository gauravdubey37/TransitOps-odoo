-- Migration: 20260712_092000_create_driver_allowances
-- Description: Create driver_allowances table

CREATE TABLE driver_allowances (
    allowance_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    driver_id UUID NOT NULL REFERENCES drivers(driver_id) ON DELETE CASCADE,
    trip_id UUID REFERENCES trips(trip_id),
    amount NUMERIC(10, 2) NOT NULL,
    description TEXT,
    approval_status TEXT NOT NULL DEFAULT 'Pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_driver_allowances_driver_id ON driver_allowances(driver_id);
CREATE INDEX idx_driver_allowances_trip_id ON driver_allowances(trip_id);
CREATE INDEX idx_driver_allowances_approval_status ON driver_allowances(approval_status);

CREATE TRIGGER trg_driver_allowances_updated_at
    BEFORE UPDATE ON driver_allowances
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
