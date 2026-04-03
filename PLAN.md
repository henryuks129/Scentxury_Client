# PLAN.md — Scentxury Frontend 7-Day Sprint Roadmap

> **Project:** Scentxury PWA Client (Next.js)
> **Backend:** `scentxury_server` (Express + MongoDB + Redis) — assumed operational
> **Duration:** 7 Days
> **Methodology:** Component-First with TDD

---

## SPRINT OVERVIEW

### Daily Breakdown
| Day | Focus | Key Deliverables |
|-----|-------|-----------------|
| 1 | Project Scaffolding & Core Setup | Next.js app, Tailwind, providers, API layer, auth store |
| 2 | Auth System & Layout Shell | Login/Register, OAuth, Navbar, Footer, Protected routes |
| 3 | Product Catalog & Detail Pages | Product listing, filters, detail page, variant selector, carousel |
| 4 | Cart, Checkout & Payments | Cart drawer, checkout flow, Paystack + Stripe integration |
| 5 | Admin Dashboard & BI Charts | Admin layout, KPI cards, Recharts analytics, order management |
| 6 | AI Chatbot, Survey, Social Sharing | Angelina widget, scent survey, story canvas, referral spin |
| 7 | PWA, SEO, Testing & Deployment | Service worker, meta/schema, E2E tests, production deploy |

---

## DAY 1: PROJECT SCAFFOLDING & CORE SETUP

### 1.1 Initialize Next.js Project
```bash
npx create-next-app@latest scentxury_client \
  --typescript --tailwind --eslint --app --src-dir \
  --import-alias "@/*"
```

### 1.2 Install Core Dependencies
```bash
# UI & Styling
npm i clsx tailwind-merge lucide-react class-variance-authority
npx shadcn@latest init

# Animation
npm i gsap @gsap/react framer-motion lottie-react

# State & Data
npm i @tanstack/react-query zustand @reduxjs/toolkit react-redux
npm i axios socket.io-client zod

# Forms
npm i react-hook-form @hookform/resolvers

# Dev
npm i -D vitest @testing-library/react @testing-library/jest-dom
npm i -D msw @playwright/test
npm i -D @types/node
```

### 1.3 Configure Core Files

**`src/lib/api.ts`** — Axios instance with JWT interceptor
```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1',
  withCredentials: true,
  timeout: 10000,
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired — redirect to login
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
```

**`src/store/auth-store.ts`** — Zustand auth store
```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'user' | 'admin';
  avatar?: string;
  referralCode: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setAuth: (user, token) =>
        set({ user, token, isAuthenticated: true }),
      logout: () =>
        set({ user: null, token: null, isAuthenticated: false }),
    }),
    { name: 'scentxury-auth' }
  )
);
```

**`src/store/cart-store.ts`** — Zustand cart store
```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  productId: string;
  name: string;
  slug: string;
  variantSku: string;
  size: string;
  price: number;
  image: string;
  quantity: number;
  maxStock: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (variantSku: string) => void;
  updateQty: (variantSku: string, qty: number) => void;
  clearCart: () => void;
  total: () => number;
  itemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.variantSku === item.variantSku
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.variantSku === item.variantSku
                  ? { ...i, quantity: Math.min(i.quantity + 1, i.maxStock) }
                  : i
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: 1 }] };
        }),
      removeItem: (sku) =>
        set((s) => ({ items: s.items.filter((i) => i.variantSku !== sku) })),
      updateQty: (sku, qty) =>
        set((s) => ({
          items: s.items.map((i) =>
            i.variantSku === sku ? { ...i, quantity: qty } : i
          ),
        })),
      clearCart: () => set({ items: [] }),
      total: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      itemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: 'scentxury-cart' }
  )
);
```

