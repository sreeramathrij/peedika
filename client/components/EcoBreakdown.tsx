/**
 * EcoBreakdown Component
 *
 * Displays detailed sustainability information for a product
 * Shows materials, packaging, and shipping details
 */

interface EcoBreakdownProps {
  materials: string[];
  packaging: string;
  shipping_type: string;
  eco_tags?: string[];
}

export default function EcoBreakdown({
  materials,
  packaging,
  shipping_type,
  eco_tags,
}: EcoBreakdownProps) {
  const items = [
    {
      label: "Materials",
      value: materials.join(", "),
      icon: "🌱",
    },
    {
      label: "Packaging",
      value: packaging,
      icon: "📦",
    },
    {
      label: "Shipping",
      value: shipping_type,
      icon: "🚚",
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-text-charcoal">
        Sustainability Breakdown
      </h3>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="border border-border-base rounded-lg p-4 bg-white"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl" aria-hidden="true">
                {item.icon}
              </span>
              <div className="flex-1">
                <h4 className="font-medium text-text-charcoal mb-1">
                  {item.label}
                </h4>
                <p className="text-sm text-text-muted leading-relaxed">
                  {item.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
