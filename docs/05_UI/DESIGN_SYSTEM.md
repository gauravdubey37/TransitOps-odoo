# TransitOps Design System

Version: 1.0

Status: UI Design Freeze

Last Updated: YYYY-MM-DD

---

# Purpose

This document defines the official design system for TransitOps.

Every frontend developer and AI agent must follow this document when creating any user interface.

The objective is to ensure that every screen, page, component, and dashboard appears as though it was designed by a single design team.

This document is considered frozen for the MVP.

---

# Design Philosophy

TransitOps is an enterprise transport management platform.

The interface should communicate

- Professionalism
- Simplicity
- Information Density
- Speed
- Reliability
- Operational Clarity

The UI should never resemble a consumer mobile application.

Instead it should resemble platforms such as

- SAP Fiori
- Power BI
- Azure Portal
- Grafana
- Jira
- Fleet Management Software
- Enterprise ERP Dashboards

---

# Design Principles

The UI must always prioritize

1. Readability
2. Consistency
3. Low Cognitive Load
4. Fast Navigation
5. Data Visibility
6. Minimal Clicks
7. Accessibility
8. Predictable Interactions

---

# UI Theme

Theme

```
Professional

Modern

Minimal

Enterprise
```

Avoid

- Excessive gradients
- Bright neon colors
- Cartoon icons
- Heavy glassmorphism
- Excessive animations

---

# Color Palette

## Primary

```
Blue
```

Used for

- Primary Buttons
- Active Navigation
- Links
- Charts

---

## Secondary

```
Slate Gray
```

Used for

- Cards
- Borders
- Tables
- Layouts

---

## Success

```
Green
```

Used for

- Completed Trips
- Healthy Vehicles
- Success Messages

---

## Warning

```
Orange
```

Used for

- Upcoming Maintenance
- Insurance Expiry
- Driver Fatigue Warning

---

## Danger

```
Red
```

Used for

- Critical Alerts
- Failed Validation
- Vehicle Failure
- License Expiry

---

## Information

```
Cyan
```

Used for

- Reports
- Analytics
- Recommendations

---

# Typography

Primary Font

```
Inter
```

Fallback

```
system-ui
```

Weights

```
400

500

600

700
```

---

# Font Sizes

Page Title

```
32px
```

Section Title

```
24px
```

Card Title

```
18px
```

Table Header

```
14px
```

Body

```
14px
```

Caption

```
12px
```

---

# Border Radius

Cards

```
12px
```

Buttons

```
8px
```

Dialogs

```
16px
```

Inputs

```
8px
```

---

# Shadows

Cards

Small shadow only.

Dialogs

Medium shadow.

Dropdowns

Medium shadow.

Avoid excessive shadow effects.

---

# Layout

The application follows a three-level hierarchy.

```
Sidebar

↓

Top Navigation

↓

Workspace
```

---

# Sidebar

Permanent on desktop.

Contains

- Dashboard
- Drivers
- Vehicles
- Trips
- Routes
- Fuel
- Expenses
- Maintenance
- Analytics
- Reports
- Settings

Icons should accompany every navigation item.

---

# Header

Contains

- Search
- Notifications
- User Profile
- Organization Selector
- Theme Toggle (Future)

Header height

```
64px
```

---

# Content Area

Every page follows

```
Page Title

↓

Breadcrumb

↓

Toolbar

↓

Content

↓

Footer
```

---

# Spacing System

Use an 8-point grid.

Spacing values

```
4

8

12

16

24

32

48

64
```

Avoid arbitrary spacing.

---

# Cards

Cards display

- KPIs
- Statistics
- Driver Information
- Vehicle Information
- Trip Information

Card layout

```
Title

↓

Primary Value

↓

Secondary Information

↓

Footer
```

---

# Buttons

Variants

Primary

Secondary

Outline

Ghost

Danger

Success

Sizes

Small

Medium

Large

Loading state required.

Disabled state required.

---

# Tables

Use TanStack Table.

Features

- Pagination
- Search
- Filters
- Sorting
- Sticky Header
- Column Visibility
- Export
- Row Selection

Tables should support thousands of rows efficiently.

---

# Forms

Every form should include

- Labels
- Placeholder
- Validation
- Helper Text
- Error Messages

Required fields must be clearly indicated.

---

# Inputs

Supported

Text

Number

Date

Dropdown

Autocomplete

Multi Select

Checkbox

Radio

Textarea

File Upload

---

# Dialogs

Dialogs should contain

Title

Description

Content

Primary Action

Secondary Action

Escape key closes dialog.

---

# Notifications

Notification types

Success

Warning

Error

Information

Notifications should not block user workflow.

---

# Charts

Library

```
Recharts
```

Supported charts

Line

Bar

Area

Pie

Donut

Heatmap (Future)

Trend

Stacked Bar

Use consistent colors.

---

# KPI Cards

Every KPI card contains

Title

Primary Metric

Trend

Comparison

Icon

Timestamp

---

# Status Badges

Examples

Available

Assigned

Completed

Delayed

Maintenance

Fatigued

Cancelled

Badges should use semantic colors.

---

# Icons

Library

```
Lucide React
```

Use icons consistently.

Examples

Truck

User

Fuel

Chart

Bell

Map

Settings

Calendar

---

# Loading States

Use skeleton loaders.

Avoid empty white screens.

---

# Empty States

Every empty state should explain

- Why no data exists
- What the user can do next

Example

"No trips have been created yet."

---

# Error States

Errors should display

Title

Description

Recovery Action

Retry Button

---

# Search

Global search available in header.

Supports

Drivers

Vehicles

Trips

Routes

Reports

---

# Filters

Filters should remain persistent during the session.

Frequently used filters should be remembered.

---

# Accessibility

Must support

Keyboard Navigation

Visible Focus States

ARIA Labels

High Contrast

Screen Readers

---

# Responsive Design

Desktop First

Supported widths

Desktop

Laptop

Tablet

Mobile

Some administrative screens may remain desktop-only.

---

# Animation

Animations should be subtle.

Allowed

Fade

Slide

Collapse

Expand

Avoid decorative animations.

---

# Dashboard Principles

The Executive Dashboard should answer

"What is happening right now?"

within five seconds.

Priority

Critical Alerts

↓

KPI Cards

↓

Charts

↓

Tables

↓

Recent Activity

---

# Driver Dashboard

Designed for simplicity.

Large buttons.

Minimal typing.

Voice-first interaction.

---

# Fleet Dashboard

Designed for information density.

Supports

- Multi-monitor layouts
- Large tables
- Live KPIs
- Operational monitoring

---

# Dark Mode

Supported.

Every component must render correctly in both

Light

Dark

modes.

---

# Component Consistency

Every reusable UI element must exist only once.

No duplicate implementations.

Use shared components.

---

# Design Tokens

Future implementation should centralize

- Colors
- Typography
- Radius
- Shadows
- Spacing
- Animation durations

inside a shared theme configuration.

---

# AI Development Rules

AI-generated UI must

- Reuse existing components
- Never duplicate layouts
- Follow spacing rules
- Follow typography rules
- Follow color system
- Follow accessibility guidelines

---

# Revision Policy

Changes to the design system require updates to

- UI_SPECIFICATION.md
- DESIGN_SYSTEM.md
- COMPONENT_LIBRARY.md
- DASHBOARD_SPEC.md
- DRIVER_APP.md

No UI should violate the design system.

---

# End of Document