import { useState, useCallback } from 'react'
import { CheckCircle, XCircle, Lightbulb, RotateCcw, ChevronRight, Target, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/common/Button'
import { Input } from '@/components/common/Input'
import type { QuizQuestion } from '@/types'

interface GrammarQuizProps {
  questions: QuizQuestion[]
  onAddWrongAnswer?: (question: QuizQuestion) => void
  className?: string
}

export default function GrammarQuiz({ questions, onAddWrongAnswer, className }: GrammarQuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string>('')
  const [fillAnswer, setFillAnswer] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState(0)
  const [answeredCount, setAnsweredCount] = useState(0)
  const [quizFinished, setQuizFinished] = useState(false)

  const currentQuestion = questions[currentIndex]

  const handleSubmit = useCallback(() => {
    const answer = currentQuestion.type === 'choice' ? selectedAnswer : fillAnswer.trim()
    if (!answer) return

    const correct = answer.toLowerCase() === currentQuestion.correctAnswer.toLowerCase()
    setIsCorrect(correct)
    setIsSubmitted(true)
    setAnsweredCount(prev => prev + 1)

    if (correct) {
      setScore(prev => prev + 1)
    } else {
      onAddWrongAnswer?.(currentQuestion)
    }
  }, [currentQuestion, selectedAnswer, fillAnswer, onAddWrongAnswer])

  const handleNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1)
      setSelectedAnswer('')
      setFillAnswer('')
      setIsSubmitted(false)
      setIsCorrect(false)
    } else {
      setQuizFinished(true)
    }
  }, [currentIndex, questions.length])

  const handleRestart = useCallback(() => {
    setCurrentIndex(0)
    setSelectedAnswer('')
    setFillAnswer('')
    setIsSubmitted(false)
    setIsCorrect(false)
    setScore(0)
    setAnsweredCount(0)
    setQuizFinished(false)
  }, [])

  const getDifficultyLabel = (difficulty: number) => {
    const labels = ['入门', '简单', '中等', '困难', '挑战']
    return labels[difficulty - 1] || '未知'
  }

  const getDifficultyColor = (difficulty: number) => {
    const colors = [
      'text-emerald-400 bg-emerald-500/20',
      'text-green-400 bg-green-500/20',
      'text-yellow-400 bg-yellow-500/20',
      'text-orange-400 bg-orange-500/20',
      'text-red-400 bg-red-500/20',
    ]
    return colors[difficulty - 1] || 'text-white/60 bg-white/10'
  }

  if (questions.length === 0) {
    return (
      <div className={cn(
        'bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-12 text-center',
        className
      )}>
        <Target className="w-16 h-16 text-white/30 mx-auto mb-4" />
        <p className="text-white/60 text-lg">暂无练习题</p>
      </div>
    )
  }

  if (quizFinished) {
    const accuracy = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0

    return (
      <div className={cn(
        'relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl',
        className
      )}>
        <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-3xl opacity-20 bg-gradient-to-br from-purple-500 to-pink-500 pointer-events-none" />

        <div className="relative z-10 p-8 text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
            <Target className="w-12 h-12 text-purple-300" />
          </div>

          <h3 className="text-2xl font-bold text-white font-display mb-2">练习完成！</h3>
          <p className="text-white/60 mb-8">继续加油，每天进步一点点</p>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <p className="text-3xl font-bold text-white font-display">{score}</p>
              <p className="text-sm text-white/60 mt-1">正确题数</p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <p className="text-3xl font-bold text-white font-display">{questions.length}</p>
              <p className="text-sm text-white/60 mt-1">总题数</p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <p className="text-3xl font-bold gradient-text font-display">{accuracy}%</p>
              <p className="text-sm text-white/60 mt-1">正确率</p>
            </div>
          </div>

          <Button
            size="lg"
            leftIcon={<RotateCcw className="w-5 h-5" />}
            onClick={handleRestart}
          >
            重新练习
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className={cn(
      'relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl',
      className
    )}>
      <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-3xl opacity-20 bg-gradient-to-br from-purple-500 to-pink-500 pointer-events-none" />

      <div className="relative z-10 p-6 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className={cn(
              'px-3 py-1 rounded-full text-xs font-medium',
              getDifficultyColor(currentQuestion.difficulty)
            )}>
              {getDifficultyLabel(currentQuestion.difficulty)}
            </span>
            <span className={cn(
              'px-3 py-1 rounded-full text-xs font-medium',
              currentQuestion.type === 'choice'
                ? 'text-blue-400 bg-blue-500/20'
                : 'text-green-400 bg-green-500/20'
            )}>
              {currentQuestion.type === 'choice' ? '选择题' : '填空题'}
            </span>
          </div>
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <Clock className="w-4 h-4" />
            <span>{currentIndex + 1} / {questions.length}</span>
          </div>
        </div>

        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="relative z-10 p-6">
        <h3 className="text-xl font-semibold text-white mb-6 font-display">
          {currentQuestion.question}
        </h3>

        {currentQuestion.type === 'choice' && currentQuestion.options ? (
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === option
              const showCorrect = isSubmitted && option === currentQuestion.correctAnswer
              const showWrong = isSubmitted && isSelected && option !== currentQuestion.correctAnswer

              return (
                <button
                  key={index}
                  onClick={() => !isSubmitted && setSelectedAnswer(option)}
                  disabled={isSubmitted}
                  className={cn(
                    'w-full p-4 rounded-xl border text-left transition-all duration-200 flex items-center gap-3',
                    !isSubmitted && 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 cursor-pointer',
                    isSubmitted && 'cursor-default',
                    showCorrect && 'bg-emerald-500/10 border-emerald-500/50',
                    showWrong && 'bg-red-500/10 border-red-500/50',
                    isSelected && !isSubmitted && 'bg-purple-500/10 border-purple-500/50'
                  )}
                >
                  <span className={cn(
                    'w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium shrink-0',
                    showCorrect && 'bg-emerald-500/30 text-emerald-300',
                    showWrong && 'bg-red-500/30 text-red-300',
                    !showCorrect && !showWrong && isSelected && !isSubmitted && 'bg-purple-500/30 text-purple-300',
                    !showCorrect && !showWrong && !isSelected && 'bg-white/10 text-white/60'
                  )}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className={cn(
                    'flex-1',
                    showCorrect && 'text-emerald-300 font-medium',
                    showWrong && 'text-red-300',
                    !showCorrect && !showWrong && 'text-white/80'
                  )}>
                    {option}
                  </span>
                  {showCorrect && <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />}
                  {showWrong && <XCircle className="w-5 h-5 text-red-400 shrink-0" />}
                </button>
              )
            })}
          </div>
        ) : (
          <div className="space-y-4">
            <Input
              value={fillAnswer}
              onChange={(e) => setFillAnswer(e.target.value)}
              placeholder="请输入答案..."
              disabled={isSubmitted}
              className={cn(
                isSubmitted && isCorrect && 'border-emerald-500/50 focus:border-emerald-500/50 focus:ring-emerald-500/20',
                isSubmitted && !isCorrect && 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20'
              )}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !isSubmitted && fillAnswer.trim()) {
                  handleSubmit()
                }
              }}
            />
            {isSubmitted && !isCorrect && (
              <p className="text-sm text-white/60">
                正确答案：<span className="text-emerald-400 font-medium">{currentQuestion.correctAnswer}</span>
              </p>
            )}
          </div>
        )}

        {isSubmitted && currentQuestion.explanation && (
          <div className="mt-6 p-4 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 rounded-xl border border-amber-500/20">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-amber-300 mb-1">答案解析</h4>
                <p className="text-sm text-white/80">{currentQuestion.explanation}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="relative z-10 p-6 border-t border-white/10 flex items-center justify-between">
        <div className="text-sm text-white/60">
          已答 <span className="text-white font-medium">{answeredCount}</span> 题，正确 <span className="text-emerald-400 font-medium">{score}</span> 题
        </div>
        {!isSubmitted ? (
          <Button
            onClick={handleSubmit}
            disabled={currentQuestion.type === 'choice' ? !selectedAnswer : !fillAnswer.trim()}
          >
            提交答案
          </Button>
        ) : (
          <Button
            rightIcon={<ChevronRight className="w-5 h-5" />}
            onClick={handleNext}
          >
            {currentIndex < questions.length - 1 ? '下一题' : '查看结果'}
          </Button>
        )}
      </div>
    </div>
  )
}
