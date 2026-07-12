# TransitOps Git Workflow

Version: 1.0

Status: Git Workflow Freeze

Last Updated: YYYY-MM-DD

---

# Purpose

This document defines the official Git workflow for the TransitOps project.

TransitOps is intentionally designed for parallel development by four developers (or AI agents). The Git workflow ensures that development can proceed independently with minimal merge conflicts while maintaining a stable main branch.

Every contributor must follow this workflow.

---

# Branch Strategy

The repository contains five long-lived branches.

```
main

frontend

backend

analytics

infrastructure
```

---

## main

Purpose

Production-ready code.

Rules

- Protected branch
- No direct commits
- No force pushes
- Merge only through Pull Requests
- All CI checks must pass

---

## frontend

Responsible for

- React
- TypeScript
- Tailwind
- shadcn/ui
- Layouts
- Components
- Dashboards
- Driver App

---

## backend

Responsible for

- Express API
- Authentication
- Business Logic
- Validation
- Services
- Controllers
- PostgreSQL

---

## analytics

Responsible for

- Neo4j
- Analytics Engine
- Recommendation Engine
- NLP
- Voice Engine
- KPIs

---

## infrastructure

Responsible for

- Docker
- Environment
- Scripts
- Database Migrations
- CI/CD
- Testing Infrastructure
- Local Deployment

---

# Development Flow

Every task follows

```
Checkout Branch

↓

Pull Latest

↓

Create Feature Branch

↓

Implement

↓

Test

↓

Commit

↓

Push

↓

Pull Request

↓

Review

↓

Merge
```

---

# Feature Branches

Developers should never work directly on long-lived branches.

Instead

```
frontend

↓

feature/frontend-driver-dashboard
```

```
backend

↓

feature/backend-driver-api
```

```
analytics

↓

feature/analytics-route-engine
```

```
infrastructure

↓

feature/docker-local-stack
```

---

# Branch Naming Convention

```
feature/<module>

bugfix/<module>

hotfix/<module>

docs/<module>

refactor/<module>

test/<module>
```

Examples

```
feature/driver-dashboard

feature/vehicle-api

bugfix/login

docs/api-contract

refactor/trip-service
```

---

# Pull Request Rules

Every Pull Request must contain

- Summary
- Motivation
- Files Changed
- Documentation References
- Testing Notes

Frontend PRs should also include screenshots.

---

# Merge Strategy

Preferred

```
Squash and Merge
```

Benefits

- Cleaner history
- Easier rollback
- Simpler releases

---

# Rebase Policy

Before opening a Pull Request

```
git fetch

git rebase origin/<branch>
```

Resolve conflicts locally.

---

# Conflict Resolution

If conflicts occur

1. Pull latest changes
2. Rebase
3. Resolve conflicts
4. Run tests
5. Push updated branch

Never resolve conflicts without understanding both implementations.

---

# Protected Files

The following files require review before modification.

```
ARCHITECTURE.md

API_CONTRACT.md

DATABASE_DESIGN.md

BUSINESS_RULES.md

INTERFACE_FREEZE.md

FEATURE_SPECIFICATION.md
```

---

# Forbidden Practices

Never

- Push directly to main
- Force push shared branches
- Rewrite published history
- Commit secrets
- Commit generated files
- Commit build artifacts

---

# Commit Frequency

Developers should commit frequently.

Recommended

```
Every 30–60 minutes

OR

After completing a logical unit of work
```

Avoid very large commits.

---

# Synchronization

At the beginning of each work session

```
git checkout <branch>

git pull origin <branch>
```

At the end

```
git push
```

---

# Release Workflow

```
Feature Branch

↓

Branch Review

↓

Merge into Long-lived Branch

↓

Integration Testing

↓

Merge into main

↓

Release Tag
```

---

# Tags

Release format

```
v1.0.0

v1.1.0

v2.0.0
```

---

# Rollback

If a release fails

Preferred

```
git revert
```

Avoid rewriting Git history.

---

# Documentation Updates

Any architectural change requires updates to

- Documentation
- Relevant phase file
- Related API specifications

Documentation and implementation must remain synchronized.

---

# Code Ownership

| Branch | Owner |
|---------|-------|
| frontend | Frontend Team |
| backend | Backend Team |
| analytics | Analytics Team |
| infrastructure | Infrastructure Team |
| main | Project Maintainers |

---

# Continuous Integration

Every Pull Request should automatically execute

- Build
- Lint
- Unit Tests
- Integration Tests
- Type Checking

No Pull Request may be merged while checks are failing.

---

# AI Agent Workflow

AI agents must

- Pull latest changes before starting
- Create feature branches
- Produce small commits
- Never modify unrelated files
- Rebase before opening PRs

---

# Git Hooks (Recommended)

Pre-Commit

- Format
- Lint
- Type Check

Pre-Push

- Unit Tests

---

# Revision Policy

Changes to the Git workflow require updates to

- GIT_WORKFLOW.md
- BRANCH_GUIDE.md
- MICRO_COMMIT_GUIDE.md
- AI_DEVELOPMENT_GUIDE.md

---

# End of Document