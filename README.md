# 📝 Todo API

![CI](https://github.com/<username>/<repo>/actions/workflows/ci.yml/badge.svg)
![Security](https://github.com/<username>/<repo>/actions/workflows/security.yml/badge.svg)

RESTful API for managing daily to-do tasks, built with **Express.js** and containerized with **Docker**.

> **Note:** Replace `<username>/<repo>` in the badge URLs above with your actual GitHub username and repository name.

---

## 🚀 Quick Start (Docker)

```bash
# Clone the repository
git clone https://github.com/<username>/<repo>.git
cd <repo>

# Build and run with Docker Compose
docker-compose up --build
```

The API will be available at **http://localhost:8080**.

### Without Docker

```bash
npm install
npm run dev    # development with auto-reload
npm start      # production
```

The API will be available at **http://localhost:3000**.

---

## 📡 API Endpoints

| Method   | Endpoint       | Description          | Request Body                   |
| -------- | -------------- | -------------------- | ------------------------------ |
| `GET`    | `/todos`       | Get all todos        | —                              |
| `POST`   | `/todos`       | Create a new todo    | `{ "title": "...", "description": "..." }` |
| `PATCH`  | `/todos/:id`   | Update a todo        | `{ "completed": true }`       |
| `DELETE` | `/todos/:id`   | Delete a todo        | —                              |

### Response Format

All responses follow a consistent JSON structure:

```json
// Success
{ "success": true, "data": { ... } }

// Error
{ "success": false, "message": "Error description" }
```

---

## 🧪 Testing

```bash
npm test
```

Unit tests use **Jest** + **Supertest** and cover all CRUD operations.

---

## 🐳 Docker

| File                | Purpose                              |
| ------------------- | ------------------------------------ |
| `Dockerfile`        | Container image definition           |
| `docker-compose.yml`| One-command orchestration (`8080:3000`) |
| `.dockerignore`     | Excludes `node_modules`, `.git`, etc. |

---

## 🔄 Git Workflow

This project uses **Feature Branch Flow**:

- `main` — stable production branch
- `develop` — integration branch
- `feature/*` — individual feature branches (e.g., `feature/todo-crud`)

### Commit Convention

Follows [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: implement todo schema
fix: handle empty title on post
docs: update README with endpoints
```

---

## ⚙️ CI/CD (GitHub Actions)

| Workflow       | Trigger                          | Action                          |
| -------------- | -------------------------------- | ------------------------------- |
| **CI**         | Push/PR to `main` or `develop`   | Install → Test (`npm test`)     |
| **Security**   | Push/PR to `main` or `develop`   | `npm audit --audit-level=high`  |

Workflow files are located in `.github/workflows/`.
