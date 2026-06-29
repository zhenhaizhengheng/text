import { useState, useMemo } from 'react'
import { BookX, RotateCcw, Filter, Trash2, CheckCircle, Target, TrendingUp, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/common/Button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/common/Tabs'
import type { QuizQuestion, GrammarPoint } from '@/types'

interface WrongBookProps {
  wrongQuestions: QuizQuestion[]
  grammarPoints: GrammarPoint[]
  onRemoveWrong: (questionId: string) => void
  onClearAll: () => void
  onStartPractice: (questions: QuizQuestion[]) => void
  className?: string
}

export default function WrongBook({
  wrongQuestions,
  grammarPoints,
  onRemoveWrong,
  onClearAll,
  onStartPractice,
  className,
}: WrongBookProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>('all')
  const [activeTab, setActiveTab] = useState<string>('list')

  const filteredQuestions = useMemo(() => {
    if (selectedFilter === 'all') return wrongQuestions
    return wrongQuestions.filter((q) => q.id.includes(selectedFilter))
  }, [wrongQuestions, selectedFilter])

  const stats = useMemo(() => {
    const total = wrongQuestions.length
    const byDifficulty = [0, 0, 0, 0, 0]
    wrongQuestions.forEach((q) => {
      if (q.difficulty >= 1 && q.difficulty <= 5) {
        byDifficulty[q.difficulty - 1]++
      }
    })
    return { total, byDifficulty }
  }, [wrongQuestions])

  const difficultyLabels = ['入门', '简单', '中等', '困难', '挑战']
  const difficultyColors = [
    'from-emerald-500 to-green-500',
    'from-green-500 to-teal-500',
    'from-yellow-500 to-amber-500',
    'from-orange-500 to-red-500',
    'from-red-500 to-rose-500',
  ]

  if (wrongQuestions.length === 0) {
    return (
      <div className={cn(
        'relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl',
        className
      )}>
        <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-3xl opacity-20 bg-gradient-to-br from-emerald-500 to-teal-500 pointer-events-none" />

        <div className="relative z-10 p-12 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-emerald-400" />
          </div>
          <h3 className="text-xl font-semibold text-white font-display mb-2">太棒了！</h3>
          <p className="text-white/60">错题本是空的，继续保持！</p>
        </div>
      </div>
    )
  }

  return (
    <div className={cn(
      'relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl',
      className
    )}>
      <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-3xl opacity-20 bg-gradient-to-br from-red-500 to-orange-500 pointer-events-none" />

      <div className="relative z-10 p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center">
              <BookX className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white font-display">错题本</h3>
              <p className="text-sm text-white/60">共 {stats.total} 道错题</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<RotateCcw className="w-4 h-4" />}
              onClick={() => onStartPractice(wrongQuestions)}
            >
              全部重练
            </Button>
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<Trash2 className="w-4 h-4" />}
              onClick={onClearAll}
            >
              清空
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="list" value={activeTab} onValueChange={setActiveTab}>
        <div className="px-6 pt-4">
          <TabsList>
            <TabsTrigger value="list">错题列表</TabsTrigger>
            <TabsTrigger value="stats">统计分析</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="list" className="p-6 pt-4">
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <Filter className="w-4 h-4 text-white/40" />
            <button
              onClick={() => setSelectedFilter('all')}
              className={cn(
                'px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200',
                selectedFilter === 'all'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
              )}
            >
              全部
            </button>
            {grammarPoints.slice(0, 6).map((point) => (
              <button
                key={point.id}
                onClick={() => setSelectedFilter(point.id.split('-')[1])}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200',
                  selectedFilter === point.id.split('-')[1]
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                )}
              >
                {point.title}
              </button>
            ))}
          </div>

          <div className="space-y-3 max-h-[400px] overflow-y-auto scrollbar-hide">
            {filteredQuestions.map((question, index) => (
              <div
                key={question.id}
                className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200 group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center text-xs font-medium text-white/60">
                        {index + 1}
                      </span>
                      <span className={cn(
                        'px-2 py-0.5 rounded-full text-xs font-medium',
                        question.type === 'choice'
                          ? 'text-blue-400 bg-blue-500/20'
                          : 'text-green-400 bg-green-500/20'
                      )}>
                        {question.type === 'choice' ? '选择' : '填空'}
                      </span>
                      <span className={cn(
                        'px-2 py-0.5 rounded-full text-xs font-medium',
                        question.difficulty <= 2 ? 'text-emerald-400 bg-emerald-500/20' :
                        question.difficulty <= 3 ? 'text-yellow-400 bg-yellow-500/20' :
                        'text-red-400 bg-red-500/20'
                      )}>
                        {difficultyLabels[question.difficulty - 1]}
                      </span>
                    </div>
                    <p className="text-white/80 text-sm line-clamp-2">{question.question}</p>
                    <p className="text-white/50 text-xs mt-2">
                      正确答案：<span className="text-emerald-400 font-medium">{question.correctAnswer}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onStartPractice([question])}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all"
                      title="重新练习"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onRemoveWrong(question.id)}
                      className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-white/60 hover:text-red-400 transition-all"
                      title="移除"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredQuestions.length === 0 && (
            <div className="py-12 text-center">
              <Target className="w-12 h-12 text-white/20 mx-auto mb-3" />
              <p className="text-white/50">该分类下没有错题</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="stats" className="p-6 pt-4">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                  <BookX className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white font-display">{stats.total}</p>
                  <p className="text-xs text-white/60">总错题数</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white font-display">{grammarPoints.length}</p>
                  <p className="text-xs text-white/60">涉及知识点</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white/5 rounded-xl border border-white/10">
            <h4 className="text-sm font-medium text-white/80 mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              按难度分布
            </h4>
            <div className="space-y-3">
              {stats.byDifficulty.map((count, index) => {
                const percentage = stats.total > 0 ? (count / stats.total) * 100 : 0
                return (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-white/70">{difficultyLabels[index]}</span>
                      <span className="text-sm text-white/50">{count} 题</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={cn(
                          'h-full rounded-full bg-gradient-to-r transition-all duration-500',
                          difficultyColors[index]
                        )}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
