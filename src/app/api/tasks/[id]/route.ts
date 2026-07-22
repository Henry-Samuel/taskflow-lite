import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

function toId(input: unknown) {
  if (typeof input !== "string") return null;
  const trimmed = input.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const id = toId(params.id);

  if (!id) {
    return NextResponse.json(
      { error: "A valid task id is required." },
      { status: 400 }
    );
  }

  const task = await db.task.findUnique({
    where: { id },
  });

  if (!task) {
    return NextResponse.json({ error: "Task not found." }, { status: 404 });
  }

  return NextResponse.json({
    id: task.id,
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
    dueAt: task.dueAt,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
  });
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = toId(params.id);

  if (!id) {
    return NextResponse.json(
      { error: "A valid task id is required." },
      { status: 400 }
    );
  }

  let body: Record<string, unknown>;

  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  const title =
    typeof body.title === "string" && body.title.trim().length > 0
      ? body.title.trim()
      : null;
  const description =
    typeof body.description === "string" ? body.description.trim() : undefined;
  const status =
    typeof body.status === "string" &&
    ["pending", "in_progress", "completed"].includes(body.status)
      ? body.status
      : null;
  const priority =
    typeof body.priority === "string" &&
    ["low", "medium", "high"].includes(body.priority)
      ? body.priority
      : null;
  const dueAt =
    typeof body.dueAt === "string" && body.dueAt.trim().length > 0
      ? new Date(body.dueAt.trim()).toISOString()
      : undefined;
  const updatedAt = new Date().toISOString();

  const existing = await db.task.findUnique({ where: { id } });

  if (!existing) {
    return NextResponse.json({ error: "Task not found." }, { status: 404 });
  }

  const task = await db.task.update({
    where: { id },
    data: {
      ...(title ? { title } : {}),
      ...(description !== undefined ? { description } : {}),
      ...(status ? { status } : {}),
      ...(priority ? { priority } : {}),
      ...(dueAt ? { dueAt } : {}),
      updatedAt,
    },
  });

  return NextResponse.json({
    id: task.id,
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
    dueAt: task.dueAt,
    updatedAt: task.updatedAt,
  });
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const id = toId(params.id);

  if (!id) {
    return NextResponse.json(
      { error: "A valid task id is required." },
      { status: 400 }
    );
  }

  const existing = await db.task.findUnique({ where: { id } });

  if (!existing) {
    return NextResponse.json({ error: "Task not found." }, { status: 404 });
  }

  await db.task.delete({ where: { id } });

  return NextResponse.json({ deleted: true, id });
}
