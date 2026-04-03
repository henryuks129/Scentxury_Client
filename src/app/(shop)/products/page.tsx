'use client';

import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import type { Product } from '@/types/product';
import { ProductCard } from '@/components/product/product-card';
import { PRODUCT_CATEGORIES, SCENT_FAMILIES } from '@/lib/constants';
import { useState } from 'react';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') || '';
  const scentParam = searchParams.get('scentFamily') || '';

  const [category, setCategory] = useState(categoryParam);
  const [scentFamily, setScentFamily] = useState(scentParam);
  const [sort, setSort] = useState('newest');

  const { data, isLoading } = useQuery({
    queryKey: ['products', 'list', category, scentFamily, sort],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (category) params.set('category', category);
      if (scentFamily) params.set('scentFamily', scentFamily);
      params.set('sort', sort);
      const res = await api.get(`/products?${params}`);
      return res.data.data.items as Product[];
    },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-white">Shop Fragrances</h1>

      {/* Filters Row */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <select value={category} onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm dark:border-stone-700 dark:bg-stone-800 dark:text-white">
          <option value="">All Categories</option>
          {PRODUCT_CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>

        <select value={scentFamily} onChange={(e) => setScentFamily(e.target.value)}
          className="rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm dark:border-stone-700 dark:bg-stone-800 dark:text-white">
          <option value="">All Scent Families</option>
          {SCENT_FAMILIES.map((s) => (
            <option key={s} value={s} className="capitalize">{s}</option>
          ))}
        </select>

        <select value={sort} onChange={(e) => setSort(e.target.value)}
          className="rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm dark:border-stone-700 dark:bg-stone-800 dark:text-white">
          <option value="newest">Newest</option>
          <option value="price_asc">Price: Low → High</option>
          <option value="price_desc">Price: High → Low</option>
          <option value="popular">Most Popular</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-80 animate-pulse rounded-2xl bg-stone-200 dark:bg-stone-800" />
            ))
          : data?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
      </div>

      {!isLoading && data?.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-lg text-stone-500">No fragrances found matching your filters.</p>
        </div>
      )}
    </div>
  );
}