**`src/providers/query-provider.tsx`** — React Query Provider
```typescript
'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: 2,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

### 1.4 Day 1 Checklist
- [ ] Next.js project initialized with App Router
- [ ] Tailwind CSS configured with custom color palette
- [ ] shadcn/ui initialized, Button + Input + Card components added
- [ ] Axios API instance with interceptors
- [ ] Zustand stores (auth, cart, UI)
- [ ] React Query provider wrapped in root layout
- [ ] TypeScript types for Product, Order, User, API responses
- [ ] Environment variables template (`.env.example`)
- [ ] ESLint + Prettier configured
- [ ] Folder structure created per PWD.md spec

---

## DAY 2: AUTH SYSTEM & LAYOUT SHELL

### 2.1 Layout Components
- **Navbar** — Logo (dynamic from admin settings), nav links, cart badge, user avatar/login CTA
- **MobileNav** — Hamburger menu with Framer Motion slide-in drawer
- **Footer** — Brand info, quick links, social icons, newsletter signup
- **AdminSidebar** — Collapsible sidebar with route links and active state

### 2.2 Authentication Pages
- **`/login`** — Email + password form, Google/Apple OAuth buttons, "Forgot password" link
- **`/register`** — Full registration form with referral code field, password strength meter
- **Both** use the Hidden Admin pattern: same form, backend returns role in JWT

### 2.3 Auth Middleware (`src/middleware.ts`)
```typescript
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Protected user routes
  if (pathname.startsWith('/profile') || pathname.startsWith('/checkout')) {
    if (!token) return NextResponse.redirect(new URL('/login', request.url));
  }

  // Admin routes
  if (pathname.startsWith('/admin')) {
    if (!token) return NextResponse.redirect(new URL('/login', request.url));
    // Role check happens in admin layout via API call
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/checkout/:path*', '/admin/:path*', '/orders/:path*'],
};
```

### 2.4 Day 2 Checklist
- [ ] Navbar with responsive mobile drawer
- [ ] Footer with social links and newsletter
- [ ] Login page with form validation (React Hook Form + Zod)
- [ ] Register page with referral code input
- [ ] Google OAuth redirect flow
- [ ] Apple Sign-In redirect flow
- [ ] Next.js middleware for route protection
- [ ] Admin layout with sidebar navigation
- [ ] Auth store integration (login → store token → redirect)
- [ ] Logout flow (clear store + cookie + redirect)

---

## DAY 3: PRODUCT CATALOG & DETAIL PAGES

### 3.1 Product Listing Page (`/products`)
- SSR with React Query hydration
- Filter sidebar: Category, Scent Family, Price Range, Size, Availability
- Sort dropdown: Price (asc/desc), Newest, Popular
- Product grid with responsive columns (1/2/3/4 cols)
- Infinite scroll with `useInfiniteQuery`
- Skeleton loading cards during fetch
- "Sold Out" overlay + "Restock in Progress" badge

### 3.2 Product Card Component
- Product image with hover zoom (Framer Motion)
- Name, scent family tag, price (₦/$ toggle)
- Star rating, "New" / "Sale" badges
- Quick add-to-cart button
- Wishlist heart icon

### 3.3 Product Detail Page (`/products/[slug]`)
- SSR + ISR (30s revalidation) for SEO
- 3-image carousel (Boxed → Bottle → Bottle+Box)
- Variant selector (20ml/50ml/100ml) with live price update
- Scent notes pyramid visualization (Top/Middle/Base)
- Longevity & sillage horizontal bar indicators
- Quantity selector + Add to Cart (animated)
- Delivery ETA section (Mapbox distance to user address)
- Product QR code (downloadable)
- Social share modal (WhatsApp, IG, X, FB, TikTok)
- "You May Also Like" recommendations carousel
- JSON-LD Product schema for SEO

### 3.4 Day 3 Checklist
- [ ] Product listing page with SSR + filters + sorting
- [ ] ProductCard component with hover animations
- [ ] Product detail page with 3-image carousel
- [ ] Variant selector with live pricing
- [ ] Scent notes visualization component
- [ ] Add to Cart with Zustand store integration
- [ ] React Query hooks: `useProducts`, `useProduct`
- [ ] Skeleton loaders for both pages
- [ ] JSON-LD Product schema
- [ ] Wishlist toggle (heart icon)

---

## DAY 4: CART, CHECKOUT & PAYMENTS

### 4.1 Cart System
- **Cart Drawer** — Slide-in from right (Framer Motion), triggered by navbar cart icon
- **Cart Page** (`/cart`) — Full-page cart with item list, coupon input, summary
- **CartItem** — Product image, name, variant, price, qty +/-, remove button
- Stock validation on every quantity change (API call)
- Coupon code input → validate via `POST /api/v1/coupons/validate`

### 4.2 Checkout Flow (`/checkout`)
- **Step 1: Address** — Saved addresses dropdown + new address form with Mapbox autocomplete
- **Step 2: Delivery** — Same-day eligibility check (before 2PM + within 25km), standard delivery option
- **Step 3: Payment** — Paystack (₦) or Stripe ($) selector
- **Step 4: Review** — Order summary, T&C checkbox, Place Order button

### 4.3 Payment Integration
**Paystack (NGN):**
```typescript
import PaystackPop from '@paystack/inline-js';

