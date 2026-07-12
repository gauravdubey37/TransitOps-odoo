# TransitOps Backend AI Agent

Version: 1.0

Status: Backend Development Master Plan

Branch Owner: backend

Primary Language: TypeScript

Framework: Express.js

Database: PostgreSQL

Analytics Interface: REST

Last Updated: YYYY-MM-DD

---

# Mission

You are the Backend AI Agent responsible for designing, implementing, testing, and maintaining the entire backend of the TransitOps platform.

You own every server-side feature except Analytics Engine logic and Infrastructure setup.

You are responsible for transforming business requirements into scalable REST APIs that power the Frontend and Analytics systems.

You must strictly follow the project documentation and never invent functionality.

---

# Primary Responsibilities

You own

✓ Authentication

✓ Authorization

✓ RBAC

✓ Users

✓ Drivers

✓ Vehicles

✓ Trips

✓ Routes

✓ Fuel

✓ Expenses

✓ Maintenance

✓ Notifications

✓ Reports

✓ Dashboard APIs

✓ Analytics Integration APIs

✓ Voice APIs

✓ PostgreSQL

✓ Validation

✓ Business Logic

✓ File Upload APIs

You DO NOT own

✗ React

✗ UI

✗ Neo4j Algorithms

✗ Recommendation Logic

✗ NLP

✗ Voice Recognition

✗ Docker

✗ Deployment

---

# Folder Ownership

You own every file inside

```

backend/

```

except generated files.

---

# Backend Architecture

```

Express

↓

Controllers

↓

Services

↓

Repositories

↓

PostgreSQL

```

Business rules belong ONLY inside Services.

Repositories never contain business logic.

Controllers never access the database.

---

# Backend Principles

Always

- Keep controllers thin.
- Keep services reusable.
- Keep repositories database-only.
- Validate every request.
- Return consistent responses.
- Never duplicate business logic.
- Never expose internal database structures.

---

# Project Dependencies

Read these before implementation.

```

PROJECT_CONTEXT.md

ARCHITECTURE.md

SYSTEM_DESIGN.md

BUSINESS_RULES.md

DATABASE_DESIGN.md

POSTGRES_SCHEMA.md

API_CONTRACT.md

AUTH_API.md

DRIVER_API.md

VEHICLE_API.md

TRIP_API.md

ANALYTICS_API.md

VOICE_API.md

```

---

# Technology Stack

Runtime

```

Node.js

```

Framework

```

Express

```

Language

```

TypeScript

```

Validation

```

Zod

```

Authentication

```

JWT

bcrypt

```

Database

```

PostgreSQL

```

Database Access

```

pg

```

Documentation

```

Swagger/OpenAPI

```

Testing

```

Vitest

Supertest

```

---

# High-Level Module Map

```

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

Fuel

↓

Expenses

↓

Maintenance

↓

Notifications

↓

Reports

↓

Dashboard

↓

Analytics Integration

↓

Voice APIs

```

Each module is completely independent.

---

# Folder Structure

```

backend/

src/

config/

controllers/

services/

repositories/

routes/

middleware/

dto/

validators/

models/

utils/

types/

constants/

errors/

database/

jobs/

uploads/

tests/

```

No module may create its own folder hierarchy.

---

# Architectural Layers

Every request follows

```

Route

↓

Middleware

↓

Validation

↓

Controller

↓

Service

↓

Repository

↓

PostgreSQL

↓

Repository

↓

Service

↓

Controller

↓

Client

```

Skipping layers is prohibited.

---

# Controller Rules

Controllers should only

- Read request
- Call service
- Return response

Controllers should never

- Query PostgreSQL
- Calculate KPIs
- Perform business validation
- Contain authorization logic

Target controller length

```

<100 lines

```

---

# Service Rules

Services contain

- Business Rules
- Validation
- Calculations
- Orchestration
- Transactions

Every business rule belongs here.

---

# Repository Rules

Repositories

ONLY

- Execute SQL
- Return Models

Repositories must never

- Validate business rules
- Calculate values
- Generate responses

---

# Middleware

Backend middleware includes

Authentication

Authorization

Validation

Logging

Error Handling

Request ID

Rate Limiting (Future)

Audit Logging

---

# Error Handling

All APIs return

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "...",
    "details": {}
  }
}
```

Never expose stack traces.

---

# Success Response

```json
{
  "success": true,
  "data": {},
  "meta": {}
}
```

Use consistent responses across every endpoint.

---

# Authentication

Implement

JWT Authentication

Password Hashing

Access Tokens

Refresh Tokens

Password Reset

Change Password

Session Validation

Future

2FA

OAuth

---

# Authorization

Implement RBAC.

Roles

Administrator

Operations Manager

Dispatcher

Fleet Manager

Driver

Auditor

Each endpoint must enforce permissions.

Never rely on frontend permissions.

---

# Users Module

Responsible for

- CRUD
- Login
- Password
- Roles
- Permissions
- Profile

Expected Endpoints

```

POST /auth/login

POST /auth/logout

POST /auth/refresh

GET /users

GET /users/:id

POST /users

PATCH /users/:id

DELETE /users/:id

```

---

# Driver Module

Owns

Driver Registration

Driver Experience

Insurance

License

Salary

Working Hours

Fatigue

Documents

Trip History

Statistics

Expected APIs

```

GET /drivers

GET /drivers/:id

POST /drivers

PATCH /drivers/:id

DELETE /drivers/:id

GET /drivers/:id/trips

GET /drivers/:id/statistics

GET /drivers/:id/fatigue

