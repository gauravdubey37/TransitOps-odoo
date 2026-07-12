# TransitOps Hackathon UI Guide

**Version:** 1.0

> **Objective:** Make judges say **"Wow"** within the first 30 seconds.

------------------------------------------------------------------------

# Vision

TransitOps should **not** feel like a CRUD admin panel.

It should feel like a **Fleet Operations Command Center** used by a
company managing thousands of vehicles.

Design Inspiration:

-   Tesla Fleet
-   Uber Freight
-   SpaceX Mission Control
-   Bloomberg Terminal
-   Airline Operations Center

Keywords:

-   Premium
-   Futuristic
-   Operational
-   Live
-   AI-first
-   Data-rich
-   Minimal

------------------------------------------------------------------------

# Overall Mood

Imagine walking into a logistics control room.

Every screen should communicate:

-   Live Operations
-   Reliability
-   Intelligence
-   Precision
-   Scale

Avoid:

-   Generic dashboard templates
-   Bright playful gradients
-   Material-style admin panels
-   Large empty spaces

------------------------------------------------------------------------

# Color Palette

## Background

    #09111D

## Card

    #131D2B

## Borders

    rgba(255,255,255,0.06)

## Primary

    #3B82F6

## Cyan

    #06B6D4

## Success

    #22C55E

## Warning

    #F59E0B

## Error

    #EF4444

Cards should use subtle borders instead of heavy shadows.

------------------------------------------------------------------------

# Typography

Primary Font

-   Inter

Numbers / IDs

-   JetBrains Mono

Vehicle IDs, Trip IDs, Revenue, Distance and Metrics should always use
the monospace font.

------------------------------------------------------------------------

# Dashboard Philosophy

The dashboard should resemble a **Mission Control Center**.

Layout:

    Header

    ↓

    Mission Status Banner

    ↓

    KPI Cards

    ↓

    Fleet Overview + AI Recommendations

    ↓

    Active Trips + Alerts

    ↓

    Analytics + Timeline

Everything important should be visible without scrolling.

------------------------------------------------------------------------

# Hero Banner

Replace the boring "Dashboard" heading.

Use:

    Good Morning, Himanshu

    Fleet Operating Normally

    98.2% Operational Efficiency

    No Critical Incidents Detected

Display the current time and date.

------------------------------------------------------------------------

# Sidebar

Dark navigation.

Structure:

-   Mission Control
-   Operations
-   Fleet
-   Drivers
-   Trips
-   Analytics
-   Reports
-   Settings

Bottom Section:

    LIVE STATUS

    312 Vehicles Online

    154 Active Trips

    98% Fleet Efficiency

Current page should have a glowing blue indicator.

------------------------------------------------------------------------

# KPI Cards

Every KPI card should contain:

-   Icon
-   Large Number
-   Label
-   Trend Arrow
-   Mini Progress Bar
-   Last Updated

Example:

    🚛

    312

    Vehicles Online

    +12 Today

    ██████████░

------------------------------------------------------------------------

# AI Command Center

Never show AI as plain text.

Display premium recommendation cards.

Example:

    AI COMMAND CENTER

    Route Optimization

    Save 23 minutes

    Fuel Saving

    ₹3,420

    Confidence

    96%

    [Accept Recommendation]

------------------------------------------------------------------------

# Active Trips

Use timeline cards instead of plain rows.

Each card:

-   Driver
-   Vehicle
-   Route
-   ETA
-   Progress
-   Current Status

Progress should animate.

------------------------------------------------------------------------

# Fleet Overview

Show:

-   Available Vehicles
-   Active Vehicles
-   Maintenance
-   Delayed
-   Carbon

Use radial progress indicators.

------------------------------------------------------------------------

# Driver Module

Focus on people.

Cards include:

-   Photo
-   Fatigue
-   Working Hours
-   Compliance
-   Current Trip

Fatigue should use a glowing circular gauge.

------------------------------------------------------------------------

# Vehicle Module

Industrial feel.

Show:

-   Health Score
-   Fuel
-   Tyres
-   Maintenance
-   Carbon
-   Utilization

Health score should be the hero metric.

------------------------------------------------------------------------

# Trip Timeline

Instead of plain text:

    09:24

    Vehicle Left Depot

    ↓

    10:18

    Fuel Logged

    ↓

    12:14

    Traffic Delay

    ↓

    13:02

    Destination Reached

Include colored icons.

------------------------------------------------------------------------

# Charts

Rules:

-   Rounded bars
-   Gradient fills
-   Smooth lines
-   Thin grids
-   Floating tooltips
-   KPI above each chart

Never use default chart styling.

------------------------------------------------------------------------

# Empty States

Never show:

"No Data"

Instead:

    🚛

    No Active Trips

    Create your first dispatch to begin monitoring operations.

    [Create Trip]

------------------------------------------------------------------------

# Login Screen

Large branding.

Headline:

    TransitOps

    Intelligent Fleet Operations Platform

Subtitle:

    Powering Modern Logistics

Background:

Animated route network with moving dots.

Login card should float over the background.

------------------------------------------------------------------------

# Fake Live Features

For the hackathon, visual realism matters.

Include:

-   LIVE badge
-   Updating every 5 seconds
-   Animated truck icons
-   Pulse indicators
-   Live notification ticker

Even if data is mocked.

------------------------------------------------------------------------

# Motion Design

Every interaction should feel premium.

Cards

-   Lift on hover

Buttons

-   Glow

Sidebar

-   Smooth collapse

Numbers

-   Count animation

Charts

-   Draw animation

Notifications

-   Slide in

Status

-   Pulse

Page transitions

-   Fade

Duration:

180ms--250ms.

------------------------------------------------------------------------

# Micro Details

Use:

-   Rounded cards
-   Thin borders
-   Soft glow
-   Glass only for dialogs
-   Consistent spacing
-   Colored status chips

------------------------------------------------------------------------

# Icons

Use Lucide Icons only.

Avoid emoji in production except placeholders during development.

------------------------------------------------------------------------

# Judge Wow Moments

Implement these first:

1.  Hero Mission Control dashboard
2.  AI Recommendation Center
3.  Animated KPI counters
4.  Fleet overview gauges
5.  Live activity timeline
6.  Beautiful charts
7.  Animated login screen
8.  Fake live fleet map with moving trucks
9.  Dark premium theme
10. Driver mobile UI with oversized controls

------------------------------------------------------------------------

# Final Goal

A judge should immediately think:

> "This doesn't look like a hackathon project. It looks like software
> built for a real logistics company."

That first impression is the goal of every design decision.
