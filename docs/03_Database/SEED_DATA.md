# TransitOps Seed Data Specification

Version: 1.0

Status: Seed Data Freeze

Last Updated: 2026-07-12

---

# Purpose

This document defines all default records required for a fresh TransitOps installation.

Seed data is intended to:

- Bootstrap local development
- Ensure consistent environments across developers
- Simplify testing
- Eliminate manual setup
- Provide demo-ready data

Seed data is NOT business data.

---

# Seeding Principles

Seed data should be:

- Deterministic
- Repeatable
- Version controlled
- Idempotent
- Safe to execute multiple times

---

# Seed Order

The seed scripts must execute in the following order.

```
Roles

↓

Permissions

↓

Users

↓

Regions

↓

Depots

↓

Vehicle Classes

↓

Fuel Types

↓

Maintenance Types

↓

Expense Categories

↓

Notification Types

↓

System Settings

↓

Demo Drivers

↓

Demo Vehicles

↓

Demo Routes

↓

Demo Trips
```

---

# Roles

Default Roles

| Role |
|------|
| Administrator |
| Fleet Manager |
| Dispatcher |
| Driver |
| Analyst |

These roles should exist immediately after installation.

---

# Permissions

The following permissions should be seeded.

```
users.read
users.create
users.update
users.delete

drivers.read
drivers.create
drivers.update
drivers.delete

vehicles.read
vehicles.create
vehicles.update
vehicles.delete

trips.read
trips.create
trips.update
trips.delete

analytics.read

reports.generate

settings.manage
```

Permissions should be linked to roles during seeding.

---

# Default Administrator

One administrator account should be created.

```
Name

System Administrator

Email

admin@transitops.local

Password

Configured through environment variables
```

The password must never be hardcoded.

---

# Regions

Example regions.

```
North

South

East

West

Central
```

These are placeholders and should be replaced with organization-specific regions.

---

# Depots

Example depots.

```
Delhi Depot

Mumbai Depot

Pune Depot

Bangalore Depot

Hyderabad Depot
```

---

# Vehicle Classes

Seed the following vehicle classes.

```
Motorcycle

Scooter

Car

Sedan

SUV

Pickup

Mini Truck

Truck

Heavy Truck

Trailer

Bus

Mini Bus

Electric Vehicle
```

Vehicle classes should be configurable in future versions.

---

# Fuel Types

Seed values.

```
Petrol

Diesel

CNG

LNG

Electric

Hybrid

Hydrogen
```

---

# Driver License Types

```
LMV

HMV

Transport

Commercial

Heavy Commercial
```

---

# Driver Status

```
Available

Assigned

Driving

Resting

Leave

Inactive
```

---

# Vehicle Status

```
Available

Assigned

Maintenance

Inactive

Retired
```

---

# Trip Status

```
Scheduled

Assigned

In Progress

Paused

Completed

Cancelled
```

---

# Maintenance Types

```
Oil Change

General Service

Brake Inspection

Engine Repair

Transmission Service

Battery Replacement

Tire Replacement

Alignment

Cleaning

Inspection
```

---

# Expense Categories

```
Fuel

Food

Accommodation

Parking

Repair

Toll

Miscellaneous
```

---

# Notification Types

```
Maintenance Due

Insurance Expiry

License Expiry

PUC Expiry

Trip Assigned

Trip Delayed

Driver Fatigue

Fuel Reminder

Expense Reminder

Route Recommendation

Carbon Alert
```

---

# Notification Severity

```
Critical

High

Medium

Low

Info
```

---

# Fuel Stations

Example data.

```
Indian Oil

HP

BPCL

Shell

Reliance
```

These are optional demo records.

---

# Vehicle Manufacturers

Example values.

```
Tata

Ashok Leyland

Mahindra

Eicher

Volvo

BharatBenz

Force Motors
```

---

# Languages

Supported languages for voice assistant.

```
English

Hindi

Marathi

Gujarati

Tamil

Kannada

Telugu

Punjabi

Bengali
```

Additional languages may be added later.

---

# Supported File Types

```
PDF

PNG

JPEG

WEBP
```

---

# Driver Fatigue Defaults

```
Maximum Continuous Hours

6

Maximum Daily Hours

10

Mandatory Rest

30 Minutes

Critical Fatigue Threshold

8 Hours
```

These values should also exist in system settings.

---

# Carbon Emission Factors

Example defaults.

| Fuel | kg CO₂/Litre |
|-------|--------------|
| Petrol | 2.31 |
| Diesel | 2.68 |
| CNG | Configurable |
| LNG | Configurable |

Actual values should remain configurable.

---

# System Settings

Default settings include.

