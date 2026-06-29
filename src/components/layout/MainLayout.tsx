import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import { useUIStore } from '@/store/useUIStore';

const MainLayout = () => {
  const location = useLocation();
  const { sidebarOpen } = useUIStore();

  const isLearnPage = location.pathname.startsWith('/learn');
  const isAuthPage =
    location.pathname === '/login' || location.pathname === '/register';

  if (isAuthPage) {
    return (
      <div className="min-h-screen bg-space-900">
        <Outlet />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-space-900 text-white">
      <div className="fixed inset-0 starfield opacity-30 pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-blue-900/10 pointer-events-none" />

      <Navbar />
      <Sidebar />

      <main
        className={`relative pt-16 min-h-screen transition-all duration-300 ${
          isLearnPage && sidebarOpen ? 'lg:ml-64' : isLearnPage ? 'lg:ml-20' : ''
        } pb-20 lg:pb-0`}
      >
        <Outlet />
        <Footer />
      </main>

      <MobileNav />
    </div>
  );
};

export default MainLayout;
