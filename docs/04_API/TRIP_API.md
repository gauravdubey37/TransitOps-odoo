# TransitOps Trip API

Version: 1.0

Status: API Specification Freeze

Last Updated: YYYY-MM-DD

---

# Purpose

This document defines all APIs related to Trip Management within TransitOps.

The Trip Module is the operational core of the platform and is responsible for:

- Trip Planning
- Driver Assignment
- Vehicle Assignment
- Trip Lifecycle
- Route Selection
- Fuel Tracking
- Expense Tracking
- Driver Allowances
- Carbon Calculation
- Route Intelligence
- Historical Analytics

Every trip executed within the platform must be managed through this API.

---

# Base URL

```
/api/v1/trips
```

---

# Trip Lifecycle

```
Created

↓

Assigned

↓

Started

↓

Paused

↓

Resumed

↓

Completed

OR

Cancelled
```

Trips cannot skip lifecycle stages.

---

# Trip States

```
CREATED

ASSIGNED

IN_PROGRESS

PAUSED

COMPLETED

CANCELLED
```

---

# Trip Resource

A Trip contains:

- Driver
- Vehicle
- Route
- Source
- Destination
- Estimated Distance
- Actual Distance
- Estimated Duration
- Actual Duration
- Fuel
- Expenses
- Carbon Emissions
- Toll Charges
- Driver Allowances

---

# Endpoints

---

# Create Trip

## Endpoint

```
POST /trips
```

Roles

- Administrator
- Fleet Manager
- Dispatcher

---

### Request

```json
{
  "routeId": "",
  "driverId": "",
  "vehicleId": "",
  "plannedStartTime": "",
  "plannedDistance": 245,
  "plannedDuration": 4.5
}
```

---

### Validation

The backend validates

- Driver availability
- Vehicle availability
- Driver fatigue
- License validity
- Vehicle insurance
- Vehicle PUC

---

### Success

```
201 Created
```

---

# List Trips

```
GET /trips
```

Supports

- Pagination
- Search
- Filters
- Sorting

---

### Filters

```
status

driverId

vehicleId

routeId

regionId

date

tripType
```

---

# Trip Details

```
GET /trips/{tripId}
```

Returns

- Driver
- Vehicle
- Route
- Timeline
- Fuel
- Expenses
- Carbon
- Notifications
- Analytics Summary

---

# Update Trip

```
PATCH /trips/{tripId}
```

Allowed before trip starts.

Editable

- Route
- Driver
- Vehicle
- Planned Time

---

# Cancel Trip

```
POST /trips/{tripId}/cancel
```

Validation

Cannot cancel completed trips.

Reason is mandatory.

---

# Start Trip

```
POST /trips/{tripId}/start
```

Automatically

- Records start timestamp
- Updates driver status
- Updates vehicle status
- Starts fatigue tracking

---

# Pause Trip

```
POST /trips/{tripId}/pause
```

Requires

Reason

Examples

- Break
- Vehicle Issue
- Traffic
- Fuel Stop

---

# Resume Trip

```
POST /trips/{tripId}/resume
```

Continues

- Trip timer
- Fatigue timer

---

# Complete Trip

```
POST /trips/{tripId}/complete
```

Automatically performs

- End timestamp
- Distance calculation
- Duration calculation
- Fuel calculation
- Carbon calculation
- Driver statistics update
- Vehicle statistics update
- Route statistics update
- Analytics refresh

---

# Trip Timeline

```
GET /trips/{tripId}/timeline
```

Returns

- Start
- Stops
- Fuel Events
- Expense Events
- Pause Events
- Resume Events
- Completion

---

# Driver Assignment

```
POST /trips/{tripId}/driver
```

Assign Driver.

---

```
DELETE /trips/{tripId}/driver
```

Remove Driver.

---

# Vehicle Assignment

```
POST /trips/{tripId}/vehicle
```

Assign Vehicle.

---

```
DELETE /trips/{tripId}/vehicle
```

Remove Vehicle.

---

# Route APIs

---

## Current Route

```
GET /trips/{tripId}/route
```

---

## Change Route

```
PATCH /trips/{tripId}/route
```

Allowed before trip starts.

---

## Alternative Routes

```
GET /trips/{tripId}/alternatives
```

Returns

- Faster Route
- Lower Cost Route
- Lower Carbon Route
- Lower Toll Route

---

# Fuel APIs

---

## Fuel Entries

```
GET /trips/{tripId}/fuel
```

---

## Add Fuel Entry

```
POST /trips/{tripId}/fuel
```

Request

