'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Product } from '@/types/product';
import { formatCurrency } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const cheapestVariant = product.variants.reduce((a, b) =>
    a.priceNGN < b.priceNGN ? a : b
  );
  const isOutOfStock = product.variants.every((v) => v.currentStock === 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-2xl border border-stone-200 bg-white transition-shadow hover:shadow-xl dark:border-stone-800 dark:bg-stone-900"
    >
      {/* Sold Out Overlay */}
      {isOutOfStock && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/60">
          <span className="rounded-full bg-red-600 px-4 py-1 text-sm font-bold text-white">SOLD OUT</span>
          <span className="mt-2 text-xs text-stone-300">Restock in progress</span>
        </div>
      )}

      {/* Wishlist Heart */}
      <button className="absolute right-3 top-3 z-20 rounded-full bg-white/80 p-2 opacity-0 transition-opacity group-hover:opacity-100 dark:bg-stone-800/80">
        <Heart className="h-4 w-4 text-stone-600 dark:text-stone-400" />
      </button>

      <Link href={`/products/${product.slug}`}>
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-stone-100 dark:bg-stone-800">
          {product.images?.[0] ? (
            <Image src={product.images[0]} alt={product.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
          ) : (
            <div className="flex h-full items-center justify-center text-stone-400">No Image</div>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          <span className="text-xs font-medium uppercase tracking-wider text-amber-600">
            {product.scentFamily}
          </span>
          <h3 className="mt-1 text-base font-semibold text-stone-900 dark:text-white">
            {product.name}
          </h3>
          <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">{product.brand}</p>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-lg font-bold text-stone-900 dark:text-white">
              {formatCurrency(cheapestVariant.priceNGN)}
            </span>
            <span className="text-xs text-stone-500">
              from {cheapestVariant.size}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
