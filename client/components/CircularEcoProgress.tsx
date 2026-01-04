"use client";

/**
 * CircularEcoProgress Component
 * 
 * Displays eco score as a circular progress bar with color coding:
 * - Red: score < 33
 * - Yellow: score 33-66
 * - Green: score > 66
 */

interface CircularEcoProgressProps {
  score: number;
  size?: number;
  strokeWidth?: number;
}

export default function CircularEcoProgress({ 
  score, 
  size = 60, 
  strokeWidth = 6 
}: CircularEcoProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  // Determine color based on score
  const getColor = () => {
    if (score < 33) return "#dc2626"; // red
    if (score < 66) return "#f59e0b"; // yellow/amber
    return "#2f855a"; // green
  };

  const color = getColor();

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />
      </svg>
      {/* Score text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-sm font-bold text-text-charcoal">{score}</span>
        <span className="text-[10px] text-text-muted">ECO</span>
      </div>
    </div>
  );
}
