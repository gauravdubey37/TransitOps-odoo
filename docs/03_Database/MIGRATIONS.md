# TransitOps Database Migration Strategy

Version: 1.0

Status: Migration Strategy Freeze

Last Updated: YYYY-MM-DD

---

# Purpose

This document defines how PostgreSQL and Neo4j database changes are managed throughout the lifecycle of the TransitOps project.

The objective is to ensure that every developer, AI agent, and deployment environment always uses the same database structure.

Every schema modification must be version-controlled through migration files.

Direct database modifications are strictly prohibited.

---

# Migration Principles

Every migration must be:

- Version controlled
- Repeatable
- Reversible where possible
- Idempotent
- Reviewed before merging
- Documented

---

# Database Philosophy

Schema

↓

Migration

↓

Review

↓

Merge

↓

Deployment

↓

Verification

No developer should manually create or alter tables.

---

# Directory Structure

```
database/

├── migrations/
│
├── postgres/
│
├── neo4j/
│
├── seeds/
│
└── scripts/
```

---

# PostgreSQL Migration Naming

Migration filenames follow the format

```
YYYYMMDD_HHMMSS_description.sql
```

Example

```
20260715_100000_create_users_table.sql

20260715_101000_create_drivers_table.sql

20260715_102000_create_vehicles_table.sql
```

Migration names should clearly describe the change.

---

# Neo4j Migration Naming

```
YYYYMMDD_HHMMSS_description.cypher
```

Example

```
20260720_110000_create_driver_nodes.cypher

20260720_111500_create_route_relationships.cypher
```

---

# Migration Order

The following order must always be maintained.

```
Extensions

↓

Enums

↓

Lookup Tables

↓

Core Tables

↓

Relationship Tables

↓

Indexes

↓

Constraints

↓

Views

↓

Functions

↓

Triggers

↓

Seed Data
```

---

# Initial Migration Plan

Migration 001

```
Database Extensions
```

Migration 002

```
Roles
```

Migration 003

```
Users
```

Migration 004

```
Regions
```

Migration 005

```
Depots
```

Migration 006

```
Drivers
```

Migration 007

```
Driver Licenses
```

Migration 008

```
Driver Insurance
```

Migration 009

```
Driver Experience
```

Migration 010

```
Driver Fatigue
```

Migration 011

```
Driver Challans
```

Migration 012

```
Vehicles
```

Migration 013

```
Vehicle Insurance
```

Migration 014

```
Vehicle PUC
```

Migration 015

```
Vehicle Tires
```

Migration 016

```
Maintenance Records
```

Migration 017

```
Routes
```

Migration 018

```
Trips
```

Migration 019

```
Fuel Logs
```

Migration 020

```
Trip Expenses
```

Migration 021

```
Driver Allowances
```

Migration 022

```
Carbon Records
```

Migration 023

```
Voice Logs
```

Migration 024

```
Notifications
```

Migration 025

```
Audit Logs
```

Migration 026

```
System Settings
```

Migration 027

```
Indexes
```

Migration 028

```
Constraints
```

Migration 029

```
Views
```

Migration 030

```
Initial Seed Data
```

---

# Migration Rules

Every migration should perform only one logical operation.

Good

```
Create Drivers Table
```

Bad

```
Create Drivers

Create Vehicles

Create Trips

Create Reports

Update Roles
```

---

# Allowed Operations

Create Table

Add Column

Remove Column

Rename Column

Create Index

Drop Index

Create View

Create Trigger

Create Function

Insert Seed Data

---

# Forbidden Operations

Manual schema edits

Manual production SQL

Editing existing migrations after merge

Skipping migration versions

Deleting historical migrations

---

# Rollback Policy

Every migration should include a rollback whenever practical.

Example

```
CREATE TABLE ...

↓

DROP TABLE ...
```

Complex data migrations should document rollback limitations.

---

# Seed Strategy

Seed data is independent of migrations.

Examples

Roles

Regions

Vehicle Classes

Fuel Types

Expense Categories

Notification Types

System Settings

---

# Migration Validation Checklist

Before merging a migration:

- SQL executes successfully
- Naming conventions followed
- Constraints validated
- Foreign keys verified
- Indexes reviewed
- Rollback documented
- Documentation updated

---

# Environment Flow

Development

↓

Testing

↓

Staging

↓

Production

Every environment applies migrations in exactly the same order.

---

# Version Tracking

Maintain a migration history table.

Example

```
schema_migrations
```

Columns

| Column | Description |
|----------|-------------|
| version | Migration Version |
| filename | SQL File |
| checksum | Integrity Check |
| applied_at | Timestamp |
| execution_time | Duration |
| success | Boolean |

---

# Neo4j Migration Strategy

Graph migrations should create:

- Constraints
- Indexes
- Node Labels
- Relationships
- Initial Reference Data

Graph migrations should never contain transactional data.

---

# Data Migration Policy

When changing existing structures:

Old Table

↓

Temporary Transformation

↓

New Structure

↓

Validation

↓

Cleanup

Data loss is unacceptable.

---

# Developer Workflow

1. Update schema documentation.
2. Create migration file.
3. Validate locally.
4. Update seed data if required.
5. Commit migration separately.
6. Open pull request.
7. Review.
8. Merge.

Each migration should correspond to a single micro commit.

---

# AI Agent Responsibilities

Infrastructure Agent

- Creates migration files
- Reviews schema consistency
- Updates migration documentation

Backend Agent

- Updates repositories/services to support schema changes

Analytics Agent

- Updates synchronization logic

Frontend Agent

- Adapts UI only if required

---

# Future Migration Support

The migration strategy supports future additions such as:

- GPS tables
- IoT telemetry
- OBD-II integration
- Warehouses
- Customer shipments
- AI recommendations
- Carbon credit tracking
- Multi-tenant architecture

Future migrations must remain backward compatible whenever possible.

---

# Revision Policy

Any database schema modification requires:

- Updated schema documentation
- New migration
- Updated seed data (if required)
- API review
- Architecture review

No schema changes should bypass this process.

---

# End of Document