-- Rollback: 20260712_091700_create_trips

DROP TRIGGER IF EXISTS trg_trips_updated_at ON trips;
DROP TABLE IF EXISTS trips CASCADE;
