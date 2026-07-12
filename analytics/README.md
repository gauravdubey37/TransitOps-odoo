# TransitOps Analytics Engine MVP

This directory contains the Python-based Analytics and Machine Learning engine for the TransitOps MVP. It serves as the intelligence layer, generating explainable recommendations, fleet intelligence, and natural language query processing.

## Table of Contents

- [Overview](#overview)
- [Architecture & Stack](#architecture--stack)
- [Implemented Modules](#implemented-modules)
  - [Graph Engine](#graph-engine)
  - [KPI & Intelligence Modules](#kpi--intelligence-modules)
  - [Recommendations & NLP](#recommendations--nlp)
- [Testing & Validation](#testing--validation)
- [Running the Project](#running-the-project)

## Overview

The Analytics API provides a decoupled, highly intelligent operational insight layer. It securely interfaces with a Neo4j Graph Database to map out complex routing and logistics relationships, offering ML-driven decision support via natural language processing.

## Architecture & Stack

- **Runtime:** Python 3.10+
- **Framework:** FastAPI
- **Graph Database:** Neo4j
- **NLP & ML:** spaCy, SentenceTransformers
- **Testing:** Pytest

## Implemented Modules

The MVP phase implements 100% of the operational intelligence requirements detailed in the `ANALYTICS_AGENT.md`.

### Graph Engine

- **Synchronization (`/sync`):** The ETL pipeline continuously fetches transactional data from PostgreSQL and constructs high-fidelity Graph Nodes and Relationships in Neo4j.
- **Neo4j Client (`/core`):** A robust interface handling authenticated reads and writes for downstream intelligence layers.

### KPI & Intelligence Modules

- **KPI Engines (`/kpi`):** Computes core performance metrics for Drivers, Vehicles, and Financials.
- **Fleet Intelligence (`/intelligence`):** Transforms base KPIs into actionable insights, such as detecting anomaly patterns and high driver risk.

### Recommendations & NLP

- **Recommendation Engines (`/recommendations`):** Generates active routing and assignment recommendations using complex Graph Traversals.
- **NLP Pipeline (`/nlp`):** Translates raw text queries into structured intent using `SentenceTransformer` vectors and extracts entities with `spaCy` NER models.
- **Voice Parser (`/voice`):** Extracts offline-ready intent actions from transcribed voice inputs.
- **Explainability (`/explainability`):** Ensures no recommendation is a "black box" by transparently surfacing the underlying evidence for every suggestion.

## API Integration Guide

All endpoints are hosted via FastAPI on port 8000 and prefixed with `/`.

### Module Endpoints Overview
- `GET /kpi/*` - Bulk KPI retrieval.
- `GET /recommendations/*` - Active recommendations and history.
- `GET /nlp/query/*` - Natural language endpoints.
- `POST /voice/*` - Voice intent parsing.

## Running the Project

1. Install dependencies:
   ```bash
   cd analytics
   pip install -r requirements.txt
   ```
2. Start the Graph Database (Neo4j).
3. Run the development server:
   ```bash
   uvicorn src.main:app --reload
   ```
4. Run tests with `pytest`.
