import { create } from 'zustand';

interface UIState {
  isCartOpen: boolean;
  isMobileNavOpen: boolean;
  isChatbotOpen: boolean;
  isShareModalOpen: boolean;
  shareProductId: string | null;
  toggleCart: () => void;
  toggleMobileNav: () => void;
  toggleChatbot: () => void;
  openShareModal: (productId: string) => void;
  closeShareModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isCartOpen: false,
  isMobileNavOpen: false,
  isChatbotOpen: false,
  isShareModalOpen: false,
  shareProductId: null,
  toggleCart: () => set((s) => ({ isCartOpen: !s.isCartOpen })),
  toggleMobileNav: () => set((s) => ({ isMobileNavOpen: !s.isMobileNavOpen })),
  toggleChatbot: () => set((s) => ({ isChatbotOpen: !s.isChatbotOpen })),
  openShareModal: (id) => set({ isShareModalOpen: true, shareProductId: id }),
  closeShareModal: () => set({ isShareModalOpen: false, shareProductId: null }),
}));
