import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

const STATUS_VALUES = ["pending", "in_progress", "completed"];
const PRIORITY_VALUES = ["low", "medium", "high"];

function parseDate(value?: string | null): string | undefined {
  if (!value) return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  try {
    const date = new Date(trimmed);
    if (Number.isNaN(date.getTime())) return undefined;
    return date.toISOString();
  } catch {
    return undefined;
  }
}

function validateStatus(status: unknown) {
  if (typeof status !== "string" || !STATUS_VALUES.includes(status)) {
    return "pending";
  }
  return status;
}

function validatePriority(priority: unknown) {
  if (typeof priority !== "string" || !PRIORITY_VALUES.includes(priority)) {
    return "medium";
  }
  return priority;
}

const shapeTask = (task: {
  id: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  dueAt: string | null;
  createdAt: string;
  updatedAt: string;
}) => ({
  id: task.id,
  title: task.title,
  description: task.description,
  status: task.status,
  priority: task.priority,
  dueAt: task.dueAt,
  createdAt: task.createdAt,
  updatedAt: task.updatedAt,
});

export async function GET() {
  try {
    const tasks = await db.task.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(tasks.map(shapeTask));
  } catch (error) {
    console.error("Failed to list tasks", error);
    return NextResponse.json(
      { error: "Unable to load tasks." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const title =
      typeof body.title === "string" && body.title.trim().length > 0
        ? body.title.trim()
        : "Untitled task";
    const description =
      typeof body.description === "string" ? body.description.trim() : null;
    const status = validateStatus(body.status);
    const priority = validatePriority(body.priority);
    const dueAt = parseDate(body.dueAt ?? body.due_date ?? null);
    const now = parseDate(new Date().toISOString()) ?? new Date().toISOString();

    const task = await db.task.create({
      data: {
        title,
        description,
        status,
        priority,
        dueAt,
        createdAt: now,
        updatedAt: now,
      },
    });

    return NextResponse.json(shapeTask(task), { status: 201 });
  } catch (error) {
    console.error("Failed to create task", error);
    return NextResponse.json(
      { error: "Unable to create task." },
      { status: 500 }
    );
  }
}
