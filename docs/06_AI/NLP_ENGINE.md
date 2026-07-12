# TransitOps Natural Language Processing (NLP) Engine

Version: 1.0

Status: NLP Engine Architecture Freeze

Last Updated: YYYY-MM-DD

---

# Purpose

The NLP Engine enables users to interact with TransitOps using natural language instead of manually navigating dashboards.

Rather than searching through dozens of reports, a Fleet Manager should be able to ask questions like:

> "Why has fuel cost increased in Delhi?"

and receive

- A concise answer
- Supporting KPIs
- Visualizations
- Recommended actions

The NLP Engine is **not** a chatbot.

It is an analytics interface built on top of the Analytics Engine and Neo4j Graph Database.

---

# Objectives

The NLP Engine shall

- Understand natural language questions
- Extract business intent
- Identify entities
- Identify KPIs
- Generate graph queries
- Generate SQL queries when required
- Merge analytical results
- Produce explainable responses

---

# Design Philosophy

User Question

↓

Intent Detection

↓

Entity Recognition

↓

Context Builder

↓

Analytics Engine

↓

Neo4j Query

↓

SQL Query

↓

Merge Results

↓

Generate Explanation

↓

Return Response

---

# Core Components

The NLP Engine consists of

```
Language Detection

↓

Intent Classification

↓

Entity Recognition

↓

Query Planner

↓

Graph Query Generator

↓

SQL Query Generator

↓

Result Aggregator

↓

Response Generator

↓

Recommendation Generator
```

---

# Supported Languages

MVP

- English
- Hindi

Future

- Marathi
- Gujarati
- Tamil
- Telugu
- Kannada
- Bengali
- Punjabi

---

# Technology Stack

The NLP engine should use local models only.

Suggested libraries

- spaCy
- Sentence Transformers
- fastText
- HuggingFace Transformers (local)
- LangChain (optional)
- llama.cpp / Ollama (future)

No cloud LLM APIs should be required.

---

# Query Categories

The NLP Engine should understand:

Operational Queries

Analytical Queries

Recommendation Queries

Comparative Queries

Historical Queries

Trend Queries

Root Cause Queries

Forecast Queries (Future)

---

# Operational Queries

Examples

```
Show today's active trips.

Show available drivers.

Show vehicles under maintenance.

Show today's expenses.

Show delayed trips.
```

---

# Analytical Queries

Examples

```
Why are costs increasing?

Why is fuel consumption high?

Which vehicle costs the most?

Which driver is most efficient?

Which route generates the most carbon?
```

---

# Comparative Queries

Examples

```
Compare Delhi and Mumbai.

Compare two drivers.

Compare two vehicles.

Compare Route A with Route B.

Compare this month with last month.
```

---

# Recommendation Queries

Examples

```
Suggest a better route.

Suggest a better driver.

Suggest a better vehicle.

How can I reduce costs?

How can I reduce carbon emissions?
```

---

# Root Cause Queries

Examples

```
Why did maintenance cost increase?

Why are profits falling?

Why are trips taking longer?

Why are toll costs increasing?

Why are delays increasing?
```

---

# Intent Categories

Supported intents

```
SHOW_DATA

COMPARE

EXPLAIN

RECOMMEND

ANALYZE

SEARCH

FILTER

SUMMARIZE

EXPORT
```

---

# Entity Recognition

Entities include

Drivers

Vehicles

Trips

Routes

Regions

Depots

Fuel

Maintenance

Carbon

Expenses

KPIs

Dates

Vehicle Classes

Fuel Types

---

# Context Extraction

The NLP Engine should detect

Date Range

Region

Vehicle

Driver

Route

Trip

Metric

Filters

Example

```
Why did fuel cost increase in Delhi last month?
```

Extracted Context

```
Metric

Fuel Cost

Region

Delhi

Time

Last Month
```

---

# Query Planning

The engine determines

Does this require

SQL?

Neo4j?

Both?

Example

```
Average Fuel Cost

↓

SQL

Driver Familiarity

↓

Neo4j

Why is fuel increasing?

↓

SQL + Neo4j
```

---

# SQL Query Generator

Responsible for

- Aggregations
- Filtering
- Historical analysis
- KPI calculations

---

# Neo4j Query Generator

Responsible for

- Relationships
- Route familiarity
- Driver similarity
- Recommendation graphs
- Root cause analysis

---

# Response Generation

Every response should contain

Summary

↓

Supporting KPIs

↓

Charts (if applicable)

↓

Recommendations

↓

Confidence

---

# Example Response

Question

```
Why are transportation costs increasing in Delhi?
```

Response

```
Summary

Transportation costs increased by 12%.

Primary Reasons

• Fuel prices increased by 7%.

• Average trip distance increased by 10%.

• Toll expenses increased by 5%.

Recommendations

• Use Expressway Route

• Reassign high-efficiency vehicles

Expected Savings

₹18,500/month
```

---

# Explainability

Every answer should include

Evidence

KPIs Used

Reasoning

Confidence Score

Users should understand how the conclusion was reached.

---

# Confidence Scoring

High

```
>90%
```

Medium

```
75-90%
```

Low

```
<75%
```

Low-confidence answers should include a disclaimer.

---

# Dashboard Integration

The Executive Dashboard should support

```
Ask Analytics...
```

Natural language search bar.

Results should open relevant dashboards automatically.

---

# Voice Integration

Voice commands should be converted into NLP queries.

Example

Speech

↓

Text

↓

Intent

↓

Analytics

↓

Speech Response

---

# Security

The NLP Engine respects RBAC.

Users may only query data they are authorized to access.

---

# Performance Targets

Intent Detection

<100 ms

Entity Recognition

<200 ms

Query Planning

<200 ms

Analytics Query

<2 seconds

Complete Response

<3 seconds

---

# Logging

Log

Intent

Entities

Confidence

Execution Time

Errors

No sensitive user information should be logged.

---

# Failure Handling

If the engine cannot answer

Return

- Explanation
- Similar questions
- Suggested filters

Never fabricate analytical results.

---

# Future Enhancements

Future versions may include

- Conversational memory
- Multi-turn analytics
- Predictive forecasting
- Natural language report generation
- AI-generated executive summaries
- Autonomous analytics agents

---

# Dependencies

- ANALYTICS_ENGINE.md
- GRAPH_ANALYTICS.md
- ANALYTICS_API.md
- NEO4J_SCHEMA.md
- API_CONTRACT.md

---

# Ownership

Analytics Branch

---

# Revision Policy

Changes to the NLP Engine require updates to

- NLP_ENGINE.md
- ANALYTICS_ENGINE.md
- GRAPH_ANALYTICS.md
- ANALYTICS_API.md

---

# End of Document