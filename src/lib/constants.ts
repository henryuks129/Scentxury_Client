export const PRODUCT_CATEGORIES = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'unisex', label: 'Unisex' },
  { value: 'children', label: 'Children' },
  { value: 'combo_mix', label: 'Combo Mix' },
] as const;

export const SCENT_FAMILIES = [
  'woody', 'floral', 'oud', 'sweet',
  'fresh', 'citrus', 'spicy', 'aquatic',
] as const;

export const PRODUCT_SIZES = ['20ml', '50ml', '100ml'] as const;

export const ORDER_STATUSES = [
  'pending', 'confirmed', 'processing',
  'shipped', 'out_for_delivery', 'delivered', 'cancelled',
] as const;
