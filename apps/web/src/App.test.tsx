import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { App } from "./App";

function renderApp(route: string) {
  render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>,
  );
}

describe("App routes", () => {
  it("renders the dashboard layout at /dashboard", () => {
    renderApp("/dashboard");

    expect(
      screen.getByRole("heading", { level: 1, name: "Dashboard" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: "Dashboard placeholders" }),
    ).toBeInTheDocument();

    for (const name of [
      "Welcome",
      "Quick Actions",
      "Home Summary",
      "Upcoming Maintenance",
      "Recent Expenses",
      "Active Projects",
      "Notifications",
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
    expect(screen.getByRole("link", { name: "Open dashboard" })).toHaveAttribute(
      "href",
      "/dashboard",
    );
  });
});
