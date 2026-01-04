# Backend Integration Guide

## Updated Product Schema

The frontend has been updated to match your teammate's backend Product model.

### Backend Schema (MongoDB)

```javascript
const ProductSchema = new Schema<IProductModel>({
  name: String,
  brand: String,
  category: String,
  price: Number,
  description: String,

  materials: [String],        // Array of materials
  packaging: String,
  shipping_type: String,

  eco_tags: [String],         // Array of eco tags
  eco_score: Number,

  image: String,
});
```

### Frontend Interface

```typescript
export interface Product {
  id: string;                  // Frontend adds ID (will map to _id from backend)
  name: string;
  brand: string;
  category: string;
  price: number;
  description: string;
  materials: string[];         // Array of materials
  packaging: string;
  shipping_type: string;
  eco_tags: string[];          // Array of eco tags
  eco_score: number;           // Changed from ecoScore (camelCase)
  image: string;
}
```

## Key Changes Made

### 1. Field Name Updates
- `ecoScore` → `eco_score` (snake_case to match backend)
- `shipping` → `shipping_type`
- `materials` changed from string to `string[]` (array)
- Added `brand: string`
- Added `eco_tags: string[]`

### 2. Updated Components

#### [lib/products.ts](lib/products.ts)
- ✅ Updated Product interface
- ✅ Updated all 12 mock products with new schema
- ✅ Added brands for each product
- ✅ Converted materials to arrays
- ✅ Added eco_tags for each product
- ✅ Added helper function `getMaterialsDisplay()`

#### [components/EcoBreakdown.tsx](components/EcoBreakdown.tsx)
- ✅ Updated to accept `materials: string[]`
- ✅ Updated to accept `shipping_type` instead of `shipping`
- ✅ Joins materials array for display

#### [components/ProductCard.tsx](components/ProductCard.tsx)
- ✅ Uses `product.eco_score` instead of `product.ecoScore`
- ✅ Displays `product.brand`

#### [components/CartItem.tsx](components/CartItem.tsx)
- ✅ Uses `item.eco_score` instead of `item.ecoScore`
- ✅ Displays `item.brand`

#### [app/product/[id]/page.tsx](app/product/[id]/page.tsx)
- ✅ Uses `product.eco_score`
- ✅ Displays `product.brand`
- ✅ Displays `product.eco_tags` as badges
- ✅ Passes correct fields to EcoBreakdown

#### [app/products/page.tsx](app/products/page.tsx)
- ✅ Filters using `product.eco_score`

#### [app/cart/page.tsx](app/cart/page.tsx)
- ✅ Calculates average using `item.eco_score`

## When Integrating with Real Backend

### 1. Create API Service

Create `lib/api.ts`:

```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(`${API_URL}/products`);
  const data = await response.json();

  // Map MongoDB _id to id
  return data.map((product: any) => ({
    ...product,
    id: product._id,
  }));
}

export async function fetchProductById(id: string): Promise<Product | null> {
  const response = await fetch(`${API_URL}/products/${id}`);
  if (!response.ok) return null;

  const product = await response.json();
  return {
    ...product,
    id: product._id,
  };
}
```

### 2. Update Products Page

```typescript
// app/products/page.tsx
import { useEffect, useState } from 'react';
import { fetchProducts } from '@/lib/api';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  // ... rest of component
}
```

### 3. Update Product Detail Page

```typescript
// app/product/[id]/page.tsx
import { useEffect, useState } from 'react';
import { fetchProductById } from '@/lib/api';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProductById(params.id).then(setProduct);
  }, [params.id]);

  if (!product) return <div>Loading...</div>;

  // ... rest of component
}
```

### 4. Environment Variables

Add to `.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Mock Data Features

All 12 products now include:

- ✅ **brand**: e.g., "EcoCarry", "OceanSave", "BambooWear"
- ✅ **materials**: Array format, e.g., `["100% GOTS-certified organic cotton", "natural dyes"]`
- ✅ **shipping_type**: Clear shipping method description
- ✅ **eco_tags**: Relevant tags, e.g., `["organic", "plastic-free", "reusable", "fair-trade"]`
- ✅ **eco_score**: 72-96 range

## Display Features Added

### Product Detail Page
- Brand name displayed with green accent color
- Eco tags shown as rounded badges
- Materials array properly joined and displayed

### Product Cards
- Brand name shown below product name
- Eco score badge on product image

### Cart Items
- Brand name displayed for each item
- Eco score badge visible

## Testing Checklist

- ✅ Products page loads and displays all products
- ✅ Category filter works correctly
- ✅ Eco-score filter works correctly
- ✅ Product cards show brand and eco_score
- ✅ Product detail page shows:
  - ✅ Brand
  - ✅ Eco score
  - ✅ Eco tags as badges
  - ✅ Materials (array joined)
  - ✅ Shipping type
- ✅ Add to cart works
- ✅ Cart displays items with brand and eco_score
- ✅ Cart calculates average eco_score correctly

## Notes

- All field names now match backend exactly (snake_case where applicable)
- Frontend continues to use TypeScript interfaces for type safety
- Mock data structure is identical to what backend will return
- When you switch to real API, only need to update data fetching logic
- All components are already compatible with the backend schema
