import { Brain, Mic, Headphones, Users } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: '智能复习',
    description: '基于艾宾浩斯遗忘曲线的智能复习系统，科学安排学习时间，让记忆更加持久高效。',
    gradient: 'from-purple-500 to-pink-500',
    glow: 'shadow-purple-500/30',
  },
  {
    icon: Mic,
    title: '口语练习',
    description: 'AI 智能语音评测，实时纠正发音问题，让你说出地道流利的外语，告别哑巴英语。',
    gradient: 'from-cyan-500 to-blue-500',
    glow: 'shadow-cyan-500/30',
  },
  {
    icon: Headphones,
    title: '听力训练',
    description: '海量真实语境听力素材，从慢速到常速循序渐进，全面提升你的听力理解能力。',
    gradient: 'from-emerald-500 to-teal-500',
    glow: 'shadow-emerald-500/30',
  },
  {
    icon: Users,
    title: '社区互动',
    description: '与全球学习者一起学习交流，组队打卡、互相监督，在互动中共同进步成长。',
    gradient: 'from-amber-500 to-orange-500',
    glow: 'shadow-amber-500/30',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-space-950 to-space-900">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-500/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-4">
            为什么选择
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              语言宇宙
            </span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            四大核心功能，打造沉浸式语言学习体验
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  gradient: string;
  glow: string;
}

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

function FeatureCard({ feature, index }: FeatureCardProps) {
  const Icon = feature.icon;

  return (
    <div
      className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:-translate-y-2"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div
        className={`absolute -top-16 -right-16 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 bg-gradient-to-br ${feature.gradient}`}
      />

      <div className="relative z-10">
        <div
          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-lg ${feature.glow} transition-all duration-300`}
        >
          <Icon className="w-7 h-7 text-white" />
        </div>

        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:${feature.gradient} transition-all duration-300">
          {feature.title}
        </h3>

        <p className="text-white/60 leading-relaxed">
          {feature.description}
        </p>
      </div>
    </div>
  );
}

export default FeaturesSection;
