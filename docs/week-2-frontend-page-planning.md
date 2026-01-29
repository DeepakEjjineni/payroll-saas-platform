# Week 2 – Frontend Page Planning & Role-Based UI Mapping

## Objective
Plan the frontend page structure and role-based UI access for the Payroll SaaS application to ensure a clean user experience and secure data visibility.

This planning phase ensures smooth frontend implementation and avoids UI rework during development.

---

## User Roles
The system supports two primary roles:

- **HR**
- **Employee**

Each role has access only to pages relevant to their responsibilities.

---

## Planned Frontend Pages

### 1. Login Page
**Access**
- HR
- Employee

**Purpose**
- Authenticate users
- Redirect users based on role after successful login

**APIs Required**
- `POST /api/auth/login`

---

### 2. HR Dashboard
**Access**
- HR only

**Purpose**
- Overview of employees, departments, and payroll status
- Entry point for HR operations

**APIs Required**
- `GET /api/employees`
- `GET /api/departments`
- `GET /api/payroll/month/{month}`

---

### 3. Employee Dashboard
**Access**
- Employee only

**Purpose**
- View personal attendance and payroll summary
- Entry point for employee-specific actions

**APIs Required**
- `GET /api/employees/{id}`
- `GET /api/attendance/{employeeId}`
- `GET /api/payroll/month/{month}`

---

### 4. Employee Management Page
**Access**
- HR only

**Purpose**
- Create, update, and deactivate employees
- Assign departments and roles

**APIs Required**
- `POST /api/employees`
- `PUT /api/employees/{id}`
- `DELETE /api/employees/{id}`

---

### 5. Department Management Page
**Access**
- HR only

**Purpose**
- Create and view departments

**APIs Required**
- `POST /api/departments`
- `GET /api/departments`

---

### 6. Attendance Page
**Access**
- Employee

**Purpose**
- Mark daily attendance
- View attendance history

**APIs Required**
- `POST /api/attendance/mark`
- `GET /api/attendance/{employeeId}`

---

### 7. Payroll View Page
**Access**
- HR
- Employee (self only)

**Purpose**
- View payroll details by month
- HR can view payroll for all employees
- Employees can view only their own payroll

**APIs Required**
- `GET /api/payroll/month/{month}`

---

## Role-Based UI Visibility Summary

| Page                  | HR | Employee |
|-----------------------|----|----------|
| Login                 | ✔  | ✔       |
| HR Dashboard          | ✔  | ✖       |
| Employee Dashboard    | ✖  | ✔       |
| Employee Management   | ✔  | ✖       |
| Department Management | ✔  | ✖       |
| Attendance            | ✖  | ✔       |
| Payroll View          | ✔  | ✔ (self)|

---

## Design Considerations
- UI rendering will be controlled using role-based checks on the frontend
- Backend authorization will act as the final security layer
- Pages are designed to be modular and reusable
- API usage is aligned with backend contracts to avoid mismatch

---

## Status
Frontend page structure and role-based UI mapping finalized for **Week 2**.  
No UI components or routing logic have been implemented at this stage.