```json
{
  "quantity": 45,
  "cost": 4200,
  "fuelStation": "Indian Oil",
  "odometer": 240531
}
```

Automatically updates

- Fuel Efficiency
- Mileage
- Cost

---

# Expense APIs

---

## Expenses

```
GET /trips/{tripId}/expenses
```

---

## Add Expense

```
POST /trips/{tripId}/expenses
```

Request

```json
{
  "category":"Toll",
  "amount":650,
  "description":"Yamuna Expressway Toll"
}
```

---

# Driver Allowance

---

## Add Allowance

```
POST /trips/{tripId}/allowances
```

---

## View Allowances

```
GET /trips/{tripId}/allowances
```

---

# Carbon APIs

---

## Carbon Report

```
GET /trips/{tripId}/carbon
```

Returns

- Total Carbon
- Carbon per KM
- Fuel Type
- Emission Factor

---

# Trip Analytics

```
GET /trips/{tripId}/analytics
```

Returns

- Fuel Analysis
- Expense Analysis
- Route Efficiency
- Driver Performance
- Vehicle Performance
- Cost Breakdown

---

# Route Recommendation

```
GET /trips/{tripId}/recommendation
```

Returns

```text
Suggested Route

Estimated Savings

Distance Saved

Fuel Saved

Carbon Reduced

Toll Saved

Estimated Time Saved
```

Generated using Neo4j Analytics.

---

# Trip Dashboard

```
GET /trips/{tripId}/dashboard
```

Returns

- Current Status
- Driver
- Vehicle
- Progress
- Expenses
- Fuel
- Carbon
- Alerts

---

# Driver Voice Updates

Future API

```
POST /trips/{tripId}/voice
```

Used by Driver Dashboard.

Example

```
"Filled diesel worth ₹4200."

"Trip paused."

"Reached destination."
```

---

# Business Rules

The following rules apply.

```
BR-TRIP-001

BR-TRIP-002

BR-TRIP-003

BR-TRIP-004

BR-TRIP-005
```

---

# Validation Rules

Trip cannot start if

- Driver unavailable
- Driver fatigued
- Vehicle unavailable
- Vehicle under maintenance
- Insurance expired
- PUC expired

Trip cannot complete unless

- Driver assigned
- Vehicle assigned
- Start time exists

---

# Error Codes

| Code | Description |
|------|-------------|
| TRIP_001 | Trip Not Found |
| TRIP_002 | Driver Unavailable |
| TRIP_003 | Vehicle Unavailable |
| TRIP_004 | Trip Already Started |
| TRIP_005 | Trip Already Completed |
| TRIP_006 | Invalid Route |
| TRIP_007 | Fuel Entry Invalid |
| TRIP_008 | Expense Validation Failed |
| TRIP_009 | Driver Fatigued |
| TRIP_010 | Vehicle Under Maintenance |

---

# Permissions

| Endpoint | Admin | Fleet | Dispatcher | Driver | Analyst |
|----------|:----:|:------:|:----------:|:------:|:-------:|
| Create Trip | ✅ | ✅ | ✅ | ❌ | ❌ |
| Update Trip | ✅ | ✅ | ✅ | ❌ | ❌ |
| Cancel Trip | ✅ | ✅ | ✅ | ❌ | ❌ |
| Start Trip | ❌ | ❌ | ❌ | Self | ❌ |
| Pause Trip | ❌ | ❌ | ❌ | Self | ❌ |
| Resume Trip | ❌ | ❌ | ❌ | Self | ❌ |
| Complete Trip | ❌ | ❌ | ❌ | Self | ❌ |
| Fuel APIs | Read | Read | Read | Self | Read |
| Expense APIs | Read | Read | Read | Self | Read |
| Analytics | Read | Read | Read | ❌ | Full |

---

# Audit Events

Generate audit logs for

- Trip Created
- Driver Assigned
- Vehicle Assigned
- Trip Started
- Trip Paused
- Trip Resumed
- Fuel Entry Added
- Expense Added
- Route Changed
- Trip Completed
- Trip Cancelled

---

# Future APIs

The Trip module supports future integration with:

- Live GPS Tracking
- Geofencing
- Traffic Monitoring
- IoT Telemetry
- ETA Prediction
- Driver Behaviour Analysis
- Electronic Proof of Delivery
- Customer Shipment Tracking
- Route Replay
- Fleet Heat Maps

---

# Revision Policy

Changes to the Trip API require updates to:

- API_CONTRACT.md
- TRIP_API.md
- BUSINESS_RULES.md
- WORKFLOWS.md
- POSTGRES_SCHEMA.md
- Dashboard Specification

---

# End of Document