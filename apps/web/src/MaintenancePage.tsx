import { FormEvent, useEffect, useMemo, useState } from "react";
import { NavBar } from "./NavBar";
import {
  MaintenanceTask,
  createMaintenanceTask,
  deleteMaintenanceTask,
  getMaintenanceTasks,
  updateMaintenanceTask,
} from "./api";

const initialTasks: MaintenanceTask[] = [];

type Filter = "all" | "upcoming" | "completed";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

export function MaintenancePage() {
  const [tasks, setTasks] = useState(initialTasks);
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [frequency, setFrequency] = useState("One time");
  const [filter, setFilter] = useState<Filter>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTasks() {
      try {
        const fetchedTasks = await getMaintenanceTasks();
        setTasks(fetchedTasks);
      } catch {
        setError("Failed to load maintenance tasks.");
      } finally {
        setIsLoading(false);
      }
    }

    loadTasks();
  }, []);

  const visibleTasks = useMemo(
    () =>
      tasks.filter((task) => {
        if (filter === "completed") return task.completed;
        if (filter === "upcoming") return !task.completed;
        return true;
      }),
    [filter, tasks],
  );

  const completedCount = tasks.filter((task) => task.completed).length;

  async function addTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim() || !dueDate) return;

    try {
      const createdTask = await createMaintenanceTask({
        title: title.trim(),
        dueDate,
        frequency,
      });
      setTasks((current) => [...current, createdTask]);
      setTitle("");
      setDueDate("");
      setFrequency("One time");
      setError(null);
    } catch {
      setError("Unable to save maintenance task.");
    }
  }

  async function toggleTask(id: number) {
    const task = tasks.find((task) => task.id === id);
    if (!task) return;

    try {
      const updatedTask = await updateMaintenanceTask({
        ...task,
        completed: !task.completed,
      });
      setTasks((current) =>
        current.map((existing) =>
          existing.id === id ? updatedTask : existing,
        ),
      );
      setError(null);
    } catch {
      setError("Unable to update maintenance task.");
    }
  }

  async function removeTask(id: number) {
    try {
      await deleteMaintenanceTask(id);
      setTasks((current) => current.filter((task) => task.id !== id));
      setError(null);
    } catch {
      setError("Unable to delete maintenance task.");
    }
  }

  return (
    <main className="min-h-screen bg-[#f6f7f2] px-4 pb-8 pt-24 text-[#172033] sm:px-6 lg:px-8 lg:pt-28">
      <NavBar />
      <div className="mx-auto w-full max-w-7xl">
        <header>
          <p className="text-sm font-semibold uppercase text-[#2f6f63]">HomeHub</p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Maintenance</h1>
          <p className="mt-3 max-w-2xl leading-7 text-[#4d5768]">
            Plan, schedule, and track the routine care that keeps your home running
            smoothly.
          </p>
        </header>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(18rem,1fr)]">
          <section className="rounded-lg border border-[#d7ded2] bg-white p-5 shadow-sm sm:p-6" aria-labelledby="maintenance-list-title">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 id="maintenance-list-title" className="text-xl font-bold">Care schedule</h2>
                <p className="mt-1 text-sm text-[#4d5768]">
                  {completedCount} of {tasks.length} tasks completed
                </p>
              </div>
              <div className="flex rounded-lg bg-[#eef1eb] p-1" aria-label="Filter maintenance tasks">
                {(["all", "upcoming", "completed"] as Filter[]).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setFilter(option)}
                    className={`rounded-md px-3 py-1.5 text-sm font-semibold capitalize transition-colors focus:outline-none focus:ring-2 focus:ring-[#2f6f63] ${filter === option ? "bg-white text-[#25584f] shadow-sm" : "text-[#647064] hover:text-[#25584f]"}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {isLoading ? (
              <p className="mt-6 rounded-lg bg-[#f6f7f2] p-5 text-center text-[#4d5768]">
                Loading maintenance tasks...
              </p>
            ) : visibleTasks.length ? (
              <ul className="mt-6 divide-y divide-[#e3e8df]">
                {visibleTasks.map((task) => (
                  <li key={task.id} className="flex items-start gap-3 py-4">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      aria-label={`Mark ${task.title} ${task.completed ? "upcoming" : "complete"}`}
                      className="mt-1 h-5 w-5 accent-[#2f6f63]"
                    />
                    <div className="min-w-0 flex-1">
                      <p className={`font-semibold ${task.completed ? "text-[#7b8478] line-through" : "text-[#172033]"}`}>{task.title}</p>
                      <p className="mt-1 text-sm text-[#4d5768]">
                        Due {formatDate(task.dueDate)} · {task.frequency}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeTask(task.id)}
                      className="rounded-md px-2 py-1 text-sm font-semibold text-[#8a3d35] hover:bg-[#f9ece9] focus:outline-none focus:ring-2 focus:ring-[#8a3d35]"
                      aria-label={`Delete ${task.title}`}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-6 rounded-lg bg-[#f6f7f2] p-5 text-center text-[#4d5768]">
                No tasks match this filter.
              </p>
            )}
          </section>

          <section className="h-fit rounded-lg border border-[#d7ded2] bg-white p-5 shadow-sm sm:p-6" aria-labelledby="add-maintenance-title">
            <h2 id="add-maintenance-title" className="text-xl font-bold">Plan maintenance</h2>
            {error ? (
              <div className="mt-5 rounded-lg bg-[#fde8e4] p-4 text-sm text-[#8a3d35]">
                {error}
              </div>
            ) : null}
            <form className="mt-5 space-y-4" onSubmit={addTask}>
              <label className="block text-sm font-semibold">
                Task
                <input
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  required
                  placeholder="e.g. Clean gutters"
                  className="mt-1.5 w-full rounded-md border border-[#bfc9bc] px-3 py-2 font-normal outline-none focus:border-[#2f6f63] focus:ring-2 focus:ring-[#2f6f63]/25"
                />
              </label>
              <label className="block text-sm font-semibold">
                Due date
                <input
                  type="date"
                  value={dueDate}
                  onChange={(event) => setDueDate(event.target.value)}
                  required
                  className="mt-1.5 w-full rounded-md border border-[#bfc9bc] px-3 py-2 font-normal outline-none focus:border-[#2f6f63] focus:ring-2 focus:ring-[#2f6f63]/25"
                />
              </label>
              <label className="block text-sm font-semibold">
                Repeat
                <select
                  value={frequency}
                  onChange={(event) => setFrequency(event.target.value)}
                  className="mt-1.5 w-full rounded-md border border-[#bfc9bc] bg-white px-3 py-2 font-normal outline-none focus:border-[#2f6f63] focus:ring-2 focus:ring-[#2f6f63]/25"
                >
                  <option>One time</option>
                  <option>Every month</option>
                  <option>Every 3 months</option>
                  <option>Every 6 months</option>
                  <option>Every year</option>
                </select>
              </label>
              <button type="submit" className="w-full rounded-md bg-[#2f6f63] px-4 py-2.5 font-semibold text-white shadow-sm hover:bg-[#25584f] focus:outline-none focus:ring-2 focus:ring-[#2f6f63] focus:ring-offset-2">
                Add to schedule
              </button>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}
