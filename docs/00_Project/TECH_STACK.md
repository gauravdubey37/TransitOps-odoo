# TransitOps Technology Stack

Version: 1.0

Status: Technology Freeze

Last Updated: YYYY-MM-DD

---

# Purpose

This document defines the official technology stack for TransitOps.

Every developer and AI agent must use only the technologies specified in this document unless an approved architecture revision is made.

The objective is to maintain consistency, simplify maintenance, reduce merge conflicts, and ensure that every module integrates seamlessly.

---

# Technology Selection Principles

The selected stack prioritizes:

- Local-first development
- Minimal third-party dependencies
- Long-term maintainability
- Enterprise scalability
- Open-source technologies
- Cross-platform compatibility
- AI-assisted development

---

# High-Level Architecture

```
Frontend (Next.js)

        │

REST API

        │

Backend (Node.js)

        │

──────────────────────────────────

PostgreSQL

Neo4j

File Storage

Analytics Engine

Voice Engine

──────────────────────────────────

```

---

# Frontend

Framework

- Next.js

Language

- TypeScript

UI Framework

- React

Styling

- Tailwind CSS

Component Library

- shadcn/ui

Icons

- Lucide React

Charts

- Recharts

Tables

- TanStack Table

Forms

- React Hook Form

Validation

- Zod

State Management

- Zustand

HTTP Client

- Native Fetch API

Date Handling

- date-fns

Notifications

- Sonner

Theme Management

- next-themes

---

# Backend

Runtime

- Node.js (LTS)

Framework

- Express.js

Language

- TypeScript

Validation

- Zod

Authentication

- JWT

Password Hashing

- bcrypt

API Documentation

- Swagger (OpenAPI)

Environment Variables

- dotenv

Logging

- Winston

Request Logging

- Morgan

File Uploads

- Multer

Scheduling

- node-cron

UUID Generation

- uuid

---

# Database

Primary Database

- PostgreSQL

Analytics Database

- Neo4j

ORM

- None

Database Driver

- pg

Neo4j Driver

- neo4j-driver

Migration Strategy

- SQL Migration Files

Seed Strategy

- SQL Seed Scripts

---

# Analytics Engine

Language

- Python

Framework

- FastAPI

Graph Analytics

- Neo4j

Data Processing

- Pandas

Numerical Computing

- NumPy

Machine Learning

- Scikit-learn

Natural Language Processing

- spaCy

Embedding Models

- Sentence Transformers (Local)

Vector Search

- FAISS (Local)

Graph Queries

- Cypher

---

# Voice Assistant

Speech-to-Text

- Whisper.cpp (Local)

Text-to-Speech

- Piper TTS (Local)

Language Detection

- fastText

Audio Processing

- FFmpeg

Wake Word (Future)

- OpenWakeWord

All voice processing should operate locally without requiring cloud APIs.

---

# Authentication

Method

- JWT

Access Token

- Short-lived

Refresh Token

- Long-lived

Password Hashing

- bcrypt

Role-Based Access Control

- Custom RBAC

Session Storage

- PostgreSQL

---

# File Storage

Development

- Local File System

Production (Future)

- Configurable Object Storage

Supported Files

- Images
- PDF
- CSV
- Excel

---

# Reporting

PDF Generation

- pdf-lib

Excel Generation

- ExcelJS

CSV Export

- Native CSV

---

# Maps & Routing

MVP

- Internal Route Database

Future

- OpenStreetMap

The MVP should avoid dependence on commercial mapping APIs.

---

# Carbon Emission Calculation

Implementation

- Internal calculation engine

Data Source

- Configurable emission factors

No third-party API dependency.

---

# Development Tools

Package Manager

- npm

Version Control

- Git

Repository Hosting

- GitHub

Code Formatter

- Prettier

Linter

- ESLint

Commit Standard

- Conventional Commits

---

# Testing

Backend

- Jest

Frontend

- React Testing Library

API

- Supertest

End-to-End

- Playwright

Performance

- k6 (Future)

---

# Documentation

Markdown

Architecture Diagrams

- Mermaid

API Documentation

- Swagger/OpenAPI

Database Diagrams

- Mermaid ER Diagrams

---

# Local Development Requirements

Every developer should be able to run the platform using only local resources.

Required software:

- Node.js (LTS)
- npm
- PostgreSQL
- Neo4j Desktop or Neo4j Community Edition
- Python 3.11+
- Git
- FFmpeg
- Docker Desktop (Optional)

No cloud-hosted database is required for development.

---

# Repository Structure

The repository contains four implementation areas:

- frontend/
- backend/
- analytics/
- database/

Each area is owned by a dedicated development branch.

---

# Technology Constraints

The following technologies are intentionally prohibited unless explicitly approved.

Databases

- Supabase
- Firebase
- MongoDB Atlas
- NeonDB

Backend Frameworks

- NestJS
- Django
- Laravel

Frontend Frameworks

- Angular
- Vue

Cloud AI APIs

- OpenAI API
- Google Gemini API
- Anthropic API

Cloud Speech APIs

- Google Speech-to-Text
- Azure Speech
- AWS Polly

Cloud Databases

- Amazon RDS
- Firebase Firestore

The objective is to maximize offline capability and local execution.

---

# Version Policy

Major dependency upgrades must be evaluated before adoption.

Avoid introducing unstable or experimental packages unless there is a clear architectural justification.

---

# Technology Freeze

The following are considered frozen for the MVP.

- Frontend framework
- Backend framework
- Database technologies
- Analytics technologies
- Voice technologies
- Authentication strategy
- API style
- Repository structure
- Programming languages

Any change requires an architecture review and documentation update.

---

# Future Considerations

The architecture should support future integration with:

- GPS devices
- OBD-II sensors
- IoT hardware
- ERP systems
- Mobile applications
- Cloud deployment
- Distributed processing
- Real-time streaming

These enhancements should be possible without replacing the core technology stack.

---

End of Document