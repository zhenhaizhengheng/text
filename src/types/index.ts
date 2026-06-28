export interface User {
  id: string;
  email: string;
  username: string;
  avatarUrl: string;
  bio: string;
  targetLanguage: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  experience: number;
  coins: number;
  streakDays: number;
  totalWords: number;
  totalMinutes: number;
  createdAt: string;
  updatedAt: string;
}

export interface Course {
  id: string;
  language: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  coverImage: string;
  instructor: string;
  instructorAvatar: string;
  totalLessons: number;
  totalHours: number;
  rating: number;
  studentsCount: number;
  price: number;
  isFree: boolean;
  tags: string[];
  createdAt: string;
  lessons?: Lesson[];
  progress?: number;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  content: string;
  orderIndex: number;
  durationMinutes: number;
  audioUrl?: string;
  isCompleted?: boolean;
  isLocked?: boolean;
  vocabulary?: VocabularyItem[];
  grammarPoints?: GrammarPoint[];
  listeningMaterials?: ListeningMaterial[];
}

export interface VocabularyItem {
  id: string;
  lessonId: string;
  word: string;
  phonetic: string;
  meaning: string;
  exampleEn: string;
  exampleCn: string;
  partOfSpeech: string;
  difficulty: number;
  masteryLevel?: number;
}

export interface GrammarPoint {
  id: string;
  lessonId: string;
  title: string;
  explanation: string;
  exampleSentence: string;
  ruleSummary: string;
}

export interface ListeningMaterial {
  id: string;
  lessonId: string;
  title: string;
  audioUrl: string;
  transcript: string;
  difficulty: string;
  durationSeconds: number;
  category: string;
}

export interface Language {
  id: string;
  name: string;
  nameEn: string;
  flag: string;
  color: string;
  learnersCount: number;
  description: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'streak' | 'words' | 'lessons' | 'level' | 'social' | 'special';
  requirementValue: number;
  requirementType: string;
  rewardExp: number;
  rewardCoins: number;
  unlocked?: boolean;
  unlockedAt?: string;
  progress?: number;
}

export interface Post {
  id: string;
  userId: string;
  user: User;
  topicId?: string;
  topic?: Topic;
  content: string;
  type: 'checkin' | 'discussion' | 'achievement' | 'question';
  images?: string[];
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
  createdAt: string;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  user: User;
  content: string;
  createdAt: string;
}

export interface Topic {
  id: string;
  name: string;
  description: string;
  icon: string;
  postsCount: number;
  color: string;
}

export interface DailyRecord {
  date: string;
  minutes: number;
  words: number;
  lessonsCompleted: number;
}

export interface LearningProgress {
  totalMinutes: number;
  totalWords: number;
  completedCourses: number;
  completedLessons: number;
  streakDays: number;
  accuracy: number;
  weeklyData: DailyRecord[];
}

export interface SkillRadar {
  vocabulary: number;
  grammar: number;
  listening: number;
  speaking: number;
  reading: number;
  writing: number;
}

export interface RankingItem {
  userId: string;
  username: string;
  avatarUrl: string;
  value: number;
  rank: number;
  streakDays?: number;
}

export interface QuizQuestion {
  id: string;
  type: 'choice' | 'fill' | 'listen' | 'speak';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
  audioUrl?: string;
  difficulty: number;
}

export interface SpeakingSentence {
  id: string;
  sentence: string;
  translation: string;
  phonetic?: string;
  difficulty: number;
}
