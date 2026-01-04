/**
 * EcoScoreBadge Component
 *
 * Displays sustainability score with color-coded badge
 * Colors based on score level:
 * - High (85+): Forest green
 * - Medium (70-84): Warning yellow
 * - Low (<70): Red
 */

import { getEcoScoreLevel } from "@/lib/products";

interface EcoScoreBadgeProps {
  score: number;
  size?: "small" | "large";
  showLabel?: boolean;
}

export default function EcoScoreBadge({
  score,
  size = "small",
  showLabel = false,
}: EcoScoreBadgeProps) {
  const level = getEcoScoreLevel(score);

  const colorClasses = {
    high: "bg-eco-high text-white",
    medium: "bg-eco-medium text-white",
    low: "bg-eco-low text-white",
  };

  const sizeClasses = {
    small: "text-xs px-2 py-1",
    large: "text-sm px-3 py-1.5",
  };

  const labels = {
    high: "Highly Sustainable",
    medium: "Moderately Sustainable",
    low: "Lower Sustainability",
  };

  return (
    <div className="inline-flex items-center gap-2">
      <span
        className={`
          ${colorClasses[level]}
          ${sizeClasses[size]}
          font-semibold
          rounded-full
          inline-block
        `}
      >
        {score}/100
      </span>
      {showLabel && (
        <span className="text-sm text-text-muted">{labels[level]}</span>
      )}
    </div>
  );
}
