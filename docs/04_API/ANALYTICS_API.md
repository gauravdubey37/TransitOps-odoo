# TransitOps Analytics API

Version: 1.0

Status: API Specification Freeze

Last Updated: YYYY-MM-DD

---

# Purpose

This document defines all Analytics APIs for TransitOps.

The Analytics Module is responsible for transforming operational data into actionable intelligence.

Unlike the transactional APIs, Analytics APIs are primarily read-oriented and generate insights rather than modify operational records.

The Analytics Engine consists of:

- KPI Engine
- Recommendation Engine
- Neo4j Graph Analytics
- Natural Language Query Engine
- Carbon Analytics
- Route Intelligence
- Fleet Intelligence
- Driver Intelligence
- Vehicle Intelligence

---

# Base URL

```
/api/v1/analytics
```

---

# Analytics Architecture

```
                PostgreSQL
                      │
                      │
               Synchronization
                      │
                      ▼
                  Neo4j Graph
                      │
      ┌───────────────┼───────────────┐
      ▼               ▼               ▼
 KPI Engine     Recommendation    NLP Engine
                      │
                      ▼
                REST API Response
```

Analytics APIs are **read-only**.

They must never directly modify operational data.

---

# Analytics Categories

The Analytics API exposes:

- Dashboard KPIs
- Route Analytics
- Driver Analytics
- Vehicle Analytics
- Fleet Analytics
- Expense Analytics
- Carbon Analytics
- Recommendation Engine
- Graph Queries
- Natural Language Queries

---

# Dashboard KPIs

## Endpoint

```
GET /analytics/dashboard
```

Returns

```json
{
  "fleetSize": 120,
  "activeDrivers": 94,
  "activeTrips": 42,
  "vehiclesAvailable": 51,
  "vehiclesInMaintenance": 8,
  "totalCarbonToday": 438.72,
  "fuelCostToday": 285000,
  "tripCompletionRate": 98.6
}
```

---

# Fleet Overview

```
GET /analytics/fleet
```

Returns

- Fleet utilization
- Fleet availability
- Fleet operating cost
- Carbon emissions
- Average mileage
- Average maintenance cost

---

# Driver Analytics

```
GET /analytics/drivers
```

Returns

- Top drivers
- Driver utilization
- Driver fatigue summary
- Average trip duration
- Average fuel efficiency
- Total operating hours

---

## Individual Driver Analytics

```
GET /analytics/drivers/{driverId}
```

Returns

- Performance Score
- Route Familiarity
- Vehicle Experience
- Carbon Efficiency
- Fuel Efficiency
- Historical Trends

---

# Vehicle Analytics

```
GET /analytics/vehicles
```

Returns

- Vehicle utilization
- Downtime
- Maintenance trends
- Fuel efficiency
- Carbon emissions
- Cost per kilometer

---

## Individual Vehicle Analytics

```
GET /analytics/vehicles/{vehicleId}
```

Returns

- Maintenance score
- Utilization
- Lifetime cost
- Tire statistics
- Carbon trend

---

# Route Analytics

```
GET /analytics/routes
```

Returns

- Most used routes
- Least efficient routes
- Lowest cost routes
- Highest toll routes
- Highest carbon routes

---

## Route Details

```
GET /analytics/routes/{routeId}
```

Returns

- Historical statistics
- Average travel time
- Average fuel
- Average cost
- Carbon trend
- Recommendation score

---

# Carbon Analytics

```
GET /analytics/carbon
```

Returns

- Fleet emissions
- Monthly emissions
- Route emissions
- Driver emissions
- Vehicle emissions

---

## Carbon Comparison

```
GET /analytics/carbon/comparison
```

Query Parameters

```
startDate

endDate

vehicleId

driverId

routeId
```

---

# Expense Analytics

```
GET /analytics/expenses
```

Returns

- Expense breakdown
- Fuel cost
- Toll cost
- Driver allowances
- Maintenance cost
- Cost trends

---

# Fuel Analytics

```
GET /analytics/fuel
```

Returns

- Fuel consumption
- Average mileage
- Fuel efficiency trends
- Cost trends

---

# Maintenance Analytics

```
GET /analytics/maintenance
```

Returns

- Upcoming maintenance
- Historical maintenance
- Downtime
- Average repair cost
- Maintenance hotspots

---

# Recommendation Engine

## Endpoint

```
GET /analytics/recommendations
```

Returns

Recommendations grouped by category.

Example

```json
[
  {
    "type":"Route",
    "title":"Use Delhi → Agra Expressway",
    "benefit":"18% travel time reduction"
  }
]
```

---

# Route Recommendation

