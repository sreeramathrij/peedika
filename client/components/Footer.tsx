/**
 * Footer Component
 *
 * Simple, minimal footer with basic information
 * Displays mission statement and copyright
 */

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-border-base mt-auto">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-3">
              <Image
                src="/peedika.png"
                alt="Peedika - Sustainable Future"
                width={140}
                height={45}
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-sm text-text-muted leading-relaxed">
              Making sustainable shopping accessible and transparent.
            </p>
          </div>

          {/* Mission */}
          <div>
            <h4 className="text-sm font-semibold text-text-charcoal mb-2">
              Our Mission
            </h4>
            <p className="text-sm text-text-muted leading-relaxed">
              Every product tells a story. We believe you deserve to know the
              environmental impact of your purchases.
            </p>
          </div>

          {/* Impact */}
          <div>
            <h4 className="text-sm font-semibold text-text-charcoal mb-2">
              Transparency First
            </h4>
            <p className="text-sm text-text-muted leading-relaxed">
              All eco-scores are based on materials, packaging, and shipping
              methods. No greenwashing.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-border-base">
          <p className="text-xs text-text-muted text-center">
            © {new Date().getFullYear()} Peedika. A hackathon project for
            sustainable ecommerce.
          </p>
        </div>
      </div>
    </footer>
  );
}
