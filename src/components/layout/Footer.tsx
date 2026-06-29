import { Link } from 'react-router-dom';
import {
  BookOpen,
  Github,
  Twitter,
  MessageCircle,
  Mail,
} from 'lucide-react';

const Footer = () => {
  const footerLinks = [
    {
      title: '学习',
      links: [
        { label: '所有课程', href: '/courses' },
        { label: '单词记忆', href: '/learn/vocabulary' },
        { label: '语法练习', href: '/learn/grammar' },
        { label: '听力训练', href: '/learn/listening' },
        { label: '口语跟读', href: '/learn/speaking' },
      ],
    },
    {
      title: '社区',
      links: [
        { label: '学习动态', href: '/community' },
        { label: '话题广场', href: '/community' },
        { label: '排行榜', href: '/achievements' },
        { label: '学习小组', href: '/community' },
      ],
    },
    {
      title: '关于',
      links: [
        { label: '关于我们', href: '#' },
        { label: '帮助中心', href: '#' },
        { label: '隐私政策', href: '#' },
        { label: '服务条款', href: '#' },
        { label: '联系我们', href: '#' },
      ],
    },
  ];

  return (
    <footer className="bg-space-950 border-t border-white/5 mt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                <BookOpen size={20} className="text-white" />
              </div>
              <span className="font-display font-bold text-xl bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                LinguaVerse
              </span>
            </Link>
            <p className="text-white/60 text-sm mb-6 max-w-xs">
              沉浸式多语种在线学习平台，让语言学习变得有趣、高效、个性化。
              探索不同的语言世界，开启你的学习之旅。
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all"
              >
                <Github size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all"
              >
                <MessageCircle size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="font-semibold text-white mb-4">{group.title}</h3>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-white/60 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © 2025 LinguaVerse. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/40 hover:text-white/60 text-sm transition-colors">
              隐私政策
            </a>
            <a href="#" className="text-white/40 hover:text-white/60 text-sm transition-colors">
              服务条款
            </a>
            <a href="#" className="text-white/40 hover:text-white/60 text-sm transition-colors">
              Cookie 设置
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
