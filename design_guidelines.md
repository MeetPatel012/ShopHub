# E-Commerce Showcase Design Guidelines

## Design Approach

**Selected Framework**: Reference-Based Approach (E-commerce Category)
Drawing inspiration from modern e-commerce leaders like Shopify, Vercel Store, and premium direct-to-consumer brands that emphasize visual storytelling and seamless shopping experiences.

**Core Principles**:
- Visual product showcase with immersive photography
- Frictionless shopping flow with clear CTAs
- Trust-building through clean, professional aesthetics
- Premium feel with subtle animations and micro-interactions

## Color Palette

**Light Mode**:
- Primary Brand: 0 0% 9% (Deep charcoal for text and primary actions)
- Background: 0 0% 100% (Clean white)
- Secondary Background: 0 0% 98% (Subtle gray for cards/sections)
- Border: 0 0% 90% (Soft dividers)
- Accent: 142 76% 36% (Success green for CTAs, "Add to Cart")
- Destructive: 0 84% 60% (For remove/delete actions)

**Dark Mode**:
- Primary: 0 0% 98% (Off-white text)
- Background: 0 0% 8% (Rich black)
- Secondary Background: 0 0% 12% (Elevated surfaces)
- Border: 0 0% 18% (Subtle dividers)
- Accent: 142 70% 45% (Adjusted green for dark mode)

## Typography

**Font Families**:
- Primary: 'Inter' (Clean, modern sans-serif for UI and body text)
- Display: 'Cal Sans' or 'Satoshi' (Product titles, hero headlines)

**Scale**:
- Hero Headline: text-5xl md:text-7xl font-bold
- Section Titles: text-3xl md:text-4xl font-semibold
- Product Titles: text-xl md:text-2xl font-medium
- Body Text: text-base leading-relaxed
- Small/Meta: text-sm text-muted-foreground

## Layout System

**Spacing Primitives**: Use Tailwind units of 4, 6, 8, 12, 16, 24 for consistent rhythm
- Component padding: p-4 to p-6
- Section spacing: py-12 md:py-16 lg:py-24
- Card gaps: gap-6 to gap-8
- Container max-width: max-w-7xl mx-auto

**Grid System**:
- Product grids: grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6
- Featured sections: grid-cols-1 lg:grid-cols-2 gap-12
- Cart/Checkout: Single column max-w-2xl for focus

## Component Library

**Navigation**:
- Sticky header with backdrop blur effect
- Logo left, primary nav center, cart/search/account icons right
- Mobile: Slide-in drawer with smooth transitions
- Cart badge with item count indicator

**Hero Section**:
- Full-width split layout: 50% large product image, 50% content
- Headline + subheadline + primary CTA
- Background gradient overlay (subtle): from-background/90 to-background
- Height: min-h-[80vh] with centered content

**Product Cards**:
- Image aspect ratio: aspect-square with object-cover
- Hover effect: Scale image to 1.05 with smooth transition
- Quick add-to-cart button appears on hover (desktop)
- Price below title, original price struck through if on sale
- Category tag as subtle badge in top-left corner

**Product Detail Page**:
- Two-column layout: Image gallery (60%), Product info (40%)
- Image gallery: Main image + thumbnail grid below
- Sticky "Add to Cart" section on scroll
- Accordion for product details, shipping, returns
- Related products grid below

**Shopping Cart**:
- Slide-over panel from right (desktop) or full-screen (mobile)
- Product thumbnails with quantity controls
- Remove button with confirmation micro-interaction
- Subtotal with breakdown
- Prominent "Checkout" button at bottom

**Filter & Search**:
- Sidebar filters on desktop (category, price range, ratings)
- Drawer filters on mobile
- Active filters shown as dismissible chips
- Search with instant results dropdown

**Buttons**:
- Primary CTA: bg-accent text-white with hover:bg-accent/90
- Secondary: variant="outline" with border
- Ghost buttons for less emphasis
- Loading states with spinner animation
- Disabled state: opacity-50 cursor-not-allowed

**Forms (Checkout)**:
- Single-column, stepped flow (Shipping → Payment → Review)
- Progress indicator at top
- Input fields with clear labels and validation states
- Error messages below fields in destructive color

## Animations (Motion.dev)

Use sparingly for polish, not distraction:
- Page transitions: Fade in with slight Y-axis movement (20px)
- Product card hover: Scale and subtle shadow increase
- Cart updates: Number badge bounce animation
- Filter application: Stagger animation for product grid updates
- Add to cart: Quick scale pulse on button, then item "flies" to cart icon
- Image galleries: Smooth crossfade transitions

## Images

**Hero Section**: 
- Large, high-quality lifestyle product photography
- Shows product in use/context, not isolated on white
- Professional lighting with depth
- Dimensions: Minimum 1200x800px, optimized WebP format

**Product Images**:
- Multiple angles (front, side, detail shots)
- Consistent white or neutral background for listing pages
- Lifestyle shots for product detail pages
- All images: aspect-square (1:1) for grid consistency

**Category Banners**:
- Full-width imagery with text overlay
- Dimensions: 1920x600px
- Dark overlay (opacity-40) for text readability

## Key Pages Layout

**Homepage**:
1. Hero with featured product/collection
2. Category grid (3-4 columns)
3. Featured products section
4. Benefits/USP row (3 columns: shipping, returns, support)
5. Testimonials slider
6. Newsletter signup

**Product Listing**:
- Filters sidebar (desktop) / drawer (mobile)
- Breadcrumb navigation
- Sort dropdown (price, newest, bestselling)
- Product grid with pagination or infinite scroll
- Quick view modal option

**Product Detail**:
- Image gallery left, product info right
- Quantity selector + Add to Cart CTA
- Tabs: Description, Specifications, Reviews, Shipping
- Cross-sell: "You may also like" section
- Recently viewed products

**Checkout**:
- 3-step process with clear progress indicator
- Order summary sticky sidebar (desktop)
- Payment mockup using card input fields
- Order confirmation page with success animation

This design creates a modern, conversion-optimized e-commerce experience that will impress your client while showcasing the full capabilities of the tech stack.