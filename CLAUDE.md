# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## PROJECT OVERVIEW

**Scentxury Client** is a premium Next.js 15 PWA for Chi Fragrance — Nigeria's leading fragrance vendor. This is the consumer and admin-facing frontend that consumes the `scentxury_server` Express.js REST API.

**Core capabilities:**
- High-converting e-commerce storefront with multi-variant products
- Admin BI dashboard with real-time Socket.io charts
- AI chatbot "Angelina" for scent recommendations
- 3D Story Canvas for social media export (1080×1920)
- Scent survey with ML-powered recommendations
- GSAP + Framer Motion animations at 60fps
- PWA with offline support and push notifications

---

## TECH STACK

### Core
| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 15.x (App Router) | SSR/ISR/SSG framework |
| **React** | 19.x | UI library |
| **TypeScript** | 5.x | Type safety |
| **Tailwind CSS** | 4.x | Utility-first styling |

### UI & Animation
| Technology | Purpose |
|------------|---------|
| **shadcn/ui** | Accessible component primitives |
| **GSAP 3.x** + ScrollTrigger | Complex scroll animations, parallax |
| **Framer Motion 11.x** | Layout animations, page transitions |
| **Lottie React** | Animated illustrations |
| **Lucide React** | Icon library |

### State & Data
| Technology | Purpose |
|------------|---------|
| **TanStack React Query 5.x** | Server state, caching |
| **Zustand** | Client state (cart, auth, UI) |
| **Redux Toolkit** | Admin dashboard state |
| **Axios** | HTTP client with interceptors |
| **Socket.io Client** | Real-time admin dashboard |
| **Zod** | Runtime validation |

---

## PROJECT STRUCTURE

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/             # Login, Register
│   ├── (shop)/             # Landing, Products, Cart, Checkout
│   ├── (account)/          # Profile, Orders, Wishlist, Referrals
│   ├── admin/              # Admin dashboard (CSR, role-gated)
│   ├── layout.tsx          # Root layout with providers
│   └── globals.css         # Tailwind base + custom CSS vars
├── components/
│   ├── ui/                 # shadcn/ui primitives
│   ├── layout/             # Navbar, Footer, Sidebar
│   ├── home/               # Landing page sections
│   ├── product/            # ProductCard, VariantSelector
│   ├── cart/               # CartDrawer, CartItem
│   ├── checkout/           # CheckoutForm, PaymentSelector
│   ├── admin/              # Dashboard charts, DataTable
│   ├── chatbot/            # Angelina floating widget
│   ├── survey/             # Scent questionnaire steps
│   ├── social/             # StoryCanvas, ShareModal
│   └── animations/         # GSAP wrappers, ScrollReveal
├── hooks/                  # useAuth, useCart, useProducts, useSocket
├── lib/                    # api.ts, socket.ts, utils.ts, seo.ts
├── store/                  # Zustand stores (auth, cart, UI)
├── providers/              # QueryProvider, AuthProvider, SocketProvider
├── types/                  # TypeScript interfaces
└── styles/                 # Extra CSS modules
```

---

## ESSENTIAL COMMANDS

```bash
# Development
npm run dev          # Start dev server (port 3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint check
npm run type-check   # TypeScript check

# Testing
npm run test         # Vitest unit tests
npm run test:e2e     # Playwright E2E tests
npm run test:watch   # Vitest watch mode
```

---

## CODING STANDARDS

### TypeScript Rules
- **Strict mode enabled** — no `any` types unless absolutely necessary
- All API responses validated with Zod schemas
- All components have typed props interfaces
- Use `as const` for constant objects and enums

### Component Rules
- `'use client'` ONLY when component needs interactivity
- Server Components by default (App Router)
- Every data-fetching component needs a Skeleton loader
- `cn()` utility (clsx + tailwind-merge) for conditional classes
- shadcn/ui for form controls and primitives

### Animation Rules
- Tailwind for hover/focus transitions
- Framer Motion for layout/page transitions
- GSAP for complex scroll animations (always use `gsap.context()`)
- Target 60fps — only animate `transform` and `opacity`

### State Rules
- React Query for ALL server data
- Zustand for client-only state (cart, auth, UI)
- Never duplicate server state in Zustand

### API Rules
- All calls through `src/lib/api.ts` Axios instance
- JWT auto-attached via interceptor
- 401 → redirect to `/login`
- Zod validation on all API responses

---

## BACKEND API

**Base URL (dev):** `http://localhost:5000/api/v1`
**Base URL (prod):** `https://api.scentxury.com/api/v1`

### Key Endpoints
| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/auth/register` | Register user |
| POST | `/auth/login` | Login (hidden admin) |
| GET | `/auth/google` | Google OAuth |
| GET | `/products` | Product list |
| GET | `/products/:slug` | Product detail |
| GET/POST | `/cart` | Cart ops |
| POST | `/orders` | Create order |
| POST | `/payments/paystack/initialize` | Paystack |
| POST | `/payments/stripe/create-intent` | Stripe |
| GET | `/admin/dashboard` | Admin BI |
| POST | `/chatbot/ask` | AI chatbot |
| POST | `/surveys` | Scent survey |

### Response Format
```typescript
// All API responses follow this shape
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
```

### Socket.io Events (Admin Dashboard)
- `new-order` — New order placed
- `order-status-change` — Status updated
- `payment-received` — Payment confirmed
- `low-stock-alert` — Variant below threshold
- `daily-summary-updated` — BI data refreshed

---

## ENVIRONMENT VARIABLES

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_xxx
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_xxx
NEXT_PUBLIC_MAPBOX_TOKEN=pk.xxx
NEXT_PUBLIC_ONESIGNAL_APP_ID=xxx
NEXT_PUBLIC_SENTRY_DSN=https://xxx@sentry.io/xxx
NEXT_PUBLIC_STORE_LAT=6.5244
NEXT_PUBLIC_STORE_LNG=3.3792
```

---

## KEY PAGES & RENDERING

| Page | Route | Rendering |
|------|-------|-----------|
| Landing | `/` | SSG + ISR (60s) |
| Products | `/products` | SSR + SWR |
| Product Detail | `/products/[slug]` | SSR + ISR (30s) |
| Cart | `/cart` | CSR |
| Checkout | `/checkout` | CSR (protected) |
| Login/Register | `/login`, `/register` | SSR |
| Admin Dashboard | `/admin` | CSR (admin-only) |
| Scent Survey | `/survey` | CSR |

---

## PRODUCT CATEGORIES
- `male` — Men's fragrances
- `female` — Women's fragrances
- `unisex` — Unisex fragrances
- `children` — Children's fragrances
- `combo_mix` — Layering combinations

## PRODUCT VARIANTS
Each product has 3 size variants: 20ml, 50ml, 100ml
Each variant has: SKU, priceNGN, priceUSD, costPrice, stock

## SCENT FAMILIES
woody, floral, oud, sweet, fresh, citrus, spicy, aquatic

## ORDER STATUSES
pending → confirmed → processing → shipped → out_for_delivery → delivered → cancelled

---

## DEVELOPMENT NOTES

- The backend must be running on port 5000 for the frontend to work locally
- Docker: `cd ../scentxury_server && npm run docker:dev`
- Product images are stored in Cloudinary and served via CDN
- The "Hidden Admin" pattern means login form is shared — routing is based on JWT role
- Admin color wheel changes are stored in Settings model and applied via CSS variables
- Admin logo changes propagate to Navbar and Footer via Settings API
- Checkout is a backend-protected route (API rejects unauthenticated requests)
