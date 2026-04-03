import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
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
  couponCode: string | null;
  discount: number;
  addItem: (item: CartItem) => void;
  removeItem: (variantSku: string) => void;
  updateQty: (variantSku: string, qty: number) => void;
  clearCart: () => void;
  setCoupon: (code: string, discount: number) => void;
  removeCoupon: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      couponCode: null,
      discount: 0,
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.variantSku === item.variantSku);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.variantSku === item.variantSku
                  ? { ...i, quantity: Math.min(i.quantity + item.quantity, i.maxStock) }
                  : i
              ),
            };
          }
          return { items: [...state.items, item] };
        }),
      removeItem: (sku) =>
        set((s) => ({ items: s.items.filter((i) => i.variantSku !== sku) })),
      updateQty: (sku, qty) =>
        set((s) => ({
          items: s.items.map((i) =>
            i.variantSku === sku ? { ...i, quantity: Math.max(1, Math.min(qty, i.maxStock)) } : i
          ),
        })),
      clearCart: () => set({ items: [], couponCode: null, discount: 0 }),
      setCoupon: (code, discount) => set({ couponCode: code, discount }),
      removeCoupon: () => set({ couponCode: null, discount: 0 }),
    }),
    { name: 'scentxury-cart' }
  )
);
