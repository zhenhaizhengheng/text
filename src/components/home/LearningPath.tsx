import { Star, Lock, CheckCircle2, ChevronRight, Rocket } from 'lucide-react';
import { currentUser } from '@/data/user';

const levels = [
  {
    id: 1,
    name: '入门',
    nameEn: 'Beginner',
    description: '掌握基础发音和常用词汇',
    words: 500,
    status: 'completed',
    color: 'emerald',
  },
  {
    id: 2,
    name: '初级',
    nameEn: 'Elementary',
    description: '能进行简单日常对话',
    words: 1000,
    status: 'completed',
    color: 'cyan',
  },
  {
    id: 3,
    name: '中级',
    nameEn: 'Intermediate',
    description: '流利交流，阅读文章',
    words: 2000,
    status: 'current',
    color: 'purple',
  },
  {
    id: 4,
    name: '高级',
    nameEn: 'Advanced',
    description: '专业话题，学术写作',
    words: 4000,
    status: 'locked',
    color: 'blue',
  },
  {
    id: 5,
    name: '精通',
    nameEn: 'Master',
    description: '母语水平，深度表达',
    words: 8000,
    status: 'locked',
    color: 'gold',
  },
];

const colorClasses: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  emerald: {
    bg: 'from-emerald-500 to-teal-500',
    border: 'border-emerald-400/50',
    text: 'text-emerald-400',
    glow: 'shadow-emerald-500/50',
  },
  cyan: {
    bg: 'from-cyan-500 to-blue-500',
    border: 'border-cyan-400/50',
    text: 'text-cyan-400',
    glow: 'shadow-cyan-500/50',
  },
  purple: {
    bg: 'from-purple-500 to-pink-500',
    border: 'border-purple-400/50',
    text: 'text-purple-400',
    glow: 'shadow-purple-500/50',
  },
  blue: {
    bg: 'from-blue-500 to-indigo-500',
    border: 'border-blue-400/50',
    text: 'text-blue-400',
    glow: 'shadow-blue-500/50',
  },
  gold: {
    bg: 'from-amber-500 to-yellow-500',
    border: 'border-amber-400/50',
    text: 'text-amber-400',
    glow: 'shadow-amber-500/50',
  },
};

export function LearningPath() {
  const currentLevelIndex = levels.findIndex((l) => l.status === 'current');
  const currentLevel = levels[currentLevelIndex];
  const nextLevel = levels[currentLevelIndex + 1];

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-space-900 to-space-950">
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-4">
            你的
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              学习路径
            </span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            从入门到精通，一步步攀登语言的高峰
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm font-medium">
                    当前级别
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">
                  {currentLevel.name}
                  <span className="text-lg text-white/50 ml-2">{currentLevel.nameEn}</span>
                </h3>
                <p className="text-white/60 mb-4">{currentLevel.description}</p>
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-white/70">词汇量: {currentLevel.words}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Rocket className="w-4 h-4 text-purple-400" />
                    <span className="text-white/70">经验: {currentUser.experience} XP</span>
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                    <div className="w-28 h-28 rounded-full bg-space-900 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold text-white">35%</span>
                      <span className="text-sm text-white/60">完成度</span>
                    </div>
                  </div>
                </div>
              </div>

              {nextLevel && (
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center gap-2 mb-2 md:justify-start justify-center">
                    <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-sm font-medium">
                      下一目标
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {nextLevel.name}
                    <span className="text-base text-white/50 ml-2">{nextLevel.nameEn}</span>
                  </h3>
                  <p className="text-white/60 mb-4">{nextLevel.description}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <ChevronRight className="w-4 h-4 text-cyan-400" />
                    <span className="text-white/70">还需掌握 {nextLevel.words - currentLevel.words} 个单词</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-500 via-purple-500 to-white/10 -translate-x-1/2 hidden md:block" />

          <div className="space-y-8 md:space-y-0">
            {levels.map((level, index) => (
              <LevelStep key={level.id} level={level} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface LevelStepProps {
  level: typeof levels[0];
  index: number;
}

function LevelStep({ level, index }: LevelStepProps) {
  const colors = colorClasses[level.color];
  const isEven = index % 2 === 0;

  return (
    <div className={`relative md:flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
      <div className={`hidden md:block flex-1 ${isEven ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
        <div
          className={`inline-block bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:bg-white/10 ${
            level.status === 'current' ? `border-${level.color}-400/30` : ''
          }`}
        >
          <h4 className={`text-xl font-bold mb-1 ${level.status === 'locked' ? 'text-white/40' : 'text-white'}`}>
            {level.name}
            <span className="text-sm text-white/50 ml-2">{level.nameEn}</span>
          </h4>
          <p className={`text-sm ${level.status === 'locked' ? 'text-white/30' : 'text-white/60'}`}>
            {level.description}
          </p>
          <p className={`text-sm mt-2 ${level.status === 'locked' ? 'text-white/30' : colors.text}`}>
            {level.words} 词汇
          </p>
        </div>
      </div>

      <div className="flex justify-center my-4 md:my-0">
        <div
          className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
            level.status === 'completed'
              ? `bg-gradient-to-br ${colors.bg} shadow-lg ${colors.glow}`
              : level.status === 'current'
              ? `bg-gradient-to-br ${colors.bg} shadow-lg ${colors.glow} animate-pulse-glow`
              : 'bg-white/10 border-2 border-white/20'
          }`}
        >
          {level.status === 'completed' && (
            <CheckCircle2 className="w-8 h-8 text-white" />
          )}
          {level.status === 'current' && (
            <span className="text-2xl font-bold text-white">{index + 1}</span>
          )}
          {level.status === 'locked' && (
            <Lock className="w-6 h-6 text-white/30" />
          )}

          {level.status === 'current' && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center">
              <Star className="w-4 h-4 text-yellow-800 fill-yellow-800" />
            </div>
          )}
        </div>
      </div>

      <div className="md:hidden text-center mb-4">
        <h4 className={`text-lg font-bold ${level.status === 'locked' ? 'text-white/40' : 'text-white'}`}>
          {level.name}
          <span className="text-sm text-white/50 ml-2">{level.nameEn}</span>
        </h4>
        <p className={`text-sm ${level.status === 'locked' ? 'text-white/30' : 'text-white/60'}`}>
          {level.description}
        </p>
      </div>

      <div className="hidden md:block flex-1" />
    </div>
  );
}

export default LearningPath;
