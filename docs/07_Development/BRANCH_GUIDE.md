# TransitOps Branch Guide

Version: 1.0

Status: Branch Ownership Freeze

Last Updated: YYYY-MM-DD

---

# Purpose

This document defines exactly how development work is divided across branches.

TransitOps has been intentionally designed so that four developers (or four AI agents) can work simultaneously with minimal merge conflicts.

Every feature in the project belongs to exactly one primary branch.

Cross-branch changes should be avoided whenever possible.

---

# Branch Overview

The project contains four long-lived development branches.

```
frontend

backend

analytics

infrastructure
```

Each branch owns a clearly defined portion of the system.

---

# Branch Architecture

```
                        main
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
   frontend          backend         analytics
        │                 │                 │
        └─────────────────┼─────────────────┘
                          │
                  infrastructure
```

Only completed and reviewed work is merged into `main`.

---

# Branch Responsibilities

---

# Frontend Branch

Responsible for everything inside

```
frontend/
```

Owns

- React
- TypeScript
- Tailwind
- shadcn/ui
- Routing
- Layout
- Dashboards
- Driver Application
- Component Library
- Charts
- Tables
- Forms

Does NOT own

- Business Logic
- Database
- Analytics
- Authentication Logic

Consumes REST APIs only.

---

# Backend Branch

Responsible for

```
backend/
```

Owns

- Express Server
- Controllers
- Services
- Repositories
- DTOs
- Validation
- Authentication
- Authorization
- PostgreSQL
- Business Rules

Does NOT own

- React
- Neo4j Algorithms
- Analytics Logic
- UI Components

---

# Analytics Branch

Responsible for

```
analytics/
```

Owns

- Neo4j
- Analytics Engine
- NLP Engine
- Recommendation Engine
- Voice Intelligence
- KPI Engine
- Carbon Analytics
- Route Intelligence

Does NOT own

- CRUD APIs
- Authentication
- React UI
- Infrastructure

---

# Infrastructure Branch

Responsible for

```
database/

scripts/

Docker

CI/CD

Testing Infrastructure

Deployment

Environment
```

Owns

- PostgreSQL setup
- Neo4j setup
- Docker Compose
- Migration scripts
- Backup scripts
- Seed data
- Local deployment
- CI pipelines

Does NOT own

- Business Logic
- UI
- Analytics Algorithms

---

# Shared Areas

The following directories are shared but protected.

```
docs/

README.md

LICENSE

.env.example
```

Documentation changes should follow the review process.

---

# File Ownership

| Directory | Owner |
|------------|-------|
| frontend/ | Frontend |
| backend/ | Backend |
| analytics/ | Analytics |
| database/ | Infrastructure |
| scripts/ | Infrastructure |
| tests/frontend | Frontend |
| tests/backend | Backend |
| tests/analytics | Analytics |
| docs | Shared |

---

# Interface Contracts

Branches communicate only through stable interfaces.

Examples

Frontend

↓

REST API

↓

Backend

---

Backend

↓

Analytics API

↓

Analytics

---

Backend

↓

Database Interface

↓

PostgreSQL

---

Analytics

↓

Neo4j

↓

Recommendation API

---

# Communication Rules

Frontend never imports Backend code.

Backend never imports Frontend code.

Analytics never imports UI code.

Infrastructure never contains business logic.

Communication must occur only through documented interfaces.

---

# Dependency Rules

Frontend depends on

- API Contract
- UI Specification

Backend depends on

- Database Schema
- Business Rules

Analytics depends on

- PostgreSQL Schema
- Neo4j Schema
- Analytics Documentation

Infrastructure depends on

- Database Design
- Deployment Specifications

---

# Merge Order

Recommended merge order

```
Infrastructure

↓

Backend

↓

Analytics

↓

Frontend

↓

Main
```

Reason

Infrastructure provides services.

Backend depends on infrastructure.

Analytics depends on backend data.

Frontend depends on backend APIs.

---

# Conflict Prevention

To minimize merge conflicts

- Do not edit files owned by another branch.
- Keep feature branches short-lived.
- Pull frequently.
- Follow interface freeze.
- Update documentation before implementation.

---

# Branch Rules

Frontend

- Never modify backend logic.

Backend

- Never modify frontend components.

Analytics

- Never modify REST controllers.

Infrastructure

- Never modify business logic.

---

# Shared Types

Shared DTOs and interface definitions should be versioned and reviewed before changes.

Breaking interface changes require coordination across all branches.

---

# AI Agent Responsibilities

Every AI agent must

- Stay within branch ownership.
- Read relevant documentation before coding.
- Produce micro commits.
- Avoid architectural changes.
- Request clarification instead of making assumptions.

---

# Branch Completion Criteria

A branch is considered ready for merge when

- All tasks assigned to the phase are complete.
- Tests pass.
- Documentation is updated.
- Lint passes.
- No merge conflicts remain.
- Pull request is approved.

---

# Future Branches

Future development may introduce

```
mobile

ml

iot

warehouse

customer-portal
```

These branches should integrate using the same interface-first approach.

---

# Dependencies

Read together with

- AI_DEVELOPMENT_GUIDE.md
- GIT_WORKFLOW.md
- MICRO_COMMIT_GUIDE.md
- COMMIT_CONVENTIONS.md
- CODE_REVIEW.md

---

# Revision Policy

Changes to branch ownership require updates to

- BRANCH_GUIDE.md
- GIT_WORKFLOW.md
- AI_DEVELOPMENT_GUIDE.md
- INTERFACE_FREEZE.md

---

# End of Document