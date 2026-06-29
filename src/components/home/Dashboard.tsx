import { useEffect, useState } from 'react';
import { Calendar, BookOpen, GraduationCap, Target, Flame } from 'lucide-react';
import { StatCard } from '@/components/common/StatCard';
import { RingProgress } from '@/components/common/RingProgress';
import { currentUser, learningProgress } from '@/data/user';

export function Dashboard() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const animateNumber = (target: number, duration: number = 1500) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
      if (!animate) return;
      let startTime: number;
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(Math.floor(progress * target));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, [animate, target, duration]);
    return count;
  };

  const streakDays = animateNumber(learningProgress.streakDays);
  const totalWords = animateNumber(learningProgress.totalWords);
  const completedCourses = animateNumber(learningProgress.completedCourses);
  const accuracy = animateNumber(learningProgress.accuracy);

  const todayGoal = 60;
  const todayProgress = 40;

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-space-900 to-space-950">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold font-display text-white mb-2">
              你的
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                学习旅程
              </span>
            </h2>
            <p className="text-white/60">
              欢迎回来，{currentUser.username}！今天也要继续加油哦 ✨
            </p>
          </div>
          <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
            <Flame className="w-5 h-5 text-orange-400" />
            <span className="text-white font-medium">连续学习 {learningProgress.streakDays} 天</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<Calendar className="w-6 h-6" />}
            value={`${streakDays}天`}
            label="学习天数"
            trend="up"
            trendValue="+3"
            variant="purple"
            iconPosition="left"
          />
          <StatCard
            icon={<BookOpen className="w-6 h-6" />}
            value={totalWords.toLocaleString()}
            label="已学单词"
            trend="up"
            trendValue="+22"
            variant="blue"
            iconPosition="left"
          />
          <StatCard
            icon={<GraduationCap className="w-6 h-6" />}
            value={completedCourses}
            label="完成课程"
            trend="up"
            trendValue="+1"
            variant="green"
            iconPosition="left"
          />
          <StatCard
            icon={<Target className="w-6 h-6" />}
            value={`${accuracy}%`}
            label="正确率"
            trend="up"
            trendValue="+5%"
            variant="gold"
            iconPosition="left"
          />
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="relative">
                <RingProgress
                  value={todayProgress}
                  max={todayGoal}
                  size="xl"
                  variant="purple"
                  label=""
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-white">{todayProgress}</span>
                  <span className="text-sm text-white/60">/ {todayGoal} 分钟</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">今日目标</h3>
                <p className="text-white/60 mb-3">
                  还需 {todayGoal - todayProgress} 分钟即可完成今日目标
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-white/70">已完成 {Math.round((todayProgress / todayGoal) * 100)}%</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 w-full md:w-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400 mb-1">
                  {learningProgress.weeklyData[6]?.words || 0}
                </div>
                <div className="text-sm text-white/60">今日单词</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400 mb-1">
                  {learningProgress.weeklyData[6]?.lessonsCompleted || 0}
                </div>
                <div className="text-sm text-white/60">完成课程</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-400 mb-1">
                  {learningProgress.weeklyData[6]?.minutes || 0}
                </div>
                <div className="text-sm text-white/60">学习时长</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
