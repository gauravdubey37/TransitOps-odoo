# TransitOps Frontend AI Agent

Version: 1.0

Status: Frontend Development Master Plan

Branch Owner: frontend

Primary Language: TypeScript

Framework: React

UI Library: shadcn/ui

Styling: TailwindCSS

Last Updated: YYYY-MM-DD

---

# Mission

You are the Frontend AI Agent responsible for building the complete user interface of TransitOps.

You own every visual component, page, layout, dashboard, workflow, interaction, animation, and responsive behavior.

Your objective is to transform the backend APIs into a fast, intuitive, enterprise-grade transport management application.

You do not make business decisions.

You consume backend APIs.

---

# Primary Responsibilities

You own

✓ Application Layout

✓ Authentication Screens

✓ Executive Dashboard

✓ Driver Dashboard

✓ Vehicle Dashboard

✓ Trips Module

✓ Routes Module

✓ Fuel Module

✓ Expense Module

✓ Reports

✓ Analytics UI

✓ Driver Portal (Mobile Responsive PWA)

✓ Notifications

✓ Responsive Design

✓ Charts

✓ Tables

✓ Forms

✓ Component Library

✓ Theme

✓ Navigation

✓ Voice UI Integration

---

You DO NOT own

✗ Business Logic

✗ PostgreSQL

✗ Neo4j

✗ Authentication Logic

✗ Recommendation Algorithms

✗ Voice Recognition

✗ Docker

✗ Deployment

---

# Folder Ownership

You own every file inside

frontend/

except generated assets.

---

# Documentation Dependencies

Read these before implementation.

PROJECT_CONTEXT.md

↓

ARCHITECTURE.md

↓

SYSTEM_DESIGN.md

↓

FEATURE_SPECIFICATION.md

↓

BUSINESS_RULES.md

↓

UI_SPECIFICATION.md

↓

DESIGN_SYSTEM.md

↓

COMPONENT_LIBRARY.md

↓

RESPONSIVENESS.md

↓

DASHBOARD_SPEC.md

↓

DRIVER_APP.md

↓

API_CONTRACT.md

---

# Technology Stack

React

↓

TypeScript

↓

TailwindCSS

↓

shadcn/ui

↓

React Router

↓

TanStack Query

↓

React Hook Form

↓

Zod

↓

Recharts

---

# Frontend Architecture

```
Pages

↓

Layouts

↓

Sections

↓

Components

↓

Hooks

↓

API Client

↓

Backend
```

Business logic must remain inside reusable hooks or service layers.

---

# Design Principles

The interface should be

Enterprise

↓

Minimal

↓

Fast

↓

Consistent

↓

Accessible

↓

Modular

↓

Reusable

No page should invent its own design language.

Everything follows

DESIGN_SYSTEM.md

and

COMPONENT_LIBRARY.md

---

# Folder Structure

frontend/

src/

app/

pages/

layouts/

components/

hooks/

services/

contexts/

types/

constants/

assets/

styles/

utils/

lib/

tests/

---

# Layout Hierarchy

Application

↓

Sidebar

↓

Header

↓

Breadcrumb

↓

Toolbar

↓

Workspace

↓

Cards

↓

Tables

↓

Dialogs

↓

Footer

Every page follows this hierarchy.

---

# Routing Structure

Authentication

↓

Dashboard

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

Analytics

↓

Reports

↓

Settings

↓

Driver Portal (Mobile Responsive PWA)

Routing should be centralized.

---

# Global Components

Build once.

Reuse everywhere.

Required components

Sidebar

Header

Footer

Breadcrumb

Page Header

Toolbar

Search

Notification Center

Confirmation Dialog

Loading Skeleton

Error View

Empty State

Pagination

Filter Drawer

Data Table

Charts

Cards

Forms

Modals

File Upload

Voice Button

Status Badge

Timeline

Every page must use these components.

---

# Theme

Implement

Light Mode

Dark Mode

Future

Company Themes

Never hardcode colors.

Use semantic Tailwind variables.

---

# Responsive Strategy

Desktop First

Manager Dashboard

↓

Tablet

↓

Mobile

Driver App

Executive Dashboard is optimized for desktop.

Driver App is optimized for mobile.

---

# Accessibility

Support

Keyboard Navigation

Screen Readers

Focus Management

High Contrast

ARIA Labels

Every component should be accessible.

---

# API Layer

Frontend never accesses databases.

Every request goes through

API Client

↓

Backend REST API

The API client should be centralized.

---

# State Management

Use

Local State

↓

Context

↓

TanStack Query

Avoid unnecessary global state.

---

# Error Handling

Every page should gracefully handle

Loading

↓

Empty

↓

Error

↓

Success

Never leave blank screens.

---

# Performance Targets

Initial Load

<2 seconds

Route Change

<300ms

Dashboard

<2 seconds

Table Search

<500ms

Charts

Lazy Loaded

---

# Component Philosophy

Every component should

- Have one responsibility
- Be reusable
- Be documented
- Be tested
- Be responsive

Never duplicate UI.

---

# File Naming

Components

PascalCase

Pages

PascalCase

Hooks

camelCase

Utilities

camelCase

---

# Page Development Workflow

For every page

Read Specification

↓

Create Route

↓

Create Layout

↓

Create Components

↓

Connect APIs

↓

Handle Loading

↓

Handle Errors

↓

Testing

↓

Documentation

---

# Frontend Success Criteria

The frontend branch is complete when

✓ Every page exists

✓ Every documented component exists

✓ Responsive behavior matches RESPONSIVENESS.md

✓ APIs integrated

✓ Accessibility complete

✓ Tests passing

✓ No duplicate components

✓ UI matches the design specification

---

# IMPORTANT

The remainder of this document will include (in subsequent sections):

- Complete Layout Roadmap
- Complete Component Library Checklist
- Dashboard Implementation
- Driver Module UI
- Vehicle Module UI
- Trip Module UI
- Analytics Pages
- Reports UI
- Driver Portal (Mobile Responsive PWA)
- Voice Interface
- Charts
- Forms
- Tables
- API Integration
- Testing
- Micro Commit Plan
- Merge Checklist
- Definition of Done

---

# End of Part 1


# Layout System & Shared Components (Complete Roadmap)

## Purpose

The Layout System provides the visual foundation for the entire TransitOps application.

Every page, regardless of module, must use the same layout hierarchy.

No page should define its own layout.

Consistency is mandatory.

---

# Application Layout

Every page follows the structure below.

```
Application

↓

Authentication Check

↓

Main Layout

↓

Sidebar

↓

Header

↓

Breadcrumb

↓

Page Header

↓

Toolbar

↓

Workspace

↓

Footer
```

The layout should be implemented once and reused everywhere.

---

# Main Layout Component

Responsibilities

- Sidebar positioning
- Header positioning
- Workspace spacing
- Theme Provider
- Notification Provider
- Modal Provider
- Error Boundary
- Route Outlet

Expected File

```
layouts/MainLayout.tsx
```

---

# Authentication Layout

Used for

Login

Forgot Password

Reset Password

Should not contain

Sidebar

Toolbar

Breadcrumb

---

# Driver Layout

The Driver Portal (Mobile Responsive PWA) uses a different layout.

Structure

```
Top Header

↓

Current Trip

↓

Main Content

↓

Bottom Navigation

↓

Floating Voice Button
```

Desktop layouts should never be reused for the Driver App.

---

# Sidebar

Purpose

Primary navigation.

Desktop

Permanent

Laptop

Collapsible

Tablet

Drawer

Mobile

Hidden

---

# Sidebar Sections

Dashboard

Operations

Drivers

Vehicles

Trips

Routes

Fuel

Expenses

Maintenance

Analytics

Reports

Settings

---

# Sidebar Component

Expected Features

Current Route Highlight

Collapse

Expand

Tooltips

Icons

Keyboard Navigation

Permission-aware Navigation

Future

Favorites

Pinned Modules

---

# Header

Contains

Organization

Search

Notifications

Theme Toggle

Profile

Current Time

Quick Actions

---

# Header Components

Global Search

Notification Bell

User Profile

Theme Switch

Refresh Dashboard

Settings Shortcut

---

# Breadcrumb

Every page must include breadcrumbs.

Example

Dashboard

↓

Drivers

↓

Driver Details

Never hardcode breadcrumbs.

Generate automatically from route configuration.

---

# Page Header

Contains

Page Title

Description

Action Buttons

Summary

Example

Drivers

Manage all registered fleet drivers.

---

# Toolbar

Toolbar actions

Create

Export

Import

Refresh

Filters

Bulk Actions

Search

Toolbar should be context aware.

---

# Workspace

Contains

Cards

Tables

Charts

Dialogs

Tabs

Forms

Workspace padding should remain consistent across the application.

---

# Footer

Displays

Version

Environment

Current Organization

Build Number

Future

Deployment Information

---

# Global Search

Searches

Drivers

Vehicles

Trips

Routes

Reports

Analytics

Search should support

Keyboard Shortcut

Ctrl + K

Future

---

# Notification Center

Contains

Unread

↓

Read

↓

Archived

