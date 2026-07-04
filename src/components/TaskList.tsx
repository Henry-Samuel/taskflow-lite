"use client";

import { useCallback, useEffect, useState } from "react";

type Task = {
  id: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  dueAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const loadTasks = useCallback(async () => {
    const response = await fetch("/api/tasks");
    if (response.ok) {
      const data = (await response.json()) as Task[];
      setTasks(data);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const createTask = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) {
      return;
    }

    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: trimmed,
        description: description.trim() || null,
      }),
    });

    if (response.ok) {
      setTitle("");
      setDescription("");
      await loadTasks();
    }
  };

  return (
    <div className="space-y-6">
      <form
        onSubmit={createTask}
        className="space-y-3 rounded-lg border bg-white p-4 shadow-sm"
      >
        <h2 className="text-sm font-medium text-gray-700">New task</h2>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="What needs to be shipped?"
          className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-900"
          name="title"
        />
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Short context or acceptance criteria..."
          className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-900"
          name="description"
        />
        <button
          type="submit"
          className="rounded-md bg-gray-900 px-3 py-2 text-sm text-white hover:bg-gray-800"
        >
          Add task
        </button>
      </form>

      <ul className="space-y-3">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="rounded-lg border bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-gray-900">{task.title}</p>
                {task.description ? (
                  <p className="mt-1 text-xs text-gray-500">{task.description}</p>
                ) : null}
              </div>
              <span className="text-xs text-gray-500">{task.status}</span>
            </div>
          </li>
        ))}
        {tasks.length === 0 ? (
          <li className="text-sm text-gray-500">No tasks yet. Start above.</li>
        ) : null}
      </ul>
    </div>
  );
}