const payWithPaystack = (email: string, amount: number, ref: string) => {
  const popup = new PaystackPop();
  popup.newTransaction({
    key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
    email, amount: amount * 100, // kobo
    ref,
    onSuccess: (tx) => verifyPayment(tx.reference),
    onCancel: () => handleCancel(),
  });
};
```

### 4.4 Day 4 Checklist
- [ ] Cart drawer with slide animation
- [ ] Cart page with full item management
- [ ] Coupon validation integration
- [ ] Checkout wizard (4 steps)
- [ ] Address form with Mapbox autocomplete
- [ ] Delivery ETA calculator
- [ ] Paystack inline payment integration
- [ ] Stripe Elements payment integration
- [ ] Order confirmation page with receipt
- [ ] BullMQ retry handling (frontend shows "Processing..." state)

---

## DAY 5: ADMIN DASHBOARD & BI CHARTS

### 5.1 Admin Layout
- Collapsible sidebar with navigation links (Dashboard, Products, Orders, Analytics, Inventory, Expenses, Customers, Coupons, Settings)
- Top bar with admin name, notification bell, quick search
- Responsive: sidebar becomes bottom tab bar on mobile

### 5.2 Dashboard Overview (`/admin`)
- **KPI Cards** — Today/Week/Month/Year sales with percentage change indicators
- **Real-time Order Feed** — Socket.io powered live order list
- **Low Stock Alerts** — Warning badges for products below threshold
- **Pending Orders Count** — Badge on sidebar

### 5.3 Analytics Page (`/admin/analytics`)
**Charts (Recharts):**
- Daily Sales Line Chart (current vs previous month)
- Weekly Performance Bar Chart (stacked by payment method)
- Category Revenue Pie Chart (Male/Female/Unisex/Children/Combo)
- Yearly Growth Area Chart
- Inventory Depletion Bar Chart (stock by size, color-coded)
- Profit Margin Gauge

### 5.4 Admin Product CRUD (`/admin/products`)
- DataTable with search, filter, pagination
- Add Product form: name, description, category, scent notes, variants (size/price/cost/stock), images upload to Cloudinary
- Edit/Delete with confirmation modals
- Bulk stock update

### 5.5 Order Management (`/admin/orders`)
- Real-time order table (Socket.io)
- Status update dropdown (pending → confirmed → processing → shipped → delivered)
- Order detail modal with customer info, items, delivery address map
- Export to Google Sheets button

### 5.6 Day 5 Checklist
- [ ] Admin sidebar layout with route navigation
- [ ] Dashboard KPI cards with real data
- [ ] Socket.io integration for real-time order feed
- [ ] Recharts: Line, Bar, Pie, Area, Gauge charts
- [ ] Product CRUD with Cloudinary image upload
- [ ] Order management with status updates
- [ ] Expense tracker page
- [ ] Customer list with churn indicators
- [ ] Inventory management page

---

## DAY 6: AI CHATBOT, SURVEY, SOCIAL SHARING & REFERRALS

### 6.1 AI Chatbot "Angelina"
- Floating widget (bottom-right corner)
- Framer Motion bounce-in animation
- Chat interface with message bubbles
- Sends queries to `POST /api/v1/chatbot/ask`
- Handles: scent questions, layering suggestions, note descriptions, longevity info
- Typing indicator animation

### 6.2 Scent Survey (`/survey`)
- Multi-step wizard (5-7 steps) with Framer Motion page transitions
- Progress bar with animated fill
- Question types: single-select cards, multi-select tags, slider
- Final step: animated recommendation reveal
- Results stored via `POST /api/v1/surveys`

### 6.3 Social Sharing & Story Canvas
- Share modal component (WhatsApp, IG, X, FB, Snapchat, TikTok)
- Story Canvas: generates 1080×1920 image with product + branding
- Implementation: html2canvas or Canvas API
- Download button + `navigator.share()` on mobile
- Product QR code display + download

### 6.4 Referral System
- Referral page: unique code, share link, progress tracker
- GSAP "Spin the Wheel" animation for reward reveal on hitting 5 referrals
- Toast notification (sonner/toastify) on referral milestones

### 6.5 Day 6 Checklist
- [ ] Chatbot floating widget with chat UI
- [ ] Chatbot API integration
- [ ] Scent survey wizard (5+ steps)
- [ ] Survey results → recommendation display
- [ ] Social share modal (6 platforms)
- [ ] Story canvas image generator
- [ ] Product QR code component
- [ ] Referral page with progress tracker
- [ ] GSAP Spin the Wheel animation
- [ ] Store location map (Mapbox)

---
## DAY 7: PWA, SEO, TESTING & DEPLOYMENT
### 7.1 PWA: Serwist config, manifest, offline fallback
### 7.2 SEO: Dynamic metadata, JSON-LD, sitemap
### 7.3 Tests: Vitest unit + Playwright E2E
### 7.4 Deploy: Vercel + Sentry + Lighthouse > 90

### Day 7 Checklist
- [ ] PWA manifest + service worker
- [ ] Offline fallback page
- [ ] Dynamic metadata on all pages
- [ ] JSON-LD schemas (Product, Organization)
- [ ] Auto sitemap generation
- [ ] Unit tests for stores + key components
- [ ] E2E purchase flow test
- [ ] Vercel production deploy
- [ ] Lighthouse score > 90

---

## API ENDPOINT REFERENCE

### Auth
- `POST /auth/register` — Register
- `POST /auth/login` — Login (user + admin)
- `GET /auth/google` — Google OAuth
- `GET /auth/me` — Current user
- `POST /auth/logout` — Logout

### Products
- `GET /products` — List with filters/pagination
- `GET /products/:slug` — Detail by slug
- `GET /products/recommendations` — ML recommendations

### Orders
- `POST /orders` — Create order
- `GET /orders` — User's order history
- `GET /orders/:id` — Order detail

### Payments
- `POST /payments/paystack/initialize` — Start Paystack
- `POST /payments/stripe/create-intent` — Start Stripe
- `POST /payments/verify` — Verify payment

### Admin
- `GET /admin/dashboard` — BI overview
- `GET /admin/analytics/sales` — Sales chart data
- `GET /admin/analytics/categories` — Category breakdown
- `POST /admin/products` — Create product
- `PUT /admin/products/:id` — Update product
- `DELETE /admin/products/:id` — Delete product
- `GET /admin/orders` — All orders
- `PUT /admin/orders/:id/status` — Update status
- `GET /admin/customers` — Customer list
- `POST /admin/expenses` — Add expense
- `GET/PUT /admin/settings` — Site settings

### Other
- `POST /surveys` — Submit scent survey
- `POST /chatbot/ask` — AI chatbot query
- `GET/POST /cart` — Cart operations
- `POST /coupons/validate` — Validate coupon
- `GET/POST /wishlist` — Wishlist operations

---

## ENVIRONMENT VARIABLES

```env
# API
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000

