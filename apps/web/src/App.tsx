import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import { DashboardLayout } from "./DashboardLayout";

export function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardLayout />} />
      <Route
        path="/"
        element={
          <main className="grid min-h-screen place-items-center bg-[#f7f4ee] px-5 py-12 text-[#172033]">
            <section className="w-full max-w-3xl" aria-labelledby="homehub-title">
              <p className="mb-3 text-sm font-bold uppercase text-[#2f6f63]">HomeHub</p>
              <h1
                id="homehub-title"
                className="text-4xl font-bold leading-tight sm:text-6xl"
              >
                Manage your home with confidence.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[#4d5768]">
                HomeHub brings maintenance, projects, documents, and expenses into one
                organized workspace for homeowners.
              </p>
              <Link
                to="/dashboard"
                className="mt-8 inline-flex rounded-md bg-[#2f6f63] px-4 py-2 font-semibold text-white shadow-sm hover:bg-[#25584f] focus:outline-none focus:ring-2 focus:ring-[#2f6f63] focus:ring-offset-2"
              >
                Open dashboard
              </Link>
            </section>
          </main>
        }
      />
    </Routes>
  );
}