Notifications grouped by

Critical

High

Medium

Information

Supports

Mark Read

Mark All Read

Delete

---

# Theme Provider

Supports

Light

Dark

System

Future

Company Themes

Use CSS variables.

Never hardcode colors.

---

# Dialog Provider

Reusable dialogs

Confirmation

Delete

Success

Warning

Error

Information

Every dialog should use the same implementation.

---

# Toast Notifications

Used for

Success

Warning

Error

Information

Position

Top Right

Maximum Visible

3

---

# Error Boundary

Every major layout should include

React Error Boundary

Purpose

Prevent entire application crashes.

---

# Loading Components

Required

Page Loader

Skeleton Loader

Table Skeleton

Card Skeleton

Chart Skeleton

Button Loader

Never use full-screen spinners unless loading the application shell.

---

# Empty States

Reusable empty states

No Data

No Drivers

No Vehicles

No Trips

No Reports

No Notifications

Each should include

Illustration

Title

Description

Primary Action

---

# Global Hooks

Create reusable hooks

useTheme()

useSidebar()

useBreadcrumb()

useNotification()

useSearch()

useDialog()

useLoading()

usePermissions()

---

# Route Guards

Implement

Authenticated Route

Role Protected Route

Permission Protected Route

Guest Route

---

# Permission-aware UI

Hide navigation items the user cannot access.

Never rely solely on frontend authorization.

Backend remains the source of truth.

---

# Shared Utilities

Create

Date Formatter

Currency Formatter

Distance Formatter

Time Formatter

Carbon Formatter

Status Formatter

Number Formatter

These should be reused across every page.

---

# Global Constants

Define

Route Names

Navigation Items

Theme Keys

Status Colors

Role Names

Permission Keys

Never hardcode values in components.

---

# Layout Testing

Verify

Sidebar

Header

Navigation

Responsive Behaviour

Keyboard Navigation

Dark Mode

Accessibility

---

# Expected Micro Commits

feat: create application layout

feat: create authentication layout

feat: create driver layout

feat: implement sidebar

feat: implement header

feat: implement breadcrumb

feat: implement toolbar

feat: implement footer

feat: implement notification center

feat: implement theme provider

feat: implement dialog provider

feat: implement loading components

feat: implement empty states

test: add layout tests

test: add sidebar tests

docs: update layout documentation

---

# Acceptance Criteria

✓ Main layout complete

✓ Authentication layout complete

✓ Driver layout complete

✓ Sidebar complete

✓ Header complete

✓ Breadcrumbs working

✓ Toolbar reusable

✓ Footer complete

✓ Notifications integrated

✓ Theme switching working

✓ Dialog provider reusable

✓ Loading states complete

✓ Empty states reusable

✓ Responsive layouts verified

✓ Accessibility verified

---

# Component Inventory (Foundation)

The following components must exist before any feature pages are developed.

## Navigation

- [ ] Sidebar
- [ ] SidebarItem
- [ ] Header
- [ ] Breadcrumb
- [ ] Footer
- [ ] Toolbar

---

## Feedback

- [ ] Toast
- [ ] Alert
- [ ] ConfirmationDialog
- [ ] ErrorBoundary
- [ ] SkeletonLoader
- [ ] EmptyState

---

## Inputs

- [ ] Button
- [ ] Input
- [ ] Select
- [ ] Checkbox
- [ ] Radio
- [ ] DatePicker
- [ ] FileUpload
- [ ] SearchBar

---

## Data Display

- [ ] DataTable
- [ ] Card
- [ ] KPI Card
- [ ] Badge
- [ ] Timeline
- [ ] Progress
- [ ] Tabs
- [ ] ChartContainer

These are prerequisites for all remaining frontend modules.

---

# End of Layout System


# Executive Dashboard (Complete Roadmap)

## Purpose

The Executive Dashboard is the primary landing page after authentication.

It provides management with a real-time operational overview of the entire transport network.

The dashboard must present critical business information in a single view while allowing users to drill down into detailed modules.

The dashboard should answer

- What is happening now?
- What requires immediate attention?
- Where is money being spent?
- Which vehicles require action?
- Which drivers require action?
- What recommendations has the AI generated?

---

# Dashboard Principles

The dashboard should be

Real-Time

↓

Minimal

↓

Actionable

↓

Visual

↓

Responsive

↓

Role Aware

Every widget should provide immediate business value.

---

# Layout

Desktop

```
──────────────────────────────────────────────
 Header
──────────────────────────────────────────────

 KPI Cards

 Fleet Charts     Alerts Panel

 Active Trips     Driver Status

 Vehicle Status   AI Recommendations

 Cost Analysis    Carbon Analysis

 Recent Activity

──────────────────────────────────────────────
```

---

Tablet

```
Header

↓

KPI Cards

↓

Charts

↓

Tables

↓

Recommendations
```

---

Mobile

```
Summary

↓

KPIs

↓

Alerts

↓

Trips

↓

Recommendations
```

The mobile dashboard is simplified.

---

# Dashboard Sections

The dashboard contains

Executive KPIs

Fleet Overview

Driver Overview

Vehicle Overview

Trip Overview

Operational Alerts

AI Recommendations

Carbon Summary

Cost Summary

Recent Activity

---

# KPI Cards

Top row

Fleet Size

Available Drivers

Available Vehicles

Active Trips

Fuel Cost Today

Carbon Today

Maintenance Due

Driver Fatigue Alerts

Every KPI card should display

Value

Trend

Comparison

Status Color

Last Updated

---

# Fleet Overview

Displays

Fleet Size

Vehicle Availability

Vehicle Utilization

Vehicles in Maintenance

Retired Vehicles

Vehicle Health Score

Visualization

Pie Chart

Bar Chart

Summary Cards

---

# Driver Overview

Displays

Available Drivers

Driving

Resting

Fatigued

Leave

License Expiry

Insurance Expiry

Working Hours

Visualization

Cards

Status Table

Trend Chart

---

# Vehicle Overview

Displays

Available

Assigned

Maintenance

Service Due

Insurance Due

PUC Due

Fuel Efficiency

Carbon Efficiency

Visualization

Cards

Status Table

Health Indicators

---

# Active Trips

Displays

Trip Number

Driver

Vehicle

Origin

Destination

Status

Progress

ETA

Delay

Priority

Actions

Supports

Sorting

Filtering

Pagination

Search

---

# Operations Summary

Shows

Trips Today

Completed

Delayed

Cancelled

Average Trip Time

Average Distance

Total Distance

Average Cost

---

# Cost Summary

Display

Fuel Cost

Driver Cost

Maintenance Cost

Allowance Cost

Operational Cost

Cost Per KM

Cost Per Trip

Monthly Cost Trend

Charts

Area Chart

Bar Chart

---

# Carbon Dashboard

Display

Today's Carbon

Weekly Carbon

Monthly Carbon

Carbon Per KM

Worst Performing Vehicles

Best Performing Vehicles

Reduction Opportunity

Charts

Line Chart

Bar Chart

Heatmap (Future)

---

# Maintenance Summary

Display

Vehicles Due

Overdue Services

Maintenance Cost

Average Downtime

Repair Frequency

Upcoming Services

---

# Compliance Panel

Display

Expired Licenses

Expiring Licenses

Expired Insurance

Expiring Insurance

Expired PUC

Missing Documents

Severity should be color coded.

---

# AI Recommendation Panel

Displays recommendations from Analytics Engine.

Examples

Assign Driver D-104 instead of D-021

↓

Switch Vehicle V-17

↓

Alternative Route Available

↓

Fuel Saving Opportunity

↓

Maintenance Recommended

Each recommendation should display

Confidence

Reason

Expected Benefit

Action Button

Recommendations should be explainable.

---

# Notification Panel

Display

Critical

Warnings

Information

Unread Count

Quick Actions

Mark Read

Open Module

Dismiss

---

# Recent Activity

Timeline

Driver Assigned

Trip Started

Trip Completed

Fuel Added

Expense Added

Maintenance Completed

Vehicle Returned

Newest first.

---

# Quick Actions

Buttons

Create Trip

Register Driver

Register Vehicle

Add Fuel

Add Expense

Schedule Maintenance

Generate Report

Start Voice Assistant

Actions should be permission aware.

---

# Dashboard Filters

Support

Date Range

Depot

Driver

Vehicle

Region

Trip Status

Vehicle Type

Driver Status

Saved Views (Future)

---

# Refresh Strategy

Dashboard should support

Manual Refresh

↓

Auto Refresh

Default

30 Seconds

Refresh interval should be configurable.

---

# Dashboard APIs

Consumes

GET /dashboard

GET /dashboard/operations

GET /dashboard/fleet

GET /notifications

GET /analytics/dashboard

Never call multiple endpoints if a dashboard endpoint already provides aggregated data.

---

# Dashboard Components

Create

DashboardLayout

KPICard

FleetCard

DriverCard

VehicleCard

TripSummary

CostCard

CarbonCard

RecommendationCard

NotificationPanel

ActivityTimeline

QuickActions

FilterBar

DashboardChart

DashboardTable

---

