# TransitOps Neo4j Schema

Version: 1.0

Status: Graph Database Architecture Freeze

Last Updated: YYYY-MM-DD

---

# Purpose

This document defines the Neo4j graph database schema for TransitOps.

Unlike PostgreSQL, which stores transactional data, Neo4j models relationships between operational entities to enable:

- Route intelligence
- Recommendation engine
- Root cause analysis
- Fleet analytics
- Driver analytics
- Vehicle analytics
- Natural language querying
- Explainable AI recommendations

Neo4j is **read-optimized** and synchronized from PostgreSQL.

It is **never** the system of record.

---

# Graph Philosophy

PostgreSQL answers

> "What happened?"

Neo4j answers

> "Why did it happen?"

Example

```
Driver

↓

Vehicle

↓

Trip

↓

Route

↓

Region

↓

Fuel Consumption

↓

Carbon Emission

↓

Maintenance Cost

↓

Profit
```

The graph allows complex relationship traversal that would otherwise require numerous SQL joins.

---

# Synchronization

```
PostgreSQL

↓

Synchronization Service

↓

Neo4j
```

Synchronization is:

- One-way
- Incremental
- Eventual Consistency

Neo4j must never write back into PostgreSQL.

---

# Node Types

TransitOps uses the following primary node labels.

```
User

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

Future nodes can be added without affecting the existing graph.

---

# Driver Node

Label

```
:Driver
```

Properties

```
driver_id

employee_code

name

experience_years

completed_trips

total_hours

fatigue_level

salary

license_type

status
```

---

# Vehicle Node

Label

```
:Vehicle
```

Properties

```
vehicle_id

registration_number

vehicle_class

fuel_type

mileage

load_capacity

maintenance_cost

status
```

---

# Trip Node

Label

```
:Trip
```

Properties

```
trip_id

status

distance

duration

fuel_used

carbon

cost

toll_cost

start_time

end_time
```

---

# Route Node

Properties

```
route_id

source

destination

distance

average_time

average_cost

average_carbon

average_fuel
```

---

# Region Node

Properties

```
region_id

region_name

state

country
```

---

# Depot Node

Properties

```
depot_id

name

city

state
```

---

# Fuel Log Node

Properties

```
fuel_log_id

quantity

cost

station

timestamp
```

---

# Expense Node

Properties

```
expense_id

category

amount

timestamp
```

---

# Maintenance Node

Properties

```
maintenance_id

service_type

cost

service_date
```

---

# Carbon Record Node

Properties

```
carbon_id

emission

emission_factor

created_at
```

---

# Relationship Types

The following relationships are supported.

```
(:Driver)-[:DRIVES]->(:Vehicle)

(:Driver)-[:COMPLETED]->(:Trip)

(:Trip)-[:USES]->(:Vehicle)

(:Trip)-[:FOLLOWS]->(:Route)

(:Route)-[:LOCATED_IN]->(:Region)

(:Driver)-[:BASED_AT]->(:Depot)

(:Trip)-[:GENERATED]->(:FuelLog)

(:Trip)-[:HAS_EXPENSE]->(:Expense)

(:Vehicle)-[:UNDERWENT]->(:Maintenance)

(:Trip)-[:GENERATED]->(:CarbonRecord)

(:Driver)-[:RECEIVED]->(:Notification)
```

---

# Graph Structure

```
Driver

├── DRIVES ─────────► Vehicle

├── COMPLETED ─────► Trip

│                     │

│                     ├── FOLLOWS ─────► Route

│                     │                     │

│                     │                     ▼

│                     │                  Region

│                     │

│                     ├── GENERATED ───► FuelLog

│                     ├── HAS_EXPENSE ─► Expense

│                     └── GENERATED ───► CarbonRecord

│

└── BASED_AT ───────► Depot
```

---

# Graph Queries Supported

Examples

---

## Driver Experience

Find drivers experienced on a route.

```
Driver

↓

Trip

↓

Route
```

---

## Best Driver

Find the best driver for a particular vehicle.

Factors

- Experience
- Fuel efficiency
- Carbon efficiency
- Route familiarity

---

## Vehicle Utilization

```
Vehicle

↓

Trips

↓

Hours

↓

Maintenance
```

---

## Maintenance Analysis

```
Vehicle

↓

Maintenance

↓

Repair Cost

↓

Downtime
```

---

## Region Analysis

```
Region

↓

Routes

↓

Trips

↓

Costs

↓

Profitability
```

---

## Carbon Analysis

```
Region

↓

Trips

↓

Vehicles

↓

Carbon
```

---

## Driver Recommendation

Find another driver familiar with

- Route
- Region
- Vehicle Type

---

## Vehicle Recommendation

Find an alternative vehicle based on

- Capacity

- Fuel Type

- Carbon

- Maintenance History

---

# Recommendation Engine

Neo4j powers recommendations including

- Better route

- Better driver

- Better vehicle

- Lower maintenance option

- Lower carbon alternative

- Lower operating cost

Each recommendation must include an explanation.

Example

```
Recommended Route

Reason

18% faster

12 km shorter

9% less fuel

14% lower carbon

₹420 lower toll cost
```

---

# Natural Language Support

Example Questions

```
Why are profits decreasing?

Which drivers are most efficient?

Why is Region A more expensive?

Which vehicle costs the most?

Which routes have the highest emissions?

Why is maintenance increasing?

Which drivers frequently incur fines?
```

The NLP engine converts these into Cypher queries.

---

# Graph Analytics KPIs

Neo4j is responsible for computing relationship-driven KPIs.

Examples

- Driver utilization

- Vehicle utilization

- Depot efficiency

- Route efficiency

- Driver familiarity

- Fleet connectivity

- Maintenance hotspots

- Fuel hotspots

- Carbon hotspots

---

# Graph Algorithms (Future)

The architecture supports future Neo4j Graph Data Science algorithms.

Potential algorithms include:

- PageRank

- Community Detection

- Shortest Path

- Centrality

- Similarity

- Node Embeddings

These are not required for the MVP.

---

# Indexing Strategy

Indexes should exist for:

```
driver_id

vehicle_id

trip_id

route_id

region_id

employee_code

registration_number
```

---

# Constraints

Each primary node uses unique constraints.

Examples

```
driver_id UNIQUE

vehicle_id UNIQUE

trip_id UNIQUE

route_id UNIQUE
```

---

# Synchronization Rules

Synchronization jobs should:

- Insert new nodes
- Update changed properties
- Create new relationships
- Remove obsolete relationships (if applicable)

Historical relationships should never be deleted unless the underlying transactional data is archived.

---

# Security

Neo4j stores analytical references only.

Sensitive information such as:

- Passwords
- Authentication tokens
- Personal documents

must never be stored in the graph database.

---

# Future Extensions

The graph model supports future additions including:

- GPS tracking
- Live traffic
- IoT telemetry
- Warehouse logistics
- Customer shipments
- Supplier network
- Fleet collaboration
- Incident analysis
- Predictive maintenance
- Carbon credit trading

These extensions should introduce new node labels and relationships without modifying existing graph structures.

---

# Revision Policy

Any modification to the graph schema requires updates to:

- DATABASE_DESIGN.md
- NEO4J_SCHEMA.md
- ANALYTICS_ENGINE.md
- GRAPH_ANALYTICS.md

Graph changes should be reviewed before implementation.

---

# End of Document