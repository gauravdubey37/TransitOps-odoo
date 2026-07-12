-- Migration: 20260712_090900_create_driver_fatigue
-- Description: Create driver_fatigue table

CREATE TABLE driver_fatigue (
    fatigue_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    driver_id UUID NOT NULL UNIQUE REFERENCES drivers(driver_id) ON DELETE CASCADE,
    continuous_hours NUMERIC(6, 2) NOT NULL DEFAULT 0,
    overtime_hours NUMERIC(6, 2) NOT NULL DEFAULT 0,
    mandatory_rest_until TIMESTAMPTZ,
    fatigue_level TEXT NOT NULL DEFAULT 'Normal',
    last_reset TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_driver_fatigue_driver_id ON driver_fatigue(driver_id);
CREATE INDEX idx_driver_fatigue_fatigue_level ON driver_fatigue(fatigue_level);
