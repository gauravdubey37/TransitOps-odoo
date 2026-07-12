# TransitOps Analytics Engine

Version: 1.0

Status: Analytics Engine Architecture Freeze

Last Updated: YYYY-MM-DD

---

# Purpose

The Analytics Engine is the intelligence layer of TransitOps.

Unlike the Backend, which stores operational data, the Analytics Engine converts operational data into insights, KPIs, recommendations and explainable intelligence.

Its primary responsibilities are:

- Fleet Analytics
- Driver Analytics
- Vehicle Analytics
- Route Analytics
- Carbon Analytics
- Cost Analytics
- Recommendation Generation
- Natural Language Analytics
- Executive KPI Generation

The Analytics Engine must never directly modify transactional data.

---

# Design Philosophy

The Backend answers

> "What happened?"

The Analytics Engine answers

> "Why did it happen?"

Example

```
Trip Cost Increased

↓

Fuel Increased

↓

Route Changed

↓

Longer Distance

↓

Traffic Diversion

↓

Recommendation Generated
```

---

# Architecture

```
                 PostgreSQL
                      │
                      │
          Synchronization Service
                      │
                      ▼
                 Neo4j GraphDB
                      │
     ┌────────────────┼─────────────────┐
     ▼                ▼                 ▼
 KPI Engine     Recommendation     NLP Engine
     │                │                 │
     └────────────┬───┘─────────────────┘
                  ▼
           Analytics REST API
                  │
                  ▼
            Executive Dashboard
```

---

# Responsibilities

The Analytics Engine is responsible for

- KPI generation
- Trend analysis
- Graph analysis
- Route optimization
- Recommendation generation
- Explainable AI
- Executive summaries
- Fleet health scoring

The Backend remains responsible for CRUD operations.

---

# Major Modules

```
KPI Engine

↓

Recommendation Engine

↓

Graph Analytics

↓

Natural Language Engine

↓

Carbon Analytics

↓

Fleet Intelligence

↓

Driver Intelligence

↓

Vehicle Intelligence
```

---

# Data Sources

Primary

```
PostgreSQL
```

Secondary

```
Neo4j
```

Future

```
GPS

IoT

OBD-II

Weather

Traffic
```

The MVP should not depend on third-party APIs.

---

# KPI Engine

Responsible for calculating

Fleet KPIs

Driver KPIs

Vehicle KPIs

Route KPIs

Carbon KPIs

Cost KPIs

Maintenance KPIs

---

# Fleet KPIs

Examples

```
Fleet Utilization

Vehicle Availability

Driver Availability

Trip Completion Rate

Average Cost per KM

Average Cost per Trip

Average Carbon per Trip

Average Fuel Consumption

Average Maintenance Cost
```

---

# Driver KPIs

Examples

```
Trips Completed

Hours Worked

Continuous Driving Hours

Average Fuel Efficiency

Average Route Duration

Route Familiarity

Vehicle Familiarity

Fatigue Index

Challan Count

Salary Cost per Trip
```

---

# Vehicle KPIs

Examples

```
Utilization

Idle Time

Fuel Efficiency

Maintenance Cost

Downtime

Carbon Emissions

Tire Life

Insurance Status

PUC Status
```

---

# Route KPIs

Examples

```
Average Distance

Average Time

Average Toll

Average Carbon

Average Fuel

Average Cost

Trip Count
```

---

# Carbon KPIs

Examples

```
Fleet Carbon

Route Carbon

Vehicle Carbon

Driver Carbon

Monthly Carbon

Carbon per Kilometer

Emission Reduction
```

---

# Cost KPIs

Examples

```
Fuel Cost

Maintenance Cost

Driver Salary

Toll Cost

Allowance Cost

Expense Distribution

Cost per KM

Cost per Trip
```

---

# Recommendation Engine

The recommendation engine should generate explainable recommendations.

Every recommendation must contain

```
Recommendation

↓

Reason

↓

Supporting KPIs

↓

Estimated Savings

↓

Confidence Score
```

---

# Recommendation Categories

Route

