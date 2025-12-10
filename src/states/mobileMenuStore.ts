"use client";

import { create } from "zustand";

interface MobileMenuState {
  isOpen: boolean;
  isClosing: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
}

export const useMobileMenuStore = create<MobileMenuState>((set, get) => ({
  isOpen: false,
  isClosing: false,
  openMenu: () => set({ isOpen: true, isClosing: false }),
  closeMenu: () => {
    set({ isClosing: true });
    setTimeout(() => {
      set({ isOpen: false, isClosing: false });
    }, 300);
  },
  toggleMenu: () => {
    const { isOpen } = get();
    if (isOpen) {
      get().closeMenu();
    } else {
      get().openMenu();
    }
  },
}));
