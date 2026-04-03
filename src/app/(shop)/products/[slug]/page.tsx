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
