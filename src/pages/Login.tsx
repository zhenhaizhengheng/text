import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Rocket, Sparkles, Globe } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { useAuthStore } from '@/store/useAuthStore';

interface FormErrors {
  email?: string;
  password?: string;
}

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const { login, isLoading, error, clearError, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: Location })?.from?.pathname || '/';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  useEffect(() => {
    clearError();
  }, [clearError]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!email) {
      newErrors.email = '请输入邮箱地址';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = '请输入有效的邮箱地址';
    }

    if (!password) {
      newErrors.password = '请输入密码';
    } else if (password.length < 6) {
      newErrors.password = '密码长度至少为6位';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch {
      // 错误已在 store 中处理
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Social login with ${provider}`);
  };

  return (
    <div className="min-h-screen flex bg-space-900 overflow-hidden">
      <div className="fixed inset-0 starfield opacity-50 pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-space-900 to-blue-900/20 pointer-events-none" />

      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-center items-center p-12 z-10">
        <div className="relative w-full max-w-md">
          <div className="absolute -top-20 -left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute -bottom-20 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl animate-pulse-glow animate-delay-500" />

          <div className="relative glass-card p-10 card-glow">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center animate-float">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold gradient-text font-display">LinguaCosmos</h1>
                <p className="text-white/60 text-sm">探索语言的无限宇宙</p>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-white">开启你的语言之旅</h2>
              <p className="text-white/70 leading-relaxed">
                加入全球百万学习者，在沉浸式的宇宙探索体验中掌握新语言。每一次学习都是一次星际冒险。
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="glass-card p-4 text-center">
                  <div className="text-3xl font-bold gradient-text mb-1">50+</div>
                  <div className="text-xs text-white/60">语言课程</div>
                </div>
                <div className="glass-card p-4 text-center">
                  <div className="text-3xl font-bold gradient-text-gold mb-1">1M+</div>
                  <div className="text-xs text-white/60">活跃用户</div>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-space-900 bg-gradient-to-br"
                      style={{
                        backgroundImage: `linear-gradient(135deg, hsl(${i * 80}, 70%, 60%), hsl(${i * 80 + 40}, 70%, 50%))`,
                      }}
                    />
                  ))}
                </div>
                <div className="text-sm">
                  <div className="text-white/80">用户好评如潮</div>
                  <div className="text-yellow-400 flex items-center gap-1">
                    <span>★★★★★</span>
                    <span className="text-white/60 text-xs">4.9/5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute top-1/4 -right-8 text-6xl animate-float-slow">🌌</div>
          <div className="absolute bottom-1/4 -left-6 text-4xl animate-float-fast">✨</div>
          <div className="absolute top-1/2 right-0 text-3xl animate-float animate-delay-300">🛸</div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 z-10">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold gradient-text font-display">LinguaCosmos</h1>
          </div>

          <div className="glass-card p-8 sm:p-10 card-glow animate-fade-in-up">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">欢迎回来</h2>
              <p className="text-white/60">登录你的账户，继续探索</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm animate-fade-in">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="邮箱地址"
                type="email"
                placeholder="请输入你的邮箱"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail className="w-5 h-5" />}
                error={errors.email}
              />

              <Input
                label="密码"
                type={showPassword ? 'text' : 'password'}
                placeholder="请输入你的密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock className="w-5 h-5" />}
                iconPosition="left"
                rightIcon={showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                onRightIconClick={() => setShowPassword(!showPassword)}
                error={errors.password}
              />

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-white/20 bg-white/5 text-purple-500 focus:ring-purple-500/50 focus:ring-offset-0"
                  />
                  <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors">
                    记住我
                  </span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                >
                  忘记密码？
                </Link>
              </div>

              <Button type="submit" className="w-full" size="lg" loading={isLoading}>
                登录
              </Button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-transparent text-white/50">或使用以下方式登录</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => handleSocialLogin('google')}
                className="flex items-center justify-center py-3 px-4 glass-card hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    className="text-white"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    className="text-white"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    className="text-white"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    className="text-white"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin('github')}
                className="flex items-center justify-center py-3 px-4 glass-card hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin('wechat')}
                className="flex items-center justify-center py-3 px-4 glass-card hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.269-.03-.406-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z" />
                </svg>
              </button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-white/60">
                还没有账户？{' '}
                <Link
                  to="/register"
                  className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                >
                  立即注册
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-white/40 text-sm">
            <Globe className="w-4 h-4" />
            <span>支持 50+ 种语言学习</span>
            <Sparkles className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
