# Peedika - Sustainable Ecommerce Frontend

A clean, minimal ecommerce platform focused on sustainability and transparency.

## Project Structure

```
client/
├── app/                        # Next.js App Router pages
│   ├── layout.tsx             # Root layout with CartProvider, Navbar, Footer
│   ├── page.tsx               # Landing page (/)
│   ├── products/
│   │   └── page.tsx           # Products listing page (/products)
│   ├── product/
│   │   └── [id]/
│   │       └── page.tsx       # Product detail page (/product/[id])
│   └── cart/
│       └── page.tsx           # Shopping cart page (/cart)
│
├── components/                 # Reusable UI components
│   ├── Button.tsx             # Primary/secondary button variants
│   ├── EcoScoreBadge.tsx      # Color-coded sustainability badge
│   ├── EcoBreakdown.tsx       # Detailed eco info (materials, packaging, shipping)
│   ├── ProductCard.tsx        # Product preview card for grid
│   ├── CartItem.tsx           # Individual cart item with quantity controls
│   ├── Navbar.tsx             # Sticky navigation with cart count
│   └── Footer.tsx             # Simple footer with mission statement
│
└── lib/                        # Utilities and data
    ├── products.ts            # Mock product data with 12 products
    └── cart-context.tsx       # Cart state management (Context API + localStorage)
```

## Color Palette

The app uses a consistent, sustainability-focused color scheme:

- **Background**: `#F7F7F2` (off-white)
- **Text**: `#1F2933` (charcoal), `#6B7280` (muted)
- **Eco Accent**: `#2F855A` (forest green), `#A7D7C5` (sage)
- **Borders**: `#E5E7EB`
- **Eco Scores**:
  - High (85+): `#2F855A` (green)
  - Medium (70-84): `#D69E2E` (yellow)
  - Low (<70): `#C53030` (red)

## Features

### Pages

1. **Landing Page** (`/`)
   - Minimal hero with sustainability-focused headline
   - Value propositions (Transparency, Curated, Impact)
   - CTA to products page

2. **Products Page** (`/products`)
   - Grid layout of all products
   - Category filter dropdown
   - Eco-score slider filter (0-100)
   - Results count
   - Responsive grid (1-4 columns)

3. **Product Detail** (`/product/[id]`)
   - Large product image
   - Price and category
   - Eco-score badge with label
   - Product description
   - Add to cart button with feedback
   - Detailed eco breakdown (materials, packaging, shipping)
   - Educational "Why This Matters" section

4. **Cart Page** (`/cart`)
   - List of cart items with images
   - Quantity controls (+/- buttons)
   - Remove item functionality
   - Sustainability impact summary (avg eco-score)
   - Total price calculation
   - Placeholder checkout button
   - Empty state with CTA to shop

### Components

- **Button**: Primary (green) and secondary (outlined) variants
- **EcoScoreBadge**: Small/large sizes, color-coded by score level
- **EcoBreakdown**: Three-section breakdown with icons
- **ProductCard**: Hover effects, clickable to detail page
- **CartItem**: Inline quantity controls, subtotal calculation
- **Navbar**: Sticky, minimal, cart badge with count
- **Footer**: Three-column layout with brand info

### State Management

- **Cart Context**: Global cart state using React Context API
- **localStorage**: Cart persists across sessions
- **Functions**: addToCart, removeFromCart, updateQuantity, clearCart
- **Calculations**: totalItems, totalPrice, average eco-score

## Mock Data

12 products across 6 categories:
- Accessories (tote bag, backpack, water bottle)
- Clothing (t-shirt, jacket, socks)
- Footwear (sneakers)
- Home (phone stand, food wraps)
- Electronics (solar charger)
- Fitness (yoga mat)
- Food (coffee)

Each product includes:
- ID, name, price, image URL
- Eco-score (72-96)
- Materials, packaging, shipping details
- Category and description

## Running the App

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **State**: React Context API
- **Images**: Next.js Image component with Unsplash
- **Fonts**: Geist Sans & Geist Mono

## Design Philosophy

- **Editorial & Minimal**: Generous whitespace, calm layout
- **Sustainability-Focused**: Green accents, eco-scores front and center
- **Transparency First**: Detailed breakdowns, no greenwashing
- **Not Inspired By**: Amazon/Flipkart/Myntra layouts
- **Product Storytelling**: Each item tells its environmental story

## Next Steps (Future Enhancements)

- [ ] Add authentication
- [ ] Implement real payment processing
- [ ] Connect to backend API
- [ ] Add GSAP or Framer Motion animations
- [ ] Product search functionality
- [ ] User reviews and ratings
- [ ] Wishlist feature
- [ ] Order history
- [ ] Admin dashboard

## Notes

- This is a hackathon/demo version
- No authentication or payment integration
- All data is mock/hardcoded
- Cart uses localStorage (client-side only)
- Images from Unsplash (configured in next.config.ts)
