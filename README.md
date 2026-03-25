# 📝 Todo API

![CI](https://github.com/rhzain/ppl1-prak-tugas1/actions/workflows/ci.yml/badge.svg)
![Security](https://github.com/rhzain/ppl1-prak-tugas1/actions/workflows/security.yml/badge.svg)

## 1. Deskripsi Project

**API Manajemen Tugas Harian (To-Do List)** — RESTful API untuk membuat, membaca, memperbarui, dan menghapus tugas harian. Dibangun dengan **Node.js + Express.js**, dilengkapi unit test (Jest + Supertest), dikontainerisasi dengan **Docker**, dan diotomatisasi melalui **GitHub Actions** (CI & Security Scan).

---

## 2. Dokumentasi API

### Endpoint List

| Method   | Endpoint       | Deskripsi                 | Request Body                                      |
| -------- | -------------- | ------------------------- | ------------------------------------------------- |
| `GET`    | `/todos`       | Mengambil semua tugas     | —                                                 |
| `POST`   | `/todos`       | Menambah tugas baru       | `{ "title": "...", "description": "..." }`        |
| `PATCH`  | `/todos/:id`   | Mengupdate tugas (status) | `{ "completed": true }`                           |
| `DELETE` | `/todos/:id`   | Menghapus tugas           | —                                                 |

### Format Response

#### ✅ Success Response — `GET /todos`

```json
{
  "success": true,
  "data": [
    {
      "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "title": "Belajar Docker",
      "description": "Pelajari Dockerfile dan docker-compose",
      "completed": false,
      "createdAt": "2026-03-25T09:00:00.000Z"
    }
  ]
}
```

#### ✅ Success Response — `POST /todos` (201 Created)

```json
{
  "success": true,
  "data": {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "title": "Belajar Docker",
    "description": "Pelajari Dockerfile dan docker-compose",
    "completed": false,
    "createdAt": "2026-03-25T09:00:00.000Z"
  }
}
```

#### ✅ Success Response — `PATCH /todos/:id`

```json
{
  "success": true,
  "data": {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "title": "Belajar Docker",
    "description": "Pelajari Dockerfile dan docker-compose",
    "completed": true,
    "createdAt": "2026-03-25T09:00:00.000Z"
  }
}
```

#### ✅ Success Response — `DELETE /todos/:id`

```json
{
  "success": true,
  "message": "Todo deleted successfully",
  "data": {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "title": "Belajar Docker",
    "description": "Pelajari Dockerfile dan docker-compose",
    "completed": false,
    "createdAt": "2026-03-25T09:00:00.000Z"
  }
}
```

#### ❌ Error Response — `POST /todos` (400 Bad Request)

```json
{
  "success": false,
  "message": "Title is required and must be a non-empty string"
}
```

#### ❌ Error Response — `PATCH /todos/:id` atau `DELETE /todos/:id` (404 Not Found)

```json
{
  "success": false,
  "message": "Todo with id 'xyz' not found"
}
```

---

## 3. Panduan Instalasi (Docker)

### Menjalankan dengan Docker Compose

```bash
# Clone repository
git clone https://github.com/rhzain/ppl1-prak-tugas1.git
cd ppl1-prak-tugas1

# Build dan jalankan container
docker-compose up --build
```

### Port Mapping

| Host Port | Container Port | Keterangan                              |
| --------- | -------------- | --------------------------------------- |
| `8080`    | `3000`         | Akses API via `http://localhost:8080`   |

> Aplikasi Express berjalan di port `3000` di dalam container, dipetakan ke port `8080` di host machine.

### Detail Dockerfile

```dockerfile
FROM node:18-alpine     # Base image
WORKDIR /app            # Direktori kerja di dalam container
COPY package*.json ./   # Copy dependency manifest
RUN npm ci --production # Install dependencies (production only)
COPY . .                # Copy seluruh source code
EXPOSE 3000             # Dokumentasi port
CMD ["node", "src/server.js"]  # Perintah untuk menjalankan aplikasi
```

### Tanpa Docker

```bash
npm install
npm run dev    # development (auto-reload)
npm start      # production
```

API tersedia di **http://localhost:3000**.

---

## 4. Alur Kerja Git

### Branching Strategy — Feature Branch Flow

```
main ─────────────────────────── (produksi/stabil)
  └── develop ────────────────── (integrasi fitur)
        └── feature/todo-crud ── (pengembangan fitur)
```

| Branch              | Fungsi                              |
| ------------------- | ----------------------------------- |
| `main`              | Branch produksi/stabil              |
| `develop`           | Branch integrasi fitur              |
| `feature/todo-crud` | Branch pengembangan fungsi CRUD     |

### Conventional Commits — Bukti Penggunaan

```
bea1487 feat: add frontend GUI with modern dark theme
d6eae96 feat: implement todo CRUD API with tests, Docker, and CI/CD
```

Format yang digunakan mengikuti [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` — fitur baru
- `fix:` — perbaikan bug
- `docs:` — perubahan dokumentasi

---

## 5. Status Automasi (GitHub Actions)

### Workflow CI — Continuous Integration (`ci.yml`)

**Tujuan:** Menjalankan unit testing otomatis untuk memastikan kualitas kode.

| Item              | Detail                                           |
| ----------------- | ------------------------------------------------ |
| **Trigger**       | Push atau Pull Request ke `main` / `develop`     |
| **Runner**        | `ubuntu-latest`                                  |
| **Node Version**  | 18                                               |
| **Steps**         | Checkout → Setup Node.js → `npm ci` → `npm test` |

### Workflow CS — Continuous Security (`security.yml`)

**Tujuan:** Melakukan security scan pada dependency untuk mendeteksi kerentanan.

| Item              | Detail                                           |
| ----------------- | ------------------------------------------------ |
| **Trigger**       | Push atau Pull Request ke `main` / `develop`     |
| **Runner**        | `ubuntu-latest`                                  |
| **Node Version**  | 18                                               |
| **Steps**         | Checkout → Setup Node.js → `npm ci` → `npm audit --audit-level=high` |

### Badge Status

| Badge | Status |
| ----- | ------ |
| CI (Unit Test) | ![CI](https://github.com/rhzain/ppl1-prak-tugas1/actions/workflows/ci.yml/badge.svg) |
| Security Scan  | ![Security](https://github.com/rhzain/ppl1-prak-tugas1/actions/workflows/security.yml/badge.svg) |

Workflow files: `.github/workflows/ci.yml` dan `.github/workflows/security.yml`

---

## 🧪 Testing

```bash
npm test
```

Unit test menggunakan **Jest** + **Supertest**, mencakup seluruh operasi CRUD (10 test cases):
- GET: empty list, list with data
- POST: dengan title+description, tanpa description, tanpa title (400), title kosong (400)
- PATCH: update status, todo tidak ditemukan (404)
- DELETE: hapus todo, todo tidak ditemukan (404)
