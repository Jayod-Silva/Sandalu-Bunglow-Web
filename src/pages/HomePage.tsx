import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import BungalowCards from '../components/BungalowCards';
import FeaturesSection from '../components/FeaturesSection';
import ExperienceSection from '../components/ExperienceSection';
import StatsSection from '../components/StatsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';
import LoadingAnimation from '../components/LoadingAnimation';
import WhatsAppButton from '../components/WhatsAppButton';
import QuickBook from '../components/BookingBar';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(() => {
    const hasLoaded = sessionStorage.getItem('hasLoadedBefore');
    return !hasLoaded;
  });

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem('hasLoadedBefore');

    if (!hasLoaded) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem('hasLoadedBefore', 'true');
      }, 2500);

      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <div className="min-h-screen bg-white sm:overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <BungalowCards />
      <QuickBook />
      <FeaturesSection />
      <ExperienceSection />
      <StatsSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default HomePage;
