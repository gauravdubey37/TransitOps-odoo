# TransitOps Driver API

Version: 1.0

Status: API Specification Freeze

Last Updated: YYYY-MM-DD

---

# Purpose

This document defines all Driver-related APIs used by TransitOps.

The Driver Module is responsible for the complete lifecycle of a driver, including:

- Driver Management
- Profile Management
- License Management
- Insurance
- Experience Tracking
- Fatigue Monitoring
- Salary
- Challans
- Trip Assignment
- Driver Dashboard
- Driver Statistics

This document is the single source of truth for all driver APIs.

---

# Base URL

```
/api/v1/drivers
```

---

# Driver Resource

A Driver consists of:

- Personal Information
- Employment Information
- License
- Insurance
- Experience
- Salary
- Fatigue Information
- Challans
- Assigned Trips
- Statistics

---

# Driver Lifecycle

```
Create Driver

↓

Upload Documents

↓

Assign Region

↓

Available

↓

Assigned

↓

Driving

↓

Resting

↓

Inactive
```

---

# Driver Status

Allowed values

```
AVAILABLE

ASSIGNED

DRIVING

RESTING

ON_LEAVE

INACTIVE
```

---

# Endpoints

---

# Create Driver

## Endpoint

```
POST /drivers
```

Authentication

JWT Required

Roles

- Administrator
- Fleet Manager

---

### Request

```json
{
  "firstName": "",
  "lastName": "",
  "phone": "",
  "email": "",
  "joiningDate": "",
  "salary": 45000,
  "licenseType": "HMV",
  "regionId": "",
  "depotId": ""
}
```

---

### Success

```
201 Created
```

---

### Business Rules

- Employee code generated automatically
- Driver starts as AVAILABLE
- Fatigue tracker initialized
- Experience initialized

---

# List Drivers

## Endpoint

```
GET /drivers
```

Supports

- Pagination
- Filtering
- Sorting
- Search

---

### Filters

```
status

region

licenseType

vehicleClass

experience

availability
```

---

### Example

```
GET /drivers?status=AVAILABLE&page=1&pageSize=20
```

---

# Get Driver

## Endpoint

```
GET /drivers/{driverId}
```

Returns complete profile.

---

# Update Driver

## Endpoint

```
PATCH /drivers/{driverId}
```

Editable fields

- Phone
- Address
- Region
- Salary
- Status

Employee Code cannot be modified.

---

# Delete Driver

## Endpoint

```
DELETE /drivers/{driverId}
```

Soft delete only.

Historical records remain.

---

# Driver Dashboard

## Endpoint

```
GET /drivers/{driverId}/dashboard
```

Returns

- Current Trip
- Today's Hours
- Fuel Entries
- Expense Entries
- Pending Notifications
- Fatigue Status
- Assigned Vehicle

---

# Driver Statistics

## Endpoint

```
GET /drivers/{driverId}/statistics
```

Returns

```text
Completed Trips

Total Distance

Total Hours

Average Trip Duration

Average Fuel Efficiency

Average Carbon

Total Expenses

Total Challans
```

---

# Driver Experience

## Endpoint

```
GET /drivers/{driverId}/experience
```

Returns

- Vehicle Experience
- Route Experience
- Region Experience
- Completed Trips
- Operating Hours

---

# Driver Availability

## Endpoint

```
GET /drivers/available
```

Optional filters

```
vehicleClass

region

route
```

Returns only eligible drivers.

---

# Driver License APIs

---

## Get License

```
GET /drivers/{driverId}/license
```

---

## Upload License

```
POST /drivers/{driverId}/license
```

Content-Type

```
multipart/form-data
```

---

## Renew License

```
PATCH /drivers/{driverId}/license
```

Updates

- Expiry
- License Type
- Document

---

## License Validation

Automatically checks

- Expiry
- License Class
- Trip Compatibility

---

# Driver Insurance APIs

---

## Get Insurance

```
GET /drivers/{driverId}/insurance
```

---

## Upload Insurance

```
POST /drivers/{driverId}/insurance
```

---

## Renew Insurance

```
PATCH /drivers/{driverId}/insurance
```

---

# Driver Salary

## Endpoint

```
GET /drivers/{driverId}/salary
```

Returns

- Monthly Salary
- Cost per Hour
- Cost per Trip
- Cost per Kilometer

---

## Update Salary

