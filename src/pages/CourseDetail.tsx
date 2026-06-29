import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Star,
  Clock,
  Users,
  BookOpen,
  PlayCircle,
  Award,
  MessageSquare,
  Heart,
  Share2,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { ProgressBar } from '@/components/common/ProgressBar';
import { LessonList } from '@/components/course/LessonList';
import { courses } from '@/data/courses';
import { cn } from '@/lib/utils';
import type { Lesson } from '@/types';

const levelConfig = {
  beginner: { label: '初级', variant: 'green' as const },
  intermediate: { label: '中级', variant: 'blue' as const },
  advanced: { label: '高级', variant: 'purple' as const },
};

const languageColors: Record<string, string> = {
  '英语': 'from-blue-600 via-purple-600 to-pink-600',
  '日语': 'from-rose-600 via-pink-600 to-purple-600',
  '韩语': 'from-indigo-600 via-purple-600 to-fuchsia-600',
};

const reviews = [
  {
    id: 'r1',
    username: '小明',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop',
    rating: 5,
    date: '2025-03-15',
    content: '课程非常棒！老师讲解清晰，从零基础开始循序渐进，学完后能够进行简单的日常对话了。强烈推荐给想要入门的朋友！',
    helpful: 128,
  },
  {
    id: 'r2',
    username: '语言爱好者',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    rating: 4,
    date: '2025-03-10',
    content: '整体课程质量很高，内容很系统。唯一的小建议是希望能增加更多的口语练习环节。',
    helpful: 86,
  },
  {
    id: 'r3',
    username: '学霸小王',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    rating: 5,
    date: '2025-02-28',
    content: '已经学完了整个课程，收获满满！课程设计很科学，每节课的时长也刚刚好，不会让人感到疲惫。',
    helpful: 64,
  },
];

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'lessons' | 'reviews'>('overview');
  const [isFavorite, setIsFavorite] = useState(false);

  const course = useMemo(() => {
    return courses.find((c) => c.id === id);
  }, [id]);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-20 h-20 text-white/20 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">课程不存在</h2>
          <p className="text-white/50 mb-6">抱歉，您访问的课程不存在或已下架</p>
          <Button onClick={() => navigate('/courses')} leftIcon={<ArrowLeft className="w-5 h-5" />}>
            返回课程列表
          </Button>
        </div>
      </div>
    );
  }

  const level = levelConfig[course.level];
  const gradientClass = languageColors[course.language] || 'from-purple-600 via-pink-600 to-orange-600';
  const hasProgress = course.progress !== undefined && course.progress > 0;

  const chapters = [
    {
      id: 'ch-1',
      title: '第一章：基础入门',
      description: '从零开始，打好基础',
      lessons: [
        { id: 'l1', courseId: course.id, title: '课程介绍与学习方法', content: '', orderIndex: 1, durationMinutes: 15, isCompleted: true },
        { id: 'l2', courseId: course.id, title: '发音基础', content: '', orderIndex: 2, durationMinutes: 30, isCompleted: true },
        { id: 'l3', courseId: course.id, title: '基础问候语', content: '', orderIndex: 3, durationMinutes: 25, isCompleted: hasProgress && course.progress! > 20 },
        { id: 'l4', courseId: course.id, title: '数字与时间', content: '', orderIndex: 4, durationMinutes: 20, isLocked: !hasProgress || course.progress! < 30 },
        { id: 'l5', courseId: course.id, title: '自我介绍', content: '', orderIndex: 5, durationMinutes: 35, isLocked: !hasProgress || course.progress! < 30 },
      ] as Lesson[],
    },
    {
      id: 'ch-2',
      title: '第二章：日常会话',
      description: '掌握日常交流必备表达',
      lessons: [
        { id: 'l6', courseId: course.id, title: '购物对话', content: '', orderIndex: 6, durationMinutes: 30, isLocked: true },
        { id: 'l7', courseId: course.id, title: '餐厅点餐', content: '', orderIndex: 7, durationMinutes: 25, isLocked: true },
        { id: 'l8', courseId: course.id, title: '问路与交通', content: '', orderIndex: 8, durationMinutes: 28, isLocked: true },
        { id: 'l9', courseId: course.id, title: '天气与季节', content: '', orderIndex: 9, durationMinutes: 22, isLocked: true },
      ] as Lesson[],
    },
    {
      id: 'ch-3',
      title: '第三章：进阶提升',
      description: '深入学习，稳步提升',
      lessons: [
        { id: 'l10', courseId: course.id, title: '语法进阶', content: '', orderIndex: 10, durationMinutes: 40, isLocked: true },
        { id: 'l11', courseId: course.id, title: '阅读理解', content: '', orderIndex: 11, durationMinutes: 35, isLocked: true },
        { id: 'l12', courseId: course.id, title: '写作练习', content: '', orderIndex: 12, durationMinutes: 45, isLocked: true },
      ] as Lesson[],
    },
  ];

  const totalLessons = chapters.reduce((sum, ch) => sum + ch.lessons.length, 0);
  const completedLessons = chapters.reduce(
    (sum, ch) => sum + ch.lessons.filter((l) => l.isCompleted).length,
    0
  );

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="w-5 h-5 fill-amber-400 text-amber-400" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-5 h-5 fill-amber-400/50 text-amber-400" />);
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-5 h-5 text-white/30" />);
    }

    return stars;
  };

  const handleLessonClick = (lesson: Lesson) => {
    console.log('Lesson clicked:', lesson.title);
  };

  return (
    <div className="min-h-screen pb-20">
      <div className={`relative bg-gradient-to-br ${gradientClass} overflow-hidden`}>
        <div className="absolute inset-0 starfield opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-space-900" />

        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

        <div className="relative container py-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 hover:bg-white/20 transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            返回
          </button>

          <div className="flex flex-col lg:flex-row gap-8 lg:items-end">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <Badge variant={level.variant} size="lg">
                  {level.label}
                </Badge>
                <Badge variant="outline" size="lg">
                  {course.language}
                </Badge>
                {course.isFree ? (
                  <Badge variant="gold" size="lg">免费课程</Badge>
                ) : (
                  <Badge variant="pink" size="lg">付费课程</Badge>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-white mb-4">
                {course.title}
              </h1>

              <p className="text-white/80 text-lg mb-6 max-w-3xl">
                {course.description}
              </p>

              <div className="flex items-center gap-6 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="flex">{renderStars(course.rating)}</div>
                  <span className="text-white font-semibold text-lg">{course.rating}</span>
                  <span className="text-white/60">({course.studentsCount.toLocaleString()} 评价)</span>
                </div>

                <div className="flex items-center gap-2 text-white/80">
                  <Users className="w-5 h-5" />
                  <span>{course.studentsCount.toLocaleString()} 名学员</span>
                </div>

                <div className="flex items-center gap-2 text-white/80">
                  <BookOpen className="w-5 h-5" />
                  <span>{course.totalLessons} 节课</span>
                </div>

                <div className="flex items-center gap-2 text-white/80">
                  <Clock className="w-5 h-5" />
                  <span>{course.totalHours} 小时</span>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0">
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                <img
                  src={course.instructorAvatar}
                  alt={course.instructor}
                  className="w-16 h-16 rounded-full border-2 border-white/30"
                />
                <div>
                  <p className="text-white font-semibold text-lg">{course.instructor}</p>
                  <p className="text-white/60 text-sm">课程讲师</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container -mt-8 relative z-10">
        <div className="glass-card p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex-1 w-full sm:w-auto">
              {hasProgress ? (
                <>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/70">学习进度</span>
                    <span className="text-white font-semibold">
                      {completedLessons}/{totalLessons} 节 · {course.progress}%
                    </span>
                  </div>
                  <ProgressBar
                    value={course.progress || 0}
                    variant="purple"
                    size="md"
                    animated
                  />
                </>
              ) : (
                <div>
                  <p className="text-white/70 mb-1">开始你的学习之旅</p>
                  <p className="text-sm text-white/50">共 {course.totalLessons} 节课，{course.totalHours} 小时学习内容</p>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={cn(
                  'w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300',
                  isFavorite
                    ? 'bg-pink-500/20 text-pink-400 border border-pink-500/30'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10'
                )}
              >
                <Heart className={cn('w-5 h-5', isFavorite && 'fill-current')} />
              </button>

              <button className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>

              <Button
                size="lg"
                leftIcon={hasProgress ? <PlayCircle className="w-5 h-5" /> : <Award className="w-5 h-5" />}
                className="min-w-[180px]"
              >
                {hasProgress ? '继续学习' : course.isFree ? '免费开始' : `¥${course.price} 报名`}
              </Button>
            </div>
          </div>
        </div>

        <div className="flex border-b border-white/10 mb-8">
          {[
            { id: 'overview', label: '课程介绍', icon: BookOpen },
            { id: 'lessons', label: '课程大纲', icon: PlayCircle },
            { id: 'reviews', label: '学员评价', icon: MessageSquare },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={cn(
                'flex items-center gap-2 px-6 py-4 font-medium transition-all border-b-2 -mb-px',
                activeTab === tab.id
                  ? 'text-purple-300 border-purple-500'
                  : 'text-white/50 hover:text-white/80 border-transparent'
              )}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="glass-card p-6">
                <h3 className="text-xl font-bold text-white font-display mb-4">课程简介</h3>
                <p className="text-white/70 leading-relaxed mb-4">
                  {course.description}
                </p>
                <p className="text-white/70 leading-relaxed">
                  本课程由资深语言专家精心打造，采用科学的教学方法，结合实际场景对话，
                  帮助你快速掌握语言核心技能。课程配有丰富的练习材料和学习工具，
                  让学习更加高效有趣。
                </p>
              </div>

              <div className="glass-card p-6">
                <h3 className="text-xl font-bold text-white font-display mb-4">你将学到什么</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    '掌握基础发音和语音语调',
                    '积累 1000+ 核心词汇',
                    '理解基础语法规则',
                    '进行日常对话交流',
                    '听懂简单的听力材料',
                    '阅读简单的文章',
                    '书写基础的句子和短文',
                    '了解语言背后的文化',
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/70">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card p-6">
                <h3 className="text-xl font-bold text-white font-display mb-4">适合人群</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    '零基础的语言初学者',
                    '想要系统学习语言的学习者',
                    '准备出国旅游或工作的人士',
                    '对语言文化感兴趣的爱好者',
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <ChevronRight className="w-4 h-4 text-purple-400" />
                      </div>
                      <span className="text-white/70">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="glass-card p-6">
                <h3 className="text-lg font-bold text-white font-display mb-4">课程信息</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white/50">难度级别</span>
                    <Badge variant={level.variant}>{level.label}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/50">课程语言</span>
                    <span className="text-white/80">{course.language}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/50">课程节数</span>
                    <span className="text-white/80">{course.totalLessons} 节</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/50">总时长</span>
                    <span className="text-white/80">{course.totalHours} 小时</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/50">学员数量</span>
                    <span className="text-white/80">{course.studentsCount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/50">评分</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="text-white/80">{course.rating}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6">
                <h3 className="text-lg font-bold text-white font-display mb-4">课程标签</h3>
                <div className="flex flex-wrap gap-2">
                  {course.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="glass-card p-6">
                <h3 className="text-lg font-bold text-white font-display mb-4">讲师介绍</h3>
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={course.instructorAvatar}
                    alt={course.instructor}
                    className="w-16 h-16 rounded-full border-2 border-white/20"
                  />
                  <div>
                    <p className="text-white font-semibold">{course.instructor}</p>
                    <p className="text-white/50 text-sm">资深语言教师</p>
                  </div>
                </div>
                <p className="text-white/60 text-sm leading-relaxed">
                  拥有 10 年以上语言教学经验，曾在多所知名高校任教，
                  擅长引导零基础学习者快速入门，教学风格生动有趣。
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'lessons' && (
          <div className="max-w-4xl mx-auto">
            <div className="glass-card p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white font-display">课程大纲</h3>
                <span className="text-white/50 text-sm">
                  {completedLessons}/{totalLessons} 节已完成
                </span>
              </div>
              <ProgressBar
                value={(completedLessons / totalLessons) * 100}
                variant="purple"
                size="md"
                animated
              />
            </div>

            <LessonList
              chapters={chapters}
              onLessonClick={handleLessonClick}
            />
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="max-w-4xl mx-auto">
            <div className="glass-card p-6 mb-6">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="text-center">
                  <div className="text-6xl font-bold text-white font-display mb-2">
                    {course.rating}
                  </div>
                  <div className="flex justify-center mb-2">
                    {renderStars(course.rating)}
                  </div>
                  <p className="text-white/50">{course.studentsCount.toLocaleString()} 条评价</p>
                </div>

                <div className="flex-1 w-full space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const percentage = star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 7 : star === 2 ? 2 : 1;
                    return (
                      <div key={star} className="flex items-center gap-3">
                        <span className="text-white/60 text-sm w-8">{star}星</span>
                        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-white/50 text-sm w-12 text-right">{percentage}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="glass-card p-6">
                  <div className="flex items-start gap-4">
                    <img
                      src={review.avatar}
                      alt={review.username}
                      className="w-12 h-12 rounded-full border border-white/20 flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="text-white font-semibold">{review.username}</p>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={cn(
                                    'w-4 h-4',
                                    i < review.rating
                                      ? 'fill-amber-400 text-amber-400'
                                      : 'text-white/30'
                                  )}
                                />
                              ))}
                            </div>
                            <span className="text-white/40 text-sm">{review.date}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-white/70 leading-relaxed mb-4">
                        {review.content}
                      </p>

                      <div className="flex items-center gap-4">
                        <button className="flex items-center gap-1 text-white/50 hover:text-white/80 transition-colors text-sm">
                          <span>👍</span>
                          <span>有帮助 ({review.helpful})</span>
                        </button>
                        <button className="text-white/50 hover:text-white/80 transition-colors text-sm">
                          回复
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button variant="secondary">加载更多评价</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
