"use client";

/**
 * ProductCard Component with 3D Animation and Expandable Modal
 *
 * Displays product preview in grid layout with interactive 3D effect
 * Click to open detailed product modal
 */

import Image from "next/image";
import { Product } from "@/lib/products";
import EcoScoreBadge from "./EcoScoreBadge";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { motion } from "motion/react";

interface ProductCardProps {
  product: Product;
  onClick: () => void;
  layoutId: string;
}

export default function ProductCard({ product, onClick, layoutId }: ProductCardProps) {
  return (
    <CardContainer className="w-full" containerClassName="p-0">
      <CardBody className="bg-white relative group/card border-border-base border w-full h-full rounded-lg p-0 hover:shadow-2xl hover:shadow-eco-forest/10 transition-shadow">
        <motion.div
          layoutId={layoutId}
          onClick={onClick}
          className="block cursor-pointer"
        >
          {/* Product Image */}
          <CardItem translateZ="50" className="w-full">
            <motion.div
              layoutId={`image-${layoutId}`}
              className="relative aspect-square overflow-hidden bg-gray-100 rounded-t-lg"
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover group-hover/card:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Eco Score Badge - Positioned on image */}
              <CardItem
                translateZ="100"
                className="absolute top-3 right-3"
              >
                <EcoScoreBadge score={product.eco_score} />
              </CardItem>
            </motion.div>
          </CardItem>

          {/* Product Info */}
          <div className="p-4">
            <CardItem
              translateZ="50"
              as={motion.h3}
              layoutId={`title-${layoutId}`}
              className="text-lg font-medium text-text-charcoal mb-1 group-hover/card:text-eco-forest transition-colors"
            >
              {product.name}
            </CardItem>

            <CardItem
              translateZ="30"
              as={motion.p}
              layoutId={`brand-${layoutId}`}
              className="text-xs text-text-muted mb-2"
            >
              {product.brand}
            </CardItem>

            <CardItem
              translateZ="40"
              className="flex items-center justify-between mt-2"
            >
              <p className="text-xl font-semibold text-text-charcoal">
                ${product.price}
              </p>
              <p className="text-xs text-text-muted capitalize">
                {product.category}
              </p>
            </CardItem>
          </div>
        </motion.div>
      </CardBody>
    </CardContainer>
  );
}
