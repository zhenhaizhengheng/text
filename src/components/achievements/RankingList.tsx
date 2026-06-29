import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/common/Card';
import type { RankingItem } from '@/types';
import { cn } from '@/lib/utils';
import { Trophy, Medal, Award, Flame, TrendingUp, Globe, Calendar, Crown } from 'lucide-react';

interface RankingListProps {
  rankings: RankingItem[];
  currentUserId?: string;
}

type RankingType = 'total' | 'weekly' | 'language';

const rankingTabs = [
  { id: 'total', label: '总榜', icon: Trophy, color: 'from-amber-500 to-yellow-500' },
  { id: 'weekly', label: '周榜', icon: Calendar, color: 'from-purple-500 to-pink-500' },
  { id: 'language', label: '语言榜', icon: Globe, color: 'from-blue-500 to-cyan-500' },
];

const getRankColor = (rank: number) => {
  switch (rank) {
    case 1:
      return 'from-amber-400 via-yellow-500 to-amber-600';
    case 2:
      return 'from-slate-300 via-gray-400 to-slate-500';
    case 3:
      return 'from-amber-600 via-orange-500 to-amber-700';
    default:
      return 'from-white/20 to-white/5';
  }
};

const getRankBadge = (rank: number) => {
  switch (rank) {
    case 1:
      return '🥇';
    case 2:
      return '🥈';
    case 3:
      return '🥉';
    default:
      return null;
  }
};

export function RankingList({ rankings, currentUserId }: RankingListProps) {
  const [activeTab, setActiveTab] = useState<RankingType>('total');

  const sortedRankings = [...rankings].sort((a, b) => b.value - a.value);
  const topThree = sortedRankings.slice(0, 3);
  const restRankings = sortedRankings.slice(3);

  const currentUserRank = sortedRankings.find(r => r.userId === currentUserId);

  return (
    <Card glow>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl gradient-text-gold">排行榜</CardTitle>
            <p className="text-white/60 mt-1">与全球学习者一较高下</p>
          </div>
          {currentUserRank && (
            <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30">
              <div className="text-right">
                <p className="text-xs text-white/60">我的排名</p>
                <p className="text-xl font-bold gradient-text">
                  #{currentUserRank.rank}
                </p>
              </div>
              <TrendingUp className="w-6 h-6 text-purple-400" />
            </div>
          )}
        </div>

        <div className="flex gap-2 mt-6">
          {rankingTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as RankingType)}
                className={cn(
                  'flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300',
                  isActive
                    ? `bg-gradient-to-r ${tab.color} text-white shadow-lg`
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                )}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </CardHeader>

      <CardContent>
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 via-transparent to-transparent rounded-2xl" />
          
          <div className="relative flex items-end justify-center gap-4 md:gap-8 pt-8">
            {topThree.map((item, index) => {
              const heights = ['h-32', 'h-24', 'h-20'];
              const order = [1, 0, 2];
              const actualIndex = order[index];
              const rank = actualIndex + 1;

              return (
                <div
                  key={item.userId}
                  className={cn(
                    'flex flex-col items-center animate-fade-in-up',
                    actualIndex === 0 ? 'order-2' : actualIndex === 1 ? 'order-1' : 'order-3'
                  )}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative mb-3">
                    <div
                      className={cn(
                        'w-16 h-16 md:w-20 md:h-20 rounded-full border-4 p-1',
                        `bg-gradient-to-br ${getRankColor(rank)}`
                      )}
                    >
                      <img
                        src={item.avatarUrl}
                        alt={item.username}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <div className="absolute -top-2 -right-2 text-2xl animate-bounce-slow">
                      {getRankBadge(rank)}
                    </div>
                    {rank === 1 && (
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                        <Crown className="w-8 h-8 text-amber-400 fill-amber-400 animate-float" />
                      </div>
                    )}
                  </div>

                  <p className="text-sm font-semibold text-white mb-1 text-center truncate max-w-24">
                    {item.username}
                  </p>
                  <p className="text-amber-400 font-bold text-lg mb-2">
                    {item.value.toLocaleString()}
                  </p>

                  <div
                    className={cn(
                      'w-full rounded-t-xl bg-gradient-to-t',
                      getRankColor(rank),
                      heights[actualIndex],
                      rank === 1 ? 'shadow-lg shadow-amber-500/30' : ''
                    )}
                  >
                    <div className="pt-3 text-center">
                      <span className="text-2xl font-bold text-white drop-shadow-lg">
                        {rank}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-2">
          {restRankings.map((item, index) => {
            const isCurrentUser = item.userId === currentUserId;
            return (
              <div
                key={item.userId}
                className={cn(
                  'flex items-center gap-4 p-3 rounded-xl transition-all duration-300 animate-fade-in-up',
                  isCurrentUser
                    ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30'
                    : 'bg-white/5 border border-transparent hover:bg-white/10 hover:border-white/10'
                )}
                style={{ animationDelay: `${(index + 3) * 50}ms` }}
              >
                <div
                  className={cn(
                    'w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg',
                    isCurrentUser
                      ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white'
                      : 'bg-white/10 text-white/60'
                  )}
                >
                  {item.rank}
                </div>

                <img
                  src={item.avatarUrl}
                  alt={item.username}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white/10"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p
                      className={cn(
                        'font-semibold truncate',
                        isCurrentUser ? 'text-white' : 'text-white/90'
                      )}
                    >
                      {item.username}
                    </p>
                    {isCurrentUser && (
                      <span className="flex-shrink-0 text-xs px-2 py-0.5 bg-purple-500/30 text-purple-300 rounded-full">
                        我
                      </span>
                    )}
                  </div>
                  {item.streakDays && (
                    <div className="flex items-center gap-1 text-sm text-orange-400">
                      <Flame className="w-4 h-4 fill-orange-400" />
                      <span>连续 {item.streakDays} 天</span>
                    </div>
                  )}
                </div>

                <div className="text-right">
                  <p className="text-lg font-bold text-amber-400">
                    {item.value.toLocaleString()}
                  </p>
                  <p className="text-xs text-white/40">经验值</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export default RankingList;
