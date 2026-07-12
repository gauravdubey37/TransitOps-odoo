-- Rollback: 20260712_090500_create_drivers

DROP TRIGGER IF EXISTS trg_drivers_updated_at ON drivers;
DROP TABLE IF EXISTS drivers CASCADE;
