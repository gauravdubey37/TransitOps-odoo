# TransitOps Vehicle API

Version: 1.0

Status: API Specification Freeze

Last Updated: YYYY-MM-DD

---

# Purpose

This document defines all Vehicle Management APIs for TransitOps.

The Vehicle Module is responsible for managing the complete lifecycle of every fleet vehicle, including:

- Vehicle Registration
- Vehicle Assignment
- Insurance
- PUC
- Tire Lifecycle
- Maintenance
- Carbon Emissions
- Fuel Efficiency
- Vehicle Health
- Vehicle Utilization

The Vehicle API serves as the single source of truth for all fleet operations.

---

# Base URL

```
/api/v1/vehicles
```

---

# Vehicle Lifecycle

```
Vehicle Registered

↓

Vehicle Inspection

↓

Available

↓

Assigned

↓

Trip Running

↓

Maintenance

↓

Available

↓

Retired
```

---

# Vehicle Status

```
AVAILABLE

ASSIGNED

IN_TRANSIT

UNDER_MAINTENANCE

OUT_OF_SERVICE

RETIRED
```

---

# Vehicle Class

Supported classes

```
Motorcycle

Car

SUV

Pickup

Mini Truck

Truck

Trailer

Bus

Electric Vehicle
```

---

# Vehicle Resource

A Vehicle consists of

- Registration Details
- Specifications
- Insurance
- PUC
- Tires
- Maintenance
- Fuel Efficiency
- Carbon Metrics
- Assignment History

---

# Endpoints

---

# Create Vehicle

## Endpoint

```
POST /vehicles
```

Roles

- Administrator
- Fleet Manager

---

### Request

```json
{
    "registrationNumber":"MH12AB1234",
    "vehicleClass":"Truck",
    "manufacturer":"Tata",
    "model":"Prima",
    "fuelType":"Diesel",
    "manufacturingYear":2023,
    "loadCapacity":22000
}
```

---

### Success

```
201 Created
```

---

### Validation

- Registration Number Unique
- Valid Vehicle Class
- Valid Fuel Type
- Manufacturing Year Valid

---

# List Vehicles

## Endpoint

```
GET /vehicles
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

vehicleClass

fuelType

manufacturer

region

maintenanceStatus
```

---

### Example

```
GET /vehicles?status=AVAILABLE&vehicleClass=Truck
```

---

# Vehicle Details

```
GET /vehicles/{vehicleId}
```

Returns

- Registration
- Specifications
- Insurance
- PUC
- Maintenance
- Tires
- Carbon
- Statistics

---

# Update Vehicle

```
PATCH /vehicles/{vehicleId}
```

Editable

- Status
- Region
- Fuel Type
- Load Capacity

Registration Number cannot be modified.

---

# Delete Vehicle

```
DELETE /vehicles/{vehicleId}
```

Soft Delete

Historical trips remain unchanged.

---

# Vehicle Assignment

---

## Assign Vehicle

```
POST /vehicles/{vehicleId}/assign
```

Request

```json
{
    "tripId":""
}
```

Validation

- Available
- Not under maintenance
- Insurance valid
- PUC valid

---

## Remove Assignment

```
POST /vehicles/{vehicleId}/unassign
```

---

# Vehicle Insurance

---

## Get Insurance

```
GET /vehicles/{vehicleId}/insurance
```

---

## Upload Insurance

```
POST /vehicles/{vehicleId}/insurance
```

Multipart Upload

---

## Renew Insurance

```
PATCH /vehicles/{vehicleId}/insurance
```

Updates

- Expiry
- Policy Number
- Provider
- Document

---

# Vehicle PUC

---

## Get PUC

```
GET /vehicles/{vehicleId}/puc
```

---

## Upload PUC

```
POST /vehicles/{vehicleId}/puc
```

---

## Renew PUC

```
PATCH /vehicles/{vehicleId}/puc
```

---

# Tire Management

---

## List Tires

```
GET /vehicles/{vehicleId}/tires
```

---

## Add Tire

```
POST /vehicles/{vehicleId}/tires
```

Request

```json
{
    "position":"Front Left",
    "manufacturer":"MRF",
    "expectedLifeKm":60000
}
```

---

## Replace Tire

```
PATCH /vehicles/{vehicleId}/tires/{tireId}
```

Automatically

- Archives old tire
- Creates new tire lifecycle
- Resets kilometer counter

---

## Tire Statistics

```
GET /vehicles/{vehicleId}/tires/statistics
```

Returns

- Distance Covered
- Remaining Life
- Replacement History

---

# Maintenance APIs

---

## List Maintenance

```
GET /vehicles/{vehicleId}/maintenance
```

---

## Add Maintenance

```
POST /vehicles/{vehicleId}/maintenance
```

Request

