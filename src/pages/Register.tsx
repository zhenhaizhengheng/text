import { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Rocket,
  Sparkles,
  Globe,
  Check,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { useAuthStore } from '@/store/useAuthStore';
import { languages } from '@/data/languages';

interface FormErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  nativeLanguage?: string;
  targetLanguage?: string;
  agreement?: string;
}

interface PasswordStrength {
  score: number;
  label: string;
  color: string;
}

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [nativeLanguage, setNativeLanguage] = useState('lang-zh');
  const [targetLanguage, setTargetLanguage] = useState('lang-en');
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showNativeDropdown, setShowNativeDropdown] = useState(false);
  const [showTargetDropdown, setShowTargetDropdown] = useState(false);

  const { register, isLoading, error, clearError, isAuthenticated } = useAuthStore();
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

  const passwordStrength: PasswordStrength = useMemo(() => {
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 10) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    const labels = ['非常弱', '弱', '一般', '强', '非常强'];
    const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500', 'bg-emerald-500'];

    return {
      score,
      label: labels[Math.min(score, 4)],
      color: colors[Math.min(score, 4)],
    };
  }, [password]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!username) {
      newErrors.username = '请输入用户名';
    } else if (username.length < 2) {
      newErrors.username = '用户名至少为2个字符';
    }

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

    if (!confirmPassword) {
      newErrors.confirmPassword = '请确认密码';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = '两次输入的密码不一致';
    }

    if (!nativeLanguage) {
      newErrors.nativeLanguage = '请选择母语';
    }

    if (!targetLanguage) {
      newErrors.targetLanguage = '请选择学习目标语言';
    }

    if (!agreed) {
      newErrors.agreement = '请阅读并同意用户协议';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await register({
        username,
        email,
        password,
        nativeLanguage,
        targetLanguage,
      });
      navigate(from, { replace: true });
    } catch {
      // 错误已在 store 中处理
    }
  };

  const handleSocialRegister = (provider: string) => {
    console.log(`Social register with ${provider}`);
  };

  const nativeLang = languages.find((l) => l.id === nativeLanguage);
  const targetLang = languages.find((l) => l.id === targetLanguage);

  return (
    <div className="min-h-screen flex bg-space-900 overflow-hidden">
      <div className="fixed inset-0 starfield opacity-50 pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/20 via-space-900 to-purple-900/20 pointer-events-none" />

      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-center items-center p-12 z-10">
        <div className="relative w-full max-w-md">
          <div className="absolute -top-20 -right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute -bottom-20 -left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl animate-pulse-glow animate-delay-500" />

          <div className="relative glass-card p-10 card-glow">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center animate-float">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold gradient-text-blue font-display">LinguaCosmos</h1>
                <p className="text-white/60 text-sm">探索语言的无限宇宙</p>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-white">加入星际学习社区</h2>
              <p className="text-white/70 leading-relaxed">
                开始你的语言学习冒险！与全球数百万学习者一起，在宇宙探索中掌握新语言，发现新文化。
              </p>

              <div className="space-y-4 pt-4">
                {[
                  { icon: '🎯', title: '个性化学习', desc: '根据你的水平定制学习路径' },
                  { icon: '🏆', title: '游戏化体验', desc: '成就系统让学习更有动力' },
                  { icon: '👥', title: '社区互动', desc: '与全球学习者交流进步' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="text-2xl">{item.icon}</div>
                    <div>
                      <div className="text-white/90 font-medium">{item.title}</div>
                      <div className="text-white/60 text-sm">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute top-1/3 -left-8 text-6xl animate-float-slow">🌙</div>
          <div className="absolute bottom-1/3 -right-6 text-4xl animate-float-fast">💫</div>
          <div className="absolute top-1/2 left-0 text-3xl animate-float animate-delay-300">🌟</div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 z-10 py-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold gradient-text-blue font-display">LinguaCosmos</h1>
          </div>

          <div className="glass-card p-8 sm:p-10 card-glow animate-fade-in-up">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">创建账户</h2>
              <p className="text-white/60">开启你的语言学习之旅</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm animate-fade-in">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="用户名"
                type="text"
                placeholder="给自己起个名字"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                icon={<User className="w-5 h-5" />}
                error={errors.username}
              />

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
                placeholder="设置你的密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock className="w-5 h-5" />}
                iconPosition="left"
                rightIcon={showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                onRightIconClick={() => setShowPassword(!showPassword)}
                error={errors.password}
              />

              {password && (
                <div className="space-y-2 -mt-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          i < passwordStrength.score ? passwordStrength.color : 'bg-white/10'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-white/50">密码强度: {passwordStrength.label}</span>
                    <div className="flex gap-3 text-white/40">
                      <span className={password.length >= 6 ? 'text-green-400' : ''}>
                        {password.length >= 6 ? <Check className="w-3 h-3 inline" /> : ''}6位+
                      </span>
                      <span className={/[A-Z]/.test(password) ? 'text-green-400' : ''}>
                        {/[A-Z]/.test(password) ? <Check className="w-3 h-3 inline" /> : ''}大写
                      </span>
                      <span className={/[0-9]/.test(password) ? 'text-green-400' : ''}>
                        {/[0-9]/.test(password) ? <Check className="w-3 h-3 inline" /> : ''}数字
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <Input
                label="确认密码"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="再次输入密码"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                icon={<Lock className="w-5 h-5" />}
                iconPosition="left"
                rightIcon={showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                onRightIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
                error={errors.confirmPassword}
              />

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-white/80">母语</label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => {
                        setShowNativeDropdown(!showNativeDropdown);
                        setShowTargetDropdown(false);
                      }}
                      className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white text-left flex items-center justify-between transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 ${
                        errors.nativeLanguage
                          ? 'border-red-500/50'
                          : 'border-white/10 focus:border-purple-500/50'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{nativeLang?.flag}</span>
                        <span className="text-sm">{nativeLang?.name}</span>
                      </span>
                      <ChevronDown className="w-4 h-4 text-white/40" />
                    </button>
                    {showNativeDropdown && (
                      <div className="absolute z-20 w-full mt-1 py-1 glass-card max-h-48 overflow-y-auto scrollbar-hide">
                        {languages.map((lang) => (
                          <button
                            key={lang.id}
                            type="button"
                            onClick={() => {
                              setNativeLanguage(lang.id);
                              setShowNativeDropdown(false);
                            }}
                            className="w-full px-4 py-2 text-left text-sm text-white/80 hover:bg-white/10 transition-colors flex items-center gap-2"
                          >
                            <span>{lang.flag}</span>
                            <span>{lang.name}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {errors.nativeLanguage && (
                    <p className="text-xs text-red-400">{errors.nativeLanguage}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-white/80">学习语言</label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => {
                        setShowTargetDropdown(!showTargetDropdown);
                        setShowNativeDropdown(false);
                      }}
                      className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white text-left flex items-center justify-between transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 ${
                        errors.targetLanguage
                          ? 'border-red-500/50'
                          : 'border-white/10 focus:border-purple-500/50'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{targetLang?.flag}</span>
                        <span className="text-sm">{targetLang?.name}</span>
                      </span>
                      <ChevronDown className="w-4 h-4 text-white/40" />
                    </button>
                    {showTargetDropdown && (
                      <div className="absolute z-20 w-full mt-1 py-1 glass-card max-h-48 overflow-y-auto scrollbar-hide">
                        {languages.map((lang) => (
                          <button
                            key={lang.id}
                            type="button"
                            onClick={() => {
                              setTargetLanguage(lang.id);
                              setShowTargetDropdown(false);
                            }}
                            className="w-full px-4 py-2 text-left text-sm text-white/80 hover:bg-white/10 transition-colors flex items-center gap-2"
                          >
                            <span>{lang.flag}</span>
                            <span>{lang.name}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {errors.targetLanguage && (
                    <p className="text-xs text-red-400">{errors.targetLanguage}</p>
                  )}
                </div>
              </div>

              <div className="pt-1">
                <label className="flex items-start gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-white/20 bg-white/5 text-purple-500 focus:ring-purple-500/50 focus:ring-offset-0"
                  />
                  <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors">
                    我已阅读并同意{' '}
                    <a href="/terms" className="text-purple-400 hover:text-purple-300">
                      用户协议
                    </a>{' '}
                    和{' '}
                    <a href="/privacy" className="text-purple-400 hover:text-purple-300">
                      隐私政策
                    </a>
                  </span>
                </label>
                {errors.agreement && <p className="text-xs text-red-400 mt-1">{errors.agreement}</p>}
              </div>

              <Button type="submit" className="w-full" size="lg" loading={isLoading}>
                创建账户
              </Button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-transparent text-white/50">或使用以下方式注册</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => handleSocialRegister('google')}
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
                onClick={() => handleSocialRegister('github')}
                className="flex items-center justify-center py-3 px-4 glass-card hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => handleSocialRegister('wechat')}
                className="flex items-center justify-center py-3 px-4 glass-card hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.269-.03-.406-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z" />
                </svg>
              </button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-white/60">
                已有账户？{' '}
                <Link
                  to="/login"
                  className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                >
                  立即登录
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
