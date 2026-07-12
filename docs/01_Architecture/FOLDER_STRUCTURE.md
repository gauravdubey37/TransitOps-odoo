# TransitOps Folder Structure

Version: 1.0

---

# Purpose

This document defines the complete repository structure for TransitOps.

Every developer and AI agent must follow this document exactly.

No files should be created outside the defined structure unless explicitly approved.

A predictable structure improves:

- Maintainability
- Discoverability
- AI-assisted development
- Merge safety
- Scalability

---

# Repository Layout

```text
TransitOps/

├── frontend/
├── backend/
├── analytics/
├── database/
├── docker/              # Docker Compose, Dockerfiles, DB init config
├── docs/
├── agents/
├── scripts/             # Dev scripts (.sh and setup.ps1)
├── tests/
├── .github/             # CI/CD workflows

├── README.md
├── LICENSE
├── .gitignore
├── .editorconfig
├── .env.example
└── package.json         # (future root workspace)
```

Docker Compose files live in `docker/` (not the repository root):

```text
docker/
├── docker-compose.yml
├── docker-compose.dev.yml
├── docker-compose.prod.yml
├── Dockerfile.backend
├── Dockerfile.frontend
├── Dockerfile.analytics
├── postgres/init.sql
└── neo4j/neo4j.conf
```

---

# Branch Ownership

| Folder | Branch Owner |
|----------|--------------|
| frontend | Frontend |
| backend | Backend |
| analytics | Analytics |
| database | Infrastructure |
| docs | Infrastructure |
| agents | Infrastructure |
| tests | Shared |
| scripts | Infrastructure |

No branch should modify another branch's owned implementation.

---

# Frontend Structure

```text
frontend/

src/

    app/

    components/

    layouts/

    modules/

    hooks/

    services/

    store/

    utils/

    constants/

    types/

    assets/

    styles/
```

---

## app/

Contains routing.

Example

```text
app/

dashboard/

drivers/

vehicles/

trips/

analytics/

settings/

login/

reports/
```

No reusable components belong here.

---

## components/

Contains reusable UI.

```text
components/

buttons/

cards/

tables/

charts/

forms/

dialogs/

modals/

navigation/

sidebar/

header/

footer/

voice/

notifications/

inputs/
```

Never place page-specific code here.

---

## layouts/

Contains layout wrappers.

Example

Dashboard Layout

Driver Layout

Auth Layout

Settings Layout

---

## modules/

Feature-specific frontend logic.

```text
modules/

driver/

vehicle/

trip/

maintenance/

fuel/

analytics/

dashboard/

voice/
```

Each module owns:

Pages

Components

Hooks

API Calls

Validation

---

## services/

Frontend API clients only.

Example

```text
services/

driver.service.ts

vehicle.service.ts

trip.service.ts

analytics.service.ts
```

Never place business logic here.

---

## store/

Global state.

Example

Auth

Theme

Notifications

Voice

User

---

## hooks/

Reusable hooks.

Examples

useAuth()

usePagination()

useDebounce()

useVoice()

useNotifications()

---

## utils/

Pure helper functions.

Never access APIs here.

---

## types/

Shared frontend interfaces.

---

# Backend Structure

```text
backend/

src/

    config/

    middleware/

    routes/

    controllers/

    services/

    repositories/

    dto/

    validators/

    models/

    modules/

    utils/

    interfaces/

    types/

    constants/

    jobs/

    logs/
```

---

# Backend Module Structure

Every module follows exactly the same layout.

Example

```text
modules/

driver/

    controller.ts

    service.ts

    repository.ts

    routes.ts

    validator.ts

    dto.ts

    types.ts

    constants.ts

    tests/
```

No module may invent its own structure.

---

# Analytics Structure

```text
analytics/

nlp/

voice/

recommendation/

graph/

carbon/

cypher/

pipelines/

models/

tests/
```

---

## graph/

Contains Neo4j graph logic.

---

## nlp/

Contains language processing.

---

## voice/

Speech-to-text

Text-to-speech

Conversation engine

---

## recommendation/

Recommendation engine.

---

# Database Structure

```text
database/

postgres/

neo4j/

seed/

migrations/

backup/

scripts/
```

---

## PostgreSQL

```text
postgres/

tables/

views/

functions/

indexes/
```

---

## Neo4j

```text
neo4j/

constraints/

indexes/

cypher/

seed/
```

---

# Documentation Structure

```text
docs/

00_Project/

01_Architecture/

02_Business/

03_Database/

04_API/

05_UI/

06_AI/

07_Development/

08_Phases/
```

No documentation belongs outside these folders.

---

# Tests Structure

```text
tests/

unit/

integration/

e2e/

performance/
```

Each backend module should also contain local unit tests.

---

# Naming Conventions

Folders

lowercase

Example

```text
driver

vehicle

analytics
```

Never

```text
Driver

DriverModule

driverModule
```

---

Files

kebab-case for markdown.

Example

```text
driver-dashboard.md

vehicle-health.md
```

TypeScript

feature.service.ts

feature.controller.ts

feature.repository.ts

feature.routes.ts

feature.dto.ts

feature.validator.ts

---

React Components

PascalCase

Example

```text
DriverCard.tsx

TripTable.tsx

FuelChart.tsx
```

---

Hooks

```text
useDriver.ts

useTrips.ts

useAnalytics.ts
```

---

Constants

UPPER_CASE

---

Enums

PascalCase

---

Interfaces

Prefix with I only if project-wide convention demands it; otherwise use descriptive names.

---

# Barrel Exports

Every folder should contain an index.ts where appropriate.

Example

```text
components/

cards/

index.ts
```

Avoid long relative imports.

---

# Import Rules

Prefer

```typescript
import DriverCard from "@/components/cards/DriverCard";
```

Avoid

```typescript
../../../components/cards/DriverCard
```

---

# Assets

```text
assets/

icons/

logos/

images/

illustrations/

fonts/
```

Never place assets inside components.

---

# Configuration

```text
config/

database.ts

auth.ts

env.ts

logger.ts
```

Centralize configuration.

---

# Environment Variables

Never hardcode:

- passwords
- database URLs
- JWT secrets
- API keys

Use `.env`.

Provide defaults in `.env.example`.

---

# Shared Types

Frontend and Backend must not duplicate shared contracts.

Shared API request/response types should be generated or maintained from the API contract.

---

# Forbidden Practices

❌ Random folders

❌ Business logic inside components

❌ SQL inside controllers

❌ Direct database access from routes

❌ Circular imports

❌ Duplicate utility functions

❌ Hardcoded configuration

❌ Mixed naming conventions

---

# Architecture Rule

If a new folder is required, update this document before adding it to the repository.

Repository structure is part of the architecture and should evolve intentionally, not organically.

---

End of Document