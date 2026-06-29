import { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/common/Card';
import { dailyRecords } from '@/data/user';
import type { DailyRecord } from '@/types';
import { Flame } from 'lucide-react';

interface CalendarHeatmapProps {
  data?: DailyRecord[];
}

export default function CalendarHeatmap({ data = dailyRecords }: CalendarHeatmapProps) {
  const [hoveredDay, setHoveredDay] = useState<DailyRecord | null>(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

  const { weeks, monthLabels, weekDayLabels } = useMemo(() => {
    const today = new Date();
    const days: { date: Date; record?: DailyRecord }[] = [];

    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const record = data.find((d) => d.date === dateStr);
      days.push({ date, record });
    }

    const firstDay = days[0].date;
    const firstDayOfWeek = firstDay.getDay();
    const paddingDays = firstDayOfWeek;

    const allDays = [...Array(paddingDays).fill(null), ...days];

    const weeks: { date: Date; record?: DailyRecord }[][] = [];
    for (let i = 0; i < allDays.length; i += 7) {
      weeks.push(allDays.slice(i, i + 7) as { date: Date; record?: DailyRecord }[]);
    }

    const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
    const monthLabels: { label: string; weekIndex: number }[] = [];
    let lastMonth = -1;

    weeks.forEach((week, weekIndex) => {
      const firstValidDay = week.find((d) => d !== null);
      if (firstValidDay) {
        const month = firstValidDay.date.getMonth();
        if (month !== lastMonth) {
          monthLabels.push({ label: monthNames[month], weekIndex });
          lastMonth = month;
        }
      }
    });

    const weekDayLabels = ['日', '一', '二', '三', '四', '五', '六'];

    return { weeks, monthLabels, weekDayLabels };
  }, [data]);

  const getIntensityColor = (minutes: number) => {
    if (minutes === 0) return 'bg-white/5';
    if (minutes < 20) return 'bg-purple-900/40';
    if (minutes < 40) return 'bg-purple-700/60';
    if (minutes < 60) return 'bg-purple-500/70';
    return 'bg-purple-400/90';
  };

  const handleMouseEnter = (record: DailyRecord | undefined, e: React.MouseEvent) => {
    if (record) {
      setHoveredDay(record);
      const rect = e.currentTarget.getBoundingClientRect();
      const parentRect = e.currentTarget.closest('.heatmap-container')?.getBoundingClientRect();
      if (parentRect) {
        setHoverPosition({
          x: rect.left - parentRect.left + rect.width / 2,
          y: rect.top - parentRect.top - 10,
        });
      }
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  };

  const totalMinutes = data.reduce((sum, d) => sum + d.minutes, 0);
  const studyDays = data.filter((d) => d.minutes > 0).length;
  const maxStreak = useMemo(() => {
    let max = 0;
    let current = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].minutes > 0) {
        current++;
        max = Math.max(max, current);
      } else {
        current = 0;
      }
    }
    return max;
  }, [data]);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-400" />
              学习日历
            </CardTitle>
            <p className="text-sm text-white/60 mt-1">过去一年的学习记录</p>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <div className="text-center">
              <p className="text-2xl font-bold gradient-text">{studyDays}</p>
              <p className="text-white/50 text-xs">学习天数</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold gradient-text-blue">{Math.floor(totalMinutes / 60)}h</p>
              <p className="text-white/50 text-xs">总时长</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold gradient-text-gold">{maxStreak}</p>
              <p className="text-white/50 text-xs">最长连续</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="heatmap-container relative">
          <div className="flex gap-1 mb-2 ml-8">
            {monthLabels.map(({ label, weekIndex }, idx) => (
              <div
                key={idx}
                className="text-xs text-white/50"
                style={{
                  marginLeft: idx === 0 ? `${weekIndex * 14}px` : `${(weekIndex - (monthLabels[idx - 1]?.weekIndex || 0) - 1) * 14 + 4}px`,
                }}
              >
                {label}
              </div>
            ))}
          </div>

          <div className="flex gap-1">
            <div className="flex flex-col gap-1 mr-2">
              {weekDayLabels.map((day, idx) => (
                <div key={idx} className="h-3 w-6 text-xs text-white/50 flex items-center justify-end pr-1">
                  {idx % 2 === 1 ? day : ''}
                </div>
              ))}
            </div>

            <div className="flex gap-1">
              {weeks.map((week, weekIdx) => (
                <div key={weekIdx} className="flex flex-col gap-1">
                  {week.map((day, dayIdx) => {
                    if (!day) {
                      return <div key={dayIdx} className="w-3 h-3 rounded-sm bg-transparent" />;
                    }
                    const minutes = day.record?.minutes || 0;
                    return (
                      <div
                        key={dayIdx}
                        className={`w-3 h-3 rounded-sm cursor-pointer transition-all duration-200 hover:scale-125 hover:ring-2 hover:ring-purple-400/50 ${getIntensityColor(minutes)}`}
                        onMouseEnter={(e) => handleMouseEnter(day.record, e)}
                        onMouseLeave={() => setHoveredDay(null)}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {hoveredDay && (
            <div
              className="absolute z-20 pointer-events-none transform -translate-x-1/2 -translate-y-full"
              style={{ left: hoverPosition.x, top: hoverPosition.y }}
            >
              <div className="bg-space-900/95 backdrop-blur-xl border border-white/10 rounded-lg px-3 py-2 text-sm shadow-xl">
                <p className="text-white font-medium">{formatDate(hoveredDay.date)}</p>
                <div className="flex gap-3 mt-1 text-xs">
                  <span className="text-purple-300">{hoveredDay.minutes} 分钟</span>
                  <span className="text-cyan-300">{hoveredDay.words} 单词</span>
                  <span className="text-emerald-300">{hoveredDay.lessonsCompleted} 课程</span>
                </div>
              </div>
              <div className="w-2 h-2 bg-space-900/95 border-r border-b border-white/10 transform rotate-45 mx-auto -mt-1" />
            </div>
          )}

          <div className="flex items-center justify-end gap-2 mt-4 text-xs text-white/50">
            <span>少</span>
            <div className="w-3 h-3 rounded-sm bg-white/5" />
            <div className="w-3 h-3 rounded-sm bg-purple-900/40" />
            <div className="w-3 h-3 rounded-sm bg-purple-700/60" />
            <div className="w-3 h-3 rounded-sm bg-purple-500/70" />
            <div className="w-3 h-3 rounded-sm bg-purple-400/90" />
            <span>多</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
