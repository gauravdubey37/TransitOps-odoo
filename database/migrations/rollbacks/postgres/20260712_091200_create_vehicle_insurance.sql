-- Rollback: 20260712_091200_create_vehicle_insurance

DROP TRIGGER IF EXISTS trg_vehicle_insurance_updated_at ON vehicle_insurance;
DROP TABLE IF EXISTS vehicle_insurance CASCADE;
