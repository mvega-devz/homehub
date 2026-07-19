import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NavBar } from "./NavBar";
import { getMaintenanceTasks, MaintenanceTask } from "./api";

const placeholderRegions = [
  {
    title: "Quick Actions",
    description: "Reserved for common homeowner shortcuts.",
    className: "",
  },
  {
    title: "Home Summary",
    description: "Reserved for the homeowner property overview.",
    className: "",
  },
  {
    title: "Upcoming Maintenance",
    description: "Reserved for scheduled home care tasks.",
    className: "",
  },
  {
    title: "Recent Expenses",
    description: "Reserved for recently tracked home spending.",
    className: "",
  },
  {
    title: "Active Projects",
    description: "Reserved for in-progress home improvement work.",
    className: "",
  },
];

export function DashboardLayout() {
  const [maintenanceTasks, setMaintenanceTasks] = useState<MaintenanceTask[]>([]);
  const [maintenanceLoading, setMaintenanceLoading] = useState(true);

  useEffect(() => {
    getMaintenanceTasks()
      .then((tasks) =>
        setMaintenanceTasks(
          tasks
            .filter((task) => !task.completed)
            .sort((first, second) => first.dueDate.localeCompare(second.dueDate))
            .slice(0, 3),
        ),
      )
      .catch(() => setMaintenanceTasks([]))
      .finally(() => setMaintenanceLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-[#f6f7f2] text-[#172033]">
      <NavBar />
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 pb-6 pt-24 sm:px-6 lg:px-8 lg:pb-8 lg:pt-28">
        <header className="border-b border-[#d7ded2] pb-6">
          <div>
            <p className="text-sm font-semibold uppercase text-[#2f6f63]">HomeHub</p>
            <h1 className="mt-2 text-3xl font-bold text-[#172033] sm:text-4xl">
              Dashboard
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#4d5768]">
              Welcome back. Here’s a quick place to jump into your home management tasks.
            </p>
          </div>
        </header>

        <section
          aria-label="Dashboard placeholders"
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {placeholderRegions.map((region) => (
            <article
              key={region.title}
              className={`min-h-40 rounded-lg border border-[#d7ded2] bg-white p-5 shadow-sm ${region.className}`}
            >
              <div className="flex h-full flex-col justify-between gap-8">
                <div>
                  <h2 className="text-lg font-semibold text-[#172033]">
                    {region.title}
                  </h2>
                  {region.title === "Upcoming Maintenance" ? (
                    <div className="mt-3">
                      {maintenanceLoading ? (
                        <p className="text-sm text-[#4d5768]">Loading scheduled care...</p>
                      ) : maintenanceTasks.length ? (
                        <ul className="divide-y divide-[#e3e8df]">
                          {maintenanceTasks.map((task) => (
                            <li key={task.id} className="py-2 first:pt-0">
                              <p className="text-sm font-semibold text-[#172033]">{task.title}</p>
                              <p className="mt-0.5 text-xs text-[#4d5768]">
                                Due {new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${task.dueDate}T00:00:00Z`))}
                              </p>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm leading-6 text-[#4d5768]">No upcoming maintenance tasks.</p>
                      )}
                      <Link to="/maintenance" className="mt-3 inline-flex text-sm font-semibold text-[#2f6f63] hover:underline focus:outline-none focus:ring-2 focus:ring-[#2f6f63]">
                        View maintenance schedule →
                      </Link>
                    </div>
                  ) : (
                    <p className="mt-3 text-sm leading-6 text-[#4d5768]">
                      {region.description}
                    </p>
                  )}
                </div>
                <div
                  className="h-2 w-full rounded-full bg-[#d7ded2]"
                  aria-hidden="true"
                />
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
