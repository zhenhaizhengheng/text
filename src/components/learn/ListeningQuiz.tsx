import { useState } from 'react';
import { Eye, EyeOff, CheckCircle, XCircle, ChevronRight, RotateCcw, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import AudioPlayer from './AudioPlayer';
import type { ListeningItem } from '@/types';

interface ListeningQuizProps {
  item: ListeningItem;
  onComplete?: (score: number) => void;
  onBack?: () => void;
}

export default function ListeningQuiz({ item, onComplete, onBack }: ListeningQuizProps) {
  const [showTranscript, setShowTranscript] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(
    Array(item.questions.length).fill(false)
  );
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQuestion = item.questions[currentQuestionIndex];

  const handleSelectAnswer = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    setIsAnswered(true);
    setShowExplanation(true);

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    const newAnswered = [...answeredQuestions];
    newAnswered[currentQuestionIndex] = true;
    setAnsweredQuestions(newAnswered);
  };

  const handleNext = () => {
    if (currentQuestionIndex < item.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setShowExplanation(false);
    } else {
      setIsCompleted(true);
      const finalScore =
        currentQuestionIndex < item.questions.length - 1
          ? score
          : score + (selectedAnswer === currentQuestion.correctAnswer ? 0 : 0);
      onComplete?.(finalScore);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setShowExplanation(false);
    setScore(0);
    setAnsweredQuestions(Array(item.questions.length).fill(false));
    setIsCompleted(false);
  };

  const isCorrect = selectedAnswer === currentQuestion?.correctAnswer;

  if (isCompleted) {
    const percent = Math.round((score / item.questions.length) * 100);
    return (
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
          <span className="text-3xl font-bold text-white">{percent}%</span>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2 font-display">
          练习完成！
        </h3>
        <p className="text-white/60 mb-6">
          你答对了 {score} / {item.questions.length} 道题
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={handleRestart}
            className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full hover:bg-white/20 transition-all flex items-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            重新练习
          </button>
          {onBack && (
            <button
              onClick={onBack}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:shadow-lg hover:shadow-purple-500/30 transition-all"
            >
              返回列表
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AudioPlayer audioUrl={item.audioUrl} title={item.title} />

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
        <button
          onClick={() => setShowTranscript(!showTranscript)}
          className="w-full px-6 py-4 flex items-center justify-between text-white hover:bg-white/5 transition-colors border-b border-white/5"
        >
          <span className="font-medium flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-400" />
            原文对照
          </span>
          <span className="text-white/60 flex items-center gap-2">
            {showTranscript ? '隐藏' : '显示'}
            {showTranscript ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </span>
        </button>

        {showTranscript && (
          <div className="p-6 space-y-4">
            <div>
              <h4 className="text-sm font-medium text-purple-400 mb-2">英文原文</h4>
              <p className="text-white/80 whitespace-pre-line leading-relaxed">
                {item.transcript}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-cyan-400 mb-2">中文翻译</h4>
              <p className="text-white/70 whitespace-pre-line leading-relaxed">
                {item.translation}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white font-display">
            听力理解
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-white/60">
              {currentQuestionIndex + 1} / {item.questions.length}
            </span>
            <div className="flex gap-1">
              {item.questions.map((_, idx) => (
                <div
                  key={idx}
                  className={cn(
                    'w-2 h-2 rounded-full transition-colors',
                    idx === currentQuestionIndex
                      ? 'bg-purple-500'
                      : answeredQuestions[idx]
                      ? 'bg-green-500'
                      : 'bg-white/20'
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-white text-lg mb-4">
            {currentQuestion.question}
          </p>
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              let optionClass = 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20';
              if (isAnswered) {
                if (index === currentQuestion.correctAnswer) {
                  optionClass = 'bg-green-500/20 border-green-500/50 text-green-300';
                } else if (index === selectedAnswer && !isCorrect) {
                  optionClass = 'bg-red-500/20 border-red-500/50 text-red-300';
                } else {
                  optionClass = 'bg-white/5 border-white/10 opacity-50';
                }
              } else if (selectedAnswer === index) {
                optionClass = 'bg-purple-500/20 border-purple-500/50';
              }

              return (
                <button
                  key={index}
                  onClick={() => handleSelectAnswer(index)}
                  disabled={isAnswered}
                  className={cn(
                    'w-full p-4 rounded-xl border text-left transition-all flex items-center gap-3',
                    optionClass
                  )}
                >
                  <span
                    className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
                      selectedAnswer === index && !isAnswered
                        ? 'bg-purple-500 text-white'
                        : isAnswered && index === currentQuestion.correctAnswer
                        ? 'bg-green-500 text-white'
                        : isAnswered && index === selectedAnswer && !isCorrect
                        ? 'bg-red-500 text-white'
                        : 'bg-white/10 text-white/60'
                    )}
                  >
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1 text-white">{option}</span>
                  {isAnswered && index === currentQuestion.correctAnswer && (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  )}
                  {isAnswered &&
                    index === selectedAnswer &&
                    !isCorrect && (
                      <XCircle className="w-5 h-5 text-red-400" />
                    )}
                </button>
              );
            })}
          </div>
        </div>

        {showExplanation && (
          <div
            className={cn(
              'p-4 rounded-xl mb-6',
              isCorrect
                ? 'bg-green-500/10 border border-green-500/30'
                : 'bg-red-500/10 border border-red-500/30'
            )}
          >
            <p
              className={cn(
                'font-medium mb-2',
                isCorrect ? 'text-green-400' : 'text-red-400'
              )}
            >
              {isCorrect ? '✓ 回答正确！' : '✗ 回答错误'}
            </p>
            <p className="text-white/70 text-sm">{currentQuestion.explanation}</p>
          </div>
        )}

        <div className="flex justify-end gap-3">
          {!isAnswered ? (
            <button
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:shadow-lg hover:shadow-purple-500/30 transition-all disabled:opacity-50 disabled:pointer-events-none"
            >
              提交答案
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:shadow-lg hover:shadow-purple-500/30 transition-all flex items-center gap-2"
            >
              {currentQuestionIndex < item.questions.length - 1
                ? '下一题'
                : '查看结果'}
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
