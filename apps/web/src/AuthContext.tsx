import { createContext, ReactNode, useContext, useState } from "react";

type User = {
  fullName: string;
  email: string;
  username: string;
  password: string;
};

type SessionUser = Omit<User, "password">;

type AuthContextValue = {
  user: SessionUser | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  register: (user: User) => { success: boolean; message?: string };
};

const USERS_KEY = "homehub-users";
const SESSION_KEY = "homehub-session";
const admin: User = {
  fullName: "HomeHub Administrator",
  email: "admin@homehub.local",
  username: "admin",
  password: "admin",
};

const AuthContext = createContext<AuthContextValue | null>(null);

function readUsers(): User[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) ?? "[]") as User[];
  } catch {
    return [];
  }
}

function readSession(): SessionUser | null {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) ?? "null") as SessionUser | null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(readSession);

  function login(username: string, password: string) {
    const normalizedUsername = username.trim().toLowerCase();
    const account = [admin, ...readUsers()].find(
      (candidate) =>
        candidate.username.toLowerCase() === normalizedUsername &&
        candidate.password === password,
    );

    if (!account) return false;

    const session = {
      fullName: account.fullName,
      email: account.email,
      username: account.username,
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
    return true;
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }

  function register(account: User) {
    const users = readUsers();
    const normalizedUsername = account.username.trim().toLowerCase();
    const normalizedEmail = account.email.trim().toLowerCase();

    if (
      normalizedUsername === admin.username ||
      users.some((candidate) => candidate.username.toLowerCase() === normalizedUsername)
    ) {
      return { success: false, message: "That username is already in use." };
    }
    if (users.some((candidate) => candidate.email.toLowerCase() === normalizedEmail)) {
      return { success: false, message: "That email is already registered." };
    }

    users.push({
      ...account,
      fullName: account.fullName.trim(),
      email: normalizedEmail,
      username: account.username.trim(),
    });
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return { success: true };
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
