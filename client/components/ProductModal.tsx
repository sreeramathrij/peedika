"use client";

/**
 * ProductModal Component
 *
 * Expandable modal that shows full product details
 * Animated with motion/react for smooth transitions
 */

import { motion } from "motion/react";
import { Product } from "@/lib/products";
import Image from "next/image";
import EcoScoreBadge from "./EcoScoreBadge";
import Button from "./Button";
import EcoBreakdown from "./EcoBreakdown";
import { useCart } from "@/lib/cart-context";
import { useState } from "react";

interface ProductModalProps {
  product: Product;
  layoutId: string;
  onClose: () => void;
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

export default function ProductModal({ product, layoutId, onClose }: ProductModalProps) {
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    const success = addToCart(product);
    if (success) {
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 grid place-items-center z-[100] p-4">
      {/* Close Button */}
      <motion.button
        key={`button-${layoutId}`}
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.05 } }}
        className="flex absolute top-4 right-4 items-center justify-center bg-white rounded-full h-8 w-8 shadow-lg hover:bg-gray-100 transition-colors z-[110]"
        onClick={onClose}
      >
        <CloseIcon />
      </motion.button>

      {/* Modal Content */}
      <motion.div
        layoutId={layoutId}
        className="w-full max-w-4xl h-full md:h-fit md:max-h-[90%] flex flex-col bg-white rounded-3xl overflow-hidden shadow-2xl"
      >
        {/* Image Section */}
        <motion.div layoutId={`image-${layoutId}`} className="relative w-full aspect-video flex-shrink-0 overflow-hidden">
          <Image
            src={product.image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
          {/* Eco Score Badge on Image */}
          <div className="absolute top-4 right-4">
            <EcoScoreBadge score={product.eco_score} size="large" />
          </div>
        </motion.div>

        {/* Content Section */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 md:p-8">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1">
                <motion.h2
                  layoutId={`title-${layoutId}`}
                  className="text-2xl md:text-3xl font-bold text-text-charcoal mb-2"
                >
                  {product.name}
                </motion.h2>
                <motion.p
                  layoutId={`brand-${layoutId}`}
                  className="text-base text-text-muted mb-4"
                >
                  {product.brand}
                </motion.p>
                <p className="text-3xl font-bold text-eco-forest mb-4">
                  ${product.price}
                </p>
              </div>
            </div>

            {/* Description */}
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mb-6"
            >
              <h3 className="text-lg font-semibold text-text-charcoal mb-2">
                Description
              </h3>
              <p className="text-text-muted leading-relaxed">
                {product.description}
              </p>
            </motion.div>

            {/* Eco Breakdown */}
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mb-6"
            >
              <EcoBreakdown
                materials={product.materials}
                packaging={product.packaging}
                shipping_type={product.shipping_type}
                eco_tags={product.eco_tags}
              />
            </motion.div>

            {/* Eco Tags */}
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mb-6"
            >
              <h3 className="text-lg font-semibold text-text-charcoal mb-3">
                Eco Certifications
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.eco_tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-eco-sage/20 text-eco-forest text-sm rounded-full capitalize"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex gap-4 pt-4 border-t border-border-base"
            >
              <Button
                variant="primary"
                onClick={handleAddToCart}
                className="flex-1"
              >
                {addedToCart ? "✓ Added to Cart" : "Add to Cart"}
              </Button>
              <Button
                variant="secondary"
                onClick={onClose}
                className="px-8"
              >
                Close
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
