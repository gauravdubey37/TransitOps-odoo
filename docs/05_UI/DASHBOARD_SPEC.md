# TransitOps Executive Dashboard Specification

Version: 1.0

Status: Dashboard UI Freeze

Last Updated: YYYY-MM-DD

---

# Purpose

The Executive Dashboard is the primary screen of TransitOps.

It should allow a Fleet Manager or Operations Manager to understand the entire transportation operation within **5 seconds**.

This dashboard is inspired by enterprise fleet management platforms while incorporating the additional operational intelligence and AI capabilities designed specifically for TransitOps.

The dashboard should be highly interactive while maintaining information density and clarity.

---

# Design Principles

The dashboard should answer the following questions immediately.

- What is happening now?
- Are there any critical alerts?
- Which trips require attention?
- Which drivers are unavailable?
- Which vehicles require maintenance?
- How much is today's operational cost?
- What recommendations does the AI engine have?

---

# Layout

Desktop Layout

```
---------------------------------------------------------
 Top Navigation
---------------------------------------------------------

 Sidebar | Dashboard Workspace

         ┌────────────────────────────────────┐
         │ KPI Cards                          │
         ├────────────────────────────────────┤
         │ Live Fleet Overview                │
         ├────────────────────────────────────┤
         │ Charts + Analytics                 │
         ├────────────────────────────────────┤
         │ Active Trips                       │
         ├────────────────────────────────────┤
         │ AI Recommendations                 │
         └────────────────────────────────────┘
```

---

# Sidebar

Navigation Items

```
Dashboard

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
```

Each navigation item should contain

- Icon
- Label
- Active State

Sidebar should support

- Collapse
- Expand

---

# Top Navigation

Contains

Search

Notifications

Organization

Theme Toggle

Profile Menu

Current Date

Refresh Dashboard

---

# Dashboard Sections

The dashboard is divided into

1. KPI Cards
2. Fleet Status
3. Operational Charts
4. Active Trips
5. Driver Overview
6. Vehicle Overview
7. AI Insights
8. Recent Activity

---

# KPI Cards

First row

```
Fleet Size

Active Trips

Available Drivers

Available Vehicles

Today's Cost

Today's Revenue

Today's Carbon

Fuel Consumption
```

Each KPI Card contains

Title

Primary Value

Trend

Comparison

Icon

Timestamp

Clicking a KPI opens its detailed analytics page.

---

# Fleet Status

Displays

```
Available Vehicles

Assigned Vehicles

Maintenance

Retired

Inactive
```

Visual

Donut Chart

Status Cards

---

# Driver Overview

Cards

```
Available

Driving

Resting

Fatigued

Leave

Inactive
```

Additional KPIs

Average Hours

Average Trips

Driver Utilization

Average Driver Rating (Future)

---

# Vehicle Overview

Cards

```
Available

Assigned

Maintenance

Low Mileage

Insurance Expiring

PUC Expiring
```

---

# Active Trips Table

Columns

```
Trip ID

Driver

Vehicle

Route

Status

Progress

ETA

Distance

Fuel

Carbon

Actions
```

Supports

Sorting

Filtering

Pagination

Live Updates

Click Row → Opens Trip Drawer

---

# AI Recommendation Panel

Position

Right side

Cards

```
Better Route Available

Vehicle Needs Maintenance

Driver Fatigue Alert

Insurance Expiry

Reduce Carbon Suggestion

Fuel Optimization

Cost Optimization
```

Each recommendation includes

Reason

Expected Savings

Priority

Action Button

---

# Route Intelligence

Displays

```
Current Route

Recommended Route

Distance Saved

Fuel Saved

Carbon Saved

Time Saved

Toll Saved
```

Comparison View

Old Route

↓

Recommended Route

---

# Cost Analytics

Charts

Daily Cost

Fuel Cost

Maintenance Cost

Driver Cost

Toll Cost

Allowance Cost

---

# Carbon Dashboard

Displays

Today's Carbon

Monthly Carbon

