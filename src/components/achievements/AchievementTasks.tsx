import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/common/Card';
import { ProgressBar } from '@/components/common/ProgressBar';
import { Button } from '@/components/common/Button';
import { cn } from '@/lib/utils';
import { Calendar, Clock, Target, Star, Coins, CheckCircle, ChevronRight, Flame, BookOpen, Trophy, Users, Zap } from 'lucide-react';

type TaskType = 'daily' | 'weekly' | 'growth';

interface Task {
  id: string;
  title: string;
  description: string;
  type: TaskType;
  currentValue: number;
  targetValue: number;
  rewardExp: number;
  rewardCoins: number;
  completed: boolean;
  claimed: boolean;
  icon: string;
}

const dailyTasks: Task[] = [
  {
    id: 'daily-1',
    title: '每日签到',
    description: '完成每日签到领取奖励',
    type: 'daily',
    currentValue: 1,
    targetValue: 1,
    rewardExp: 10,
    rewardCoins: 5,
    completed: true,
    claimed: true,
    icon: '📅',
  },
  {
    id: 'daily-2',
    title: '学习30分钟',
    description: '今日累计学习达到30分钟',
    type: 'daily',
    currentValue: 25,
    targetValue: 30,
    rewardExp: 30,
    rewardCoins: 15,
    completed: false,
    claimed: false,
    icon: '⏱️',
  },
  {
    id: 'daily-3',
    title: '学习新单词',
    description: '今日学习10个新单词',
    type: 'daily',
    currentValue: 7,
    targetValue: 10,
    rewardExp: 20,
    rewardCoins: 10,
    completed: false,
    claimed: false,
    icon: '📚',
  },
  {
    id: 'daily-4',
    title: '完成一课',
    description: '完成任意课程的一节课',
    type: 'daily',
    currentValue: 1,
    targetValue: 1,
    rewardExp: 25,
    rewardCoins: 12,
    completed: true,
    claimed: false,
    icon: '✅',
  },
];

const weeklyTasks: Task[] = [
  {
    id: 'weekly-1',
    title: '周签到达人',
    description: '本周连续签到7天',
    type: 'weekly',
    currentValue: 5,
    targetValue: 7,
    rewardExp: 100,
    rewardCoins: 50,
    completed: false,
    claimed: false,
    icon: '🔥',
  },
  {
    id: 'weekly-2',
    title: '学习时长',
    description: '本周累计学习达到5小时',
    type: 'weekly',
    currentValue: 3.5,
    targetValue: 5,
    rewardExp: 150,
    rewardCoins: 80,
    completed: false,
    claimed: false,
    icon: '⏰',
  },
  {
    id: 'weekly-3',
    title: '单词大作战',
    description: '本周学习100个新单词',
    type: 'weekly',
    currentValue: 68,
    targetValue: 100,
    rewardExp: 120,
    rewardCoins: 60,
    completed: false,
    claimed: false,
    icon: '📖',
  },
  {
    id: 'weekly-4',
    title: '课程完成',
    description: '本周完成5节课',
    type: 'weekly',
    currentValue: 3,
    targetValue: 5,
    rewardExp: 100,
    rewardCoins: 50,
    completed: false,
    claimed: false,
    icon: '🎯',
  },
];

const growthTasks: Task[] = [
  {
    id: 'growth-1',
    title: '词汇大师',
    description: '累计掌握1000个单词',
    type: 'growth',
    currentValue: 856,
    targetValue: 1000,
    rewardExp: 500,
    rewardCoins: 200,
    completed: false,
    claimed: false,
    icon: '🎓',
  },
  {
    id: 'growth-2',
    title: '课程达人',
    description: '累计完成100节课',
    type: 'growth',
    currentValue: 38,
    targetValue: 100,
    rewardExp: 800,
    rewardCoins: 400,
    completed: false,
    claimed: false,
    icon: '🏆',
  },
  {
    id: 'growth-3',
    title: '坚持就是胜利',
    description: '连续学习30天',
    type: 'growth',
    currentValue: 18,
    targetValue: 30,
    rewardExp: 600,
    rewardCoins: 300,
    completed: false,
    claimed: false,
    icon: '💪',
  },
  {
    id: 'growth-4',
    title: '社区活跃者',
    description: '发布10条学习动态',
    type: 'growth',
    currentValue: 4,
    targetValue: 10,
    rewardExp: 200,
    rewardCoins: 100,
    completed: false,
    claimed: false,
    icon: '💬',
  },
];

