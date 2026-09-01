# Taskflow Lite

Minimal, self-hosted task tracker for focused weekly work. Create tasks, update status and priority, and follow progress from a clean dashboard.

- Next.js 15 App Router with TypeScript
- Prisma + SQLite for persistent local storage
- Tailwind CSS for a clean workspace feel

## Getting Started

```bash
git clone https://github.com/Henry-Samuel/taskflow-lite.git
cd taskflow-lite
npm install
npx prisma db push
npm run dev
```

Open `http://localhost:3000`.

See [docs/setup.md](docs/setup.md) for local prerequisites and environment setup.

## Environment

Copy `.env.example` to `.env` and set:

```env
DATABASE_URL="file:./dev.db"
NODE_ENV="development"
NEXT_PUBLIC_APP_NAME="Taskflow Lite"
NEXT_PUBLIC_DESCRIPTION="A minimal task manager for focused weekly work."
```

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

## API Reference

- `GET /api/tasks` — list all tasks
- `POST /api/tasks` — create a task
- `GET /api/tasks/[id]` — task detail
- `PATCH /api/tasks/[id]` — update task
- `DELETE /api/tasks/[id]` — delete task

## Author

Henry Samuel
- GitHub: https://github.com/Henry-Samuel/taskflow-lite
- LinkedIn: https://www.linkedin.com/in/samuel-henry-372b71b5/
- Email: henry.samuel@proton.me

Source and issue tracking: https://github.com/Henry-Samuel/taskflow-lite
