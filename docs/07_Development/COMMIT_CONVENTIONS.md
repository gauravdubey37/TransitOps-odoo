# TransitOps Commit Conventions

Version: 1.0

Status: Commit Convention Freeze

Last Updated: YYYY-MM-DD

---

# Purpose

This document defines the official Git commit conventions for the TransitOps project.

A consistent commit history makes it easier to:

- Review code
- Understand project evolution
- Generate release notes
- Debug regressions
- Revert changes
- Coordinate AI agents

Every contributor must follow these conventions.

---

# Commit Philosophy

Every commit should represent exactly one logical change.

Examples

✓ Create Driver Repository

✓ Add Driver Validation

✓ Fix Trip Duration Calculation

✗ Complete Backend

✗ Update Project

✗ Misc Changes

---

# Commit Structure

TransitOps follows the Conventional Commits specification.

```
<type>: <short description>
```

Example

```
feat: implement driver repository

fix: prevent duplicate trip creation

docs: update vehicle api

refactor: split analytics service

test: add route recommendation tests
```

---

# Allowed Types

```
feat

fix

docs

style

refactor

perf

test

build

ci

chore

revert
```

No other prefixes should be used.

---

# Type Definitions

## feat

New functionality.

Examples

```
feat: implement driver service

feat: add trip assignment endpoint

feat: create analytics dashboard
```

---

## fix

Bug fixes.

Examples

```
fix: correct fatigue calculation

fix: prevent invalid vehicle assignment

fix: handle expired insurance validation
```

---

## docs

Documentation only.

Examples

```
docs: update architecture

docs: revise api contract

docs: add deployment instructions
```

---

## style

Formatting only.

No logic changes.

Examples

```
style: format backend services

style: reorder imports
```

---

## refactor

Internal improvements without changing behaviour.

Examples

```
refactor: split driver service

refactor: simplify analytics engine

refactor: extract route validator
```

---

## perf

Performance improvements.

Examples

```
perf: optimize trip query

perf: reduce dashboard render time
```

---

## test

Testing.

Examples

```
test: add driver service tests

test: improve analytics coverage
```

---

## build

Build configuration.

Examples

```
build: configure docker compose

build: update tsconfig
```

---

## ci

Continuous Integration.

Examples

```
ci: add github workflow

ci: configure lint pipeline
```

---

## chore

Maintenance.

Examples

```
chore: update dependencies

chore: remove unused files
```

---

## revert

Undo previous commits.

Example

```
revert: revert vehicle assignment changes
```

---

# Message Rules

Commit messages should

- use lowercase
- use imperative mood
- be concise
- describe what the commit does

Good

```
feat: implement trip repository

fix: correct route validation

docs: update ui specification
```

Bad

```
Implemented Driver

Driver Done

Changes

Updated

Final Commit
```

---

# Length

Subject

Preferred

```
< 72 characters
```

Avoid long commit titles.

---

# Scope (Optional)

Scopes may be used.

Examples

```
feat(driver): add driver repository

fix(vehicle): validate insurance expiry

docs(api): update trip endpoints
```

---

# Breaking Changes

Breaking interface changes must include

```
BREAKING CHANGE:
```

Example

```
feat(api): redesign authentication endpoints

BREAKING CHANGE:
JWT payload structure updated.
```

---

# Atomic Commits

Every commit should compile independently.

Never commit

- broken builds
- failing tests
- incomplete implementations

---

# Examples

Driver Module

```
feat: create driver entity

feat: add driver repository

feat: implement driver service

feat: expose driver endpoints

test: add driver api tests
```

Vehicle Module

```
feat: create vehicle entity

feat: implement maintenance service

fix: validate expired puc

docs: update vehicle api
```

Analytics

```
feat: add route recommendation engine

feat: implement confidence scoring

test: add recommendation tests
```

Frontend

```
feat: create sidebar component

feat: implement dashboard cards

feat: add driver statistics widget

style: improve table spacing
```

---

# Forbidden Messages

Never use

```
update

changes

misc

temp

wip

fixes

done

project

trial

testing
```

These provide no meaningful history.

---

# Commit Checklist

Before committing

- Code builds
- Tests pass
- Lint passes
- Documentation updated (if needed)
- No debug code
- No commented-out code
- No TODOs without tracking

---

# AI Agent Rules

AI agents must

- Follow Conventional Commits
- Commit frequently
- Keep commits atomic
- Never combine unrelated work
- Reference documentation when applicable

---

# Pull Request Relationship

A Pull Request should consist of multiple logical commits.

Example

```
feat: create driver entity

feat: implement driver repository

feat: add driver service

test: add driver service tests

docs: update driver api
```

Not

```
feat: complete driver module
```

---

# Release Notes

Release notes should be generated automatically from

- feat
- fix
- perf
- BREAKING CHANGE

Documentation commits should not appear in release notes.

---

# Dependencies

Related documents

- GIT_WORKFLOW.md
- MICRO_COMMIT_GUIDE.md
- AI_DEVELOPMENT_GUIDE.md
- BRANCH_GUIDE.md

---

# Revision Policy

Any change to commit formatting requires updating

- COMMIT_CONVENTIONS.md
- GIT_WORKFLOW.md
- MICRO_COMMIT_GUIDE.md

---

# End of Document