Vehicle

Driver

Maintenance

Fuel

Carbon

Cost

Operations

---

# Route Recommendation

Example

```
Delhi → Agra

↓

Suggested Route

↓

18 Minutes Faster

↓

₹430 Cheaper

↓

7kg Less Carbon
```

---

# Driver Recommendation

Suggest

- Better driver
- Experienced driver
- Less fatigued driver

Factors

```
Experience

Route Familiarity

Vehicle Familiarity

Fatigue

Availability
```

---

# Vehicle Recommendation

Suggest

- Lowest Cost Vehicle
- Lowest Carbon Vehicle
- Highest Fuel Efficiency
- Available Vehicle

---

# Maintenance Recommendation

Examples

```
Service Due

Brake Inspection

Oil Change

Tire Replacement
```

---

# Carbon Recommendation

Examples

```
Alternative Route

Alternative Vehicle

Reduced Idling

Better Scheduling
```

---

# Fleet Intelligence

Answers

```
How healthy is the fleet?

Where is operational cost increasing?

Which region is inefficient?

Which depot performs best?

Which vehicles require attention?
```

---

# Driver Intelligence

Answers

```
Which drivers are fatigued?

Who performs best?

Who requires training?

Who incurs frequent fines?

Who has highest route familiarity?
```

---

# Vehicle Intelligence

Answers

```
Which vehicle costs the most?

Which vehicle breaks down frequently?

Which vehicle should be retired?

Which vehicle has highest utilization?
```

---

# Route Intelligence

Tracks

Historical Routes

Travel Time

Distance

Fuel

Carbon

Tolls

Delay

Alternative Routes

---

# Root Cause Analysis

Every insight should explain itself.

Example

```
Fuel Cost Increased

↓

Reason

↓

Longer Route

↓

Supporting KPI

↓

Average Distance Increased 14%

↓

Recommendation

↓

Switch to Expressway
```

---

# Explainability

Every recommendation should include

Evidence

Confidence

Expected Impact

Estimated Savings

Affected KPIs

Recommendations without explanations should never be displayed.

---

# Analytics Pipeline

```
Operational Data

↓

Data Validation

↓

KPI Calculation

↓

Graph Analysis

↓

Recommendation Generation

↓

Dashboard

↓

Reports
```

---

# Refresh Strategy

Dashboard KPIs

Every 30 seconds

Recommendation Engine

On demand

Historical Reports

Generated on request

Future

Incremental background updates

---

# Caching

Frequently used KPIs should be cached.

Examples

Fleet Summary

Dashboard KPIs

Vehicle Utilization

Driver Utilization

Route Statistics

---

# Performance Targets

Dashboard Analytics

<500 ms

Recommendation Generation

<2 seconds

Natural Language Query

<3 seconds

Report Generation

<10 seconds

---

# Error Handling

If analytics fail

Dashboard remains operational.

Recommendations display

```
Unavailable
```

instead of failing the application.

---

# Security

The Analytics Engine

- Never stores passwords
- Never stores authentication tokens
- Never modifies operational records
- Operates with read-only access

---

# Future Extensions

The architecture supports

- Machine Learning
- Predictive Maintenance
- ETA Prediction
- Demand Forecasting
- Driver Risk Scoring
- Fleet Simulation
- Carbon Credit Optimization
- Warehouse Analytics
- Supply Chain Optimization

These modules can be added without redesigning the Analytics Engine.

---

# Ownership

Analytics Branch

Responsible for

- KPI Engine
- Recommendation Engine
- Analytics APIs
- Neo4j Integration
- Dashboard Intelligence

---

# Dependencies

Depends on

- DATABASE_DESIGN.md
- NEO4J_SCHEMA.md
- GRAPH_ANALYTICS.md
- ANALYTICS_API.md
- DASHBOARD_SPEC.md

---

# Revision Policy

Changes to the Analytics Engine require updates to

- ANALYTICS_ENGINE.md
- GRAPH_ANALYTICS.md
- ANALYTICS_API.md
- NLP_ENGINE.md

---

# End of Document