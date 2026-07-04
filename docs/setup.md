# Week 3 - Taskflow Lite notes

## What's wired

- SQLite-backed `Task` model via Prisma.
- `/api/tasks` list/creation route with minimal validation and CUID-style IDs.
- `/api/tasks/[id]` placeholder detail route.
- Minimal Next.js app shell using Tailwind 4.

## Launch checklist

```bash
npm install
npx prisma db push
npm run lint
npm run build
npm run dev
```

## Known gaps

- Shadcn components are scaffolded in structure, but only minimal UI is wired in this commit.
- The detail route is a placeholder; full PATCH/DELETE is planned for next week.
