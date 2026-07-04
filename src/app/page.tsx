import TaskList from "@/components/TaskList";

export default function Home() {
  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-gray-900">Taskflow Lite</h1>
        <p className="text-sm text-gray-500">
          Minimal task management for focused weekly delivery.
        </p>
      </div>
      <TaskList />
    </section>
  );
}
