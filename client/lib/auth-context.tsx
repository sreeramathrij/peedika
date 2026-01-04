"use client";

/**
 * Authentication Context Provider
 *
 * Integrated with backend API
 * Features: signup, signin, logout, session persistence with JWT cookies
 */

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { api, ApiError } from "./api";

export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signin: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response: any = await api.getMe();
        if (response.user) {
          setUser(response.user);
        }
      } catch (error) {
        // No valid session, user stays null
        console.log("No active session");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const signup = async (name: string, email: string, password: string) => {
    // Validate inputs
    if (!name.trim() || !email.trim() || !password.trim()) {
      return { success: false, error: "All fields are required" };
    }

    if (password.length < 6) {
      return { success: false, error: "Password must be at least 6 characters" };
    }

    try {
      const response: any = await api.register(name.trim(), email.trim(), password);
      if (response.user) {
        setUser(response.user);
        return { success: true };
      }
      return { success: false, error: "Registration failed" };
    } catch (error) {
      const apiError = error as ApiError;
      return { success: false, error: apiError.message || "Registration failed" };
    }
  };

  const signin = async (email: string, password: string) => {
    // Validate inputs
    if (!email.trim() || !password.trim()) {
      return { success: false, error: "Email and password are required" };
    }

    try {
      const response: any = await api.login(email.trim(), password);
      if (response.user) {
        setUser(response.user);
        return { success: true };
      }
      return { success: false, error: "Login failed" };
    } catch (error) {
      const apiError = error as ApiError;
      return { success: false, error: apiError.message || "Invalid email or password" };
    }
  };

  const logout = async () => {
    try {
      await api.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        signup,
        signin,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook to access auth context
 * Must be used within AuthProvider
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
