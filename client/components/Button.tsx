/**
 * Button Component
 *
 * Reusable button with consistent styling
 * Variants: primary (eco-forest green) and secondary (outlined)
 */

import { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "px-6 py-3 font-medium rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles = {
    primary:
      "bg-eco-forest text-white hover:bg-[#276749] active:bg-[#22543d]",
    secondary:
      "border-2 border-eco-forest text-eco-forest hover:bg-eco-forest hover:text-white",
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
