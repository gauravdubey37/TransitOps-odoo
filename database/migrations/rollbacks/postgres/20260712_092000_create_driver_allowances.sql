-- Rollback: 20260712_092000_create_driver_allowances

DROP TRIGGER IF EXISTS trg_driver_allowances_updated_at ON driver_allowances;
DROP TABLE IF EXISTS driver_allowances CASCADE;
