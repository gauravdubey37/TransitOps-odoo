# TransitOps Coding Standards

Version: 1.0

Status: Coding Standards Freeze

Last Updated: YYYY-MM-DD

---

# Purpose

This document defines the mandatory coding standards for the TransitOps project.

Every developer and AI agent must follow these standards to ensure that code remains:

- Consistent
- Readable
- Maintainable
- Modular
- Testable
- Merge-friendly

These standards apply across all repositories and branches.

---

# General Principles

Every piece of code should be

- Easy to understand
- Easy to modify
- Easy to test
- Easy to review

Code is read far more often than it is written.

Always optimize for readability.

---

# Development Philosophy

Follow these principles.

```
Readability

↓

Maintainability

↓

Correctness

↓

Performance
```

Never sacrifice readability for premature optimization.

---

# Technology Standards

Frontend

```
React

TypeScript

Tailwind CSS

shadcn/ui
```

Backend

```
Node.js

Express

TypeScript
```

Analytics

```
Python

Neo4j

NetworkX

spaCy

Sentence Transformers
```

Database

```
PostgreSQL

Neo4j
```

---

# Language Standards

Use

```
TypeScript Strict Mode
```

Avoid

```
any
```

unless absolutely necessary.

---

# Folder Rules

Every folder should have a single responsibility.

Example

```
drivers/

controllers/

services/

repositories/

validators/

dto/
```

Never place unrelated files together.

---

# File Naming

Use

```
kebab-case
```

Examples

```
driver-service.ts

vehicle-controller.ts

trip-validator.ts
```

---

# Class Naming

Use

```
PascalCase
```

Example

```
DriverService

TripController

VehicleRepository
```

---

# Function Naming

Use

```
camelCase
```

Examples

```
createDriver()

assignVehicle()

calculateFuelCost()
```

Functions should begin with verbs.

---

# Variable Naming

Use meaningful names.

Good

```
driverExperience

vehicleStatus

tripDistance
```

Bad

```
a

temp

data1

x
```

---

# Constants

Use

```
UPPER_SNAKE_CASE
```

Example

```
MAX_DRIVING_HOURS

DEFAULT_PAGE_SIZE
```

---

# Boolean Variables

Begin with

```
is

has

can

should
```

Examples

```
isAvailable

hasInsurance

canDrive

shouldSync
```

---

# Function Size

Target

```
20–40 lines
```

Maximum

```
75 lines
```

If a function exceeds this limit, refactor it.

---

# Class Size

A class should have one responsibility.

Avoid "God Classes."

---

# File Size

Preferred

```
<300 lines
```

Maximum

```
500 lines
```

Split larger files into modules.

---

# Comments

Write comments only when necessary.

Prefer self-explanatory code.

Good

```ts
// Calculate mandatory rest based on continuous driving hours.
```

Bad

```ts
// Increment i
i++;
```

---

# Documentation

Every public function should include

- Purpose
- Parameters
- Return value
- Exceptions (if applicable)

---

# Error Handling

Never swallow errors.

Always

- Catch expected exceptions
- Log appropriately
- Return meaningful messages

Bad

```ts
catch {}
```

Good

```ts
catch (error) {
    logger.error(error);
    throw error;
}
```

---

# Logging

Use structured logs.

Log

- Errors
- Warnings
- Important business events

Do not log

- Passwords
- Tokens
- Sensitive personal information

---

# API Standards

REST conventions

```
GET

POST

PATCH

DELETE
```

Never use verbs in endpoint names.

Good

```
/drivers

/vehicles

/trips
```

Bad

```
/getDrivers

/createTrip
```

---

# DTO Usage

Controllers must never expose database entities directly.

Always use DTOs.

---

# Validation

Every request must be validated.

Validate

- Required fields
- Data types
- Business rules
- Constraints

Never trust client input.

---

# Database Rules

Repositories should contain

- Queries only

Business logic belongs inside services.

---

# SQL Standards

Use parameterized queries.

Never concatenate SQL strings.

Bad

```sql
SELECT * FROM drivers WHERE id = " + id
```

Good

Prepared statements.

---

# React Standards

Components should

- Be small
- Be reusable
- Have a single responsibility

Avoid deeply nested JSX.

---

# Hooks

Use custom hooks for

- API calls
- Shared state
- Business logic

Do not duplicate hook logic.

---

# Component Structure

Preferred order

```
Imports

Types

Component

Hooks

Handlers

Render
```

---

# Styling

Use Tailwind utilities.

Do not use inline styles unless necessary.

Follow DESIGN_SYSTEM.md.

---

# State Management

Keep state as local as possible.

Lift state only when required.

Avoid unnecessary global state.

---

# Accessibility

Every component should support

- Keyboard navigation
- Screen readers
- ARIA labels
- Focus management

---

# Performance

Avoid

- N+1 queries
- Unnecessary renders
- Large bundle sizes
- Duplicate computations

Memoize only when justified.

---

# Testing Standards

Every new feature should include

- Unit tests
- Integration tests (where applicable)

Bug fixes should include regression tests.

---

# Security

Always

- Sanitize input
- Validate authorization
- Escape output
- Use parameterized SQL
- Enforce RBAC

Never expose internal errors to clients.

---

# Git Standards

Do not commit

- Generated files
- Build artifacts
- Secrets
- Environment files
- Large binaries

---

# AI Agent Rules

AI agents must

- Follow architecture documents
- Reuse existing modules
- Avoid duplicate implementations
- Keep commits small
- Never invent new conventions

---

# Code Review Checklist

Before committing

- Code builds
- Tests pass
- Lint passes
- Formatting passes
- Documentation updated
- No TODOs left behind (unless tracked)

---

# Dependencies

Related documents

- AI_DEVELOPMENT_GUIDE.md
- GIT_WORKFLOW.md
- MICRO_COMMIT_GUIDE.md
- BRANCH_GUIDE.md
- TESTING_STRATEGY.md

---

# Revision Policy

Coding standards may only be modified after team review.

All AI agents must immediately adopt the updated standards.

---

# End of Document