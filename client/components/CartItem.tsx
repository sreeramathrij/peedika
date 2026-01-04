"use client";

/**
 * CartItem Component
 *
 * Displays individual item in shopping cart
 * Allows quantity adjustment and removal
 */

import Image from "next/image";
import { CartItem as CartItemType } from "@/lib/cart-context";
import { useCart } from "@/lib/cart-context";
import EcoScoreBadge from "./EcoScoreBadge";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex gap-4 p-4 bg-white border border-border-base rounded-lg">
      {/* Product Image */}
      <div className="relative w-24 h-24 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="96px"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-medium text-text-charcoal">{item.name}</h3>
            <p className="text-xs text-text-muted">{item.brand}</p>
            <div className="mt-1">
              <EcoScoreBadge score={item.eco_score} size="small" />
            </div>
          </div>
          <p className="font-semibold text-text-charcoal">${item.price}</p>
        </div>

        {/* Quantity Controls and Remove */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="w-8 h-8 flex items-center justify-center border border-border-base rounded hover:bg-gray-50 transition-colors"
              aria-label="Decrease quantity"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
              </svg>
            </button>

            <span className="w-12 text-center font-medium text-text-charcoal">
              {item.quantity}
            </span>

            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-8 h-8 flex items-center justify-center border border-border-base rounded hover:bg-gray-50 transition-colors"
              aria-label="Increase quantity"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          </div>

          <button
            onClick={() => removeFromCart(item.id)}
            className="text-sm text-text-muted hover:text-eco-low transition-colors"
          >
            Remove
          </button>
        </div>

        {/* Subtotal */}
        <div className="mt-2 text-right">
          <p className="text-sm text-text-muted">
            Subtotal:{" "}
            <span className="font-semibold text-text-charcoal">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
