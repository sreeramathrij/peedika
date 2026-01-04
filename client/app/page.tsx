/**
 * Landing Page (/)
 *
 * Minimal hero section introducing sustainable shopping
 * Features: Headline, supporting text, CTA to products page
 */

import Link from "next/link";
import Button from "@/components/Button";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="text-center space-y-8">
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-charcoal leading-tight">
            Shop with purpose.
            <br />
            <span className="text-eco-forest">Know your impact.</span>
          </h1>

          {/* Supporting Text */}
          <p className="text-lg sm:text-xl text-text-muted max-w-2xl mx-auto leading-relaxed">
            Every product on Peedika comes with a transparent sustainability
            score. We believe you deserve to know exactly how your purchases
            affect the planet.
          </p>

          {/* CTA Button */}
          <div className="pt-4">
            <Link href="/products">
              <Button variant="primary">Explore Sustainable Products</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Value Props Section */}
      <section className="bg-white border-y border-border-base">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Transparency */}
            <div className="text-center space-y-3">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold text-text-charcoal">
                Full Transparency
              </h3>
              <p className="text-sm text-text-muted leading-relaxed">
                Detailed eco-scores based on materials, packaging, and shipping.
                No hidden impacts.
              </p>
            </div>

            {/* Curated */}
            <div className="text-center space-y-3">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-lg font-semibold text-text-charcoal">
                Carefully Curated
              </h3>
              <p className="text-sm text-text-muted leading-relaxed">
                Every item is vetted for sustainability. We only feature
                products that meet our standards.
              </p>
            </div>

            {/* Impact */}
            <div className="text-center space-y-3">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-lg font-semibold text-text-charcoal">
                Real Impact
              </h3>
              <p className="text-sm text-text-muted leading-relaxed">
                Your choices matter. See how each purchase contributes to a more
                sustainable future.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
