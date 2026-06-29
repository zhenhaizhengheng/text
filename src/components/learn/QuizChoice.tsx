import { useState, useEffect, useCallback } from 'react';
import { Clock, Zap, Volume2, Check, X, Lightbulb } from 'lucide-react';
import type { VocabularyItem } from '@/types';
import { cn } from '@/lib/utils';

interface QuizChoiceProps {
  words: VocabularyItem[];
  currentIndex: number;
  totalCount: number;
  onAnswer: (isCorrect: boolean) => void;
  onNext: () => void;
}

export default function QuizChoice({
  words,
  currentIndex,
  totalCount,
  onAnswer,
  onNext,
}: QuizChoiceProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [combo, setCombo] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentWord = words[currentIndex];

  const generateOptions = useCallback(() => {
    if (!currentWord) return;
    
    const otherWords = words.filter(w => w.id !== currentWord.id);
    const shuffled = [...otherWords].sort(() => Math.random() - 0.5);
    const wrongOptions = shuffled.slice(0, 3).map(w => w.meaning);
    const allOptions = [...wrongOptions, currentWord.meaning].sort(() => Math.random() - 0.5);
    setOptions(allOptions);
  }, [currentWord, words]);

  useEffect(() => {
    generateOptions();
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(false);
    setTimeLeft(30);
    setShowExplanation(false);
  }, [currentIndex, generateOptions]);

  useEffect(() => {
    if (showResult || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showResult, timeLeft]);

  const handleTimeUp = () => {
    setShowResult(true);
    setIsCorrect(false);
    setCombo(0);
    onAnswer(false);
  };

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentWord.word);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSelect = (answer: string) => {
    if (showResult) return;

    setSelectedAnswer(answer);
    const correct = answer === currentWord.meaning;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setCombo((prev) => prev + 1);
    } else {
      setCombo(0);
    }

    onAnswer(correct);
  };

  const handleNext = () => {
    onNext();
  };

  const progress = ((currentIndex + 1) / totalCount) * 100;
  const timerPercentage = (timeLeft / 30) * 100;

  const getOptionStyle = (option: string) => {
    if (!showResult) {
      return 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-purple-500/50 cursor-pointer';
    }

    if (option === currentWord.meaning) {
      return 'bg-green-500/20 border-green-500/50 text-green-300';
    }

    if (option === selectedAnswer && !isCorrect) {
      return 'bg-red-500/20 border-red-500/50 text-red-300';
    }

    return 'bg-white/5 border-white/10 opacity-50';
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-white/60">第 {currentIndex + 1} / {totalCount} 题</span>
          <div className="flex items-center gap-4">
            {combo > 1 && (
              <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30">
                <Zap className="w-4 h-4 text-orange-400" />
                <span className="text-sm font-medium text-orange-300">x{combo}</span>
              </div>
            )}
            <div className={cn(
              'flex items-center gap-1 px-3 py-1 rounded-full',
              timeLeft <= 10 ? 'bg-red-500/20 border border-red-500/30' : 'bg-white/5 border border-white/10'
            )}>
              <Clock className={cn('w-4 h-4', timeLeft <= 10 ? 'text-red-400' : 'text-white/60')} />
              <span className={cn('text-sm font-medium', timeLeft <= 10 ? 'text-red-300' : 'text-white/60')}>
                {timeLeft}s
              </span>
            </div>
          </div>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="glass-card card-glow p-8 mb-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500" />
        
        <div className="relative mb-2">
          <div className="absolute -top-2 left-0 w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className={cn(
                'h-full rounded-full transition-all duration-1000',
                timeLeft <= 10 
                  ? 'bg-gradient-to-r from-red-500 to-orange-500' 
                  : 'bg-gradient-to-r from-cyan-500 to-purple-500'
              )}
              style={{ width: `${timerPercentage}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-center mb-6 mt-4">
          <button
            onClick={handleSpeak}
            className="mr-4 p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300 group"
          >
            <Volume2 className="w-6 h-6 text-purple-400 group-hover:text-purple-300" />
          </button>
          <h2 className="text-4xl md:text-5xl font-bold text-white font-display">
            {currentWord.word}
          </h2>
        </div>

        <p className="text-center text-purple-300 mb-6">
          {currentWord.phonetic}
        </p>

        <p className="text-center text-white/60 mb-8">
          请选择这个单词的正确释义
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelect(option)}
              disabled={showResult}
              className={cn(
                'p-4 rounded-xl border-2 text-left transition-all duration-300',
                getOptionStyle(option),
                showResult && option === currentWord.meaning && 'animate-pulse'
              )}
            >
              <div className="flex items-center gap-3">
                <span className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold',
                  showResult && option === currentWord.meaning
                    ? 'bg-green-500/30 text-green-300'
                    : showResult && option === selectedAnswer && !isCorrect
                    ? 'bg-red-500/30 text-red-300'
                    : 'bg-white/10 text-white/60'
                )}>
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="flex-1">{option}</span>
                {showResult && option === currentWord.meaning && (
                  <Check className="w-5 h-5 text-green-400" />
                )}
                {showResult && option === selectedAnswer && !isCorrect && (
                  <X className="w-5 h-5 text-red-400" />
                )}
              </div>
            </button>
          ))}
        </div>

        {showResult && (
          <div className={cn(
            'mt-6 p-4 rounded-xl border',
            isCorrect 
              ? 'bg-green-500/10 border-green-500/30' 
              : 'bg-red-500/10 border-red-500/30'
          )}>
            <div className="flex items-center gap-2 mb-2">
              {isCorrect ? (
                <Check className="w-5 h-5 text-green-400" />
              ) : (
                <X className="w-5 h-5 text-red-400" />
              )}
              <span className={cn(
                'font-semibold',
                isCorrect ? 'text-green-300' : 'text-red-300'
              )}>
                {isCorrect ? '回答正确！' : '回答错误'}
              </span>
              {combo > 1 && isCorrect && (
                <span className="ml-auto px-2 py-1 text-xs rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">
                  连击 x{combo}
                </span>
              )}
            </div>
            
            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className="flex items-center gap-2 text-sm text-white/60 hover:text-white/80 transition-colors"
            >
              <Lightbulb className="w-4 h-4" />
              {showExplanation ? '收起解析' : '查看解析'}
            </button>

            {showExplanation && (
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="mb-3">
                  <p className="text-sm text-white/50 mb-1">正确答案</p>
                  <p className="text-white font-medium">{currentWord.meaning}</p>
                </div>
                <div className="mb-3">
                  <p className="text-sm text-white/50 mb-1">词性</p>
                  <span className="px-2 py-1 text-xs rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    {currentWord.partOfSpeech}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-white/50 mb-1">例句</p>
                  <p className="text-white/80 italic mb-1">"{currentWord.exampleEn}"</p>
                  <p className="text-white/50 text-sm">{currentWord.exampleCn}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {showResult && (
        <div className="flex justify-center">
          <button
            onClick={handleNext}
            className="btn-primary px-8"
          >
            {currentIndex < totalCount - 1 ? '下一题' : '完成练习'}
          </button>
        </div>
      )}
    </div>
  );
}
