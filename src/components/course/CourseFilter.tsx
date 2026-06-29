import { Search, SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export type SortOption = 'popular' | 'rating' | 'newest' | 'progress';
export type LevelFilter = 'all' | 'beginner' | 'intermediate' | 'advanced';

interface CourseFilterProps {
  languages: string[];
  selectedLanguage: string;
  onLanguageChange: (lang: string) => void;
  selectedLevel: LevelFilter;
  onLevelChange: (level: LevelFilter) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  className?: string;
}

const levelOptions: { value: LevelFilter; label: string }[] = [
  { value: 'all', label: '全部级别' },
  { value: 'beginner', label: '初级' },
  { value: 'intermediate', label: '中级' },
  { value: 'advanced', label: '高级' },
];

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'popular', label: '最受欢迎' },
  { value: 'rating', label: '评分最高' },
  { value: 'newest', label: '最新发布' },
  { value: 'progress', label: '学习进度' },
];

export function CourseFilter({
  languages,
  selectedLanguage,
  onLanguageChange,
  selectedLevel,
  onLevelChange,
  sortBy,
  onSortChange,
  searchQuery,
  onSearchChange,
  className,
}: CourseFilterProps) {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const hasActiveFilters =
    selectedLanguage !== '全部' ||
    selectedLevel !== 'all' ||
    sortBy !== 'popular' ||
    searchQuery !== '';

  const clearAllFilters = () => {
    onLanguageChange('全部');
    onLevelChange('all');
    onSortChange('popular');
    onSearchChange('');
  };

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="搜索课程..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            icon={<Search className="w-5 h-5" />}
            iconPosition="left"
          />
        </div>

        <div className="md:hidden">
          <Button
            variant="secondary"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            leftIcon={<SlidersHorizontal className="w-5 h-5" />}
          >
            筛选
            {hasActiveFilters && (
              <Badge variant="pink" size="sm" className="ml-2">
                激活
              </Badge>
            )}
          </Button>
        </div>
      </div>

      <div
        className={cn(
          'hidden md:flex flex-wrap items-center gap-4 p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl',
          showMobileFilters && 'flex'
        )}
      >
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-sm font-medium text-white/70">语言：</span>
          <div className="flex gap-2 flex-wrap">
            {['全部', ...languages].map((lang) => (
              <button
                key={lang}
                onClick={() => onLanguageChange(lang)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
                  selectedLanguage === lang
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
                )}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full h-px bg-white/5 md:hidden" />

        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-sm font-medium text-white/70">级别：</span>
          <div className="flex gap-2 flex-wrap">
            {levelOptions.map((level) => (
              <button
                key={level.value}
                onClick={() => onLevelChange(level.value)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
                  selectedLevel === level.value
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
                )}
              >
                {level.label}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full h-px bg-white/5 md:hidden" />

        <div className="flex items-center gap-3 flex-wrap md:ml-auto">
          <span className="text-sm font-medium text-white/70">排序：</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="appearance-none px-4 py-2 pr-10 bg-white/5 border border-white/10 rounded-xl text-white text-sm font-medium focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all cursor-pointer"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value} className="bg-space-900">
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 pointer-events-none" />
          </div>
        </div>

        {hasActiveFilters && (
          <>
            <div className="w-full h-px bg-white/5" />
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-white/50">已选筛选：</span>
                {selectedLanguage !== '全部' && (
                  <Badge variant="purple" size="sm" className="gap-1">
                    {selectedLanguage}
                    <button onClick={() => onLanguageChange('全部')}>
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
                {selectedLevel !== 'all' && (
                  <Badge variant="blue" size="sm" className="gap-1">
                    {levelOptions.find((l) => l.value === selectedLevel)?.label}
                    <button onClick={() => onLevelChange('all')}>
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
              </div>
              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                清除全部
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CourseFilter;
