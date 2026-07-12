-- Migration: 20260712_091900_create_trip_expenses
-- Description: Create trip_expenses table

CREATE TABLE trip_expenses (
    expense_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trip_id UUID REFERENCES trips(trip_id),
    driver_id UUID REFERENCES drivers(driver_id),
    category TEXT NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    description TEXT,
    receipt_path TEXT,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_trip_expenses_trip_id ON trip_expenses(trip_id);
CREATE INDEX idx_trip_expenses_driver_id ON trip_expenses(driver_id);
CREATE INDEX idx_trip_expenses_category ON trip_expenses(category);
