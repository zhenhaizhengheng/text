import { useState } from 'react';
import { Clock, Headphones, Filter, Play, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import ListeningQuiz from '@/components/learn/ListeningQuiz';
import { listeningCategories, listeningItems } from '@/data/listening';
import type { ListeningItem } from '@/types';

const levelLabels: Record<string, string> = {
  beginner: '初级',
  intermediate: '中级',
  advanced: '高级',
};

const levelColors: Record<string, string> = {
  beginner: 'bg-green-500/20 text-green-400 border-green-500/30',
  intermediate: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  advanced: 'bg-red-500/20 text-red-400 border-red-500/30',
};

export default function Listening() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<ListeningItem | null>(null);

  const filteredItems = listeningItems.filter((item) => {
    if (selectedCategory && item.category !== selectedCategory) return false;
    if (selectedLevel && item.level !== selectedLevel) return false;
    return true;
  });

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (selectedItem) {
    return (
      <div className="min-h-screen pt-20 pb-16 px-4">
        <div className="container max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedItem(null)}
            className="flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            返回列表
          </button>
          <ListeningQuiz
            item={selectedItem}
            onBack={() => setSelectedItem(null)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4 font-display">
            听力训练
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            丰富的听力素材，从对话到新闻，循序渐进提升你的听力水平
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {listeningCategories.map((category, index) => (
            <button
              key={category.id}
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === category.id ? null : category.id
                )
              }
              className={cn(
                'p-6 rounded-2xl text-left transition-all duration-300',
                'bg-white/5 backdrop-blur-xl border border-white/10',
                'hover:bg-white/10 hover:border-white/20 hover:-translate-y-1',
                selectedCategory === category.id &&
                  'border-purple-500/50 bg-purple-500/10 shadow-lg shadow-purple-500/20',
                `animate-fade-in animate-delay-${(index + 1) * 100}`
              )}
            >
              <div className="text-4xl mb-4">{category.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2 font-display">
                {category.name}
              </h3>
              <p className="text-white/60 text-sm mb-4">{category.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-white/40 text-sm">
                  {category.count} 个材料
                </span>
                <div
                  className={cn(
                    'w-8 h-8 rounded-full bg-gradient-to-r flex items-center justify-center',
                    category.color
                  )}
                >
                  <Headphones className="w-4 h-4 text-white" />
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4 mb-8">
          <div className="flex items-center gap-2 text-white/60">
            <Filter className="w-5 h-5" />
            <span>难度筛选：</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedLevel(null)}
              className={cn(
                'px-4 py-2 rounded-full text-sm transition-all',
                !selectedLevel
                  ? 'bg-purple-500/30 text-purple-300 border border-purple-500/50'
                  : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10'
              )}
            >
              全部
            </button>
            {(['beginner', 'intermediate', 'advanced'] as const).map((level) => (
              <button
                key={level}
                onClick={() =>
                  setSelectedLevel(selectedLevel === level ? null : level)
                }
                className={cn(
                  'px-4 py-2 rounded-full text-sm transition-all border',
                  selectedLevel === level
                    ? levelColors[level]
                    : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10'
                )}
              >
                {levelLabels[level]}
              </button>
            ))}
          </div>
        </div>

        <div className="text-white/60 mb-4">
          共 {filteredItems.length} 个听力材料
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-40 overflow-hidden">
                {item.coverImage ? (
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-600/30 to-pink-600/30 flex items-center justify-center">
                    <Headphones className="w-12 h-12 text-white/40" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span
                    className={cn(
                      'px-2 py-1 text-xs rounded-full border',
                      levelColors[item.level]
                    )}
                  >
                    {levelLabels[item.level]}
                  </span>
                </div>
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-black/40 backdrop-blur-sm rounded-full text-white text-xs">
                  <Clock className="w-3 h-3" />
                  {formatDuration(item.duration)}
                </div>
                <button
                  onClick={() => setSelectedItem(item)}
                  className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white flex items-center justify-center shadow-lg shadow-purple-500/30 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 hover:scale-110"
                >
                  <Play className="w-4 h-4 ml-0.5" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white mb-2 font-display line-clamp-1">
                  {item.title}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-white/40 text-sm">
                    {item.questions.length} 道题
                  </span>
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="text-purple-400 text-sm hover:text-purple-300 transition-colors flex items-center gap-1"
                  >
                    开始练习
                    <Play className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <Headphones className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <p className="text-white/40 text-lg">暂无符合条件的听力材料</p>
          </div>
        )}
      </div>
    </div>
  );
}
