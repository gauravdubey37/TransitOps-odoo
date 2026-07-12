// Rollback: 20260712_093100_create_indexes

DROP INDEX driver_employee_code IF EXISTS;
DROP INDEX driver_status IF EXISTS;
DROP INDEX vehicle_registration IF EXISTS;
DROP INDEX vehicle_status IF EXISTS;
DROP INDEX trip_status IF EXISTS;
DROP INDEX route_source IF EXISTS;
DROP INDEX region_name IF EXISTS;
