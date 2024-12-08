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

## Design Choices: Why Split the Employee Table?

To enhance the application's scalability, maintainability, and future flexibility, the original `Employee` table was split into three distinct entities: **User**, **Company**, and **Employee**. Here's why this design is better:

### 1. Clear Separation of Concerns

Each entity is designed with a specific responsibility:

- **User**: Stores personal details like name and email.
- **Company**: Stores organizational details such as company name and address.
- **Employee**: Represents the employment relationship, including job-specific information like position and salary.

---

### 2. Reusability

The **User** entity can be reused across different contexts. For example, the same user structure can later represent customers, contractors, or vendors. This avoids duplication of personal data and increases system efficiency.

---

### 3. Scalability

By isolating company data into its own table, the system can easily scale to support multiple companies and employees. This structure is future-proof and ready for more complex business scenarios, such as users associated with multiple companies or freelancers.

---

### 4. Simplified Updates

Updates to user or company data are localized to their respective tables without affecting job-related details. For example:

- Changing a user’s email updates only the `User` entity.
- Modifying a company’s address updates only the `Company` entity.

---

### 5. Improved Query Performance

Queries targeting specific data (e.g., all users or all companies) are faster since they operate on smaller, focused tables. For example:

- Fetching user details does not require joining or scanning employee-specific data.

---

### 6. Historical Tracking

This design makes it easier to track changes independently:

- Maintain a history of user updates, like email changes.
- Track when a company’s details, such as address, are modified.

---

### 7. Flexibility for Future Features

The separation allows for easy introduction of new features, such as:

- Users associated with multiple companies in the future.
- Extending the `Employee` entity with additional job-specific fields.

---

### 8. Adherence to Database Normalization

Breaking the original table into logical entities eliminates data redundancy:

- Company details are not repeated across employee records.
- User details are not duplicated.

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

### **2. Fetch Employee By Id**

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

### **4. Update Employee**

**Endpoint**: `PUT /employees/:id`

#### Request Payload:

```json
{
  "position": "Senior Product Manager",
  "salary": 95000
}
```

#### Response:

```json
{
  "success": true,
  "message": "Employee updated successfully.",
  "employee": {
    "employeeId": "123e4567-e89b-12d3-a456-426614174001",
    "name": "Jane Smith",
    "emailId": "jane.smith@example.com",
    "position": "Senior Product Manager",
    "salary": 95000,
    "companyId": "company123"
  }
}
```

### **5. Request Time-Off**

**Endpoint**: `POST /time-off/request`

#### Request Payload:

```json
{
  "employeeId": "123e4567-e89b-12d3-a456-426614174001",
  "categoryId": 1,
  "startDate": "2024-12-10T09:00:00Z",
  "endDate": "2024-12-15T18:00:00Z"
}
```

#### Response:

```json
{
  "success": true,
  "message": "Time-off request created successfully."
}
```
