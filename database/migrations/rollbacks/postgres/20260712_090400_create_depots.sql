-- Rollback: 20260712_090400_create_depots

DROP TRIGGER IF EXISTS trg_depots_updated_at ON depots;
DROP TABLE IF EXISTS depots CASCADE;
