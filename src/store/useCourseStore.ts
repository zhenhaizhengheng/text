import { create } from 'zustand';
import type { Course } from '@/types';

interface CourseFilters {
  language: string;
  level: string;
  search: string;
}

interface CourseState {
  courses: Course[];
  currentCourse: Course | null;
  filters: CourseFilters;
  isLoading: boolean;
  fetchCourses: () => Promise<void>;
  fetchCourseById: (id: string) => Promise<void>;
  setFilters: (filters: Partial<CourseFilters>) => void;
}

export const useCourseStore = create<CourseState>((set) => ({
  courses: [],
  currentCourse: null,
  filters: {
    language: '',
    level: '',
    search: '',
  },
  isLoading: false,

  fetchCourses: async () => {
    set({ isLoading: true });
    // TODO: 实现获取课程列表逻辑
    set({ isLoading: false });
  },

  fetchCourseById: async (_id: string) => {
    set({ isLoading: true });
    // TODO: 实现获取单个课程逻辑
    set({ isLoading: false });
  },

  setFilters: (filters: Partial<CourseFilters>) => {
    set((state) => ({
      filters: { ...state.filters, ...filters },
    }));
  },
}));
