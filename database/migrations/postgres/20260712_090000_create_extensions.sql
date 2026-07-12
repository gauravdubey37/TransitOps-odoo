-- Migration: 20260712_090000_create_extensions
-- Description: Enable PostgreSQL extensions and schema migrations table

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS schema_migrations (
    version TEXT PRIMARY KEY,
    filename TEXT NOT NULL,
    checksum TEXT,
    applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    execution_time_ms INTEGER,
    success BOOLEAN NOT NULL DEFAULT TRUE
);

-- Updated_at trigger function (reused across tables)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
