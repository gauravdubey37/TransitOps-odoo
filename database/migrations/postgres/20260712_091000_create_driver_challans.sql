-- Migration: 20260712_091000_create_driver_challans
-- Description: Create driver_challans table

CREATE TABLE driver_challans (
    challan_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    driver_id UUID NOT NULL REFERENCES drivers(driver_id) ON DELETE CASCADE,
    violation_type TEXT NOT NULL,
    amount NUMERIC(10, 2),
    location TEXT,
    issued_date DATE,
    payment_status TEXT NOT NULL DEFAULT 'Pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_driver_challans_driver_id ON driver_challans(driver_id);
CREATE INDEX idx_driver_challans_payment_status ON driver_challans(payment_status);
