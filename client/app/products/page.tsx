"use client";

/**
 * Products Page (/products)
 *
 * Displays all products in a clean grid layout with expandable modals
 * Features: Product cards, filtering, expandable product details
 */

import { useState, useEffect, useId, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Product } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import ProductModal from "@/components/ProductModal";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { api } from "@/lib/api";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [minEcoScore, setMinEcoScore] = useState<number>(0);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  // Fetch all products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response: any = await api.getProducts({ limit: 100 });
        const fetchedProducts = response.products || [];

        // Normalize product IDs (_id -> id) and ensure image exists
        const normalizedProducts = fetchedProducts.map((p: Product) => ({
          ...p,
          id: p._id || p.id,
          image: p.image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"
        }));

        setProducts(normalizedProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Get unique categories from products
  const categories = Array.from(new Set(products.map(p => p.category)));

  // Handle ESC key and body scroll
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveProduct(null);
      }
    }

    if (activeProduct) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeProduct]);

  // Close modal when clicking outside
  useOutsideClick(ref, () => setActiveProduct(null));

  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategory === "all" || product.category === selectedCategory;
    const ecoScoreMatch = product.eco_score >= minEcoScore;
    return categoryMatch && ecoScoreMatch;
  });

  return (
    <>
      {/* Background Overlay */}
      <AnimatePresence>
        {activeProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm h-full w-full z-50"
          />
        )}
      </AnimatePresence>

      {/* Product Modal */}
      <AnimatePresence>
        {activeProduct && (
          <div ref={ref}>
            <ProductModal
              product={activeProduct}
              layoutId={`card-${activeProduct.id}-${id}`}
              onClose={() => setActiveProduct(null)}
            />
          </div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-text-charcoal mb-3">
            Sustainable Products
          </h1>
          <p className="text-lg text-text-muted max-w-2xl">
            Curated collection of eco-friendly products. Each item includes
            detailed sustainability information.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 pb-8 border-b border-border-base">
          {/* Category Filter */}
          <div className="flex-1">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-text-charcoal mb-2"
            >
              Category
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-border-base rounded-md bg-white text-text-charcoal focus:outline-none focus:ring-2 focus:ring-eco-forest"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Eco-Score Filter */}
          <div className="flex-1">
            <label
              htmlFor="ecoscore"
              className="block text-sm font-medium text-text-charcoal mb-2"
            >
              Minimum Eco-Score: {minEcoScore}
            </label>
            <input
              id="ecoscore"
              type="range"
              min="0"
              max="100"
              step="5"
              value={minEcoScore}
              onChange={(e) => setMinEcoScore(Number(e.target.value))}
              className="w-full h-2 bg-border-base rounded-lg appearance-none cursor-pointer accent-eco-forest"
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-text-muted">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        {/* Product Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square rounded-lg bg-gray-200 mb-3" />
                <div className="h-4 bg-gray-200 rounded mb-2" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-6 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                layoutId={`card-${product.id}-${id}`}
                onClick={() => setActiveProduct(product)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-text-muted">
              No products match your filters. Try adjusting your criteria.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
