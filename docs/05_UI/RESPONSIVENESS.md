# TransitOps Responsive Design Specification

Version: 1.0

Status: Responsive Design Freeze

Last Updated: YYYY-MM-DD

---

# Purpose

This document defines how every screen, component, table, chart, and interaction behaves across different screen sizes.

The goal is to ensure a consistent experience across desktops, laptops, tablets, and mobile devices without requiring separate implementations.

Responsive behavior must be deterministic. Frontend developers and AI agents must not invent responsive layouts independently.

---

# Philosophy

TransitOps is an enterprise-first application.

It is optimized primarily for:

- Operations Centers
- Fleet Offices
- Dispatch Teams
- Transport Managers

Mobile support exists primarily for:

- Driver Dashboard
- Driver Operations

Administrative modules are desktop-first.

---

# Supported Devices

| Device | Width |
|---------|-------|
| Large Desktop | ≥1600px |
| Desktop | 1280–1599px |
| Laptop | 1024–1279px |
| Tablet | 768–1023px |
| Mobile | <768px |

---

# Breakpoints

```
xs

0px

sm

640px

md

768px

lg

1024px

xl

1280px

2xl

1536px
```

Use Tailwind's standard breakpoint system.

---

# Layout Strategy

Large Desktop

```
Sidebar

↓

Header

↓

Multi-column Dashboard

↓

Large Tables
```

---

Desktop

```
Sidebar

↓

Header

↓

Dashboard

↓

Charts

↓

Tables
```

---

Laptop

```
Collapsible Sidebar

↓

Header

↓

Dashboard

↓

Tables
```

---

Tablet

```
Drawer Navigation

↓

Header

↓

Cards

↓

Collapsed Charts
```

---

Mobile

```
Bottom Navigation

↓

Cards

↓

Lists

↓

Minimal Tables
```

---

# Sidebar Behavior

Desktop

Permanent

---

Laptop

Collapsible

---

Tablet

Hidden

Drawer

---

Mobile

Hidden

Drawer

---

# Header

Desktop

```
Logo

Search

Notifications

Profile
```

Tablet

```
Menu

Search

Notifications

Profile
```

Mobile

```
Menu

Notifications

Profile
```

Global search becomes a modal on mobile.

---

# Dashboard

## Desktop

```
8 KPI Cards

↓

Charts

↓

Tables

↓

Analytics

↓

Recommendations
```

---

## Laptop

```
4 KPI Cards

↓

Charts

↓

Tables
```

---

## Tablet

```
2 KPI Cards

↓

Charts

↓

Cards
```

---

## Mobile

```
Single Column

↓

Cards

↓

Lists
```

Large executive dashboards are not intended for heavy mobile usage.

---

# KPI Cards

Desktop

```
4–8 Cards Per Row
```

Laptop

```
4 Cards
```

Tablet

```
2 Cards
```

Mobile

```
1 Card
```

---

# Tables

Desktop

Full Table

---

Laptop

Horizontal Scroll

---

Tablet

Simplified Table

Hide low-priority columns.

---

Mobile

Convert to Cards.

Never force horizontal scrolling on mobile.

---

# Column Priority

Priority 1

Always Visible

```
Name

Status

Primary Metric
```

Priority 2

Hide on Tablet

```
Region

Created Date

Updated Date
```

Priority 3

Hide on Mobile

```
Internal IDs

Metadata

Audit Fields
```

---

# Forms

Desktop

Two-column layout

---

Laptop

Two-column layout

---

Tablet

Single-column

---

Mobile

Single-column

Full-width inputs.

---

# Dialogs

Desktop

Centered modal

---

Tablet

Centered modal

---

Mobile

Bottom Sheet

---

# Charts

Desktop

Multiple charts per row

---

Laptop

Two charts per row

---

Tablet

One chart per row

---

Mobile

One chart

Reduced legends

---

# Navigation

Desktop

Sidebar

---

Tablet

Drawer

---

Mobile

Bottom Navigation

Driver application only.

---

# Filters

Desktop

Sidebar filters

---

Tablet

Collapsible filter drawer

---

Mobile

Modal filter sheet

---

# Search

Desktop

Persistent Search

---

Tablet

Expandable Search

---

Mobile

Full Screen Search

---

# Cards

Desktop

Large Cards

---

Mobile

Compact Cards

---

# Buttons

Desktop

Standard Buttons

---

Mobile

Large Touch Buttons

Minimum touch target

```
44px
```

---

# Driver Dashboard

Designed Mobile First.

Large buttons.

Large typography.

Voice shortcut always visible.

---

# Executive Dashboard

Desktop First.

Not optimized for complex mobile interactions.

Managers are expected to use

Desktop

Laptop

Large Tablets

---

# Notifications

Desktop

Notification Panel

---

Tablet

Drawer

---

Mobile

Dedicated Screen

---

# Maps (Future)

Desktop

Large Map

---

Tablet

Medium Map

---

Mobile

Full Screen Map

---

# Voice Assistant

Desktop

Floating Button

---

Tablet

Floating Button

---

Mobile

Bottom Floating Action Button

Always visible.

---

# Accessibility

Responsive layouts must preserve

- Keyboard Navigation
- Screen Reader Support
- Focus Order
- Color Contrast

No responsive breakpoint should reduce accessibility.

---

# Performance

Desktop

Load full dashboard.

---

Laptop

Lazy load lower sections.

---

Tablet

Lazy load charts.

---

Mobile

Load only visible sections.

---

# Images

Responsive images required.

Avoid loading desktop-sized assets on mobile.

---

# Printing

Dashboard reports should support

A4

Landscape

without layout issues.

---

# Offline Support

Driver application remains fully functional offline.

Executive dashboard requires network connectivity.

---

# Responsive Testing

Every page must be tested at

```
1920px

1600px

1440px

1366px

1280px

1024px

768px

390px
```

---

# Browser Support

Supported Browsers

- Chrome
- Edge
- Firefox
- Safari

Latest two major versions.

---

# AI Development Rules

AI agents must not invent new responsive layouts.

They must follow this specification exactly.

Responsive behavior should be implemented using reusable layout components rather than page-specific CSS.

---

# Future Enhancements

Future responsive improvements may include

- Foldable device support
- Multi-monitor dashboard layouts
- TV / Wallboard mode
- Kiosk mode
- Vehicle-mounted tablet mode

---

# Revision Policy

Changes require updates to

- RESPONSIVENESS.md
- DESIGN_SYSTEM.md
- COMPONENT_LIBRARY.md
- UI_SPECIFICATION.md

---

# End of Document