```
driver_max_continuous_hours

driver_daily_limit

mandatory_rest_duration

trip_auto_complete

maintenance_alert_days

insurance_alert_days

license_alert_days

puc_alert_days

carbon_factor_petrol

carbon_factor_diesel

default_language

voice_enabled

offline_voice_enabled

analytics_refresh_interval

dashboard_refresh_interval
```

---

# Dashboard Defaults

Seed dashboard preferences.

```
Default Theme

Light

Cards Per Page

10

Dashboard Refresh

30 Seconds

Date Format

DD-MM-YYYY

Currency

INR
```

---

# Demo Drivers

Development environments should include at least:

```
5 Drivers
```

Each driver should contain:

- Valid license
- Insurance
- Experience
- Salary
- Route history

These records are for testing only.

---

# Demo Vehicles

Development database should contain.

```
10 Vehicles
```

Vehicle mix.

```
Cars

SUVs

Mini Trucks

Heavy Trucks

Electric Vehicles
```

Each vehicle should contain.

- Insurance
- PUC
- Tire records
- Maintenance history

---

# Demo Routes

Create representative routes.

Examples.

```
Delhi → Agra

Mumbai → Pune

Bangalore → Mysore

Ahmedabad → Surat

Chennai → Coimbatore
```

Each route should include.

- Distance
- Toll
- Estimated duration
- Fuel estimate
- Carbon estimate

---

# Demo Trips

Generate approximately.

```
100 Historical Trips
```

Trips should include.

- Driver
- Vehicle
- Route
- Fuel
- Expenses
- Carbon
- Duration

This data enables dashboard and analytics testing immediately after setup.

---

# Demo Notifications

Generate sample notifications.

Examples.

- Driver fatigue warning
- Insurance expiry
- Better route available
- Maintenance reminder
- Fuel entry pending

---

# Demo Analytics

Seed enough operational data to populate.

- KPI Dashboard
- Driver Leaderboard
- Vehicle Leaderboard
- Cost Trends
- Carbon Trends
- Route Analytics

---

# Neo4j Seed Data

The graph database should initialize.

- Driver nodes
- Vehicle nodes
- Route nodes
- Region nodes

and create relationships between them.

Large analytical datasets should NOT be seeded.

---

# Implemented Seed Files (Infrastructure Branch)

Seed data is stored in `database/seed/<profile>/` as numbered SQL files executed in order.

## Development profile (`SEED_PROFILE=development`)

| Order | File | Contents |
|-------|------|----------|
| 1 | `database/seed/development/01_roles_permissions.sql` | Roles, permissions, role-permission links |
| 2 | `database/seed/development/02_lookup_data.sql` | Vehicle classes, fuel types, maintenance types, expense categories, notification types |
| 3 | `database/seed/development/03_regions_depots.sql` | Regions and depots |
| 4 | `database/seed/development/04_system_settings.sql` | System configuration keys |
| 5 | `database/seed/development/05_demo_data.sql` | Demo routes, vehicles, drivers, trips |

The admin user is created by `database/scripts/seed.sh` (or `scripts/setup.ps1` on Windows) using `ADMIN_EMAIL` and `ADMIN_PASSWORD` from `.env`. The password is never hardcoded in SQL files.

## Other profiles

| Profile | Directory | Status |
|---------|-----------|--------|
| `development` | `database/seed/development/` | Implemented |
| `demo` | `database/seed/demo/` | Planned |
| `testing` | `database/seed/testing/` | Planned |
| `performance` | `database/seed/performance/` | Planned |

## Running Seeds

**Windows:**

```powershell
.\scripts\setup.ps1
```

**macOS / Linux:**

```bash
./scripts/db-seed.sh
```

---

# Seed Execution

The recommended execution order is.

```
Database Created

↓

Run PostgreSQL Migrations

↓

Run PostgreSQL Seeds

↓

Initialize Neo4j

↓

Create Graph Relationships

↓

Insert Demo Analytics Data

↓

System Ready
```

---

# Environment Support

Seed scripts should support.

- Development
- Testing
- Demonstration

Production environments should seed only.

- Roles
- Permissions
- System Settings

Demo operational data must never be inserted into production.

---

# Validation Checklist

After seeding, verify.

- [ ] Roles created
- [ ] Permissions linked
- [ ] Admin user created
- [ ] Regions created
- [ ] Depots created
- [ ] Vehicle classes inserted
- [ ] Fuel types inserted
- [ ] Expense categories inserted
- [ ] Maintenance types inserted
- [ ] Notification types inserted
- [ ] System settings inserted
- [ ] Demo drivers created
- [ ] Demo vehicles created
- [ ] Demo routes created
- [ ] Demo trips generated
- [ ] Neo4j graph initialized

---

# Revision Policy

Whenever a new lookup table, enum, or configurable entity is introduced:

1. Update this document.
2. Add the corresponding seed script.
3. Update migration documentation if required.
4. Ensure all developers receive identical seed data.

---

# End of Document