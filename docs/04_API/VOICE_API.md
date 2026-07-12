# TransitOps Voice Assistant API

Version: 1.0

Status: API Specification Freeze

Last Updated: YYYY-MM-DD

---

# Purpose

This document defines all APIs used by the TransitOps Offline Voice Assistant.

The Voice Assistant is primarily intended for drivers who may not be comfortable using traditional web interfaces while performing transport operations.

The assistant allows drivers to interact with TransitOps using natural speech in multiple languages while operating entirely on local infrastructure.

No cloud speech APIs should be required.

---

# Objectives

The Voice Assistant should enable drivers to:

- Start trips
- Pause trips
- Resume trips
- Complete trips
- Log fuel
- Log expenses
- View trip status
- Hear pending reminders
- Ask simple operational questions
- Receive spoken notifications
- Operate hands-free whenever practical

---

# Design Principles

The voice subsystem must be

- Offline First
- Privacy Preserving
- Multilingual
- Low Latency
- Modular
- Replaceable
- Explainable

---

# Architecture

```
Microphone

↓

Speech-to-Text

↓

Intent Detection

↓

Entity Extraction

↓

Command Validation

↓

Backend API

↓

Response

↓

Text-to-Speech

↓

Speaker
```

---

# Technology Stack

Speech-to-Text

```
Whisper.cpp
```

Text-to-Speech

```
Piper TTS
```

Language Detection

```
fastText
```

Intent Classification

```
spaCy

Sentence Transformers
```

---

# Supported Languages

Initial MVP

- English
- Hindi

Future

- Marathi
- Gujarati
- Tamil
- Telugu
- Kannada
- Punjabi
- Bengali

Language packs should be configurable.

---

# Base URL

```
/api/v1/voice
```

---

# Voice Session

Each interaction belongs to a voice session.

Session contains

- Session ID
- Driver ID
- Trip ID
- Language
- Timestamp
- Transcript
- Confidence Score

---

# Endpoints

---

# Process Voice Command

## Endpoint

```
POST /voice/process
```

Authentication

Driver JWT Required

---

### Request

```json
{
  "tripId":"...",
  "language":"en",
  "transcript":"Start my trip."
}
```

---

### Response

```json
{
  "success": true,
  "intent": "START_TRIP",
  "confidence": 0.98,
  "response": "Your trip has been started successfully."
}
```

---

# Speech-to-Text

## Endpoint

```
POST /voice/stt
```

Purpose

Convert recorded speech into text.

Input

Multipart audio file.

Output

Recognized transcript.

---

# Text-to-Speech

## Endpoint

```
POST /voice/tts
```

Request

```json
{
    "text":"Fuel entry is pending.",
    "language":"en"
}
```

Response

Generated audio stream.

---

# Detect Language

```
POST /voice/detect-language
```

Returns

```json
{
    "language":"hi",
    "confidence":0.94
}
```

---

# Intent Detection

```
POST /voice/intent
```

Returns

Detected Intent

Confidence

Entities

---

# Supported Intents

Trip

```
START_TRIP

PAUSE_TRIP

RESUME_TRIP

END_TRIP
```

Fuel

```
ADD_FUEL

SHOW_FUEL
```

Expense

```
ADD_EXPENSE

SHOW_EXPENSES
```

Dashboard

```
READ_NOTIFICATIONS

SHOW_STATUS

SHOW_TRIP
```

Navigation

```
SHOW_ROUTE

SHOW_NEXT_STOP
```

Analytics

```
WHY_DELAY

SHOW_KPIS
```

---

# Example Commands

Trip

```
Start my trip.

Pause trip.

Resume trip.

End today's trip.
```

Fuel

```
Filled diesel worth four thousand rupees.

Added forty litres.

Show fuel entries.
```

Expense

```
Paid six hundred rupees toll.

Add lunch expense.

Show today's expenses.
```

Status

```
How much distance is left?

Read my notifications.

Do I have pending tasks?

What is my current trip status?
```

---

# Voice Reminders

The backend automatically generates spoken reminders.

Examples

```
Fuel entry is pending.

Expense entry is pending.

You have been driving continuously for six hours.

Please take a mandatory rest.

Your trip has been completed successfully.

Vehicle maintenance is due.

Insurance expires in seven days.
```

---

# Reminder API

```
GET /voice/reminders
```

Returns pending spoken reminders.

---

# Driver Conversation History

```
GET /voice/history
```

Returns

- Transcript
- Intent
- Response
- Timestamp

---

# Voice Settings

```
GET /voice/settings
```

Returns

- Preferred Language
- Speech Speed
- Voice Type
- Reminder Volume
- Wake Word Enabled

---

```
PATCH /voice/settings
```

Updates

Voice preferences.

---

# Voice Profiles

Future Support

Each driver may configure

- Preferred Language
- Preferred Voice
- Speech Rate
- Audio Volume

---

# Confidence Threshold

Confidence

```
>= 90%

Execute Automatically
```

Confidence

```
70–90%

Ask Confirmation
```

Confidence

```
<70%

Ask Driver To Repeat
```

---

# Error Handling

Common Errors

| Code | Description |
|------|-------------|
| VOICE_001 | Audio Not Detected |
| VOICE_002 | Speech Recognition Failed |
| VOICE_003 | Language Unsupported |
| VOICE_004 | Intent Not Recognized |
| VOICE_005 | Confidence Too Low |
| VOICE_006 | Voice Engine Offline |
| VOICE_007 | Audio Corrupted |

---

# Business Rules

Voice commands must never bypass normal authorization.

Every command undergoes:

1. Authentication
2. Authorization
3. Intent Validation
4. Business Rule Validation
5. Command Execution

---

# Security

Voice recordings should be optional.

Administrators may configure

- Store Audio
- Store Transcript
- Store Both
- Store Neither

Personally identifiable voice data should be handled according to organizational privacy policies.

---

# Permissions

| Endpoint | Admin | Fleet | Dispatcher | Driver | Analyst |
|----------|:----:|:------:|:----------:|:------:|:-------:|
| STT | ✅ | ❌ | ❌ | ✅ | ❌ |
| TTS | ✅ | ❌ | ❌ | ✅ | ❌ |
| Process Command | ❌ | ❌ | ❌ | ✅ | ❌ |
| History | Read | ❌ | ❌ | Self | ❌ |
| Voice Settings | Read | ❌ | ❌ | Self | ❌ |

---

# Audit Events

Log

- Voice Command
- Speech Recognition
- Intent Detection
- Reminder Played
- Voice Settings Updated

---

# Future Enhancements

Future versions may include:

- Wake Word Detection
- Continuous Listening Mode
- Driver Authentication by Voice
- Regional Accent Adaptation
- Offline Translation
- AI Conversation Memory
- Voice-guided Navigation
- Emergency Voice Commands

---

# Revision Policy

Any changes to the Voice API require updates to:

- API_CONTRACT.md
- VOICE_API.md
- VOICE_ASSISTANT.md
- DRIVER_APP.md
- BUSINESS_RULES.md

---

# End of Document