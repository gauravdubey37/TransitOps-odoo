-- Migration: 20260712_090800_create_driver_experience
-- Description: Create driver_experience table

CREATE TABLE driver_experience (
    experience_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    driver_id UUID NOT NULL UNIQUE REFERENCES drivers(driver_id) ON DELETE CASCADE,
    total_trips INTEGER NOT NULL DEFAULT 0,
    total_hours NUMERIC(10, 2) NOT NULL DEFAULT 0,
    total_distance NUMERIC(12, 2) NOT NULL DEFAULT 0,
    primary_vehicle_class TEXT,
    primary_route TEXT,
    primary_region TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_driver_experience_driver_id ON driver_experience(driver_id);
