-- Migration: 20260712_091600_create_routes
-- Description: Create routes table

CREATE TABLE routes (
    route_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source TEXT NOT NULL,
    destination TEXT NOT NULL,
    distance_km NUMERIC(10, 2),
    estimated_time NUMERIC(8, 2),
    toll_cost NUMERIC(10, 2),
    average_fuel NUMERIC(10, 2),
    average_carbon NUMERIC(10, 4),
    average_cost NUMERIC(12, 2),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_routes_source_destination ON routes(source, destination);

CREATE TRIGGER trg_routes_updated_at
    BEFORE UPDATE ON routes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
