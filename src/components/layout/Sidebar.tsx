import { NavLink, useLocation } from 'react-router-dom';
import {
  BookOpen,
  SpellCheck,
  Headphones,
  Mic,
  FileText,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useUIStore } from '@/store/useUIStore';

const Sidebar = () => {
  const location = useLocation();
  const { sidebarOpen, toggleSidebar } = useUIStore();

  const menuItems = [
    {
      group: '互动学习',
      items: [
        { path: '/learn/vocabulary', label: '单词记忆', icon: SpellCheck },
        { path: '/learn/grammar', label: '语法练习', icon: FileText },
        { path: '/learn/listening', label: '听力训练', icon: Headphones },
        { path: '/learn/speaking', label: '口语跟读', icon: Mic },
      ],
    },
  ];

  const isLearnPage = location.pathname.startsWith('/learn');

  if (!isLearnPage) return null;

  return (
    <aside
      className={`fixed left-0 top-16 bottom-0 z-40 bg-space-900/50 backdrop-blur-xl border-r border-white/5 transition-all duration-300 ${
        sidebarOpen ? 'w-64' : 'w-20'
      }`}
    >
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-6 w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-lg hover:bg-purple-500 transition-colors z-10"
      >
        {sidebarOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
      </button>

      <div className="p-4 pt-6">
        {menuItems.map((group) => (
          <div key={group.group} className="mb-6">
            {sidebarOpen && (
              <h3 className="text-xs font-medium text-white/40 uppercase tracking-wider mb-3 px-3">
                {group.group}
              </h3>
            )}
            <nav className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                        isActive
                          ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-purple-400 border border-purple-500/30'
                          : 'text-white/60 hover:text-white hover:bg-white/5'
                      }`
                    }
                  >
                    <Icon size={20} className="flex-shrink-0" />
                    {sidebarOpen && (
                      <span className="font-medium text-sm">{item.label}</span>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>
        ))}

        {sidebarOpen && (
          <div className="mt-8 p-4 rounded-2xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/20">
            <div className="text-sm font-medium text-white mb-2">
              每日学习目标
            </div>
            <div className="text-xs text-white/60 mb-3">
              完成今日目标，保持连续学习！
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                style={{ width: '65%' }}
              />
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-white/60">13/20 单词</span>
              <span className="text-purple-400 font-medium">65%</span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
