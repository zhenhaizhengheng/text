import { StatCard } from '@/components/common/StatCard';
import { learningProgress, currentUser } from '@/data/user';
import { Clock, BookOpen, GraduationCap, Target, Flame, Trophy } from 'lucide-react';

export default function StatsOverview() {
  const totalHours = Math.floor(learningProgress.totalMinutes / 60);
  const totalMinutesRemainder = learningProgress.totalMinutes % 60;

  const stats = [
    {
      icon: <Clock className="w-6 h-6" />,
      value: `${totalHours}h ${totalMinutesRemainder}m`,
      label: '总学习时长',
      trend: 'up' as const,
      trendValue: '+15%',
      variant: 'purple' as const,
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      value: learningProgress.totalWords,
      label: '已学单词',
      trend: 'up' as const,
      trendValue: '+28',
      variant: 'blue' as const,
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      value: learningProgress.completedCourses,
      label: '完成课程',
      trend: 'up' as const,
      trendValue: '+1',
      variant: 'green' as const,
    },
    {
      icon: <Target className="w-6 h-6" />,
      value: `${learningProgress.accuracy}%`,
      label: '正确率',
      trend: 'up' as const,
      trendValue: '+3%',
      variant: 'gold' as const,
    },
    {
      icon: <Flame className="w-6 h-6" />,
      value: `${learningProgress.streakDays}天`,
      label: '连续学习',
      trend: 'up' as const,
      trendValue: '+1',
      variant: 'purple' as const,
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      value: currentUser.experience,
      label: '经验值',
      trend: 'up' as const,
      trendValue: '+120',
      variant: 'gold' as const,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          icon={stat.icon}
          value={stat.value}
          label={stat.label}
          trend={stat.trend}
          trendValue={stat.trendValue}
          variant={stat.variant}
        />
      ))}
    </div>
  );
}
