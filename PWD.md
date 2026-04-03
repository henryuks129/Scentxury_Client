# 📑 PROJECT DEVELOPMENT WORKBOOK (PWD)
## SCENTXURY FRONTEND — Next.js PWA Client

> **Version:** 1.0.0
> **Last Updated:** April 2026
> **Client:** Chi Fragrance, Nigeria
> **Backend API:** `scentxury_server` (Express + MongoDB + Redis)
> **Sprint Duration:** 7 Days

---

## 📋 TABLE OF CONTENTS

1. [Executive Summary](#1-executive-summary)
2. [Frontend Vision & Objectives](#2-frontend-vision--objectives)
3. [Technical Architecture](#3-technical-architecture)
4. [Technology Stack](#4-technology-stack)
5. [Project Structure](#5-project-structure)
6. [Page Specifications](#6-page-specifications)
7. [Component Library](#7-component-library)
8. [Animation & Motion System](#8-animation--motion-system)
9. [State Management](#9-state-management)
10. [Authentication Flow](#10-authentication-flow)
11. [E-commerce User Flow](#11-e-commerce-user-flow)
12. [Admin Dashboard](#12-admin-dashboard)
13. [Social Sharing & Story Canvas](#13-social-sharing--story-canvas)
14. [SEO & Performance Strategy](#14-seo--performance-strategy)
15. [PWA Configuration](#15-pwa-configuration)
16. [API Integration Layer](#16-api-integration-layer)
17. [Testing Strategy](#17-testing-strategy)
18. [Deployment Strategy](#18-deployment-strategy)

---

## 1. EXECUTIVE SUMMARY

### What This Is
**"Fragrance is invisible luxury — the frontend must make it feel tangible."**

1. **Mobile-First, Always** — 75%+ of Nigerian e-commerce traffic is mobile
2. **60fps Animation Standard** — GSAP for complex sequences, Framer Motion for layout transitions
3. **Skeleton-First Loading** — Every data-dependent component shows a skeleton before content
4. **Luxury Aesthetic** — Dark/warm color palette, editorial typography, generous whitespace
5. **Conversion-Optimized** — Every page element drives toward purchase or engagement

### Performance Targets
| Metric | Target |
|--------|--------|
| Lighthouse Performance | > 90 |
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Time to Interactive | < 3.5s |
| Cumulative Layout Shift | < 0.1 |
| Bundle Size (initial) | < 150KB gzipped |

### SEO Targets
- Top 5 Google ranking for "buy perfume online Nigeria"
- Rich snippets via JSON-LD Product schema
- Dynamic OG images for social sharing
- SSR for all public-facing pages

---

## 3. TECHNICAL ARCHITECTURE

### System Diagram
```
┌─────────────────────────────────────────────────────────────────────┐
│                    SCENTXURY FRONTEND ARCHITECTURE                   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐           │
│  │  NEXT.JS APP │    │  STATE LAYER │    │  API LAYER   │           │
│  │              │    │              │    │              │           │
│  │ • App Router │◄──▶│ • React Query│───▶│ • Axios      │──── API  │
│  │ • SSR / ISR  │    │ • Redux TK   │    │ • Socket.io  │          │
│  │ • Middleware  │    │ • Zustand    │    │ • SWR        │          │
│  └──────────────┘    └──────────────┘    └──────────────┘           │
│         │                                       │                    │
│         ▼                                       ▼                    │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐           │
│  │   UI LAYER   │    │  ANIMATION   │    │  EXTERNAL    │           │
│  │              │    │              │    │              │           │
│  │ • Tailwind   │    │ • GSAP       │    │ • Paystack   │           │
│  │ • shadcn/ui  │    │ • Framer     │    │ • Mapbox GL  │           │
│  │ • Radix UI   │    │ • Lottie     │    │ • OneSignal  │           │
│  └──────────────┘    └──────────────┘    └──────────────┘           │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### Rendering Strategy
| Page Type | Strategy | Reason |
|-----------|----------|--------|
| Landing Page | SSG + ISR (60s) | SEO + speed |
| Product Listing | SSR + SWR | SEO + fresh data |
| Product Detail | SSR + ISR (30s) | SEO + variant stock updates |
| Cart / Checkout | CSR | Protected, dynamic |
| Admin Dashboard | CSR | Auth-gated, real-time |
| Auth Pages | SSR | SEO for login/signup |

---
## 4. TECHNOLOGY STACK

### Core Framework
| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 15.x (App Router) | SSR/ISR/SSG framework |
| **React** | 19.x | UI library |
| **TypeScript** | 5.x | Type safety |

### Styling & UI
| Technology | Purpose |
|------------|---------|
| **Tailwind CSS** 4.x | Utility-first styling |
| **shadcn/ui** | Accessible component primitives |
| **Radix UI** | Headless UI primitives |
| **Lucide React** | Icon library |
| **clsx + tailwind-merge** | Conditional class merging |

### Animation & Motion
| Technology | Purpose |
|------------|---------|
| **GSAP** 3.x + ScrollTrigger | Complex scroll animations, parallax, hero sequences |
| **Framer Motion** 11.x | Layout animations, page transitions, micro-interactions |
| **Lottie React** | Pre-built animated illustrations (loading, success) |
| **Tailwind CSS Animate** | Simple hover/focus transitions |

### State & Data Fetching
| Technology | Purpose |
|------------|---------|
| **TanStack React Query** 5.x | Server state, caching, mutations |
| **Zustand** | Lightweight client state (cart, UI state) |
| **Redux Toolkit** | Complex global state (auth, admin) |
| **Zod** | Runtime type validation for API responses |

### Forms & Validation
| Technology | Purpose |
|------------|---------|
| **React Hook Form** | Performant form handling |
| **Zod** | Schema-based validation |
| **@hookform/resolvers** | Zod ↔ React Hook Form bridge |

### Payments & External
| Technology | Purpose |
|------------|---------|
| **@paystack/inline-js** | Paystack payment modal (NGN) |
| **@stripe/stripe-js** | Stripe Elements (USD) |
| **mapbox-gl** | Interactive delivery map |
| **Socket.io Client** | Real-time admin dashboard |
| **OneSignal Web SDK** | Push notifications |

### Testing
| Technology | Purpose |
|------------|---------|
| **Vitest** | Unit testing |
| **React Testing Library** | Component testing |
| **Playwright** | E2E testing |
| **MSW** (Mock Service Worker) | API mocking |

### Dev Tooling
| Technology | Purpose |
|------------|---------|
| **ESLint** + **Prettier** | Linting & formatting |
| **Husky** + **lint-staged** | Pre-commit hooks |
| **next-pwa** (Serwist) | PWA manifest + service worker |
| **next-sitemap** | Auto sitemap generation |
| **Sentry** (@sentry/nextjs) | Error tracking |

---

## 5. PROJECT STRUCTURE

```
scentxury_client/
├── public/
│   ├── icons/              # PWA icons (192, 512)
│   ├── images/             # Static images (logo, hero, placeholders)
│   ├── lottie/             # Lottie animation JSON files
│   ├── manifest.json       # PWA manifest
│   └── robots.txt
│
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── (auth)/         # Auth route group
│   │   │   ├── login/page.tsx
│   │   │   ├── register/page.tsx
│   │   │   └── layout.tsx
│   │   ├── (shop)/         # Public shop routes
│   │   │   ├── page.tsx              # Landing / Home
│   │   │   ├── products/page.tsx     # Product listing
│   │   │   ├── products/[slug]/page.tsx  # Product detail
│   │   │   ├── cart/page.tsx
│   │   │   ├── checkout/page.tsx
│   │   │   ├── survey/page.tsx       # Scent survey
│   │   │   └── layout.tsx
│   │   ├── (account)/      # Protected user routes
│   │   │   ├── profile/page.tsx
│   │   │   ├── orders/page.tsx
│   │   │   ├── orders/[id]/page.tsx
│   │   │   ├── wishlist/page.tsx
│   │   │   ├── referrals/page.tsx
│   │   │   └── layout.tsx
│   │   ├── admin/           # Admin dashboard (CSR)
│   │   │   ├── page.tsx             # Dashboard overview
│   │   │   ├── products/page.tsx    # Product CRUD
│   │   │   ├── products/new/page.tsx # Add product
│   │   │   ├── orders/page.tsx      # Order management
│   │   │   ├── orders/[id]/page.tsx # Order detail
│   │   │   ├── customers/page.tsx   # Customer list
│   │   │   ├── analytics/page.tsx   # BI charts
│   │   │   ├── inventory/page.tsx   # Stock management
│   │   │   ├── expenses/page.tsx    # Expense tracking
│   │   │   ├── settings/page.tsx    # Site settings
│   │   │   ├── coupons/page.tsx     # Discount management
│   │   │   └── layout.tsx           # Admin sidebar layout
│   │   ├── api/              # Next.js API routes (BFF proxy)
│   │   │   └── auth/[...nextauth]/route.ts
│   │   ├── layout.tsx        # Root layout (providers, fonts)
│   │   ├── loading.tsx       # Global loading state
│   │   ├── error.tsx         # Global error boundary
│   │   ├── not-found.tsx     # 404 page
│   │   └── globals.css       # Tailwind base + custom vars
│   │
│   ├── components/
│   │   ├── ui/               # shadcn/ui primitives (Button, Input, etc.)
│   │   ├── layout/           # Navbar, Footer, Sidebar, MobileNav
│   │   ├── home/             # Landing page sections (Hero, Features, Testimonials)
│   │   ├── product/          # ProductCard, VariantSelector, ScentNotes, Carousel
│   │   ├── cart/             # CartDrawer, CartItem, CartSummary
│   │   ├── checkout/         # CheckoutForm, PaymentSelector, AddressForm
│   │   ├── admin/            # AdminSidebar, StatsCard, Charts, DataTable
│   │   ├── auth/             # LoginForm, RegisterForm, OAuthButtons
│   │   ├── chatbot/          # ChatbotWidget, ChatMessage, ChatInput
│   │   ├── survey/           # SurveyStep, ScentPicker, ProgressBar
│   │   ├── social/           # StoryCanvas, ShareModal, QRCode
│   │   ├── shared/           # Skeleton, EmptyState, ErrorFallback, SEO
│   │   └── animations/       # GSAP wrappers, Framer presets, ScrollReveal
│   │
│   ├── hooks/                # Custom React hooks
│   │   ├── useAuth.ts        # Auth state & methods
│   │   ├── useCart.ts        # Cart operations
│   │   ├── useProducts.ts    # Product queries
│   │   ├── useOrders.ts      # Order queries & mutations
│   │   ├── useSocket.ts      # Socket.io connection
│   │   ├── useMediaQuery.ts  # Responsive breakpoints
│   │   └── useDebounce.ts    # Input debouncing
│   │
│   ├── lib/                  # Utility libraries
│   │   ├── api.ts            # Axios instance + interceptors
│   │   ├── socket.ts         # Socket.io client singleton
│   │   ├── validators.ts     # Zod schemas (shared with backend)
│   │   ├── utils.ts          # cn(), formatCurrency(), etc.
│   │   ├── constants.ts      # API routes, scent families, categories
│   │   └── seo.ts            # JSON-LD generators, meta helpers
│   │
│   ├── store/                # Global state
│   │   ├── auth-store.ts     # Zustand auth slice
│   │   ├── cart-store.ts     # Zustand cart slice
│   │   ├── ui-store.ts       # Zustand UI state (modals, drawers)
│   │   └── admin-store.ts    # Redux Toolkit admin slice
│   │
│   ├── providers/            # React context providers
│   │   ├── query-provider.tsx    # TanStack Query
│   │   ├── auth-provider.tsx     # Auth context
│   │   ├── socket-provider.tsx   # Socket.io provider
│   │   └── theme-provider.tsx    # Dark/light + admin color wheel
│   │
│   ├── types/                # TypeScript interfaces
│   │   ├── product.ts
│   │   ├── order.ts
│   │   ├── user.ts
│   │   ├── admin.ts
│   │   └── api.ts            # API response types
│   │
│   └── styles/               # Additional style modules
│       ├── animations.css    # GSAP keyframe definitions
│       └── fonts.css         # Custom font-face declarations
│
├── tests/
│   ├── unit/                 # Vitest component tests
│   ├── integration/          # API integration tests
│   └── e2e/                  # Playwright E2E tests
│
├── .env.local                # Local environment variables
├── .env.example              # Template for env vars
├── next.config.ts            # Next.js configuration
├── tailwind.config.ts        # Tailwind customization
├── tsconfig.json
├── vitest.config.ts
├── playwright.config.ts
├── CLAUDE.md                 # AI coding assistant guide
├── PLAN.md                   # Frontend sprint plan
└── PWD.md                    # This document
```

---

## 6. PAGE SPECIFICATIONS

### 6.1 Landing Page (`/`)
**Rendering:** SSG + ISR (revalidate 60s)
**Purpose:** High-converting entry point — hero, featured products, trust signals, CTA

**Sections:**
1. **Hero** — Full-viewport GSAP parallax with tagline, CTA button, bottle animation
2. **Featured Products** — Horizontal scroll carousel (Framer Motion), 6 products
3. **Why Chi Fragrance** — 3-column trust icons (Same-Day Delivery, Authentic, 1000+ Scents)
4. **Scent Families** — Interactive grid (Woody, Floral, Oud, Sweet, Fresh) with hover animations
5. **Testimonials** — Auto-rotating carousel with customer photos and quotes
6. **Newsletter** — Email capture with discount incentive
7. **Store Location** — Embedded Mapbox map with store marker
8. **Footer** — Links, social icons, contact info

### 6.2 Product Listing (`/products`)
**Rendering:** SSR + SWR
**Features:** Filter sidebar (Category, Scent Family, Price, Size), Sort options, Infinite scroll, Quick-view modal, Sold Out overlay, Skeleton loading

### 6.3 Product Detail (`/products/[slug]`)
**Rendering:** SSR + ISR (30s)
**Layout:**
- 3-Image Carousel (Boxed → Bottle → Bottle+Box)
- Variant Selector (20ml/50ml/100ml) with live price
- Scent Notes pyramid (Top → Middle → Base)
- Longevity & Sillage bar indicators
- Delivery ETA with Mapbox distance check
- QR Code + Social Share modal
- "You May Also Like" ML recommendations

### 6.4 Cart (`/cart`)
**Rendering:** CSR (client-side only)
- Cart drawer (slide-in from right) + dedicated page
- Line items with variant info, quantity +/- buttons
- Real-time stock validation
- Coupon code input with instant validation
- Delivery fee calculator
- Order summary with subtotal, discount, delivery, total

### 6.5 Checkout (`/checkout`) — Protected Route
**Rendering:** CSR, requires auth
- Step wizard: Address → Payment → Confirm
- Address form with Mapbox autocomplete + geocoding
- Same-day delivery eligibility check (before 2PM + within 25km)
- Payment selector: Paystack (NGN) / Stripe (USD)
- Order review before final submission
- BullMQ-powered payment retry (3x on failure)

### 6.6 Auth Pages (`/login`, `/register`)
**Rendering:** SSR
- Shared login form (Hidden Admin pattern — same input for user & admin)
- Google OAuth + Apple Sign-In buttons
- Password strength indicator
- Referral code input on registration
- Post-login routing: admin → `/admin`, user → `/`

### 6.7 Scent Survey (`/survey`)
- Multi-step gamified questionnaire (5-7 steps)
- Progress bar with GSAP animations
- Scent family picker with visual cards
- Occasion selector (Date Night, Office, Casual, etc.)
- Intensity preference slider
- Results page with personalized Combo Mix recommendations

### 6.8 User Account Pages
- **Profile** — Edit name, email, phone, addresses, scent preferences
- **Orders** — Order history table with status badges, tracking link
- **Order Detail** — Full receipt, status timeline, delivery map
- **Wishlist** — Saved products grid with "Move to Cart" action
- **Referrals** — Referral code, share link, progress to reward (5 referrals), GSAP Spin Wheel

### 6.9 Admin Dashboard (`/admin`)
**Rendering:** CSR, admin-only route
- **Overview** — KPI cards (Today/Week/Month/Year sales), real-time order feed
- **Products** — DataTable with CRUD, bulk stock updates, image upload
- **Orders** — Real-time order table, status management, address map
- **Analytics** — Recharts: Line (sales trend), Bar (weekly), Pie (categories), Gauge (profit margin)
- **Inventory** — Stock levels by variant, low-stock alerts, restock form
- **Expenses** — Expense tracker with categories, recurring expense support
- **Customers** — User list, churn risk indicators, custom email campaigns
- **Coupons** — Discount management (daily/weekly/monthly/seasonal/holiday)
- **Settings** — Logo upload, color wheel for theme, Moniepoint account update

---

## 7. ANIMATION & MOTION SYSTEM

### Animation Hierarchy (Performance Priority)
1. **Tailwind CSS** — Simple hover/focus transitions (opacity, scale, color)
2. **Framer Motion** — Layout animations, page transitions, component mount/unmount
3. **GSAP + ScrollTrigger** — Complex scroll-based animations, parallax, timelines
4. **Lottie** — Pre-built animated illustrations (loading, success, empty states)

### Key Animation Specs
| Element | Library | Animation |
|---------|---------|-----------|
| Hero section | GSAP ScrollTrigger | Parallax bottle float + text reveal |
| Page transitions | Framer Motion | Slide + fade between routes |
| Product cards | Framer Motion | Stagger reveal on scroll |
| Add to cart | Framer Motion | Button pulse + count badge bounce |
| Cart drawer | Framer Motion | Slide-in from right |
| Variant selector | Framer Motion | Layout animation on size change |
| Spin the Wheel | GSAP | Rotation timeline + prize reveal |
| Scent Survey steps | Framer Motion | Step slide + progress bar fill |
| Admin charts | Recharts + Framer | Animated bar/line drawing |
| Skeleton loaders | Tailwind animate | Pulse shimmer |
| Toast notifications | Framer Motion | Slide-in + auto-dismiss |
| Chatbot widget | Framer Motion | Bounce-in + message slide |

### Performance Rules
- All animations must run at 60fps (use `will-change` and GPU-accelerated properties)
- GSAP animations use `gsap.context()` for React cleanup
- Framer Motion uses `layout` prop sparingly (expensive)
- Skeleton loaders appear within 100ms of data request
- No animation on initial server render (hydration safety)

---

## 8. STATE MANAGEMENT

### Strategy: Three-Layer Approach
1. **Server State** (TanStack React Query) — Products, orders, user data, admin analytics
2. **Client State** (Zustand) — Cart, UI state (modals, drawers), auth tokens
3. **Complex State** (Redux Toolkit) — Admin dashboard with multiple slices

### React Query Key Structure
```typescript
// Query key conventions
const queryKeys = {
  products: {
    all: ['products'] as const,
    list: (filters: ProductFilters) => ['products', 'list', filters] as const,
    detail: (slug: string) => ['products', 'detail', slug] as const,
    recommendations: (userId?: string) => ['products', 'recs', userId] as const,
  },
  orders: {
    all: ['orders'] as const,
    list: (page: number) => ['orders', 'list', page] as const,
    detail: (id: string) => ['orders', 'detail', id] as const,
  },
  admin: {
    dashboard: ['admin', 'dashboard'] as const,
    sales: (range: DateRange) => ['admin', 'sales', range] as const,
    inventory: ['admin', 'inventory'] as const,
  },
};
```

---

## 9. AUTHENTICATION FLOW

### Hidden Admin Pattern
Admin and user share the same login form. The backend returns the user's role in the JWT payload. Frontend routes based on role:
```
Login → API /auth/login → JWT returned → decode role
  ├── role === 'admin' → redirect /admin
  └── role === 'user'  → redirect / (or previous page)
```

### Auth Methods
1. **Email/Password** — React Hook Form + Zod validation
2. **Google OAuth** — Redirect to backend `/auth/google`, callback handles JWT
3. **Apple Sign-In** — Redirect to backend `/auth/apple`, callback handles JWT

### Protected Routes
- Middleware in `src/middleware.ts` checks JWT cookie on every request
- Admin routes (`/admin/*`) require `role === 'admin'`
- Account routes (`/profile`, `/orders`, etc.) require authenticated user
- Checkout is a backend-protected route (API rejects unauthenticated requests)

---

## 10. E-COMMERCE USER FLOW

```
Browse Products → View Detail → Select Variant → Add to Cart
  → View Cart → Apply Coupon → Proceed to Checkout (auth required)
  → Enter Address → Mapbox ETA check → Select Payment
  → Paystack/Stripe payment → BullMQ processes → Order Confirmed
  → Receipt sent (Email + WhatsApp) → Order tracking page
```

### Cart Implementation (Zustand + Redis)
- Guest cart: stored in Zustand (localStorage backup)
- Logged-in cart: synced to Redis via API
- On login: merge guest cart with server cart
- Stock validated on every cart update and before checkout

---

## 11. SOCIAL SHARING & 3D STORY CANVAS

### Story Canvas (1080×1920 Export)
**Three-Layer Sandwich:**
1. **Background** — Gradient or lifestyle image
2. **Typography** — Scent name positioned behind but slightly above bottle
3. **Bottle Cutout** — AI-masked product image overlay

**Implementation:** Canvas API or html2canvas → generates downloadable image
**Sharing:** `navigator.share()` on mobile; download + instructions on desktop

### Share Targets
- WhatsApp: `https://wa.me/?text={encodedMessage}` with product deep link
- Instagram: Download story image + CTA instructions
- X/Twitter: OG meta card with product image + link
- Facebook: OG meta card
- TikTok: Download + link
- QR Code: Unique per product, scannable to product page

---

## 12. SEO & PERFORMANCE STRATEGY

### SSR/ISR Configuration
- All public pages are server-rendered for SEO
- Product pages use ISR with 30s revalidation
- Sitemap auto-generated via `next-sitemap`

### Meta & Schema
- Dynamic `<title>`, `<meta description>` per page
- JSON-LD Product schema on product detail pages
- JSON-LD Organization schema on landing page
- Open Graph + Twitter Card meta for social sharing
- Canonical URLs to prevent duplicate content

### Image Optimization
- Next.js `<Image>` component with Cloudinary loader
- WebP format with AVIF fallback
- Responsive srcSet (320, 640, 1024, 1920)
- Blur placeholder from Cloudinary low-quality transform

---

## 13. PWA CONFIGURATION

- **Service Worker:** Serwist (next-pwa successor) for offline caching
- **Manifest:** App name, icons (192/512), theme color, start URL
- **Install Prompt:** Custom "Add to Home Screen" banner after 2nd visit
- **Offline Page:** Custom offline fallback with cached product catalog
- **Push Notifications:** OneSignal Web SDK for order updates

---

## 14. API INTEGRATION LAYER

### Axios Instance (`src/lib/api.ts`)
- Base URL from environment variable
- JWT token auto-attached via interceptor
- 401 response triggers token refresh or logout
- Request/response logging in development
- Zod validation on all API responses

### Socket.io Client (`src/lib/socket.ts`)
- Singleton connection for admin dashboard
- Events: `new-order`, `order-status-change`, `payment-received`, `low-stock-alert`, `daily-summary-updated`
- Auto-reconnect with exponential backoff

---

## 15. TESTING STRATEGY

| Layer | Tool | Target |
|-------|------|--------|
| Unit | Vitest + RTL | Components, hooks, utils |
| Integration | Vitest + MSW | API calls, state management |
| E2E | Playwright | Full user flows (purchase, admin) |
| Visual | Storybook (optional) | Component library |

---

## 16. DEPLOYMENT

- **Platform:** Vercel (recommended) or Railway
- **Environment Variables:** API URL, Paystack keys, Stripe keys, Mapbox token, OneSignal ID, Sentry DSN
- **CI/CD:** GitHub Actions → Lint → Test → Build → Deploy
- **Monitoring:** Sentry for error tracking, Vercel Analytics for performance
