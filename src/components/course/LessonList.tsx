import { useState } from 'react';
import {
  ChevronDown,
  ChevronRight,
  PlayCircle,
  CheckCircle2,
  Lock,
  Clock,
  BookOpen,
} from 'lucide-react';
import { ProgressBar } from '@/components/common/ProgressBar';
import type { Lesson } from '@/types';
import { cn } from '@/lib/utils';

interface Chapter {
  id: string;
  title: string;
  description?: string;
  lessons: Lesson[];
}

interface LessonListProps {
  chapters?: Chapter[];
  lessons?: Lesson[];
  onLessonClick?: (lesson: Lesson) => void;
  currentLessonId?: string;
  className?: string;
}

const defaultChapters: Chapter[] = [
  {
    id: 'ch-1',
    title: '第一章：入门基础',
    description: '了解语言基础，开启学习之旅',
    lessons: [],
  },
];

export function LessonList({
  chapters,
  lessons,
  onLessonClick,
  currentLessonId,
  className,
}: LessonListProps) {
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(
    new Set(chapters?.map((c) => c.id) || [])
  );

  const displayChapters = chapters && chapters.length > 0
    ? chapters
    : lessons && lessons.length > 0
    ? [{ id: 'all', title: '全部课程', lessons }]
    : defaultChapters;

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters((prev) => {
      const next = new Set(prev);
      if (next.has(chapterId)) {
        next.delete(chapterId);
      } else {
        next.add(chapterId);
      }
      return next;
    });
  };

  const getChapterProgress = (chapter: Chapter) => {
    if (chapter.lessons.length === 0) return 0;
    const completed = chapter.lessons.filter((l) => l.isCompleted).length;
    return Math.round((completed / chapter.lessons.length) * 100);
  };

  const getTotalDuration = (lessons: Lesson[]) => {
    return lessons.reduce((total, lesson) => total + lesson.durationMinutes, 0);
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}小时${mins > 0 ? ` ${mins}分钟` : ''}`;
    }
    return `${mins}分钟`;
  };

  return (
    <div className={cn('space-y-3', className)}>
      {displayChapters.map((chapter, chapterIndex) => {
        const isExpanded = expandedChapters.has(chapter.id);
        const progress = getChapterProgress(chapter);
        const totalDuration = getTotalDuration(chapter.lessons);
        const completedCount = chapter.lessons.filter((l) => l.isCompleted).length;

        return (
          <div
            key={chapter.id}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden transition-all duration-300"
          >
            <button
              onClick={() => toggleChapter(chapter.id)}
              className="w-full p-5 flex items-center gap-4 text-left hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/20 text-purple-300 font-bold font-display text-lg flex-shrink-0">
                {chapterIndex + 1}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <h4 className="font-semibold text-white font-display truncate">
                    {chapter.title}
                  </h4>
                  {progress === 100 && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  )}
                </div>
                {chapter.description && (
                  <p className="text-sm text-white/50 mt-1 truncate">
                    {chapter.description}
                  </p>
                )}
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-xs text-white/50">
                    {chapter.lessons.length} 节课
                  </span>
                  <span className="text-xs text-white/50 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatDuration(totalDuration)}
                  </span>
                  {chapter.lessons.length > 0 && (
                    <span className="text-xs text-white/50">
                      {completedCount}/{chapter.lessons.length} 已完成
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4 flex-shrink-0">
                {chapter.lessons.length > 0 && (
                  <div className="w-24 hidden sm:block">
                    <ProgressBar
                      value={progress}
                      variant="purple"
                      size="sm"
                      animated={progress > 0 && progress < 100}
                    />
                  </div>
                )}
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/50 transition-transform duration-300">
                  {isExpanded ? (
                    <ChevronDown className="w-5 h-5" />
                  ) : (
                    <ChevronRight className="w-5 h-5" />
                  )}
                </div>
              </div>
            </button>

            <div
              className={cn(
                'transition-all duration-500 overflow-hidden',
                isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
              )}
            >
              <div className="px-5 pb-5 space-y-2">
                {chapter.lessons.length === 0 ? (
                  <div className="py-8 text-center text-white/40">
                    <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>暂无课程内容</p>
                  </div>
                ) : (
                  chapter.lessons.map((lesson, lessonIndex) => {
                    const isCurrent = currentLessonId === lesson.id;
                    const isLocked = lesson.isLocked;
                    const isCompleted = lesson.isCompleted;

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => !isLocked && onLessonClick?.(lesson)}
                        disabled={isLocked}
                        className={cn(
                          'w-full p-4 rounded-xl flex items-center gap-4 text-left transition-all duration-300',
                          isLocked
                            ? 'opacity-60 cursor-not-allowed bg-white/[0.02]'
                            : isCurrent
                            ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 shadow-lg shadow-purple-500/10'
                            : 'bg-white/[0.03] hover:bg-white/[0.08] border border-transparent hover:border-white/10'
                        )}
                      >
                        <div
                          className={cn(
                            'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors',
                            isCompleted
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : isLocked
                              ? 'bg-white/5 text-white/30'
                              : isCurrent
                              ? 'bg-purple-500/30 text-purple-300'
                              : 'bg-white/10 text-white/60'
                          )}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="w-5 h-5" />
                          ) : isLocked ? (
                            <Lock className="w-4 h-4" />
                          ) : (
                            <PlayCircle className="w-5 h-5" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-white/40 w-6 flex-shrink-0">
                              {String(lessonIndex + 1).padStart(2, '0')}
                            </span>
                            <span
                              className={cn(
                                'font-medium truncate',
                                isCompleted
                                  ? 'text-emerald-300'
                                  : isLocked
                                  ? 'text-white/40'
                                  : isCurrent
                                  ? 'text-purple-200'
                                  : 'text-white/80'
                              )}
                            >
                              {lesson.title}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 flex-shrink-0">
                          <span
                            className={cn(
                              'text-sm flex items-center gap-1',
                              isLocked ? 'text-white/30' : 'text-white/50'
                            )}
                          >
                            <Clock className="w-4 h-4" />
                            {lesson.durationMinutes}分钟
                          </span>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default LessonList;
