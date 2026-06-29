import { Rocket, Sparkles, Globe2 } from 'lucide-react';
import { Button } from '@/components/common/Button';

export function HeroSection() {
  const stars = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 3,
    duration: Math.random() * 2 + 2,
  }));

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cosmic-gradient">
      <div className="absolute inset-0 overflow-hidden">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-pink-500/20 rounded-full blur-3xl animate-float-fast" />

      <div className="absolute top-1/4 left-[10%] animate-float">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg shadow-blue-500/50 flex items-center justify-center">
          <Globe2 className="w-8 h-8 text-white/80" />
        </div>
      </div>

      <div className="absolute top-1/3 right-[15%] animate-float-slow">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-orange-500/50">
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-amber-300 to-orange-400 opacity-50" />
        </div>
      </div>

      <div className="absolute bottom-1/4 left-[20%] animate-float-fast">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg shadow-emerald-500/50" />
      </div>

      <div className="absolute top-1/2 left-[8%] animate-float-slow">
        <span className="text-4xl opacity-80">あ</span>
      </div>
      <div className="absolute bottom-1/3 right-[25%] animate-float">
        <span className="text-3xl opacity-80">가</span>
      </div>
      <div className="absolute top-[40%] left-[15%] animate-float-fast">
        <span className="text-3xl opacity-80">A</span>
      </div>
      <div className="absolute bottom-[30%] right-[10%] animate-float">
        <span className="text-3xl opacity-80">É</span>
      </div>

      <div className="absolute top-[20%] right-[30%] animate-float-slow">
        <Sparkles className="w-6 h-6 text-yellow-300 opacity-70" />
      </div>
      <div className="absolute bottom-[25%] left-[30%] animate-float-fast">
        <Sparkles className="w-5 h-5 text-purple-300 opacity-70" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-8">
          <Sparkles className="w-4 h-4 text-yellow-400" />
          <span className="text-sm text-white/80">全新宇宙探索式学习体验</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold font-display mb-6 leading-tight">
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
            探索语言的无限宇宙
          </span>
        </h1>

        <p className="text-xl text-white/70 max-w-2xl mx-auto mb-12 leading-relaxed">
          穿越星际，在浩瀚的语言宇宙中开启你的学习之旅。
          <br className="hidden md:block" />
          掌握英语、日语、韩语、法语、西班牙语，让世界触手可及。
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" rightIcon={<Rocket className="w-5 h-5" />}>
            开始学习
          </Button>
          <Button variant="secondary" size="lg" rightIcon={<Sparkles className="w-5 h-5" />}>
            了解更多
          </Button>
        </div>

        <div className="mt-16 flex items-center justify-center gap-8 text-white/50 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>50,000+ 活跃学习者</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <span>200+ 精品课程</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>5 种语言</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-slow">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
          <div className="w-1.5 h-3 rounded-full bg-white/50 animate-pulse" />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
