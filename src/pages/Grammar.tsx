import { useState, useMemo, useCallback } from 'react'
import { BookOpen, Target, TrendingUp, Award, Sparkles, Filter } from 'lucide-react'
import GrammarPoint from '@/components/learn/GrammarPoint'
import GrammarQuiz from '@/components/learn/GrammarQuiz'
import WrongBook from '@/components/learn/WrongBook'
import { StatCard } from '@/components/common/StatCard'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/common/Tabs'
import { grammarPoints, quizQuestions } from '@/data/grammar'
import type { QuizQuestion } from '@/types'

export default function Grammar() {
  const [activeTab, setActiveTab] = useState('learn')
  const [wrongQuestions, setWrongQuestions] = useState<QuizQuestion[]>([])
  const [selectedLanguage, setSelectedLanguage] = useState('all')
  const [practiceQuestions, setPracticeQuestions] = useState<QuizQuestion[]>([])
  const [isPracticing, setIsPracticing] = useState(false)

  const filteredGrammarPoints = useMemo(() => {
    if (selectedLanguage === 'all') return grammarPoints
    return grammarPoints.filter((p) => p.id.includes(selectedLanguage))
  }, [selectedLanguage])

  const filteredQuizQuestions = useMemo(() => {
    if (selectedLanguage === 'all') return quizQuestions
    const langMap: Record<string, string[]> = {
      'en': ['quiz-1', 'quiz-2', 'quiz-3', 'quiz-4', 'quiz-9', 'quiz-12', 'quiz-13', 'quiz-16', 'quiz-18', 'quiz-21'],
      'ja': ['quiz-5', 'quiz-6', 'quiz-10', 'quiz-14', 'quiz-17', 'quiz-19'],
      'ko': ['quiz-7', 'quiz-8', 'quiz-11', 'quiz-15', 'quiz-20', 'quiz-22'],
    }
    const ids = langMap[selectedLanguage] || []
    return quizQuestions.filter((q) => ids.includes(q.id))
  }, [selectedLanguage])

  const stats = useMemo(() => {
    const totalPoints = grammarPoints.length
    const totalQuestions = quizQuestions.length
    const wrongCount = wrongQuestions.length
    const accuracy = totalQuestions > 0 && (totalQuestions - wrongCount) > 0
      ? Math.round(((totalQuestions - wrongCount) / totalQuestions) * 100)
      : 85
    return { totalPoints, totalQuestions, wrongCount, accuracy }
  }, [wrongQuestions.length])

  const handleAddWrongAnswer = useCallback((question: QuizQuestion) => {
    setWrongQuestions((prev) => {
      if (prev.find((q) => q.id === question.id)) return prev
      return [...prev, question]
    })
  }, [])

  const handleRemoveWrong = useCallback((questionId: string) => {
    setWrongQuestions((prev) => prev.filter((q) => q.id !== questionId))
  }, [])

  const handleClearAllWrong = useCallback(() => {
    setWrongQuestions([])
  }, [])

  const handleStartPractice = useCallback((questions: QuizQuestion[]) => {
    setPracticeQuestions(questions)
    setIsPracticing(true)
    setActiveTab('practice')
  }, [])

  const handleStartAllPractice = useCallback(() => {
    setPracticeQuestions(filteredQuizQuestions)
    setIsPracticing(true)
  }, [filteredQuizQuestions])

  const languages = [
    { value: 'all', label: '全部' },
    { value: 'en', label: '英语' },
    { value: 'ja', label: '日语' },
    { value: 'ko', label: '韩语' },
  ]

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 starfield opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-white/70">宇宙探索之旅</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4 font-display">
            语法练习
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            掌握语法规则，打好语言基础。通过知识点学习和针对性练习，稳步提升语法能力。
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={<BookOpen className="w-6 h-6" />}
            value={stats.totalPoints}
            label="语法知识点"
            variant="purple"
            iconPosition="left"
          />
          <StatCard
            icon={<Target className="w-6 h-6" />}
            value={stats.totalQuestions}
            label="练习题数"
            variant="blue"
            iconPosition="left"
          />
          <StatCard
            icon={<TrendingUp className="w-6 h-6" />}
            value={`${stats.accuracy}%`}
            label="正确率"
            variant="green"
            iconPosition="left"
          />
          <StatCard
            icon={<Award className="w-6 h-6" />}
            value={stats.wrongCount}
            label="错题数"
            variant="gold"
            iconPosition="left"
          />
        </div>

        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-white/40" />
            <span className="text-sm text-white/60">语言筛选：</span>
            <div className="flex items-center gap-1">
              {languages.map((lang) => (
                <button
                  key={lang.value}
                  onClick={() => setSelectedLanguage(lang.value)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedLanguage === lang.value
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/20'
                      : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <Tabs defaultValue="learn" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full justify-center">
            <TabsTrigger value="learn">知识点学习</TabsTrigger>
            <TabsTrigger value="practice">语法练习</TabsTrigger>
            <TabsTrigger value="wrongbook">错题本</TabsTrigger>
          </TabsList>

          <TabsContent value="learn">
            <div className="grid md:grid-cols-2 gap-4">
              {filteredGrammarPoints.map((point, index) => (
                <div
                  key={point.id}
                  style={{ animationDelay: `${index * 100}ms` }}
                  className="animate-fade-in"
                >
                  <GrammarPoint point={point} />
                </div>
              ))}
            </div>
            {filteredGrammarPoints.length === 0 && (
              <div className="py-16 text-center">
                <BookOpen className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <p className="text-white/50 text-lg">该语言暂无语法知识点</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="practice">
            {!isPracticing ? (
              <div className="relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center">
                <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-3xl opacity-20 bg-gradient-to-br from-purple-500 to-pink-500 pointer-events-none" />

                <div className="relative z-10">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                    <Target className="w-10 h-10 text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white font-display mb-2">开始语法练习</h3>
                  <p className="text-white/60 mb-2">
                    共 <span className="text-white font-medium">{filteredQuizQuestions.length}</span> 道题目
                  </p>
                  <p className="text-white/50 text-sm mb-8">
                    包含选择题和填空题，检验你的语法掌握程度
                  </p>
                  <button
                    onClick={handleStartAllPractice}
                    className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 hover:scale-105 active:scale-95"
                  >
                    开始练习
                  </button>
                </div>
              </div>
            ) : (
              <GrammarQuiz
                questions={practiceQuestions}
                onAddWrongAnswer={handleAddWrongAnswer}
              />
            )}
          </TabsContent>

          <TabsContent value="wrongbook">
            <WrongBook
              wrongQuestions={wrongQuestions}
              grammarPoints={filteredGrammarPoints}
              onRemoveWrong={handleRemoveWrong}
              onClearAll={handleClearAllWrong}
              onStartPractice={handleStartPractice}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
