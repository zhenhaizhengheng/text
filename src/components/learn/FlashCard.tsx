import { useState } from 'react';
import { Volume2, RotateCcw, X, HelpCircle, Check } from 'lucide-react';
import type { VocabularyItem } from '@/types';
import { cn } from '@/lib/utils';

interface FlashCardProps {
  word: VocabularyItem;
  currentIndex: number;
  totalCount: number;
  onForget: () => void;
  onHard: () => void;
  onRemember: () => void;
}

export default function FlashCard({
  word,
  currentIndex,
  totalCount,
  onForget,
  onHard,
  onRemember,
}: FlashCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word.word);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleForget = () => {
    setIsFlipped(false);
    onForget();
  };

  const handleHard = () => {
    setIsFlipped(false);
    onHard();
  };

  const handleRemember = () => {
    setIsFlipped(false);
    onRemember();
  };

  const progress = ((currentIndex + 1) / totalCount) * 100;

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="mb-6">
        <div className="flex justify-between text-sm text-white/60 mb-2">
          <span>进度</span>
          <span>{currentIndex + 1} / {totalCount}</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div
        className="perspective-1000 cursor-pointer select-none"
        onClick={handleFlip}
      >
        <div
          className={cn(
            'relative w-full h-80 transition-transform duration-700 preserve-3d',
            isFlipped && 'rotate-y-180'
          )}
        >
          <div className="absolute inset-0 backface-hidden">
            <div className="w-full h-full glass-card card-glow p-8 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500" />
              
              <div className="absolute top-4 right-4">
                <span className="text-xs text-white/40">
                  难度 {word.difficulty}
                </span>
              </div>

              <button
                onClick={handleSpeak}
                className="mb-6 p-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300 group"
              >
                <Volume2 className="w-8 h-8 text-purple-400 group-hover:text-purple-300 transition-colors" />
              </button>

              <h2 className="text-5xl font-bold text-white mb-3 font-display">
                {word.word}
              </h2>

              <p className="text-lg text-purple-300 mb-4">
                {word.phonetic}
              </p>

              <span className="px-3 py-1 text-xs rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                {word.partOfSpeech}
              </span>

              <p className="absolute bottom-6 text-sm text-white/40 flex items-center gap-2">
                <RotateCcw className="w-4 h-4" />
                点击卡片查看释义
              </p>
            </div>
          </div>

          <div className="absolute inset-0 backface-hidden rotate-y-180">
            <div className="w-full h-full glass-card card-glow p-8 flex flex-col relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" />
              
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white font-display">
                  {word.word}
                </h3>
                <span className="px-3 py-1 text-xs rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {word.partOfSpeech}
                </span>
              </div>

              <div className="mb-6">
                <p className="text-sm text-white/50 mb-2">释义</p>
                <p className="text-2xl text-white font-medium">
                  {word.meaning}
                </p>
              </div>

              <div className="flex-1">
                <p className="text-sm text-white/50 mb-2">例句</p>
                <p className="text-white/80 mb-2 italic">
                  "{word.exampleEn}"
                </p>
                <p className="text-white/50 text-sm">
                  {word.exampleCn}
                </p>
              </div>

              <p className="text-sm text-white/40 flex items-center gap-2 justify-center">
                <RotateCcw className="w-4 h-4" />
                点击卡片返回
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-4">
        <button
          onClick={handleForget}
          className="flex flex-col items-center gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 hover:border-red-500/40 transition-all duration-300 group"
        >
          <div className="p-3 rounded-full bg-red-500/20 group-hover:bg-red-500/30 transition-colors">
            <X className="w-6 h-6 text-red-400" />
          </div>
          <span className="text-sm font-medium text-red-300">忘记</span>
        </button>

        <button
          onClick={handleHard}
          className="flex flex-col items-center gap-2 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 hover:bg-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300 group"
        >
          <div className="p-3 rounded-full bg-yellow-500/20 group-hover:bg-yellow-500/30 transition-colors">
            <HelpCircle className="w-6 h-6 text-yellow-400" />
          </div>
          <span className="text-sm font-medium text-yellow-300">模糊</span>
        </button>

        <button
          onClick={handleRemember}
          className="flex flex-col items-center gap-2 p-4 rounded-xl bg-green-500/10 border border-green-500/20 hover:bg-green-500/20 hover:border-green-500/40 transition-all duration-300 group"
        >
          <div className="p-3 rounded-full bg-green-500/20 group-hover:bg-green-500/30 transition-colors">
            <Check className="w-6 h-6 text-green-400" />
          </div>
          <span className="text-sm font-medium text-green-300">记住</span>
        </button>
      </div>
    </div>
  );
}