```
PATCH /drivers/{driverId}/salary
```

Previous salary records should be archived.

---

# Driver Fatigue APIs

---

## Current Fatigue

```
GET /drivers/{driverId}/fatigue
```

Returns

- Continuous Hours
- Overtime Hours
- Remaining Safe Hours
- Fatigue Level
- Mandatory Rest Time

---

## Reset Fatigue

```
POST /drivers/{driverId}/fatigue/reset
```

Only after mandatory rest.

---

# Challan APIs

---

## List Challans

```
GET /drivers/{driverId}/challans
```

---

## Add Challan

```
POST /drivers/{driverId}/challans
```

---

## Update Payment

```
PATCH /drivers/{driverId}/challans/{challanId}
```

Payment Status

```
Pending

Paid

Disputed
```

---

# Driver Assignment

---

## Assign Driver

```
POST /drivers/{driverId}/assign
```

Request

```json
{
    "tripId":""
}
```

Validation

- Available
- Correct License
- Not Fatigued
- Insurance Valid

---

## Remove Assignment

```
POST /drivers/{driverId}/unassign
```

---

# Driver Trips

---

## Active Trip

```
GET /drivers/{driverId}/trip
```

---

## Trip History

```
GET /drivers/{driverId}/trips
```

Supports

- Pagination
- Date Filters

---

# Driver Notifications

```
GET /drivers/{driverId}/notifications
```

---

```
PATCH /drivers/{driverId}/notifications/{notificationId}
```

Mark as Read.

---

# Driver Documents

```
GET /drivers/{driverId}/documents
```

Returns

- License
- Insurance
- Identity Documents

---

```
POST /drivers/{driverId}/documents
```

Upload additional documents.

---

# Driver Voice APIs

Future Support

```
POST /drivers/{driverId}/voice-command
```

```
POST /drivers/{driverId}/speech
```

Used by Driver Dashboard.

---

# Driver KPIs

Calculated

- Total Trips
- Total Hours
- Average Hours
- Route Experience
- Vehicle Experience
- Driver Efficiency
- Carbon Efficiency
- Fuel Efficiency

---

# Validation Rules

A driver cannot:

- Drive without license
- Drive with expired insurance
- Drive while fatigued
- Drive multiple active trips
- Drive incompatible vehicle

---

# Error Codes

| Code | Description |
|------|-------------|
| DRV_001 | Driver Not Found |
| DRV_002 | Driver Unavailable |
| DRV_003 | Invalid License |
| DRV_004 | Insurance Expired |
| DRV_005 | Driver Fatigued |
| DRV_006 | Already Assigned |
| DRV_007 | Invalid Salary |
| DRV_008 | Challan Not Found |

---

# Permissions

| Endpoint | Admin | Fleet | Dispatcher | Driver | Analyst |
|----------|:-----:|:------:|:-----------:|:------:|:--------:|
| Create Driver | ✅ | ✅ | ❌ | ❌ | ❌ |
| Update Driver | ✅ | ✅ | ❌ | ❌ | ❌ |
| Delete Driver | ✅ | ❌ | ❌ | ❌ | ❌ |
| Driver Statistics | ✅ | ✅ | ✅ | Self | ✅ |
| License APIs | ✅ | ✅ | ❌ | Read | ✅ |
| Insurance APIs | ✅ | ✅ | ❌ | Read | ✅ |
| Salary APIs | ✅ | ✅ | ❌ | ❌ | ❌ |
| Fatigue APIs | ✅ | ✅ | Read | Self | Read |
| Challans | ✅ | ✅ | ❌ | Self | Read |

---

# Audit Events

The following actions generate audit logs.

- Driver Created
- Driver Updated
- Driver Deleted
- License Updated
- Insurance Updated
- Salary Updated
- Challan Added
- Driver Assigned
- Driver Unassigned
- Fatigue Reset

---

# Future APIs

The Driver module is designed to support future additions including:

- Biometric Attendance
- GPS Check-In
- Face Verification
- Driver Performance Scoring
- Medical Fitness Records
- Training & Certification
- Incentive Management
- Payroll Integration
- Mobile App Synchronization

---

# Revision Policy

Changes to the Driver API require updates to:

- API_CONTRACT.md
- DRIVER_API.md
- BUSINESS_RULES.md
- USER_ROLES.md
- Database Schema
- Driver Dashboard Specification

---

# End of Document