const taskTabs = [
  { id: 'daily', label: '每日任务', icon: Calendar, color: 'from-blue-500 to-cyan-500' },
  { id: 'weekly', label: '每周任务', icon: Clock, color: 'from-purple-500 to-pink-500' },
  { id: 'growth', label: '成长任务', icon: Target, color: 'from-amber-500 to-orange-500' },
];

export function AchievementTasks() {
  const [activeTab, setActiveTab] = useState<TaskType>('daily');

  const getTasks = () => {
    switch (activeTab) {
      case 'daily':
        return dailyTasks;
      case 'weekly':
        return weeklyTasks;
      case 'growth':
        return growthTasks;
      default:
        return dailyTasks;
    }
  };

  const tasks = getTasks();
  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;

  const handleClaim = (taskId: string) => {
    console.log('Claim reward for task:', taskId);
  };

  return (
    <Card glow>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl gradient-text-gold">成就任务</CardTitle>
            <p className="text-white/60 mt-1">完成任务获取丰厚奖励</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <span className="text-white font-medium">
              {completedCount}/{totalCount}
            </span>
          </div>
        </div>

        <div className="flex gap-2 mt-6">
          {taskTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TaskType)}
                className={cn(
                  'flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300',
                  isActive
                    ? `bg-gradient-to-r ${tab.color} text-white shadow-lg`
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                )}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {tasks.map((task, index) => {
            const progress = (task.currentValue / task.targetValue) * 100;
            return (
              <div
                key={task.id}
                className={cn(
                  'p-4 rounded-xl border transition-all duration-300 animate-fade-in-up',
                  task.completed
                    ? 'bg-gradient-to-r from-emerald-500/10 to-transparent border-emerald-500/20'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      'w-14 h-14 rounded-xl flex items-center justify-center text-2xl',
                      task.completed
                        ? 'bg-gradient-to-br from-emerald-500/30 to-green-500/30'
                        : 'bg-white/10'
                    )}
                  >
                    {task.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-white truncate">{task.title}</h4>
                      {task.completed && !task.claimed && (
                        <span className="flex-shrink-0 text-xs px-2 py-0.5 bg-amber-500/20 text-amber-400 rounded-full animate-pulse">
                          可领取
                        </span>
                      )}
                      {task.claimed && (
                        <span className="flex-shrink-0 text-xs px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-full">
                          已领取
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-white/60 mb-2">{task.description}</p>

                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <ProgressBar
                          value={progress}
                          variant={task.completed ? 'green' : 'purple'}
                          size="sm"
                        />
                      </div>
                      <span className="text-sm text-white/50 whitespace-nowrap">
                        {task.currentValue}/{task.targetValue}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-amber-400">
                        <Star className="w-4 h-4 fill-amber-400" />
                        <span className="text-sm font-medium">+{task.rewardExp}</span>
                      </div>
                      <div className="flex items-center gap-1 text-yellow-400">
                        <Coins className="w-4 h-4 fill-yellow-400" />
                        <span className="text-sm font-medium">+{task.rewardCoins}</span>
                      </div>
                    </div>

                    {task.completed && !task.claimed && (
                      <Button
                        size="sm"
                        onClick={() => handleClaim(task.id)}
                        rightIcon={<ChevronRight className="w-4 h-4" />}
                      >
                        领取
                      </Button>
                    )}

                    {task.claimed && (
                      <div className="flex items-center gap-1 text-emerald-400 text-sm">
                        <CheckCircle className="w-4 h-4" />
                        <span>已领取</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export default AchievementTasks;
