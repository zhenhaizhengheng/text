import { create } from 'zustand';
import { persist } from 'zustand/middleware/persist';
import type { User } from '@/types';

interface RegisterData {
  username: string;
  email: string;
  password: string;
  nativeLanguage: string;
  targetLanguage: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: RegisterData) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  clearError: () => void;
}

const generateMockUser = (email: string, username: string): User => ({
  id: `user-${Date.now()}`,
  email,
  username,
  avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
  bio: '热爱语言学习，正在探索新的世界！',
  targetLanguage: 'lang-en',
  level: 'beginner',
  experience: 0,
  coins: 100,
  streakDays: 0,
  totalWords: 0,
  totalMinutes: 0,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          await new Promise((resolve) => setTimeout(resolve, 1000));

          if (!email || !password) {
            throw new Error('请填写邮箱和密码');
          }

          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)) {
            throw new Error('请输入有效的邮箱地址');
          }

          if (password.length < 6) {
            throw new Error('密码长度至少为6位');
          }

          const mockToken = `token_${btoa(email)}_${Date.now()}`;
          const username = email.split('@')[0];
          const mockUser = generateMockUser(email, username);

          localStorage.setItem('auth_token', mockToken);

          set({
            user: mockUser,
            token: mockToken,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (err) {
          set({
            isLoading: false,
            error: err instanceof Error ? err.message : '登录失败，请重试',
          });
          throw err;
        }
      },

      logout: () => {
        localStorage.removeItem('auth_token');
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
      },

      register: async (data: RegisterData) => {
        set({ isLoading: true, error: null });
        try {
          await new Promise((resolve) => setTimeout(resolve, 1500));

          if (!data.email || !data.password || !data.username) {
            throw new Error('请填写所有必填字段');
          }

          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(data.email)) {
            throw new Error('请输入有效的邮箱地址');
          }

          if (data.password.length < 6) {
            throw new Error('密码长度至少为6位');
          }

          if (data.username.length < 2) {
            throw new Error('用户名至少为2个字符');
          }

          const mockToken = `token_${btoa(data.email)}_${Date.now()}`;
          const mockUser = {
            ...generateMockUser(data.email, data.username),
            targetLanguage: data.targetLanguage,
          };

          localStorage.setItem('auth_token', mockToken);

          set({
            user: mockUser,
            token: mockToken,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (err) {
          set({
            isLoading: false,
            error: err instanceof Error ? err.message : '注册失败，请重试',
          });
          throw err;
        }
      },

      updateProfile: async (data: Partial<User>) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...data, updatedAt: new Date().toISOString() } : null,
        }));
      },

      clearError: () => {
        set({ error: null });
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
