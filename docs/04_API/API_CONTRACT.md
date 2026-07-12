# TransitOps API Contract

Version: 1.0

Status: API Contract Freeze

Last Updated: YYYY-MM-DD

---

# Purpose

This document defines the global API standards for TransitOps.

Every backend endpoint, frontend integration, analytics service, and AI agent must follow this contract.

This document ensures:

- Consistent API design
- Predictable request/response formats
- Stable frontend/backend integration
- Backward compatibility
- Documentation-first development

This document applies to every REST endpoint in the project.

---

# API Philosophy

TransitOps follows the following principles.

- RESTful APIs
- Resource-oriented design
- Stateless requests
- JSON communication
- JWT authentication
- Versioned APIs
- Consistent error handling
- Documentation before implementation

---

# Base URL

Development

```
http://localhost:8080/api/v1
```

Production

```
https://<server>/api/v1
```

Versioning must always exist in the URL.

---

# API Versioning

Current version

```
v1
```

Future versions

```
/api/v2

/api/v3
```

Breaking changes require a new version.

---

# Content Type

All APIs use

```
Content-Type

application/json
```

unless uploading files.

---

# Authentication

Protected APIs require

```
Authorization

Bearer <JWT Token>
```

Unauthenticated endpoints

- Login
- Refresh Token
- Health Check

---

# Standard HTTP Methods

GET

Retrieve resources.

POST

Create resources.

PUT

Replace existing resources.

PATCH

Partially update resources.

DELETE

Soft delete resources unless otherwise specified.

---

# Standard Response Format

Every successful response must follow.

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {},
  "meta": {}
}
```

---

# Error Response Format

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Email already exists"
    }
  ]
}
```

Errors should always be structured.

---

# HTTP Status Codes

| Status | Usage |
|----------|------|
| 200 | Success |
| 201 | Created |
| 204 | No Content |
| 400 | Validation Error |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 422 | Business Rule Failed |
| 500 | Internal Server Error |

---

# Pagination

Large collections must support pagination.

Example

```
GET /drivers?page=1&pageSize=25
```

Response

```json
{
  "success": true,
  "data": [],
  "meta": {
    "page": 1,
    "pageSize": 25,
    "totalRecords": 842,
    "totalPages": 34
  }
}
```

---

# Sorting

Supported using

```
sortBy

sortOrder
```

Example

```
GET /drivers?sortBy=name&sortOrder=asc
```

---

# Filtering

Example

```
GET /vehicles?status=available

GET /drivers?region=North

GET /trips?status=completed
```

Multiple filters are supported.

---

# Searching

Example

```
GET /drivers?search=Rajesh

GET /vehicles?search=MH12
```

Search behavior should be documented for each endpoint.

---

# Field Naming

All JSON fields use

```
camelCase
```

Example

```json
{
  "driverId": "...",
  "employeeCode": "...",
  "licenseExpiry": "..."
}
```

Database naming may remain snake_case internally.

---

# Date Format

Use ISO 8601.

Example

```
2026-07-20T15:30:00Z
```

All timestamps should be stored in UTC.

---

# UUID Format

Every resource identifier is a UUID.

Example

```json
{
  "driverId": "550e8400-e29b-41d4-a716-446655440000"
}
```

---

# Validation Rules

Validation occurs at three levels.

1. Client-side
2. API validation
3. Database constraints

API validation is mandatory even if frontend validation exists.

---

# Authentication Flow

```
Login

↓

JWT Issued

↓

Authenticated Requests

↓

Token Refresh

↓

Logout
```

---

# Authorization

TransitOps uses Role-Based Access Control (RBAC).

Every protected endpoint specifies:

- Allowed roles
- Required permissions

Unauthorized access returns

```
403 Forbidden
```

---

# File Uploads

Uploads use

```
multipart/form-data
```

Supported files

- PDF
- PNG
- JPG
- WEBP

Examples

- License
- Insurance
- Receipts
- Vehicle Documents

---

# Idempotency

Safe operations

```
GET

PUT
```

should be idempotent.

POST requests should not create duplicate resources.

---

# Business Rule Errors

Business rule violations return

```
422 Unprocessable Entity
```

Examples

- Driver fatigued
- Vehicle unavailable
- License expired
- Insurance expired
- Route unavailable

---

# Rate Limiting

Future enhancement.

Example

```
100 Requests / Minute
```

Not required for MVP.

---

# Audit Logging

The following API actions generate audit logs.

- Create
- Update
- Delete
- Login
- Logout
- Assignment
- Approval

Read operations are generally not audited.

---

# API Modules

The API is divided into the following modules.

Authentication

Users

Drivers

Vehicles

Trips

Routes

Fuel

Expenses

Maintenance

Notifications

Analytics

Reports

Voice Assistant

System Settings

---

# API Documentation

Every endpoint must document.

- Purpose
- Method
- URL
- Authentication
- Permissions
- Request Body
- Query Parameters
- Response
- Error Codes
- Business Rules

---

# API Lifecycle

Requirement

↓

Specification

↓

Documentation

↓

Implementation

↓

Testing

↓

Review

↓

Merge

No API should be implemented without documentation.

---

# Naming Standards

Endpoints

```
/drivers

/vehicles

/trips
```

Avoid verbs.

Good

```
GET /drivers
```

Bad

```
GET /getDrivers
```

---

# Endpoint Structure

Resource

```
/drivers
```

Single Resource

```
/drivers/{driverId}
```

Nested Resource

```
/drivers/{driverId}/licenses
```

---

# Security

Sensitive information should never be returned.

Examples

- Password hashes
- JWT secrets
- Internal configuration
- Private file paths

---

# API Compatibility

Minor additions

Allowed

Breaking changes

Require new API version

Existing clients must continue working.

---

# Future API Support

The architecture supports future APIs.

- GPS
- IoT
- OBD-II
- ERP
- Customer Portal
- Mobile Applications
- AI Assistants
- Warehouse Management

---

# Revision Policy

Any API modification requires updates to:

- API_CONTRACT.md
- Module-specific API documentation
- Backend implementation
- Frontend integration
- Tests

---

# End of Document