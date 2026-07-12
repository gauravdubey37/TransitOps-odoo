-- Rollback: 20260712_092500_create_system_settings

DROP TRIGGER IF EXISTS trg_system_settings_updated_at ON system_settings;
DROP TABLE IF EXISTS system_settings CASCADE;
