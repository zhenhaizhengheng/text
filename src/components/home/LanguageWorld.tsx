import { Users } from 'lucide-react';
import { languages } from '@/data/languages';
import type { Language } from '@/types';

export function LanguageWorld() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-space-950 to-space-900" />
      
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-4">
            选择你的
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              语言星球
            </span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            五大语言星球等你探索，每一颗都有独特的文化与魅力
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {languages.map((lang, index) => (
            <LanguageCard key={lang.id} language={lang} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface LanguageCardProps {
  language: Language;
  index: number;
}

function LanguageCard({ language, index }: LanguageCardProps) {
  return (
    <div
      className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 cursor-pointer transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:-translate-y-2 hover:shadow-2xl"
      style={{
        boxShadow: `0 0 0 0 ${language.color}00`,
        animationDelay: `${index * 0.1}s`,
      }}
    >
      <div
        className="absolute -top-12 -right-12 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"
        style={{ backgroundColor: language.color }}
      />

      <div className="relative z-10">
        <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
          {language.flag}
        </div>

        <h3 className="text-xl font-bold text-white mb-1">{language.name}</h3>
        <p className="text-sm text-white/50 mb-4 font-medium">{language.nameEn}</p>

        <p className="text-sm text-white/70 mb-4 line-clamp-2 leading-relaxed">
          {language.description}
        </p>

        <div className="flex items-center gap-2 text-white/60 text-sm">
          <Users className="w-4 h-4" />
          <span>{language.learnersCount.toLocaleString()} 学习者</span>
        </div>

        <div
          className="mt-4 h-1 rounded-full bg-white/10 overflow-hidden"
          style={{ backgroundColor: `${language.color}20` }}
        >
          <div
            className="h-full rounded-full transition-all duration-500 w-0 group-hover:w-full"
            style={{ backgroundColor: language.color }}
          />
        </div>
      </div>

      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow: `inset 0 0 30px ${language.color}20, 0 0 30px ${language.color}20`,
        }}
      />
    </div>
  );
}

export default LanguageWorld;
