# TransitOps Backend MVP

This directory contains the Node.js/Express backend API for the TransitOps MVP. The backend is designed as a modular, monolithic architecture running against a PostgreSQL database. It serves as the transactional source of truth for the entire fleet operations system.

## Table of Contents

- [Overview](#overview)
- [Architecture & Stack](#architecture--stack)
- [Implemented Modules](#implemented-modules)
  - [Core Database Entities](#core-database-entities)
  - [Operational Modules](#operational-modules)
  - [AI & Microservice Integrations](#ai--microservice-integrations)
- [Testing & Validation](#testing--validation)
- [Running the Project](#running-the-project)

## Overview

The backend API provides a highly performant and secure interface to manage the logistics, drivers, vehicles, and analytics tracking for TransitOps. It enforces strict data integrity via Zod schema validations before saving records to Postgres and ensures secure execution via global JWT-based authentication.

## Architecture & Stack

- **Runtime:** Node.js
- **Framework:** Express.js (RESTful APIs)
- **Language:** TypeScript
- **Database:** PostgreSQL (with `pg` driver)
- **Validation:** Zod
- **Testing:** Vitest & Supertest
- **Containerization:** Docker (planned/available via standard Dockerfile)

## Implemented Modules

The MVP phase implements 100% of the operational requirements detailed in the `BACKEND_AGENT.md`. 

### Core Database Entities

Each of these modules follows a strict `Controller → Service → Repository` design pattern and corresponds directly to a PostgreSQL table:

*   **Users & Auth Module (`/auth`, `/users`):** Handles JWT generation and verification. Every operational API endpoint is guarded by the `authMiddleware`.
*   **Depots Module (`/depots`):** Manages physical locations and warehouses.
*   **Routes Module (`/routes`):** Maps paths between source and destination Depots, enforcing business logic (e.g., source and destination cannot match).
*   **Vehicles Module (`/vehicles`):** Manages the fleet, ensuring vehicle registrations are unique and tracking vehicle states (Available, In Maintenance, etc.).
*   **Drivers Module (`/drivers`):** Manages driver profiles, statuses, and performance scoring.
*   **Trips Module (`/trips`):** The primary operational hub. A trip links a Driver, Vehicle, and Route. The API strictly validates that a driver and vehicle are not currently assigned to another active trip before allowing dispatch.
*   **Fuel Module (`/fuel`):** Logs fuel consumption tied directly to specific vehicles and drivers, calculating operational costs.
*   **Expenses Module (`/expenses`):** Tracks operational trip-level costs such as tolls and driver allowances.
*   **Maintenance Module (`/maintenance`):** Logs servicing records and repair costs for specific vehicles.

### Operational Modules

These modules aggregate data and handle system-wide tasks:

*   **Executive Dashboard (`/dashboard`):** 
    *   Exposes a high-performance (`<500ms`) API endpoint that aggregates fleet KPIs (fleet size, available drivers/vehicles, active trips, fuel costs).
    *   Instead of causing N+1 latency issues with multiple repository calls, this module uses a highly optimized raw SQL projection to pull all metrics natively from the Postgres engine in a single query.
*   **Notifications (`/notifications`):** 
    *   System messaging queue for alerts (e.g., Driver Fatigue warnings, Maintenance Due alerts). 
    *   Strictly typed Enums govern `NotificationType` and `Severity`.

### AI & Microservice Integrations

The Node.js backend acts as a bridge for external intelligent microservices (Python NLP & Analytics):

*   **Abstraction Layer (`IAnalyticsClient`):** 
    *   All external calls are made through a clean interface.
    *   Driven by the `ANALYTICS_PROVIDER` environment variable, allowing the system to use a local `MockAnalyticsClient` for isolated MVP testing or an `HttpAnalyticsClient` in production.
*   **Voice APIs (`/voice`):** 
    *   Endpoints (`/voice/intent`, `/voice/confirm`) that accept natural language text/audio payloads from the Frontend.
    *   These are securely proxied to the NLP engine (or mocked locally) to return actionable structural JSON intents (e.g., `LOG_FUEL`).
*   **Analytics APIs (`/analytics`):** 
    *   Read-only endpoints that expose operational data to the Python Analytics engine.
    *   These endpoints securely alias existing Domain Services to avoid duplicating database query logic while shielding transactional paths.

## Testing & Validation

The backend guarantees reliability through comprehensive integration testing:

*   **Mocked Authentication Strategy:** The test suite utilizes `vi.mock` to bypass the JWT authentication middleware during tests, injecting a synthetic `req.user` payload to simulate an authenticated Admin session.
*   **Test Coverage:** 
    *   Total Suites: **14**
    *   Total Integration Tests: **48**
    *   Status: **100% Passing** with zero regressions.
*   Validation covers happy-paths (successful record creation/fetching) and strict error-handling boundaries (422 Invalid Foreign Keys, 400 Negative Number validation errors, 401 Unauthorized access).

## Running the Project

1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
2. Set environment variables (create a `.env` file referencing `.env.example`).
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Run the test suite:
   ```bash
   npm test
   ```

## API Integration Guide (For Frontend & Microservices)

To integrate seamlessly with this backend, use the following guidelines:

### Base URL
All operational REST endpoints are prefixed with `/api/v1/`.

### Authentication
Every endpoint (except login) requires a JWT passed in the Authorization header:
```http
Authorization: Bearer <your_jwt_token>
```

### Module Endpoints Overview
Here are the base routes for all modules available for consumption:
- `POST /api/v1/auth/login` - Authenticate and get JWT
- `GET/POST /api/v1/depots` - Depot Management
- `GET/POST /api/v1/routes` - Route Management
- `GET/POST /api/v1/vehicles` - Fleet Management
- `GET/POST /api/v1/drivers` - Driver Profiles
- `GET/POST /api/v1/trips` - Trip Dispatch and Execution
- `GET/POST /api/v1/fuel` - Fuel Logging
- `GET/POST /api/v1/expenses` - Trip Expenses
- `GET/POST /api/v1/maintenance` - Fleet Repair Logs
- `GET /api/v1/dashboard` - High-performance Executive KPI Aggregation
- `GET/POST /api/v1/notifications` - System Alerts
- `GET /api/v1/analytics/*` - Read-only operational data for AI engines
- `POST /api/v1/voice/intent` - NLP intent parsing proxy

All responses follow a standard `{ success: true, data: {...}, message: "..." }` structural format to guarantee predictable parsing on the frontend.
