# 🗂️ Taskflow Lite

A minimal, self-hosted task tracker built for focused weekly work. Create tasks, update status and priority, and follow progress from a clean dashboard.

**Author:** Henry Samuel  
**Contact:** henry.samuel@proton.me  
**License:** MIT

---

## About

**Taskflow Lite** is designed around a simple workflow: write down what needs to be done, track its state, and iterate without overhead. Instead of heavyweight project tools, it gives you a focused task model with status, priority, and a straightforward API.

This repo includes:
- Next.js 15 App Router backend with typed routes
- Prisma + SQLite for persistent local task storage
- Tailwind CSS styling for a clean workspace feel
- minimal API surface: list, create, update, and delete tasks

## Features

- 🚀 Next.js 15 App Router with TypeScript
- 🧠 Task status and priority tracking
- 💾 Local persistence with SQLite + Prisma
- 🎨 Tailwind CSS 4 UI
- 🛠 Clean API layer: `/api/tasks`
- 📦 Easy local setup with npm scripts

## Tech Stack

| Area | Choice |
|---|---|
| Framework | Next.js 15 |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Database | SQLite via Prisma |
| Runtime | Node.js |

## Project Structure

```
taskflow-lite/
├── prisma/
│   └── schema.prisma
├── public/
├── docs/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── tasks/
│   │   │       └── [id]/
│   │   │           └── route.ts
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── lib/
├── .env.example
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package.json
└── tsconfig.json
```

## Getting Started

```bash
# install dependencies
npm install

# create local SQLite database
npx prisma db push

# run dev server
npm run dev
```

Open `http://localhost:3000`.

## Environment

Copy `.env.example` to `.env` and set:

```env
DATABASE_URL="file:./dev.db"
NODE_ENV="development"
NEXT_PUBLIC_APP_NAME="Taskflow Lite"
NEXT_PUBLIC_DESCRIPTION="A minimal task manager for focused weekly work."
```

## API Reference

- `GET /api/tasks` — list all tasks
- `POST /api/tasks` — create a task
- `GET /api/tasks?id=` — task detail
- `PATCH /api/tasks` — update task
- `DELETE /api/tasks` — delete task

## Author

Henry Samuel
- GitHub: https://github.com/Henry-Samuel/taskflow-lite
- Repository: https://github.com/Henry-Samuel/taskflow-lite
- LinkedIn: https://www.linkedin.com/in/samuel-henry-372b71b5/
- Email: henry.samuel@proton.me
