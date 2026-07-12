-- Rollback: 20260712_091100_create_vehicles

DROP TRIGGER IF EXISTS trg_vehicles_updated_at ON vehicles;
DROP TABLE IF EXISTS vehicles CASCADE;
