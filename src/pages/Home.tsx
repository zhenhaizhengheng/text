import HeroSection from '@/components/home/HeroSection';
import LanguageWorld from '@/components/home/LanguageWorld';
import Dashboard from '@/components/home/Dashboard';
import FeaturedCourses from '@/components/home/FeaturedCourses';
import FeaturesSection from '@/components/home/FeaturesSection';
import LearningPath from '@/components/home/LearningPath';
import { useAuthStore } from '@/store/useAuthStore';

export default function Home() {
  const { isAuthenticated } = useAuthStore();
  const showDashboard = true;

  return (
    <div className="min-h-screen bg-space-950">
      <HeroSection />
      <LanguageWorld />
      {showDashboard && <Dashboard />}
      <FeaturedCourses />
      <FeaturesSection />
      <LearningPath />
    </div>
  );
}
