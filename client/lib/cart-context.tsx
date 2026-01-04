"use client";

/**
 * Cart Context Provider
 *
 * Manages cart state across the application using React Context API
 * Provides functions to add, remove, and update cart items
 * Requires authentication for cart operations
 * Persists cart data in localStorage (client-side only)
 */

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Product } from "./products";
import { useAuth } from "./auth-context";
import { api } from "./api";

export interface CartItem extends Product {
  quantity: number;
  productId: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => Promise<boolean>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const mapCartItems = (cart: any): CartItem[] => {
    if (!cart || !Array.isArray(cart.items)) return [];

    return cart.items.map((item: any) => {
      const product = item.product ?? {};
      // Extract the MongoDB _id properly (could be string or object with toString())
      const mongoId = typeof product._id === 'string' 
        ? product._id 
        : product._id?.toString?.() || product._id?._id || "";
      const productId = mongoId || product.id || "";

      if (!productId) {
        console.warn("Cart item missing productId", { item, product });
      }

      return {
        ...product,
        id: product.id ?? mongoId,
        _id: mongoId,
        productId,
        quantity: item.quantity ?? 1,
        price: item.lockedPrice ?? product.price ?? 0,
        eco_score: product.eco_score ?? item.eco_score_snapshot ?? 0,
        image: product.image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
        name: product.name || "Unknown Product",
        brand: product.brand || "",
        category: product.category || "",
      } as CartItem;
    });
  };

  useEffect(() => {
    let isActive = true;

    const loadCart = async () => {
      if (!isAuthenticated) {
        if (isActive) setItems([]);
        return;
      }

      try {
        const cart = await api.getCart();
        if (isActive) setItems(mapCartItems(cart));
      } catch (error) {
        console.error("Failed to fetch cart from API", error);
        if (isActive) setItems([]);
      }
    };

    loadCart();

    return () => {
      isActive = false;
    };
  }, [isAuthenticated]);

  const addToCart = async (product: Product): Promise<boolean> => {
    if (!isAuthenticated) {
      router.push(`/signin?redirect=/products`);
      return false;
    }

    const productId = product._id || product.id;
    if (!productId) {
      console.error("Cannot add product without an id");
      return false;
    }

    try {
      const cart = await api.addToCart(productId, 1);
      setItems(mapCartItems(cart));
      return true;
    } catch (error: any) {
      console.error("Failed to add item to cart", {
        error,
        message: error?.message,
        status: error?.status,
        productId
      });
      return false;
    }
  };

  const removeFromCart = async (productId: string) => {
    if (!isAuthenticated) {
      router.push(`/signin?redirect=/cart`);
      return;
    }

    try {
      const cart = await api.removeFromCart(productId);
      setItems(mapCartItems(cart));
    } catch (error: any) {
      console.error("Failed to remove item from cart", {
        error,
        message: error?.message,
        status: error?.status,
        productId
      });
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (!isAuthenticated) {
      router.push(`/signin?redirect=/cart`);
      return;
    }

    try {
      const cart = await api.updateCartItem(productId, quantity);
      setItems(mapCartItems(cart));
    } catch (error: any) {
      console.error("Failed to update cart quantity", {
        error,
        message: error?.message,
        status: error?.status,
        productId,
        quantity
      });
    }
  };

  const clearCart = async () => {
    if (!isAuthenticated) {
      setItems([]);
      return;
    }

    try {
      await api.clearCart();
      setItems([]);
    } catch (error: any) {
      console.error("Failed to clear cart", {
        error,
        message: error?.message,
        status: error?.status
      });
    }
  };

  // Calculate totals
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

/**
 * Hook to access cart context
 * Must be used within CartProvider
 */
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
