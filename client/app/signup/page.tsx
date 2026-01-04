"use client";

/**
 * Signup Page (/signup)
 *
 * User registration form
 * Creates new account and automatically signs in
 */

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import Button from "@/components/Button";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { signup, isAuthenticated } = useAuth();
  const router = useRouter();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const result = await signup(name, email, password);

    if (result.success) {
      router.push("/");
    } else {
      setError(result.error || "Signup failed");
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-20">
      <div className="bg-white border border-border-base rounded-lg p-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-text-charcoal mb-2">
            Create Account
          </h1>
          <p className="text-text-muted">
            Join Peedika and start shopping sustainably
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-eco-low/10 border border-eco-low/20 rounded-lg">
            <p className="text-sm text-eco-low">{error}</p>
          </div>
        )}

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-text-charcoal mb-2"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 border border-border-base rounded-md bg-white text-text-charcoal focus:outline-none focus:ring-2 focus:ring-eco-forest"
              placeholder="John Doe"
            />
          </div>

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
              minLength={6}
              className="w-full px-4 py-3 border border-border-base rounded-md bg-white text-text-charcoal focus:outline-none focus:ring-2 focus:ring-eco-forest"
              placeholder="At least 6 characters"
            />
            <p className="mt-1 text-xs text-text-muted">
              Must be at least 6 characters
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
          </Button>
        </form>

        {/* Sign In Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-text-muted">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="text-eco-forest font-medium hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>

        {/* Security Notice */}
        <div className="mt-8 p-4 bg-eco-sage/10 border border-eco-sage/20 rounded-lg">
          <p className="text-xs text-text-muted text-center">
            Your password is securely hashed and your session is protected with JWT authentication.
          </p>
        </div>
      </div>
    </div>
  );
}
