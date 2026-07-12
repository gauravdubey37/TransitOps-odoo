# TransitOps User Roles

Version: 1.0

Status: Role Definition Freeze

Last Updated: YYYY-MM-DD

---

# Purpose

This document defines all user roles within TransitOps, their responsibilities, permissions, and system access.

Every authenticated user must belong to exactly one primary role.

Role permissions are enforced by the Backend through Role-Based Access Control (RBAC).

---

# User Roles

TransitOps currently supports five primary user roles.

| Role | Description |
|------|-------------|
| Administrator | Complete system access |
| Fleet Manager | Fleet operations and monitoring |
| Dispatcher | Trip planning and assignment |
| Driver | Driver mobile/dashboard access |
| Analyst | Analytics and reporting |

Future roles may be introduced without affecting existing permissions.

---

# Permission Levels

Permissions are categorized into four levels.

| Level | Description |
|---------|------------|
| Read | View data |
| Create | Add new records |
| Update | Modify existing records |
| Delete | Remove or archive records |

Some modules also support:

- Approve
- Export
- Configure
- Assign

---

# Administrator

## Responsibilities

The Administrator manages the entire platform.

Responsibilities include:

- User Management
- Role Management
- System Configuration
- Security
- Database Configuration
- Backup & Restore
- Global Settings

---

## Administrator Permissions

### Users

✅ Create

✅ Read

✅ Update

✅ Delete

---

### Drivers

✅ Full Access

---

### Vehicles

✅ Full Access

---

### Trips

✅ Full Access

---

### Routes

✅ Full Access

---

### Maintenance

✅ Full Access

---

### Expenses

✅ Full Access

---

### Fuel

✅ Full Access

---

### Reports

✅ View

✅ Export

---

### Analytics

✅ Full Access

---

### Settings

✅ Full Access

---

# Fleet Manager

## Responsibilities

Fleet Managers supervise daily transport operations.

Responsibilities include:

- Driver Management
- Vehicle Management
- Trip Monitoring
- Maintenance Planning
- Cost Monitoring
- Operational KPIs

---

## Fleet Manager Permissions

### Drivers

✅ Create

✅ Read

✅ Update

❌ Delete

---

### Vehicles

✅ Create

✅ Read

✅ Update

❌ Delete

---

### Trips

✅ Create

✅ Assign

✅ Monitor

✅ Complete

---

### Routes

✅ Read

✅ Compare

---

### Reports

✅ View

✅ Export

---

### Analytics

✅ View

---

### System Settings

❌ No Access

---

# Dispatcher

## Responsibilities

Dispatchers coordinate transportation activities.

Responsibilities include:

- Trip Creation
- Driver Assignment
- Vehicle Assignment
- Route Selection
- Trip Monitoring

---

## Dispatcher Permissions

### Drivers

✅ Read

---

### Vehicles

✅ Read

---

### Trips

✅ Create

✅ Update

✅ Assign

---

### Routes

✅ Read

---

### Analytics

Read Only

---

### Reports

Read Only

---

### Settings

No Access

---

# Driver

## Responsibilities

Drivers interact only with their assigned trips.

Responsibilities include:

- View assigned trips
- Start trip
- Pause trip
- Resume trip
- Complete trip
- Log fuel
- Log expenses
- Upload documents
- Respond to notifications
- Use voice assistant

---

## Driver Permissions

### Dashboard

✅ Access

---

### Trips

Read Assigned Trips

Update Trip Status

---

### Fuel

Create Own Fuel Logs

View Own Logs

---

### Expenses

Create Own Expenses

View Own Expenses

---

### Allowances

View

Create

---

### Documents

Upload

View

---

### Notifications

Read

Acknowledge

---

### Analytics

No Access

---

### Other Drivers

No Access

---

### Other Vehicles

No Access

---

# Analyst

## Responsibilities

Analysts evaluate operational performance.

Responsibilities include:

- KPI Monitoring
- Analytics
- Reports
- Recommendations
- Trend Analysis

---

## Analyst Permissions

### Dashboard

Read

---

### Analytics

Full Access

---

### Reports

Generate

Export

---

### Drivers

Read Only

---

### Vehicles

Read Only

---

### Trips

Read Only

---

### Settings

No Access

---

# Module Permission Matrix

| Module | Admin | Fleet Manager | Dispatcher | Driver | Analyst |
|----------|:----:|:-------------:|:----------:|:------:|:-------:|
| Users | Full | None | None | None | None |
| Drivers | Full | Manage | Read | Self | Read |
| Vehicles | Full | Manage | Read | Assigned | Read |
| Trips | Full | Manage | Manage | Assigned | Read |
| Routes | Full | Read | Read | Assigned | Read |
| Fuel | Full | Manage | Read | Self | Read |
| Expenses | Full | Manage | Read | Self | Read |
| Maintenance | Full | Manage | Read | None | Read |
| Reports | Full | Export | Read | None | Export |
| Analytics | Full | Read | Read | None | Full |
| Notifications | Full | Read | Read | Read | Read |
| Settings | Full | None | None | None | None |

---

# Data Visibility Rules

## Administrator

Can view all organizational data.

---

## Fleet Manager

Can view all operational data within the assigned organization.

---

## Dispatcher

Can view operational data required for trip execution.

Cannot modify administrative settings.

---

## Driver

Can access only:

- Own profile
- Own trips
- Own expenses
- Own fuel logs
- Own notifications
- Own documents

Drivers must never access data belonging to another driver.

---

## Analyst

Can access analytics datasets but cannot modify operational records.

---

# Audit Requirements

The following actions must be audited.

- Login
- Logout
- User Creation
- Role Changes
- Driver Assignment
- Vehicle Assignment
- Trip Completion
- Maintenance Approval
- System Configuration Changes

Audit logs cannot be modified through the user interface.

---

# Future Roles

The system architecture should support future roles including:

- Regional Manager
- Workshop Manager
- Finance Officer
- Customer Support
- External Auditor
- Warehouse Manager
- Client Portal User

Adding future roles should not require changes to existing permission structures.

---

# Security Principles

- Least Privilege
- Role-Based Access
- No Shared Accounts
- Audit All Critical Operations
- Session Timeout
- Secure Authentication
- Permission Validation on Every API Request

---

# Role Management Rules

- Every user must have one primary role.
- Only Administrators may assign or change roles.
- Role changes must be recorded in audit logs.
- Permission changes take effect immediately after authentication refresh.

---

# Revision Policy

Changes to role definitions or permissions require updates to:

- BUSINESS_RULES.md
- API_CONTRACT.md (if applicable)
- Authentication Module
- Frontend Navigation (if applicable)

All changes must be reviewed before implementation.

---

End of Document