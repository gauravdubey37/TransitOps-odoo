# TransitOps System Architecture

Version: 1.0

---

# Purpose

This document defines the complete software architecture of TransitOps.

It serves as the single source of truth for:

- System architecture
- Module boundaries
- Branch ownership
- Service communication
- Data flow
- Database responsibilities
- AI service integration
- UI architecture

No developer or AI agent should implement features that contradict this document.

---

# Architectural Philosophy

TransitOps follows a **Modular Monolith with Intelligent Services** architecture.

Instead of building dozens of microservices, the project is organized into independent modules inside one backend application.

Reasons:

- Faster hackathon development
- Easier local deployment
- Reduced DevOps complexity
- Simpler debugging
- Easier testing
- Future migration to microservices remains possible

---

# High-Level Architecture

                          +----------------------+
                          |      Frontend        |
                          |     Next.js App      |
                          +----------+-----------+
                                     |
                                     |
                              REST API (HTTPS)
                                     |
                                     |
                    +----------------+----------------+
                    |                                 |
          +---------+---------+            +----------+---------+
          |     Backend API   |            |   Analytics Engine |
          |  Node.js/Express  |            |      Python         |
          +---------+---------+            +----------+---------+
                    |                                 |
                    |                                 |
          +---------+---------+            +----------+---------+
          |    PostgreSQL     |            |       Neo4j        |
          +-------------------+            +--------------------+

---

# System Components

The platform consists of four primary layers.

---

## 1. Presentation Layer

Technology

- Next.js
- React
- TypeScript
- TailwindCSS
- shadcn/ui

Responsibilities

- Dashboards
- Driver Portal
- Fleet Management
- Reports
- Analytics UI
- Voice UI
- Authentication
- Forms
- Tables
- Charts

This layer contains no business logic.

Business logic always belongs in the backend.

---

## 2. Business Layer

Technology

Node.js

Express

TypeScript

Responsibilities

Authentication

RBAC

Drivers

Vehicles

Trips

Maintenance

Fuel

Expenses

Notifications

Business Rules

Validation

Reporting

This layer is the heart of the application.

---

## 3. Intelligence Layer

Technology

Python

Neo4j

spaCy

Whisper

Responsibilities

Natural Language Processing

Graph Analytics

Recommendation Engine

Voice Processing

Speech Recognition

Text-to-Speech

Carbon Analytics

Root Cause Analysis

This layer augments the backend with intelligent capabilities.

---

## 4. Data Layer

PostgreSQL

Stores transactional data.

Neo4j

Stores relationships and analytical graph structures.

Both databases have clearly separated responsibilities.

---

# Module Architecture

The backend is divided into independent modules.

Authentication

↓

Users

↓

Drivers

↓

Vehicles

↓

Trips

↓

Routes

↓

Maintenance

↓

Fuel

↓

Expenses

↓

Reports

↓

Analytics

↓

Notifications

↓

Settings

Every module must contain:

Controller

Service

Repository

DTO

Validation

Routes

Tests

Documentation

---

# Database Responsibilities

## PostgreSQL

Stores:

Users

Roles

Permissions

Drivers

Vehicles

Trips

Maintenance

Fuel

Expenses

Notifications

Audit Logs

Settings

Anything transactional belongs in PostgreSQL.

---

## Neo4j

Stores:

Driver Relationships

Vehicle Relationships

Route Graph

Trip Graph

Regional Graph

Recommendation Graph

Analytics Graph

Carbon Graph

Fleet Knowledge Graph

Anything relationship-heavy belongs in Neo4j.

---

# Voice Assistant Architecture

Driver

↓

Microphone

↓

Offline Speech-to-Text

↓

Intent Extraction

↓

Backend Validation

↓

Missing Information Detection

↓

Text-to-Speech

↓

Driver

This entire pipeline should work offline.

---

# Analytics Architecture

Operational Data

↓

PostgreSQL

↓

Synchronization Layer

↓

Neo4j

↓

Graph Algorithms

↓

Recommendation Engine

↓

Dashboard

Neo4j is used only for analytics.

It should never replace PostgreSQL as the transactional database.

---

# Request Flow

User Action

↓

Frontend

↓

REST API

↓

Validation

↓

Business Logic

↓

Database

↓

Response

↓

Frontend Update

No frontend component should communicate directly with the database.

---

# Branch Responsibilities

Frontend Branch

Owns:

Frontend only.

Backend Branch

Owns:

Business logic.

Analytics Branch

Owns:

Python

Neo4j

Voice

AI

Infrastructure Branch

Owns:

Database

Migrations

Repository

Shared Configurations

Documentation

CI/CD

No branch should modify another branch's owned implementation.

Shared interfaces must remain stable.

---

# Communication Between Branches

Frontend ↔ Backend

REST APIs only.

Backend ↔ Analytics

Internal service interfaces.

Backend ↔ PostgreSQL

Repositories only.

Analytics ↔ Neo4j

Cypher queries only.

Frontend never communicates with Neo4j.

Frontend never communicates with PostgreSQL.

---

# Shared Contracts

The following documents define immutable interfaces.

DATABASE_SCHEMA.md

API_CONTRACT.md

DESIGN_SYSTEM.md

INTERFACE_FREEZE.md

Changing these requires agreement from all branch owners.

---

# Folder Ownership

/frontend

Frontend Branch

/backend

Backend Branch

/analytics

Analytics Branch

/database

Infrastructure Branch

/docs

Infrastructure Branch

Shared code must be documented.

---

# Error Handling Philosophy

Every API response follows one standard.

Success

{
  "success": true,
  "data": {}
}

Failure

{
  "success": false,
  "error": {
    "code": "...",
    "message": "...",
    "details": {}
  }
}

No endpoint should return inconsistent response formats.

---

# Logging Strategy

Every request should be logged.

Important events

Authentication

Trip Assignment

Fuel Update

Maintenance

Analytics Query

Voice Commands

System Errors

Audit Logs

Future integrations should extend this logging system.

---

# Security Principles

JWT Authentication

Role-Based Access Control

Input Validation

Parameterized SQL Queries

Password Hashing

Rate Limiting

Audit Logs

Principle of Least Privilege

No secrets should ever be committed to Git.

---

# Scalability

The architecture should support future migration to:

Microservices

Event-driven messaging

GPS integration

IoT sensors

External ERP integrations

Warehouse systems

Machine Learning pipelines

The current modular architecture should not prevent future scaling.

---

# Non-Functional Requirements

Maintainability

Readability

Modularity

Offline-first

High cohesion

Low coupling

Consistent interfaces

Strong typing

Reusable components

Enterprise UX

---

# Architecture Principles

Every implementation decision should satisfy these rules:

✓ Modular

✓ Local-first

✓ AI-friendly

✓ Testable

✓ Extensible

✓ Enterprise-grade

✓ Maintainable

✓ Consistent

If a proposed implementation violates these principles, it should be redesigned before implementation begins.

---

End of Document