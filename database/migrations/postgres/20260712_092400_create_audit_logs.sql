-- Migration: 20260712_092400_create_audit_logs
-- Description: Create audit_logs table

CREATE TABLE audit_logs (
    audit_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id),
    module TEXT NOT NULL,
    action TEXT NOT NULL,
    entity TEXT,
    entity_id UUID,
    previous_state JSONB,
    new_state JSONB,
    ip_address INET,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_module ON audit_logs(module);
CREATE INDEX idx_audit_logs_timestamp ON audit_logs(timestamp);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity, entity_id);
