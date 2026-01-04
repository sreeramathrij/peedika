"use client";

/**
 * Navbar Component
 *
 * Minimal, sticky navigation bar
 * Shows: Logo, navigation links, cart icon, and user menu
 */

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";

export default function Navbar() {
  const { totalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-bg-offwhite border-b border-border-base">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-32">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/peedika.png"
              alt="Peedika - Sustainable Future"
              width={800}
              height={200}
              priority
              className="h-auto w-auto"
            />
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            <Link
              href="/products"
              className="text-text-charcoal hover:text-eco-forest transition-colors font-medium"
            >
              Products
            </Link>

            {/* Cart Icon with Badge */}
            <Link
              href="/cart"
              className="relative text-text-charcoal hover:text-eco-forest transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>

              {/* Cart Count Badge */}
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-eco-forest text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 text-text-charcoal hover:text-eco-forest transition-colors"
                >
                  {/* User Avatar */}
                  <div className="w-8 h-8 rounded-full bg-eco-forest flex items-center justify-center text-white font-medium text-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                </button>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <>
                    {/* Backdrop */}
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowUserMenu(false)}
                    />

                    {/* Menu */}
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-border-base rounded-lg shadow-lg z-50">
                      <div className="p-3 border-b border-border-base">
                        <p className="text-sm font-medium text-text-charcoal truncate">
                          {user.name}
                        </p>
                        <p className="text-xs text-text-muted truncate">
                          {user.email}
                        </p>
                      </div>

                      <div className="py-2">
                        <Link
                          href="/profile"
                          onClick={() => setShowUserMenu(false)}
                          className="block px-4 py-2 text-sm text-text-charcoal hover:bg-eco-sage/10 transition-colors"
                        >
                          Profile
                        </Link>
                        <Link
                          href="/cart"
                          onClick={() => setShowUserMenu(false)}
                          className="block px-4 py-2 text-sm text-text-charcoal hover:bg-eco-sage/10 transition-colors"
                        >
                          My Cart
                        </Link>
                      </div>

                      <div className="border-t border-border-base py-2">
                        <button
                          onClick={() => {
                            logout();
                            setShowUserMenu(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-eco-low hover:bg-eco-low/10 transition-colors"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  href="/signin"
                  className="text-sm text-text-charcoal hover:text-eco-forest transition-colors font-medium"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="text-sm px-4 py-2 bg-eco-forest text-white rounded-md hover:bg-[#276749] transition-colors font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
