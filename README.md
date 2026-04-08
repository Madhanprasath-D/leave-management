#  Leave Management System

A full-stack employee leave management application built with **React + TypeScript** on the frontend and **Node.js + Express** on the backend, using **PostgreSQL** as the database.

---

#  Application Live Demo

- **lms app(frontend)** — [https://lms-1vq2.onrender.com/](https://lms-1vq2.onrender.com/)
- **lms app(backend)** — [https://leave-management-4dwy.onrender.com](https://leave-management-4dwy.onrender.com)

---


#  Test credentials
- [ ] To login as MANAGER -> admin@gmail.com / admin@123
- [ ] To login as USER 1 -> madhan@gmail.com / madhan@14
- [ ] To login as USER 2 -> prasath@gmail.com / prasath@14

---



---

##  Getting Started

### Prerequisites

- Node.js v18+
- PostgreSQL database (local or hosted, e.g. [Neon](https://neon.tech))

---

### 1. Clone the Repository

```bash
git clone https://github.com/Madhanprasath-D/leave-management.git
cd leave-management
```

---

### 2. Set Up the Database

Run the seed file against your PostgreSQL instance:

```bash
psql -U <your_user> -d <your_database> -f db/Seed.sql
```

This creates the `users` and `leaves` tables and inserts a default manager account.

> **Default Manager Account:**
> - Email: `admin@gmail.com`
> - Password: `admin@123`

>  **Important:** The seed file inserts the admin password as plain text. Before using in any environment, hash the password using bcrypt and update the record.

---

### 3. Configure the Server

Create a `.env` file inside the `server/` directory:

```env
DATABASE_URL=postgresql://<user>:<password>@<host>/<database>?sslmode=require
PORT=5005
JWT_SECRET=madhan
CORS=http://localhost:5004
```

---

### 4. Install & Run the Server

```bash
cd server
npm install
npm run dev       # Development (nodemon)
# or
npm start         # Production
```

Server runs on: `http://localhost:5005`

---

### 5. Install & Run the Client

Create a `.env` file inside the `client/` directory:

```env
VITE_API_URL="http://localhost:5005/api"
```

```bash
cd client
npm install
npm run dev
```

Client runs on: `http://localhost:5004`

---



##  Workflow & System Design

###  Current Architecture

The system currently follows a **single-tenant model**:

* One **Admin (Manager)**
* Multiple **Users (Employees)**
* All users are managed under a single organizational scope

---

###  Employee Workflow

1. **Authentication**

   * User logs in using email and password (JWT-based authentication)

2. **Apply Leave**

   * Select leave type (casual / sick / others)
   * Choose start and end dates
   * Provide a reason
   * System validates for **overlapping leave requests**

3. **Track Leave History**

   * View all past and current leave requests
   * Check status: `PENDING`, `APPROVED`, `REJECTED`

4. **Cancel Request**

   * Users can cancel **only pending requests**

---

###  Manager (Admin) Workflow

1. **Dashboard Overview**

   * View system-wide leave statistics

2. **Manage Leave Requests**

   * View all employee leave requests
   * Approve or reject requests
   * Add comments while taking action

3. **Team Visibility**

   * View all members
   * Check availability status:

     *  Available
     *  On Leave

4. **Audit & History**

   * Track all leave decisions and actions


##  Project Structure

```
leave-management/
├── client/          # React + TypeScript frontend (Vite)
├── server/          # Node.js + Express backend
└── db/              # SQL seed file
```

---

##  Features

- **Authentication** — Signup and login with JWT-based auth
- **Role-based access** — Separate views and permissions for `employee` and `manager`
- **Apply for Leave** — Employees can apply with leave type, dates, and reason
- **Leave History** — Employees can view and cancel their pending leaves
- **Admin Dashboard** — Managers can approve or reject leave requests with comments
- **Member Directory** — View team members and their current availability
- **Overlap Detection** — Prevents duplicate/overlapping leave applications

---

##  Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | React 19, TypeScript, Vite          |
| Styling    | Tailwind CSS, MUI Joy, PrimeReact   |
| HTTP Client| Axios                               |
| Backend    | Node.js, Express 5                  |
| Database   | PostgreSQL (via Neon)               |
| Auth       | JWT (jsonwebtoken), bcryptjs        |


##  API Endpoints

All protected routes require `Authorization: Bearer <token>` header.

### Auth
| Method | Endpoint         | Description        | Auth Required |
|--------|------------------|--------------------|---------------|
| POST   | /api/auth/login  | Login user         | No            |
| POST   | /api/auth/signup | Register new user  | No            |

### Leaves
| Method | Endpoint                   | Description              | Auth Required |
|--------|----------------------------|--------------------------|---------------|
| GET    | /api/leaves                | Get all leaves (manager) | Yes           |
| GET    | /api/leaves/:id            | Get leaves by user ID    | Yes           |
| POST   | /api/leaves/apply          | Apply for leave          | Yes           |
| PATCH  | /api/leaves/:id/update     | Approve/Reject leave     | Yes (manager) |
| DELETE | /api/leaves/:id/cancel     | Cancel pending leave     | Yes (employee)|

### Users
| Method | Endpoint       | Description            | Auth Required |
|--------|----------------|------------------------|---------------|
| GET    | /api/users     | Get all employees      | Yes (manager) |


### Meta
| Method | Endpoint   | Description             | Auth Required |
|--------|------------|-------------------------|---------------|
| GET    | /api/meta  | Get dashboard stats     | Yes           |

---

##  Database Schema

```sql
users (
  id, name, email, password, role, created_at
)

leaves (
  id, user_id, leave_type, start_date, end_date,
  reason, status, manager_comment, created_at
)
```

Roles: `employee`, `manager`  
Leave types: `casual`, `sick`, `others`  
Leave statuses: `PENDING`, `APPROVED`, `REJECTED`

---

---

###  Scalability: Multi-Tenant Extension (My Future-Ready Design due to time not able to work)

The current system can be extended to support a **multi-tenant architecture with minimal changes**.

####  Proposed Enhancements

* Introduce a **Team / Organization entity**
* Associate:

  * Users → `team_id`
  * Leaves → `team_id`
  * Admin → manages a specific team

####  Resulting Model

* Multiple **Admins (Managers)**
* Each admin manages their own **team**
* Each team has its own **isolated users and leave data**

####  Data Segregation

* Queries filtered by `team_id`
* Ensures:

  * Data isolation between teams
  * Better scalability for SaaS use cases

---

### 📈 Benefits of Multi-Tenant Upgrade

* Supports multiple organizations
* Enables SaaS deployment model
* Improves data isolation and security
* Minimal backend changes required:

  * Add `team_id` column
  * Update queries with filters
  * Adjust JWT payload (include team context)



## 👤 Author

**Madhanprasath D**  
