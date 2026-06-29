import { useState, useMemo } from 'react';
import { Search, Volume2, Star, BookOpen, Brain, Zap } from 'lucide-react';
import type { VocabularyItem } from '@/types';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/common/Tabs';
import { cn } from '@/lib/utils';

interface WordBookProps {
  words: VocabularyItem[];
  learnedIds: string[];
  favoriteIds: string[];
  onToggleFavorite: (id: string) => void;
}

type MasteryFilter = 'all' | 'low' | 'medium' | 'high';

export default function WordBook({
  words,
  learnedIds,
  favoriteIds,
  onToggleFavorite,
}: WordBookProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [masteryFilter, setMasteryFilter] = useState<MasteryFilter>('all');

  const handleSpeak = (word: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const filterWords = (wordList: VocabularyItem[]) => {
    return wordList.filter((word) => {
      const matchesSearch =
        word.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
        word.meaning.includes(searchQuery);

      const mastery = word.masteryLevel ?? 0;
      let matchesMastery = true;
      if (masteryFilter === 'low') matchesMastery = mastery < 50;
      else if (masteryFilter === 'medium') matchesMastery = mastery >= 50 && mastery < 80;
      else if (masteryFilter === 'high') matchesMastery = mastery >= 80;

      return matchesSearch && matchesMastery;
    });
  };

  const learnedWords = useMemo(() => 
    filterWords(words.filter((w) => learnedIds.includes(w.id))),
    [words, learnedIds, searchQuery, masteryFilter]
  );

  const favoriteWords = useMemo(() => 
    filterWords(words.filter((w) => favoriteIds.includes(w.id))),
    [words, favoriteIds, searchQuery, masteryFilter]
  );

  const newWords = useMemo(() => 
    filterWords(words.filter((w) => !learnedIds.includes(w.id))),
    [words, learnedIds, searchQuery, masteryFilter]
  );

  const getMasteryColor = (level: number = 0) => {
    if (level >= 80) return 'text-green-400 bg-green-500/20 border-green-500/30';
    if (level >= 50) return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
    return 'text-red-400 bg-red-500/20 border-red-500/30';
  };

  const getMasteryLabel = (level: number = 0) => {
    if (level >= 80) return '熟练';
    if (level >= 50) return '熟悉';
    return '生疏';
  };

  const WordItem = ({ word }: { word: VocabularyItem }) => {
    const isFavorite = favoriteIds.includes(word.id);
    const mastery = word.masteryLevel ?? 0;

    return (
      <div className="glass-card p-4 hover:bg-white/10 transition-all duration-300 group">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-bold text-white font-display">
                {word.word}
              </h3>
              <button
                onClick={() => handleSpeak(word.word)}
                className="p-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-purple-500/20 hover:border-purple-500/50 transition-all duration-300 opacity-0 group-hover:opacity-100"
              >
                <Volume2 className="w-4 h-4 text-purple-400" />
              </button>
              <span className="px-2 py-0.5 text-xs rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                {word.partOfSpeech}
              </span>
            </div>
            <p className="text-sm text-purple-300 mb-2">{word.phonetic}</p>
            <p className="text-white/80 mb-3">{word.meaning}</p>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-white/40">熟练度</span>
                  <span className={cn('font-medium', getMasteryColor(mastery).split(' ')[0])}>
                    {mastery}%
                  </span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={cn(
                      'h-full rounded-full transition-all duration-500',
                      mastery >= 80
                        ? 'bg-gradient-to-r from-green-500 to-emerald-400'
                        : mastery >= 50
                        ? 'bg-gradient-to-r from-yellow-500 to-amber-400'
                        : 'bg-gradient-to-r from-red-500 to-orange-400'
                    )}
                    style={{ width: `${mastery}%` }}
                  />
                </div>
              </div>
              <span className={cn(
                'px-2 py-1 text-xs rounded-full border',
                getMasteryColor(mastery)
              )}>
                {getMasteryLabel(mastery)}
              </span>
            </div>
          </div>
          <button
            onClick={() => onToggleFavorite(word.id)}
            className={cn(
              'p-2 rounded-full transition-all duration-300',
              isFavorite
                ? 'text-yellow-400 bg-yellow-500/20'
                : 'text-white/30 hover:text-yellow-400 hover:bg-yellow-500/10'
            )}
          >
            <Star className={cn('w-5 h-5', isFavorite && 'fill-current')} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            placeholder="搜索单词或释义..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-white/50">熟练度：</span>
          {[
            { value: 'all', label: '全部', icon: BookOpen },
            { value: 'low', label: '生疏', icon: Zap },
            { value: 'medium', label: '熟悉', icon: Brain },
            { value: 'high', label: '熟练', icon: Star },
          ].map((filter) => {
            const Icon = filter.icon;
            return (
              <button
                key={filter.value}
                onClick={() => setMasteryFilter(filter.value as MasteryFilter)}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg transition-all duration-200',
                  masteryFilter === filter.value
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/20'
                    : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/10'
                )}
              >
                <Icon className="w-4 h-4" />
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>

      <Tabs defaultValue="learned">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="learned">
            <BookOpen className="w-4 h-4 mr-2" />
            已学 ({learnedWords.length})
          </TabsTrigger>
          <TabsTrigger value="favorite">
            <Star className="w-4 h-4 mr-2" />
            收藏 ({favoriteWords.length})
          </TabsTrigger>
          <TabsTrigger value="new">
            <Zap className="w-4 h-4 mr-2" />
            生词 ({newWords.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="learned">
          {learnedWords.length > 0 ? (
            <div className="space-y-3">
              {learnedWords.map((word) => (
                <WordItem key={word.id} word={word} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-white/20 mx-auto mb-4" />
              <p className="text-white/50">暂无已学单词</p>
              <p className="text-white/30 text-sm mt-1">开始学习后单词会显示在这里</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="favorite">
          {favoriteWords.length > 0 ? (
            <div className="space-y-3">
              {favoriteWords.map((word) => (
                <WordItem key={word.id} word={word} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Star className="w-16 h-16 text-white/20 mx-auto mb-4" />
              <p className="text-white/50">暂无收藏单词</p>
              <p className="text-white/30 text-sm mt-1">点击单词旁的星标收藏重要单词</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="new">
          {newWords.length > 0 ? (
            <div className="space-y-3">
              {newWords.map((word) => (
                <WordItem key={word.id} word={word} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Zap className="w-16 h-16 text-white/20 mx-auto mb-4" />
              <p className="text-white/50">太棒了！</p>
              <p className="text-white/30 text-sm mt-1">所有单词都已学习</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
