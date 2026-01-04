/**
 * Product Type Definition
 *
 * Matches backend Product model from MongoDB
 */

export interface Product {
  _id?: string; // MongoDB ID
  id?: string;  // For frontend compatibility
  name: string;
  brand: string;
  category: string;
  price: number;
  description: string;
  materials: string[];
  packaging: string;
  shipping_type: string;
  eco_tags: string[];
  eco_score: number;
  eco_breakdown?: {
    materials: number;
    ethics: number;
    packaging: number;
    shipping: number;
    lifespan: number;
  };
  ai_label?: "high" | "medium" | "low";
  ai_confidence?: number;
  ai_keywords?: {
    positive: string[];
    negative: string[];
  };
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Organic Cotton Tote Bag",
    brand: "EcoCarry",
    category: "accessories",
    price: 28,
    description: "A versatile, durable tote made from certified organic cotton. Perfect for daily use, farmers markets, or beach trips. Each bag saves approximately 500 plastic bags over its lifetime.",
    materials: ["100% GOTS-certified organic cotton", "natural dyes"],
    packaging: "Recyclable paper wrap, no plastic",
    shipping_type: "Carbon-neutral delivery via bike courier networks",
    eco_tags: ["organic", "plastic-free", "reusable", "fair-trade"],
    eco_score: 92,
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80"
  },
  {
    id: "2",
    name: "Recycled Ocean Plastic Backpack",
    brand: "OceanSave",
    category: "accessories",
    price: 89,
    description: "Functional 25L backpack crafted from ocean-recovered plastic. Water-resistant, lightweight, and built to last. Includes padded laptop compartment.",
    materials: ["20 recycled plastic bottles", "ocean-recovered plastic"],
    packaging: "100% recycled cardboard box",
    shipping_type: "Standard carbon-offset shipping",
    eco_tags: ["recycled", "ocean-plastic", "water-resistant", "durable"],
    eco_score: 88,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80"
  },
  {
    id: "3",
    name: "Bamboo Fiber T-Shirt",
    brand: "BambooWear",
    category: "clothing",
    price: 42,
    description: "Incredibly soft, breathable tee made from sustainably harvested bamboo. Naturally antimicrobial and moisture-wicking. Grows without pesticides or irrigation.",
    materials: ["95% bamboo fiber", "5% organic cotton"],
    packaging: "Compostable plant-based wrapper",
    shipping_type: "Consolidated weekly shipments to reduce emissions",
    eco_tags: ["bamboo", "organic", "antimicrobial", "sustainable"],
    eco_score: 85,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80"
  },
  {
    id: "4",
    name: "Hemp Canvas Sneakers",
    brand: "GreenSteps",
    category: "footwear",
    price: 95,
    description: "Classic low-top sneakers made with fast-growing hemp. Durable, breathable, and fully biodegradable at end of life. Natural rubber outsole provides excellent grip.",
    materials: ["hemp canvas upper", "natural rubber sole", "recycled laces"],
    packaging: "Recycled shoebox with soy-based ink",
    shipping_type: "Regional distribution centers minimize distance",
    eco_tags: ["hemp", "biodegradable", "natural-rubber", "recycled"],
    eco_score: 78,
    image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&q=80"
  },
  {
    id: "5",
    name: "Reclaimed Wood Phone Stand",
    brand: "ReclaimCraft",
    category: "home",
    price: 36,
    description: "Handcrafted phone stand from reclaimed barn wood. Each piece is unique with its own grain pattern and history. Finished with food-safe natural oils.",
    materials: ["100% reclaimed barn wood", "natural oil finish"],
    packaging: "Biodegradable cotton pouch",
    shipping_type: "Made-to-order, minimal inventory waste",
    eco_tags: ["reclaimed", "handcrafted", "unique", "zero-waste"],
    eco_score: 94,
    image: "https://images.unsplash.com/photo-1601524909162-ae8725290836?w=800&q=80"
  },
  {
    id: "6",
    name: "Upcycled Denim Jacket",
    brand: "ReThread",
    category: "clothing",
    price: 78,
    description: "One-of-a-kind jacket created from vintage denim pieces. Preventing textile waste while creating unique fashion. No two jackets are identical.",
    materials: ["repurposed vintage denim", "organic cotton thread"],
    packaging: "Reusable fabric garment bag",
    shipping_type: "Low-emission ground shipping",
    eco_tags: ["upcycled", "vintage", "unique", "waste-reduction"],
    eco_score: 90,
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80"
  },
  {
    id: "7",
    name: "Beeswax Food Wraps (Set of 3)",
    brand: "WrapNatural",
    category: "home",
    price: 22,
    description: "Replace single-use plastic wrap with these reusable, washable food covers. Natural antibacterial properties. Lasts up to a year with proper care.",
    materials: ["organic cotton", "sustainably sourced beeswax", "tree resin"],
    packaging: "Paper band, no plastic",
    shipping_type: "Lightweight mailer reduces transport emissions",
    eco_tags: ["reusable", "plastic-free", "organic", "antibacterial"],
    eco_score: 96,
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80"
  },
  {
    id: "8",
    name: "Solar-Powered Portable Charger",
    brand: "SolarTech",
    category: "electronics",
    price: 65,
    description: "10,000mAh solar charger with dual USB ports. Perfect for camping or emergency backup. Charge via solar or USB-C. Built from recycled electronics components.",
    materials: ["recycled aluminum casing", "high-efficiency solar cells"],
    packaging: "Recycled cardboard, minimal foam from recycled materials",
    shipping_type: "Standard shipping",
    eco_tags: ["solar", "recycled", "renewable-energy", "portable"],
    eco_score: 72,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&q=80"
  },
  {
    id: "9",
    name: "Organic Merino Wool Socks",
    brand: "WoolEthics",
    category: "clothing",
    price: 24,
    description: "Temperature-regulating socks from ethically raised sheep. Naturally odor-resistant and moisture-wicking. Incredibly durable - these will last for years.",
    materials: ["100% certified organic merino wool"],
    packaging: "Recycled paper sleeve with seed paper tag",
    shipping_type: "Carbon-neutral shipping option",
    eco_tags: ["organic", "ethical", "merino-wool", "durable"],
    eco_score: 87,
    image: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=800&q=80"
  },
  {
    id: "10",
    name: "Stainless Steel Water Bottle",
    brand: "HydroGreen",
    category: "accessories",
    price: 32,
    description: "Double-walled insulated bottle keeps drinks cold for 24h or hot for 12h. Replaces thousands of plastic bottles. Lifetime warranty against manufacturing defects.",
    materials: ["food-grade 18/8 stainless steel", "BPA-free lid"],
    packaging: "Minimal recycled cardboard sleeve",
    shipping_type: "Bulk shipping to reduce per-unit emissions",
    eco_tags: ["reusable", "BPA-free", "insulated", "lifetime-warranty"],
    eco_score: 83,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80"
  },
  {
    id: "11",
    name: "Cork Yoga Mat",
    brand: "YogaNatura",
    category: "fitness",
    price: 78,
    description: "Antimicrobial cork surface provides excellent grip when wet. Natural rubber backing is biodegradable. Cork is renewable - harvested without harming trees.",
    materials: ["sustainably harvested cork", "natural rubber base"],
    packaging: "Reusable cotton carrying strap",
    shipping_type: "Rolled for efficient shipping space",
    eco_tags: ["cork", "natural-rubber", "biodegradable", "antimicrobial"],
    eco_score: 91,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&q=80"
  },
  {
    id: "12",
    name: "Fair Trade Coffee (1kg)",
    brand: "EquiBean",
    category: "food",
    price: 24,
    description: "Single-origin Ethiopian coffee supporting cooperative farming. Shade-grown to preserve bird habitats. Each bag supports fair wages and community development.",
    materials: ["100% organic arabica beans", "Fair Trade certified"],
    packaging: "Compostable bag with recyclable valve",
    shipping_type: "Direct trade reduces intermediary transport",
    eco_tags: ["fair-trade", "organic", "shade-grown", "single-origin"],
    eco_score: 89,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=80"
  }
];

/**
 * Helper function to get a product by ID
 */
export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id);
}

/**
 * Helper function to get eco-score classification
 */
export function getEcoScoreLevel(score: number): 'high' | 'medium' | 'low' {
  if (score >= 85) return 'high';
  if (score >= 70) return 'medium';
  return 'low';
}

/**
 * Helper function to filter products by category
 */
export function getProductsByCategory(category: string): Product[] {
  return products.filter(product => product.category === category);
}

/**
 * Get all unique categories
 */
export function getCategories(): string[] {
  return Array.from(new Set(products.map(p => p.category)));
}

/**
 * Helper to display materials as a formatted string
 */
export function getMaterialsDisplay(materials: string[]): string {
  return materials.join(", ");
}
