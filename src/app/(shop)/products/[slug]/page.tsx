'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { ShoppingBag, Share2, QrCode, Minus, Plus } from 'lucide-react';
import api from '@/lib/api';
import type { Product, ProductVariant } from '@/types/product';
import { formatCurrency } from '@/lib/utils';
import { useCartStore } from '@/store/cart-store';
import { useUIStore } from '@/store/ui-store';
import { toast } from 'sonner';

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const addItem = useCartStore((s) => s.addItem);
  const { openShareModal } = useUIStore();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const { data: product, isLoading } = useQuery({
    queryKey: ['products', 'detail', slug],
    queryFn: async () => {
      const res = await api.get(`/products/${slug}`);
      const p = res.data.data as Product;
      if (!selectedVariant && p.variants.length) setSelectedVariant(p.variants[0]);
      return p;
    },
    enabled: !!slug,
  });

  const handleAddToCart = () => {
    if (!product || !selectedVariant) return;
    addItem({
      productId: product._id,
      name: product.name,
      slug: product.slug,
      variantSku: selectedVariant.sku,
      size: selectedVariant.size,
      price: selectedVariant.priceNGN,
      image: product.images?.[0] || '',
      quantity: qty,
      maxStock: selectedVariant.currentStock,
    });
    toast.success(`${product.name} (${selectedVariant.size}) added to cart`);
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="aspect-square animate-pulse rounded-2xl bg-stone-200 dark:bg-stone-800" />
          <div className="space-y-4">
            <div className="h-8 w-2/3 animate-pulse rounded bg-stone-200 dark:bg-stone-800" />
            <div className="h-6 w-1/3 animate-pulse rounded bg-stone-200 dark:bg-stone-800" />
            <div className="h-40 animate-pulse rounded bg-stone-200 dark:bg-stone-800" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) return <div className="py-20 text-center text-stone-500">Product not found.</div>;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid gap-10 lg:grid-cols-2">
        {/* Image Gallery - 3 image carousel */}
        <div>
          <div className="aspect-square overflow-hidden rounded-2xl bg-stone-100 dark:bg-stone-800">
            {product.images?.[activeImage] ? (
              <img src={product.images[activeImage]} alt={product.name} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-stone-400">No Image</div>
            )}
          </div>
          {product.images && product.images.length > 1 && (
            <div className="mt-3 flex gap-2">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setActiveImage(i)}
                  className={`h-20 w-20 overflow-hidden rounded-lg border-2 transition-colors ${activeImage === i ? 'border-amber-600' : 'border-transparent'}`}
                >
                  <img src={img} alt={`${product.name} ${i + 1}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <span className="text-sm font-medium uppercase tracking-wider text-amber-600">{product.scentFamily}</span>
          <h1 className="mt-2 font-serif text-3xl font-bold text-stone-900 dark:text-white md:text-4xl">{product.name}</h1>
          <p className="mt-1 text-stone-500">{product.brand}</p>

          {/* Price */}
          {selectedVariant && (
            <p className="mt-4 text-3xl font-bold text-stone-900 dark:text-white">
              {formatCurrency(selectedVariant.priceNGN)}
            </p>
          )}

          {/* Variant Selector */}
          <div className="mt-6">
            <p className="mb-2 text-sm font-medium text-stone-700 dark:text-stone-300">Select Size</p>
            <div className="flex gap-3">
              {product.variants.map((v) => (
                <button key={v.sku} onClick={() => { setSelectedVariant(v); setQty(1); }}
                  disabled={v.currentStock === 0}
                  className={`rounded-lg border px-5 py-3 text-sm font-medium transition-colors ${
                    selectedVariant?.sku === v.sku
                      ? 'border-amber-600 bg-amber-600 text-white'
                      : v.currentStock === 0
                        ? 'border-stone-200 text-stone-400 line-through dark:border-stone-700'
                        : 'border-stone-300 text-stone-700 hover:border-amber-500 dark:border-stone-600 dark:text-stone-300'
                  }`}
                >
                  {v.size}
                  {v.currentStock === 0 && <span className="ml-1 text-xs">(Sold)</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Scent Notes */}
          <div className="mt-6 rounded-xl bg-stone-50 p-5 dark:bg-stone-800/50">
            <p className="mb-3 text-sm font-semibold text-stone-900 dark:text-white">Scent Notes</p>
            <div className="space-y-2 text-sm">
              <div><span className="font-medium text-stone-600 dark:text-stone-400">Top:</span> <span className="text-stone-900 dark:text-white">{product.scentNotes?.top?.join(', ') || '—'}</span></div>
              <div><span className="font-medium text-stone-600 dark:text-stone-400">Middle:</span> <span className="text-stone-900 dark:text-white">{product.scentNotes?.middle?.join(', ') || '—'}</span></div>
              <div><span className="font-medium text-stone-600 dark:text-stone-400">Base:</span> <span className="text-stone-900 dark:text-white">{product.scentNotes?.base?.join(', ') || '—'}</span></div>
            </div>
          </div>

          {/* Quantity + Add to Cart */}
          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center rounded-lg border border-stone-300 dark:border-stone-600">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 text-stone-600 dark:text-stone-400"><Minus className="h-4 w-4" /></button>
              <span className="w-10 text-center font-medium text-stone-900 dark:text-white">{qty}</span>
              <button onClick={() => setQty(Math.min(selectedVariant?.currentStock ?? 1, qty + 1))} className="px-3 py-2 text-stone-600 dark:text-stone-400"><Plus className="h-4 w-4" /></button>
            </div>
            <button onClick={handleAddToCart}
              disabled={!selectedVariant || selectedVariant.currentStock === 0}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-amber-600 py-3 font-semibold text-white transition-colors hover:bg-amber-700 disabled:opacity-50">
              <ShoppingBag className="h-5 w-5" /> Add to Cart
            </button>
          </div>

          {/* Share + QR */}
          <div className="mt-4 flex gap-3">
            <button onClick={() => openShareModal(product._id)}
              className="flex items-center gap-2 rounded-lg border border-stone-300 px-4 py-2 text-sm text-stone-700 transition-colors hover:bg-stone-100 dark:border-stone-600 dark:text-stone-300 dark:hover:bg-stone-800">
              <Share2 className="h-4 w-4" /> Share
            </button>
            <button className="flex items-center gap-2 rounded-lg border border-stone-300 px-4 py-2 text-sm text-stone-700 transition-colors hover:bg-stone-100 dark:border-stone-600 dark:text-stone-300 dark:hover:bg-stone-800">
              <QrCode className="h-4 w-4" /> QR Code
            </button>
          </div>

          {/* Description */}
          <div className="mt-6">
            <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