Carbon per Vehicle

Carbon per Route

Carbon Trend

Reduction Opportunities

---

# Fuel Dashboard

Displays

Fuel Consumed Today

Average Mileage

Fuel Cost

Most Efficient Vehicle

Least Efficient Vehicle

---

# Maintenance Dashboard

Displays

Upcoming Maintenance

Overdue Maintenance

Average Maintenance Cost

Vehicle Downtime

Maintenance Timeline

---

# Notifications

Notification Panel

Grouped by

Critical

High

Medium

Information

Each notification includes

Timestamp

Severity

Description

Action

---

# Charts

Dashboard contains

Fleet Utilization

Trip Completion Trend

Fuel Trend

Carbon Trend

Expense Trend

Maintenance Trend

Driver Utilization

Vehicle Utilization

Charts should support

Hover

Export

Fullscreen

---

# Search

Global Search

Searches

Drivers

Vehicles

Trips

Routes

Reports

Analytics

---

# Filters

Global Filters

Date Range

Region

Depot

Vehicle Class

Driver

Trip Status

Route

Fuel Type

Filters persist during session.

---

# Recent Activity

Timeline

Examples

Trip Started

Trip Completed

Vehicle Assigned

Fuel Added

Maintenance Logged

Insurance Updated

Driver Rest Started

---

# Live Refresh

Dashboard refresh

Default

30 seconds

Configurable

Manual Refresh Button

---

# Driver Fatigue Widget

Displays

Drivers currently

- Safe
- Warning
- Critical

Critical drivers highlighted in red.

Clicking opens Driver Profile.

---

# Vehicle Health Widget

Displays

Healthy

Service Due

Insurance Expiring

PUC Expiring

Tires Near Replacement

---

# Executive Insights

Natural language summaries

Examples

```
Fuel costs increased by 8% today.

Three vehicles require immediate servicing.

Delhi region generated the highest operational cost.

Average driver utilization improved by 5%.
```

Generated by Analytics Engine.

---

# Root Cause Panel

Displays

Issue

↓

Evidence

↓

Affected KPIs

↓

Recommendation

↓

Expected Benefit

---

# Map Panel (Future)

Displays

Live Trips

Vehicle Locations

Route Progress

Traffic

Not part of MVP.

---

# Quick Actions

Buttons

Create Trip

Register Driver

Register Vehicle

Log Maintenance

Generate Report

Run Analytics

---

# Export

Dashboard Export

Formats

PDF

Excel

CSV

---

# Mobile Layout

Shows

KPI Cards

Notifications

Trips

Recommendations

Large tables become cards.

---

# Tablet Layout

Sidebar collapses automatically.

Charts stack vertically.

---

# Accessibility

Supports

Keyboard Navigation

Screen Readers

Focus Indicators

High Contrast

---

# Performance Requirements

Dashboard should load

```
<2 Seconds
```

Charts

Lazy Loaded

Tables

Virtualized

Analytics

Cached where appropriate

---

# Future Widgets

Predictive Maintenance

AI Dispatch Suggestions

Carbon Credits

Warehouse Operations

IoT Vehicle Health

Fleet Digital Twin

Traffic Overlay

Weather Overlay

---

# Dashboard Ownership

Frontend

Layout

Backend

Operational Data

Analytics

KPIs

Recommendations

Voice

Notifications

---

# UI References

The dashboard should closely resemble the reference designs provided during project planning, with enhancements for:

- Enterprise usability
- Higher information density
- Better analytics integration
- Driver fatigue monitoring
- Carbon tracking
- AI recommendations
- Voice-enabled operations

The final implementation should preserve the overall visual hierarchy of the reference dashboards while integrating TransitOps-specific functionality.

---

# Revision Policy

Changes require updates to

- DESIGN_SYSTEM.md
- COMPONENT_LIBRARY.md
- DASHBOARD_SPEC.md
- UI_SPECIFICATION.md

Dashboard changes should be reviewed jointly by the Frontend and Analytics branches before implementation.

---

# End of Document