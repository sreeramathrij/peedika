"use client";

/**
 * Cart Page (/cart)
 *
 * Displays shopping cart with all items
 * Features: Item list, quantity controls, total price, sustainability summary
 * Shows notice if user is not signed in (optional auth)
 */

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import CartItem from "@/components/CartItem";
import Button from "@/components/Button";

export default function CartPage() {
  const { items, totalPrice, clearCart } = useCart();
  const { isAuthenticated } = useAuth();

  // Calculate average eco-score of cart items
  const averageEcoScore =
    items.length > 0
      ? Math.round(
          items.reduce((sum, item) => sum + item.eco_score, 0) / items.length
        )
      : 0;

  // Determine sustainability message
  const getSustainabilityMessage = (avgScore: number) => {
    if (avgScore >= 85) {
      return {
        message: "Your cart has an excellent environmental impact!",
        color: "text-eco-high",
        icon: "🌟",
      };
    } else if (avgScore >= 70) {
      return {
        message: "Your cart has a moderate environmental impact.",
        color: "text-eco-medium",
        icon: "👍",
      };
    } else {
      return {
        message: "Consider adding more sustainable products to your cart.",
        color: "text-eco-low",
        icon: "💡",
      };
    }
  };

  const sustainabilityInfo = getSustainabilityMessage(averageEcoScore);

  // Empty cart state
  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-md mx-auto">
          <div className="text-6xl mb-6">🛒</div>
          <h1 className="text-3xl font-bold text-text-charcoal mb-4">
            Your cart is empty
          </h1>
          <p className="text-text-muted mb-8">
            Start adding sustainable products to your cart!
          </p>
          <Link href="/products">
            <Button variant="primary">Browse Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-text-charcoal">
          Shopping Cart
        </h1>
        <button
          onClick={clearCart}
          className="text-sm text-text-muted hover:text-eco-low transition-colors"
        >
          Clear Cart
        </button>
      </div>

      {/* Auth Notice (if not signed in) */}
      {!isAuthenticated && (
        <div className="mb-6 p-4 bg-eco-sage/10 border border-eco-sage/20 rounded-lg">
          <div className="flex items-start gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 text-eco-forest flex-shrink-0 mt-0.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>
            <div className="flex-1">
              <p className="text-sm text-text-charcoal font-medium mb-1">
                Sign in to save your cart
              </p>
              <p className="text-xs text-text-muted mb-3">
                Create an account or sign in to save your cart across devices
                and track your sustainability impact.
              </p>
              <div className="flex gap-2">
                <Link href="/signin?redirect=/cart">
                  <button className="text-xs px-3 py-1.5 bg-eco-forest text-white rounded-md hover:bg-[#276749] transition-colors font-medium">
                    Sign In
                  </button>
                </Link>
                <Link href="/signup">
                  <button className="text-xs px-3 py-1.5 border border-eco-forest text-eco-forest rounded-md hover:bg-eco-forest hover:text-white transition-colors font-medium">
                    Sign Up
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-border-base rounded-lg p-6 sticky top-20">
            <h2 className="text-xl font-semibold text-text-charcoal mb-6">
              Order Summary
            </h2>

            {/* Sustainability Impact */}
            <div className="mb-6 p-4 bg-eco-sage/10 border border-eco-sage/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{sustainabilityInfo.icon}</span>
                <h3 className="font-medium text-text-charcoal">
                  Sustainability Impact
                </h3>
              </div>
              <p className={`text-sm ${sustainabilityInfo.color} font-medium`}>
                {sustainabilityInfo.message}
              </p>
              <p className="text-xs text-text-muted mt-2">
                Average eco-score: {averageEcoScore}/100
              </p>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-text-muted">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-text-muted">
                <span>Shipping</span>
                <span className="text-eco-forest">Carbon-neutral</span>
              </div>
              <div className="border-t border-border-base pt-3 flex justify-between text-lg font-semibold text-text-charcoal">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button (Placeholder) */}
            <Button variant="primary" fullWidth disabled>
              Checkout (Coming Soon)
            </Button>

            <p className="text-xs text-text-muted text-center mt-4">
              This is a demo. Checkout functionality will be added later.
            </p>

            {/* Continue Shopping */}
            <div className="mt-4">
              <Link href="/products">
                <Button variant="secondary" fullWidth>
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-12 bg-white border border-border-base rounded-lg p-6">
        <h3 className="font-semibold text-text-charcoal mb-3">
          Free Carbon-Neutral Shipping
        </h3>
        <p className="text-sm text-text-muted">
          All orders ship with carbon-neutral delivery. We offset 100% of
          shipping emissions through verified reforestation projects.
        </p>
      </div>
    </div>
  );
}
