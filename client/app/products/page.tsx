"use client";

/**
 * Products Page (/products)
 *
 * Displays all products in a clean grid layout
 * Features: Product cards, optional filtering by category or eco-score
 */

import { useState } from "react";
import { products, getCategories } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [minEcoScore, setMinEcoScore] = useState<number>(0);

  const categories = getCategories();

  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategory === "all" || product.category === selectedCategory;
    const ecoScoreMatch = product.eco_score >= minEcoScore;
    return categoryMatch && ecoScoreMatch;
  });

  return (
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
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
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
  );
}
