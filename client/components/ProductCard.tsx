/**
 * ProductCard Component
 *
 * Displays product preview in grid layout
 * Shows: Image, name, price, and eco-score badge
 * Clickable to navigate to product detail page
 */

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/products";
import EcoScoreBadge from "./EcoScoreBadge";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="group block bg-white border border-border-base rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Eco Score Badge - Positioned on image */}
        <div className="absolute top-3 right-3">
          <EcoScoreBadge score={product.eco_score} />
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-medium text-text-charcoal mb-1 group-hover:text-eco-forest transition-colors">
          {product.name}
        </h3>

        <p className="text-xs text-text-muted mb-2">{product.brand}</p>

        <div className="flex items-center justify-between mt-2">
          <p className="text-xl font-semibold text-text-charcoal">
            ${product.price}
          </p>
          <p className="text-xs text-text-muted capitalize">
            {product.category}
          </p>
        </div>
      </div>
    </Link>
  );
}
