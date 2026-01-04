"use client";

/**
 * Product Detail Page (/product/[id])
 *
 * Displays complete product information
 * Features: Large image, price, eco-score, detailed breakdown, add to cart
 */

import { notFound } from "next/navigation";
import Image from "next/image";
import { getProductById } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import Button from "@/components/Button";
import EcoScoreBadge from "@/components/EcoScoreBadge";
import EcoBreakdown from "@/components/EcoBreakdown";
import { useState, use } from "react";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const product = getProductById(id);
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  // If product doesn't exist, show 404
  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);

    // Reset the button after 2 seconds
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          {/* Category Badge */}
          <p className="text-sm text-text-muted uppercase tracking-wide mb-2">
            {product.category}
          </p>

          {/* Product Name */}
          <h1 className="text-3xl sm:text-4xl font-bold text-text-charcoal mb-4">
            {product.name}
          </h1>

          {/* Price */}
          <p className="text-3xl font-semibold text-text-charcoal mb-6">
            ${product.price}
          </p>

          {/* Brand */}
          <p className="text-sm text-text-muted mb-2">
            by <span className="font-medium text-eco-forest">{product.brand}</span>
          </p>

          {/* Eco Score */}
          <div className="mb-6">
            <h2 className="text-sm font-medium text-text-charcoal mb-2">
              Sustainability Score
            </h2>
            <EcoScoreBadge score={product.eco_score} size="large" showLabel />
          </div>

          {/* Eco Tags */}
          {product.eco_tags && product.eco_tags.length > 0 && (
            <div className="mb-8">
              <div className="flex flex-wrap gap-2">
                {product.eco_tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-eco-sage/20 text-eco-forest text-xs font-medium rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-text-charcoal mb-3">
              About This Product
            </h2>
            <p className="text-text-muted leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Add to Cart Button */}
          <div className="mb-12">
            <Button
              variant="primary"
              fullWidth
              onClick={handleAddToCart}
              disabled={isAdded}
            >
              {isAdded ? "✓ Added to Cart" : "Add to Cart"}
            </Button>
          </div>

          {/* Eco Breakdown */}
          <div className="border-t border-border-base pt-8">
            <EcoBreakdown
              materials={product.materials}
              packaging={product.packaging}
              shipping_type={product.shipping_type}
              eco_tags={product.eco_tags}
            />
          </div>
        </div>
      </div>

      {/* Why This Matters Section */}
      <div className="mt-16 bg-white border border-border-base rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-text-charcoal mb-4">
          Why Sustainability Matters
        </h2>
        <div className="prose prose-sm text-text-muted max-w-none">
          <p className="mb-3">
            Every purchasing decision has an environmental impact. By choosing
            products with high sustainability scores, you&apos;re supporting:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Ethical sourcing and fair labor practices</li>
            <li>Reduced carbon emissions in production and shipping</li>
            <li>Minimal waste through eco-friendly packaging</li>
            <li>Long-lasting, durable products that reduce consumption</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
