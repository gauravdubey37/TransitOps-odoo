# TransitOps PostgreSQL Schema

Version: 1.0

Status: Schema Freeze

Last Updated: YYYY-MM-DD

---

# Purpose

This document defines the complete PostgreSQL database schema for TransitOps.

It specifies:

- Every table
- Every column
- Data types
- Primary Keys
- Foreign Keys
- Constraints
- Indexes
- Relationships

This document is the single source of truth for the backend and infrastructure teams.

---

# Database Standards

Naming Convention

Tables

```
snake_case
```

Columns

```
snake_case
```

Primary Keys

```
<entity>_id
```

Foreign Keys

```
driver_id

vehicle_id

trip_id
```

Timestamp Fields

```
created_at

updated_at

deleted_at
```

---

# UUID Policy

Every table uses

```
UUID PRIMARY KEY
```

Example

```
driver_id UUID PRIMARY KEY
```

---

# Timestamp Policy

Every table contains

```
created_at TIMESTAMPTZ

updated_at TIMESTAMPTZ
```

Soft deletable tables also include

```
deleted_at TIMESTAMPTZ

is_deleted BOOLEAN
```

---

# Users

Table

```
users
```

Columns

| Column | Type | Constraints |
|----------|------|------------|
| user_id | UUID | PK |
| full_name | TEXT | NOT NULL |
| email | TEXT | UNIQUE |
| password_hash | TEXT | NOT NULL |
| role_id | UUID | FK |
| phone | TEXT | |
| is_active | BOOLEAN | DEFAULT TRUE |
| created_at | TIMESTAMPTZ | |
| updated_at | TIMESTAMPTZ | |

Indexes

```
email

role_id
```

---

# Roles

Table

```
roles
```

Columns

| Column | Type |
|---------|------|
| role_id | UUID |
| role_name | TEXT |
| description | TEXT |

Default Roles

- Administrator
- Fleet Manager
- Dispatcher
- Driver
- Analyst

---

# Drivers

Table

```
drivers
```

Columns

| Column | Type |
|----------|------|
| driver_id | UUID |
| employee_code | TEXT UNIQUE |
| first_name | TEXT |
| last_name | TEXT |
| phone | TEXT |
| email | TEXT |
| address | TEXT |
| joining_date | DATE |
| salary | NUMERIC(12,2) |
| driver_status | TEXT |
| current_region_id | UUID |
| current_depot_id | UUID |
| user_id | UUID |
| created_at | TIMESTAMPTZ |
| updated_at | TIMESTAMPTZ |

Foreign Keys

```
user_id

current_region_id

current_depot_id
```

Indexes

```
employee_code

driver_status
```

---

# Driver Licenses

Table

```
driver_licenses
```

Columns

| Column | Type |
|----------|------|
| license_id | UUID |
| driver_id | UUID |
| license_number | TEXT |
| license_type | TEXT |
| issue_date | DATE |
| expiry_date | DATE |
| issuing_authority | TEXT |
| document_path | TEXT |
| created_at | TIMESTAMPTZ |
| updated_at | TIMESTAMPTZ |

---

# Driver Insurance

Table

```
driver_insurance
```

Columns

| Column | Type |
|----------|------|
| insurance_id | UUID |
| driver_id | UUID |
| provider | TEXT |
| policy_number | TEXT |
| issue_date | DATE |
| expiry_date | DATE |
| coverage_amount | NUMERIC |
| document_path | TEXT |

---

# Driver Experience

Tracks calculated experience.

Table

```
driver_experience
```

Columns

| Column | Type |
|----------|------|
| experience_id | UUID |
| driver_id | UUID |
| total_trips | INTEGER |
| total_hours | NUMERIC |
| total_distance | NUMERIC |
| primary_vehicle_class | TEXT |
| primary_route | TEXT |
| primary_region | TEXT |
| updated_at | TIMESTAMPTZ |

---

# Driver Fatigue

Table

```
driver_fatigue
```

Columns

| Column | Type |
|----------|------|
| fatigue_id | UUID |
| driver_id | UUID |
| continuous_hours | NUMERIC |
| overtime_hours | NUMERIC |
| mandatory_rest_until | TIMESTAMPTZ |
| fatigue_level | TEXT |
| last_reset | TIMESTAMPTZ |

---

# Driver Challans

Table

```
driver_challans
```

Columns

| Column | Type |
|----------|------|
| challan_id | UUID |
| driver_id | UUID |
| violation_type | TEXT |
| amount | NUMERIC |
| location | TEXT |
| issued_date | DATE |
| payment_status | TEXT |

---

# Vehicles

Table

```
vehicles
```

Columns

| Column | Type |
|----------|------|
| vehicle_id | UUID |
| registration_number | TEXT UNIQUE |
| vehicle_class | TEXT |
| manufacturer | TEXT |
| model | TEXT |
| manufacturing_year | INTEGER |
| fuel_type | TEXT |
| mileage | NUMERIC |
| load_capacity | NUMERIC |
| current_odometer | NUMERIC |
| status | TEXT |
| created_at | TIMESTAMPTZ |
| updated_at | TIMESTAMPTZ |