# Dashboard Charts

Required

Fleet Utilization

Trips Per Day

Fuel Trend

Carbon Trend

Maintenance Trend

Driver Utilization

Vehicle Utilization

Expense Breakdown

Cost Trend

---

# Dashboard Loading States

Every widget requires

Skeleton

↓

Data

↓

Empty

↓

Error

Widgets should load independently.

---

# Dashboard Responsiveness

Desktop

4-column KPI layout

Tablet

2-column layout

Mobile

Single column

Charts should resize automatically.

---

# Accessibility

Charts

ARIA Labels

Keyboard Navigation

High Contrast

Tooltips

Focus States

---

# Testing Checklist

Verify

Dashboard Loads

KPIs Update

Charts Render

Filters Work

Recommendations Display

Notifications Refresh

Responsive Layout

Dark Mode

Accessibility

---

# Expected Micro Commits

feat: create dashboard layout

feat: implement kpi cards

feat: implement fleet overview

feat: implement driver overview

feat: implement vehicle overview

feat: implement active trips table

feat: implement ai recommendation panel

feat: implement notification panel

feat: implement cost dashboard

feat: implement carbon dashboard

feat: implement activity timeline

feat: connect dashboard apis

test: add dashboard component tests

test: add dashboard integration tests

docs: update dashboard specification

---

# Acceptance Criteria

✓ Executive dashboard complete

✓ KPI cards functional

✓ Fleet overview complete

✓ Driver overview complete

✓ Vehicle overview complete

✓ Active trips displayed

✓ Recommendations integrated

✓ Notifications integrated

✓ Cost dashboard functional

✓ Carbon dashboard functional

✓ Charts responsive

✓ Dark mode supported

✓ Accessibility verified

✓ Tests passing

---

# Dashboard Build Order

Foundation

↓

Dashboard Layout

↓

KPI Cards

↓

Charts

↓

Tables

↓

Recommendations

↓

Notifications

↓

Timeline

↓

Filters

↓

API Integration

↓

Testing

No later module should begin until the dashboard foundation is complete.

---

# End of Executive Dashboard


# Driver Management UI & Driver Dashboard (Complete Roadmap)

## Purpose

The Driver module provides Fleet Managers and Operations Managers with a complete view of every driver while simultaneously providing drivers with their own operational dashboard.

This module consists of two separate interfaces.

Manager Portal

↓

Driver Management

Driver Portal (Mobile Responsive PWA)

↓

Driver Dashboard

Although both consume the same backend APIs, their user experience differs significantly.

---

# Responsibilities

The Frontend owns

✓ Driver List

✓ Driver Profile

✓ Driver Registration

✓ Driver Dashboard

✓ Driver Timeline

✓ Driver Statistics

✓ Working Hours

✓ Fatigue Status

✓ Salary Information

✓ Insurance Status

✓ License Status

✓ Driver Documents

✓ Driver Trip History

✓ Driver Performance

✓ Driver Mobile Dashboard

✓ Offline Synchronization UI

---

# Manager Driver Pages

Implement

Drivers List

↓

Driver Details

↓

Driver Profile

↓

Driver Statistics

↓

Trip History

↓

Documents

↓

Compliance

↓

Working Hours

↓

Cost Analysis

---

# Driver Portal (Mobile Responsive PWA) Pages

Driver Home

Current Trip

Today's Tasks

Fuel Entry

Expense Entry

Trip Timeline

Trip History

Notifications

Profile

Settings

Voice Assistant

---

# Driver List Page

Displays

Driver Photo

Employee ID

Driver Name

Current Status

Current Vehicle

Current Trip

Experience

Today's Hours

Fatigue Level

Compliance Status

Quick Actions

---


# Driver Portal Architecture

The Driver interface is **not a separate native mobile application**.

It is a mobile-first Progressive Web App (PWA) built within the same Next.js frontend.

Characteristics

✓ Same repository

✓ Same deployment

✓ Same authentication

✓ Same API client

✓ Shared component library

✓ Shared design system

✓ Mobile-first layout

✓ Offline support

✓ Installable as a PWA

The Driver Portal should be accessible through dedicated routes such as:

/driver/dashboard

/driver/trip

/driver/history

/driver/fuel

/driver/expenses

No React Native or Flutter implementation is part of the MVP.

# Driver Table Features

Support

Search

Sorting

Pagination

Column Visibility

Filters

Bulk Selection

CSV Export

Quick View

---

# Filters

Driver Status

Depot

Vehicle

Experience

License Status

Insurance Status

Fatigue

Working Hours

Availability

---

# Driver Status Indicators

Available

Driving

Resting

Paused

Assigned

Leave

Fatigued

Inactive

Each status should have

Color

Icon

Tooltip

---

# Driver Details Page

Sections

Profile

↓

Current Status

↓

Statistics

↓

Trips

↓

Compliance

↓

Working Hours

↓

Documents

↓

Timeline

---

# Driver Profile Card

Displays

Profile Image

Name

Employee ID

Phone

Email

Department

Joining Date

Assigned Depot

Current Vehicle

Current Trip

---

# Driver Statistics

Cards

Trips Completed

Distance Covered

Average Fuel

Average Carbon

Working Hours

Fatigue Score

Average Cost

Average Delay

Experience Score

---

# Driver Timeline

Chronological events

Driver Created

Trip Assigned

Trip Started

Fuel Added

Expense Added

Trip Completed

Leave Applied

Insurance Updated

License Renewed

Newest first

Timeline is read-only.

---

# Working Hours Widget

Display

Today's Hours

Weekly Hours

Monthly Hours

Remaining Safe Hours

Overtime

Mandatory Rest

Visualization

Progress Ring

Progress Bar

Gauge

---

# Fatigue Dashboard

Visualize

Current Fatigue

Continuous Driving

Remaining Hours

Mandatory Rest

Risk Level

Risk Levels

Normal

Monitor

Warning

Critical

Critical status should animate and require acknowledgement.

---

# Salary & Cost

Display

Monthly Salary

Daily Cost

Hourly Cost

Trip Cost Allocation

Allowances

Salary details should only be visible to authorized roles.

---

# Compliance Panel

Display

License

Insurance

Medical Certificate

Training

Police Verification (Future)

Status

Valid

Expiring

Expired

Missing

---

# Driver Documents

Support

License

Insurance

Identity Proof

Medical Certificate

Training Certificates

PDF Preview

Image Preview

Download

Upload

Version History (Future)

---

# Trip History

Display

Trip Number

Date

Vehicle

Distance

Duration

Fuel

Carbon

Cost

Status

Actions

Supports

Search

Filters

Sorting

Pagination

---

# Driver Performance

Charts

Trips Per Month

Distance Trend

Working Hours Trend

Fuel Efficiency

Carbon Efficiency

Delay Trend

Average Trip Duration

---

# Driver Dashboard (Manager)

Widgets

Driver Summary

Working Hours

Current Trip

Fatigue

Compliance

Recent Trips

Statistics

Timeline

Recommendations

---

# Driver Dashboard (Driver App)

Displays

Today's Trip

Current Vehicle

Working Hours

Fuel Remaining

Today's Tasks

Notifications

Voice Assistant

Quick Actions

Large touch targets.

Optimized for gloves and outdoor usage.

---

# Quick Actions

Start Trip

Pause Trip

Resume Trip

Complete Trip

Add Fuel

Add Expense

Upload Document

Request Leave

Call Dispatcher

Voice Input

---

# Offline Support

The Driver App must continue functioning with intermittent connectivity.

Support

Offline Login Session

Cached Assigned Trip

Cached Profile

Offline Fuel Entry

Offline Expense Entry

Offline Document Queue

Pending Sync Indicator

Conflict Resolution Screen

Show sync status prominently.

---

# Voice Integration

Provide an always-visible microphone button.

Supported interactions

Start Trip

Pause Trip

Resume Trip

Complete Trip

Add Fuel

Add Expense

Read Notifications

Working Hours

Remaining Tasks

The UI only records and forwards requests to the backend Voice APIs.

---

# Notifications

Display

Critical Alerts

Missing Fuel Entry

Pending Expense

Insurance Expiry

License Expiry

Trip Delay

Mandatory Rest

Unread notifications should be highlighted.

---

# API Mapping

Consumes

GET /drivers

GET /drivers/:id

GET /drivers/:id/dashboard

GET /drivers/:id/statistics

GET /drivers/:id/fatigue

GET /drivers/:id/trips

GET /drivers/:id/compliance

GET /notifications

POST /uploads

POST /voice/intent

---

# Components

Create

DriverCard

DriverProfileCard

DriverStatusBadge

FatigueGauge

WorkingHoursCard

ComplianceCard

DocumentViewer

TripHistoryTable

DriverTimeline

SalaryCard

DriverPerformanceCharts

VoiceActionButton

OfflineSyncBanner

---

# Loading States

Provide

Skeleton Cards

Skeleton Tables

Empty Timeline

Empty Trip History

Offline Placeholder

Error States

---

# Responsive Behaviour

Desktop

Three-column profile layout

Tablet

Two-column layout

Mobile