```

---

# Vehicle Module

Owns

Vehicle

Insurance

PUC

Maintenance

Mileage

Carbon

Fuel

Tires

Load Capacity

Expected APIs

```

GET /vehicles

POST /vehicles

PATCH /vehicles/:id

DELETE /vehicles/:id

GET /vehicles/:id/history

GET /vehicles/:id/maintenance

GET /vehicles/:id/carbon

```

---

# Trip Module

Owns

Trip Lifecycle

Trip Assignment

Trip Completion

Route Assignment

Trip Timeline

Driver Assignment

Vehicle Assignment

Expected APIs

```

GET /trips

POST /trips

PATCH /trips/:id

DELETE /trips/:id

POST /trips/:id/start

POST /trips/:id/pause

POST /trips/:id/resume

POST /trips/:id/complete

```

---

# IMPORTANT

The remainder of this document will include (in subsequent sections):

- Driver Module (complete implementation roadmap)
- Vehicle Module (complete implementation roadmap)
- Trip Module (complete implementation roadmap)
- Fuel Module
- Expense Module
- Maintenance Module
- Dashboard APIs
- Report APIs
- Notification System
- File Upload System
- Voice APIs
- PostgreSQL Transactions
- Validation Rules
- DTO Catalogue
- Repository Catalogue
- Service Catalogue
- Testing Plan
- Micro-Commit Plan
- Complete implementation checklist
- Merge checklist
- Definition of Done

This document will ultimately serve as the complete autonomous execution manual for the Backend AI Agent.

---

# End of Part 1


# Driver Module (Complete Roadmap)

## Purpose

The Driver module manages every operational aspect related to drivers.

This is one of the most important modules in TransitOps because nearly every other module depends on driver information.

The Driver module must support

- Registration
- Availability
- Experience
- Compliance
- Working Hours
- Fatigue Monitoring
- Salary Tracking
- Insurance
- Statistics
- Document Management

---

# Driver Entity

Every driver should contain

Identity

Employment

License

Insurance

Experience

Current Status

Compliance

Performance

Statistics

---

# Driver Attributes

## Personal Information

- Driver ID
- Employee ID
- Full Name
- Date of Birth
- Phone Number
- Email
- Emergency Contact
- Address
- Joining Date

---

## Employment

Store

- Employment Status
- Salary (Monthly)
- Allowance Rate
- Employment Type
- Department
- Assigned Depot

Salary is required because operational analytics compute

- Driver Cost
- Trip Cost
- Route Cost

---

## License

Track

- License Number
- License Type
- License Issue Date
- License Expiry Date
- License Verification Status

Alerts should be generated before expiry.

---

## Insurance

Track

- Insurance Provider
- Policy Number
- Start Date
- Expiry Date
- Coverage

Dashboard must always display insurance status.

---

## Driver Experience

Track

Total Trips

Total Distance

Total Hours

Years of Experience

Route Familiarity

Region Familiarity

Vehicle Familiarity

Average Trip Rating (Future)

---

## Working Hours

Track

Today's Hours

Weekly Hours

Monthly Hours

Continuous Hours

Overtime Hours

Mandatory Rest

Remaining Safe Hours

---

# Fatigue Detection

Business Rules

Example

Continuous Driving

>6 Hours

↓

Warning

---

Continuous Driving

>8 Hours

↓

Critical

↓

Automatically unavailable for new trips

---

Required Fields

Current Continuous Hours

Last Rest Time

Current Fatigue Level

Rest Duration

Maximum Allowed Hours

---

# Driver Status

Possible values

Available

Assigned

Driving

Paused

Resting

Completed

Off Duty

Leave

Inactive

Only one status may exist at any time.

---

# Driver Statistics

Maintain

Trips Completed

Trips Cancelled

Average Distance

Average Trip Duration

Average Fuel Consumption

Average Carbon

Average Cost

Average Delay

Average Daily Hours

---

# Route Experience

Store

Route ID

Trips Completed

Distance Covered

Last Driven

Average Time

This information will later be synchronized to Neo4j.

---

# Vehicle Experience

Track

Vehicle Class

Vehicle Type

Trips

Distance

Hours

Example

Truck

128 Trips

7,800 km

---

# Challans / Violations

Track

Violation Date

Violation Type

Fine Amount

Paid Status

Remarks

Statistics

Total Challans

Total Fine

Average Fine

---

# Documents

Drivers may upload

License

Insurance

Identity Proof

Medical Certificate

Training Certificates

Future

Police Verification

---

# Driver Dashboard API

Required Endpoints

GET /drivers/:id/dashboard

GET /drivers/:id/statistics

GET /drivers/:id/fatigue

GET /drivers/:id/experience

GET /drivers/:id/compliance

---

# Driver Validation Rules

Reject

Expired License

Expired Insurance

Duplicate Employee ID

Duplicate License Number

Invalid Salary

Negative Experience

Invalid Phone

Invalid Email

---

# Driver Assignment Rules

Before assigning

Validate

License

Insurance

Availability

Working Hours

Fatigue

Vehicle Compatibility

Route Compatibility

---

# Driver Cost Calculation

Monthly Salary

↓

Daily Salary

↓

Hourly Cost

↓

Trip Cost

The Analytics Engine depends on this value.

---

# Driver Alerts

Generate alerts for

License Expiring

Insurance Expiring

Fatigue

Overtime

Missing Documents

Excessive Challans

---

# Driver Reports

Support

Driver Summary

Working Hours

Fatigue Report

Experience Report

Salary Cost Report

Compliance Report

Violation Report

---

# Driver Repository

Expected Methods

findAll()

findById()

create()

update()

delete()

findByLicense()

findByEmployeeId()

findAvailable()

findFatigued()

findExpiringLicenses()

findExpiringInsurance()

---

# Driver Service

Expected Methods

createDriver()

updateDriver()

deleteDriver()

assignTrip()

calculateFatigue()

calculateDriverCost()

validateLicense()

validateInsurance()

calculateExperience()

updateWorkingHours()

---

# Driver DTOs

Create

CreateDriverDTO

UpdateDriverDTO

DriverResponseDTO

DriverStatisticsDTO

FatigueDTO

ExperienceDTO

ComplianceDTO

---

# Testing Checklist

Unit Tests

- Driver Creation
- Fatigue Calculation
- Working Hours
- License Validation
- Insurance Validation
- Salary Calculation
- Driver Assignment

Integration Tests

- Driver CRUD
- Driver Dashboard
- Assignment Flow

---

# Expected Micro Commits

feat: create driver entity

feat: create driver dto

feat: create driver repository

feat: implement driver service

feat: implement fatigue calculation

feat: implement working hour tracking

feat: implement driver statistics

feat: implement driver dashboard api

test: add driver unit tests

docs: update driver api

---

# Acceptance Criteria

✓ Driver CRUD complete

✓ Driver dashboard functional

✓ Fatigue calculation working

✓ Working hour tracking complete

✓ Salary cost calculation implemented

✓ Insurance tracking complete

✓ License tracking complete

✓ Route experience stored

✓ Vehicle experience stored

✓ Challan tracking implemented

✓ Driver statistics available

✓ Tests passing

---

# End of Driver Module


# Vehicle Module (Complete Roadmap)

## Purpose

The Vehicle module manages the complete lifecycle of every vehicle in the fleet.

This module is responsible for registration, maintenance, compliance, utilization, fuel efficiency, carbon emissions, service scheduling, and operational readiness.

Nearly every operational workflow depends on this module.

---

# Responsibilities

The Vehicle Module owns

✓ Vehicle Registration

✓ Vehicle Assignment

✓ Vehicle Status

✓ Insurance

✓ PUC

✓ Fuel

✓ Mileage

✓ Tire Management

✓ Maintenance

✓ Carbon Emissions

✓ Vehicle Statistics

✓ Vehicle History

✓ Service Scheduling

✓ Compliance

---

# Vehicle Entity

Every vehicle consists of

Identity

↓

Specifications

↓

Compliance

↓

Maintenance

↓

Utilization

↓

Performance

↓

Statistics

---

# Vehicle Information

Store

Vehicle ID

Registration Number

VIN (Optional)

Manufacturer

Model

Variant

Manufacturing Year

Vehicle Image

Vehicle Class

Vehicle Type

Color

Assigned Depot

Current Status

---

# Vehicle Class

Supported values

Truck

Mini Truck

Trailer

Bus

Van

Car

Pickup

Container

Future vehicle classes should be configurable.

---

# Vehicle Specifications

Store

Fuel Type

Transmission

Load Capacity

Gross Vehicle Weight

Engine Capacity

Number of Tires

Average Mileage

Maximum Range

---

# Fuel Types

Diesel

Petrol

CNG

LNG

Electric

Hybrid

Hydrogen (Future)

---

# Operational Status

Possible values

Available

Assigned

In Transit

Maintenance

Service Due

Out of Service

Retired

Inactive

Only one operational state is allowed at a time.

---

# Vehicle Assignment

Track

Current Driver

Current Trip

Current Depot

Assignment Time

Expected Return

Assignment History

---

# Odometer

Store

Current Reading

Last Reading

Distance Since Service

Distance Since Tire Replacement

Total Lifetime Distance

The odometer drives maintenance scheduling.

---

# Tire Management

Each vehicle stores

Number of Tires

Current Tire Set

Manufacturer

Installation Date

Expected Lifespan

Current Distance

Replacement Due

Current Health

Each tire should be individually trackable in future versions.

---

# Tire Health

Levels

Healthy

Monitor

Replace Soon

Critical

Recommendation Engine consumes this data.

---

# Fuel Tracking

Track

Fuel Type

Average Mileage

Lifetime Mileage

Current Mileage

Fuel Cost

Fuel Efficiency

Fuel Consumption

Refuel Count

---

# Carbon Emissions

Store

Emission Factor

Fuel Consumed

Distance Covered

Carbon Generated

Carbon Per KM

Monthly Carbon

Lifetime Carbon

Analytics Engine consumes this information.

---

# Insurance

Track

Insurance Provider

Policy Number

Coverage

Issue Date

Expiry Date

Insurance Status

Reminder Generated

Alert users

30 Days

15 Days

7 Days

1 Day

Before expiry.

---

# Pollution Under Control (PUC)

Track

Certificate Number

Issue Date

Expiry Date

Status

Reminder Generated

Vehicle cannot be assigned if PUC has expired.

---

# Maintenance

Track

Maintenance Type

Service Date

Service Provider

Cost

Next Service Date

Next Service Distance

Downtime

Remarks

---

# Maintenance Types

General Service

Oil Change

Brake Service

Engine Repair

Transmission

Electrical

Suspension

Air Conditioning

Emergency Repair

Inspection

---

# Maintenance KPIs

Average Maintenance Cost

Maintenance Frequency

Downtime

Cost per Kilometer

Repair Count

Service History

---

# Vehicle Utilization

Track

Trips Completed

Hours Operated

Distance Covered

Idle Hours

Utilization Percentage

Average Daily Usage

---

# Vehicle Compliance

Vehicle is compliant only if

Insurance Valid

↓

PUC Valid

↓

Maintenance Not Overdue

↓

Tires Healthy

↓

Vehicle Active

---

# Vehicle Dashboard

Display

Vehicle Summary

↓

Insurance

↓

PUC

↓

Maintenance

↓

Fuel

↓

Carbon

↓

Trips

↓

Statistics

↓

Assignment History

---

# Vehicle Alerts

Generate

Insurance Expiring

PUC Expiring

Service Due

Tire Replacement Due

Excessive Fuel Consumption

High Carbon Emissions

Excessive Downtime

Low Mileage

---

# Vehicle Statistics

Track

Trips

Distance

Hours

Fuel

Carbon

Maintenance

Average Cost

Average Revenue

Average Utilization

---

# Vehicle Reports

Support

Vehicle Summary

Maintenance Report

Fuel Report

Carbon Report

Insurance Report

PUC Report

Utilization Report

Service Cost Report

---

# Business Rules

Vehicle cannot be assigned when

Insurance Expired

PUC Expired

Maintenance Overdue

Status != Available

Load Capacity Exceeded

Vehicle Retired

---

# Vehicle APIs

Required

GET /vehicles

GET /vehicles/:id

POST /vehicles

PATCH /vehicles/:id

DELETE /vehicles/:id

GET /vehicles/:id/dashboard

GET /vehicles/:id/history

GET /vehicles/:id/fuel

GET /vehicles/:id/carbon

GET /vehicles/:id/maintenance

GET /vehicles/:id/utilization

GET /vehicles/:id/compliance

---

# Vehicle Repository

Expected Methods

findAll()

findById()

create()

update()

delete()

findAvailable()

findAssigned()

findMaintenanceDue()

findInsuranceExpiry()

findPUCExpiry()

findByRegistration()

findByDepot()

findByVehicleClass()

---

# Vehicle Service

Expected Methods

createVehicle()

updateVehicle()

deleteVehicle()

assignVehicle()

calculateMileage()

calculateCarbon()

calculateMaintenanceCost()

validateInsurance()

validatePUC()

scheduleMaintenance()

calculateUtilization()

---

# DTOs

Create

CreateVehicleDTO

UpdateVehicleDTO

VehicleDashboardDTO

MaintenanceDTO

FuelDTO

CarbonDTO

ComplianceDTO

UtilizationDTO

---

# Validation Rules

Reject

Duplicate Registration Number

Duplicate VIN

Invalid Fuel Type

Negative Mileage

Negative Capacity

Expired Insurance

Expired PUC

Invalid Maintenance Schedule

---

# File Uploads

Support

Vehicle Image

Insurance PDF

PUC Certificate

Registration Certificate

Service Invoice

Maintenance Reports

Inspection Reports

---

# Integration Points

Consumed By

Trip Module

Driver Module

Analytics Engine

Recommendation Engine

Carbon Engine

Dashboard

Voice Module

---

# Testing Checklist

Unit Tests

Vehicle Creation

Insurance Validation

PUC Validation

Mileage Calculation

Carbon Calculation

Maintenance Scheduling

Vehicle Assignment

Utilization Calculation

Integration Tests

Vehicle CRUD

Dashboard

Maintenance Flow

Fuel Flow

Carbon Flow

---

# Expected Micro Commits

feat: create vehicle entity

feat: create vehicle dto

feat: create vehicle repository

feat: implement vehicle service

feat: implement insurance validation

feat: implement puc validation

feat: implement maintenance scheduler

feat: implement carbon calculation

feat: implement utilization calculation

feat: implement vehicle dashboard api

test: add vehicle unit tests

docs: update vehicle api

---

# Acceptance Criteria

✓ Vehicle CRUD complete

✓ Insurance tracking complete

✓ PUC tracking complete

✓ Tire tracking implemented

✓ Carbon tracking implemented

✓ Fuel statistics available

✓ Maintenance scheduling complete

✓ Dashboard API complete

✓ Vehicle utilization calculated

✓ Compliance validation implemented

✓ Reports supported

✓ Tests passing

---

# End of Vehicle Module


# Trip Module (Complete Roadmap)

## Purpose

The Trip Module is the operational heart of TransitOps.

Every operational event revolves around a trip.

A trip connects

- Driver
- Vehicle
- Route
- Depot
- Fuel
- Expenses
- Carbon
- Maintenance
- Analytics

Every trip should be completely auditable from creation until archival.

---

# Responsibilities

The Trip Module owns

✓ Trip Planning

✓ Trip Assignment

✓ Trip Scheduling

✓ Driver Assignment

✓ Vehicle Assignment

✓ Route Assignment

✓ Trip Execution

✓ Trip Timeline

✓ Trip Completion

✓ Cost Tracking

✓ Fuel Tracking

✓ Carbon Tracking

✓ Delay Tracking

✓ Trip KPIs

✓ Historical Trips

---

# Trip Lifecycle

Every trip follows

```
Draft

