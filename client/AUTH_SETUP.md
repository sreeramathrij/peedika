# Authentication Setup Guide

## Overview

The Peedika frontend now includes a complete authentication system with signup, signin, logout, and user profile management.

**⚠️ IMPORTANT:** This is a **frontend-only demo authentication** system using localStorage. It is **NOT production-ready** and should be replaced with proper backend authentication before deploying.

## Features Implemented

### 1. Authentication Context ([lib/auth-context.tsx](lib/auth-context.tsx))
- Global auth state management using React Context API
- User session persistence with localStorage
- Functions: `signup()`, `signin()`, `logout()`
- Auto-loading on mount
- Simple credential validation

### 2. Pages Created

#### Sign Up Page ([app/signup/page.tsx](app/signup/page.tsx))
- `/signup`
- User registration form with name, email, password
- Client-side validation (email format, password length)
- Duplicate email checking
- Auto-redirect if already authenticated
- Auto-signin after successful signup

#### Sign In Page ([app/signin/page.tsx](app/signin/page.tsx))
- `/signin`
- Login form with email and password
- Support for redirect query param: `/signin?redirect=/cart`
- Error handling for invalid credentials
- Auto-redirect if already authenticated

#### Profile Page ([app/profile/page.tsx](app/profile/page.tsx))
- `/profile`
- Protected route (requires authentication)
- Displays user information (name, email, member since)
- Shows shopping stats (cart items, cart value)
- Shows sustainability impact (average eco-score)
- Sign out button

### 3. Updated Components

#### Navbar ([components/Navbar.tsx](components/Navbar.tsx))
- Conditional rendering based on auth state
- **Not Authenticated**: Shows "Sign In" and "Sign Up" buttons
- **Authenticated**: Shows user avatar dropdown menu
- User menu includes:
  - User name and email
  - Profile link
  - My Cart link
  - Sign Out button

#### Cart Page ([app/cart/page.tsx](app/cart/page.tsx))
- Optional auth notice for non-signed-in users
- Encourages signup to save cart across devices
- Quick access to Sign In / Sign Up from cart

### 4. Root Layout ([app/layout.tsx](app/layout.tsx))
- Wrapped app with `AuthProvider`
- Provider hierarchy: `AuthProvider` → `CartProvider` → App

## User Flow

### New User Registration
1. Click "Sign Up" in navbar
2. Fill in name, email, password (min 6 characters)
3. Submit form
4. Auto-signed in and redirected to home page
5. Avatar appears in navbar

### Existing User Sign In
1. Click "Sign In" in navbar
2. Enter email and password
3. Submit form
4. Signed in and redirected to home (or redirect URL)
5. Avatar appears in navbar

### Sign Out
1. Click user avatar in navbar
2. Click "Sign Out" in dropdown menu
3. User is logged out
4. Redirected to home page
5. Navbar shows "Sign In" and "Sign Up" buttons

## Data Storage (Demo Only)

### localStorage Keys

**`auth_user`** (Current session)
```json
{
  "id": "random_id",
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2024-01-04T10:00:00.000Z"
}
```

**`auth_users`** (All registered users - DEMO ONLY!)
```json
[
  {
    "id": "random_id",
    "name": "John Doe",
    "email": "john@example.com",
    "password": "plaintext_password", // ⚠️ NOT SECURE!
    "createdAt": "2024-01-04T10:00:00.000Z"
  }
]
```

## Security Warnings

### ⚠️ THIS IS NOT PRODUCTION-READY!

**Issues with current implementation:**

1. **Passwords stored in plaintext** in localStorage
2. **No encryption** - anyone can inspect localStorage
3. **No server-side validation** - easily bypassed
4. **No session tokens** - just stores user object
5. **No password hashing** - passwords visible in browser
6. **No rate limiting** - can try unlimited passwords
7. **No email verification** - anyone can claim any email
8. **Client-side only** - no real security

**Never use this in production!**

## Production Integration

### Replace with Backend Authentication

When integrating with your backend, replace the demo auth with real authentication:

#### 1. Create API Service

```typescript
// lib/api/auth.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function signup(name: string, email: string, password: string) {
  const response = await fetch(`${API_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  const data = await response.json();
  return data; // { user, token }
}

export async function signin(email: string, password: string) {
  const response = await fetch(`${API_URL}/auth/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  const data = await response.json();
  return data; // { user, token }
}
```

#### 2. Update Auth Context

Replace the demo implementation in [lib/auth-context.tsx](lib/auth-context.tsx):

```typescript
const signup = async (name: string, email: string, password: string) => {
  try {
    const { user, token } = await signupAPI(name, email, password);

    // Store JWT token
    localStorage.setItem('auth_token', token);

    // Set user
    setUser(user);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
```

#### 3. Add Token Management

```typescript
// lib/api/client.ts
export async function authenticatedFetch(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem('auth_token');

  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
    },
  });
}
```

#### 4. Backend Requirements

Your backend should implement:
- ✅ Secure password hashing (bcrypt, argon2)
- ✅ JWT or session-based authentication
- ✅ Email verification
- ✅ Rate limiting
- ✅ HTTPS only
- ✅ Secure cookie settings (httpOnly, secure, sameSite)
- ✅ CSRF protection
- ✅ Input validation and sanitization

## Protected Routes

### Currently Protected
- `/profile` - Requires authentication, redirects to `/signin?redirect=/profile`

### Optionally Protected
- `/cart` - Shows notice to sign in, but allows guest checkout

### To Add Route Protection

```typescript
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function ProtectedPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/signin?redirect=/protected-page");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated) {
    return <div>Loading...</div>;
  }

  return <div>Protected content</div>;
}
```

## Testing the Demo

### Create Test Account
1. Go to `/signup`
2. Name: "Test User"
3. Email: "test@example.com"
4. Password: "password123"
5. Submit

### Sign In
1. Go to `/signin`
2. Email: "test@example.com"
3. Password: "password123"
4. Submit

### View Profile
1. Click avatar in navbar
2. Click "Profile"
3. See account info and stats

### Sign Out
1. Click avatar in navbar
2. Click "Sign Out"

## File Structure

```
client/
├── lib/
│   ├── auth-context.tsx          # Auth state management
│   └── cart-context.tsx           # Cart state (unchanged)
├── app/
│   ├── signup/
│   │   └── page.tsx               # Sign up form
│   ├── signin/
│   │   └── page.tsx               # Sign in form
│   ├── profile/
│   │   └── page.tsx               # User profile (protected)
│   ├── cart/
│   │   └── page.tsx               # Cart with auth notice
│   └── layout.tsx                 # Root layout with AuthProvider
└── components/
    └── Navbar.tsx                 # Nav with user menu
```

## Next Steps for Production

1. **Backend Integration**
   - Connect to real auth API
   - Implement JWT token management
   - Add token refresh logic

2. **Enhanced Security**
   - Add password strength requirements
   - Implement 2FA (optional)
   - Add password reset flow
   - Add email verification

3. **User Experience**
   - Add "Remember me" option
   - Add social login (Google, GitHub)
   - Add loading states
   - Add proper error messages

4. **Additional Features**
   - Order history (requires backend)
   - Address management
   - Payment methods
   - Wishlist

## Demo Limitations

**Remember:** This demo is for development/testing only!

- ❌ Passwords are visible in browser
- ❌ No server-side validation
- ❌ No real security
- ❌ Data can be easily manipulated
- ❌ No protection against XSS/CSRF
- ❌ No session expiration
- ❌ No account recovery

**For production, always use proper backend authentication!**
