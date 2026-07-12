// Migration: 20260712_093000_create_constraints
// Description: Create unique constraints for Neo4j node labels

CREATE CONSTRAINT driver_id_unique IF NOT EXISTS
FOR (d:Driver) REQUIRE d.driver_id IS UNIQUE;

CREATE CONSTRAINT vehicle_id_unique IF NOT EXISTS
FOR (v:Vehicle) REQUIRE v.vehicle_id IS UNIQUE;

CREATE CONSTRAINT trip_id_unique IF NOT EXISTS
FOR (t:Trip) REQUIRE t.trip_id IS UNIQUE;

CREATE CONSTRAINT route_id_unique IF NOT EXISTS
FOR (r:Route) REQUIRE r.route_id IS UNIQUE;

CREATE CONSTRAINT region_id_unique IF NOT EXISTS
FOR (r:Region) REQUIRE r.region_id IS UNIQUE;

CREATE CONSTRAINT depot_id_unique IF NOT EXISTS
FOR (d:Depot) REQUIRE d.depot_id IS UNIQUE;

CREATE CONSTRAINT notification_id_unique IF NOT EXISTS
FOR (n:Notification) REQUIRE n.notification_id IS UNIQUE;
