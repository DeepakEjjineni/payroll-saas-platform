# Week 2 – API Contracts & Authentication Planning

## Objective
Define clear backend API contracts and authentication/authorization strategy to ensure smooth frontend–backend integration and secure access control.

This planning phase prevents API redesign and security gaps during implementation.

---

## API Design Principles
- RESTful naming conventions
- Resource-based endpoints
- Clear separation of concerns
- Consistent success and error responses
- JWT-based authentication for protected routes

---

## Authentication APIs

### POST /api/auth/login
**Purpose**
Authenticate user and issue JWT token.

**Request Body**
- `email`
- `password`

**Success Response**
- `token` (JWT)
- `role` (HR / Employee)

**Error Scenarios**
- Invalid credentials
- Inactive user account

---

### POST /api/auth/logout
**Purpose**
Handle client-side logout (token invalidation handled on frontend).

**Notes**
- JWT remains stateless
- Token removal is handled by client

---

## Employee APIs

### POST /api/employees
**Purpose**
Create a new employee (HR only).

**Protected**
Yes (HR role)

**Error Scenarios**
- Duplicate email
- Unauthorized access

---

### GET /api/employees
**Purpose**
Fetch list of employees.

**Protected**
Yes  
- HR: all employees  
- Employee: self only

---

### GET /api/employees/{id}
**Purpose**
Fetch employee details by ID.

**Protected**
Yes

---

### PUT /api/employees/{id}
**Purpose**
Update employee details.

**Protected**
Yes (HR only)

---

### DELETE /api/employees/{id}
**Purpose**
Deactivate employee.

**Protected**
Yes (HR only)

---

## Department APIs

### POST /api/departments
**Purpose**
Create department.

**Protected**
Yes (HR only)

---

### GET /api/departments
**Purpose**
Fetch all departments.

**Protected**
Yes

---

## Attendance APIs

### POST /api/attendance/mark
**Purpose**
Mark daily attendance for an employee.

**Protected**
Yes (Employee)

**Error Scenarios**
- Duplicate attendance entry
- Invalid date

---

### GET /api/attendance/{employeeId}
**Purpose**
Fetch attendance history.

**Protected**
Yes

---

## Payroll APIs

### POST /api/payroll/generate
**Purpose**
Generate payroll for a given month.

**Protected**
Yes (HR only)

---

### GET /api/payroll/month/{month}
**Purpose**
Fetch payroll records for a specific month.

**Protected**
Yes  
- HR: all employees  
- Employee: self only

---

## Authentication Strategy

### Token Mechanism
- JWT-based authentication
- Token issued on successful login
- Token sent via `Authorization: Bearer <token>` header

---

### Authorization Strategy
Role-based access control using middleware.

**Roles**
- HR
- Employee

**Middleware Responsibilities**
- Validate JWT
- Extract user role
- Allow or deny access based on role

---

## Access Control Summary

| Role      | Access Scope |
|----------|-------------|
| HR       | Full access (employees, payroll, departments) |
| Employee | Self data, attendance, payroll view |

---

## Status
API contracts and authentication strategy finalized for **Week 2**.  
No API implementation has been done at this stage.