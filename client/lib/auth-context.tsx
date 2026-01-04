"use client";

/**
 * Authentication Context Provider
 *
 * Simple frontend-only authentication for hackathon demo
 * Features: signup, signin, logout
 * Uses localStorage to persist user session
 *
 * NOTE: This is NOT production-ready security!
 * For production, integrate with backend JWT/session authentication
 */

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signin: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("auth_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
        localStorage.removeItem("auth_user");
      }
    }
    setIsLoading(false);
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("auth_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("auth_user");
    }
  }, [user]);

  const signup = async (name: string, email: string, password: string) => {
    // Validate inputs
    if (!name.trim() || !email.trim() || !password.trim()) {
      return { success: false, error: "All fields are required" };
    }

    if (password.length < 6) {
      return { success: false, error: "Password must be at least 6 characters" };
    }

    // Check if user already exists
    const existingUsers = JSON.parse(localStorage.getItem("auth_users") || "[]");
    const userExists = existingUsers.some((u: any) => u.email === email);

    if (userExists) {
      return { success: false, error: "Email already registered" };
    }

    // Create new user
    const newUser: User = {
      id: Math.random().toString(36).substring(7),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      createdAt: new Date().toISOString(),
    };

    // Store user credentials (DEMO ONLY - NOT SECURE!)
    const userWithPassword = { ...newUser, password };
    existingUsers.push(userWithPassword);
    localStorage.setItem("auth_users", JSON.stringify(existingUsers));

    // Set current user
    setUser(newUser);
    return { success: true };
  };

  const signin = async (email: string, password: string) => {
    // Validate inputs
    if (!email.trim() || !password.trim()) {
      return { success: false, error: "Email and password are required" };
    }

    // Check credentials
    const existingUsers = JSON.parse(localStorage.getItem("auth_users") || "[]");
    const foundUser = existingUsers.find(
      (u: any) => u.email === email.trim().toLowerCase() && u.password === password
    );

    if (!foundUser) {
      return { success: false, error: "Invalid email or password" };
    }

    // Set current user (without password)
    const { password: _, ...userWithoutPassword } = foundUser;
    setUser(userWithoutPassword);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user");
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
