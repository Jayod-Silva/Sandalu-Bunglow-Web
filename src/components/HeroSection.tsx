import { useState, useEffect } from 'react';
import { ChevronRight, MapPin, Calendar } from 'lucide-react';


interface HeroSlide {
  image: string;
  title: string;
  description: string;
}

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const slides: HeroSlide[] = [
    {
      image: 'src/assets/hero1.jpeg',
      title: 'Escape to Paradise',
      description: 'Experience luxury and tranquility in our exclusive beachfront bungalows. Where every moment becomes a cherished memory.',
    },
    {
      image: 'src/assets/hero2.jpeg',
      title: 'Your Private Sanctuary',
      description: 'Immerse yourself in breathtaking ocean views and world-class amenities. A perfect blend of comfort and elegance awaits.',
    },
    {
      image: 'src/assets/hero3.jpeg',
      title: 'Unforgettable Moments',
      description: 'Create lasting memories in a tropical paradise. Where pristine beaches meet unparalleled hospitality and luxury.',
    },
    {
      image: 'src/assets/hero4.jpeg',
      title: 'Unforgettable Moments',
      description: 'Create lasting memories in a tropical paradise. Where pristine beaches meet unparalleled hospitality and luxury.',
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.scroll-animate');
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8;
        if (isVisible) {
          el.classList.add('animate-in');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden" id="home">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-[2500ms] ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 animate-slow-zoom"
            style={{
              backgroundImage: `url(${slide.image})`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        </div>
      ))}

      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div
          className={`max-w-2xl transition-all duration-1000 ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
          }`}
        >
          <div className="mb-6 flex items-center space-x-2 text-amber-400">
            <MapPin size={20} />
            <span className="text-sm tracking-widest uppercase">Sri Lanka</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white mb-6 leading-tight tracking-tight">
            SANDALU
            <br />
            <span className="text-amber-400">BUNGALOWS</span>
          </h1>

          <div
            key={currentSlide}
            className="animate-fade-in"
          >
            <h2 className="text-2xl md:text-4xl font-light text-white mb-4 tracking-wide">
              {slides[currentSlide].title}
            </h2>
            <p className="text-lg md:text-xl text-neutral-300 mb-8 leading-relaxed max-w-xl">
              {slides[currentSlide].description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="group px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-xl hover:shadow-2xl hover:scale-105">
              <Calendar size={20} />
              <span className="tracking-wider">Book Now</span>
              <ChevronRight
                size={20}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </button>
            <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300 backdrop-blur-sm border border-white/30 hover:border-white/50 shadow-xl hover:scale-105 tracking-wider">
              Explore Rooms
            </button>
          </div>

          <div className="mt-12 flex items-center space-x-6 text-white/80">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1 rounded-full transition-all duration-500 ${
                  index === currentSlide ? 'w-12 bg-amber-400' : 'w-8 bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/70 rounded-full animate-scroll-down" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
