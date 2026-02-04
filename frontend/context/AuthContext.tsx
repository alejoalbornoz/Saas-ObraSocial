"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";

interface User {
  id: string;
  email: string;
  role: "ADMIN" | "USUARIO" | "MEDICO";
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  hasRole: (role: User["role"]) => boolean;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/api/users/me", {
        credentials: "include",
      });

      if (res.status === 401) {
        setUser(null);
        return;
      }

      if (!res.ok) {
        throw new Error("Error obteniendo usuario");
      }

      const data = await res.json();
      setUser(data.user);
    } catch (error) {
      console.error("Error cargando usuario:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const logout = async () => {
    await fetch("http://localhost:4000/api/users/logout", {
      method: "POST",
      credentials: "include",
    });

    setUser(null);
  };

  const value: AuthContextType = {
    user,
    loading,
    isAdmin: user?.role === "ADMIN",
    hasRole: (role) => user?.role === role,
    logout,
    refreshUser: fetchUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return ctx;
};
