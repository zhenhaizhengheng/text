import { create } from 'zustand';
import { persist } from 'zustand/middleware/persist';
import type { User } from '@/types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, username: string, password: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (_email: string, _password: string) => {
        set({ isLoading: true });
        // TODO: 实现登录逻辑
        set({ isLoading: false });
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },

      register: async (_email: string, _username: string, _password: string) => {
        set({ isLoading: true });
        // TODO: 实现注册逻辑
        set({ isLoading: false });
      },

      updateProfile: async (data: Partial<User>) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        }));
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
