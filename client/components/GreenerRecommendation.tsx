"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { useCart } from "@/lib/cart-context";

interface Alternative {
  id: string;
  name: string;
  price: number;
  eco_score: number;
  improvementPercent: number;
}

interface CurrentProduct {
  id: string;
  name: string;
  price: number;
  eco_score: number;
  quantity: number;
}

interface Suggestion {
  current: CurrentProduct;
  alternatives: Alternative[];
}

interface GreenerRecommendationProps {
  suggestion: Suggestion;
  onSwapComplete: () => void;
}

export default function GreenerRecommendation({
  suggestion,
  onSwapComplete,
}: GreenerRecommendationProps) {
  const [isSwapping, setIsSwapping] = useState(false);
  const [swapSuccess, setSwapSuccess] = useState(false);
  const { refreshCart } = useCart();

  const handleSwap = async (alternativeId: string) => {
    setIsSwapping(true);

    try {
      await api.swapCartItem(suggestion.current.id, alternativeId);
      setSwapSuccess(true);
      await refreshCart();

      setTimeout(() => {
        onSwapComplete();
      }, 1500);
    } catch (error) {
      console.error("Failed to swap item:", error);
      setIsSwapping(false);
    }
  };

  if (swapSuccess) {
    return (
      <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6 text-center">
        <div className="text-3xl mb-2">✅</div>
        <h3 className="text-base font-semibold text-green-700 mb-1">
          Item Swapped Successfully!
        </h3>
        <p className="text-sm text-gray-600">
          You've upgraded to a greener option.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-green-50 border-2 border-green-400 rounded-lg p-6 shadow-sm">
      <div className="flex items-start gap-3 mb-4">
        <div className="text-2xl">💡</div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            Greener Alternative Available
          </h3>
          <p className="text-sm text-gray-700">
            We found more sustainable options for {suggestion.current.name}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {suggestion.alternatives.map((alt) => (
          <div
            key={alt.id}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white rounded-lg border border-green-300 gap-4"
          >
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 mb-2">
                {alt.name}
              </h4>
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="text-green-700 font-semibold">
                  ${alt.price.toFixed(2)}
                </span>
                <span className="text-gray-400">•</span>
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded font-medium">
                  +{alt.improvementPercent.toFixed(0)} eco points
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-600 rounded-full"
                      style={{ width: `${alt.eco_score}%` }}
                    />
                  </div>
                  <span className="text-gray-600 text-xs">
                    {alt.eco_score}/100
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => handleSwap(alt.id)}
              disabled={isSwapping}
              className="px-5 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSwapping ? "Swapping..." : "Swap"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
