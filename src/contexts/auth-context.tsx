"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { apiClient, ApiError, isTokenExpired } from "../lib/api";

interface User {
  id: string;
  username: string;
  email?: string;
  role?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeAuth = () => {
      try {
        // Check if we're on the client side
        if (typeof window !== "undefined") {
          const token = localStorage.getItem("admin-token");
          if (token && !isTokenExpired(token)) {
            // For now, just set as authenticated without API call
            // TODO: Add API call to verify token later
            setIsAuthenticated(true);
            // Set a dummy user for now
            setUser({
              id: "temp",
              username: "user",
            });
          }
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Use setTimeout to ensure this runs after component mount
    const timeoutId = setTimeout(initializeAuth, 100);
    return () => clearTimeout(timeoutId);
  }, []);

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.login({ username, password });

      // Extract token (handle different field names)
      const token = response.token || response.access_token;
      if (token && typeof window !== "undefined") {
        localStorage.setItem("admin-token", token);
      }

      // Extract user data (handle different field names)
      const userData = response.user ||
        response.admin || {
          id: "unknown",
          username: username,
        };

      setIsAuthenticated(true);
      setUser({
        id: String(userData.id),
        username: userData.username || username,
        email: userData.email,
        role: userData.role || "admin",
      });
      return true;
    } catch (error) {
      const apiError = error as ApiError;
      console.error("Login error:", apiError);
      setError(apiError.message || "خطا در ورود به سیستم");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await apiClient.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // setIsAuthenticated(false);
      setUser(null);
      setError(null);
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        isLoading,
        error,
        login,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