# Payments
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_xxx
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_xxx

# Maps
NEXT_PUBLIC_MAPBOX_TOKEN=pk.xxx

# Push Notifications
NEXT_PUBLIC_ONESIGNAL_APP_ID=xxx

# Monitoring
NEXT_PUBLIC_SENTRY_DSN=https://xxx@sentry.io/xxx

# Store Location
NEXT_PUBLIC_STORE_LAT=6.5244
NEXT_PUBLIC_STORE_LNG=3.3792
NEXT_PUBLIC_STORE_ADDRESS="Chi Fragrance, Lagos, Nigeria"
```

---

## DAY 7: PWA, SEO, TESTING & DEPLOYMENT

### 7.1 PWA Setup
- Serwist plugin in next.config.ts
- manifest.json with app icons and theme
- Service worker for offline caching
- "Add to Home Screen" banner
- Offline fallback page

### 7.2 SEO
- `generateMetadata()` on all pages
- JSON-LD: Product, Organization, Breadcrumb
- next-sitemap for auto sitemap + robots.txt
- OG images, canonical URLs

### 7.3 Testing
- Unit: Auth/Cart stores, ProductCard, utilities
- Integration: API hooks with MSW mocks
- E2E (Playwright): Purchase flow, Admin login, Product CRUD

### 7.4 Deployment
- Vercel deployment with environment variables
- GitHub Actions CI: Lint → Test → Build → Deploy
- Sentry integration for error tracking
- Performance monitoring via Vercel Analytics

### 7.5 Day 7 Checklist
- [ ] PWA manifest + service worker
- [ ] Offline fallback page
- [ ] SEO meta on all pages
- [ ] JSON-LD schemas
- [ ] Sitemap generation
- [ ] Unit tests (20+ tests)
- [ ] E2E tests (purchase flow, admin flow)
- [ ] Vercel deployment
- [ ] Sentry error tracking
- [ ] Final Lighthouse audit (target >90)

---

## API ENDPOINTS REFERENCE

The frontend consumes these backend endpoints:

### Auth
| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login (user + admin) |
| POST | `/auth/logout` | Clear session |
| GET | `/auth/google` | Google OAuth redirect |
| GET | `/auth/google/callback` | Google OAuth callback |
| GET | `/auth/apple` | Apple Sign-In redirect |
| GET | `/auth/me` | Get current user profile |
| PUT | `/auth/profile` | Update profile |

### Products
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/products` | List products (filters, pagination) |
| GET | `/products/:slug` | Product detail |
| GET | `/products/recommendations` | ML recommendations |
| GET | `/products/:id/qr` | Generate QR code |

