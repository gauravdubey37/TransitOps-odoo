# TransitOps Business Rules

Version: 1.0

Status: Business Logic Freeze

Last Updated: YYYY-MM-DD

---

# Purpose

This document defines all business rules governing the TransitOps platform.

Business rules specify how the system should behave regardless of implementation.

These rules must be enforced by the Backend and Analytics Engine.

The Frontend must never independently implement business logic.

---

# Rule Categories

The business rules are organized into the following categories:

1. User Management
2. Driver Management
3. Vehicle Management
4. Trip Management
5. Route Intelligence
6. Fuel Management
7. Expense Management
8. Maintenance
9. Analytics
10. Notifications
11. Voice Assistant
12. Security

---

# 1. User Management

## BR-USER-001

Every user must have exactly one role.

Allowed Roles

- Administrator
- Fleet Manager
- Dispatcher
- Driver
- Analyst

---

## BR-USER-002

Only Administrators can:

- Create users
- Delete users
- Modify roles
- Configure system settings

---

## BR-USER-003

Users cannot access modules outside their assigned permissions.

---

# 2. Driver Management

## BR-DRV-001

Every driver must have:

- Name
- Employee ID
- Valid Driving License
- License Type
- Driver Insurance
- Contact Information

---

## BR-DRV-002

A driver cannot be assigned to multiple active trips simultaneously.

---

## BR-DRV-003

A driver can only be assigned to vehicles compatible with their license category.

Example

Heavy vehicle license

↓

Truck

Bus

Trailer

Light motor vehicle license

↓

Car

Pickup

Mini Truck

---

## BR-DRV-004

Driver license expiry must be continuously monitored.

Expired licenses prevent trip assignment.

---

## BR-DRV-005

Driver insurance expiry must generate notifications before expiration.

---

## BR-DRV-006

Every completed trip increases:

- Completed Trip Count
- Total Distance
- Total Driving Hours

---

## BR-DRV-007

Driver experience is automatically calculated using:

- Number of completed trips
- Vehicle categories operated
- Routes driven
- Regions served
- Total operating hours

Experience cannot be manually edited.

---

## BR-DRV-008

Driver challans and fines remain permanently attached to the driver's record.

---

## BR-DRV-009

Continuous driving time must be monitored.

If continuous working hours exceed the configured fatigue threshold:

- Warning notification
- Dashboard alert
- Driver alert

If the maximum allowable duration is exceeded:

- Driver becomes unavailable for assignment
- Mandatory rest period begins

---

## BR-DRV-010

Mandatory rest duration is configurable through system settings.

---

## BR-DRV-011

Driver monthly salary must be stored.

Derived calculations include:

- Cost per hour
- Cost per kilometer
- Trip labor cost

Salary history should be preserved.

---

# 3. Vehicle Management

## BR-VEH-001

Every vehicle must contain:

- Registration Number
- Vehicle Class
- Fuel Type
- Insurance
- PUC
- Load Capacity

---

## BR-VEH-002

Vehicle registration numbers must be unique.

---

## BR-VEH-003

Insurance expiry prevents future trip assignment.

---

## BR-VEH-004

Expired PUC generates compliance alerts.

---

## BR-VEH-005

Vehicle service schedules must be tracked.

---

## BR-VEH-006

Maintenance history must never be deleted.

---

## BR-VEH-007

Every tire maintains:

- Installation Date
- Expected Lifespan
- Distance Travelled
- Replacement History

---

## BR-VEH-008

Carbon emissions are automatically calculated after trip completion.

---

## BR-VEH-009

Average mileage is continuously updated using historical fuel records.

---

## BR-VEH-010

Vehicle maintenance cost contributes to operational KPIs.

---

# 4. Trip Management

## BR-TRIP-001

A trip requires:

- Driver
- Vehicle
- Route

before starting.

---

## BR-TRIP-002

Trip states

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

Invalid state transitions are prohibited.

---

## BR-TRIP-003

