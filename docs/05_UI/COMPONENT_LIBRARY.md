# TransitOps Component Library

Version: 1.0

Status: Component Library Freeze

Last Updated: YYYY-MM-DD

---

# Purpose

This document defines every reusable UI component used throughout TransitOps.

The objective is to ensure that every screen is assembled from standardized components rather than creating new UI elements for each page.

This guarantees:

- Visual consistency
- Faster development
- Easier maintenance
- Better accessibility
- Minimal merge conflicts

Every component described here should exist only once inside the frontend component library.

---

# Component Hierarchy

```
Atoms
    ↓
Molecules
    ↓
Organisms
    ↓
Pages
```

---

# Design Principles

Every component should be:

- Reusable
- Accessible
- Responsive
- Stateless where possible
- Well documented
- Theme-aware
- Type-safe
- Tested

---

# Technology

Framework

```
React
```

Language

```
TypeScript
```

UI Library

```
shadcn/ui
```

Icons

```
Lucide React
```

Styling

```
Tailwind CSS
```

---

# Component Naming

Component Names

```
PascalCase
```

Example

```
DriverCard

VehicleTable

TripTimeline

AnalyticsChart
```

File Names

```
kebab-case
```

Example

```
driver-card.tsx

vehicle-table.tsx

trip-timeline.tsx
```

---

# Folder Structure

```
components/

├── common/
├── layout/
├── dashboard/
├── driver/
├── vehicle/
├── trip/
├── analytics/
├── charts/
├── tables/
├── forms/
├── feedback/
└── voice/
```

---

# Common Components

## Button

Variants

- Primary
- Secondary
- Outline
- Ghost
- Danger
- Success

States

- Default
- Hover
- Disabled
- Loading

---

## Input

Supports

- Text
- Number
- Email
- Password
- Search

Features

- Validation
- Error State
- Disabled State

---

## TextArea

Supports

- Auto Resize
- Character Counter
- Validation

---

## Select

Supports

- Single Select
- Searchable
- Async Options

---

## MultiSelect

Supports

- Multiple Selection
- Search
- Chips
- Clear All

---

## Checkbox

Supports

- Default
- Indeterminate
- Disabled

---

## Radio Group

Supports

- Horizontal
- Vertical

---

## Date Picker

Supports

- Single Date
- Date Range

---

## File Upload

Supports

- Drag & Drop
- Click Upload
- Progress Bar
- Preview

Supported Files

- PDF
- PNG
- JPG
- WEBP

---

# Layout Components

## Sidebar

Contains

- Logo
- Navigation
- Collapse Button

---

## Header

Contains

- Search
- Notifications
- User Menu
- Breadcrumb

---

## Page Container

Standard page wrapper.

---

## Section Header

Contains

- Title
- Description
- Actions

---

# Table Components

## DataTable

Features

- Pagination
- Sorting
- Search
- Filters
- Export
- Sticky Header
- Column Visibility
- Row Selection

---

## Table Toolbar

Contains

- Search
- Filters
- Export
- Refresh

---

## Table Pagination

Supports

- Page Navigation
- Page Size
- Total Count

---

# Card Components

## KPI Card

Displays

- Metric
- Trend
- Icon
- Comparison

---

## Driver Card

Displays

- Driver Name
- Status
- License
- Experience
- Current Assignment

---

## Vehicle Card

Displays

- Registration
- Vehicle Class
- Status
- Maintenance
- Fuel Type

---

## Trip Card

Displays

- Route
- Driver
- Vehicle
- Status
- ETA

---

## Alert Card

Displays

- Severity
- Description
- Action

---

# Form Components

## Driver Form

Reusable for

- Create
- Edit

---

## Vehicle Form

Reusable for

- Create
- Edit

---

## Trip Form

Reusable for

- Create
- Edit

---

## Fuel Form

Reusable

---

## Expense Form

Reusable

---

# Dashboard Components

## KPI Grid

Displays

- 4–8 KPI Cards

---

## Recent Activity

Timeline component.

---

## Active Trips Table

Live updating table.

---

## Fleet Summary

Overview cards.

---

## Notification Panel

Shows

- Alerts
- Warnings
- Recommendations

---

# Driver Components

## Driver Profile

---

## Driver Statistics

---

## Driver Experience

---

## Driver Fatigue Indicator

Displays

- Continuous Hours
- Fatigue Level
- Remaining Safe Hours

---

## Driver Assignment Card

---

# Vehicle Components

## Vehicle Profile

---

## Vehicle Timeline

---

## Maintenance Timeline

---

## Tire Health Card

Displays

- Tire Life
- Distance Covered
- Remaining Life

---

## Carbon Card

Displays

- Emissions
- Trend
- Comparison

---

# Trip Components

## Trip Timeline

Shows

- Start
- Stops
- Fuel
- Expenses
- Completion

---

## Route Card

Displays

- Source
- Destination
- Distance
- ETA

---

## Fuel Summary

---

## Expense Summary

---

# Analytics Components

## Recommendation Card

Displays

- Recommendation
- Expected Savings
- Confidence Score
- Reason

---

## KPI Comparison

Compare two KPIs.

---

## Trend Card

Displays

Historical Trends.

---

## Root Cause Panel

Displays

- Cause
- Evidence
- Recommendation

---

# Chart Components

## Line Chart

---

## Bar Chart

---

## Area Chart

---

## Pie Chart

---

## Donut Chart

---

## Trend Chart

---

## Heatmap (Future)

---

# Voice Components

## Voice Button

States

- Idle
- Listening
- Processing
- Speaking

---

## Voice Transcript

Shows

- Recognized Text
- Confidence

---

## Voice Response

Displays

System Response.

---

# Feedback Components

## Toast

Types

- Success
- Error
- Warning
- Info

---

## Alert Dialog

---

## Confirmation Dialog

---

## Error Boundary

---

## Loading Skeleton

---

## Empty State

---

# Status Components

Badges

```
Available

Assigned

Completed

Paused

Delayed

Maintenance

Fatigued

Cancelled
```

---

# Navigation Components

## Breadcrumb

---

## Tabs

---

## Stepper

---

## Pagination

---

# Responsive Behavior

Desktop

- Full Layout

Tablet

- Collapsible Sidebar

Mobile

- Drawer Navigation

---

# Accessibility

Every component must support

- Keyboard Navigation
- Screen Readers
- Focus States
- ARIA Labels

---

# Component Ownership

| Component Group | Owner |
|----------------|--------|
| Common | Frontend |
| Layout | Frontend |
| Dashboard | Frontend |
| Driver | Frontend |
| Vehicle | Frontend |
| Trip | Frontend |
| Analytics | Frontend |
| Charts | Frontend |
| Voice | Frontend |

---

# Testing Requirements

Every reusable component should have

- Unit Tests
- Accessibility Tests
- Responsive Validation

---

# Future Components

Future versions may include

- Live Maps
- Fleet Heatmaps
- Drag-and-Drop Planner
- Timeline Editor
- Gantt Charts
- Whiteboard Planning
- AI Chat Widget

---

# Revision Policy

Changes to reusable components require updates to

- DESIGN_SYSTEM.md
- COMPONENT_LIBRARY.md
- UI_SPECIFICATION.md

New UI elements should extend the component library rather than creating duplicate implementations.

---

# End of Document