Single-column stacked layout

Driver App

Dedicated mobile-first interface

Desktop layouts must never be reused for the Driver App.

---

# Accessibility

Support

Keyboard Navigation

ARIA Labels

High Contrast

Screen Readers

Large Touch Targets

Voice Button Focus States

---

# Testing Checklist

Verify

Driver List

Driver Search

Filters

Pagination

Driver Dashboard

Fatigue Widget

Working Hours

Trip History

Offline Mode

Voice Button

Responsive Layout

Dark Mode

Accessibility

---

# Expected Micro Commits

feat: create driver list page

feat: implement driver profile

feat: implement driver statistics

feat: implement driver timeline

feat: implement compliance panel

feat: implement working hours widget

feat: implement fatigue dashboard

feat: implement salary card

feat: implement trip history table

feat: implement driver mobile dashboard

feat: implement offline sync banner

feat: integrate voice button

test: add driver ui tests

test: add offline mode tests

docs: update driver ui specification

---

# Acceptance Criteria

✓ Driver list complete

✓ Driver profile complete

✓ Driver dashboard complete

✓ Mobile driver dashboard complete

✓ Working hours displayed

✓ Fatigue visualization implemented

✓ Compliance panel complete

✓ Document viewer functional

✓ Trip history available

✓ Voice interface integrated

✓ Offline UI complete

✓ Responsive across supported devices

✓ Accessibility verified

✓ Tests passing

---

# Driver Module Build Order

Driver List

↓

Driver Details

↓

Driver Dashboard

↓

Driver App

↓

Offline Support

↓

Voice Integration

↓

API Integration

↓

Testing

The Driver module is considered complete only after both the Manager Portal and Driver Portal (Mobile Responsive PWA) experiences are implemented.

---

# End of Driver Module

# Vehicle Management UI & Fleet Dashboard (Complete Roadmap)

## Purpose

The Vehicle Module provides Fleet Managers with a complete operational view of every vehicle in the organization.

It should allow users to monitor

- Fleet Health
- Utilization
- Compliance
- Fuel Efficiency
- Carbon Emissions
- Maintenance
- Insurance
- PUC
- Tire Health

The Fleet Dashboard should answer

Which vehicles require attention today?

---

# Responsibilities

The frontend owns

✓ Vehicle List

✓ Vehicle Registration

✓ Vehicle Details

✓ Fleet Dashboard

✓ Maintenance Dashboard

✓ Insurance Dashboard

✓ PUC Dashboard

✓ Fuel Dashboard

✓ Carbon Dashboard

✓ Tire Dashboard

✓ Vehicle Timeline

✓ Vehicle Analytics

✓ Compliance View

---

# Fleet Pages

Implement

Fleet Overview

↓

Vehicle List

↓

Vehicle Details

↓

Vehicle Dashboard

↓

Maintenance

↓

Fuel

↓

Carbon

↓

Compliance

↓

History

---

# Vehicle List

Display

Vehicle Number

Registration Number

Vehicle Type

Manufacturer

Model

Assigned Driver

Current Trip

Status

Health

Fuel Efficiency

Utilization

Quick Actions

---

# Fleet Table Features

Support

Search

Pagination

Sorting

Column Visibility

Saved Filters

Bulk Selection

CSV Export

Advanced Filters

---

# Fleet Filters

Vehicle Type

Vehicle Status

Assigned Driver

Depot

Maintenance Status

Insurance Status

PUC Status

Fuel Type

Carbon Efficiency

Utilization

---

# Vehicle Status

Available

Assigned

Driving

Maintenance

Service Due

Out of Service

Inactive

Retired

Every status should have

Color

Icon

Tooltip

---

# Vehicle Details Page

Sections

Overview

↓

Specifications

↓

Driver

↓

Trips

↓

Maintenance

↓

Fuel

↓

Carbon

↓

Compliance

↓

Timeline

---

# Vehicle Summary Card

Display

Vehicle Image

Registration Number

Manufacturer

Model

Vehicle Type

Current Driver

Current Trip

Depot

Current Status

Health Score

---

# Specifications Card

Display

Fuel Type

Transmission

Engine

Load Capacity

Mileage

Manufacturing Year

Tire Count

Maximum Range

---

# Vehicle Health Widget

Display

Overall Health

↓

Insurance

↓

PUC

↓

Maintenance

↓

Tires

↓

Fuel Efficiency

↓

Carbon

Health Score

0-100

Visualized using

Gauge

Progress Ring

Status Badge

---

# Maintenance Dashboard

Display

Upcoming Services

Overdue Services

Last Service

Next Service

Downtime

Maintenance Cost

Repair Frequency

Service Timeline

Charts

Maintenance Trend

Cost Trend

Downtime Trend

---

# Insurance Widget

Display

Insurance Provider

Policy Number

Coverage

Issue Date

Expiry Date

Remaining Days

Status

Valid

Expiring

Expired

---

# PUC Widget

Display

Certificate Number

Issue Date

Expiry Date

Remaining Days

Compliance

---

# Tire Dashboard

Display

Current Tire Set

Installation Date

Distance Covered

Remaining Life

Health

Replacement Due

Future

Individual Tire Monitoring

---

# Fuel Dashboard

Display

Today's Fuel

Weekly Fuel

Monthly Fuel

Average Mileage

Fuel Cost

Fuel Efficiency

Fuel Cost Per KM

Charts

Fuel Trend

Mileage Trend

Fuel Cost Trend

---

# Carbon Dashboard

Display

Today's Carbon

Monthly Carbon

Lifetime Carbon

Carbon Per KM

Carbon Efficiency

Reduction Opportunity

Worst Trips

Best Trips

Charts

Area Chart

Line Chart

Bar Chart

---

# Vehicle Timeline

Display

Vehicle Registered

Driver Assigned

Trip Started

Fuel Added

Maintenance Completed

Insurance Renewed

PUC Updated

Trip Completed

Newest first

---

# Compliance Dashboard

Display

Insurance

PUC

Maintenance

Registration

Inspection

Overall Compliance

Every compliance item should display

Status

Expiry

Responsible Person

Action

---

# Vehicle Performance

Charts

Distance Trend

Trip Trend

Fuel Trend

Maintenance Trend

Carbon Trend

Downtime Trend

Utilization Trend

---

# Fleet Analytics

Display

Fleet Utilization

Vehicle Availability

Average Mileage

Average Carbon

Average Fuel Cost

Average Maintenance Cost

Health Distribution

Vehicle Age Distribution

---

# Quick Actions

Register Vehicle

Assign Driver

Schedule Maintenance

Renew Insurance

Update PUC

View History

Generate Report

---

# APIs

Consumes

GET /vehicles

GET /vehicles/:id

GET /vehicles/:id/dashboard

GET /vehicles/:id/history

GET /vehicles/:id/fuel

GET /vehicles/:id/carbon

GET /vehicles/:id/maintenance

GET /vehicles/:id/utilization

GET /vehicles/:id/compliance

---

# Components

Create

VehicleCard

FleetTable

VehicleSummary

VehicleHealthGauge

MaintenanceCard

FuelCard

CarbonCard

ComplianceCard

InsuranceCard

PUCCard

TireCard

VehicleTimeline

VehiclePerformanceCharts

FleetAnalyticsCards

FleetFilters

FleetToolbar

---

# Loading States

Provide

Fleet Skeleton

Vehicle Skeleton

Charts Skeleton

Maintenance Skeleton

Timeline Skeleton

Compliance Skeleton

---

# Responsive Behaviour

Desktop

Three-column dashboard

Tablet

Two-column dashboard

Mobile

Single-column layout

Fleet tables should transform into responsive cards.

---

# Accessibility

Support

Keyboard Navigation

ARIA Labels

High Contrast

Screen Readers

Color-independent Status Indicators

---

# Testing Checklist

Verify

Fleet List

Search

Filters

Vehicle Details

Dashboard

Maintenance

Fuel Charts

Carbon Charts

Timeline

Compliance

Responsive Layout

Dark Mode

Accessibility

---

# Expected Micro Commits

feat: create fleet list

feat: implement vehicle dashboard

feat: implement maintenance dashboard

feat: implement fuel dashboard

feat: implement carbon dashboard

feat: implement compliance dashboard

feat: implement vehicle timeline

feat: implement fleet analytics

feat: implement fleet filters

feat: connect vehicle apis

test: add fleet ui tests

test: add dashboard tests

docs: update vehicle ui specification

---

# Acceptance Criteria

✓ Fleet overview complete

✓ Vehicle list complete

✓ Vehicle dashboard complete

✓ Maintenance dashboard complete

✓ Fuel dashboard complete

✓ Carbon dashboard complete

✓ Compliance dashboard complete

✓ Timeline implemented

✓ Analytics integrated

✓ Responsive design verified

✓ Accessibility verified

✓ Tests passing

---

# Vehicle Module Build Order

Fleet Overview

↓

Vehicle List

↓

Vehicle Details

↓

Maintenance

↓

Fuel

↓

Carbon

↓

Compliance

↓

Analytics

↓

API Integration

↓

Testing

