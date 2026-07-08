const placeholderRegions = [
  {
    title: "Welcome",
    description: "Reserved for the homeowner greeting and daily context.",
    className: "lg:col-span-2",
  },
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
  {
    title: "Notifications",
    description: "Reserved for homeowner attention items.",
    className: "",
  },
];

export function DashboardLayout() {
  return (
    <main className="min-h-screen bg-[#f6f7f2] text-[#172033]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <header className="flex flex-col gap-4 border-b border-[#d7ded2] pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase text-[#2f6f63]">HomeHub</p>
            <h1 className="mt-2 text-3xl font-bold text-[#172033] sm:text-4xl">
              Dashboard
            </h1>
          </div>
          <nav aria-label="Dashboard sections">
            <ul className="flex flex-wrap gap-2 text-sm text-[#4d5768]">
              <li className="rounded-full bg-white px-3 py-1 shadow-sm ring-1 ring-[#d7ded2]">
                Maintenance
              </li>
              <li className="rounded-full bg-white px-3 py-1 shadow-sm ring-1 ring-[#d7ded2]">
                Expenses
              </li>
              <li className="rounded-full bg-white px-3 py-1 shadow-sm ring-1 ring-[#d7ded2]">
                Projects
              </li>
            </ul>
          </nav>
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
                  <p className="mt-3 text-sm leading-6 text-[#4d5768]">
                    {region.description}
                  </p>
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
