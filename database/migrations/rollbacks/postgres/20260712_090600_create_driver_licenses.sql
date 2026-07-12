-- Rollback: 20260712_090600_create_driver_licenses

DROP TRIGGER IF EXISTS trg_driver_licenses_updated_at ON driver_licenses;
DROP TABLE IF EXISTS driver_licenses CASCADE;
