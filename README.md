# Job Board API

A backend engineering project built to master SQL, TypeScript, Docker, WebSockets, and CI/CD.

---

## What Is This?

A REST API where companies post jobs, candidates apply, and admins view analytics. The domain is intentionally simple — the point is depth of implementation, not business logic complexity.

```
HTTP Request → Express Route → Repository → Raw SQL → PostgreSQL → Typed Response
```

Each layer has one job. Routes handle HTTP. Repositories handle SQL.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js 20 LTS |
| Language | TypeScript (strict mode) |
| Framework | Express 5 |
| Database | PostgreSQL 17 |
| DB Driver | pg (raw SQL, no ORM) |
| Migrations | node-pg-migrate |
| Containerisation | Docker + Docker Compose |
| CI/CD | GitHub Actions |
| Docs | Swagger / OpenAPI |

---

## Getting Started

### Prerequisites

- [Node.js 20 LTS](https://nodejs.org)
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Git](https://git-scm.com)

### 1. Clone the repo

```bash
git clone https://github.com/ujjwalbhatta/job-board-api.git
cd job-board-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env
```

`.env` contents:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=admin
DB_PASSWORD=secret
DB_NAME=job_board
PORT=3000
DATABASE_URL=postgres://admin:secret@localhost:5432/job_board
```

### 4. Start PostgreSQL with Docker

```bash
docker run --name job-board-db \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=secret \
  -e POSTGRES_DB=job_board \
  -p 5432:5432 \
  -v job-board-pgdata:/var/lib/postgresql/data \
  -d postgres:17
```

### 5. Run migrations

```bash
npm run db:migrate
```

### 6. Run in development

```bash
npm run dev
```

---

## Scripts

```bash
npm run dev                           # ts-node + nodemon, hot reload
npm run build                         # compile TypeScript → dist/
npm start                             # run compiled JS
npm run db:migrate                    # run pending migrations
npm run db:migrate:down               # roll back last migration
npm run db:migrate:create -- <name>   # create a new migration
```