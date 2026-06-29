import { useState } from 'react';
import { Heart, MessageCircle, Repeat2, MoreHorizontal, ImageIcon } from 'lucide-react';
import { Avatar } from '@/components/common/Avatar';
import { Badge } from '@/components/common/Badge';
import type { Post } from '@/types';
import { cn } from '@/lib/utils';

interface PostCardProps {
  post: Post;
  className?: string;
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onShare?: (postId: string) => void;
}

const typeConfig = {
  checkin: { label: '打卡', variant: 'green' as const, icon: '✅' },
  discussion: { label: '讨论', variant: 'blue' as const, icon: '💬' },
  achievement: { label: '成就', variant: 'gold' as const, icon: '🏆' },
  question: { label: '提问', variant: 'pink' as const, icon: '❓' },
};

export function PostCard({ post, className, onLike, onComment, onShare }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [showFullImage, setShowFullImage] = useState<string | null>(null);

  const type = typeConfig[post.type];

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
    onLike?.(post.id);
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return '刚刚';
    if (minutes < 60) return `${minutes}分钟前`;
    if (hours < 24) return `${hours}小时前`;
    if (days < 7) return `${days}天前`;
    return dateStr.split(' ')[0];
  };

  return (
    <div
      className={cn(
        'bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-white/20',
        className
      )}
    >
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar src={post.user.avatarUrl} alt={post.user.username} size="md" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-white">{post.user.username}</span>
                <Badge variant={type.variant} size="sm">
                  <span className="mr-0.5">{type.icon}</span>
                  {type.label}
                </Badge>
              </div>
              <span className="text-xs text-white/50">{formatTime(post.createdAt)}</span>
            </div>
          </div>
          <button className="p-1.5 rounded-lg text-white/40 hover:text-white/70 hover:bg-white/10 transition-colors">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4">
          <p className="text-white/80 leading-relaxed whitespace-pre-wrap">{post.content}</p>
        </div>

        {post.images && post.images.length > 0 && (
          <div className={cn(
            'mt-4 grid gap-2',
            post.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'
          )}>
            {post.images.map((img, index) => (
              <div
                key={index}
                className="relative rounded-xl overflow-hidden cursor-pointer group"
                onClick={() => setShowFullImage(img)}
              >
                <img
                  src={img}
                  alt={`post-image-${index}`}
                  className={cn(
                    'w-full object-cover transition-transform duration-500 group-hover:scale-105',
                    post.images!.length === 1 ? 'max-h-80' : 'h-40'
                  )}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <ImageIcon className="w-8 h-8 text-white/0 group-hover:text-white/80 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 flex items-center justify-between pt-4 border-t border-white/5">
          <button
            onClick={handleLike}
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200',
              isLiked
                ? 'text-pink-400 bg-pink-500/10'
                : 'text-white/50 hover:text-pink-400 hover:bg-pink-500/10'
            )}
          >
            <Heart className={cn('w-5 h-5', isLiked && 'fill-current')} />
            <span className="text-sm font-medium">{likesCount}</span>
          </button>

          <button
            onClick={() => onComment?.(post.id)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-white/50 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all duration-200"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm font-medium">{post.commentsCount}</span>
          </button>

          <button
            onClick={() => onShare?.(post.id)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-white/50 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all duration-200"
          >
            <Repeat2 className="w-5 h-5" />
            <span className="text-sm font-medium">转发</span>
          </button>
        </div>
      </div>

      {showFullImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowFullImage(null)}
        >
          <img
            src={showFullImage}
            alt="full"
            className="max-w-full max-h-full rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

export default PostCard;