The Fleet module is complete only when every operational aspect of a vehicle can be monitored from a single dashboard.

---

# End of Vehicle Module



# Trip Management UI (Complete Roadmap)

## Purpose

The Trip Module is the operational center of TransitOps.

Every trip connects

Driver

↓

Vehicle

↓

Route

↓

Fuel

↓

Expenses

↓

Maintenance

↓

Analytics

↓

Reports

The Trip UI should allow Operations Managers and Dispatchers to create, monitor, modify, and complete trips with minimal effort while giving Drivers an intuitive mobile workflow.

---

# Responsibilities

The frontend owns

✓ Trip Planning

✓ Trip Scheduling

✓ Trip Assignment

✓ Live Trip Dashboard

✓ Route Details

✓ Timeline

✓ Fuel Entry UI

✓ Expense Entry UI

✓ Trip Completion

✓ Delay Management

✓ Driver Actions

✓ Dispatcher Actions

✓ AI Recommendation Panel

✓ Offline Synchronization UI

---

# Trip Pages

Implement

Trip Dashboard

↓

Trip List

↓

Trip Details

↓

Trip Planner

↓

Assignment Wizard

↓

Live Trip Monitor

↓

Trip Timeline

↓

Trip Summary

---

# Trip Dashboard

Display

Today's Trips

↓

Active Trips

↓

Completed Trips

↓

Delayed Trips

↓

Cancelled Trips

↓

Average Trip Duration

↓

Trip Cost

↓

Carbon Generated

↓

Fuel Consumption

↓

Trip Health Score

---

# Trip List

Display

Trip Number

Priority

Status

Driver

Vehicle

Origin

Destination

ETA

Distance

Cost

Carbon

Progress

Quick Actions

---

# Table Features

Support

Search

Filters

Sorting

Pagination

Column Selection

CSV Export

Saved Views

---

# Filters

Trip Status

Priority

Driver

Vehicle

Route

Depot

Date Range

Cost Range

Carbon Range

Delay

Trip Type

---

# Trip Status

Draft

Scheduled

Assigned

Ready

Started

Paused

Completed

Cancelled

Archived

Each status should display

Color

Icon

Tooltip

Progress

---

# Trip Details

Sections

Overview

↓

Assignments

↓

Timeline

↓

Fuel

↓

Expenses

↓

Analytics

↓

Carbon

↓

Documents

↓

Recommendations

---

# Trip Overview Card

Display

Trip Number

Trip Type

Priority

Status

Dispatcher

Driver

Vehicle

Origin

Destination

Planned Departure

Actual Departure

ETA

Progress

---

# Assignment Card

Display

Assigned Driver

Assigned Vehicle

Depot

Route

Alternative Route

Supervisor

Dispatch Time

Assignment Status

Support

Change Driver

Change Vehicle

Reassign Trip

---

# Route Card

Display

Origin

Destination

Intermediate Stops

Distance

Expected Duration

Expected Fuel

Expected Carbon

Expected Cost

AI Optimized Route

Future

Live GPS Route

---

# Trip Timeline

Display

Trip Created

Driver Assigned

Vehicle Assigned

Started

Paused

Resumed

Fuel Added

Expense Added

Delay Logged

Completed

Newest event first

Timeline must be immutable.

---

# Live Trip Monitor

Display

Trip Progress

↓

Current Driver

↓

Current Vehicle

↓

Elapsed Time

↓

Estimated Arrival

↓

Distance Covered

↓

Fuel Used

↓

Current Cost

↓

Current Carbon

↓

Delay

Future

Live GPS Tracking

Traffic Overlay

Weather Overlay

---

# Fuel Entry Panel

Driver can enter

Fuel Quantity

Unit Price

Fuel Station

Receipt

Remarks

Manager can

Review

Approve

Reject

---

# Expense Entry Panel

Support

Food

Fuel

Parking

Toll

Accommodation

Repair

Allowance

Miscellaneous

Each expense

Receipt

Amount

Category

Remarks

Approval Status

---

# Delay Panel

Display

Delay Duration

Reason

Category

Impact

Estimated Recovery

Categories

Traffic

Weather

Mechanical

Customer

Loading

Unknown

---

# AI Recommendation Panel

Display

Better Route

Better Driver

Better Vehicle

Fuel Saving Opportunity

Carbon Reduction Opportunity

Delay Recovery Suggestion

Maintenance Suggestion

Each recommendation should display

Confidence

Reason

Expected Savings

Accept Action

Dismiss

Explain

---

# Cost Breakdown

Display

Driver Cost

Fuel Cost

Maintenance Allocation

Allowance

Toll

Other Expenses

Total Cost

Cost Per KM

---

# Carbon Panel

Display

Current Carbon

Carbon Per KM

Expected Carbon

Actual Carbon

Reduction Opportunity

Comparison with Fleet Average

---

# Trip Completion

Checklist

Driver Confirmation

Vehicle Returned

Fuel Updated

Expenses Updated

Timeline Complete

Photos Uploaded (Future)

Summary Generated

Manager Approval (Configurable)

Completion should not occur if mandatory fields are missing.

---

# Trip Summary

Display

Distance

Duration

Driver

Vehicle

Fuel

Expenses

Carbon

Cost

Average Speed

Delay

Efficiency Score

Summary should be printable.

---

# Driver Mobile View

Large touch-friendly interface

Sections

Current Trip

↓

Navigation Summary

↓

Fuel Entry

↓

Expense Entry

↓

Notifications

↓

Voice Button

↓

Trip Completion

One-handed operation should be possible.

---

# Offline Support

Allow

Offline Fuel Entry

Offline Expense Entry

Offline Timeline Events

Offline Trip Notes

Pending Sync Queue

Conflict Resolution

Show sync status at all times.

---

# Notifications

Display

Trip Assigned

Trip Started

Delay Alert

Fuel Pending

Expense Pending

Trip Overdue

Trip Completed

Recommendation Available

---

# APIs

Consumes

GET /trips

GET /trips/:id

GET /trips/:id/dashboard

GET /trips/:id/timeline

GET /trips/:id/cost

GET /trips/:id/carbon

GET /trips/:id/analytics

POST /trips/:id/start

POST /trips/:id/pause

POST /trips/:id/resume

POST /trips/:id/complete

POST /fuel

POST /expenses

POST /voice/intent

---

# Components

Create

TripCard

TripTable

TripStatusBadge

TripOverviewCard

AssignmentCard

RouteCard

TimelineCard

TripProgressCard

FuelEntryForm

ExpenseEntryForm

DelayCard

RecommendationCard

CostBreakdownCard

CarbonCard

TripSummaryCard

CompletionChecklist

OfflineSyncBanner

---

# Loading States

Provide

Trip Skeleton

Timeline Skeleton

Fuel Skeleton

Expense Skeleton

Dashboard Skeleton

Recommendation Skeleton

---

# Responsive Behaviour

Desktop

Three-column operational dashboard

Tablet

Two-column dashboard

Mobile

Stacked cards

Driver App

Dedicated mobile interface

---

# Accessibility

Support

Keyboard Navigation

ARIA Labels

Screen Readers

High Contrast

Large Touch Targets

Visible Focus States

---

# Testing Checklist

Verify

Trip List

Trip Planner

Assignment Wizard

Timeline

Fuel Entry

Expense Entry

Trip Completion

Recommendation Panel

Offline Mode

Responsive Behaviour

Accessibility

---

# Expected Micro Commits

feat: create trip list page

feat: implement trip dashboard

feat: implement assignment card

feat: implement route card

feat: implement timeline

feat: implement fuel entry ui

feat: implement expense entry ui

feat: implement recommendation panel

feat: implement cost breakdown

feat: implement carbon panel

feat: implement trip completion workflow

feat: implement driver mobile trip view

feat: implement offline sync ui

test: add trip ui tests

test: add mobile trip tests

docs: update trip ui specification

---

# Acceptance Criteria

✓ Trip dashboard complete

✓ Trip planner complete

✓ Assignment workflow complete

✓ Timeline functional

✓ Fuel entry implemented

✓ Expense entry implemented

✓ Cost breakdown complete

✓ Carbon dashboard complete

✓ AI recommendations integrated

✓ Trip completion workflow complete

✓ Driver mobile workflow complete

✓ Offline support implemented

✓ Responsive design verified

✓ Accessibility verified

✓ Tests passing

---

# Trip Module Build Order

Trip Dashboard

↓

Trip List

↓

Trip Details

↓

Assignment Wizard

↓

Timeline

↓

Fuel Entry

↓

Expense Entry

↓

Cost & Carbon Panels

↓

AI Recommendations

↓

Trip Completion

↓

Driver Mobile UI

↓

Offline Support

↓

API Integration

↓

Testing

The Trip Module is complete only when both dispatchers and drivers can execute the full trip lifecycle entirely through the UI.

---

# End of Trip Management Module


# Analytics & AI Dashboard (Complete Roadmap)

## Purpose

The Analytics & AI Dashboard transforms operational data into actionable business intelligence.

Unlike the Executive Dashboard, which focuses on current operations, this module provides historical analysis, predictive insights, optimization opportunities, and AI-powered recommendations.

