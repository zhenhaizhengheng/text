import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  sidebarOpen: boolean;
  mobileMenuOpen: boolean;
  currentLanguage: string;
  theme: 'dark' | 'light';
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
  setMobileMenuOpen: (open: boolean) => void;
  setCurrentLanguage: (lang: string) => void;
  toggleTheme: () => void;
  setTheme: (theme: 'dark' | 'light') => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      mobileMenuOpen: false,
      currentLanguage: 'zh',
      theme: 'light',

      toggleSidebar: () => {
        set((state) => ({ sidebarOpen: !state.sidebarOpen }));
      },

      setSidebarOpen: (open: boolean) => {
        set({ sidebarOpen: open });
      },

      toggleMobileMenu: () => {
        set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen }));
      },

      setMobileMenuOpen: (open: boolean) => {
        set({ mobileMenuOpen: open });
      },

      setCurrentLanguage: (lang: string) => {
        set({ currentLanguage: lang });
      },

      toggleTheme: () => {
        set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' }));
      },

      setTheme: (theme: 'dark' | 'light') => {
        set({ theme });
      },
    }),
    {
      name: 'ui-storage',
      partialize: (state) => ({
        currentLanguage: state.currentLanguage,
        theme: state.theme,
        sidebarOpen: state.sidebarOpen,
      }),
    }
  )
);
