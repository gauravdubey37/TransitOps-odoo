-- Rollback: 20260712_090000_create_extensions

DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;
DROP TABLE IF EXISTS schema_migrations CASCADE;
DROP EXTENSION IF EXISTS "pgcrypto";
DROP EXTENSION IF EXISTS "uuid-ossp";