This module consumes the Analytics Engine and Neo4j services.

It never performs calculations locally.

---

# Responsibilities

The frontend owns

✓ Analytics Dashboard

✓ Fleet Analytics

✓ Driver Analytics

✓ Vehicle Analytics

✓ Route Analytics

✓ Cost Analytics

✓ Carbon Analytics

✓ AI Recommendation Center

✓ KPI Explorer

✓ Natural Language Analytics Interface

✓ Graph Relationship Explorer

✓ Trend Analysis

---

# Analytics Navigation

Implement

Analytics Home

↓

Fleet Analytics

↓

Driver Analytics

↓

Vehicle Analytics

↓

Route Analytics

↓

Fuel Analytics

↓

Carbon Analytics

↓

Cost Analytics

↓

Recommendation Center

↓

Natural Language Analytics

---

# Analytics Home

Display

Fleet KPIs

↓

Operational Efficiency

↓

Driver Efficiency

↓

Vehicle Efficiency

↓

Carbon Performance

↓

Cost Performance

↓

Recommendations

↓

Trend Analysis

↓

Alerts

---

# KPI Overview

Display

Fleet Utilization

Driver Utilization

Vehicle Utilization

Trip Success Rate

Average Trip Cost

Average Fuel Consumption

Carbon Per KM

Maintenance Cost

Downtime

Fleet Health Score

---

# Fleet Analytics

Visualize

Fleet Utilization

Vehicle Distribution

Fleet Availability

Operational Capacity

Fleet Downtime

Vehicle Age Distribution

Charts

Pie Chart

Bar Chart

Trend Line

---

# Driver Analytics

Display

Driver Performance Ranking

Driver Experience

Trip Distribution

Working Hours

Fatigue Trend

Fuel Efficiency

Safety Score (Future)

Compliance Score

Charts

Leaderboard

Trend

Heatmap

---

# Vehicle Analytics

Display

Vehicle Utilization

Maintenance Frequency

Fuel Efficiency

Carbon Efficiency

Mileage Trend

Repair Trend

Health Score

Cost Per KM

---

# Route Analytics

Display

Most Used Routes

Longest Routes

Highest Cost Routes

Most Efficient Routes

Delay Analysis

Fuel Consumption

Carbon Generation

Alternative Routes

---

# Cost Analytics

Display

Operational Cost

↓

Driver Cost

↓

Fuel Cost

↓

Maintenance Cost

↓

Allowance Cost

↓

Expense Distribution

↓

Cost Per KM

↓

Cost Per Trip

Charts

Stacked Bar

Treemap

Area Chart

---

# Carbon Analytics

Display

Fleet Carbon

Carbon Per Vehicle

Carbon Per Driver

Carbon Per Route

Monthly Trend

Emission Distribution

Reduction Opportunity

Comparison with Targets

---

# Recommendation Center

Display

Recommended Driver

Recommended Vehicle

Recommended Route

Fuel Saving Suggestions

Maintenance Suggestions

Fleet Optimization

Driver Rotation

Each recommendation should display

Confidence Score

Reason

Expected Savings

Affected Entity

Action Button

Explain Recommendation

---

# Natural Language Analytics

Purpose

Allow managers to query the system using natural language.

Examples

"Show vehicles with highest maintenance cost."

"Which drivers are close to fatigue?"

"Show routes with highest carbon emission."

"Which depot has the highest operational cost?"

The UI should display

User Query

↓

AI Interpretation

↓

Generated Filters

↓

Results

↓

Visualizations

↓

Related Recommendations

---

# Query History

Store

Recent Queries

Favorite Queries

Pinned Queries

Suggested Queries

---

# Graph Relationship Explorer

Visualize Neo4j relationships.

Examples

Driver

↓

Trips

↓

Vehicles

↓

Routes

↓

Regions

Users should

Expand Nodes

Collapse Nodes

Filter Relationships

Highlight Paths

Future

Interactive graph editing (read-only for MVP).

---

# Trend Analysis

Display

Daily

Weekly

Monthly

Quarterly

Yearly

Allow comparison across time periods.

---

# Dashboard Filters

Support

Date Range

Depot

Driver

Vehicle

Route

Vehicle Type

Trip Type

Region

Custom Filters

Saved Views

---

# AI Explainability Panel

Every recommendation must explain

Why it was generated

↓

Data Used

↓

Expected Benefit

↓

Confidence

↓

Alternative Options

The frontend must never display recommendations without explanations.

---

# Charts

Create reusable analytics charts

Line Chart

Area Chart

Bar Chart

Stacked Bar

Pie Chart

Donut Chart

Heatmap

Leaderboard

KPI Card

Comparison Card

Trend Card

---

# APIs

Consumes

GET /analytics/dashboard

GET /analytics/drivers

GET /analytics/vehicles

GET /analytics/routes

GET /analytics/fuel

GET /analytics/carbon

GET /analytics/expenses

GET /analytics/recommendations

GET /analytics/graph

POST /analytics/query

---

# Components

Create

AnalyticsLayout

AnalyticsSidebar

AnalyticsFilters

AnalyticsToolbar

KPICard

TrendCard

ComparisonCard

RecommendationCard

ExplainabilityPanel

GraphViewer

NaturalLanguageInput

QueryHistory

Leaderboard

AnalyticsChart

AnalyticsTable

---

# Loading States

Provide

Chart Skeleton

KPI Skeleton

Graph Skeleton

Recommendation Skeleton

Analytics Table Skeleton

---

# Responsive Behaviour

Desktop

Multi-panel analytics workspace

Tablet

Two-column analytics layout

Mobile

Summary cards only

Detailed analytics are desktop-first.

---

# Accessibility

Support

Keyboard Navigation

ARIA Labels

Chart Descriptions

High Contrast

Screen Reader Support

---

# Testing Checklist

Verify

Analytics Dashboard

Charts

Recommendations

Filters

Natural Language Queries

Graph Viewer

Responsive Layout

Dark Mode

Accessibility

---

# Expected Micro Commits

feat: create analytics layout

feat: implement kpi dashboard

feat: implement fleet analytics

feat: implement driver analytics

feat: implement vehicle analytics

feat: implement route analytics

feat: implement carbon dashboard

feat: implement recommendation center

feat: implement graph explorer

feat: implement natural language analytics

feat: connect analytics apis

test: add analytics ui tests

docs: update analytics ui specification

---

# Acceptance Criteria

✓ Analytics dashboard complete

✓ Fleet analytics complete

✓ Driver analytics complete

✓ Vehicle analytics complete

✓ Route analytics complete

✓ Cost analytics complete

✓ Carbon analytics complete

✓ Recommendation center functional

✓ Explainability implemented

✓ Graph explorer functional

✓ Natural language analytics integrated

✓ Responsive design verified

✓ Accessibility verified

✓ Tests passing

---

# Analytics Module Build Order

Analytics Layout

↓

KPI Dashboard

↓

Charts

↓

Recommendations

↓

Graph Explorer

↓

Natural Language Analytics

↓

API Integration

↓

Testing

The Analytics module is complete only when operational data can be explored visually, recommendations are explainable, and natural language analytics is fully integrated.

---

# End of Analytics & AI Dashboard

# Reports & Export Center (Complete Roadmap)

## Purpose

The Reports & Export Center enables management to generate operational, financial, compliance, sustainability, and performance reports.

Unlike dashboards, reports are static snapshots that can be exported, archived, shared, or audited.

The reporting system should support both predefined report templates and configurable report generation.

---

# Responsibilities

The frontend owns

✓ Reports Dashboard

✓ Report Builder

✓ Saved Reports

✓ Scheduled Reports (Future)

✓ Report Viewer

✓ Report Export

✓ Report Filters

✓ Report History

✓ Print Preview

---

# Report Categories

Operational

↓

Financial

↓

Compliance

↓

Fleet

↓

Driver

↓

Vehicle

↓

Trip

↓

Fuel

↓

Maintenance

↓

Carbon

↓

Analytics

---

# Reports Home

Display

Recently Generated Reports

↓

Favorite Reports

↓

Scheduled Reports

↓

Quick Templates

↓

Recent Downloads

↓

Storage Usage

---

# Predefined Reports

Implement

Fleet Summary

Driver Performance

Vehicle Performance

Trip Summary

Trip Cost Analysis

Fuel Consumption

Fuel Cost

Expense Report

Maintenance Report

Insurance Report

PUC Report

Carbon Report

Compliance Report

Driver Working Hours

Fatigue Report

Salary Cost Report

Route Performance

AI Recommendations Summary

Operational Efficiency

Executive Summary

---

# Report Builder

Allow users to build reports using configurable filters.

Workflow

Select Template

↓

Select Date Range

↓

Select Filters

↓

Preview

↓

Generate

↓

Export

---

# Available Filters

Date Range

Depot

Driver

Vehicle

Trip

Route

Trip Status

Vehicle Type

Fuel Type

Region

Expense Category

Maintenance Type

Carbon Threshold

Custom Filters

---

# Report Preview

Display

Summary Cards

↓

