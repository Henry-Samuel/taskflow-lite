# Taskflow Lite

Taskflow Lite is a minimal, self-hosted task tracker built for small weekly projects. It keeps things simple: create tasks, update status and priority, and follow along from a clean dashboard.

## Tech stack

- Next.js 15 App Router with TypeScript
- Tailwind CSS 4
- Prisma with SQLite
- shadcn/ui-style components

## Local setup

```bash
# Install dependencies
npm install

# Create a local SQLite database
npx prisma db push

# Run the app
npm run dev
```

Open http://localhost:3000.

## Environment

Use `.env` based on `.env.example`:

```
DATABASE_URL="file:./dev.db"
NODE_ENV="development"
NEXT_PUBLIC_APP_NAME="Taskflow Lite"
NEXT_PUBLIC_DESCRIPTION="A minimal task manager for focused weekly work."
```

## API

- `GET /api/tasks` — list all tasks
- `POST /api/tasks` — create a task
- `GET /api/tasks?id=` — task detail shape
- `PATCH /api/tasks` — placeholder wrapper
- `DELETE /api/tasks` — placeholder wrapper

## Repo

https://github.com/omkumar0101/taskflow-lite
