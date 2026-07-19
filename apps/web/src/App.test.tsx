import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { App } from "./App";

function renderApp(route: string) {
  if (!["/", "/login", "/register"].includes(route)) {
    localStorage.setItem("homehub-session", JSON.stringify({ fullName: "HomeHub Administrator", email: "admin@homehub.local", username: "admin" }));
  }
  return render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>,
  );
}

describe("App routes", () => {
  beforeEach(() => localStorage.clear());

  it("renders the dashboard layout at /dashboard", () => {
    renderApp("/dashboard");

    expect(
      screen.getByRole("heading", { level: 1, name: "Dashboard" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: "Dashboard placeholders" }),
    ).toBeInTheDocument();

    for (const name of [
      "Quick Actions",
      "Home Summary",
      "Upcoming Maintenance",
      "Recent Expenses",
      "Active Projects",
    ]) {
      expect(screen.getByRole("heading", { level: 2, name })).toBeInTheDocument();
    }
  });

  it("keeps the existing HomeHub landing route available", () => {
    renderApp("/");

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Manage your home with confidence.",
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Sign in" })).toHaveAttribute(
      "href",
      "/login",
    );
  });

  it.each([
    ["Maintenance", "/maintenance"],
    ["Expenses", "/expenses"],
    ["Projects", "/projects"],
  ])("links %s to its corresponding page", (name, path) => {
    renderApp("/dashboard");

    expect(screen.getByRole("link", { name })).toHaveAttribute("href", path);
  });

  it.each([
    ["Expenses", "/expenses"],
    ["Projects", "/projects"],
  ])("renders the %s page", (name, path) => {
    renderApp(path);

    expect(screen.getByRole("heading", { level: 1, name })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Main navigation" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /back to dashboard/i })).toHaveAttribute(
      "href",
      "/dashboard",
    );
  });

  it("plans and tracks scheduled maintenance", async () => {
    const createdTask = { id: 3, title: "Clean gutters", dueDate: "2026-09-12", frequency: "Every 6 months", completed: false };
    vi.stubGlobal("fetch", vi.fn()
      .mockResolvedValueOnce({ ok: true, json: async () => [] })
      .mockResolvedValueOnce({ ok: true, json: async () => createdTask })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ ...createdTask, completed: true }) }));
    renderApp("/maintenance");

    await screen.findByText("No tasks match this filter.");

    fireEvent.change(screen.getByLabelText("Task"), {
      target: { value: "Clean gutters" },
    });
    fireEvent.change(screen.getByLabelText("Due date"), {
      target: { value: "2026-09-12" },
    });
    fireEvent.change(screen.getByLabelText("Repeat"), {
      target: { value: "Every 6 months" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Add to schedule" }));

    expect(await screen.findByText("Clean gutters")).toBeInTheDocument();
    expect(screen.getByText(/Sep 12, 2026 · Every 6 months/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("checkbox", { name: "Mark Clean gutters complete" }));
    expect(await screen.findByText("1 of 1 tasks completed")).toBeInTheDocument();
    vi.unstubAllGlobals();
  });

  it("shows upcoming maintenance tasks on the dashboard", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [
        { id: 1, title: "Completed task", dueDate: "2026-07-01", frequency: "One time", completed: true },
        { id: 2, title: "Clean gutters", dueDate: "2026-09-12", frequency: "Every 6 months", completed: false },
      ],
    }));
    renderApp("/dashboard");

    expect(await screen.findByText("Clean gutters")).toBeInTheDocument();
    expect(screen.queryByText("Completed task")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /view maintenance schedule/i })).toHaveAttribute("href", "/maintenance");
    vi.unstubAllGlobals();
  });

  it("opens notifications from the navbar bell", () => {
    const view = renderApp("/dashboard");

    expect(screen.queryByRole("menu", { name: "Notifications menu" })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Notifications, 2 unread" }));
    expect(screen.getByRole("menu", { name: "Notifications menu" })).toBeInTheDocument();
    expect(screen.getByText("Maintenance reminder")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("menuitem", { name: /Maintenance reminder/ }));
    expect(screen.getByRole("button", { name: "Notifications, 1 unread" })).toBeInTheDocument();

    view.unmount();
    renderApp("/dashboard");
    expect(screen.getByRole("button", { name: "Notifications, 1 unread" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Notifications, 1 unread" }));
    fireEvent.click(screen.getByRole("button", { name: "Mark all read" }));
    expect(screen.getByRole("button", { name: "Notifications" })).toBeInTheDocument();
  });

  it("signs in with the default admin account", () => {
    renderApp("/login");
    fireEvent.change(screen.getByLabelText("Username"), { target: { value: "admin" } });
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "admin" } });
    fireEvent.click(screen.getByRole("button", { name: "Sign in" }));

    expect(screen.getByRole("heading", { level: 1, name: "Dashboard" })).toBeInTheDocument();
    const profileButton = screen.getByRole("button", { name: "Open profile menu for HomeHub Administrator" });
    expect(screen.queryByRole("menu", { name: "Profile menu" })).not.toBeInTheDocument();
    fireEvent.click(profileButton);
    expect(screen.getByRole("menu", { name: "Profile menu" })).toBeInTheDocument();
    expect(screen.getByText("admin@homehub.local")).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "Sign out" })).toBeInTheDocument();
  });

  it("creates a new account that can sign in", () => {
    renderApp("/register");
    fireEvent.change(screen.getByLabelText("Full name"), { target: { value: "Jamie Homeowner" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "jamie@example.com" } });
    fireEvent.change(screen.getByLabelText("Username"), { target: { value: "jamie" } });
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "house123" } });
    fireEvent.click(screen.getByRole("button", { name: "Create account" }));

    fireEvent.change(screen.getByLabelText("Username"), { target: { value: "jamie" } });
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "house123" } });
    fireEvent.click(screen.getByRole("button", { name: "Sign in" }));
    expect(screen.getByRole("heading", { level: 1, name: "Dashboard" })).toBeInTheDocument();
  });
});
