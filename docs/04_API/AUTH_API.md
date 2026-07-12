# TransitOps Authentication API

Version: 1.0

Status: API Specification Freeze

Last Updated: YYYY-MM-DD

---

# Purpose

This document specifies every Authentication and Authorization endpoint used by TransitOps.

The Authentication module is responsible for:

- User Login
- JWT Authentication
- Refresh Tokens
- User Session Management
- Password Management
- User Profile
- Logout

No other module should implement authentication independently.

---

# Base URL

```
/api/v1/auth
```

---

# Authentication Flow

```
User Login

↓

Credential Validation

↓

Password Verification

↓

JWT Generation

↓

Refresh Token Generation

↓

Session Created

↓

Authenticated User
```

---

# JWT Structure

Access Token

Purpose

- API Authentication

Validity

```
15 Minutes
```

Refresh Token

Purpose

- Generate new access token

Validity

```
7 Days
```

These values should be configurable.

---

# Endpoints

---

# Login

## Endpoint

```
POST /auth/login
```

Purpose

Authenticate a user.

Authentication

Not Required

---

### Request Body

```json
{
  "email": "admin@transitops.local",
  "password": "password"
}
```

---

### Validation

Email

- Required
- Valid email format

Password

- Required
- Minimum length

---

### Success Response

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "",
    "refreshToken": "",
    "expiresIn": 900,
    "user": {
      "userId": "",
      "name": "",
      "email": "",
      "role": "Administrator"
    }
  }
}
```

---

### Errors

400

Validation Failed

401

Invalid Credentials

423

User Disabled

500

Internal Server Error

---

# Refresh Token

## Endpoint

```
POST /auth/refresh
```

Authentication

Refresh Token Required

---

### Request

```json
{
  "refreshToken": ""
}
```

---

### Response

```json
{
  "success": true,
  "data": {
    "accessToken": "",
    "expiresIn": 900
  }
}
```

---

# Logout

## Endpoint

```
POST /auth/logout
```

Authentication

JWT Required

---

### Purpose

Invalidate current session.

---

### Response

```json
{
  "success": true,
  "message": "Logged out successfully."
}
```

---

# Get Current User

## Endpoint

```
GET /auth/me
```

Authentication

JWT Required

---

### Response

```json
{
  "success": true,
  "data": {
    "userId": "",
    "name": "",
    "email": "",
    "role": "",
    "permissions": []
  }
}
```

---

# Change Password

## Endpoint

```
POST /auth/change-password
```

Authentication

JWT Required

---

### Request

```json
{
  "currentPassword": "",
  "newPassword": "",
  "confirmPassword": ""
}
```

---

### Validation

- Current password must match.
- New password must satisfy password policy.
- Confirmation password must match.

---

### Success Response

```json
{
  "success": true,
  "message": "Password changed successfully."
}
```

---

# Forgot Password

## Endpoint

```
POST /auth/forgot-password
```

Authentication

Not Required

---

### Request

```json
{
  "email": "user@example.com"
}
```

---

### MVP Behavior

For the local-first MVP, this endpoint generates a password reset token.

Email delivery is optional and should be configurable.

---

### Future Enhancement

- Email reset links
- OTP verification
- MFA

---

# Reset Password

## Endpoint

```
POST /auth/reset-password
```

---

### Request

```json
{
  "resetToken": "",
  "newPassword": "",
  "confirmPassword": ""
}
```

---

# Validate Session

## Endpoint

```
GET /auth/validate
```

Purpose

Verify JWT validity.

---

### Response

```json
{
  "success": true,
  "data": {
    "authenticated": true,
    "expiresAt": ""
  }
}
```

---

# Session Information

## Endpoint

```
GET /auth/session
```

Returns

- Login Time
- Last Activity
- User Role
- Session Expiry

---

# Business Rules

Authentication follows the following rules.

---

## AUTH-001

Only active users may authenticate.

---

## AUTH-002

Passwords are stored only as bcrypt hashes.

---

## AUTH-003

JWT Secret must never be stored in source code.

---

## AUTH-004

Refresh tokens should be revocable.

---

## AUTH-005

Changing password invalidates all active sessions.

---

## AUTH-006

Every login creates an audit log.

---

## AUTH-007

Logout invalidates the refresh token.

---

## AUTH-008

Only Administrators may create users.

---

# Password Policy

Minimum Length

```
8 Characters
```

Recommended

- Uppercase
- Lowercase
- Number
- Special Character

Password reuse prevention is recommended.

---

# Security Headers

Every authentication endpoint should support:

- HTTPS (Production)
- Secure Cookies (Future)
- CSRF Protection (Future)
- JWT Validation
- Rate Limiting (Future)

---

# Audit Events

The following actions generate audit logs.

- Login
- Logout
- Password Change
- Password Reset
- Token Refresh
- Session Expired

---

# Error Codes

| Code | Meaning |
|------|----------|
| AUTH_001 | Invalid Credentials |
| AUTH_002 | User Disabled |
| AUTH_003 | Token Expired |
| AUTH_004 | Invalid Refresh Token |
| AUTH_005 | Session Expired |
| AUTH_006 | Password Policy Failed |
| AUTH_007 | Unauthorized |
| AUTH_008 | Forbidden |

---

# Permissions

| Endpoint | Roles |
|----------|-------|
| Login | Public |
| Refresh | Public |
| Logout | All |
| Me | All |
| Change Password | All |
| Validate | All |
| Session | All |

---

# Future Enhancements

- Multi-Factor Authentication
- Single Sign-On
- OAuth Providers
- LDAP Authentication
- Active Directory Integration
- Biometric Authentication
- Hardware Security Keys

---

# Revision Policy

Changes to authentication require updates to:

- API_CONTRACT.md
- USER_ROLES.md
- BUSINESS_RULES.md
- Backend Authentication Module
- Frontend Authentication Flow

---

# End of Document