Charts

↓

Tables

↓

KPIs

↓

Recommendations

↓

Metadata

Preview should match exported output as closely as possible.

---

# Report Viewer

Support

Pagination

Zoom

Search

Bookmarks (Future)

Print

Download

Fullscreen

---

# Export Formats

Support

PDF

CSV

Excel (.xlsx)

Future

JSON

OpenDocument

---

# Print Layout

Printable reports should include

Company Logo

Report Title

Generated By

Generated On

Applied Filters

Summary

Charts

Tables

Footer

Page Numbers

---

# Saved Reports

Users can

Save Report Configuration

Rename

Duplicate

Delete

Mark Favorite

Future

Share with Team

---

# Report History

Display

Report Name

Generated By

Generation Date

Status

Format

Download

Delete

Regenerate

---

# Executive Report

The Executive Summary should include

Fleet KPIs

↓

Trip KPIs

↓

Financial Summary

↓

Carbon Summary

↓

Maintenance Summary

↓

AI Recommendations

↓

Operational Risks

---

# Financial Reports

Display

Fuel Cost

Driver Salary Cost

Allowances

Maintenance Cost

Trip Cost

Operational Cost

Cost Per KM

Cost Per Trip

Monthly Trend

---

# Sustainability Reports

Display

Fleet Carbon

Vehicle Carbon

Driver Carbon

Route Carbon

Emission Trend

Reduction Opportunity

---

# Compliance Reports

Display

License Expiry

Insurance Expiry

PUC Expiry

Maintenance Due

Missing Documents

Compliance Percentage

---

# Charts

Reports should support

Bar Chart

Line Chart

Area Chart

Pie Chart

Donut Chart

Stacked Bar

KPI Cards

Summary Tables

Charts should automatically resize for export.

---

# APIs

Consumes

GET /reports

POST /reports/generate

GET /reports/:id

DELETE /reports/:id

GET /analytics/dashboard

GET /analytics/carbon

GET /analytics/expenses

GET /analytics/recommendations

---

# Components

Create

ReportsLayout

ReportCard

ReportBuilder

ReportFilters

ReportPreview

ReportViewer

ReportHistoryTable

SavedReports

ExportDialog

PrintPreview

ReportToolbar

SummarySection

ReportChart

---

# Loading States

Provide

Report Skeleton

Chart Skeleton

Preview Skeleton

History Skeleton

Export Loading

---

# Responsive Behaviour

Desktop

Two-panel report builder

Tablet

Single-column builder

Mobile

View-only mode

Report creation is desktop-first.

---

# Accessibility

Support

Keyboard Navigation

ARIA Labels

Screen Readers

High Contrast

Printable Contrast Mode

---

# Testing Checklist

Verify

Report Builder

Filters

Preview

Export

Print

Saved Reports

History

Responsive Layout

Dark Mode

Accessibility

---

# Expected Micro Commits

feat: create reports layout

feat: implement report builder

feat: implement report preview

feat: implement report viewer

feat: implement export dialog

feat: implement report history

feat: implement saved reports

feat: connect reports api

test: add reports ui tests

docs: update reports ui specification

---

# Acceptance Criteria

✓ Reports dashboard complete

✓ Report builder complete

✓ Preview functional

✓ PDF export working

✓ CSV export working

✓ Excel export working

✓ Report history available

✓ Saved reports implemented

✓ Responsive design verified

✓ Accessibility verified

✓ Tests passing

---

# Reports Module Build Order

Reports Home

↓

Report Builder

↓

Preview

↓

Viewer

↓

Export

↓

History

↓

API Integration

↓

Testing

Reports are complete when users can generate, preview, export, and review operational reports without requiring backend changes.

---

# End of Reports & Export Center


# Driver Portal (Mobile Responsive PWA) (Complete Roadmap)

## Purpose

The Driver Portal (Mobile Responsive PWA) is a dedicated mobile-first interface used by drivers during daily operations.

Unlike the Manager Dashboard, the Driver App focuses on simplicity, speed, offline functionality, and voice interaction.

Drivers should be able to complete their work with minimal typing.

The application must remain usable even in poor network conditions.

---

# Design Philosophy

The Driver App should be

Simple

↓

Large Touch Targets

↓

Voice First

↓

Offline First

↓

Minimal Navigation

↓

Low Cognitive Load

Drivers should never need more than three taps to perform common actions.

---

# Responsibilities

The frontend owns

✓ Driver Home

✓ Current Trip

✓ Trip Timeline

✓ Fuel Entry

✓ Expense Entry

✓ Voice Assistant

✓ Notifications

✓ Offline Synchronization

✓ Profile

✓ Settings

✓ Daily Summary

---

# Navigation Structure

Bottom Navigation

Home

Trips

History

Notifications

Profile

Floating Action Button

Voice Assistant

---

# Home Screen

Display

Driver Profile

↓

Current Status

↓

Current Vehicle

↓

Today's Trip

↓

Today's Tasks

↓

Working Hours

↓

Remaining Safe Hours

↓

Quick Actions

---

# Quick Actions

Start Trip

Pause Trip

Resume Trip

Complete Trip

Add Fuel

Add Expense

Upload Document

Call Dispatcher

Voice Command

These actions should always remain visible.

---

# Current Trip Screen

Display

Trip Number

Status

Origin

Destination

Stops

Distance

ETA

Driver

Vehicle

Current Progress

Trip Timeline

---

# Trip Progress

Visualize

Trip Started

↓

Current Stop

↓

Remaining Stops

↓

Destination

Progress should be represented using

Progress Bar

Timeline

Map Placeholder (Future)

---

# Fuel Entry Screen

Allow

Fuel Quantity

Unit Price

Fuel Station

Receipt Upload

Voice Notes

Save Offline

Validation should occur locally before submission.

---

# Expense Entry Screen

Categories

Food

Parking

Toll

Accommodation

Repair

Miscellaneous

Allow

Receipt Upload

Voice Notes

Offline Save

---

# Notifications Screen

Display

Trip Assigned

Trip Updated

Trip Delayed

Fuel Reminder

Expense Reminder

Insurance Reminder

Working Hours Alert

Fatigue Alert

Notifications grouped by priority.

---

# Daily Summary

Display

Trips Completed

Distance Covered

Fuel Used

Expenses

Working Hours

Carbon Generated

Pending Tasks

---

# Working Hours Widget

Display

Today's Hours

Remaining Safe Hours

Overtime

Mandatory Rest

Fatigue Risk

Visualize using

Circular Progress

Status Indicator

---

# Voice Assistant

Floating microphone button visible on every screen.

Supported Commands

Start Trip

Pause Trip

Resume Trip

Complete Trip

Add Fuel

Add Expense

Read Notifications

Show Remaining Hours

Call Dispatcher

Navigate Home

Future

Hands-free workflow

---

# Offline Mode

The application must continue functioning without internet.

Supported Offline Features

Trip Details

Fuel Entry

Expense Entry

Trip Notes

Timeline Events

Notifications Cache

Profile

Pending Upload Queue

---

# Synchronization

Display

Sync Status

Pending Uploads

Conflicts

Last Sync Time

Connection Status

Synchronization should occur automatically when connectivity returns.

---

# Conflict Resolution

If data conflicts occur

Display

Local Version

↓

Server Version

↓

Resolution Options

User should never lose submitted information.

---

# Driver Profile

Display

Photo

Name

Employee ID

Phone

Depot

Assigned Vehicle

License Status

Insurance Status

Experience

---

# Driver Settings

Allow

Theme

Language

Notification Preferences

Voice Language

Accessibility

Offline Storage Management

Logout

---

# Multilingual Support

Support

English

Hindi

Marathi

Future

Regional languages

All strings should use localization files.

---

# Accessibility

Support

Large Text

High Contrast

Screen Reader

Voice Navigation

Large Buttons

Minimum touch target

48x48 dp

---

# APIs

Consumes

GET /drivers/:id/dashboard

GET /drivers/:id/trips

GET /notifications

POST /fuel

POST /expenses

POST /voice/intent

POST /uploads

---

# Components

Create

DriverHome

CurrentTripCard

QuickActions

TripProgress

FuelEntryForm

ExpenseEntryForm

NotificationList

WorkingHoursCard

DailySummaryCard

OfflineBanner

SyncStatus

ConflictResolutionDialog

DriverProfileCard

VoiceButton

BottomNavigation

---

# Loading States

Provide

Skeleton Cards

Offline Placeholder

Pending Sync Banner

Connection Indicator

Upload Progress

---

# Security

Do not display

Salary

Administrative Analytics

Other Drivers

Fleet Information

The Driver App only exposes data relevant to the authenticated driver.

---

# Responsive Behaviour

Primary Target

Mobile

Secondary

Tablet

Desktop access is optional for debugging only.

---

# Testing Checklist

Verify

Home Screen

Current Trip

Fuel Entry

Expense Entry

Offline Mode

Synchronization

Voice Button

Notifications

Working Hours

Localization

Accessibility

---

# Expected Micro Commits

feat: create mobile navigation

feat: implement driver home

feat: implement current trip screen

