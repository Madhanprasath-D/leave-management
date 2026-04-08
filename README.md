# 🗓️ Leave Management System

A full-stack employee leave management application built with **React + TypeScript** on the frontend and **Node.js + Express** on the backend, using **PostgreSQL** as the database.

---


# 🗓️ Test credentials
- [ ] To login as MANAGER -> admin@gmail.com / admin@123
- [ ] To login as USER 1 -> madhan@gmail.com / madhan@14
- [ ] To login as USER 2 -> prasath@gmail.com / prasath@14

---

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

##  TIME Limitations / TODOs

- [ ] Forgot password flow (UI placeholder exists, not implemented)
- [ ] Admin seed password should be pre-hashed
- [ ] Add input validation on the server (e.g. with `zod` or `express-validator`)
- [ ] Add pagination for leave history and member list
- [ ] Write unit and integration tests

---

## 👤 Author

**Madhanprasath D**  