↓

Scheduled

↓

Assigned

↓

Ready

↓

Started

↓

Paused

↓

Resumed

↓

Completed

↓

Archived
```

Trips should never skip lifecycle states.

---

# Trip Entity

Each trip contains

Trip Details

↓

Driver

↓

Vehicle

↓

Route

↓

Schedule

↓

Execution

↓

Costs

↓

Performance

↓

Analytics

---

# Trip Information

Store

Trip ID

Trip Number

Trip Name

Trip Type

Priority

Trip Status

Created By

Created Date

Last Updated

---

# Trip Types

Supported

Delivery

Pickup

Transfer

Return

Round Trip

Emergency

Maintenance

Future types should be configurable.

---

# Scheduling

Store

Planned Departure

Actual Departure

Planned Arrival

Actual Arrival

Estimated Arrival

Scheduled Duration

Actual Duration

Delay

---

# Assignment

Each trip references

Driver

Vehicle

Primary Route

Alternative Route

Depot

Dispatcher

Supervisor

---

# Route Information

Track

Origin

Destination

Intermediate Stops

Distance

Expected Time

Actual Time

Expected Toll

Actual Toll

Expected Carbon

Actual Carbon

Expected Fuel

Actual Fuel

---

# Route Optimization

Every completed trip stores

Historical Route

↓

Actual Route

↓

Alternative Routes

↓

Recommended Route

↓

Savings

This data is consumed by the Recommendation Engine.

---

# Trip Timeline

Every operational event should be logged.

Timeline events include

Trip Created

Driver Assigned

Vehicle Assigned

Started

Paused

Resumed

Fuel Added

Expense Added

Delay

Incident

Completed

Archived

Timeline is immutable.

---

# Driver Validation

Before trip start verify

Driver Exists

Driver Available

License Valid

Insurance Valid

Not Fatigued

Working Hours Available

Vehicle Compatible

Route Compatible

---

# Vehicle Validation

Before trip start verify

Vehicle Available

Insurance Valid

PUC Valid

Maintenance Current

Capacity Valid

Fuel Available

---

# Route Validation

Verify

Route Exists

Origin Exists

Destination Exists

Distance Valid

Expected Duration Valid

Route Active

---

# Trip Execution

During execution track

Current Status

Elapsed Time

Current Distance

Fuel Used

Carbon Generated

Stops

Delays

Expenses

Current Driver Status

Current Vehicle Status

---

# Fuel Tracking

Each trip stores

Fuel Entries

↓

Fuel Quantity

↓

Fuel Cost

↓

Mileage

↓

Fuel Station

↓

Receipt

Fuel logs are immutable.

---

# Expense Tracking

Supported Categories

Fuel

Food

Parking

Toll

Accommodation

Repair

Miscellaneous

Every expense stores

Amount

Date

Category

Remarks

Receipt

Approved By

---

# Cost Calculation

Trip Cost

=

Driver Cost

+

Fuel Cost

+

Maintenance Allocation

+

Toll

+

Allowances

+

Expenses

↓

Total Operational Cost

Analytics consumes this value.

---

# Carbon Calculation

Store

Fuel Used

Emission Factor

Carbon Generated

Carbon Per KM

Carbon Efficiency

---

# Delay Tracking

Track

Delay Reason

Delay Duration

Delay Category

Responsible Party

Delay Cost

Categories

Traffic

Weather

Mechanical

Driver

Loading

Customer

Unknown

---

# Driver Working Hours

Every trip updates

Today's Hours

Weekly Hours

Monthly Hours

Continuous Hours

Remaining Hours

Fatigue Status

If maximum continuous hours are exceeded

↓

Generate Fatigue Alert

↓

Require Mandatory Rest

↓

Prevent New Assignment

---

# Trip Completion

Completion requires

Driver Confirmation

Vehicle Confirmation

Final Odometer

Fuel Logs Complete

Expense Logs Complete

Timeline Complete

Carbon Calculated

Trip Summary Generated

---

# Trip Summary

Generate

Trip Duration

Distance

Fuel

Carbon

Expenses

Driver Cost

Maintenance Allocation

Average Speed

Delay

Overall Cost

---

# Trip Dashboard

Display

Trip Summary

↓

Timeline

↓

Driver

↓

Vehicle

↓

Fuel

↓

Expenses

↓

Carbon

↓

Performance

↓

Analytics

---

# Trip Alerts

Generate

Driver Fatigue

Trip Delay

Route Deviation

Fuel Pending

Expense Pending

Trip Overdue

Vehicle Issue

---

# Business Rules

Trip cannot start if

Driver unavailable

Vehicle unavailable

License expired

Insurance expired

PUC expired

Maintenance overdue

Driver fatigued

Route inactive

Trip already completed

---

# Trip APIs

Required

GET /trips

GET /trips/:id

POST /trips

PATCH /trips/:id

DELETE /trips/:id

POST /trips/:id/assign-driver

POST /trips/:id/assign-vehicle

POST /trips/:id/start

POST /trips/:id/pause

POST /trips/:id/resume

POST /trips/:id/complete

GET /trips/:id/timeline

GET /trips/:id/dashboard

GET /trips/:id/cost

GET /trips/:id/carbon

GET /trips/:id/analytics

---

# Trip Repository

Expected Methods

findAll()

findById()

create()

update()

delete()

findActive()

findCompleted()

findScheduled()

findByDriver()

findByVehicle()

findByRoute()

findByDepot()

findDelayed()

findByStatus()

---

# Trip Service

Expected Methods

createTrip()

updateTrip()

deleteTrip()

assignDriver()

assignVehicle()

startTrip()

pauseTrip()

resumeTrip()

completeTrip()

calculateTripCost()

calculateCarbon()

calculateDelay()

generateTripSummary()

validateTrip()

---

# DTOs

Create

CreateTripDTO

UpdateTripDTO

TripDashboardDTO

TripTimelineDTO

TripSummaryDTO

TripCostDTO

TripCarbonDTO

TripAnalyticsDTO

---

# Integration Points

Trip Module communicates with

Driver Module

Vehicle Module

Fuel Module

Expense Module

Route Module

Notification Module

Analytics Module

Voice Module

---

# Testing Checklist

Unit Tests

Trip Creation

Trip Assignment

Trip Start

Trip Pause

Trip Resume

Trip Completion

Trip Cost Calculation

Carbon Calculation

Delay Calculation

Fatigue Validation

Timeline Generation

Integration Tests

Trip CRUD

Assignment Flow

Trip Lifecycle

Dashboard

Analytics API

---

# Expected Micro Commits

feat: create trip entity

feat: create trip dto

feat: create trip repository

feat: implement assignment service

feat: implement trip lifecycle

feat: implement trip timeline

feat: implement cost calculation

feat: implement carbon calculation

feat: implement delay tracking

feat: implement trip dashboard api

test: add trip unit tests

docs: update trip api

---

# Acceptance Criteria

✓ Trip lifecycle complete

✓ Driver assignment complete

✓ Vehicle assignment complete

✓ Timeline implemented

✓ Cost calculation implemented

✓ Carbon tracking implemented

✓ Fuel integration complete

✓ Expense integration complete

✓ Fatigue validation complete

✓ Dashboard API available

✓ Analytics integration complete

✓ Tests passing

---

# End of Trip Module

# Fuel Module (Complete Roadmap)

## Purpose

The Fuel Module records every fuel transaction performed by every vehicle throughout its operational lifetime.

Fuel data is critical for

- Operational Cost
- Mileage
- Carbon Emissions
- Driver Performance
- Vehicle Performance
- Route Performance

Every fuel transaction should be immutable.

---

# Responsibilities

The Fuel Module owns

✓ Fuel Logs

✓ Refueling

✓ Mileage Calculation

✓ Fuel Cost

✓ Fuel Stations

✓ Fuel Receipts

✓ Fuel Analytics

✓ Carbon Input

---

# Fuel Entity

Every fuel record stores

Fuel Log ID

Trip ID

Vehicle ID

Driver ID

Fuel Type

Quantity

Unit Price

Total Cost

Fuel Station

Latitude (Future)

Longitude (Future)

Odometer Reading

Receipt

Created At

Created By

---

# Business Rules

Fuel cannot be logged unless

Vehicle Exists

Driver Exists

Trip Active

Fuel Quantity > 0

Fuel Cost > 0

Odometer Valid

---

# Mileage Calculation

Mileage

=

Distance Covered

/

Fuel Consumed

Store

Current Mileage

Trip Mileage

Vehicle Average Mileage

Lifetime Mileage

---

# Fuel KPIs

Average Mileage

Fuel Cost / KM

Fuel Cost / Trip

Fuel Efficiency

Fuel Consumption

Monthly Fuel Cost

---

# Fuel APIs

GET /fuel

GET /fuel/:id

POST /fuel

PATCH /fuel/:id

DELETE /fuel/:id

GET /fuel/analytics

GET /vehicles/:id/fuel

GET /drivers/:id/fuel

GET /trips/:id/fuel

---

# Repository

findAll()

findById()

create()

update()

delete()

findByTrip()

findByVehicle()

findByDriver()

findByDate()

---

# Service

createFuelLog()

calculateMileage()

calculateFuelCost()

validateFuelEntry()

generateFuelStatistics()

---

# DTOs

CreateFuelDTO

UpdateFuelDTO

FuelStatisticsDTO

MileageDTO

---

# Testing

Fuel CRUD

Mileage Calculation

Fuel Cost Calculation

Analytics

---

# Expected Micro Commits

feat: create fuel entity

feat: implement fuel repository

feat: implement mileage calculation

feat: implement fuel analytics api

test: add fuel tests

---

# Acceptance Criteria

✓ Fuel logs immutable

✓ Mileage calculated

✓ Analytics available

✓ Dashboard integration complete

---

# End of Fuel Module

---

# Expense Module (Complete Roadmap)

## Purpose

The Expense Module records every operational expense associated with trips.

These expenses contribute directly to operational cost analytics.

---

# Supported Categories

Fuel

Food

Parking

Toll

Accommodation

Repairs

Miscellaneous

Allowance

---

# Expense Entity

Expense ID

Trip ID

Driver ID

Vehicle ID

Category

Amount

Currency

Description

Receipt

Approval Status

Created At

---

# Approval Workflow

Created

↓

Pending

↓

Approved

↓

Rejected

Only approved expenses contribute to operational analytics.

---

# APIs

GET /expenses

POST /expenses

PATCH /expenses/:id

DELETE /expenses/:id

GET /expenses/analytics

GET /trips/:id/expenses

---

# Business Rules

Expense Amount > 0

Trip Exists

Driver Exists

Category Valid

Receipt Optional (Configurable)

---

# Repository

findAll()

findByTrip()

findByDriver()

findByCategory()

create()

update()

delete()

---

# Service

createExpense()

approveExpense()

rejectExpense()

calculateExpenseSummary()

---

# KPIs

Expense Per KM

Expense Per Trip

Expense Per Driver

Expense Distribution

Monthly Expenses

---

# Testing

Expense CRUD

Approval Flow

Analytics

---

# Expected Micro Commits

feat: create expense entity

feat: implement expense service

feat: implement approval workflow

feat: implement expense analytics

test: add expense tests

---

# Acceptance Criteria

✓ CRUD complete

✓ Approval flow working

✓ Analytics complete

✓ Dashboard integrated

---

# End of Expense Module

---

# Maintenance Module (Complete Roadmap)

## Purpose

The Maintenance Module manages preventive and corrective maintenance for every vehicle.

It ensures vehicles remain compliant, safe, and operational.

---

# Responsibilities

✓ Maintenance History

✓ Preventive Maintenance

✓ Emergency Repairs

✓ Service Scheduling

✓ Cost Tracking

✓ Downtime Tracking

---

# Maintenance Entity

Maintenance ID

Vehicle ID

Maintenance Type

Description

Service Center

Technician

Cost

Downtime

Odometer

Service Date

Next Service Date

Next Service KM

Invoice

---

# Maintenance Types

General Service

Oil Change

Brake Service

Engine Repair

Electrical

Transmission

Suspension

Tire Replacement

Inspection

Emergency Repair

---

# Business Rules

Cannot close maintenance unless

Vehicle Returned

Invoice Recorded

Cost Recorded

Service Date Recorded

---

# APIs

GET /maintenance

POST /maintenance

PATCH /maintenance/:id

DELETE /maintenance/:id

GET /vehicles/:id/maintenance

GET /maintenance/schedule

GET /maintenance/history

---

# Repository

findAll()

findByVehicle()

findUpcoming()

findOverdue()

create()

update()

delete()

---

# Service

scheduleMaintenance()

completeMaintenance()

calculateDowntime()

calculateMaintenanceCost()

generateMaintenanceStatistics()

---

# KPIs

Maintenance Cost

Downtime

Repair Frequency

Cost Per KM

Vehicle Reliability

Average Service Interval

---

# Alerts

Generate

Upcoming Service

Overdue Service

Vehicle Out of Service

High Maintenance Cost

Repeated Failures

---

# Testing

Maintenance CRUD

Scheduling

Alerts

Statistics

---

# Expected Micro Commits

feat: create maintenance entity

feat: implement maintenance scheduler

feat: implement maintenance service

feat: implement alerts

test: add maintenance tests

---

# Acceptance Criteria

✓ Maintenance scheduling complete

✓ Downtime tracked

✓ Costs calculated

✓ Alerts working

✓ Dashboard integration complete

✓ Analytics integration complete

---

# End of Maintenance Module


# Notification Module (Complete Roadmap)

## Purpose

The Notification Module is responsible for delivering operational alerts across the TransitOps platform.

Notifications should be generated automatically based on business events and system rules.

Notifications are informational only and never execute business actions.

---

# Responsibilities

✓ Operational Alerts

✓ Driver Alerts

✓ Vehicle Alerts

✓ Compliance Alerts

✓ Maintenance Alerts

✓ Fatigue Alerts

✓ Dashboard Notifications

✓ Voice Notifications

✓ Email Support (Future)

✓ SMS Support (Future)

---

# Notification Types

System

Operational

Warning

Critical

Reminder

Analytics

Recommendation

---

# Delivery Channels

Dashboard

Driver Application

Voice Assistant

Future

Email

SMS

WhatsApp

Push Notifications

---

# Priority Levels

Critical

High

Medium

Low

Information

Critical notifications always appear first.

---

# Notification Entity

Notification ID

Type

Priority

Title

Description

Recipient

Recipient Role

Related Entity

Entity ID

Read Status

Acknowledged

Created At

Expires At

---

# Notification Triggers

Driver

Fatigue

License Expiry

Insurance Expiry

Missing Fuel Entry

Missing Expense Entry

---

Vehicle

Insurance Expiry

PUC Expiry

Maintenance Due

Tire Replacement

Vehicle Breakdown

---

Trip

Trip Delayed

Trip Started

Trip Completed

Trip Overdue

Route Deviation

---

Analytics

Better Route Available

High Carbon

High Fuel Consumption

High Cost

Recommendation Generated

---

# APIs

GET /notifications

GET /notifications/:id

PATCH /notifications/:id/read

PATCH /notifications/read-all

DELETE /notifications/:id

---

# Service

createNotification()

markRead()

markAllRead()

deleteExpired()

publishNotification()

---

# Business Rules

Critical notifications

Cannot be automatically dismissed.

Expired notifications

Archived automatically.

---

# Testing

Notification Creation

Priority Ordering

Read Status

Voice Notification

Dashboard Integration

---

# End Notification Module

---

# Dashboard API Module

## Purpose

The Dashboard APIs aggregate operational information from multiple modules into optimized responses.

The frontend should never make dozens of requests to render a dashboard.

Dashboard endpoints should provide aggregated responses.

---

# Dashboard APIs

Executive Dashboard

GET /dashboard

Driver Dashboard

GET /drivers/:id/dashboard

Vehicle Dashboard

GET /vehicles/:id/dashboard

Trip Dashboard

GET /trips/:id/dashboard

Operations Dashboard

GET /dashboard/operations

Fleet Dashboard

GET /dashboard/fleet

---

# Dashboard Response

Summary

KPIs

Charts

Notifications

Recommendations

Recent Activity

Quick Actions

---

# Dashboard KPIs

Fleet Size

Available Drivers

Available Vehicles

Trips Today

Fuel Cost

Carbon

Maintenance Due

Active Trips

Driver Fatigue

Utilization

---

# Performance

Dashboard APIs

Target

<500ms

---

# End Dashboard APIs

---

# Reports Module

## Purpose

Generate printable and exportable operational reports.

Reports should always be reproducible.

---

# Supported Reports

Driver Report

Vehicle Report

Trip Report

Fuel Report

Expense Report

Maintenance Report

Carbon Report

Compliance Report

Fleet Report

Operations Report

---

# Export Formats

PDF

CSV

Excel

Future

JSON

---

# Report APIs

GET /reports

POST /reports/generate

GET /reports/:id

DELETE /reports/:id

---

# Report Generation

Every report should include

Metadata

Filters Used

Generated By

Generated At

Summary

Detailed Data

---

# Testing

Report Generation

Export

Filtering

Authorization

---

# End Reports Module

---

# File Upload Module

## Purpose

Provide secure document uploads.

---

# Supported Files

Driver License

Insurance

PUC

Vehicle RC

Fuel Receipts

Expense Receipts

Maintenance Invoices

Trip Documents

Images

PDFs

---

# Validation

Allowed Types

PNG

JPEG

WEBP

PDF

Maximum File Size

Configurable

Virus Scan

Future

---

# APIs

POST /uploads

DELETE /uploads/:id

GET /uploads/:id

---

# Storage

MVP

Local Storage

Future

S3 Compatible Storage

---

# End File Upload Module

---

# Voice Integration APIs

## Purpose

Provide backend endpoints consumed by the Voice Assistant.

The backend does not perform speech recognition.

It validates and executes intents.

---

# APIs

POST /voice/intent

POST /voice/confirm

GET /voice/tasks

GET /voice/status

---

# Supported Intents

Start Trip

Pause Trip

Resume Trip

Complete Trip

Add Fuel

Add Expense

Read Notifications

Working Hours

Driver Status

---

# Validation

Every voice request must pass

Authentication

Authorization

Business Rules

---

# End Voice APIs

---

# Analytics Integration APIs

## Purpose

Expose operational data to the Analytics Engine.

Analytics must never directly modify transactional records.

---

# APIs

GET /analytics/drivers

GET /analytics/vehicles

GET /analytics/trips

GET /analytics/routes

GET /analytics/fuel

GET /analytics/expenses

GET /analytics/carbon

GET /analytics/dashboard

---

# Response Rules

Read-only

Paginated

Documented

Versioned

---

# End Analytics Integration

---

# PostgreSQL Transaction Strategy

Use transactions whenever operations span multiple entities.

Examples

Trip Assignment

Assign Driver

Assign Vehicle

Update Driver Status

Update Vehicle Status

Create Timeline Event

Commit

Rollback on failure.

---

# Transaction Rules

Never partially update data.

Every transaction must be

Atomic

Consistent

Isolated

Durable

(ACID)

---

# Backend Build Order

## Phase 1

Project Setup

Configuration

Database Connection

Logging

Authentication

---

## Phase 2

Users

RBAC

Drivers

Vehicles

---

## Phase 3

Trips

Routes

Fuel

Expenses

Maintenance

---

## Phase 4

Dashboard APIs

Reports

Notifications

Uploads

---

## Phase 5

Analytics APIs

Voice APIs

Testing

Optimization

Documentation

---

# Backend Task Checklist

## Foundation

- [ ] Configure Express
- [ ] Configure TypeScript
- [ ] Configure PostgreSQL
- [ ] Configure Logging
- [ ] Configure Swagger
- [ ] Configure Environment

---

## Authentication

- [ ] JWT
- [ ] Refresh Tokens
- [ ] Login
- [ ] Logout
- [ ] Password Reset
- [ ] RBAC

---

## Drivers

- [ ] Entity
- [ ] DTOs
- [ ] Repository
- [ ] Service
- [ ] Controller
- [ ] Routes
- [ ] Dashboard API
- [ ] Statistics
- [ ] Fatigue Engine

---

## Vehicles

- [ ] Entity
- [ ] CRUD
- [ ] Maintenance
- [ ] Insurance
- [ ] PUC
- [ ] Carbon
- [ ] Dashboard

---

## Trips

- [ ] CRUD
- [ ] Assignment
- [ ] Timeline
- [ ] Lifecycle
- [ ] Completion

---

## Fuel

- [ ] CRUD
- [ ] Mileage
- [ ] Analytics

---

## Expenses

- [ ] CRUD
- [ ] Approval
- [ ] Reports

---

## Maintenance

- [ ] CRUD
- [ ] Scheduling
- [ ] Alerts

---

## Notifications

- [ ] CRUD
- [ ] Dashboard
- [ ] Voice

---

## Reports

- [ ] Export
- [ ] PDF
- [ ] CSV

---

## Voice APIs

- [ ] Intent Validation
- [ ] Task APIs

---

## Analytics

- [ ] Driver APIs
- [ ] Vehicle APIs
- [ ] Trip APIs

---

## Testing

- [ ] Unit Tests
- [ ] Integration Tests
- [ ] API Tests

---

# Definition of Done

The backend branch is complete when

✓ Every documented endpoint is implemented.

✓ Every DTO exists.

✓ Every validation rule is enforced.

✓ Authentication is complete.

✓ Authorization is complete.

✓ CRUD operations are implemented.

✓ Dashboard APIs are complete.

✓ Analytics integration is complete.

✓ Voice APIs are complete.

✓ Tests pass.

✓ Swagger documentation is complete.

✓ No TODOs remain.

---

# Merge Checklist

Before requesting a merge

- [ ] All tests pass
- [ ] Lint passes
- [ ] Build succeeds
- [ ] Documentation updated
- [ ] API contracts unchanged (or documented)
- [ ] No debug code
- [ ] No commented-out code
- [ ] Swagger updated
- [ ] DTOs validated
- [ ] Transactions verified
- [ ] Security review complete

---

# Estimated Scope

Approximate implementation effort

Controllers: ~20

Services: ~20

Repositories: ~20

DTOs: ~60

Validators: ~40

REST Endpoints: ~120

Database Tables: Refer to POSTGRES_SCHEMA.md

Expected Micro Commits: 250–350

Estimated Pull Requests: 40–60

---

# Backend Agent Success Criteria

The Backend AI Agent is successful when:

- Every backend feature described in the documentation is implemented.
- APIs remain stable and documented.
- Business rules are enforced consistently.
- The Frontend and Analytics branches can integrate without backend changes.
- All automated tests pass.
- The backend is production-ready and deployable on a local infrastructure stack.

---

# End of BACKEND_AGENT.md