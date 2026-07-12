-- Rollback: 20260712_091400_create_vehicle_tires

DROP TRIGGER IF EXISTS trg_vehicle_tires_updated_at ON vehicle_tires;
DROP TABLE IF EXISTS vehicle_tires CASCADE;
