-- Rollback: 20260712_090300_create_regions

DROP TRIGGER IF EXISTS trg_regions_updated_at ON regions;
DROP TABLE IF EXISTS regions CASCADE;
