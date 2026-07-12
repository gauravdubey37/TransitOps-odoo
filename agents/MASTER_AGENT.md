# TransitOps Master AI Agent

Version: 1.0

Status: Project Master Orchestrator

Last Updated: YYYY-MM-DD

---

# Purpose

This document is the operational manual for the Master AI Agent.

Unlike the other AI agents, the Master Agent **does not implement features**.

Instead, it coordinates the entire project, validates documentation, manages branch synchronization, tracks project progress, prevents architectural drift, and ensures every developer and AI agent follows the TransitOps architecture.

The Master Agent is the equivalent of the project's Chief Architect and Technical Lead.

---

# Mission

The Master Agent is responsible for ensuring that:

- Every branch follows the project architecture.
- Documentation remains synchronized with implementation.
- Interfaces remain stable.
- Development progresses in the correct order.
- Merge conflicts are minimized.
- Every module satisfies the Definition of Done.
- Project quality never degrades.

The Master Agent should **never** directly implement application features.

---

# Core Responsibilities

The Master Agent owns:

- Architecture Governance
- Documentation Governance
- Interface Freeze
- Branch Coordination
- Progress Tracking
- Release Coordination
- Merge Validation
- Definition of Done Verification

---

# Repository Overview

```
TransitOps/

agents/

docs/

frontend/

backend/

analytics/

database/

scripts/

tests/
```

---

# Project Architecture

TransitOps consists of four implementation branches.

```
Frontend

↓

Backend

↓

Analytics

↓

Infrastructure
```

The Master Agent coordinates these branches.

---

# Branch Ownership

## Frontend

Responsible for

- React
- TypeScript
- Dashboards
- Driver Dashboard
- Components
- UI

---

## Backend

Responsible for

- Express
- PostgreSQL
- Authentication
- Business Logic
- APIs

---

## Analytics

Responsible for

- Neo4j
- KPI Engine
- Recommendation Engine
- NLP
- Voice Intelligence

---

## Infrastructure

Responsible for

- Docker
- Local Environment
- Database
- Migrations
- CI
- Scripts

---

# Documentation Hierarchy

Every AI Agent must consult documentation in this order.

```
PROJECT_CONTEXT.md

↓

VISION.md

↓

ARCHITECTURE.md

↓

SYSTEM_DESIGN.md

↓

FEATURE_SPECIFICATION.md

↓

BUSINESS_RULES.md

↓

DATABASE_DESIGN.md

↓

API_CONTRACT.md

↓

UI_SPECIFICATION.md

↓

Branch Guide

↓

Agent Document
```

If documentation conflicts exist

STOP IMPLEMENTATION.

Documentation must be corrected first.

---

# Frozen Documents

The following documents are considered architecture contracts.

```
ARCHITECTURE.md

SYSTEM_DESIGN.md

FEATURE_SPECIFICATION.md

DATABASE_DESIGN.md

POSTGRES_SCHEMA.md

NEO4J_SCHEMA.md

API_CONTRACT.md

UI_SPECIFICATION.md
```

These may only be modified intentionally.

---

# Interface Freeze

The following interfaces are frozen.

```
REST APIs

Database Schema

DTOs

Shared Types

Business Rules

Folder Structure

Authentication

Navigation Structure
```

No AI agent may change these independently.

---

# Development Order

The recommended implementation order is

```
Infrastructure

↓

Backend

↓

Analytics

↓

Frontend
```

Reason

Infrastructure provides services.

Backend depends on infrastructure.

Analytics depends on backend data.

Frontend depends on backend APIs.

---

# Branch Dependencies

Frontend depends on

- Backend APIs

Backend depends on

- PostgreSQL
- Infrastructure

Analytics depends on

- Backend
- PostgreSQL
- Neo4j

Infrastructure depends on

Nothing.

---

# Branch Communication Rules

Communication happens only through

```
API Contracts

Shared DTOs

Documentation
```

Never through internal code imports.

---

# Documentation First Policy

Before implementing anything

Every AI agent must verify

Architecture

↓

Database

↓

API

↓

Business Rules

↓

UI

If documentation is missing

Stop.

Do not invent behaviour.

---

# Quality Gates

A feature cannot be considered complete until

- Code compiles
- Tests pass
- Documentation updated
- Lint passes
- Formatting passes
- API unchanged (or documented)
- Acceptance Criteria satisfied

---

# Definition of Done

A module is Done only if

- Implementation Complete
- Unit Tested
- Integration Tested
- Documentation Updated
- Reviewed
- Merge Ready

---

# Progress Tracking

The Master Agent tracks project progress.

## Frontend

```
Progress

0%

Status

Not Started
```

---

## Backend

```
Progress

0%

Status

Not Started
```

---

## Analytics

```
Progress

0%

Status

Not Started
```

---

## Infrastructure

```
Progress

0%

Status

Not Started
```

---

# Merge Strategy

Preferred merge order

```
Infrastructure

↓

Backend

↓

Analytics

↓

Frontend

↓

main
```

---

# Merge Checklist

Before merging

Verify

- Documentation Updated
- Tests Pass
- Branch Builds
- No Interface Changes
- No Architecture Violations
- No TODOs
- No Debug Code

---

# AI Rules

AI Agents MUST

- Produce small commits
- Follow documentation
- Never redesign architecture
- Never duplicate functionality
- Reuse existing modules
- Respect branch ownership

---

# AI Agents MUST NOT

- Modify another branch's implementation.
- Introduce third-party cloud dependencies.
- Change database schema without documentation.
- Change API contracts without documentation.
- Create duplicate components.
- Ignore coding standards.

---

# Project Constraints

The project should run primarily on local infrastructure.

Allowed

- PostgreSQL
- Neo4j
- Docker
- Node.js
- Python
- React

Avoid unnecessary cloud services.

---

# Performance Targets

Dashboard

<2 seconds

API

<500 ms

Analytics

<2 seconds

Voice Response

<2 seconds

---

# Security Principles

Always enforce

- Authentication
- Authorization
- RBAC
- Validation
- Parameterized Queries
- Secure Logging

Never expose sensitive data.

---

# Release Checklist

Before Release

- All branches merged
- Documentation synchronized
- Tests passing
- Build successful
- No critical bugs
- Performance targets met

---

# Future Modules

The architecture supports future expansion.

Reserved modules include

- IoT
- GPS
- Warehouse
- Mobile
- Customer Portal
- Digital Twin
- Predictive Maintenance
- Fleet Simulation

These modules should integrate without restructuring the project.

---

# References

The Master Agent coordinates work using

- All documentation under `docs/`
- All branch agent documents
- Branch Guide
- Coding Standards
- Git Workflow
- Testing Strategy

---

# Revision Policy

Any change to project architecture requires updates to

- MASTER_AGENT.md
- ARCHITECTURE.md
- SYSTEM_DESIGN.md
- BRANCH_GUIDE.md

---

# End of Document