feat: implement fuel entry screen

feat: implement expense entry screen

feat: implement notifications

feat: implement offline synchronization

feat: implement voice assistant button

feat: implement driver profile

feat: implement localization

test: add driver app ui tests

test: add offline synchronization tests

docs: update Driver Portal (Mobile Responsive PWA) specification

---

# Acceptance Criteria

✓ Mobile-first UI complete

✓ Current trip workflow complete

✓ Fuel entry functional

✓ Expense entry functional

✓ Offline mode operational

✓ Automatic synchronization working

✓ Voice assistant integrated

✓ Localization implemented

✓ Accessibility verified

✓ Responsive across supported devices

✓ Tests passing

---

# Driver App Build Order

Navigation

↓

Home Screen

↓

Current Trip

↓

Fuel Entry

↓

Expense Entry

↓

Notifications

↓

Offline Support

↓

Voice Integration

↓

Localization

↓

Testing

The Driver Portal (Mobile Responsive PWA) is complete when a driver can complete an entire working day using only the mobile interface, even with intermittent network connectivity.

---

# End of Driver Portal (Mobile Responsive PWA)


# Settings, Administration & Voice Interface (Complete Roadmap)

## Purpose

The Settings module provides centralized administration for the TransitOps platform.

Only users with sufficient permissions should access administrative functionality.

The Voice Interface provides a unified interaction layer between users and the AI-powered backend.

---

# Responsibilities

The frontend owns

✓ Organization Settings

✓ User Management

✓ Role Management

✓ Permission Management

✓ Depot Management

✓ System Preferences

✓ Notification Preferences

✓ Theme Management

✓ Localization

✓ Voice Assistant Interface

✓ AI Command Center

✓ User Profile

---

# Settings Navigation

Organization

↓

Users

↓

Roles

↓

Permissions

↓

Depots

↓

System

↓

Notifications

↓

Voice

↓

Profile

---

# Organization Settings

Display

Organization Name

Logo

Address

GST Number

Contact Details

Timezone

Currency

Business Hours

Fiscal Year

Brand Colors (Future)

---

# User Management

Display

Profile Photo

Name

Email

Phone

Department

Role

Status

Last Login

Actions

Edit

Disable

Reset Password

Assign Role

---

# Role Management

Supported Roles

Administrator

Operations Manager

Fleet Manager

Dispatcher

Driver

Auditor

Future roles should be configurable.

---

# Permission Matrix

Display

Role

↓

Module

↓

Permission

Permissions

View

Create

Update

Delete

Export

Approve

Administrators can modify role permissions.

---

# Depot Management

Display

Depot Name

Location

Manager

Fleet Size

Driver Count

Status

Capacity

---

# System Preferences

Allow

Theme

Timezone

Date Format

Time Format

Language

Currency

Distance Unit

Fuel Unit

Carbon Unit

---

# Notification Preferences

Users can configure

Email (Future)

SMS (Future)

Dashboard

Driver App

Voice Alerts

Maintenance Alerts

Compliance Alerts

Trip Alerts

Recommendation Alerts

---

# Theme Management

Support

Light

Dark

System

Future

Organization Theme

High Contrast Theme

---

# User Profile

Display

Profile Picture

Personal Information

Role

Permissions

Assigned Depot

Recent Activity

Security Settings

---

# Password Management

Allow

Change Password

Reset Password

Future

2FA

Security Devices

---

# Audit Log

Administrators can view

Login History

User Changes

Role Changes

Settings Changes

System Events

Audit log is read-only.

---

# Voice Assistant Interface

Purpose

Provide a conversational interface to TransitOps.

The frontend captures user input and displays responses.

All interpretation occurs in the backend Analytics/Voice Engine.

---

# Voice UI

Display

Conversation

↓

Microphone Button

↓

Transcript

↓

AI Response

↓

Suggested Actions

---

# Supported Actions

Show Fleet Status

Show Active Trips

Show Delayed Trips

Assign Driver

Assign Vehicle

Generate Report

Show Maintenance Due

Show Driver Fatigue

Show Carbon Summary

Navigate to Module

---

# AI Command Center

Support

Voice Commands

Text Commands

Natural Language Search

Suggested Prompts

Recent Commands

Favorite Commands

---

# Suggested Commands

Examples

"Show delayed trips."

"Display today's fleet utilization."

"Generate this month's fuel report."

"Which drivers are nearing fatigue?"

"Recommend the best vehicle for Route A."

---

# AI Response Panel

Display

Generated Answer

↓

Supporting KPIs

↓

Related Charts

↓

Recommended Actions

↓

Confidence Score

↓

Explanation

---

# Command History

Store

Recent Commands

Pinned Commands

Frequently Used Commands

Search History

---

# Localization

All UI strings should use translation files.

Support

English

Hindi

Marathi

Future

Additional regional languages

Never hardcode visible strings.

---

# Accessibility

Support

Keyboard Navigation

ARIA Labels

Screen Readers

High Contrast

Voice Navigation

Reduced Motion

---

# APIs

Consumes

GET /users

GET /roles

GET /permissions

GET /depots

GET /notifications

POST /voice/intent

GET /voice/tasks

PATCH /users/:id

PATCH /settings

---

# Components

Create

SettingsLayout

OrganizationSettings

UserTable

RoleTable

PermissionMatrix

DepotTable

NotificationPreferences

ThemeSelector

LanguageSelector

VoiceAssistantPanel

AICommandInput

ConversationPanel

CommandHistory

ProfileCard

AuditLogTable

---

# Loading States

Provide

Settings Skeleton

Users Skeleton

Roles Skeleton

Conversation Skeleton

Audit Log Skeleton

---

# Responsive Behaviour

Desktop

Two-panel administration workspace

Tablet

Single-column settings

Mobile

Profile and preferences only

Administrative features are desktop-first.

---

# Testing Checklist

Verify

Organization Settings

User Management

Role Management

Permissions

Depot Management

Theme Switching

Localization

Voice Interface

AI Command Center

Accessibility

---

# Expected Micro Commits

feat: create settings layout

feat: implement organization settings

feat: implement user management

feat: implement role management

feat: implement permission matrix

feat: implement depot management

feat: implement notification preferences

feat: implement theme selector

feat: implement voice assistant interface

feat: implement ai command center

test: add settings ui tests

test: add voice interface tests

docs: update settings specification

---

# Acceptance Criteria

✓ Organization settings complete

✓ User management complete

✓ Roles and permissions implemented

✓ Depot management complete

✓ Theme management working

✓ Localization implemented

✓ Voice assistant integrated

✓ AI command center operational

✓ Accessibility verified

✓ Tests passing

---

# Frontend Build Order

## Foundation

- [ ] Project setup
- [ ] Routing
- [ ] Layout system
- [ ] Design system
- [ ] Shared components

---

## Core Modules

- [ ] Executive Dashboard
- [ ] Driver Module
- [ ] Vehicle Module
- [ ] Trip Module
- [ ] Analytics Dashboard
- [ ] Reports Center
- [ ] Driver Mobile App
- [ ] Settings & Administration

---

## Integration

- [ ] API integration
- [ ] Authentication flow
- [ ] Notifications
- [ ] Voice interface
- [ ] Offline synchronization

---

## Quality

- [ ] Responsive verification
- [ ] Accessibility audit
- [ ] Dark mode verification
- [ ] Component tests
- [ ] Integration tests
- [ ] Performance optimization

---

# Definition of Done

The Frontend branch is complete when

✓ Every documented page exists

✓ Every documented reusable component exists

✓ Every backend API is integrated

✓ Loading, error, and empty states are implemented

✓ Responsive behaviour is verified

✓ Accessibility requirements are met

✓ Localization framework is integrated

✓ Voice interface is functional

✓ Driver mobile workflow is complete

✓ Tests pass

✓ Documentation matches implementation

✓ No TODOs remain

---

# Merge Checklist

Before requesting a merge

- [ ] Build succeeds
- [ ] Type checking passes
- [ ] Lint passes
- [ ] Component tests pass
- [ ] Integration tests pass
- [ ] Responsive verification complete
- [ ] Accessibility verified
- [ ] API contracts respected
- [ ] Documentation updated
- [ ] No debug code
- [ ] No unused components
- [ ] Micro-commits completed

---

# Estimated Scope

Approximate implementation effort

Pages: ~35

Reusable Components: ~90

Layouts: ~4

Hooks: ~30

Forms: ~25

Tables: ~15

Charts: ~20

Dialogs: ~12

API Integrations: ~60

Expected Micro Commits: 250–350

Estimated Pull Requests: 40–60

---

# Frontend Agent Success Criteria

The Frontend AI Agent is successful when:

- The application provides a consistent enterprise-grade user experience.
- All manager workflows are intuitive and efficient.
- The Driver Portal (Mobile Responsive PWA)lication is simple enough for daily field operations.
- Every screen consumes documented backend APIs.
- No business logic is duplicated in the frontend.
- The UI is responsive, accessible, performant, and production-ready.
- The frontend can be merged into `main` without requiring architectural changes.

---

# End of FRONTEND_AGENT.md