```
GET /analytics/recommendations/routes
```

Returns

- Faster routes
- Lower toll routes
- Lower carbon routes
- Lower fuel routes

---

# Driver Recommendation

```
GET /analytics/recommendations/drivers
```

Returns

- Best driver for route
- Best driver for vehicle
- Driver replacement suggestions

---

# Vehicle Recommendation

```
GET /analytics/recommendations/vehicles
```

Returns

- Best available vehicle
- Lowest maintenance vehicle
- Lowest carbon vehicle

---

# Graph Analytics

```
GET /analytics/graph
```

Returns graph metrics.

Supported metrics

- Degree
- Connectivity
- Centrality
- Route relationships
- Region relationships

---

# Graph Traversal

```
GET /analytics/graph/path
```

Example

```
Driver

↓

Trip

↓

Vehicle

↓

Route
```

Returns complete relationship chain.

---

# Natural Language Query

## Endpoint

```
POST /analytics/query
```

Request

```json
{
  "query":"Why are transport costs increasing in North Region?"
}
```

---

Response

```json
{
  "summary":"Fuel costs increased by 18% due to longer average trip distances.",
  "recommendations":[
    "...",
    "..."
  ],
  "kpis":[]
}
```

---

# Supported Questions

Examples

```
Why are profits decreasing?

Which routes cost the most?

Which drivers perform best?

Why is maintenance increasing?

Which vehicles consume the most fuel?

Which region generates the highest carbon emissions?

How can operating costs be reduced?
```

---

# Root Cause Analysis

```
GET /analytics/root-cause
```

Query Parameters

```
metric

region

route

vehicle

driver
```

Returns

- Primary Cause
- Supporting KPIs
- Recommendation

---

# KPI Library

```
GET /analytics/kpis
```

Returns

Every KPI available within the platform.

Examples

- Fleet Utilization
- Driver Utilization
- Vehicle Utilization
- Carbon Efficiency
- Cost per KM
- Cost per Trip
- Fuel Efficiency
- Average Maintenance Cost

---

# Dashboard Cards

```
GET /analytics/cards
```

Returns KPI cards used by Executive Dashboard.

---

# Charts

```
GET /analytics/charts
```

Supports

- Daily
- Weekly
- Monthly
- Quarterly
- Yearly

---

# Leaderboards

```
GET /analytics/leaderboards
```

Returns

- Best Drivers
- Best Vehicles
- Best Routes
- Lowest Carbon Routes
- Lowest Maintenance Vehicles

---

# Export Analytics

```
POST /analytics/export
```

Formats

```
PDF

Excel

CSV
```

---

# Business Rules

Analytics follows

```
BR-ANA-001

BR-ANA-002

BR-ANA-003

BR-ANA-004
```

Analytics APIs never update transactional records.

---

# Error Codes

| Code | Description |
|------|-------------|
| ANA_001 | Analytics Dataset Not Found |
| ANA_002 | Invalid Query |
| ANA_003 | KPI Not Found |
| ANA_004 | Graph Traversal Failed |
| ANA_005 | Recommendation Unavailable |
| ANA_006 | NLP Parsing Failed |
| ANA_007 | Analytics Engine Offline |

---

# Permissions

| Endpoint | Admin | Fleet | Dispatcher | Driver | Analyst |
|----------|:----:|:------:|:----------:|:------:|:-------:|
| Dashboard | ✅ | ✅ | ✅ | ❌ | ✅ |
| Fleet Analytics | ✅ | ✅ | Read | ❌ | ✅ |
| Driver Analytics | ✅ | ✅ | Read | Self | ✅ |
| Vehicle Analytics | ✅ | ✅ | Read | Assigned | ✅ |
| Recommendations | ✅ | ✅ | Read | ❌ | ✅ |
| NLP Query | ✅ | ✅ | ❌ | ❌ | ✅ |
| Export | ✅ | ✅ | ❌ | ❌ | ✅ |

---

# Audit Events

Log

- Analytics Queries
- NLP Queries
- Graph Queries
- Recommendation Requests
- Report Exports

---

# Future APIs

Future versions will support

- Predictive Maintenance
- Demand Forecasting
- ETA Prediction
- AI Dispatching
- Carbon Credit Analytics
- Supply Chain Analytics
- Warehouse Optimization
- Digital Twin Fleet Visualization
- ML Model Monitoring

---

# Revision Policy

Changes to Analytics APIs require updates to

- API_CONTRACT.md
- ANALYTICS_API.md
- GRAPH_ANALYTICS.md
- ANALYTICS_ENGINE.md
- NLP_ENGINE.md
- Dashboard Specification

---

# End of Document