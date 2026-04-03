export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  category: 'male' | 'female' | 'unisex' | 'children' | 'combo_mix';
  brand: string;
  scentNotes: { top: string[]; middle: string[]; base: string[] };
  scentFamily: string;
  longevity: string;
  sillage: string;
  images: string[];
  variants: ProductVariant[];
  isActive: boolean;
  rating: number;
  reviewCount: number;
  tags: string[];
  qrCode?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductVariant {
  _id: string;
  sku: string;
  size: '20ml' | '50ml' | '100ml';
  priceNGN: number;
  priceUSD: number;
  costPrice: number;
  currentStock: number;
  soldCount: number;
  lowStockThreshold: number;
  isAvailable: boolean;
}
