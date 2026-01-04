"use client";

/**
 * Signin Page (/signin)
 *
 * User login form
 * Authenticates user and redirects to home or previous page
 */

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import Button from "@/components/Button";

export default function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { signin, isAuthenticated } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get redirect URL from query params (e.g., /signin?redirect=/cart)
  const redirect = searchParams.get("redirect") || "/";

  // Redirect if already authenticated
  if (isAuthenticated) {
    router.push(redirect);
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const result = await signin(email, password);

    if (result.success) {
      router.push(redirect);
    } else {
      setError(result.error || "Signin failed");
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-20">
      <div className="bg-white border border-border-base rounded-lg p-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-text-charcoal mb-2">
            Welcome Back
          </h1>
          <p className="text-text-muted">
            Sign in to your Peedika account
          </p>
        </div>

        {/* Redirect Notice */}
        {searchParams.get("redirect") && (
          <div className="mb-6 p-4 bg-eco-sage/10 border border-eco-sage/20 rounded-lg">
            <p className="text-sm text-text-charcoal text-center">
              Please sign in to continue
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-eco-low/10 border border-eco-low/20 rounded-lg">
            <p className="text-sm text-eco-low">{error}</p>
          </div>
        )}

        {/* Signin Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-text-charcoal mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-border-base rounded-md bg-white text-text-charcoal focus:outline-none focus:ring-2 focus:ring-eco-forest"
              placeholder="john@example.com"
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-text-charcoal mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-border-base rounded-md bg-white text-text-charcoal focus:outline-none focus:ring-2 focus:ring-eco-forest"
              placeholder="Enter your password"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        {/* Sign Up Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-text-muted">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-eco-forest font-medium hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>

        {/* Demo Notice */}
        <div className="mt-8 p-4 bg-eco-sage/10 border border-eco-sage/20 rounded-lg">
          <p className="text-xs text-text-muted text-center">
            <strong>Demo Notice:</strong> This is a frontend-only authentication
            system for demonstration purposes.
          </p>
        </div>
      </div>
    </div>
  );
}
