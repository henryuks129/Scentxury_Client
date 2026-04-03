export type OrderStatus =
  | 'pending' | 'confirmed' | 'processing'
  | 'shipped' | 'out_for_delivery' | 'delivered' | 'cancelled';

export interface Order {
  _id: string;
  orderNumber: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  currency: 'NGN' | 'USD';
  status: OrderStatus;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod: 'paystack' | 'stripe' | 'bankTransfer';
  paymentReference?: string;
  deliveryAddress: {
    street: string;
    city: string;
    state: string;
    country: string;
    coordinates?: { lat: number; lng: number };
  };
  estimatedDelivery?: string;
  deliveredAt?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  variantSku: string;
  size: string;
  price: number;
  quantity: number;
  total: number;
}
