-- Migration: 20260712_090400_create_depots
-- Description: Create depots table

CREATE TABLE depots (
    depot_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    depot_name TEXT NOT NULL,
    region_id UUID REFERENCES regions(region_id),
    address TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_depots_region_id ON depots(region_id);
CREATE INDEX idx_depots_depot_name ON depots(depot_name);

CREATE TRIGGER trg_depots_updated_at
    BEFORE UPDATE ON depots
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
