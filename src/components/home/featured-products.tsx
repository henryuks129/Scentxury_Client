'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import type { Product } from '@/types/product';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';

export function FeaturedProducts() {
  const { data, isLoading } = useQuery({
    queryKey: ['products', 'featured'],
    queryFn: async () => {
      const res = await api.get('/products?limit=6&sort=popular');
      return res.data.data.items as Product[];
    },
  });

  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <h2 className="text-center font-serif text-3xl font-bold text-stone-900 dark:text-white md:text-4xl">
        Featured Fragrances
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-center text-stone-600 dark:text-stone-400">
        Our most loved scents, handpicked for you
      </p>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-80 animate-pulse rounded-2xl bg-stone-200 dark:bg-stone-800" />
            ))
          : data?.map((product) => (
              <Link key={product._id} href={`/products/${product.slug}`}
                className="group overflow-hidden rounded-2xl border border-stone-200 bg-white transition-shadow hover:shadow-xl dark:border-stone-800 dark:bg-stone-900">
                <div className="aspect-square bg-stone-100 dark:bg-stone-800" />
                <div className="p-5">
                  <p className="text-xs font-medium uppercase tracking-wider text-amber-600">{product.scentFamily}</p>
                  <h3 className="mt-1 text-lg font-semibold text-stone-900 dark:text-white">{product.name}</h3>
                  <p className="mt-2 font-medium text-stone-700 dark:text-stone-300">
                    {formatCurrency(product.variants[0]?.priceNGN ?? 0)}
                  </p>
                </div>
              </Link>
            ))}
      </div>
    </section>
  );
}