Trips cannot start if:

- Driver unavailable
- Driver fatigued
- Vehicle unavailable
- Vehicle under maintenance
- Insurance expired
- PUC expired

---

## BR-TRIP-004

Every completed trip stores:

- Distance
- Duration
- Fuel Consumption
- Expenses
- Carbon Emissions
- Toll Charges

---

## BR-TRIP-005

Historical trip records are immutable.

---

# 5. Route Intelligence

## BR-ROUTE-001

Every completed trip updates route statistics.

---

## BR-ROUTE-002

Historical routes maintain:

- Average Time
- Average Cost
- Average Fuel
- Average Carbon
- Toll Charges

---

## BR-ROUTE-003

If a newly discovered route performs better than the historical average, the Analytics Engine should recommend it.

---

## BR-ROUTE-004

Recommendations must include:

- Time Saved
- Distance Saved
- Cost Saved
- Carbon Reduction

---

# 6. Fuel Management

## BR-FUEL-001

Fuel entries may originate from:

- Fleet Manager
- Driver Dashboard

---

## BR-FUEL-002

Every fuel log includes:

- Vehicle
- Driver
- Trip
- Quantity
- Cost
- Fuel Station
- Timestamp

---

## BR-FUEL-003

Mileage calculations use historical fuel records.

---

# 7. Expense Management

## BR-EXP-001

Expenses must belong to predefined categories.

Examples

- Fuel
- Food
- Toll
- Parking
- Repairs
- Accommodation
- Miscellaneous

---

## BR-EXP-002

Trip expenses remain permanently linked to the trip.

---

## BR-EXP-003

Driver allowances are tracked independently from trip expenses.

---

# 8. Maintenance

## BR-MAIN-001

Maintenance records cannot be deleted.

---

## BR-MAIN-002

Scheduled maintenance generates reminders.

---

## BR-MAIN-003

Vehicle health score depends on:

- Maintenance frequency
- Repair history
- Tire condition
- Vehicle age

---

# 9. Analytics

## BR-ANA-001

Analytics must never modify operational data.

---

## BR-ANA-002

Neo4j stores only analytical relationships.

---

## BR-ANA-003

Natural language queries must return explainable recommendations.

---

## BR-ANA-004

Recommendations should be supported by measurable KPIs whenever possible.

---

# 10. Notifications

Notifications are categorized as:

Critical

High

Medium

Low

---

Critical examples

- Driver fatigue
- License expired
- Vehicle unavailable

---

Medium examples

- Upcoming maintenance
- Insurance renewal
- Route recommendation

---

# 11. Voice Assistant

## BR-VOICE-001

Speech recognition should operate locally.

---

## BR-VOICE-002

Speech synthesis should operate locally.

---

## BR-VOICE-003

The assistant must support multilingual interaction.

---

## BR-VOICE-004

If required information is missing during trip execution, the assistant should remind the driver using text-to-speech.

---

## BR-VOICE-005

Voice commands should be logged for auditing purposes.

---

# 12. Security

Passwords must never be stored in plaintext.

---

Every critical operation must generate an audit log.

---

Role-based access control is mandatory.

---

All API requests require authentication unless explicitly marked public.

---

# Global Rules

Every module must:

- Preserve historical data
- Record timestamps
- Maintain audit logs
- Validate input
- Follow API contracts
- Follow database constraints

---

# Business Rule Priority

When multiple rules conflict, the following priority applies:

1. Security
2. Compliance
3. Driver Safety
4. Vehicle Safety
5. Data Integrity
6. Business Logic
7. User Convenience

---

# Future Rules

Future versions may include:

- Predictive maintenance policies
- AI-assisted dispatching
- Driver performance scoring
- Fuel fraud detection
- GPS geofencing
- Carbon credit accounting

These additions should extend, not replace, the existing business rules.

---

# Revision Policy

Any modification to these business rules must be documented and reviewed before implementation.

All dependent documentation should be updated accordingly.

---

End of Document