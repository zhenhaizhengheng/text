import { useState } from 'react';
import { LevelProgress } from '@/components/achievements/LevelProgress';
import { BadgeCard } from '@/components/achievements/BadgeCard';
import { AchievementTasks } from '@/components/achievements/AchievementTasks';
import { RankingList } from '@/components/achievements/RankingList';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/common/Card';
import { currentUser, rankingList } from '@/data/user';
import { achievements } from '@/data/achievements';
import { cn } from '@/lib/utils';
import { Trophy, Flame, BookOpen, Target, Users, Sparkles, Star, Filter } from 'lucide-react';

type BadgeCategory = 'all' | 'streak' | 'words' | 'lessons' | 'level' | 'social' | 'special';

const badgeCategories: { id: BadgeCategory; name: string; icon: any; color: string }[] = [
  { id: 'all', name: '全部', icon: Trophy, color: 'from-amber-500 to-yellow-500' },
  { id: 'streak', name: '连续学习', icon: Flame, color: 'from-orange-500 to-red-500' },
  { id: 'words', name: '词汇积累', icon: BookOpen, color: 'from-blue-500 to-cyan-500' },
  { id: 'lessons', name: '课程完成', icon: Target, color: 'from-purple-500 to-pink-500' },
  { id: 'level', name: '等级提升', icon: Star, color: 'from-green-500 to-emerald-500' },
  { id: 'social', name: '社区互动', icon: Users, color: 'from-pink-500 to-rose-500' },
  { id: 'special', name: '特殊成就', icon: Sparkles, color: 'from-yellow-500 to-amber-500' },
];

export default function Achievements() {
  const [activeCategory, setActiveCategory] = useState<BadgeCategory>('all');

  const filteredAchievements =
    activeCategory === 'all'
      ? achievements
      : achievements.filter((a) => a.category === activeCategory);

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalCount = achievements.length;

  return (
    <div className="min-h-screen animate-fade-in">
      <div className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 starfield opacity-30" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl -translate-y-1/2" />

        <div className="container relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-4">
              <Trophy className="w-5 h-5 text-amber-400" />
              <span className="text-white/80">成就中心</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold gradient-text-gold mb-4">
              探索你的学习之旅
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              每一次坚持都是成长的见证，收集徽章，解锁成就，登上排行榜
            </p>

            <div className="flex items-center justify-center gap-8 mt-8">
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-white">
                  {unlockedCount}
                  <span className="text-white/40 text-xl">/{totalCount}</span>
                </p>
                <p className="text-sm text-white/50 mt-1">已获得徽章</p>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-amber-400">
                  {currentUser.experience}
                </p>
                <p className="text-sm text-white/50 mt-1">总经验值</p>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-orange-400">
                  {currentUser.streakDays}
                </p>
                <p className="text-sm text-white/50 mt-1">连续学习天数</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container pb-16">
        <div className="space-y-8">
          <LevelProgress user={currentUser} />

          <Card glow>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl gradient-text-gold">徽章墙</CardTitle>
                  <p className="text-white/60 mt-1">
                    已获得 {unlockedCount} / {totalCount} 个徽章
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-white/60" />
                  <span className="text-white/60">筛选</span>
                </div>
              </div>

              <div className="flex gap-2 mt-6 overflow-x-auto pb-2 scrollbar-hide">
                {badgeCategories.map((category) => {
                  const Icon = category.icon;
                  const isActive = activeCategory === category.id;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={cn(
                        'flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300',
                        isActive
                          ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                          : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{category.name}</span>
                    </button>
                  );
                })}
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {filteredAchievements.map((achievement, index) => (
                  <BadgeCard
                    key={achievement.id}
                    achievement={achievement}
                    delay={index * 50}
                  />
                ))}
              </div>

              {filteredAchievements.length === 0 && (
                <div className="text-center py-12">
                  <Trophy className="w-16 h-16 text-white/20 mx-auto mb-4" />
                  <p className="text-white/40">该分类暂无徽章</p>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AchievementTasks />
            <RankingList rankings={rankingList} currentUserId={currentUser.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
