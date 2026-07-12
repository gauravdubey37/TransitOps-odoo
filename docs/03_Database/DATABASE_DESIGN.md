# TransitOps Database Design

Version: 1.0

Status: Database Architecture Freeze

Last Updated: YYYY-MM-DD

---

# Purpose

This document defines the complete database architecture for TransitOps.

It explains:

- Database responsibilities
- Data ownership
- Entity relationships
- Normalization strategy
- Synchronization strategy
- Historical data strategy
- Audit strategy
- Scalability considerations

This document acts as the master reference before designing the actual PostgreSQL schema.

---

# Database Philosophy

TransitOps uses a hybrid database architecture.

The databases have clearly separated responsibilities.

```
                 Backend

                    │

          Business Operations

                    │

      ┌─────────────┴─────────────┐

      │                           │

 PostgreSQL                  Neo4j GraphDB

      │                           │

 Transaction Data          Analytics Data

```

Neither database replaces the other.

---

# Database Responsibilities

## PostgreSQL

Primary transactional database.

Responsible for:

- Users
- Drivers
- Vehicles
- Trips
- Fuel Logs
- Expenses
- Maintenance
- Notifications
- Authentication
- Audit Logs
- Reports
- Configuration

PostgreSQL is the single source of truth.

---

## Neo4j

Graph analytics database.

Responsible for:

- Driver relationships
- Vehicle relationships
- Routes
- Regions
- Trip patterns
- Recommendation engine
- KPI relationships
- Operational insights

Neo4j never owns transactional data.

---

# Data Ownership

| Data | PostgreSQL | Neo4j |
|----------|------------|--------|
| Users | ✅ | ❌ |
| Drivers | ✅ | Reference |
| Vehicles | ✅ | Reference |
| Trips | ✅ | Reference |
| Routes | ✅ | Connected Graph |
| Regions | ✅ | Connected Graph |
| Fuel Logs | ✅ | Analytics |
| Maintenance | ✅ | Analytics |
| Expenses | ✅ | Analytics |
| Carbon Records | ✅ | Analytics |
| Notifications | ✅ | ❌ |
| Authentication | ✅ | ❌ |

---

# Entity Groups

The platform consists of six major entity groups.

```
Users

↓

Drivers

↓

Vehicles

↓

Trips

↓

Operations

↓

Analytics
```

---

# Core Business Entities

## User

Represents every authenticated system user.

Relationships

```
User

↓

Role

↓

Permissions
```

---

## Driver

Stores employee information.

Contains

- Personal Information
- License
- Insurance
- Salary
- Route Experience
- Vehicle Experience
- Fatigue Metrics
- Performance Metrics

Relationships

```
Driver

↓

Trips

↓

Expenses

↓

Fuel

↓

Notifications
```

---

## Vehicle

Stores fleet information.

Contains

- Registration
- Class
- Fuel Type
- Insurance
- PUC
- Mileage
- Maintenance
- Tire Records

Relationships

```
Vehicle

↓

Trips

↓

Maintenance

↓

Fuel

↓

Carbon
```

---

## Trip

Represents a transportation operation.

Contains

- Driver
- Vehicle
- Route
- Distance
- Duration
- Fuel
- Expenses
- Carbon
- Status

Relationships

```
Trip

↓

Route

↓

Fuel

↓

Expenses

↓

Analytics
```

---

## Route

Stores historical transport routes.

Contains

- Source
- Destination
- Distance
- Historical Duration
- Toll Cost
- Carbon
- Fuel Usage

---

## Region

Groups routes geographically.

Used for analytics.

---

# Supporting Entities

The following entities support operations.

- Driver Insurance
- Vehicle Insurance
- Fuel Log
- Expense
- Maintenance Record
- Tire Record
- Carbon Record
- Notification
- Audit Log
- System Configuration

---

# Normalization Strategy

PostgreSQL follows Third Normal Form (3NF).

Objectives

- Reduce redundancy
- Preserve integrity
- Simplify updates
- Improve consistency

Frequently queried analytical summaries may be materialized later.

---

# Primary Keys

Every business entity uses UUIDs.

Example

```
driver_id

vehicle_id

trip_id

route_id

fuel_log_id
```

Sequential IDs are avoided.

---

# Foreign Key Strategy

All relationships use explicit foreign keys.

Example

Trip

↓

Driver

↓

Vehicle

↓

Route

↓

Region

Foreign key constraints are mandatory.

---

# Historical Data Strategy

Historical information must never be overwritten.

Instead

```
Old Record

↓

Archive

↓

New Version
```

Examples

- Salary History
- Maintenance History
- Tire History
- Insurance Renewals
- License Renewals

---

# Audit Strategy

Critical operations generate audit records.

Tracked actions include

- Login
- Logout
- Create
- Update
- Delete
- Assignment
- Approval

Audit logs are immutable.

---

# Soft Delete Policy

Business records should use soft deletion whenever appropriate.

```
is_deleted

deleted_at

deleted_by
```

Historical information must remain recoverable.

---

# Indexing Strategy

Indexes should exist on:

- UUID columns
- Foreign keys
- Frequently searched fields
- Status fields
- Dates
- Registration numbers
- Employee IDs

Composite indexes should be used where appropriate.

---

# Synchronization with Neo4j

Synchronization direction

```
PostgreSQL

↓

Synchronization Service

↓

Neo4j
```

Synchronization is one-way.

Neo4j must never modify PostgreSQL.

---

# Data Lifecycle

```
Create

↓

Validate

↓

Store

↓

Update

↓

Archive

↓

Analytics

↓

Report
```

Every entity follows the same lifecycle.

---

# File Storage

Files are stored outside the database.

Examples

- License scans
- Insurance documents
- Receipts
- Maintenance invoices
- Images

The database stores only metadata and file paths.

---

# Performance Considerations

The schema should support:

- Large trip history
- Thousands of vehicles
- Thousands of drivers
- Millions of fuel records
- Long-term audit logs

Query optimization is preferred over premature denormalization.

---

# Backup Strategy

Recommended backups

PostgreSQL

- Daily full backup
- Hourly WAL archiving (production)

Neo4j

- Daily dump
- Weekly archive

Development environments may use manual backups.

---

# Security

Sensitive information includes:

- Password hashes
- Driver documents
- Salary
- Insurance details

Sensitive columns should never be exposed directly through APIs.

---

# Scalability

The design supports future additions such as:

- GPS telemetry
- IoT devices
- Customer shipments
- Warehouses
- Predictive maintenance
- Fleet benchmarking
- ERP integration

New modules should extend the schema rather than modify existing entities.

---

# Database Standards

Naming

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
table_name_id
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

Boolean Fields

```
is_active

is_deleted

is_verified
```

---

# Database Constraints

The following constraints are mandatory.

- Primary Keys
- Foreign Keys
- Unique Constraints
- NOT NULL Constraints
- Check Constraints
- Default Values

Application validation does not replace database constraints.

---

# Revision Policy

Changes to database architecture require updates to:

- DATABASE_DESIGN.md
- POSTGRES_SCHEMA.md
- NEO4J_SCHEMA.md
- MIGRATIONS.md
- API_CONTRACT.md (if affected)

No schema changes should be implemented without updating the documentation first.

---

# End of Document