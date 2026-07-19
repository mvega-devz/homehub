import { FormEvent, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function AuthShell({ children, title, description }: { children: React.ReactNode; title: string; description: string }) {
  return (
    <main className="grid min-h-screen place-items-center bg-[#f6f7f2] px-4 py-10 text-[#172033]">
      <section className="w-full max-w-md rounded-xl border border-[#d7ded2] bg-white p-6 shadow-sm sm:p-8">
        <Link to="/" className="text-sm font-bold uppercase text-[#2f6f63]">HomeHub</Link>
        <h1 className="mt-4 text-3xl font-bold">{title}</h1>
        <p className="mt-2 leading-6 text-[#4d5768]">{description}</p>
        {children}
      </section>
    </main>
  );
}

const inputClass = "mt-1.5 w-full rounded-md border border-[#bfc9bc] px-3 py-2 outline-none focus:border-[#2f6f63] focus:ring-2 focus:ring-[#2f6f63]/25";

export function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const destination = (location.state as { from?: string } | null)?.from ?? "/dashboard";

  if (user) return <Navigate to="/dashboard" replace />;

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (login(username, password)) navigate(destination, { replace: true });
    else setError("Incorrect username or password.");
  }

  return (
    <AuthShell title="Welcome back" description="Sign in to manage your home.">
      <form onSubmit={submit} className="mt-6 space-y-4">
        {error && <p role="alert" className="rounded-md bg-[#f9ece9] p-3 text-sm text-[#8a3d35]">{error}</p>}
        <label className="block text-sm font-semibold">Username<input className={inputClass} autoComplete="username" required value={username} onChange={(event) => setUsername(event.target.value)} /></label>
        <label className="block text-sm font-semibold">Password<input className={inputClass} type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} /></label>
        <button className="w-full rounded-md bg-[#2f6f63] px-4 py-2.5 font-semibold text-white hover:bg-[#25584f] focus:outline-none focus:ring-2 focus:ring-[#2f6f63] focus:ring-offset-2" type="submit">Sign in</button>
      </form>
      <p className="mt-5 text-center text-sm text-[#4d5768]">Need an account? <Link className="font-semibold text-[#2f6f63] underline" to="/register">Create account</Link></p>
    </AuthShell>
  );
}

export function RegisterPage() {
  const { user, register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: "", email: "", username: "", password: "" });
  const [error, setError] = useState("");
  if (user) return <Navigate to="/dashboard" replace />;

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = register(form);
    if (!result.success) setError(result.message ?? "Account could not be created.");
    else navigate("/login", { replace: true, state: { accountCreated: true } });
  }

  function update(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  return (
    <AuthShell title="Create your account" description="Set up your HomeHub access.">
      <form onSubmit={submit} className="mt-6 space-y-4">
        {error && <p role="alert" className="rounded-md bg-[#f9ece9] p-3 text-sm text-[#8a3d35]">{error}</p>}
        <label className="block text-sm font-semibold">Full name<input className={inputClass} autoComplete="name" required value={form.fullName} onChange={(event) => update("fullName", event.target.value)} /></label>
        <label className="block text-sm font-semibold">Email<input className={inputClass} type="email" autoComplete="email" required value={form.email} onChange={(event) => update("email", event.target.value)} /></label>
        <label className="block text-sm font-semibold">Username<input className={inputClass} autoComplete="username" minLength={3} required value={form.username} onChange={(event) => update("username", event.target.value)} /></label>
        <label className="block text-sm font-semibold">Password<input className={inputClass} type="password" autoComplete="new-password" minLength={4} required value={form.password} onChange={(event) => update("password", event.target.value)} /></label>
        <button className="w-full rounded-md bg-[#2f6f63] px-4 py-2.5 font-semibold text-white hover:bg-[#25584f] focus:outline-none focus:ring-2 focus:ring-[#2f6f63] focus:ring-offset-2" type="submit">Create account</button>
      </form>
      <p className="mt-5 text-center text-sm text-[#4d5768]">Already registered? <Link className="font-semibold text-[#2f6f63] underline" to="/login">Sign in</Link></p>
    </AuthShell>
  );
}
