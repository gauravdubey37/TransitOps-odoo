# TransitOps Voice Assistant Architecture

Version: 1.0

Status: Voice Assistant Architecture Freeze

Last Updated: YYYY-MM-DD

---

# Purpose

The Voice Assistant is one of the core differentiators of TransitOps.

Unlike traditional fleet management software that assumes every driver is comfortable with smartphones and web applications, TransitOps provides a multilingual offline voice assistant capable of interacting naturally with drivers.

The assistant should enable drivers to perform almost every operational task using speech while minimizing manual interaction.

The Voice Assistant must function entirely on local infrastructure without relying on third-party cloud speech APIs.

---

# Design Goals

The Voice Assistant should be

- Offline First
- Fast
- Multilingual
- Explainable
- Low Latency
- Privacy Focused
- Modular
- Extensible

---

# Primary Users

Primary

- Truck Drivers
- Fleet Drivers
- Bus Drivers

Secondary

- Dispatch Operators

Future

- Fleet Managers

---

# Responsibilities

The Voice Assistant is responsible for

- Speech Recognition
- Language Detection
- Intent Detection
- Entity Recognition
- Text-to-Speech
- Voice Notifications
- Driver Guidance
- Reminder Generation
- Voice Confirmation
- Voice Feedback

---

# High-Level Architecture

```
                 Microphone
                      │
                      ▼
             Voice Activity Detection
                      │
                      ▼
             Speech-to-Text Engine
                      │
                      ▼
             Language Detection
                      │
                      ▼
             NLP Engine
                      │
                      ▼
             Intent Classification
                      │
                      ▼
           Backend Business Logic
                      │
                      ▼
              Response Generator
                      │
                      ▼
             Text-to-Speech Engine
                      │
                      ▼
                   Speaker
```

---

# Technology Stack

Speech-to-Text

```
Whisper.cpp
```

Language Detection

```
fastText
```

Intent Detection

```
spaCy

Sentence Transformers
```

Text-to-Speech

```
Piper TTS
```

Optional Future

```
Vosk

Silero

ONNX Runtime
```

---

# Why Local Models?

Advantages

- Works offline
- Low latency
- No internet dependency
- No API costs
- Better privacy
- Enterprise deployment
- Driver-friendly

---

# Supported Languages

MVP

- English
- Hindi

Phase 2

- Marathi
- Gujarati
- Tamil
- Telugu
- Kannada
- Bengali
- Punjabi

Language packs should be independently installable.

---

# Supported Commands

Trip Operations

```
Start Trip

Pause Trip

Resume Trip

Complete Trip
```

---

Fuel

```
Add Fuel

Update Fuel

Show Fuel History
```

---

Expenses

```
Add Expense

Show Expenses

Upload Receipt
```

---

Status

```
Read Notifications

Trip Status

Working Hours

Remaining Driving Hours

Current Vehicle
```

---

Analytics

```
How much fuel have I used today?

How many trips have I completed?

How many hours have I worked?

What tasks are pending?
```

---

# Conversation Flow

Example

Driver

```
Start my trip.
```

↓

Speech Recognition

↓

Intent

```
START_TRIP
```

↓

Validation

↓

Trip Started

↓

Voice Response

```
Your trip has been started successfully.
```

---

# Intent Categories

```
TRIP

FUEL

EXPENSE

STATUS

NAVIGATION

HELP

ANALYTICS

PROFILE

NOTIFICATIONS
```

---

# Voice Workflow

```
Speech

↓

Text

↓

Language

↓

Intent

↓

Entities

↓

Business Rules

↓

Execution

↓

Confirmation

↓

Speech
```

---

# Entity Extraction

The assistant should identify

```
Fuel Amount

Fuel Quantity

Expense Amount

Expense Category

Trip

Vehicle

Destination

Route

Date

Time
```

Example

```
Filled diesel worth four thousand rupees.
```

Entities

```
Fuel Type

Diesel

Amount

₹4000
```

---

# Confirmation Rules

High Confidence

```
Execute Immediately
```

Medium Confidence

```
Ask Confirmation
```

Example

```
Did you mean

Pause Trip?
```

Low Confidence

```
Request Repeat
```

Example

```
I couldn't understand that.

Please repeat.
```

---

# Text-to-Speech

The assistant should speak

Trip Updates

↓

Notifications

↓

Warnings

↓

Reminders

↓

Analytics

---

# Automatic Voice Notifications

Examples

```
You have been driving continuously for six hours.

Please take a mandatory rest.
```

---

```
Fuel entry is pending.
```

---

```
Expense entry is pending.
```

---

```
Insurance expires in seven days.
```

---

```
A faster route is available.

Estimated saving

18 minutes.
```

---

# Driver Fatigue Integration

The assistant continuously monitors

- Continuous Hours
- Daily Hours
- Rest Duration

Example

```
Warning.

You have reached your maximum safe driving duration.

Please stop and take a mandatory rest.
```

---

# Reminder Engine

Triggers

- Missing Fuel Entry
- Missing Expense
- Mandatory Rest
- Insurance Expiry
- License Expiry
- PUC Expiry
- Maintenance Due

Reminders should repeat only at configurable intervals.

---

# Voice Profiles

Each driver may configure

Preferred Language

Speech Speed

Voice Gender (Future)

Reminder Volume

Voice Enabled

Wake Word (Future)

---

# Voice Session

Each session records

Session ID

Driver

Trip

Language

Transcript

Intent

Confidence

Execution Time

Timestamp

---

# Offline Operation

Supported Offline

Speech Recognition

↓

Intent Detection

↓

Trip Updates

↓

Fuel Entry

↓

Expense Entry

↓

Notifications

↓

Speech Output

Synchronization occurs automatically once connectivity returns.

---

# Error Handling

If Speech Recognition Fails

```
Please repeat your command.
```

---

If Intent Unknown

```
I couldn't understand your request.

Try saying

Start Trip

or

Add Fuel.
```

---

If Backend Validation Fails

```
Trip cannot be started.

Vehicle insurance has expired.
```

---

# Security

Voice commands follow

Authentication

↓

Authorization

↓

Validation

↓

Execution

Voice commands never bypass business rules.

---

# Logging

Log

Language

Intent

Confidence

Execution Time

Success

Failure

Audio storage should be configurable.

---

# Performance Targets

Speech Recognition

<500 ms

Intent Detection

<100 ms

Response Generation

<500 ms

Speech Playback

<500 ms

End-to-End

<2 seconds

---

# Accessibility

Supports

- Large Buttons
- Voice Navigation
- Multilingual Interaction
- Hands-free Operation

---

# Future Enhancements

Future versions may include

- Wake Word Detection
- Continuous Conversation
- Voice Authentication
- Accent Adaptation
- Driver Emotion Detection
- AI Copilot
- Navigation Guidance
- Emergency Voice Commands
- Voice Macros

---

# Dependencies

Depends on

- NLP_ENGINE.md
- DRIVER_APP.md
- VOICE_API.md
- ANALYTICS_ENGINE.md
- BUSINESS_RULES.md

---

# Ownership

Analytics Branch

---

# Revision Policy

Changes require updates to

- VOICE_ASSISTANT.md
- NLP_ENGINE.md
- VOICE_API.md
- DRIVER_APP.md

---

# End of Document