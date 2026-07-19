import "./App.css";
import { Link, Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { DashboardLayout } from "./DashboardLayout";
import { SectionPage } from "./SectionPage";
import { MaintenancePage } from "./MaintenancePage";
import { AuthProvider, useAuth } from "./AuthContext";
import { LoginPage, RegisterPage } from "./AuthPages";

function ProtectedRoute() {
  const { user } = useAuth();
  const location = useLocation();
  return user ? <Outlet /> : <Navigate to="/login" replace state={{ from: location.pathname }} />;
}

export function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />} />
          <Route path="/maintenance" element={<MaintenancePage />} />
          <Route path="/expenses" element={<SectionPage title="Expenses" description="Keep a clear record of home-related purchases, services, and recurring costs." />} />
          <Route path="/projects" element={<SectionPage title="Projects" description="Organize active improvements and follow their progress from idea to completion." />} />
        </Route>
        <Route path="/" element={
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
                to="/login"
                className="mt-8 inline-flex rounded-md bg-[#2f6f63] px-4 py-2 font-semibold text-white shadow-sm hover:bg-[#25584f] focus:outline-none focus:ring-2 focus:ring-[#2f6f63] focus:ring-offset-2"
              >
                Sign in
              </Link>
              <Link to="/register" className="ml-3 mt-8 inline-flex rounded-md px-4 py-2 font-semibold text-[#2f6f63] hover:bg-[#e8f0eb] focus:outline-none focus:ring-2 focus:ring-[#2f6f63]">Create account</Link>
            </section>
          </main>
        } />
      </Routes>
    </AuthProvider>
  );
}
