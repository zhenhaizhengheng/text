import StatsOverview from '@/components/progress/StatsOverview';
import WeeklyChart from '@/components/progress/WeeklyChart';
import CalendarHeatmap from '@/components/progress/CalendarHeatmap';
import RadarChart from '@/components/progress/RadarChart';
import { currentUser, learningProgress, dailyRecords } from '@/data/user';
import { Flame, TrendingUp, Sparkles } from 'lucide-react';
import { RingProgress } from '@/components/common/RingProgress';

export default function Progress() {
  const todayGoal = 60;
  const todayProgress = dailyRecords[dailyRecords.length - 1]?.minutes || 0;

  return (
    <div className="min-h-screen py-8 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold font-display text-white mb-2">
                学习进度
              </h1>
              <p className="text-white/60">
                查看你的学习数据，追踪进步轨迹
              </p>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 self-start md:self-auto">
              <Flame className="w-5 h-5 text-orange-400 animate-pulse" />
              <span className="text-white font-medium">
                连续学习 {learningProgress.streakDays} 天
              </span>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
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

              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2 justify-center md:justify-start">
                  <Sparkles className="w-6 h-6 text-yellow-400" />
                  今日学习目标
                </h2>
                <p className="text-white/60 mb-4">
                  {todayProgress >= todayGoal
                    ? '太棒了！你已完成今日目标，继续保持！'
                    : `还需 ${todayGoal - todayProgress} 分钟即可完成今日目标，加油！`}
                </p>
                <div className="flex flex-wrap items-center gap-6 justify-center md:justify-start">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-white/70 text-sm">
                      已完成 {Math.round((todayProgress / todayGoal) * 100)}%
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-cyan-400" />
                    <span className="text-cyan-400 text-sm font-medium">
                      比昨日多 15 分钟
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 w-full md:w-auto">
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text-blue mb-1">
                    {dailyRecords[dailyRecords.length - 1]?.words || 0}
                  </div>
                  <div className="text-sm text-white/50">今日单词</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text mb-1">
                    {dailyRecords[dailyRecords.length - 1]?.lessonsCompleted || 0}
                  </div>
                  <div className="text-sm text-white/50">完成课程</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text-gold mb-1">
                    {currentUser.experience}
                  </div>
                  <div className="text-sm text-white/50">总经验值</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8 animate-fade-in animate-delay-100">
          <h2 className="text-xl font-bold font-display text-white mb-4">数据概览</h2>
          <StatsOverview />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 animate-fade-in animate-delay-200">
            <WeeklyChart />
          </div>
          <div className="animate-fade-in animate-delay-300">
            <RadarChart />
          </div>
        </div>

        <div className="animate-fade-in animate-delay-400">
          <CalendarHeatmap />
        </div>

        <div className="mt-8 animate-fade-in animate-delay-500">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
              <h3 className="text-lg font-bold text-white mb-4">学习成就</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500/20 to-yellow-500/20 flex items-center justify-center text-xl">
                    🏆
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">连续学习</p>
                    <p className="text-xs text-white/50">坚持就是胜利</p>
                  </div>
                  <span className="text-amber-400 font-bold">{learningProgress.streakDays}天</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-xl">
                    📚
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">词汇达人</p>
                    <p className="text-xs text-white/50">继续加油</p>
                  </div>
                  <span className="text-purple-400 font-bold">{learningProgress.totalWords}词</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center text-xl">
                    🎯
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">课程完成</p>
                    <p className="text-xs text-white/50">稳步前进</p>
                  </div>
                  <span className="text-cyan-400 font-bold">{learningProgress.completedCourses}门</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
              <h3 className="text-lg font-bold text-white mb-4">学习建议</h3>
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                  <p className="text-sm text-purple-200 font-medium mb-1">💡 口语练习</p>
                  <p className="text-xs text-white/60">
                    你的口语能力相对较弱，建议每天增加10分钟口语练习
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                  <p className="text-sm text-cyan-200 font-medium mb-1">📖 阅读拓展</p>
                  <p className="text-xs text-white/60">
                    阅读能力表现优秀，可以尝试更高难度的文章
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <p className="text-sm text-emerald-200 font-medium mb-1">⏰ 学习时间</p>
                  <p className="text-xs text-white/60">
                    保持当前学习节奏，坚持就是最大的胜利
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
              <h3 className="text-lg font-bold text-white mb-4">本周目标</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/70">学习时长</span>
                    <span className="text-purple-400 font-medium">
                      {learningProgress.weeklyData.reduce((s, d) => s + d.minutes, 0)} / 420 分钟
                    </span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                      style={{
                        width: `${Math.min(
                          (learningProgress.weeklyData.reduce((s, d) => s + d.minutes, 0) / 420) * 100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/70">单词学习</span>
                    <span className="text-cyan-400 font-medium">
                      {learningProgress.weeklyData.reduce((s, d) => s + d.words, 0)} / 200 个
                    </span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                      style={{
                        width: `${Math.min(
                          (learningProgress.weeklyData.reduce((s, d) => s + d.words, 0) / 200) * 100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/70">课程完成</span>
                    <span className="text-emerald-400 font-medium">
                      {learningProgress.weeklyData.reduce((s, d) => s + d.lessonsCompleted, 0)} / 15 节
                    </span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-green-500"
                      style={{
                        width: `${Math.min(
                          (learningProgress.weeklyData.reduce((s, d) => s + d.lessonsCompleted, 0) / 15) * 100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
