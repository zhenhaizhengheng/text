import { useRef } from 'react';
import { Star, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { courses } from '@/data/courses';
import { Badge } from '@/components/common/Badge';
import { ProgressBar } from '@/components/common/ProgressBar';
import type { Course } from '@/types';

const levelLabels: Record<string, { label: string; color: string }> = {
  beginner: { label: '入门', color: 'emerald' },
  intermediate: { label: '进阶', color: 'blue' },
  advanced: { label: '高级', color: 'purple' },
};

const gradientColors = [
  'from-purple-600 to-pink-600',
  'from-blue-600 to-cyan-600',
  'from-emerald-600 to-teal-600',
  'from-amber-600 to-orange-600',
  'from-pink-600 to-rose-600',
  'from-indigo-600 to-purple-600',
];

export function FeaturedCourses() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 380;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const featuredCourses = courses.slice(0, 6);

  return (
    <section className="py-24 relative overflow-hidden bg-space-950">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold font-display text-white mb-2">
              为你推荐的
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                课程
              </span>
            </h2>
            <p className="text-white/60">精选优质课程，开启你的语言学习之旅</p>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {featuredCourses.map((course, index) => (
            <CourseCard
              key={course.id}
              course={course}
              gradient={gradientColors[index % gradientColors.length]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface CourseCardProps {
  course: Course;
  gradient: string;
}

function CourseCard({ course, gradient }: CourseCardProps) {
  const levelInfo = levelLabels[course.level] || levelLabels.beginner;

  return (
    <div className="flex-shrink-0 w-[340px] snap-start group">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10">
        <div className={`relative h-48 bg-gradient-to-br ${gradient} overflow-hidden`}>
          <div className="absolute inset-0 bg-black/20" />
          
          <div className="absolute top-4 left-4 z-10">
            <Badge variant={levelInfo.color as any}>
              {levelInfo.label}
            </Badge>
          </div>

          {course.isFree && (
            <div className="absolute top-4 right-4 z-10">
              <Badge variant="gold">免费</Badge>
            </div>
          )}

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl opacity-30 group-hover:scale-110 transition-transform duration-500">
              {course.language === '英语' && '🇺🇸'}
              {course.language === '日语' && '🇯🇵'}
              {course.language === '韩语' && '🇰🇷'}
              {course.language === '法语' && '🇫🇷'}
              {course.language === '西班牙语' && '🇪🇸'}
            </span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        <div className="p-5">
          <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-purple-300 transition-colors">
            {course.title}
          </h3>
          
          <p className="text-sm text-white/60 mb-4 line-clamp-2 h-10">
            {course.description}
          </p>

          <div className="flex items-center gap-4 mb-4 text-sm">
            <div className="flex items-center gap-1 text-yellow-400">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-white font-medium">{course.rating}</span>
            </div>
            <div className="flex items-center gap-1 text-white/50">
              <Users className="w-4 h-4" />
              <span>{course.studentsCount.toLocaleString()} 人学习</span>
            </div>
          </div>

          {course.progress !== undefined && course.progress > 0 && (
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-white/60">学习进度</span>
                <span className="text-purple-400 font-medium">{course.progress}%</span>
              </div>
              <ProgressBar value={course.progress} variant="purple" size="sm" />
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src={course.instructorAvatar}
                alt={course.instructor}
                className="w-8 h-8 rounded-full border-2 border-white/20"
              />
              <span className="text-sm text-white/70">{course.instructor}</span>
            </div>
            <div className="text-lg font-bold text-white">
              {course.isFree ? '免费' : `¥${course.price}`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturedCourses;
