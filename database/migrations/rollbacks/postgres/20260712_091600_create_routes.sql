-- Rollback: 20260712_091600_create_routes

DROP TRIGGER IF EXISTS trg_routes_updated_at ON routes;
DROP TABLE IF EXISTS routes CASCADE;
