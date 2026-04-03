export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: 'user' | 'admin';
  avatar?: string;
  googleId?: string;
  appleId?: string;
  addresses: Address[];
  scentPreferences?: ScentPreferences;
  referralCode: string;
  referredBy?: string;
  referralCount: number;
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
}

export interface Address {
  _id: string;
  label: string;
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode?: string;
  coordinates?: { lat: number; lng: number };
  isDefault: boolean;
}

export interface ScentPreferences {
  preferredNotes: string[];
  avoidNotes: string[];
  intensity: 'light' | 'moderate' | 'strong';
  occasions: string[];
}
