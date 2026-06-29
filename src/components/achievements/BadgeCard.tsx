import { useState } from 'react';
import type { Achievement } from '@/types';
import { cn } from '@/lib/utils';
import { Lock, Star, Coins, Sparkles } from 'lucide-react';

interface BadgeCardProps {
  achievement: Achievement;
  delay?: number;
}

const categoryColors: Record<string, { bg: string; border: string; glow: string; text: string }> = {
  streak: {
    bg: 'from-orange-500 to-red-500',
    border: 'border-orange-400/50',
    glow: 'shadow-orange-500/30',
    text: 'text-orange-400',
  },
  words: {
    bg: 'from-blue-500 to-cyan-500',
    border: 'border-blue-400/50',
    glow: 'shadow-blue-500/30',
    text: 'text-blue-400',
  },
  lessons: {
    bg: 'from-purple-500 to-pink-500',
    border: 'border-purple-400/50',
    glow: 'shadow-purple-500/30',
    text: 'text-purple-400',
  },
  level: {
    bg: 'from-green-500 to-emerald-500',
    border: 'border-green-400/50',
    glow: 'shadow-green-500/30',
    text: 'text-green-400',
  },
  social: {
    bg: 'from-pink-500 to-rose-500',
    border: 'border-pink-400/50',
    glow: 'shadow-pink-500/30',
    text: 'text-pink-400',
  },
  special: {
    bg: 'from-yellow-500 to-amber-500',
    border: 'border-yellow-400/50',
    glow: 'shadow-yellow-500/30',
    text: 'text-yellow-400',
  },
};

const categoryNames: Record<string, string> = {
  streak: '连续学习',
  words: '词汇积累',
  lessons: '课程完成',
  level: '等级提升',
  social: '社区互动',
  special: '特殊成就',
};

export function BadgeCard({ achievement, delay = 0 }: BadgeCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const colors = categoryColors[achievement.category] || categoryColors.special;

  const progress = achievement.progress || 0;
  const isUnlocked = achievement.unlocked || false;

  return (
    <div
      className="perspective-1000 cursor-pointer animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={cn(
          'relative w-full aspect-square preserve-3d transition-transform duration-700',
          isFlipped && 'rotate-y-180'
        )}
      >
        <div className="absolute inset-0 backface-hidden">
          <div
            className={cn(
              'w-full h-full rounded-2xl border flex flex-col items-center justify-center p-4 transition-all duration-300',
              isUnlocked
                ? `bg-gradient-to-br ${colors.bg} bg-opacity-20 ${colors.border} shadow-lg ${colors.glow}`
                : 'bg-white/5 border-white/10'
            )}
          >
            <div
              className={cn(
                'relative w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mb-3',
                isUnlocked
                  ? 'bg-gradient-to-br from-amber-300 via-yellow-500 to-amber-600 shadow-lg shadow-amber-500/40'
                  : 'bg-white/10'
              )}
            >
              {isUnlocked ? (
                <>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/40 via-transparent to-transparent" />
                  <span className="relative z-10 drop-shadow-lg">{achievement.icon}</span>
                  <div className="absolute -top-1 -right-1">
                    <Sparkles className="w-5 h-5 text-yellow-200 fill-yellow-200 animate-pulse" />
                  </div>
                </>
              ) : (
                <Lock className="w-8 h-8 text-white/30" />
              )}
            </div>

            <h4
              className={cn(
                'text-sm font-bold text-center mb-1',
                isUnlocked ? 'text-white' : 'text-white/40'
              )}
            >
              {achievement.name}
            </h4>

            <span
              className={cn(
                'text-xs px-2 py-0.5 rounded-full',
                isUnlocked
                  ? `${colors.text} bg-white/10`
                  : 'text-white/30 bg-white/5'
              )}
            >
              {categoryNames[achievement.category]}
            </span>

            {!isUnlocked && progress > 0 && (
              <div className="w-full mt-3">
                <div className="flex justify-between text-xs text-white/40 mb-1">
                  <span>进度</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${colors.bg}`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            {isUnlocked && (
              <div className="absolute top-2 right-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center shadow-lg shadow-amber-500/50">
                  <Star className="w-4 h-4 text-white fill-white" />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="absolute inset-0 backface-hidden rotate-y-180">
          <div
            className={cn(
              'w-full h-full rounded-2xl border flex flex-col items-center justify-center p-4',
              isUnlocked
                ? `bg-gradient-to-br ${colors.bg} bg-opacity-20 ${colors.border} shadow-lg ${colors.glow}`
                : 'bg-white/5 border-white/10'
            )}
          >
            <div
              className={cn(
                'w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-3',
                isUnlocked
                  ? 'bg-gradient-to-br from-amber-300 via-yellow-500 to-amber-600 shadow-lg shadow-amber-500/40'
                  : 'bg-white/10'
              )}
            >
              {isUnlocked ? (
                <span className="drop-shadow-lg">{achievement.icon}</span>
              ) : (
                <Lock className="w-6 h-6 text-white/30" />
              )}
            </div>

            <h4
              className={cn(
                'text-sm font-bold text-center mb-2',
                isUnlocked ? 'text-white' : 'text-white/40'
              )}
            >
              {achievement.name}
            </h4>

            <p
              className={cn(
                'text-xs text-center mb-3',
                isUnlocked ? 'text-white/70' : 'text-white/30'
              )}
            >
              {achievement.description}
            </p>

            <div className="w-full space-y-2">
              <div className="flex items-center justify-center gap-3 text-xs">
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="w-3 h-3 fill-amber-400" />
                  <span>+{achievement.rewardExp}</span>
                </div>
                <div className="flex items-center gap-1 text-yellow-400">
                  <Coins className="w-3 h-3 fill-yellow-400" />
                  <span>+{achievement.rewardCoins}</span>
                </div>
              </div>

              {!isUnlocked && (
                <div>
                  <div className="flex justify-between text-xs text-white/40 mb-1">
                    <span>解锁进度</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${colors.bg} animate-pulse`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}

              {isUnlocked && achievement.unlockedAt && (
                <p className="text-xs text-center text-emerald-400">
                  获得于 {achievement.unlockedAt}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BadgeCard;
