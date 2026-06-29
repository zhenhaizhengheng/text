import { useState } from 'react';
import {
  Calendar,
  BookOpen,
  Award,
  Flame,
  Clock,
  Star,
  Settings,
  Heart,
  Bell,
  User,
  Lock,
  Globe,
  Volume2,
  ChevronRight,
  Target,
  Zap,
  BookMarked,
  MessageCircle,
  TrendingUp,
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/common/Tabs';
import { Button } from '@/components/common/Button';
import { Avatar } from '@/components/common/Avatar';
import { Badge } from '@/components/common/Badge';
import { StatCard } from '@/components/common/StatCard';
import { ProgressBar } from '@/components/common/ProgressBar';
import { currentUser, learningProgress } from '@/data/user';
import { courses } from '@/data/courses';
import { achievements } from '@/data/achievements';
import { cn } from '@/lib/utils';

const levelLabels = {
  beginner: '初级学员',
  intermediate: '中级学员',
  advanced: '高级学员',
};

const levelColors = {
  beginner: 'from-emerald-500 to-teal-500',
  intermediate: 'from-cyan-500 to-blue-500',
  advanced: 'from-purple-500 to-pink-500',
};

const todayTasks = [
  { id: 1, title: '背单词 30 个', completed: true, type: 'vocabulary' },
  { id: 2, title: '听力练习 15 分钟', completed: true, type: 'listening' },
  { id: 3, title: '语法课程 1 节', completed: false, type: 'grammar' },
  { id: 4, title: '口语练习 10 分钟', completed: false, type: 'speaking' },
];

const favoriteWords = [
  { word: 'serendipity', meaning: '意外发现美好事物的运气', phonetic: '/ˌserənˈdɪpəti/' },
  { word: 'ephemeral', meaning: '短暂的，瞬息的', phonetic: '/ɪˈfemərəl/' },
  { word: 'resilience', meaning: '韧性，恢复力', phonetic: '/rɪˈzɪliəns/' },
  { word: 'luminous', meaning: '发光的，明亮的', phonetic: '/ˈluːmɪnəs/' },
];

const favoriteGrammar = [
  { title: '现在完成时态', level: '中级', progress: 80 },
  { title: '虚拟语气', level: '高级', progress: 45 },
  { title: '定语从句', level: '中级', progress: 90 },
];

const settingGroups = [
  {
    title: '账号设置',
    icon: User,
    items: [
      { label: '个人资料', icon: User, description: '修改头像、昵称、简介' },
      { label: '账号安全', icon: Lock, description: '修改密码、绑定手机' },
      { label: '语言偏好', icon: Globe, description: '界面语言、学习语言' },
    ],
  },
  {
    title: '学习设置',
    icon: BookOpen,
    items: [
      { label: '每日目标', icon: Target, description: '设置每日学习时长和单词量' },
      { label: '发音设置', icon: Volume2, description: '语速、口音选择' },
      { label: '难度偏好', icon: Zap, description: '自动调整或手动设置' },
    ],
  },
  {
    title: '通知设置',
    icon: Bell,
    items: [
      { label: '学习提醒', icon: Bell, description: '每日学习时间提醒' },
      { label: '社区通知', icon: MessageCircle, description: '评论、点赞、关注通知' },
      { label: '活动推送', icon: Star, description: '新课程、优惠活动' },
    ],
  },
];

export default function Profile() {
  const [activeTab, setActiveTab] = useState('learning');

  const level = currentUser.level;
  const levelProgress = (currentUser.experience % 1000) / 10;
  const completedCourses = courses.filter(c => c.progress === 100).length;
  const inProgressCourses = courses.filter(c => (c.progress || 0) > 0 && (c.progress || 0) < 100);
  const unlockedAchievements = achievements.filter(a => a.unlocked).length;

  return (
    <div className="min-h-screen bg-space-950">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 starfield opacity-30 pointer-events-none" />

      <div className="relative container py-8">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden mb-8">
          <div className="relative h-48 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500">
            <div className="absolute inset-0 starfield opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-t from-space-950/80 to-transparent" />
          </div>

          <div className="relative px-6 pb-6 -mt-16">
            <div className="flex flex-col md:flex-row md:items-end gap-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-2xl p-1 bg-gradient-to-br from-purple-500 to-pink-500">
                  <img
                    src={currentUser.avatarUrl}
                    alt={currentUser.username}
                    className="w-full h-full rounded-xl object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2">
                  <Badge variant="gold" size="lg" className="shadow-lg">
                    <Flame className="w-3.5 h-3.5 text-amber-400" />
                    {currentUser.streakDays} 天
                  </Badge>
                </div>
              </div>

              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <h1 className="text-2xl font-bold text-white font-display">
                        {currentUser.username}
                      </h1>
                      <Badge variant={level === 'beginner' ? 'green' : level === 'intermediate' ? 'blue' : 'purple'}>
                        {levelLabels[level]}
                      </Badge>
                    </div>
                    <p className="mt-1 text-white/60">{currentUser.bio}</p>
                  </div>
                  <Button variant="secondary" leftIcon={<Settings className="w-4 h-4" />}>
                    编辑资料
                  </Button>
                </div>

                <div className="mt-4 max-w-md">
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="text-white/60">经验值</span>
                    <span className="text-white/80 font-medium">
                      {currentUser.experience} / {Math.floor(currentUser.experience / 1000) * 1000 + 1000}
                    </span>
                  </div>
                  <ProgressBar value={levelProgress} variant="purple" size="sm" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={<Calendar className="w-6 h-6" />}
            value={currentUser.streakDays}
            label="连续学习"
            trend="up"
            trendValue="+3天"
            variant="purple"
          />
          <StatCard
            icon={<BookOpen className="w-6 h-6" />}
            value={currentUser.totalWords}
            label="单词量"
            trend="up"
            trendValue="+25"
            variant="blue"
          />
          <StatCard
            icon={<Award className="w-6 h-6" />}
            value={completedCourses}
            label="完成课程"
            variant="gold"
          />
          <StatCard
            icon={<Clock className="w-6 h-6" />}
            value={`${Math.floor(currentUser.totalMinutes / 60)}h`}
            label="总学习时长"
            trend="up"
            trendValue="+40min"
            variant="green"
          />
        </div>

        <Tabs defaultValue="learning" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="learning">
              <BookMarked className="w-4 h-4 mr-2" />
              学习路径
            </TabsTrigger>
            <TabsTrigger value="favorites">
              <Heart className="w-4 h-4 mr-2" />
              我的收藏
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="w-4 h-4 mr-2" />
              设置
            </TabsTrigger>
          </TabsList>

          <TabsContent value="learning" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      <Target className="w-5 h-5 text-purple-400" />
                      今日任务
                    </h3>
                    <Badge variant="purple">
                      {todayTasks.filter(t => t.completed).length}/{todayTasks.length}
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    {todayTasks.map((task) => (
                      <div
                        key={task.id}
                        className={cn(
                          'flex items-center gap-3 p-3 rounded-xl transition-all duration-200',
                          task.completed ? 'bg-emerald-500/10' : 'bg-white/5 hover:bg-white/10'
                        )}
                      >
                        <div className={cn(
                          'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold',
                          task.completed
                            ? 'bg-emerald-500 text-white'
                            : 'bg-white/10 text-white/40'
                        )}>
                          {task.completed ? '✓' : task.id}
                        </div>
                        <span className={cn(
                          'flex-1 text-sm',
                          task.completed ? 'text-white/50 line-through' : 'text-white/80'
                        )}>
                          {task.title}
                        </span>
                        <ChevronRight className="w-4 h-4 text-white/30" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-cyan-400" />
                      正在学习
                    </h3>
                    <Button variant="ghost" size="sm">查看全部</Button>
                  </div>
                  <div className="space-y-4">
                    {inProgressCourses.map((course) => (
                      <div
                        key={course.id}
                        className="flex gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
                      >
                        <div className="w-20 h-14 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={course.coverImage}
                            alt={course.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-white text-sm truncate group-hover:text-purple-200 transition-colors">
                            {course.title}
                          </h4>
                          <p className="text-xs text-white/50 mt-0.5">{course.language} · {course.totalLessons} 节</p>
                          <div className="mt-2">
                            <ProgressBar value={course.progress || 0} variant="purple" size="sm" showLabel />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      <Award className="w-5 h-5 text-amber-400" />
                      成就徽章
                    </h3>
                    <Badge variant="gold">{unlockedAchievements}/{achievements.length}</Badge>
                  </div>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
                    {achievements.slice(0, 6).map((achievement) => (
                      <div
                        key={achievement.id}
                        className={cn(
                          'aspect-square rounded-xl flex flex-col items-center justify-center p-2 transition-all duration-300',
                          achievement.unlocked
                            ? 'bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 hover:scale-105'
                            : 'bg-white/5 border border-white/10 opacity-50 grayscale'
                        )}
                      >
                        <span className="text-2xl mb-1">{achievement.icon}</span>
                        <span className="text-xs text-white/70 text-center truncate w-full">
                          {achievement.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Star className="w-5 h-5 text-purple-400" />
                    学习数据
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-white/60">本周学习</span>
                        <span className="text-white/80 font-medium">
                          {learningProgress.weeklyData.reduce((sum, d) => sum + d.minutes, 0)} 分钟
                        </span>
                      </div>
                      <div className="flex items-end gap-1 h-20">
                        {learningProgress.weeklyData.map((day, i) => {
                          const maxMin = Math.max(...learningProgress.weeklyData.map(d => d.minutes));
                          const height = (day.minutes / maxMin) * 100;
                          const days = ['日', '一', '二', '三', '四', '五', '六'];
                          const dayIndex = new Date(day.date).getDay();
                          return (
                            <div key={i} className="flex-1 flex flex-col items-center gap-1">
                              <div
                                className="w-full bg-gradient-to-t from-purple-600 to-pink-500 rounded-t-md transition-all duration-300"
                                style={{ height: `${height}%`, minHeight: '4px' }}
                              />
                              <span className="text-xs text-white/40">{days[dayIndex]}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-amber-400" />
                    推荐课程
                  </h3>
                  <div className="space-y-3">
                    {courses.filter(c => !c.progress).slice(0, 3).map((course) => (
                      <div
                        key={course.id}
                        className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
                      >
                        <h4 className="font-medium text-white text-sm group-hover:text-purple-200 transition-colors">
                          {course.title}
                        </h4>
                        <div className="flex items-center justify-between mt-2">
                          <Badge variant={course.level === 'beginner' ? 'green' : course.level === 'intermediate' ? 'blue' : 'purple'} size="sm">
                            {course.level === 'beginner' ? '初级' : course.level === 'intermediate' ? '中级' : '高级'}
                          </Badge>
                          <span className="text-xs text-white/50">{course.totalLessons} 节</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="favorites" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-purple-400" />
                  收藏的课程
                </h3>
                <div className="space-y-3">
                  {courses.slice(0, 3).map((course) => (
                    <div
                      key={course.id}
                      className="flex gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
                    >
                      <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={course.coverImage}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-white text-sm truncate group-hover:text-purple-200 transition-colors">
                          {course.title}
                        </h4>
                        <p className="text-xs text-white/50 mt-0.5">{course.instructor}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                          <span className="text-xs text-white/60">{course.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <BookMarked className="w-5 h-5 text-cyan-400" />
                  收藏的单词
                </h3>
                <div className="space-y-3">
                  {favoriteWords.map((item, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-white group-hover:text-cyan-200 transition-colors">
                          {item.word}
                        </span>
                        <span className="text-xs text-white/40">{item.phonetic}</span>
                      </div>
                      <p className="text-sm text-white/60 mt-1">{item.meaning}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 lg:col-span-2">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-pink-400" />
                  收藏的语法点
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {favoriteGrammar.map((item, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group border border-white/5"
                    >
                      <h4 className="font-medium text-white group-hover:text-pink-200 transition-colors">
                        {item.title}
                      </h4>
                      <Badge variant={item.level === '中级' ? 'blue' : 'purple'} size="sm" className="mt-2">
                        {item.level}
                      </Badge>
                      <div className="mt-3">
                        <ProgressBar value={item.progress} variant="purple" size="sm" showLabel />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="mt-0">
            <div className="max-w-2xl mx-auto space-y-6">
              {settingGroups.map((group) => (
                <div
                  key={group.title}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden"
                >
                  <div className="p-5 border-b border-white/5">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      <group.icon className="w-5 h-5 text-purple-400" />
                      {group.title}
                    </h3>
                  </div>
                  <div className="divide-y divide-white/5">
                    {group.items.map((item) => (
                      <button
                        key={item.label}
                        className="w-full flex items-center gap-4 p-4 hover:bg-white/5 transition-colors text-left"
                      >
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                          <item.icon className="w-5 h-5 text-white/60" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-white">{item.label}</p>
                          <p className="text-sm text-white/50">{item.description}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-white/30" />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
