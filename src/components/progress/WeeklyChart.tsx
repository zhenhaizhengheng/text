import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/common/Card';
import { learningProgress } from '@/data/user';
import type { DailyRecord } from '@/types';
import { BarChart3, TrendingUp, Clock, BookOpen, GraduationCap } from 'lucide-react';

interface WeeklyChartProps {
  data?: DailyRecord[];
}

const weekDayNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

export default function WeeklyChart({ data = learningProgress.weeklyData }: WeeklyChartProps) {
  const [animated, setAnimated] = useState(false);
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 400);
    return () => clearTimeout(timer);
  }, []);

  const maxMinutes = Math.max(...data.map((d) => d.minutes), 1);
  const totalMinutes = data.reduce((sum, d) => sum + d.minutes, 0);
  const totalWords = data.reduce((sum, d) => sum + d.words, 0);
  const totalLessons = data.reduce((sum, d) => sum + d.lessonsCompleted, 0);
  const avgMinutes = Math.round(totalMinutes / data.length);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}月${date.getDate()}日`;
  };

  const getDayOfWeek = (dateStr: string) => {
    const date = new Date(dateStr);
    return weekDayNames[date.getDay()];
  };

  const today = new Date().toISOString().split('T')[0];
  const isToday = (dateStr: string) => dateStr === today;

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-400" />
              本周学习
            </CardTitle>
            <p className="text-sm text-white/60 mt-1">最近7天学习数据</p>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 text-sm font-medium">+12% 较上周</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
              <Clock className="w-5 h-5 text-purple-300" />
            </div>
            <div>
              <p className="text-xl font-bold text-white">{totalMinutes}</p>
              <p className="text-xs text-white/50">总分钟数</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-cyan-300" />
            </div>
            <div>
              <p className="text-xl font-bold text-white">{totalWords}</p>
              <p className="text-xs text-white/50">新增单词</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500/20 to-green-500/20 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <p className="text-xl font-bold text-white">{totalLessons}</p>
              <p className="text-xs text-white/50">完成课程</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative h-64">
          <div className="absolute inset-0 flex items-end justify-between gap-2 px-2">
            {data.map((day, index) => {
              const height = (day.minutes / maxMinutes) * 100;
              const isHovered = hoveredDay === index;
              const todayFlag = isToday(day.date);

              return (
                <div
                  key={index}
                  className="flex-1 flex flex-col items-center gap-2"
                  onMouseEnter={() => setHoveredDay(index)}
                  onMouseLeave={() => setHoveredDay(null)}
                >
                  <div className="relative w-full flex justify-center" style={{ height: '180px' }}>
                    {isHovered && (
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10 bg-space-900/95 backdrop-blur-xl border border-white/10 rounded-lg px-3 py-2 text-xs shadow-xl whitespace-nowrap">
                        <p className="text-white font-medium">{formatDate(day.date)}</p>
                        <div className="flex gap-2 mt-1">
                          <span className="text-purple-300">{day.minutes}分钟</span>
                          <span className="text-cyan-300">{day.words}词</span>
                          <span className="text-emerald-300">{day.lessonsCompleted}课</span>
                        </div>
                        <div className="w-2 h-2 bg-space-900/95 border-r border-b border-white/10 transform rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2" />
                      </div>
                    )}

                    <div
                      className="w-full max-w-12 rounded-t-lg relative overflow-hidden cursor-pointer transition-all duration-300"
                      style={{
                        height: animated ? `${height}%` : '0%',
                        marginTop: 'auto',
                        transitionDelay: `${index * 80}ms`,
                        transform: isHovered ? 'scaleX(1.1)' : 'scaleX(1)',
                      }}
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-t ${
                          todayFlag
                            ? 'from-amber-500 via-orange-400 to-yellow-300'
                            : 'from-purple-600 via-violet-500 to-cyan-400'
                        }`}
                      />
                      <div
                        className={`absolute inset-0 opacity-50 ${
                          todayFlag
                            ? 'bg-gradient-to-t from-transparent via-amber-300/30 to-white/40'
                            : 'bg-gradient-to-t from-transparent via-purple-300/30 to-white/40'
                        }`}
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 50%)',
                        }}
                      />

                      {isHovered && (
                        <div
                          className="absolute inset-0 animate-pulse"
                          style={{
                            boxShadow: `0 0 20px ${todayFlag ? '#f97316' : '#8b5cf6'}80`,
                          }}
                        />
                      )}
                    </div>
                  </div>

                  <div className="text-center">
                    <p className={`text-xs font-medium ${todayFlag ? 'text-amber-300' : isHovered ? 'text-white' : 'text-white/60'}`}>
                      {getDayOfWeek(day.date)}
                    </p>
                    <p className={`text-xs mt-0.5 ${todayFlag ? 'text-amber-400' : 'text-white/40'}`}>
                      {day.date.split('-')[2]}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="absolute left-0 top-0 bottom-12 w-px bg-white/5">
            {[0, 25, 50, 75, 100].map((percent, idx) => (
              <div
                key={idx}
                className="absolute w-2 h-px bg-white/10 -left-2"
                style={{ bottom: `${percent}%` }}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
          <div className="text-sm text-white/50">
            日均学习 <span className="text-white font-medium">{avgMinutes}</span> 分钟
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-gradient-to-t from-purple-600 to-cyan-400" />
              <span className="text-white/50">学习时长</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-gradient-to-t from-amber-500 to-yellow-300" />
              <span className="text-white/50">今天</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
