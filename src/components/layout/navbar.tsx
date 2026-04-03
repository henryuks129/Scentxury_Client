'use client';

import Link from 'next/link';
import { ShoppingBag, Menu, X, User, Search } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '@/store/auth-store';
import { useCartStore } from '@/store/cart-store';
import { useUIStore } from '@/store/ui-store';
import { cn } from '@/lib/utils';

export function Navbar() {
  const { isAuthenticated, user } = useAuthStore();
  const items = useCartStore((s) => s.items);
  const { toggleCart, toggleMobileNav, isMobileNavOpen } = useUIStore();
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/80 backdrop-blur-md dark:border-stone-800 dark:bg-stone-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="font-serif text-2xl font-bold tracking-tight text-stone-900 dark:text-white">
          Scentxury
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/products" className="text-sm font-medium text-stone-600 transition-colors hover:text-stone-900 dark:text-stone-400 dark:hover:text-white">
            Shop
          </Link>
          <Link href="/products?category=male" className="text-sm font-medium text-stone-600 transition-colors hover:text-stone-900 dark:text-stone-400 dark:hover:text-white">
            Men
          </Link>
          <Link href="/products?category=female" className="text-sm font-medium text-stone-600 transition-colors hover:text-stone-900 dark:text-stone-400 dark:hover:text-white">
            Women
          </Link>
          <Link href="/survey" className="text-sm font-medium text-amber-600 transition-colors hover:text-amber-700">
            Find Your Scent
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button className="hidden rounded-full p-2 text-stone-600 transition-colors hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800 md:block">
            <Search className="h-5 w-5" />
          </button>

          <button onClick={toggleCart} className="relative rounded-full p-2 text-stone-600 transition-colors hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800">
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-600 text-xs font-bold text-white">
                {itemCount}
              </span>
            )}
          </button>

          {isAuthenticated ? (
            <Link href="/profile" className="hidden rounded-full p-2 text-stone-600 transition-colors hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800 md:block">
              <User className="h-5 w-5" />
            </Link>
          ) : (
            <Link href="/login" className="hidden rounded-lg bg-stone-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-stone-800 dark:bg-white dark:text-stone-900 dark:hover:bg-stone-200 md:block">
              Sign In
            </Link>
          )}

          <button onClick={toggleMobileNav} className="rounded-full p-2 text-stone-600 dark:text-stone-400 md:hidden">
            {isMobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {isMobileNavOpen && (
        <div className="border-t border-stone-200 bg-white px-4 py-4 dark:border-stone-800 dark:bg-stone-950 md:hidden">
          <nav className="flex flex-col gap-3">
            <Link href="/products" className="rounded-lg px-3 py-2 text-stone-700 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800">Shop All</Link>
            <Link href="/products?category=male" className="rounded-lg px-3 py-2 text-stone-700 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800">Men</Link>
            <Link href="/products?category=female" className="rounded-lg px-3 py-2 text-stone-700 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800">Women</Link>
            <Link href="/survey" className="rounded-lg px-3 py-2 font-medium text-amber-600">Find Your Scent</Link>
            {!isAuthenticated && (
              <Link href="/login" className="mt-2 rounded-lg bg-stone-900 px-4 py-2 text-center text-white dark:bg-white dark:text-stone-900">Sign In</Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
