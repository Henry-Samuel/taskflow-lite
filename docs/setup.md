# Setup

## Prerequisites

- Node.js >= 18
- npm >= 9
- SQLite available locally

## First run

```bash
cp .env.example .env
npm install
npx prisma db push
npm run lint
npm run build
npm run dev
```

Open `http://localhost:3000`.

## Project overview

- `/api/tasks` handles list, create, and update/delete operations.
- `/api/tasks/[id]` returns a single task.
- Client UI lives in `src/components/TaskList.tsx` and POSTs to `/api/tasks`.

## Development notes

- Run `npm run lint` before committing.
- Use `npx prisma db push --force-reset` only when you need to reinitialize local data.
