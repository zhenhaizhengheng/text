import { create } from 'zustand';
import type { LearningProgress, SkillRadar, Achievement, DailyRecord } from '@/types';

interface ProgressState {
  progress: LearningProgress | null;
  skills: SkillRadar;
  achievements: Achievement[];
  weeklyData: DailyRecord[];
  isLoading: boolean;
  fetchProgress: () => Promise<void>;
  recordLearning: (minutes: number, words: number, lessonsCompleted: number) => void;
}

export const useProgressStore = create<ProgressState>((set) => ({
  progress: null,
  skills: {
    vocabulary: 0,
    grammar: 0,
    listening: 0,
    speaking: 0,
    reading: 0,
    writing: 0,
  },
  achievements: [],
  weeklyData: [],
  isLoading: false,

  fetchProgress: async () => {
    set({ isLoading: true });
    // TODO: 实现获取学习进度逻辑
    set({ isLoading: false });
  },

  recordLearning: (minutes: number, words: number, lessonsCompleted: number) => {
    set((state) => ({
      progress: state.progress
        ? {
            ...state.progress,
            totalMinutes: state.progress.totalMinutes + minutes,
            totalWords: state.progress.totalWords + words,
            completedLessons: state.progress.completedLessons + lessonsCompleted,
          }
        : state.progress,
    }));
  },
}));
