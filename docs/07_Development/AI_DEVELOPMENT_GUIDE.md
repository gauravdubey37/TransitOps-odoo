# TransitOps AI Development Guide

Version: 1.0

Status: Development Process Freeze

Last Updated: YYYY-MM-DD

---

# Purpose

This document defines how AI agents contribute to the TransitOps project.

Since TransitOps is intentionally designed to be developed using multiple autonomous AI agents working in parallel, every agent must follow identical engineering practices to ensure that all branches can be merged into `main` without conflicts.

This document is mandatory for every developer and every AI agent.

---

# Primary Goals

The development process should guarantee

- Independent development
- Zero architectural drift
- Consistent coding style
- Predictable commits
- Easy code reviews
- Conflict-free merges
- Reproducible builds

---

# AI Agent Philosophy

AI agents are contributors.

They are **not architects**.

Architecture decisions come only from the documentation.

AI agents should never redesign

- Folder structure
- Database schema
- API contracts
- Business rules
- Component hierarchy

These are frozen documents.

---

# Single Source of Truth

Before generating any code, AI agents must consult the following documents in order.

```
PROJECT_CONTEXT.md

↓

ARCHITECTURE.md

↓

FEATURE_SPECIFICATION.md

↓

DATABASE_DESIGN.md

↓

API_CONTRACT.md

↓

DESIGN_SYSTEM.md

↓

COMPONENT_LIBRARY.md

↓

Current Phase Document
```

If documentation conflicts exist, implementation must stop until the documentation is updated.

---

# AI Responsibilities

AI agents are responsible for

- Writing production-ready code
- Following architecture
- Creating reusable modules
- Writing tests
- Updating documentation (when instructed)
- Producing small commits

AI agents are **not** responsible for changing product requirements.

---

# Branch Responsibilities

There are four long-lived branches.

```
frontend

backend

analytics

infrastructure
```

Agents must never implement features belonging to another branch unless explicitly instructed.

---

# Development Workflow

Every task follows the same workflow.

```
Read Documentation

↓

Understand Task

↓

Plan

↓

Implement

↓

Self Review

↓

Run Tests

↓

Commit

↓

Push
```

---

# Documentation First

Before implementing any feature

- Read the relevant specification
- Verify API contracts
- Verify database schema
- Verify business rules
- Verify UI specification

Never assume missing behavior.

---

# No Architecture Changes

AI agents must never

- Rename folders
- Introduce new services
- Replace technologies
- Introduce third-party platforms
- Modify project structure

without updating documentation and receiving approval.

---

# Technology Constraints

TransitOps is designed to run locally.

Do not introduce

- Supabase
- Firebase
- Neon
- MongoDB Atlas
- Cloud SQL
- Cloud-hosted AI APIs

Preferred stack

- PostgreSQL (Local)
- Neo4j (Local)
- Node.js
- Express
- React
- TypeScript
- Python
- Docker (deployment/testing only)

---

# Coding Expectations

Generated code must be

- Modular
- Readable
- Strongly typed
- Documented
- Testable
- Reusable

Avoid monolithic implementations.

---

# Reusability

Before creating a new module

Check whether an equivalent already exists.

Never duplicate

- Components
- Utilities
- Hooks
- Services
- Models
- Validation logic

---

# File Ownership

Each file has a primary owner.

If a file belongs to another branch

Do not modify it.

Instead

- Create an issue
- Notify the responsible branch
- Wait for interface updates

---

# Interface Freeze

Interfaces are frozen.

Examples

- REST APIs
- DTOs
- Database schema
- Shared TypeScript types

If an interface must change

Update documentation first.

---

# AI Decision Rules

If multiple implementation choices exist

Choose the option that

1. Matches documentation
2. Improves maintainability
3. Reduces coupling
4. Improves readability

Never optimize prematurely.

---

# Commit Philosophy

Commits should be

- Small
- Atomic
- Reviewable
- Independent

Never combine unrelated work into a single commit.

Good

```
Implement Driver Repository

Add Vehicle Validation

Create Fuel DTO
```

Bad

```
Complete Backend

Fix Everything

Various Changes
```

---

# Pull Request Expectations

Every PR should include

- Summary
- Files Changed
- Tests Executed
- Screenshots (Frontend)
- Documentation References

---

# Code Generation Rules

Generated code should

- Compile
- Pass linting
- Pass tests
- Follow formatting
- Use existing abstractions

Never leave placeholder implementations unless explicitly requested.

---

# Error Handling

All production code should

- Handle expected failures
- Return meaningful errors
- Avoid silent failures
- Log actionable information

---

# Logging

Use structured logging.

Do not log

- Passwords
- Tokens
- Personal secrets

---

# Testing

Every feature should include

- Unit Tests
- Integration Tests (where applicable)

No feature is complete without testing.

---

# Performance

AI-generated code should avoid

- N+1 queries
- Duplicate computations
- Blocking operations
- Unnecessary re-renders

Optimize only when supported by profiling.

---

# Security

Always

- Validate input
- Sanitize output
- Enforce authorization
- Respect RBAC
- Use parameterized queries

Never trust client input.

---

# Documentation Updates

If implementation changes behavior

Update the corresponding documentation before merging.

---

# Escalation Rules

If documentation is missing or ambiguous

Do not guess.

Create a clarification request before implementation.

---

# Success Criteria

A successful AI contribution

- Matches documentation
- Builds successfully
- Passes tests
- Uses existing architecture
- Can be merged independently

---

# Dependencies

This guide should be read alongside

- CODING_STANDARDS.md
- GIT_WORKFLOW.md
- MICRO_COMMIT_GUIDE.md
- BRANCH_GUIDE.md
- TESTING_STRATEGY.md

---

# Revision Policy

Changes to the development workflow require updates to

- AI_DEVELOPMENT_GUIDE.md
- GIT_WORKFLOW.md
- BRANCH_GUIDE.md
- MICRO_COMMIT_GUIDE.md

---

# End of Document