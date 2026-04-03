# Scentxury Client

The frontend for **Chi Fragrance** — Nigeria's leading fragrance vendor. A high-performance Next.js 15 PWA with an AI chatbot, admin BI dashboard, 3D story canvas, and ML-powered scent survey.

---

## Tech Stack

- **Next.js 15** (App Router) — SSR, ISR, SSG
- **React 19** + **TypeScript 5**
- **Tailwind CSS 4** + **shadcn/ui**
- **TanStack React Query 5** — server state
- **Zustand** — client state (cart, auth, UI)
- **Axios** — HTTP client with JWT interceptor
- **Socket.io Client** — real-time admin dashboard
- **GSAP** + **Framer Motion** — 60fps animations
- **Zod** — runtime validation

---

## Getting Started

### Prerequisites

- Node.js 20+
- The `scentxury_server` backend running (see server README)

### Install

```bash
npm install
```

### Environment

Copy the example and fill in your values:

```bash
cp .env.example .env.local
```

Required variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=
NEXT_PUBLIC_MAPBOX_TOKEN=
NEXT_PUBLIC_ONESIGNAL_APP_ID=
NEXT_PUBLIC_STORE_LAT=6.5244
NEXT_PUBLIC_STORE_LNG=3.3792
```

### Run

```bash
npm run dev       # http://localhost:3000
npm run build     # production build
npm run start     # serve production build
```

---

## Project Structure

```
src/
├── app/             # Next.js App Router pages
│   ├── (auth)/      # Login, Register
│   ├── (shop)/      # Landing, Products, Cart, Checkout
│   ├── (account)/   # Profile, Orders, Wishlist, Referrals
│   └── admin/       # Admin BI dashboard (role-gated)
├── components/      # UI components by feature
├── hooks/           # Custom React hooks
├── lib/             # api.ts, socket.ts, utils.ts
├── store/           # Zustand stores
├── providers/       # QueryProvider, AuthProvider, SocketProvider
└── types/           # TypeScript interfaces
```

---

## Key Features

| Feature | Description |
|---|---|
| Storefront | Multi-variant product catalog with cart and checkout |
| Payments | Paystack (NGN) + Stripe (USD) |
| Admin Dashboard | Real-time BI with Socket.io charts |
| Angelina Chatbot | AI-powered scent recommendations |
| Scent Survey | ML-scored questionnaire with product matching |
| 3D Story Canvas | 1080×1920 social media export |
| PWA | Offline support + push notifications |
| Google OAuth | One-tap sign-in |

---

## Scripts

```bash
npm run dev          # Dev server
npm run build        # Production build
npm run lint         # ESLint
npm run type-check   # TypeScript check
npm run test         # Vitest unit tests
npm run test:e2e     # Playwright E2E tests
```

---

## Deployment

Deployed on **Vercel**. Set all `NEXT_PUBLIC_*` environment variables in your Vercel project settings. Point `NEXT_PUBLIC_API_URL` to your production backend URL.
