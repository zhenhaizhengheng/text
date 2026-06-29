import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="animate-fade-in min-h-[60vh] flex flex-col items-center justify-center p-8">
      <h1 className="text-6xl md:text-8xl font-bold gradient-text mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">页面未找到</h2>
      <p className="text-lg text-white/60 mb-8">抱歉，您访问的页面不存在。</p>
      <Link to="/" className="btn-primary">
        返回首页
      </Link>
    </div>
  );
}
