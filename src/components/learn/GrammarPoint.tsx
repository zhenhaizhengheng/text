import { useState } from 'react'
import { ChevronDown, ChevronUp, BookOpen, Lightbulb, Quote, ListChecks } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { GrammarPoint as GrammarPointType } from '@/types'

interface GrammarPointProps {
  point: GrammarPointType
  className?: string
}

export default function GrammarPoint({ point, className }: GrammarPointProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-purple-500/10',
        className
      )}
    >
      <div
        className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl opacity-20 bg-gradient-to-br from-purple-500 to-pink-500 pointer-events-none"
      />

      <div className="relative z-10 p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-purple-300 shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white font-display">
                {point.title}
              </h3>
              <p className="text-sm text-white/60 mt-1 line-clamp-2">
                {point.explanation}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all duration-200 shrink-0"
          >
            {isExpanded ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
        </div>

        {isExpanded && (
          <div className="mt-6 space-y-5 animate-fade-in">
            <div className="flex gap-3">
              <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 text-cyan-300 shrink-0">
                <Lightbulb className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-white/80 mb-1">详细讲解</h4>
                <p className="text-sm text-white/70 leading-relaxed">
                  {point.explanation}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500/20 to-green-500/20 text-emerald-300 shrink-0">
                <Quote className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-white/80 mb-1">例句</h4>
                <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                  <p className="text-sm text-white/90 font-medium italic">
                    "{point.exampleSentence}"
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500/20 to-yellow-500/20 text-amber-300 shrink-0">
                <ListChecks className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-white/80 mb-1">规则总结</h4>
                <div className="p-3 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 rounded-xl border border-amber-500/20">
                  <p className="text-sm text-amber-200 font-medium">
                    {point.ruleSummary}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
