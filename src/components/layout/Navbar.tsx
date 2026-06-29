import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  Bell,
  Menu,
  Globe,
  ChevronDown,
  LogOut,
  User,
  Settings,
  BookOpen,
  Flame,
  Coins,
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { useUIStore } from '@/store/useUIStore';
import { Avatar } from '@/components/common/Avatar';
import { Button } from '@/components/common/Button';
import { currentUser } from '@/data/user';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuthStore();
  const { toggleMobileMenu } = useUIStore();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const displayUser = user || currentUser;
  const isLoggedIn = isAuthenticated || true;

  const navLinks = [
    { path: '/', label: '首页' },
    { path: '/courses', label: '课程' },
    { path: '/learn/vocabulary', label: '学习' },
    { path: '/progress', label: '进度' },
    { path: '/achievements', label: '成就' },
    { path: '/community', label: '社区' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-space-900/80 backdrop-blur-xl border-b border-white/5">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 text-white/70 hover:text-white transition-colors"
          >
            <Menu size={24} />
          </button>

          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <BookOpen size={20} className="text-white" />
            </div>
            <span className="font-display font-bold text-xl bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              LinguaVerse
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.path
                    ? 'text-white bg-white/10'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center relative"
          >
            <Search
              size={18}
              className="absolute left-3 text-white/40"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索课程、单词..."
              className="w-64 pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
            />
          </form>

          <div className="relative">
            <button
              onClick={() => {
                setShowLangMenu(!showLangMenu);
                setShowUserMenu(false);
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              <Globe size={18} className="text-white/70" />
              <span className="hidden sm:block text-sm text-white/70">中文</span>
              <ChevronDown size={14} className="text-white/50" />
            </button>

            {showLangMenu && (
              <div className="absolute right-0 top-full mt-2 w-40 glass-card py-2 animate-fade-in">
                {['中文', 'English', '日本語', '한국어'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setShowLangMenu(false)}
                    className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                      lang === '中文'
                        ? 'text-purple-400 bg-purple-500/10'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="relative p-2 rounded-lg hover:bg-white/5 transition-colors">
            <Bell size={20} className="text-white/70" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => {
                  setShowUserMenu(!showUserMenu);
                  setShowLangMenu(false);
                }}
                className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-full hover:bg-white/5 transition-colors"
              >
                <div className="hidden sm:block text-right">
                  <div className="text-sm font-medium text-white">
                    {displayUser.username}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-white/50">
                    <Flame size={12} className="text-orange-400" />
                    <span>{displayUser.streakDays}天</span>
                    <Coins size={12} className="text-yellow-400 ml-1" />
                    <span>{displayUser.coins}</span>
                  </div>
                </div>
                <Avatar
                  src={displayUser.avatarUrl}
                  alt={displayUser.username}
                  size="sm"
                  status="online"
                />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 top-full mt-2 w-64 glass-card py-2 animate-fade-in">
                  <Link
                    to="/profile"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors"
                  >
                    <Avatar
                      src={displayUser.avatarUrl}
                      alt={displayUser.username}
                      size="md"
                    />
                    <div>
                      <div className="font-medium text-white">
                        {displayUser.username}
                      </div>
                      <div className="text-sm text-white/50">
                        Lv.{Math.floor(displayUser.experience / 100) + 1}
                      </div>
                    </div>
                  </Link>

                  <div className="border-t border-white/5 my-2" />

                  <Link
                    to="/profile"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <User size={18} />
                    <span>个人中心</span>
                  </Link>
                  <Link
                    to="/progress"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <BookOpen size={18} />
                    <span>学习进度</span>
                  </Link>
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                    }}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <Settings size={18} />
                    <span>设置</span>
                  </button>

                  <div className="border-t border-white/5 my-2" />

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <LogOut size={18} />
                    <span>退出登录</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  登录
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="sm">
                  注册
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
