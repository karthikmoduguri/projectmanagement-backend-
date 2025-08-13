
# 🗂️ Project Workspace Management — Backend

A backend service for managing projects, their phases, and monitor/host collaboration. Built with Node.js, Express, and MongoDB, this system enables real-time phase tracking, deadline monitoring, and role-based access for different types of users.

---

## 📜 Table of Contents

* [About the Project](#about-the-project)
* [Features](#features)
* [Tech Stack](#tech-stack)
* [Backend Project Structure](#backend-project-structure)
* [Setup Instructions](#setup-instructions)
* [API Endpoints](#api-endpoints)
* [Future Enhancements](#future-enhancements)
* [Author](#author)

---

## 📖 About the Project

The **Project Workspace Management Backend** helps teams manage multiple projects with clearly defined phases.
Each project has a host who creates and manages it, and monitors who track progress.
The system supports real-time status updates for project phases and ensures that deadlines are met.
Monitors update phase completion, and the system automatically tracks whether the phase was completed early, on time, or delayed.

---

## ✨ Features

* **User Roles & Authentication**

  * Host login & Monitor login using username/password
  * Role-based access restrictions (Monitors cannot see all projects, Hosts can manage all assigned projects)

* **Project Management**

  * Create, update, delete projects (Host only)
  * Each project gets a **custom Project ID** for external reference
  * Send both MongoDB `_id` and custom Project ID to frontend

* **Phase Management**

  * Create, update, and track project phases linked by Project ID
  * Update phase status with completion date
  * Automatically check if completion is early, on time, or delayed
  * Store delay/early days count for each phase

* **Real-time Updates**

  * Integrated with **Socket.IO** for instant phase status change updates

* **Data Structure**

  * Project data contains an array of phases with:

    * `_id`, `name`, `status`, `isOnTime`, `deadline`, `completionDate`, `monitor`

---

## 🛠 Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **Authentication:** JWT (JSON Web Tokens)
* **Real-time:** Socket.IO
* **Environment Config:** dotenv
* **Security:** bcrypt for password hashing

---

## 📂 Backend Project Structure

```
backend/
├── controllers/           # Business logic for projects, users, phases
│   ├── authController.js
│   ├── projectController.js
│   └── phaseController.js
├── middleware/            # Auth middleware for role checking
│   └── authMiddleware.js
├── models/                # Mongoose schemas
│   ├── Project.js
│   ├── Phase.js
│   └── User.js
├── routes/                # Route definitions
│   ├── authRoutes.js
│   ├── projectRoutes.js
│   └── phaseRoutes.js
├── config/                # DB and environment setup
│   └── db.js
├── app.js                  # Express app setup
├── index.js                # Server start script
├── package.json
└── .env
```

---

## 🗂️ Routes Overview

* **authRoutes.js**

  * `POST /api/auth/login` – Login with username & password (JWT returned)

* **projectRoutes.js**

  * `POST /api/projects` – Create new project (Host only)
  * `GET /api/projects/:id` – Get project details (with phases array)
  * `GET /api/projects` – List all projects (Host only)

* **phaseRoutes.js**

  * `POST /api/phases` – Create a new phase linked to a project
  * `PATCH /api/phases/:id/status` – Update phase status and completion date

---

## 🛠 Setup Instructions

1. **Clone the repository**

   ```bash
   git clone <repo-url>
   cd backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set environment variables**

   ```
   MONGODB_URI=<your-mongodb-uri>
   JWT_SECRET=<your-secret>
   PORT=5000
   ```

4. **Run the server**

   ```bash
   npm run dev
   ```

---

## 🔗 API Endpoints (Key)

* `POST /api/auth/login` — User login
* `POST /api/projects` — Create project (Host only)
* `GET /api/projects/:id` — Get project details
* `POST /api/phases` — Create phase for project
* `PATCH /api/phases/:id/status` — Update phase status (Monitor updates)

---

## 🚀 Future Enhancements

* Host dashboard with analytics of all projects
* Export reports for project timelines and delays
* Email notifications for upcoming deadlines
* Phase comments and discussion threads

---

## 👨‍💻 Author
Karthik Moduguri