### Cart
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/cart` | Get user cart |
| POST | `/cart` | Add to cart |
| PUT | `/cart/:itemId` | Update quantity |
| DELETE | `/cart/:itemId` | Remove item |

### Orders
| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/orders` | Create order |
| GET | `/orders` | List user orders |
| GET | `/orders/:id` | Order detail |
| GET | `/orders/:id/receipt` | Download receipt |

### Payments
| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/payments/paystack/initialize` | Start Paystack payment |
| POST | `/payments/paystack/verify` | Verify Paystack payment |
| POST | `/payments/stripe/create-intent` | Create Stripe intent |
| POST | `/payments/webhook/paystack` | Paystack webhook |
| POST | `/payments/webhook/stripe` | Stripe webhook |

### Survey & Recommendations
| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/surveys` | Submit scent survey |
| GET | `/recommendations` | Get personalized recs |
| POST | `/chatbot/ask` | AI chatbot query |

### Coupons
| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/coupons/validate` | Validate coupon code |

### Admin (Protected)
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/admin/dashboard` | Dashboard overview KPIs |
| GET | `/admin/analytics/sales` | Sales trend data |
| GET | `/admin/analytics/categories` | Category breakdown |
| GET | `/admin/inventory` | Inventory status |
| POST | `/admin/products` | Create product |
| PUT | `/admin/products/:id` | Update product |
| DELETE | `/admin/products/:id` | Delete product |
| POST | `/admin/products/:id/stock` | Add/adjust stock |
| GET | `/admin/orders` | All orders |
| PUT | `/admin/orders/:id/status` | Update order status |
| GET | `/admin/customers` | Customer list |
| POST | `/admin/expenses` | Add expense |
| GET | `/admin/expenses` | List expenses |
| PUT | `/admin/settings` | Update site settings |
| POST | `/admin/email/campaign` | Send custom email |
| GET | `/admin/export/orders` | Export to Google Sheets |

### Wishlist & Referrals
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/wishlist` | Get user wishlist |
| POST | `/wishlist` | Add to wishlist |
| DELETE | `/wishlist/:id` | Remove from wishlist |
| GET | `/referrals` | Referral stats |
| POST | `/referrals/apply` | Apply referral code |

---
*End of PLAN.md — Scentxury Frontend Sprint Roadmap*
