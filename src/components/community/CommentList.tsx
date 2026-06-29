import { useState } from 'react';
import { Heart, Reply, Send } from 'lucide-react';
import { Avatar } from '@/components/common/Avatar';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import type { Comment } from '@/types';
import { cn } from '@/lib/utils';

interface CommentListProps {
  comments: Comment[];
  className?: string;
  onLike?: (commentId: string) => void;
  onReply?: (commentId: string, content: string) => void;
}

interface CommentItemProps {
  comment: Comment;
  onLike?: (commentId: string) => void;
  onReply?: (commentId: string, content: string) => void;
}

function CommentItem({ comment, onLike, onReply }: CommentItemProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(Math.floor(Math.random() * 50) + 1);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
    onLike?.(comment.id);
  };

  const handleReply = () => {
    if (replyContent.trim()) {
      onReply?.(comment.id, replyContent);
      setReplyContent('');
      setShowReplyInput(false);
    }
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
    <div className="py-4 border-b border-white/5 last:border-b-0">
      <div className="flex gap-3">
        <Avatar src={comment.user.avatarUrl} alt={comment.user.username} size="sm" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium text-white text-sm">{comment.user.username}</span>
              <span className="text-xs text-white/40 ml-2">{formatTime(comment.createdAt)}</span>
            </div>
          </div>
          <p className="mt-1 text-white/70 text-sm leading-relaxed">{comment.content}</p>
          <div className="mt-2 flex items-center gap-4">
            <button
              onClick={handleLike}
              className={cn(
                'flex items-center gap-1 text-xs transition-colors',
                isLiked ? 'text-pink-400' : 'text-white/40 hover:text-pink-400'
              )}
            >
              <Heart className={cn('w-3.5 h-3.5', isLiked && 'fill-current')} />
              <span>{likesCount}</span>
            </button>
            <button
              onClick={() => setShowReplyInput(!showReplyInput)}
              className="flex items-center gap-1 text-xs text-white/40 hover:text-cyan-400 transition-colors"
            >
              <Reply className="w-3.5 h-3.5" />
              <span>回复</span>
            </button>
          </div>

          {showReplyInput && (
            <div className="mt-3 flex gap-2">
              <Input
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="写下你的回复..."
                className="flex-1 text-sm"
                onKeyDown={(e) => e.key === 'Enter' && handleReply()}
              />
              <Button size="sm" onClick={handleReply} leftIcon={<Send className="w-4 h-4" />}>
                发送
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function CommentList({ comments, className, onLike, onReply }: CommentListProps) {
  if (comments.length === 0) {
    return (
      <div className={cn('py-8 text-center text-white/40', className)}>
        暂无评论，快来发表第一条评论吧～
      </div>
    );
  }

  return (
    <div className={cn('divide-y divide-white/5', className)}>
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          onLike={onLike}
          onReply={onReply}
        />
      ))}
    </div>
  );
}

export default CommentList;
