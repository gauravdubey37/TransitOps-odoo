-- Rollback: 20260712_091500_create_maintenance_records

DROP TRIGGER IF EXISTS trg_maintenance_records_updated_at ON maintenance_records;
DROP TABLE IF EXISTS maintenance_records CASCADE;
