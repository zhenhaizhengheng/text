import { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Star,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Lightbulb,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import VoiceRecorder from './VoiceRecorder';
import type { SpeakingLesson, ScoreFeedback } from '@/types';
import { generateScoreFeedback } from '@/data/speaking';

interface SpeakingPracticeProps {
  lesson: SpeakingLesson;
  onComplete?: (averageScore: number) => void;
  onBack?: () => void;
}

export default function SpeakingPractice({
  lesson,
  onBack,
}: SpeakingPracticeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlayingOriginal, setIsPlayingOriginal] = useState(false);
  const [feedback, setFeedback] = useState<ScoreFeedback | null>(null);
  const [completedSentences, setCompletedSentences] = useState<Map<string, number>>(new Map());
  const [showPhonetic, setShowPhonetic] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentSentence = lesson.sentences[currentIndex];

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    setFeedback(null);
  }, [currentIndex]);

  const playOriginal = () => {
    if (!currentSentence.audioUrl) return;

    if (!audioRef.current) {
      audioRef.current = new Audio(currentSentence.audioUrl);
      audioRef.current.onended = () => {
        setIsPlayingOriginal(false);
      };
    } else {
      audioRef.current.src = currentSentence.audioUrl;
    }

    if (isPlayingOriginal) {
      audioRef.current.pause();
      setIsPlayingOriginal(false);
    } else {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setIsPlayingOriginal(true);
    }
  };

  const handleRecordingComplete = (audioUrl: string, duration: number) => {
    void audioUrl;
    void duration;
    const newFeedback = generateScoreFeedback(currentSentence);
    setFeedback(newFeedback);

    const newCompleted = new Map(completedSentences);
    newCompleted.set(currentSentence.id, newFeedback.overall);
    setCompletedSentences(newCompleted);
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < lesson.sentences.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const renderStars = (score: number) => {
    const stars = Math.round(score / 20);
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={cn(
              'w-5 h-5',
              i <= stars
                ? 'text-amber-400 fill-amber-400'
                : 'text-white/20'
            )}
          />
        ))}
      </div>
    );
  };

  const progress = (completedSentences.size / lesson.sentences.length) * 100;
  const averageScore =
    completedSentences.size > 0
      ? Math.round(
          Array.from(completedSentences.values()).reduce((a, b) => a + b, 0) /
            completedSentences.size
        )
      : 0;

  const isLastSentence = currentIndex === lesson.sentences.length - 1;
  const allCompleted = completedSentences.size === lesson.sentences.length;

  return (
    <div className="space-y-6">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white font-display">
            {lesson.title}
          </h3>
          <div className="flex items-center gap-3">
            <span className="text-sm text-white/60">
              {currentIndex + 1} / {lesson.sentences.length}
            </span>
            {allCompleted && (
              <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm rounded-full">
                平均分: {averageScore}
              </span>
            )}
          </div>
        </div>

        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-6">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          {lesson.sentences.map((sentence, idx) => {
            const isCompleted = completedSentences.has(sentence.id);
            return (
              <button
                key={sentence.id}
                onClick={() => setCurrentIndex(idx)}
                className={cn(
                  'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all',
                  idx === currentIndex
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30'
                    : isCompleted
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-white/10 text-white/60 hover:bg-white/20'
                )}
              >
                {isCompleted ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  idx + 1
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <button
                onClick={playOriginal}
                className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white flex items-center justify-center shadow-lg shadow-cyan-500/30 hover:scale-105 active:scale-95 transition-transform flex-shrink-0"
                title="播放原音"
              >
                {isPlayingOriginal ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5 ml-0.5" />
                )}
              </button>
              <div>
                <span className="text-white/60 text-sm">原音播放</span>
                <p className="text-white/40 text-xs">点击播放标准发音</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowPhonetic(!showPhonetic)}
            className="px-3 py-1.5 text-sm text-white/60 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
          >
            {showPhonetic ? '隐藏音标' : '显示音标'}
          </button>
        </div>

        <div className="text-center py-6">
          <p className="text-2xl md:text-3xl font-bold text-white mb-4 font-display leading-relaxed">
            {currentSentence.sentence}
          </p>
          {showPhonetic && currentSentence.phonetic && (
            <p className="text-purple-300 text-lg mb-4 font-mono">
              {currentSentence.phonetic}
            </p>
          )}
          <p className="text-white/60 text-lg">{currentSentence.translation}</p>
        </div>

        <div className="flex items-center justify-center gap-2 mb-6">
          {Array.from({ length: currentSentence.difficulty }).map((_, i) => (
            <Star
              key={i}
              className="w-4 h-4 text-amber-400 fill-amber-400"
            />
          ))}
          {Array.from({ length: 5 - currentSentence.difficulty }).map(
            (_, i) => (
              <Star key={i} className="w-4 h-4 text-white/20" />
            )
          )}
          <span className="text-white/40 text-sm ml-2">难度</span>
        </div>
      </div>

      <VoiceRecorder
        onRecordingComplete={handleRecordingComplete}
        maxDuration={30}
      />

      {feedback && (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <span className="text-2xl font-bold text-white">
                {feedback.overall}
              </span>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white font-display">
                AI 评分
              </h4>
              {renderStars(feedback.overall)}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-white/5 rounded-xl">
              <p className="text-2xl font-bold text-cyan-400">
                {feedback.pronunciation}
              </p>
              <p className="text-white/60 text-sm mt-1">发音</p>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-xl">
              <p className="text-2xl font-bold text-purple-400">
                {feedback.fluency}
              </p>
              <p className="text-white/60 text-sm mt-1">流利度</p>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-xl">
              <p className="text-2xl font-bold text-pink-400">
                {feedback.completeness}
              </p>
              <p className="text-white/60 text-sm mt-1">完整度</p>
            </div>
          </div>

          <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-5 h-5 text-amber-400" />
              <span className="font-medium text-amber-300">改进建议</span>
            </div>
            <ul className="space-y-2">
              {feedback.tips.map((tip, idx) => (
                <li key={idx} className="text-white/70 text-sm flex gap-2">
                  <span className="text-amber-400">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="px-6 py-3 text-white/60 hover:text-white transition-colors"
        >
          返回列表
        </button>

        <div className="flex gap-3">
          <button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className="px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full hover:bg-white/20 transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2"
          >
            <ChevronLeft className="w-5 h-5" />
            上一句
          </button>

          <button
            onClick={goToNext}
            disabled={isLastSentence}
            className="px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:shadow-lg hover:shadow-purple-500/30 transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2"
          >
            下一句
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
