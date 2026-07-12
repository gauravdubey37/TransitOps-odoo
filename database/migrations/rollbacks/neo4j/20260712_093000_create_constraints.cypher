// Rollback: 20260712_093000_create_constraints

DROP CONSTRAINT driver_id_unique IF EXISTS;
DROP CONSTRAINT vehicle_id_unique IF EXISTS;
DROP CONSTRAINT trip_id_unique IF EXISTS;
DROP CONSTRAINT route_id_unique IF EXISTS;
DROP CONSTRAINT region_id_unique IF EXISTS;
DROP CONSTRAINT depot_id_unique IF EXISTS;
DROP CONSTRAINT notification_id_unique IF EXISTS;
