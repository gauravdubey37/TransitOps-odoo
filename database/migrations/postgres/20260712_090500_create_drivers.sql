-- Migration: 20260712_090500_create_drivers
-- Description: Create drivers table

CREATE TABLE drivers (
    driver_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_code TEXT NOT NULL UNIQUE,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    address TEXT,
    joining_date DATE,
    salary NUMERIC(12, 2),
    driver_status TEXT NOT NULL DEFAULT 'Available',
    current_region_id UUID REFERENCES regions(region_id),
    current_depot_id UUID REFERENCES depots(depot_id),
    user_id UUID REFERENCES users(user_id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_drivers_employee_code ON drivers(employee_code);
CREATE INDEX idx_drivers_driver_status ON drivers(driver_status);
CREATE INDEX idx_drivers_current_region_id ON drivers(current_region_id);
CREATE INDEX idx_drivers_current_depot_id ON drivers(current_depot_id);
CREATE INDEX idx_drivers_user_id ON drivers(user_id);

CREATE TRIGGER trg_drivers_updated_at
    BEFORE UPDATE ON drivers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
