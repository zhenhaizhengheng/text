import { Star, Users, BookOpen, PlayCircle } from 'lucide-react';
import { Badge } from '@/components/common/Badge';
import { ProgressBar } from '@/components/common/ProgressBar';
import type { Course } from '@/types';
import { cn } from '@/lib/utils';

interface CourseCardProps {
  course: Course;
  onClick?: () => void;
  className?: string;
}

const levelConfig = {
  beginner: { label: '初级', variant: 'green' as const, color: 'from-emerald-500 to-teal-500' },
  intermediate: { label: '中级', variant: 'blue' as const, color: 'from-cyan-500 to-blue-500' },
  advanced: { label: '高级', variant: 'purple' as const, color: 'from-purple-500 to-pink-500' },
};

const languageColors: Record<string, string> = {
  '英语': 'from-blue-600 via-purple-600 to-pink-600',
  '日语': 'from-rose-600 via-pink-600 to-purple-600',
  '韩语': 'from-indigo-600 via-purple-600 to-fuchsia-600',
};

const languageIcons: Record<string, string> = {
  '英语': 'EN',
  '日语': '日',
  '韩语': '한',
};

export function CourseCard({ course, onClick, className }: CourseCardProps) {
  const level = levelConfig[course.level];
  const gradientClass = languageColors[course.language] || 'from-purple-600 via-pink-600 to-orange-600';
  const langIcon = languageIcons[course.language] || course.language.charAt(0);

  const hasProgress = course.progress !== undefined && course.progress > 0;

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={`full-${i}`} className="w-4 h-4 fill-amber-400 text-amber-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="w-4 h-4 fill-amber-400/50 text-amber-400" />
      );
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-4 h-4 text-white/30" />
      );
    }

    return stars;
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        'group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2',
        className
      )}
    >
      <div className={cn('relative h-44 bg-gradient-to-br', gradientClass, 'overflow-hidden')}>
        <div className="absolute inset-0 starfield opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        <div className="absolute top-4 left-4 flex gap-2">
          <Badge variant={level.variant} size="sm">
            {level.label}
          </Badge>
          {course.isFree && (
            <Badge variant="gold" size="sm">
              免费
            </Badge>
          )}
        </div>

        <div className="absolute top-4 right-4 w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white font-bold text-lg border border-white/30">
          {langIcon}
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 transition-all duration-500 group-hover:scale-110 group-hover:bg-white/20">
            <BookOpen className="w-10 h-10 text-white/90" />
          </div>
        </div>

        {hasProgress && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-white/80 font-medium">学习进度</span>
              <span className="text-xs text-white font-bold">{course.progress}%</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-5 space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-white font-display group-hover:text-purple-200 transition-colors line-clamp-2">
            {course.title}
          </h3>
          <p className="text-sm text-white/50 mt-1 line-clamp-2">
            {course.description}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            {renderStars(course.rating)}
            <span className="text-sm font-medium text-white/80 ml-1">{course.rating}</span>
          </div>
          <div className="flex items-center gap-1.5 text-white/50">
            <Users className="w-4 h-4" />
            <span className="text-sm">{course.studentsCount.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          <div className="flex items-center gap-2">
            <img
              src={course.instructorAvatar}
              alt={course.instructor}
              className="w-8 h-8 rounded-full border border-white/20"
            />
            <span className="text-sm text-white/70">{course.instructor}</span>
          </div>
          <div className="flex items-center gap-1 text-white/50">
            <PlayCircle className="w-4 h-4" />
            <span className="text-sm">{course.totalLessons} 节</span>
          </div>
        </div>

        {hasProgress && (
          <ProgressBar
            value={course.progress || 0}
            variant="purple"
            size="sm"
            animated
          />
        )}
      </div>
    </div>
  );
}

export default CourseCard;
