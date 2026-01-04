"use client";

/**
 * Product Detail Page (/product/[id])
 *
 * Displays complete product information
 * Features: Large image, price, eco-score, detailed breakdown, add to cart
 */

import { notFound } from "next/navigation";
import Image from "next/image";
import { Product } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import Button from "@/components/Button";
import EcoScoreBadge from "@/components/EcoScoreBadge";
import EcoBreakdown from "@/components/EcoBreakdown";
import { AnimatedCircularProgressBar } from "@/components/ui/animated-circular-progress-bar";
import { useState, use, useEffect } from "react";
import { api } from "@/lib/api";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  // Fetch product from API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct: any = await api.getProduct(id);
        if (fetchedProduct) {
          // Normalize product ID and ensure image exists
          const normalizedProduct = {
            ...fetchedProduct,
            id: fetchedProduct._id || fetchedProduct.id,
            image: fetchedProduct.image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"
          };
          setProduct(normalizedProduct);
        } else {
          notFound();
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
        notFound();
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-pulse">
          <div className="aspect-square bg-gray-200 rounded-lg" />
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4" />
            <div className="h-6 bg-gray-200 rounded w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-12 bg-gray-200 rounded w-full" />
          </div>
        </div>
      </div>
    );
  }

  // If product doesn't exist, show 404
  if (!product) {
    notFound();
  }

  const handleAddToCart = async () => {
    await addToCart(product);
    setIsAdded(true);

    // Reset the button after 2 seconds
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Product Image and Info */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={product.image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"}
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

        {/* Right Column - Circular Progress Bar */}
        <div className="flex flex-col items-center gap-4 lg:sticky lg:top-24 lg:self-start">
          <div className="relative">
            <AnimatedCircularProgressBar
              value={product.eco_score}
              max={100}
              min={0}
              gaugePrimaryColor={
                product.eco_score < 33
                  ? "rgb(220, 38, 38)" // red
                  : product.eco_score < 66
                  ? "rgb(245, 158, 11)" // yellow/amber
                  : "rgb(74, 222, 128)" // lighter green
              }
              gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
              className="size-32"
            />
          </div>
          <span className="text-xs text-text-charcoal font-medium bg-white px-2 py-1 rounded border border-border-base">
            Eco Score
          </span>

          {/* Eco Breakdown Progress Bars */}
          {product.eco_breakdown && (
            <div className="w-64">
              <h3 className="text-sm font-semibold text-text-charcoal mb-3 text-center bg-white px-2 py-1 rounded border border-border-base">
                Sustainability Breakdown
              </h3>
              <div className="space-y-2">
                {Object.entries(product.eco_breakdown).map(([key, value]) => {
                  const percentage = (value / 30) * 100;
                  const color = percentage < 33
                    ? "rgb(220, 38, 38)"
                    : percentage < 66
                    ? "rgb(245, 158, 11)"
                    : "rgb(74, 222, 128)";

                  return (
                    <div key={key}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-medium text-text-charcoal capitalize">
                          {key.replace('_', ' ')}
                        </span>
                        <span className="text-xs font-semibold text-text-charcoal">
                          {value}/30
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${percentage}%`,
                            backgroundColor: color
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
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
