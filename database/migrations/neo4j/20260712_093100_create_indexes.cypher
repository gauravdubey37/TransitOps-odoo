// Migration: 20260712_093100_create_indexes
// Description: Create indexes for Neo4j node properties

CREATE INDEX driver_employee_code IF NOT EXISTS FOR (d:Driver) ON (d.employee_code);
CREATE INDEX driver_status IF NOT EXISTS FOR (d:Driver) ON (d.status);
CREATE INDEX vehicle_registration IF NOT EXISTS FOR (v:Vehicle) ON (v.registration_number);
CREATE INDEX vehicle_status IF NOT EXISTS FOR (v:Vehicle) ON (v.status);
CREATE INDEX trip_status IF NOT EXISTS FOR (t:Trip) ON (t.status);
CREATE INDEX route_source IF NOT EXISTS FOR (r:Route) ON (r.source);
CREATE INDEX region_name IF NOT EXISTS FOR (r:Region) ON (r.region_name);
