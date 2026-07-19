import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "./AuthContext";

const sections = [
  { label: "Maintenance", path: "/maintenance" },
  { label: "Expenses", path: "/expenses" },
  { label: "Projects", path: "/projects" },
];

const initialNotifications = [
  { id: 1, title: "Maintenance reminder", message: "Check your upcoming home care schedule.", unread: true },
  { id: 2, title: "Welcome to HomeHub", message: "Your home dashboard is ready to use.", unread: true },
];

export function NavBar() {
  const { user, logout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const notificationsStorageKey = `homehub-read-notifications-${user?.username ?? "guest"}`;
  const [notifications, setNotifications] = useState(() => {
    let readIds: number[] = [];
    try {
      readIds = JSON.parse(localStorage.getItem(notificationsStorageKey) ?? "[]") as number[];
    } catch {
      readIds = [];
    }
    return initialNotifications.map((notification) => ({
      ...notification,
      unread: !readIds.includes(notification.id),
    }));
  });
  const unreadCount = notifications.filter((notification) => notification.unread).length;

  function updateNotifications(nextNotifications: typeof notifications) {
    setNotifications(nextNotifications);
    localStorage.setItem(
      notificationsStorageKey,
      JSON.stringify(
        nextNotifications
          .filter((notification) => !notification.unread)
          .map((notification) => notification.id),
      ),
    );
  }

  function markNotificationRead(id: number) {
    updateNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, unread: false } : notification,
      ),
    );
  }

  const initials = user?.fullName
    .split(" ")
    .map((name) => name[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <nav
      aria-label="Main navigation"
      className="fixed inset-x-0 top-0 z-50 border-b border-[#d7ded2] bg-[#f6f7f2]/95 shadow-sm backdrop-blur"
    >
      <div className="mx-auto flex min-h-16 w-full max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          to="/dashboard"
          className="rounded-md font-bold text-[#2f6f63] focus:outline-none focus:ring-2 focus:ring-[#2f6f63] focus:ring-offset-2"
        >
          HomeHub
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          <ul className="flex flex-wrap gap-2 text-sm text-[#4d5768]">
            {sections.map((section) => (
              <li key={section.path}>
                <NavLink
                  to={section.path}
                  className={({ isActive }) =>
                    `block rounded-full px-3 py-1 shadow-sm ring-1 transition-colors focus:outline-none focus:ring-2 focus:ring-[#2f6f63] focus:ring-offset-2 ${
                      isActive
                        ? "bg-[#2f6f63] text-white ring-[#2f6f63]"
                        : "bg-white ring-[#d7ded2] hover:bg-[#e8f0eb] hover:text-[#25584f]"
                    }`
                  }
                >
                  {section.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="relative">
            <button
              type="button"
              aria-expanded={notificationsOpen}
              aria-haspopup="menu"
              aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ""}`}
              onClick={() => {
                setNotificationsOpen((open) => !open);
                setProfileOpen(false);
              }}
              className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#4d5768] shadow-sm ring-1 ring-[#d7ded2] hover:bg-[#e8f0eb] hover:text-[#25584f] focus:outline-none focus:ring-2 focus:ring-[#2f6f63] focus:ring-offset-2"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.86 17.08a2.99 2.99 0 0 1-5.72 0m9.01-2.34c-1.05-1.15-1.65-2.66-1.65-4.22V9a4.5 4.5 0 0 0-9 0v1.52c0 1.56-.6 3.07-1.65 4.22L5 15.67h14l-.85-.93Z" />
              </svg>
              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#a4473d] px-1 text-[11px] font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </button>
            {notificationsOpen && (
              <div role="menu" aria-label="Notifications menu" className="absolute right-0 top-12 w-80 overflow-hidden rounded-lg border border-[#d7ded2] bg-white shadow-lg">
                <div className="flex items-center justify-between border-b border-[#e3e8df] px-4 py-3">
                  <p className="font-bold text-[#172033]">Notifications</p>
                  {unreadCount > 0 && (
                    <button type="button" onClick={() => updateNotifications(notifications.map((notification) => ({ ...notification, unread: false })))} className="text-xs font-semibold text-[#2f6f63] hover:underline focus:outline-none focus:ring-2 focus:ring-[#2f6f63]">
                      Mark all read
                    </button>
                  )}
                </div>
                {notifications.length ? (
                  <ul className="divide-y divide-[#e3e8df]">
                    {notifications.map((notification) => (
                      <li key={notification.id} className={notification.unread ? "bg-[#f0f6f2]" : "bg-white"}>
                        <button
                          type="button"
                          role="menuitem"
                          onClick={() => markNotificationRead(notification.id)}
                          className="flex w-full gap-2 px-4 py-3 text-left hover:bg-[#e8f0eb] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#2f6f63]"
                        >
                          {notification.unread && <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#2f6f63]" aria-label="Unread" />}
                          <div>
                            <p className="text-sm font-semibold text-[#172033]">{notification.title}</p>
                            <p className="mt-1 text-sm leading-5 text-[#4d5768]">{notification.message}</p>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="p-5 text-center text-sm text-[#4d5768]">No notifications.</p>
                )}
              </div>
            )}
          </div>
          <div className="relative">
            <button
              type="button"
              aria-expanded={profileOpen}
              aria-haspopup="menu"
              aria-label={`Open profile menu for ${user?.fullName}`}
              onClick={() => {
                setProfileOpen((open) => !open);
                setNotificationsOpen(false);
              }}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2f6f63] text-sm font-bold text-white shadow-sm ring-1 ring-[#25584f] hover:bg-[#25584f] focus:outline-none focus:ring-2 focus:ring-[#2f6f63] focus:ring-offset-2"
            >
              {initials}
            </button>
            {profileOpen && (
              <div
                role="menu"
                aria-label="Profile menu"
                className="absolute right-0 top-12 w-72 overflow-hidden rounded-lg border border-[#d7ded2] bg-white shadow-lg"
              >
                <div className="border-b border-[#e3e8df] p-4">
                  <p className="font-bold text-[#172033]">{user?.fullName}</p>
                  <p className="mt-1 break-all text-sm text-[#4d5768]">{user?.email}</p>
                  <p className="mt-1 text-sm text-[#4d5768]">@{user?.username}</p>
                </div>
                <div className="p-2">
                  <button
                    type="button"
                    role="menuitem"
                    onClick={logout}
                    className="w-full rounded-md px-3 py-2 text-left text-sm font-semibold text-[#8a3d35] hover:bg-[#f9ece9] focus:outline-none focus:ring-2 focus:ring-[#8a3d35]"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