Indexes

```
registration_number

status
```

---

# Vehicle Insurance

Table

```
vehicle_insurance
```

Columns

- insurance_id
- vehicle_id
- provider
- policy_number
- expiry_date
- issue_date
- coverage_amount
- document_path

---

# Vehicle PUC

Table

```
vehicle_puc
```

Columns

- puc_id
- vehicle_id
- certificate_number
- issue_date
- expiry_date
- document_path

---

# Tire Records

Table

```
vehicle_tires
```

Columns

- tire_id
- vehicle_id
- position
- installation_date
- replacement_date
- expected_lifespan_km
- current_distance
- manufacturer
- model

---

# Maintenance

Table

```
maintenance_records
```

Columns

- maintenance_id
- vehicle_id
- service_type
- service_date
- workshop
- cost
- odometer
- remarks
- next_service_date

---

# Routes

Table

```
routes
```

Columns

- route_id
- source
- destination
- distance_km
- estimated_time
- toll_cost
- average_fuel
- average_carbon
- average_cost

---

# Regions

Table

```
regions
```

Columns

- region_id
- region_name
- state
- country

---

# Trips

Table

```
trips
```

Columns

| Column | Type |
|----------|------|
| trip_id | UUID |
| driver_id | UUID |
| vehicle_id | UUID |
| route_id | UUID |
| status | TEXT |
| start_time | TIMESTAMPTZ |
| end_time | TIMESTAMPTZ |
| planned_distance | NUMERIC |
| actual_distance | NUMERIC |
| planned_duration | NUMERIC |
| actual_duration | NUMERIC |
| toll_cost | NUMERIC |
| carbon_emission | NUMERIC |
| created_at | TIMESTAMPTZ |

Indexes

```
driver_id

vehicle_id

route_id

status
```

---

# Fuel Logs

Table

```
fuel_logs
```

Columns

- fuel_log_id
- trip_id
- driver_id
- vehicle_id
- quantity
- cost
- fuel_station
- odometer
- timestamp

---

# Expenses

Table

```
trip_expenses
```

Columns

- expense_id
- trip_id
- driver_id
- category
- amount
- description
- receipt_path
- timestamp

---

# Driver Allowances

Table

```
driver_allowances
```

Columns

- allowance_id
- driver_id
- trip_id
- amount
- description
- approval_status

---

# Notifications

Table

```
notifications
```

Columns

- notification_id
- user_id
- title
- description
- severity
- type
- is_read
- created_at

---

# Audit Logs

Table

```
audit_logs
```

Columns

- audit_id
- user_id
- module
- action
- entity
- entity_id
- previous_state
- new_state
- ip_address
- timestamp

---

# Carbon Records

Table

```
carbon_records
```

Columns

- carbon_id
- trip_id
- vehicle_id
- emission_factor
- total_emission
- created_at

---

# Voice Logs

Table

```
voice_logs
```

Columns

- voice_log_id
- driver_id
- trip_id
- command
- language
- transcription
- executed
- timestamp

---

# File Metadata

Table

```
files
```

Columns

- file_id
- entity_type
- entity_id
- file_name
- mime_type
- storage_path
- uploaded_at

---

# System Settings

Table

```
system_settings
```

Columns

- setting_id
- setting_key
- setting_value
- updated_at

Examples

- fatigue_limit_hours
- mandatory_rest_hours
- carbon_factor_diesel
- carbon_factor_petrol

---

# Relationship Summary

```
User
 │
 ├── Driver
 │      │
 │      ├── Driver License
 │      ├── Driver Insurance
 │      ├── Driver Experience
 │      ├── Driver Fatigue
 │      ├── Challans
 │      ├── Trips
 │      ├── Fuel Logs
 │      └── Expenses
 │
 └── Notifications

Vehicle
 │
 ├── Insurance
 ├── PUC
 ├── Tires
 ├── Maintenance
 ├── Trips
 └── Carbon Records

Trip
 │
 ├── Fuel Logs
 ├── Expenses
 ├── Allowances
 ├── Voice Logs
 └── Route
```

---

# Future Tables

The schema is designed to support future additions without breaking existing structures.

Potential future tables include:

- gps_tracking
- geofences
- obd_telemetry
- predictive_maintenance
- warehouse_inventory
- customer_shipments
- incident_reports
- fleet_benchmarks
- ai_recommendations
- carbon_credit_records

---

# Schema Governance

Schema modifications must follow this process:

1. Update `DATABASE_DESIGN.md`.
2. Update this schema document.
3. Create a new SQL migration.
4. Review API impact.
5. Update affected documentation.
6. Merge changes through the Infrastructure branch.

No direct database changes should be made without corresponding documentation and migration updates.

---

# End of Document