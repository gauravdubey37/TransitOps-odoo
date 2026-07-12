# TransitOps Analytics API Reference

This document outlines the REST APIs exposed by the Analytics Engine.

## Base URL
`/` (Hosted via FastAPI locally on port 8000 by default)

## Health and Sync
- **GET /health**: Verifies connection to Neo4j and PostgreSQL.
- **GET /health/graph**: Runs validation checks on the Graph integrity (e.g. orphans, duplicate nodes).
- **GET /health/sync**: Retrieves metrics from the last background synchronization job.

## KPIs
All KPI endpoints return JSON data and cache results for 5 minutes.
- **GET /kpi/fleet**: Returns fleet utilization, total active vehicles, trips today, and on-time performance.
- **GET /kpi/driver/{driver_id}**: Returns driver fatigue levels, efficiency score, and total trips completed.
- **GET /kpi/vehicle/{vehicle_id}**: Returns vehicle mileage, fuel efficiency, and maintenance cost per km.

## Recommendations
- **POST /recommendations/drivers**: Recommends top drivers for a specific route and vehicle class. Includes an explainability layer.
  - **Payload**: `{"route_id": "string", "vehicle_class": "string"}`

## NLP & Voice
- **POST /nlp/query**: Parses natural language queries into intents and structured entities. Results are cached for 2 minutes.
  - **Payload**: `{"query": "string"}`
- **POST /voice/process**: Parses voice transcripts into executable actions with confirmation flags for offline-first support.
  - **Payload**: `{"transcript": "string", "context_data": {}}`

## Authentication
Authentication is delegated to the Backend branch; internal Analytics APIs are unprotected. Do not expose these APIs directly to the internet.