```json
{
    "serviceType":"General Service",
    "cost":18500,
    "workshop":"ABC Motors",
    "remarks":"Oil and filters changed."
}
```

---

## Update Maintenance

```
PATCH /vehicles/{vehicleId}/maintenance/{maintenanceId}
```

---

## Upcoming Maintenance

```
GET /vehicles/maintenance/upcoming
```

Returns

Vehicles requiring service.

---

# Fuel Efficiency

---

## Vehicle Mileage

```
GET /vehicles/{vehicleId}/mileage
```

Returns

- Current Mileage
- Historical Mileage
- Fuel Consumption Trend

---

# Carbon APIs

---

## Carbon Statistics

```
GET /vehicles/{vehicleId}/carbon
```

Returns

- Total Carbon
- Average Carbon
- Carbon per Kilometer
- Monthly Trend

---

# Vehicle Statistics

```
GET /vehicles/{vehicleId}/statistics
```

Returns

- Total Trips
- Total Distance
- Operating Hours
- Fuel Used
- Maintenance Cost
- Tire Replacements
- Vehicle Utilization

---

# Vehicle Utilization

```
GET /vehicles/{vehicleId}/utilization
```

Returns

- Assigned Hours
- Idle Hours
- Utilization %
- Downtime

---

# Vehicle Dashboard

```
GET /vehicles/{vehicleId}/dashboard
```

Returns

- Current Status
- Active Trip
- Insurance
- PUC
- Tires
- Maintenance
- KPIs

---

# Vehicle History

```
GET /vehicles/{vehicleId}/history
```

Returns chronological history.

Includes

- Trips
- Maintenance
- Insurance
- Tires
- Assignments

---

# Vehicle Documents

```
GET /vehicles/{vehicleId}/documents
```

Returns

- Registration
- Insurance
- PUC
- Maintenance Documents

---

```
POST /vehicles/{vehicleId}/documents
```

Upload

- Registration
- Service Bills
- PUC
- Insurance

---

# Search APIs

```
GET /vehicles/search
```

Supports

```
registrationNumber

manufacturer

model

vehicleClass
```

---

# Validation Rules

Vehicle cannot be assigned if

- Already Assigned
- Under Maintenance
- Insurance Expired
- PUC Expired
- Status Inactive

---

# Business Rules

References

```
BR-VEH-001

BR-VEH-002

BR-VEH-003

BR-VEH-004

BR-VEH-005

BR-VEH-006

BR-VEH-007

BR-VEH-008

BR-VEH-009

BR-VEH-010
```

---

# Error Codes

| Code | Description |
|------|-------------|
| VEH_001 | Vehicle Not Found |
| VEH_002 | Vehicle Already Assigned |
| VEH_003 | Vehicle Under Maintenance |
| VEH_004 | Insurance Expired |
| VEH_005 | PUC Expired |
| VEH_006 | Invalid Vehicle Class |
| VEH_007 | Registration Already Exists |
| VEH_008 | Tire Not Found |
| VEH_009 | Maintenance Record Not Found |

---

# Permissions

| Endpoint | Admin | Fleet | Dispatcher | Driver | Analyst |
|----------|:----:|:------:|:----------:|:------:|:-------:|
| Create Vehicle | ✅ | ✅ | ❌ | ❌ | ❌ |
| Update Vehicle | ✅ | ✅ | ❌ | ❌ | ❌ |
| Delete Vehicle | ✅ | ❌ | ❌ | ❌ | ❌ |
| View Vehicle | ✅ | ✅ | ✅ | Assigned | ✅ |
| Insurance APIs | ✅ | ✅ | Read | ❌ | Read |
| PUC APIs | ✅ | ✅ | Read | ❌ | Read |
| Maintenance APIs | ✅ | ✅ | Read | ❌ | Read |
| Tire APIs | ✅ | ✅ | ❌ | ❌ | Read |
| Statistics | ✅ | ✅ | Read | Assigned | Read |

---

# Audit Events

Generate audit logs for

- Vehicle Created
- Vehicle Updated
- Vehicle Deleted
- Vehicle Assigned
- Vehicle Unassigned
- Insurance Updated
- PUC Updated
- Tire Replaced
- Maintenance Added
- Maintenance Updated

---

# Future APIs

The Vehicle module supports future integration with:

- GPS Tracking
- OBD-II Diagnostics
- IoT Sensors
- Predictive Maintenance
- Live Vehicle Telemetry
- Engine Health Monitoring
- Battery Health (EV)
- Remote Diagnostics

---

# Revision Policy

Any changes to the Vehicle API require updates to:

- API_CONTRACT.md
- VEHICLE_API.md
- BUSINESS_RULES.md
- DATABASE_DESIGN.md
- POSTGRES_SCHEMA.md
- Vehicle Dashboard Specification

---

# End of Document