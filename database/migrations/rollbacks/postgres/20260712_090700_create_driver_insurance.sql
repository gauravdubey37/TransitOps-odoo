-- Rollback: 20260712_090700_create_driver_insurance

DROP TRIGGER IF EXISTS trg_driver_insurance_updated_at ON driver_insurance;
DROP TABLE IF EXISTS driver_insurance CASCADE;
