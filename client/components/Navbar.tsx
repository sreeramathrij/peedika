"use client";

/**
 * Navbar Component
 *
 * Two-tier navigation inspired by modern e-commerce design
 * - Top announcement banner
 * - Main navigation with logo, links, search, and user actions
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
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Announcement Banner */}
      <div className="bg-eco-forest text-white py-2.5 px-4 text-center">
        <p className="text-sm font-medium tracking-wide">
          🌱 Every purchase includes a transparent sustainability score
        </p>
      </div>

      {/* Main Navigation */}
      <nav className="border-b border-border-base">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/peedika.png"
                alt="Peedika"
                width={180}
                height={60}
                priority
                className="h-20 w-auto"
              />
            </Link>

            {/* Center Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/products"
                className="text-text-charcoal hover:text-eco-forest transition-colors font-medium text-sm uppercase tracking-wider"
              >
                Products
              </Link>
              <Link
                href="/products"
                className="text-text-charcoal hover:text-eco-forest transition-colors font-medium text-sm uppercase tracking-wider"
              >
                Sustainability
              </Link>
              <Link
                href="/products"
                className="text-text-charcoal hover:text-eco-forest transition-colors font-medium text-sm uppercase tracking-wider"
              >
                About
              </Link>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-6">
              {/* Search Icon */}
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="text-text-charcoal hover:text-eco-forest transition-colors"
                aria-label="Search"
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
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </button>

              {/* User Account Icon/Menu */}
              {isAuthenticated && user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 text-text-charcoal hover:text-eco-forest transition-colors"
                    aria-label="User menu"
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
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                      />
                    </svg>
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
                      <div className="absolute right-0 mt-3 w-56 bg-white border border-border-base rounded-md shadow-xl z-50">
                        <div className="p-4 border-b border-border-base bg-eco-sage/5">
                          <p className="text-sm font-semibold text-text-charcoal truncate">
                            {user.name}
                          </p>
                          <p className="text-xs text-text-muted truncate mt-0.5">
                            {user.email}
                          </p>
                        </div>

                        <div className="py-2">
                          <Link
                            href="/profile"
                            onClick={() => setShowUserMenu(false)}
                            className="block px-4 py-2.5 text-sm text-text-charcoal hover:bg-eco-sage/10 transition-colors"
                          >
                            My Profile
                          </Link>
                          <Link
                            href="/cart"
                            onClick={() => setShowUserMenu(false)}
                            className="block px-4 py-2.5 text-sm text-text-charcoal hover:bg-eco-sage/10 transition-colors"
                          >
                            My Orders
                          </Link>
                        </div>

                        <div className="border-t border-border-base py-2">
                          <button
                            onClick={() => {
                              logout();
                              setShowUserMenu(false);
                            }}
                            className="block w-full text-left px-4 py-2.5 text-sm text-eco-low hover:bg-eco-low/10 transition-colors font-medium"
                          >
                            Sign Out
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <Link
                  href="/signin"
                  className="text-text-charcoal hover:text-eco-forest transition-colors"
                  aria-label="Sign in"
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
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                </Link>
              )}

              {/* Cart Icon with Badge */}
              <Link
                href="/cart"
                className="relative text-text-charcoal hover:text-eco-forest transition-colors"
                aria-label={`Shopping cart with ${totalItems} items`}
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

              {/* Sign Up Button (Only when not authenticated) */}
              {!isAuthenticated && (
                <Link
                  href="/signup"
                  className="hidden sm:inline-flex px-5 py-2 bg-eco-forest text-white text-sm font-medium rounded-md hover:bg-[#276749] transition-colors uppercase tracking-wide"
                >
                  Sign Up
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Search Bar (Expandable) */}
      {showSearch && (
        <div className="border-b border-border-base bg-bg-offwhite">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for sustainable products..."
                className="w-full px-4 py-3 pr-12 border border-border-base rounded-md focus:outline-none focus:ring-2 focus:ring-eco-forest focus:border-transparent"
                autoFocus
              />
              <button
                onClick={() => setShowSearch(false)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-charcoal"
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
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
