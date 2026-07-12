-- Migration: 20260712_092200_create_voice_logs
-- Description: Create voice_logs table

CREATE TABLE voice_logs (
    voice_log_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    driver_id UUID REFERENCES drivers(driver_id),
    trip_id UUID REFERENCES trips(trip_id),
    command TEXT,
    language TEXT,
    transcription TEXT,
    executed BOOLEAN NOT NULL DEFAULT FALSE,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_voice_logs_driver_id ON voice_logs(driver_id);
CREATE INDEX idx_voice_logs_trip_id ON voice_logs(trip_id);
CREATE INDEX idx_voice_logs_timestamp ON voice_logs(timestamp);
