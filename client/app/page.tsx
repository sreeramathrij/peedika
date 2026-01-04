"use client";

/**
 * Landing Page (/)
 *
 * Personalized shopping experience with product recommendations
 * Features: Hero, Recently Viewed, Recommended, Categories, Top Deals
 */

import Link from "next/link";
import Image from "next/image";
import Button from "@/components/Button";
import { Product } from "@/lib/products";
import EcoScoreBadge from "@/components/EcoScoreBadge";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";

export default function Home() {
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
  const [recommended, setRecommended] = useState<Product[]>([]);
  const [topDeals, setTopDeals] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response: any = await api.getProducts({ limit: 12 });
        const fetchedProducts = response.products || [];

        // Normalize product IDs (_id -> id) and ensure image exists
        const normalizedProducts = fetchedProducts.map((p: Product) => ({
          ...p,
          id: p._id || p.id,
          image: p.image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"
        }));

        setRecentlyViewed(normalizedProducts.slice(0, 4));
        setRecommended(normalizedProducts.slice(4, 8));
        setTopDeals(normalizedProducts.slice(8, 12));
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);
  const categories = [
    {
      name: "Accessories",
      image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&q=80",
      link: "/products?category=accessories"
    },
    {
      name: "Clothing",
      image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&q=80",
      link: "/products?category=clothing"
    },
    {
      name: "Home",
      image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400&q=80",
      link: "/products?category=home"
    },
    {
      name: "Electronics",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&q=80",
      link: "/products?category=electronics"
    }
  ];

  return (
    <div className="min-h-screen bg-bg-offwhite">
      {/* Hero Section */}
      <section className="bg-white">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32">
          <div className="text-center space-y-8">
            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-charcoal leading-tight">
              Shop with purpose.{" "}
              <span className="text-eco-forest">Know your impact.</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-text-muted max-w-2xl mx-auto">
              Every product comes with a transparent sustainability score
            </p>

            {/* CTA Button */}
            <div className="pt-2">
              <Link href="/products">
                <Button variant="primary">Explore Sustainable Products</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recently Viewed Items */}
      <section className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-text-charcoal">
              Recently Viewed
            </h2>
            <Link
              href="/products"
              className="text-sm text-eco-forest hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {isLoading ? (
              // Loading skeleton
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-square rounded-lg bg-gray-200 mb-2" />
                  <div className="h-4 bg-gray-200 rounded mb-1" />
                  <div className="h-6 bg-gray-200 rounded w-1/2" />
                </div>
              ))
            ) : (
              recentlyViewed.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="group"
              >
                <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 mb-2">
                  <Image
                    src={product.image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute top-2 right-2">
                    <EcoScoreBadge score={product.eco_score} size="small" />
                  </div>
                </div>
                <h3 className="text-sm font-medium text-text-charcoal line-clamp-2 mb-1">
                  {product.name}
                </h3>
                <p className="text-lg font-bold text-eco-forest">
                  ${product.price}
                </p>
              </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Recommended for You */}
      <section className="mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-text-charcoal">
              Recommended for You
            </h2>
            <Link
              href="/products"
              className="text-sm text-eco-forest hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-square rounded-lg bg-gray-200 mb-2" />
                  <div className="h-4 bg-gray-200 rounded mb-1" />
                  <div className="h-6 bg-gray-200 rounded w-1/2" />
                </div>
              ))
            ) : (
              recommended.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="group"
                >
                  <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 mb-2">
                    <Image
                      src={product.image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute top-2 right-2">
                      <EcoScoreBadge score={product.eco_score} size="small" />
                    </div>
                  </div>
                  <h3 className="text-sm font-medium text-text-charcoal line-clamp-2 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-lg font-bold text-eco-forest">
                    ${product.price}
                  </p>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-bold text-text-charcoal mb-4">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.link}
                className="group"
              >
                <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 mb-2">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <h3 className="text-base font-semibold text-text-charcoal text-center">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Top Deals */}
      <section className="mx-auto px-4 sm:px-6 lg:px-8 py-4 pb-12">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-text-charcoal">
              Top Deals on Sustainable Products
            </h2>
            <Link
              href="/products"
              className="text-sm text-eco-forest hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-square rounded-lg bg-gray-200 mb-2" />
                  <div className="h-4 bg-gray-200 rounded mb-1" />
                  <div className="h-6 bg-gray-200 rounded w-1/2" />
                </div>
              ))
            ) : (
              topDeals.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="group"
                >
                  <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 mb-2">
                    <Image
                      src={product.image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute top-2 left-2 bg-eco-low text-white text-xs font-bold px-2 py-1 rounded">
                      DEAL
                    </div>
                    <div className="absolute top-2 right-2">
                      <EcoScoreBadge score={product.eco_score} size="small" />
                    </div>
                  </div>
                  <h3 className="text-sm font-medium text-text-charcoal line-clamp-2 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-lg font-bold text-eco-forest">
                    ${product.price}
                  </p>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
