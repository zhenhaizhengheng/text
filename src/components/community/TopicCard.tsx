import { useState } from 'react';
import { Hash, Users, Plus, Check } from 'lucide-react';
import type { Topic } from '@/types';
import { cn } from '@/lib/utils';

interface TopicCardProps {
  topic: Topic;
  variant?: 'default' | 'compact';
  className?: string;
  onJoin?: (topicId: string) => void;
}

export function TopicCard({ topic, variant = 'default', className, onJoin }: TopicCardProps) {
  const [isJoined, setIsJoined] = useState(false);

  const handleJoin = () => {
    setIsJoined(!isJoined);
    onJoin?.(topic.id);
  };

  if (variant === 'compact') {
    return (
      <div
        className={cn(
          'flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer group',
          className
        )}
      >
        <div className={cn(
          'w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center text-xl',
          topic.color
        )}>
          <span>{topic.icon}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-white text-sm truncate group-hover:text-purple-200 transition-colors">
            {topic.name}
          </h4>
          <p className="text-xs text-white/50 flex items-center gap-1">
            <Users className="w-3 h-3" />
            {topic.postsCount.toLocaleString()} 帖子
          </p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleJoin();
          }}
          className={cn(
            'w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200',
            isJoined
              ? 'bg-emerald-500/20 text-emerald-400'
              : 'bg-white/10 text-white/60 hover:bg-purple-500/20 hover:text-purple-300'
          )}
        >
          {isJoined ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1 cursor-pointer group',
        className
      )}
    >
      <div className={cn('h-24 bg-gradient-to-br relative overflow-hidden', topic.color)}>
        <div className="absolute inset-0 starfield opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute bottom-3 left-4 text-3xl">{topic.icon}</div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-white group-hover:text-purple-200 transition-colors">
              {topic.name}
            </h3>
            <div className="flex items-center gap-1 mt-1 text-white/50 text-sm">
              <Hash className="w-3.5 h-3.5" />
              <span>{topic.postsCount.toLocaleString()} 帖子</span>
            </div>
          </div>
        </div>

        <p className="mt-2 text-sm text-white/60 line-clamp-2">
          {topic.description}
        </p>

        <button
          onClick={handleJoin}
          className={cn(
            'mt-4 w-full py-2 rounded-xl font-medium text-sm transition-all duration-200',
            isJoined
              ? 'bg-white/10 text-white/70 border border-white/20'
              : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/30'
          )}
        >
          {isJoined ? '已加入' : '加入话题'}
        </button>
      </div>
    </div>
  );
}

export default TopicCard;
