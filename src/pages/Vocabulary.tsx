import { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Brain, 
  Library, 
  Target, 
  Flame, 
  Trophy, 
  Zap,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';
import { vocabulary } from '@/data/vocabulary';
import FlashCard from '@/components/learn/FlashCard';
import QuizChoice from '@/components/learn/QuizChoice';
import WordBook from '@/components/learn/WordBook';
import { Card, CardContent } from '@/components/common/Card';
import { cn } from '@/lib/utils';

type LearnMode = 'flashcard' | 'quiz' | 'wordbook';

export default function Vocabulary() {
  const [mode, setMode] = useState<LearnMode>('flashcard');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [learnedIds, setLearnedIds] = useState<string[]>(vocabulary.slice(0, 10).map(w => w.id));
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [todayLearned, setTodayLearned] = useState(12);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [flashcardCompleted, setFlashcardCompleted] = useState(false);

  const dailyGoal = 20;

  const englishWords = useMemo(() => 
    vocabulary.filter(w => w.lessonId.includes('en')),
    []
  );

  const studyWords = englishWords.slice(0, 10);

  const progressPercentage = Math.min((todayLearned / dailyGoal) * 100, 100);
  const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;

  const handleForget = () => {
    nextCard();
  };

  const handleHard = () => {
    nextCard();
  };

  const handleRemember = () => {
    const word = studyWords[currentIndex];
    if (word && !learnedIds.includes(word.id)) {
      setLearnedIds(prev => [...prev, word.id]);
      setTodayLearned(prev => prev + 1);
    }
    nextCard();
  };

  const nextCard = () => {
    if (currentIndex < studyWords.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setFlashcardCompleted(true);
    }
  };

  const handleQuizAnswer = (isCorrect: boolean) => {
    setTotalAnswered(prev => prev + 1);
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
    }
  };

  const handleQuizNext = () => {
    if (currentIndex < studyWords.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleToggleFavorite = (id: string) => {
    setFavoriteIds(prev => 
      prev.includes(id) 
        ? prev.filter(fid => fid !== id)
        : [...prev, id]
    );
  };

  const restartFlashcard = () => {
    setCurrentIndex(0);
    setFlashcardCompleted(false);
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setQuizCompleted(false);
    setCorrectCount(0);
    setTotalAnswered(0);
  };

  const modes = [
    { id: 'flashcard', label: '闪卡模式', icon: Brain },
    { id: 'quiz', label: '选词填空', icon: Target },
    { id: 'wordbook', label: '单词本', icon: Library },
  ];

  const stats = [
    { label: '今日学习', value: todayLearned, unit: '个', icon: BookOpen, color: 'from-purple-500 to-pink-500' },
    { label: '每日目标', value: dailyGoal, unit: '个', icon: Target, color: 'from-cyan-500 to-blue-500' },
    { label: '连续学习', value: 7, unit: '天', icon: Flame, color: 'from-orange-500 to-red-500' },
    { label: '正确率', value: accuracy, unit: '%', icon: Trophy, color: 'from-green-500 to-emerald-500' },
  ];

  return (
    <div className="min-h-screen bg-space-950 starfield">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4 font-display">
            单词记忆
          </h1>
          <p className="text-white/60 text-lg">
            探索宇宙词汇，开启语言星际之旅
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'p-3 rounded-xl bg-gradient-to-br',
                      stat.color,
                      'bg-opacity-20'
                    )}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white font-display">
                        {stat.value}
                        <span className="text-sm font-normal text-white/50 ml-1">{stat.unit}</span>
                      </p>
                      <p className="text-xs text-white/50">{stat.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-orange-400" />
                <span className="font-medium text-white">今日目标</span>
              </div>
              <span className="text-sm text-white/60">
                {todayLearned} / {dailyGoal} 个单词
              </span>
            </div>
            <div className="h-3 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-full transition-all duration-1000"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            {progressPercentage >= 100 && (
              <div className="mt-3 flex items-center gap-2 text-green-400">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-sm font-medium">恭喜！今日目标已完成 🎉</span>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center p-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
            {modes.map((m) => {
              const Icon = m.icon;
              const isActive = mode === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => {
                    setMode(m.id as LearnMode);
                    setCurrentIndex(0);
                    setFlashcardCompleted(false);
                    setQuizCompleted(false);
                  }}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                    isActive
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/20'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {m.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="animate-fade-in">
          {mode === 'flashcard' && (
            flashcardCompleted ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Trophy className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-3xl font-bold gradient-text mb-4 font-display">
                  太棒了！
                </h2>
                <p className="text-white/60 mb-8 text-lg">
                  你已完成本轮闪卡学习
                </p>
                <div className="flex justify-center gap-4">
                  <button onClick={restartFlashcard} className="btn-secondary flex items-center gap-2">
                    <RotateCcw className="w-4 h-4" />
                    再来一轮
                  </button>
                  <button onClick={() => setMode('quiz')} className="btn-primary flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    去做测验
                  </button>
                </div>
              </div>
            ) : (
              <FlashCard
                word={studyWords[currentIndex]}
                currentIndex={currentIndex}
                totalCount={studyWords.length}
                onForget={handleForget}
                onHard={handleHard}
                onRemember={handleRemember}
              />
            )
          )}

          {mode === 'quiz' && (
            quizCompleted ? (
              <div className="text-center py-16 max-w-lg mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                  <Trophy className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-3xl font-bold gradient-text-blue mb-4 font-display">
                  测验完成！
                </h2>
                <div className="glass-card p-6 mb-8">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-green-400 font-display">{correctCount}</p>
                      <p className="text-sm text-white/50">正确</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-red-400 font-display">{totalAnswered - correctCount}</p>
                      <p className="text-sm text-white/50">错误</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-sm text-white/50 mb-2">正确率</p>
                    <p className="text-4xl font-bold gradient-text font-display">{accuracy}%</p>
                  </div>
                </div>
                <div className="flex justify-center gap-4">
                  <button onClick={restartQuiz} className="btn-secondary flex items-center gap-2">
                    <RotateCcw className="w-4 h-4" />
                    再测一次
                  </button>
                  <button onClick={() => setMode('wordbook')} className="btn-primary flex items-center gap-2">
                    <Library className="w-4 h-4" />
                    查看单词本
                  </button>
                </div>
              </div>
            ) : (
              <QuizChoice
                words={studyWords}
                currentIndex={currentIndex}
                totalCount={studyWords.length}
                onAnswer={handleQuizAnswer}
                onNext={handleQuizNext}
              />
            )
          )}

          {mode === 'wordbook' && (
            <WordBook
              words={vocabulary}
              learnedIds={learnedIds}
              favoriteIds={favoriteIds}
              onToggleFavorite={handleToggleFavorite}
            />
          )}
        </div>
      </div>
    </div>
  );
}
