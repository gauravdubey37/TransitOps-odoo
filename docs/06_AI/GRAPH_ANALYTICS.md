# TransitOps Graph Analytics Engine

Version: 1.0

Status: Graph Analytics Architecture Freeze

Last Updated: YYYY-MM-DD

---

# Purpose

Graph Analytics is the intelligence layer responsible for discovering relationships between entities that cannot be efficiently represented using relational databases.

TransitOps uses **Neo4j** as the graph database to power:

- Fleet Intelligence
- Driver Intelligence
- Vehicle Intelligence
- Route Intelligence
- Recommendation Engine
- Root Cause Analysis
- Natural Language Analytics

Unlike PostgreSQL, which answers **"What happened?"**, Graph Analytics answers **"Why did it happen?"** and **"What should happen next?"**

---

# Objectives

The Graph Analytics Engine should

- Discover hidden operational relationships
- Explain business KPIs
- Generate recommendations
- Support natural language analytics
- Detect operational bottlenecks
- Reduce operating costs
- Improve driver allocation
- Improve fleet utilization

---

# High-Level Architecture

```
                PostgreSQL
                     │
                     ▼
          Synchronization Service
                     │
                     ▼
                Neo4j Graph
                     │
     ┌───────────────┼────────────────┐
     ▼               ▼                ▼
 Driver Graph   Vehicle Graph   Route Graph
     │               │                │
     └───────────────┼────────────────┘
                     ▼
            Graph Analytics Engine
                     │
                     ▼
        Recommendation + NLP Engine
```

---

# Graph Model

The graph consists of

```
Drivers

Vehicles

Trips

Routes

Regions

Depots

Fuel

Maintenance

Expenses

Carbon Records
```

Every entity is connected using relationships rather than foreign-key joins.

---

# Node Types

```
Driver

Vehicle

Trip

Route

Region

Depot

FuelLog

Expense

Maintenance

CarbonRecord

Notification
```

---

# Relationship Types

```
(:Driver)-[:COMPLETED]->(:Trip)

(:Trip)-[:USED]->(:Vehicle)

(:Trip)-[:FOLLOWED]->(:Route)

(:Route)-[:LOCATED_IN]->(:Region)

(:Driver)-[:BASED_AT]->(:Depot)

(:Vehicle)-[:UNDERWENT]->(:Maintenance)

(:Trip)-[:GENERATED]->(:FuelLog)

(:Trip)-[:GENERATED]->(:Expense)

(:Trip)-[:GENERATED]->(:CarbonRecord)

(:Driver)-[:ASSIGNED_TO]->(:Vehicle)
```

---

# Driver Graph

Graph relationships enable

- Route Familiarity
- Region Familiarity
- Vehicle Familiarity
- Driver Collaboration
- Driver Availability
- Driver Utilization

Example

```
Driver

↓

Trips

↓

Routes

↓

Regions
```

---

# Vehicle Graph

Used for

- Vehicle Utilization
- Maintenance History
- Fuel Trends
- Carbon Trends
- Assignment History

---

# Route Graph

Used for

- Route Similarity
- Historical Performance
- Alternative Routes
- Regional Connectivity
- Cost Comparison

---

# Depot Graph

Shows

- Driver Distribution
- Vehicle Distribution
- Operational Load
- Fleet Balance

---

# Business Questions

The Graph Engine should answer

```
Which driver knows this route?

Which vehicle performs best here?

Which depot is overloaded?

Why are delays increasing?

Which routes have similar characteristics?

Which vehicles frequently require maintenance?

Which drivers frequently drive together?

Where are operational bottlenecks?
```

---

# Route Similarity

Routes are compared using

- Distance
- Region
- Average Time
- Carbon
- Fuel
- Toll

Used by Recommendation Engine.

---

# Driver Familiarity

Calculated from

- Historical Trips
- Total Distance
- Vehicle Types
- Regions
- Trip Frequency

Produces

```
Driver Familiarity Score
```

---

# Vehicle Familiarity

Determined using

- Historical Usage
- Trip Count
- Driver History

Produces

```
Vehicle Familiarity Score
```

---

# Fleet Connectivity

Measures

```
Drivers

↓

Vehicles

↓

Trips

↓

Routes

↓

Regions
```

Used for operational planning.

---

# Root Cause Analysis

Graph traversal identifies

```
Problem

↓

Contributing Factors

↓

Dependencies

↓

Root Cause
```

Example

```
Profit Down

↓

Fuel Increased

↓

Route Longer

↓

Construction Diversion
```

---

# Graph Traversals

Common traversals include

Driver → Trip

Vehicle → Maintenance

Trip → Route

Route → Region

Driver → Vehicle

Vehicle → Fuel

Trip → Expenses

---

# Recommendation Support

The Graph Engine provides

- Best Driver
- Best Vehicle
- Best Route
- Better Depot
- Carbon Reduction

Every recommendation includes graph-derived evidence.

---

# Graph Metrics

Examples

```
Route Popularity

Driver Centrality

Vehicle Utilization

Depot Connectivity

Region Connectivity

Maintenance Density
```

---

# Graph Algorithms

Future versions may support

- Shortest Path
- Community Detection
- PageRank
- Similarity
- Centrality
- Weakly Connected Components
- Node Embeddings

These are optional for the MVP.

---

# Synchronization

Synchronization Flow

```
PostgreSQL

↓

Change Detection

↓

Transformation

↓

Neo4j

↓

Graph Validation
```

Only PostgreSQL may create operational records.

Neo4j remains read-only.

---

# Performance Targets

Graph Query

```
<500 ms
```

Recommendation Traversal

```
<1 second
```

Root Cause Analysis

```
<2 seconds
```

---

# Security

Graph Analytics

- Read-only
- RBAC enforced
- No authentication data
- No password storage
- No document storage

---

# Monitoring

Track

- Query Count
- Query Duration
- Synchronization Lag
- Graph Size
- Relationship Count
- Cache Hit Rate

---

# Failure Handling

If Neo4j becomes unavailable

- Dashboard remains operational
- Analytics degrade gracefully
- Recommendations become unavailable
- Transactional operations continue normally

---

# Future Enhancements

Future versions may introduce

- Predictive Routing
- Dynamic Dispatch Optimization
- Digital Twin Fleet Graph
- Supply Chain Graph
- Warehouse Graph
- Customer Relationship Graph
- Traffic Pattern Graph
- Weather Correlation Graph

---

# Dependencies

Depends on

- NEO4J_SCHEMA.md
- ANALYTICS_ENGINE.md
- NLP_ENGINE.md
- RECOMMENDATION_ENGINE.md
- ANALYTICS_API.md

---

# Ownership

Analytics Branch

---

# Revision Policy

Any graph schema or traversal modification requires updates to

- GRAPH_ANALYTICS.md
- NEO4J_SCHEMA.md
- ANALYTICS_ENGINE.md
- RECOMMENDATION_ENGINE.md
- NLP_ENGINE.md

---

# End of Document