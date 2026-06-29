import { NavLink } from 'react-router-dom';
import {
  Home,
  BookOpen,
  GraduationCap,
  Trophy,
  Users,
} from 'lucide-react';

const MobileNav = () => {
  const navItems = [
    { path: '/', label: '首页', icon: Home },
    { path: '/courses', label: '课程', icon: BookOpen },
    { path: '/learn/vocabulary', label: '学习', icon: GraduationCap },
    { path: '/achievements', label: '成就', icon: Trophy },
    { path: '/community', label: '社区', icon: Users },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-space-900/95 backdrop-blur-xl border-t border-white/5">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'text-purple-400'
                    : 'text-white/50 hover:text-white/80'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={`p-1.5 rounded-xl transition-all duration-200 ${
                      isActive ? 'bg-purple-500/20' : ''
                    }`}
                  >
                    <Icon size={22} />
                  </div>
                  <span className="text-xs font-medium">{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNav;
