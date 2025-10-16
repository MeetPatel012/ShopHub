# ShopHub E-Commerce Platform

## Overview

ShopHub is a modern, full-stack e-commerce platform built with React, Express, and TypeScript. The application showcases premium products across multiple categories (Electronics, Fashion, Lifestyle, Accessories) with a focus on visual storytelling, frictionless shopping experiences, and premium aesthetics. The platform features a complete shopping flow including product browsing, cart management, and checkout functionality.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Routing:**
- React 18 with TypeScript for type safety
- Wouter for lightweight client-side routing (SPA architecture)
- Vite as the build tool and development server

**State Management:**
- React Context API for cart state management (CartProvider)
- TanStack React Query (v5) for server state and data fetching
- Local storage persistence for cart items and theme preferences

**UI Component System:**
- shadcn/ui component library with Radix UI primitives
- Tailwind CSS for styling with custom design system
- Theme switching capability (light/dark mode) via ThemeProvider
- Responsive design with mobile-first approach

**Design System:**
- Custom color palette optimized for e-commerce (defined in index.css)
- Typography scale using Inter font family
- Spacing system based on Tailwind's 4/6/8/12/16/24 unit scale
- Hover and active state elevations for interactive elements

### Backend Architecture

**Server Framework:**
- Express.js with TypeScript
- ESM module system (type: "module")
- RESTful API design pattern

**Development Setup:**
- Vite middleware integration for HMR in development
- Static file serving in production
- Request/response logging middleware
- Error handling middleware

**API Structure:**
- `/api/products` - Product listing and filtering
- `/api/products/:id` - Individual product details
- `/api/cart` - Cart operations (get, add, update, remove)
- `/api/orders` - Order creation and retrieval

**Storage Strategy:**
- In-memory storage implementation (MemStorage class)
- Interface-based storage abstraction (IStorage) for future database migration
- Session-based cart isolation using session IDs

### Data Schema

**Database Design (Drizzle ORM):**
- PostgreSQL dialect configuration
- Three main tables: products, cartItems, orders
- UUID primary keys with PostgreSQL's gen_random_uuid()
- Decimal precision for pricing (10,2)
- Array type for product images

**Type Safety:**
- Drizzle-Zod integration for runtime validation
- Shared schema types between client and server
- Insert schemas for API request validation

### External Dependencies

**UI & Component Libraries:**
- @radix-ui/* - Headless UI primitives (dialogs, dropdowns, popovers, etc.)
- shadcn/ui - Pre-built accessible components
- cmdk - Command menu/palette functionality
- embla-carousel-react - Product image carousels
- lucide-react - Icon library

**Form Management:**
- react-hook-form - Form state management
- @hookform/resolvers - Zod resolver integration
- zod - Schema validation

**Database & ORM:**
- drizzle-orm - Type-safe ORM
- @neondatabase/serverless - Neon PostgreSQL serverless driver
- drizzle-kit - Migration tooling

**Utilities:**
- date-fns - Date formatting and manipulation
- clsx & tailwind-merge - Conditional class name handling
- class-variance-authority - Component variant management

**Build & Development:**
- tsx - TypeScript execution for development
- esbuild - Server-side bundling
- @replit/* plugins - Replit-specific development tools

### Authentication & Sessions

Currently uses session IDs for cart isolation without formal authentication. The architecture supports future authentication integration through the session management pattern.

### Image Assets

Product images are served from the `/images` directory in the public folder, with a predefined mapping in the storage layer linking product types to specific image files.

### API Communication

- Fetch API for HTTP requests
- Centralized apiRequest helper with error handling
- Query client configuration with custom fetch functions
- Credential inclusion for session management