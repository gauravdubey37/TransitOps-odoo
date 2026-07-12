-- Rollback: 20260712_091300_create_vehicle_puc

DROP TRIGGER IF EXISTS trg_vehicle_puc_updated_at ON vehicle_puc;
DROP TABLE IF EXISTS vehicle_puc CASCADE;
