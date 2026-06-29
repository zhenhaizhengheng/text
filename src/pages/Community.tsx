import { useState } from 'react';
import { Plus, TrendingUp, Users, Search, Image as ImageIcon, X } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/common/Tabs';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Modal } from '@/components/common/Modal';
import { Badge } from '@/components/common/Badge';
import { Avatar } from '@/components/common/Avatar';
import PostCard from '@/components/community/PostCard';
import TopicCard from '@/components/community/TopicCard';
import { posts, topics } from '@/data/community';
import { currentUser } from '@/data/user';
import type { Post } from '@/types';
import { cn } from '@/lib/utils';

const groups = [
  {
    id: 'group-1',
    name: '雅思备考小组',
    description: '一起备战雅思，互相监督，共同进步',
    members: 328,
    icon: '🎯',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'group-2',
    name: '日语N2冲刺',
    description: '7月能力考冲刺，每天打卡学习',
    members: 256,
    icon: '🇯🇵',
    color: 'from-rose-500 to-pink-500',
  },
  {
    id: 'group-3',
    name: '韩语入门班',
    description: '零基础学韩语，从发音开始',
    members: 189,
    icon: '💜',
    color: 'from-purple-500 to-fuchsia-500',
  },
];

const postTypes = [
  { value: 'checkin', label: '打卡', icon: '✅', variant: 'green' as const },
  { value: 'discussion', label: '讨论', icon: '💬', variant: 'blue' as const },
  { value: 'achievement', label: '成就', icon: '🏆', variant: 'gold' as const },
  { value: 'question', label: '提问', icon: '❓', variant: 'pink' as const },
];

export default function Community() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [selectedType, setSelectedType] = useState('discussion');
  const [localPosts, setLocalPosts] = useState<Post[]>(posts);

  const handleCreatePost = () => {
    if (!newPostContent.trim()) return;

    const newPost: Post = {
      id: `post-${Date.now()}`,
      userId: currentUser.id,
      user: currentUser,
      content: newPostContent,
      type: selectedType as Post['type'],
      likesCount: 0,
      commentsCount: 0,
      isLiked: false,
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
    };

    setLocalPosts([newPost, ...localPosts]);
    setNewPostContent('');
    setShowCreateModal(false);
  };

  const handleLike = (postId: string) => {
    setLocalPosts(localPosts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likesCount: post.isLiked ? post.likesCount - 1 : post.likesCount + 1,
        };
      }
      return post;
    }));
  };

  return (
    <div className="min-h-screen bg-space-950">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 starfield opacity-30 pointer-events-none" />

      <div className="relative container py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-2">社区交流</h1>
          <p className="text-white/60">与全球语言学习者一起成长</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <Tabs defaultValue="posts" className="w-full sm:w-auto">
                <TabsList>
                  <TabsTrigger value="posts">动态</TabsTrigger>
                  <TabsTrigger value="topics">话题</TabsTrigger>
                  <TabsTrigger value="groups">小组</TabsTrigger>
                </TabsList>
              </Tabs>

              <Button
                leftIcon={<Plus className="w-5 h-5" />}
                onClick={() => setShowCreateModal(true)}
              >
                发布动态
              </Button>
            </div>

            <Tabs defaultValue="posts">
              <TabsContent value="posts" className="mt-0">
                <div className="space-y-4">
                  {localPosts.map((post) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      onLike={handleLike}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="topics" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {topics.map((topic) => (
                    <TopicCard key={topic.id} topic={topic} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="groups" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {groups.map((group) => (
                    <div
                      key={group.id}
                      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1 cursor-pointer group"
                    >
                      <div className={cn('h-28 bg-gradient-to-br relative overflow-hidden', group.color)}>
                        <div className="absolute inset-0 starfield opacity-30" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        <div className="absolute bottom-3 left-4 text-4xl">{group.icon}</div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-white group-hover:text-purple-200 transition-colors">
                          {group.name}
                        </h3>
                        <p className="mt-1 text-sm text-white/60 line-clamp-2">
                          {group.description}
                        </p>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center gap-1 text-white/50 text-sm">
                            <Users className="w-4 h-4" />
                            <span>{group.members} 成员</span>
                          </div>
                          <Button size="sm" variant="secondary">加入</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="w-full lg:w-80 space-y-6">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-purple-400" />
                <h3 className="font-semibold text-white">热门话题</h3>
              </div>
              <div className="space-y-2">
                {topics.slice(0, 5).map((topic, index) => (
                  <div
                    key={topic.id}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 cursor-pointer transition-colors group"
                  >
                    <span className={cn(
                      'w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold',
                      index < 3
                        ? 'bg-gradient-to-br from-amber-500 to-orange-500 text-white'
                        : 'bg-white/10 text-white/60'
                    )}>
                      {index + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white/80 group-hover:text-white transition-colors truncate">
                        {topic.icon} {topic.name}
                      </p>
                      <p className="text-xs text-white/40">{topic.postsCount.toLocaleString()} 帖子</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Search className="w-5 h-5 text-cyan-400" />
                <h3 className="font-semibold text-white">发现用户</h3>
              </div>
              <div className="space-y-3">
                {posts.slice(0, 4).map((post) => (
                  <div key={post.userId} className="flex items-center gap-3">
                    <Avatar src={post.user.avatarUrl} alt={post.user.username} size="md" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{post.user.username}</p>
                      <p className="text-xs text-white/50 truncate">{post.user.bio}</p>
                    </div>
                    <Button size="sm" variant="outline" className="text-xs px-3 py-1">
                      关注
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="发布动态"
        description="分享你的学习心得和进展"
      >
        <div className="space-y-4">
          <div className="flex gap-3">
            <Avatar src={currentUser.avatarUrl} alt={currentUser.username} size="md" />
            <div>
              <p className="font-medium text-white">{currentUser.username}</p>
              <p className="text-xs text-white/50">{currentUser.bio}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {postTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setSelectedType(type.value)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border',
                  selectedType === type.value
                    ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                    : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10 hover:text-white/80'
                )}
              >
                <span className="mr-1">{type.icon}</span>
                {type.label}
              </button>
            ))}
          </div>

          <textarea
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            placeholder="分享你的学习心得..."
            className="w-full h-40 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 resize-none"
          />

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <button className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors">
                <ImageIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
                取消
              </Button>
              <Button
                onClick={handleCreatePost}
                disabled={!newPostContent.trim()}
              >
                发布
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
