import { Card, CardHeader, CardTitle, CardContent } from '@/components/common/Card';
import { ProgressBar } from '@/components/common/ProgressBar';
import type { User } from '@/types';
import { Star, Zap, Trophy, Crown, Sparkles, BookOpen, Target, Flame } from 'lucide-react';

interface LevelProgressProps {
  user: User;
}

const levelConfig = [
  { level: 1, name: '入门学者', minExp: 0, maxExp: 500, icon: '🌱', color: 'from-green-500 to-emerald-400' },
  { level: 2, name: '初级学者', minExp: 500, maxExp: 1500, icon: '📖', color: 'from-blue-500 to-cyan-400' },
  { level: 3, name: '中级学者', minExp: 1500, maxExp: 3500, icon: '🎓', color: 'from-purple-500 to-pink-400' },
  { level: 4, name: '高级学者', minExp: 3500, maxExp: 7000, icon: '🏆', color: 'from-yellow-500 to-amber-400' },
  { level: 5, name: '语言大师', minExp: 7000, maxExp: 15000, icon: '👑', color: 'from-orange-500 to-red-400' },
];

const levelPrivileges = [
  { level: 1, icon: Sparkles, privilege: '基础学习内容' },
  { level: 2, icon: BookOpen, privilege: '解锁中级课程' },
  { level: 3, icon: Target, privilege: '个性化学习计划' },
  { level: 4, icon: Trophy, privilege: '专属徽章边框' },
  { level: 5, icon: Crown, privilege: 'VIP会员特权' },
];

const expSources = [
  { name: '课程学习', value: 1200, percentage: 42, icon: BookOpen, color: 'text-blue-400' },
  { name: '每日签到', value: 540, percentage: 19, icon: Flame, color: 'text-orange-400' },
  { name: '成就奖励', value: 680, percentage: 24, icon: Trophy, color: 'text-yellow-400' },
  { name: '社区互动', value: 430, percentage: 15, icon: Zap, color: 'text-purple-400' },
];

export function LevelProgress({ user }: LevelProgressProps) {
  const getCurrentLevel = (exp: number) => {
    for (let i = levelConfig.length - 1; i >= 0; i--) {
      if (exp >= levelConfig[i].minExp) {
        return levelConfig[i];
      }
    }
    return levelConfig[0];
  };

  const currentLevel = getCurrentLevel(user.experience);
  const nextLevel = levelConfig.find(l => l.level === currentLevel.level + 1);
  const currentLevelExp = user.experience - currentLevel.minExp;
  const levelTotalExp = currentLevel.maxExp - currentLevel.minExp;
  const progress = (currentLevelExp / levelTotalExp) * 100;

  return (
    <div className="space-y-6">
      <Card glow className="overflow-hidden">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-transparent to-amber-500/20" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          
          <CardHeader className="relative">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl gradient-text-gold">等级与经验</CardTitle>
                <p className="text-white/60 mt-1">继续学习，解锁更多特权</p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-full border border-amber-500/30">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                <span className="text-amber-300 font-bold">{user.experience} EXP</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="relative">
            <div className="flex items-center gap-6 mb-8">
              <div className="relative">
                <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${currentLevel.color} flex items-center justify-center text-5xl shadow-lg shadow-purple-500/20 animate-pulse-glow`}>
                  {currentLevel.icon}
                </div>
                <div className="absolute -bottom-2 -right-2 bg-space-900 border-2 border-amber-400 rounded-full px-3 py-1 text-amber-400 font-bold text-sm">
                  Lv.{currentLevel.level}
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-white">{currentLevel.name}</h3>
                  {nextLevel && (
                    <span className="text-sm text-white/50">
                      下一等级: {nextLevel.name}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex-1">
                    <ProgressBar value={progress} variant="gold" size="lg" animated />
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">
                    {currentLevelExp} / {levelTotalExp} EXP
                  </span>
                  {nextLevel && (
                    <span className="text-amber-400">
                      还需 {nextLevel.minExp - user.experience} EXP 升级
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Crown className="w-5 h-5 text-amber-400" />
                  等级特权
                </h4>
                <div className="space-y-3">
                  {levelPrivileges.map((item) => {
                    const isUnlocked = currentLevel.level >= item.level;
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.level}
                        className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                          isUnlocked
                            ? 'bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/20'
                            : 'bg-white/5 border border-white/5 opacity-50'
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            isUnlocked
                              ? 'bg-gradient-to-br from-amber-500/30 to-yellow-500/30'
                              : 'bg-white/10'
                          }`}
                        >
                          <Icon className={`w-5 h-5 ${isUnlocked ? 'text-amber-400' : 'text-white/40'}`} />
                        </div>
                        <div className="flex-1">
                          <p className={isUnlocked ? 'text-white font-medium' : 'text-white/50'}>
                            {item.privilege}
                          </p>
                          <p className="text-xs text-white/40">Lv.{item.level} 解锁</p>
                        </div>
                        {isUnlocked && (
                          <span className="text-xs text-emerald-400 bg-emerald-500/20 px-2 py-1 rounded-full">
                            已解锁
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-purple-400" />
                  经验值来源
                </h4>
                <div className="space-y-4">
                  {expSources.map((source) => {
                    const Icon = source.icon;
                    return (
                      <div key={source.name}>
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <Icon className={`w-4 h-4 ${source.color}`} />
                            <span className="text-sm text-white/80">{source.name}</span>
                          </div>
                          <span className="text-sm text-white/60">+{source.value} EXP</span>
                        </div>
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${
                              source.name === '课程学习'
                                ? 'from-blue-500 to-cyan-400'
                                : source.name === '每日签到'
                                ? 'from-orange-500 to-amber-400'
                                : source.name === '成就奖励'
                                ? 'from-yellow-500 to-amber-400'
                                : 'from-purple-500 to-pink-400'
                            }`}
                            style={{ width: `${source.percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}

export default LevelProgress;
