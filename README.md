# Employee & Time-Off Management System

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


## Features

- **Employee Management**: Add, update, and retrieve employee details.
- **Time-Off Management**: Request time-off with validation for overlapping leave requests.
- **Policy Engine**: Enforces custom time-off rules for categories.
- **Company Management**: Maintains company details and associations.
- **User Management**: Handles user data linked to employees.

---

## Core Modules

### **Employee Module**

Manages employee operations.

- **Controllers**: `EmployeeController`
- **Services**: `EmployeeService`
- **Repositories**: `EmployeeRepository`

### **TimeOff Module**

Handles time-off requests and policies.

- **Controllers**: `TimeOffController`
- **Services**: `TimeOffService`
- **Policy Engine**: `TimeOffPolicyEngine`
- **Repositories**: `TimeOffRequestRepository`, `TimeOffRulesRepository`

### **Company Module**

Stores and manages company details.

- **Repositories**: `CompanyRepository`

### **User Module**

Manages user information linked to employees.

- **Repositories**: `UserRepository`

---

## Database Design

### **Entities**

#### 1. User

- `userId`: Primary Key (UUID)
- `name`: String
- `emailId`: String (Unique)
- `createdAt`, `modifiedAt`: Timestamps

#### 2. Company

- `companyId`: Primary Key (UUID)
- `companyName`: String
- `address`: String

#### 3. Employee

- `employeeId`: Primary Key (UUID)
- `position`: String
- `salary`: Number
- Relationships: `One-to-One` with User, `One-to-Many` with Company

#### 4. TimeOffRequest

- `id`: Primary Key (Integer)
- `employeeId`: Foreign Key to Employee
- `requestCategoryId`: Foreign Key to RequestCategory
- `startDate`, `endDate`: Timestamps

#### 5. RequestCategory

- `id`: Primary Key (Integer)
- `name`: String

#### 6. TimeOffRule

- `id`: Primary Key (Integer)
- `categoryId`: Foreign Key to RequestCategory
- `canOverlapId`: Foreign Key to RequestCategory
- `isAllowed`: Boolean

---

## Seed Data

### Company

```sql
INSERT INTO company (company_name, address, created_at, modified_at)
VALUES
  ('Tech Corp', '123 Silicon Valley', now(), now()),
  ('Innovate Ltd.', '456 Tech Park', now(), now()),
  ('Future Solutions', '789 Innovation Drive', now(), now());
```

### RequestCategory

```sql
INSERT INTO request_category (name)
VALUES
  ('Annual Leave'),
  ('Sick Leave'),
  ('Work Remotely');
```

### TimeOffRule
```sql
INSERT INTO time_off_rule (category_id, can_overlap_id, is_allowed)
VALUES
  (1, 3, true),
  (2, 3, false);
```
## API Endpoints

### **1. Fetch All Employees**

**Endpoint**: `GET /employees`

#### Response:
```json
[
  {
    "employeeId": "123e4567-e89b-12d3-a456-426614174000",
    "name": "John Doe",
    "emailId": "john.doe@example.com",
    "position": "Software Engineer",
    "salary": 80000,
    "company": {
      "companyId": "company123",
      "companyName": "Tech Corp"
    }
  }
]
```

### **2. Fetch All Employees**

**Endpoint**: `GET /employees/:id`

#### Response:
```json
{
  "employeeId": "123e4567-e89b-12d3-a456-426614174000",
  "name": "John Doe",
  "emailId": "john.doe@example.com",
  "position": "Software Engineer",
  "salary": 80000,
  "company": {
    "companyId": "company123",
    "companyName": "Tech Corp"
  }
}
```

### **3. Create Employee**

**Endpoint**: `POST /employees`

#### Request Payload:
```json
{
  "name": "Jane Smith",
  "emailId": "jane.smith@example.com",
  "position": "Product Manager",
  "salary": 90000,
  "companyId": "company123"
}
```

#### Response:
```json
{
  "success": true,
  "message": "Employee created successfully.",
  "employee": {
    "employeeId": "123e4567-e89b-12d3-a456-426614174001",
    "name": "Jane Smith",
    "emailId": "jane.smith@example.com",
    "position": "Product Manager",
    "salary": 90000,
    "companyId": "company123"
  }
}
```
