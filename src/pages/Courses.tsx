import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, BookOpen, GraduationCap, Clock } from 'lucide-react';
import { CourseCard } from '@/components/course/CourseCard';
import { CourseFilter } from '@/components/course/CourseFilter';
import { Button } from '@/components/common/Button';
import { courses } from '@/data/courses';
import type { Course } from '@/types';
import type { SortOption, LevelFilter } from '@/components/course/CourseFilter';

export default function Courses() {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState('全部');
  const [selectedLevel, setSelectedLevel] = useState<LevelFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [displayCount, setDisplayCount] = useState(6);

  const languages = useMemo(() => {
    const uniqueLangs = [...new Set(courses.map((c) => c.language))];
    return uniqueLangs;
  }, []);

  const filteredCourses = useMemo(() => {
    let result = [...courses];

    if (selectedLanguage !== '全部') {
      result = result.filter((c) => c.language === selectedLanguage);
    }

    if (selectedLevel !== 'all') {
      result = result.filter((c) => c.level === selectedLevel);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(query) ||
          c.description.toLowerCase().includes(query) ||
          c.tags.some((t) => t.toLowerCase().includes(query))
      );
    }

    switch (sortBy) {
      case 'popular':
        result.sort((a, b) => b.studentsCount - a.studentsCount);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'progress':
        result.sort((a, b) => (b.progress || 0) - (a.progress || 0));
        break;
    }

    return result;
  }, [selectedLanguage, selectedLevel, sortBy, searchQuery]);

  const displayedCourses = filteredCourses.slice(0, displayCount);
  const hasMore = displayCount < filteredCourses.length;

  const handleCourseClick = (course: Course) => {
    navigate(`/courses/${course.id}`);
  };

  const loadMore = () => {
    setDisplayCount((prev) => prev + 6);
  };

  const stats = [
    { icon: BookOpen, label: '精品课程', value: courses.length, color: 'from-purple-500 to-pink-500' },
    { icon: GraduationCap, label: '学员总数', value: '25,000+', color: 'from-cyan-500 to-blue-500' },
    { icon: Clock, label: '学习时长', value: '500+小时', color: 'from-emerald-500 to-teal-500' },
    { icon: Sparkles, label: '语言种类', value: languages.length, color: 'from-amber-500 to-orange-500' },
  ];

  return (
    <div className="min-h-screen">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-20 right-1/4 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl" />

        <div className="relative container py-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-6">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-white/70">探索宇宙语言之旅</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6">
              <span className="gradient-text">课程中心</span>
            </h1>

            <p className="text-lg text-white/60 mb-10 leading-relaxed">
              精选多语种优质课程，从零基础到高级进阶，
              <br className="hidden md:block" />
              开启你的星际语言探索之旅
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="glass-card p-4 hover:scale-105 transition-all duration-300"
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-3`}>
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-white font-display">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/50 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container pb-20">
        <CourseFilter
          languages={languages}
          selectedLanguage={selectedLanguage}
          onLanguageChange={setSelectedLanguage}
          selectedLevel={selectedLevel}
          onLevelChange={setSelectedLevel}
          sortBy={sortBy}
          onSortChange={setSortBy}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <p className="text-white/60">
              共找到 <span className="text-white font-semibold">{filteredCourses.length}</span> 门课程
            </p>
          </div>

          {displayedCourses.length === 0 ? (
            <div className="glass-card py-20 text-center">
              <BookOpen className="w-16 h-16 text-white/20 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">暂无匹配课程</h3>
              <p className="text-white/50 mb-6">试试调整筛选条件或搜索关键词</p>
              <Button
                variant="secondary"
                onClick={() => {
                  setSelectedLanguage('全部');
                  setSelectedLevel('all');
                  setSortBy('popular');
                  setSearchQuery('');
                }}
              >
                重置筛选
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {displayedCourses.map((course, index) => (
                  <div
                    key={course.id}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <CourseCard
                      course={course}
                      onClick={() => handleCourseClick(course)}
                    />
                  </div>
                ))}
              </div>

              {hasMore && (
                <div className="mt-12 text-center">
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={loadMore}
                    rightIcon={<span className="text-sm">{filteredCourses.length - displayCount} 更多</span>}
                  >
                    加载更多
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
