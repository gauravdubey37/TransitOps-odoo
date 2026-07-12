# TransitOps Micro Commit Guide

Version: 1.0

Status: Development Workflow Freeze

Last Updated: YYYY-MM-DD

---

# Purpose

This document defines the micro-commit strategy used throughout the TransitOps project.

Since TransitOps is being developed by multiple developers and AI agents simultaneously, every change must be small, isolated, and independently reviewable.

Large commits dramatically increase merge conflicts and reduce review quality.

This document is mandatory for all contributors.

---

# Philosophy

Instead of

```
One Feature

↓

One Huge Commit
```

TransitOps follows

```
One Feature

↓

Many Small Commits

↓

Review

↓

Merge
```

Every commit should represent one logical change.

---

# Goals

Micro commits should

- Be easy to review
- Be easy to revert
- Reduce merge conflicts
- Clearly document project evolution
- Simplify debugging
- Improve Git history

---

# Commit Frequency

Recommended

```
Every 20–45 minutes
```

OR

After completing one logical task.

Never wait until the end of the day.

---

# Maximum Commit Size

Preferred

```
< 300 lines changed
```

Maximum

```
< 600 lines changed
```

Large commits should be split.

---

# Good Commit Examples

```
Create Driver DTO

Add Driver Repository

Implement Driver Validation

Create Driver Routes

Add Vehicle Schema

Implement Route Entity

Create Fuel Service

Add Expense API

Implement Driver Dashboard Layout

Add KPI Card Component

Create Analytics Query Parser
```

Each commit performs a single task.

---

# Bad Commit Examples

```
Complete Backend

Fixed Everything

Misc Updates

Frontend Changes

Dashboard Update

Project Progress

More Changes
```

These messages provide no meaningful context.

---

# Commit Message Format

Use the imperative mood.

Examples

```
Create Driver Repository

Implement Vehicle Validation

Fix Trip Duration Calculation

Add Carbon KPI Service

Refactor Fuel Module

Update Driver Dashboard Layout
```

---

# Prefixes

Allowed prefixes

```
feat:

fix:

docs:

refactor:

test:

style:

perf:

build:

ci:

chore:
```

Examples

```
feat: implement trip repository

fix: correct fatigue calculation

docs: update API contract

refactor: split vehicle service

test: add driver validation tests
```

---

# Feature Breakdown Example

Example

Implement Driver Module

Recommended commits

```
feat: create driver entity

feat: create driver repository

feat: implement driver service

feat: implement driver controller

feat: add driver routes

feat: add request validation

test: add driver service tests

docs: update driver api
```

Not

```
feat: implement complete driver module
```

---

# Frontend Example

Driver Dashboard

Recommended

```
feat: create dashboard layout

feat: add sidebar navigation

feat: implement driver statistics card

feat: add trip summary widget

feat: connect dashboard api

test: add dashboard component tests
```

---

# Backend Example

Trip Module

Recommended

```
feat: create trip entity

feat: create trip dto

feat: implement repository

feat: implement service

feat: implement controller

feat: add validation middleware

test: add integration tests
```

---

# Analytics Example

Recommendation Engine

Recommended

```
feat: implement recommendation interface

feat: add route recommendation logic

feat: add confidence scoring

feat: implement ranking engine

test: add recommendation tests
```

---

# Infrastructure Example

Docker

Recommended

```
build: add postgres container

build: add neo4j container

build: add backend service

build: configure analytics container

docs: update local setup guide
```

---

# Documentation Commits

Documentation should evolve alongside code.

Examples

```
docs: update vehicle api

docs: update architecture diagram

docs: document route analytics

docs: revise database schema
```

---

# Refactoring Commits

Refactoring commits should never introduce new features.

Examples

```
refactor: split analytics service

refactor: extract driver validation

refactor: simplify repository interface
```

---

# Bug Fix Commits

Each bug fix should address one issue.

Examples

```
fix: prevent duplicate driver assignment

fix: correct fuel calculation

fix: handle expired insurance validation
```

---

# Testing Commits

Examples

```
test: add trip api tests

test: add fatigue calculation tests

test: improve analytics coverage
```

---

# AI Agent Rules

AI agents must

- Never combine unrelated changes
- Commit after each completed logical task
- Avoid touching unrelated files
- Keep commit history readable

---

# Review Checklist

Before committing

- Builds successfully
- Lint passes
- Tests pass
- Documentation updated (if required)
- No debugging code remains
- No commented-out code

---

# Commit Granularity

Good

```
One Repository

One Commit
```

Good

```
One React Component

One Commit
```

Good

```
One API Endpoint

One Commit
```

Avoid

```
Entire Module

One Commit
```

---

# Squashing

Feature branches may be squashed before merging into long-lived branches if commit history becomes excessively noisy.

However, commits should remain logically grouped.

---

# Merge Benefits

Following this strategy enables

- Easier code reviews
- Faster conflict resolution
- Better Git history
- Safer rollbacks
- Independent feature verification

---

# Dependencies

Read together with

- AI_DEVELOPMENT_GUIDE.md
- GIT_WORKFLOW.md
- BRANCH_GUIDE.md
- COMMIT_CONVENTIONS.md

---

# Revision Policy

Any changes to the commit strategy require updates to

- MICRO_COMMIT_GUIDE.md
- GIT_WORKFLOW.md
- COMMIT_CONVENTIONS.md

---

# End of Document