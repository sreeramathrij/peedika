"use client";

/**
 * Profile Page (/profile)
 *
 * User profile and account information
 * Protected route - requires authentication
 */

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useCart } from "@/lib/cart-context";
import Button from "@/components/Button";

export default function ProfilePage() {
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const { items, totalPrice } = useCart();
  const router = useRouter();

  // Redirect to signin if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/signin?redirect=/profile");
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-text-muted">Loading...</p>
      </div>
    );
  }

  // Don't render if not authenticated (will redirect)
  if (!isAuthenticated || !user) {
    return null;
  }

  // Calculate user's average eco-score
  const avgEcoScore =
    items.length > 0
      ? Math.round(
          items.reduce((sum, item) => sum + item.eco_score, 0) / items.length
        )
      : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-text-charcoal mb-2">
          My Profile
        </h1>
        <p className="text-text-muted">
          Manage your account and view your sustainability impact
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Information Card */}
        <div className="md:col-span-2 bg-white border border-border-base rounded-lg p-6">
          <h2 className="text-xl font-semibold text-text-charcoal mb-6">
            Account Information
          </h2>

          <div className="space-y-4">
            {/* Avatar */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-eco-forest flex items-center justify-center text-white font-semibold text-2xl">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm text-text-muted">Profile Picture</p>
                <p className="text-xs text-text-muted mt-1">
                  Auto-generated from your name
                </p>
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="text-sm font-medium text-text-charcoal">
                Full Name
              </label>
              <p className="mt-1 text-text-muted">{user.name}</p>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-text-charcoal">
                Email Address
              </label>
              <p className="mt-1 text-text-muted">{user.email}</p>
            </div>

            {/* Member Since */}
            <div>
              <label className="text-sm font-medium text-text-charcoal">
                Member Since
              </label>
              <p className="mt-1 text-text-muted">
                {new Date(user.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Sign Out Button */}
          <div className="mt-8 pt-6 border-t border-border-base">
            <Button
              variant="secondary"
              onClick={() => {
                logout();
                router.push("/");
              }}
            >
              Sign Out
            </Button>
          </div>
        </div>

        {/* Sustainability Stats */}
        <div className="space-y-6">
          {/* Cart Stats */}
          <div className="bg-white border border-border-base rounded-lg p-6">
            <h3 className="text-lg font-semibold text-text-charcoal mb-4">
              Shopping Stats
            </h3>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-text-muted">Items in Cart</p>
                <p className="text-2xl font-bold text-text-charcoal">
                  {items.length}
                </p>
              </div>

              <div>
                <p className="text-sm text-text-muted">Cart Value</p>
                <p className="text-2xl font-bold text-text-charcoal">
                  ${totalPrice.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Eco Impact */}
          {items.length > 0 && (
            <div className="bg-eco-sage/10 border border-eco-sage/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-text-charcoal mb-4">
                Your Eco Impact
              </h3>

              <div>
                <p className="text-sm text-text-muted mb-2">
                  Average Eco-Score
                </p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-eco-forest">
                    {avgEcoScore}
                  </p>
                  <p className="text-sm text-text-muted">/100</p>
                </div>
                <p className="text-xs text-text-muted mt-2">
                  {avgEcoScore >= 85
                    ? "Excellent! You're making sustainable choices."
                    : avgEcoScore >= 70
                    ? "Good job! Keep choosing eco-friendly products."
                    : "Consider adding more sustainable items."}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Demo Notice */}
      <div className="mt-8 p-4 bg-eco-sage/10 border border-eco-sage/20 rounded-lg">
        <p className="text-xs text-text-muted text-center">
          <strong>Demo Notice:</strong> This is a frontend-only profile. In
          production, this would connect to a backend API for secure data
          management.
        </p>
      </div>
    </div>
  );
}
