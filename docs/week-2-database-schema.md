# Week 2 – Database Schema Design (Payroll SaaS)

## Objective
Design a normalized relational database schema for a Payroll SaaS system to support employees, departments, attendance tracking, and payroll processing.

The schema is designed to be **scalable, consistent, and data-driven**, ensuring minimal changes during backend implementation.

---

## Core Entities Overview
The payroll system revolves around the following core entities:

- Clients  
- Departments  
- Employees  
- Attendance  
- Payroll  

Relationships are defined using **primary keys and foreign keys** to maintain data integrity.

---

## 1. Clients
Represents organizations using the payroll SaaS platform.

### Purpose
- Enables multi-tenant SaaS architecture
- Isolates payroll data per client

### Columns
- `id` (PK)
- `name`
- `email`
- `created_at`

### Relationships
- One client → many departments
- One client → many employees

---

## 2. Departments
Represents departments within a client organization.

### Purpose
- Logical grouping of employees
- Supports reporting and payroll segregation

### Columns
- `id` (PK)
- `client_id` (FK → Clients.id)
- `name`
- `created_at`

### Relationships
- One department → many employees
- Belongs to one client

---

## 3. Employees
Stores employee profile and salary-related information.

### Purpose
- Core entity for payroll computation
- Links attendance and payroll records

### Columns
- `id` (PK)
- `client_id` (FK → Clients.id)
- `department_id` (FK → Departments.id)
- `name`
- `email` (unique)
- `role` (HR / Employee)
- `base_salary`
- `date_of_joining`
- `status` (active / inactive)
- `created_at`

### Relationships
- One employee → many attendance records
- One employee → many payroll records

---

## 4. Attendance
Tracks daily attendance for employees.

### Purpose
- Drives payroll calculations
- Supports deduction logic

### Columns
- `id` (PK)
- `employee_id` (FK → Employees.id)
- `date`
- `status` (Present / Absent / Leave)
- `created_at`

### Relationships
- Many attendance records → one employee

---

## 5. Payroll
Stores generated payroll details for employees.

### Purpose
- Maintains payroll history
- Prevents recalculation for previous months

### Columns
- `id` (PK)
- `employee_id` (FK → Employees.id)
- `month`
- `year`
- `gross_salary`
- `deductions`
- `net_salary`
- `generated_at`

### Relationships
- Many payroll records → one employee

---

## Entity Relationship Summary
- Client → Department (One-to-Many)
- Client → Employee (One-to-Many)
- Department → Employee (One-to-Many)
- Employee → Attendance (One-to-Many)
- Employee → Payroll (One-to-Many)

---

## Design Considerations
- Schema follows normalization principles to avoid redundancy
- Payroll data is stored separately to preserve historical accuracy
- Attendance is decoupled from payroll for flexible calculation rules
- Role information is stored at the employee level to support authorization

---

## Status
Database schema design completed for **Week 2**.  
No physical tables or migrations have been executed at this stage.