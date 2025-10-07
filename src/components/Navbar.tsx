import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, ChevronDown, Lock, Eye, EyeOff } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isLocationsOpen, setIsLocationsOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const location = useLocation();
  const isContactPage = location.pathname === '/contact';

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const locations = [
    { name: 'Tissamaharama', path: '/location/tissamaharama' },
    { name: 'Nuwara Eliya', path: '/location/nuwara-eliya' },
    { name: 'Kitulgala', path: '/location/kitulgala' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.locations-dropdown')) {
        setIsLocationsOpen(false);
      }
      if (!target.closest('.admin-login-dropdown')) {
        setIsAdminLoginOpen(false);
      }
    };

    if (isLocationsOpen || isAdminLoginOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isLocationsOpen, isAdminLoginOpen]);

  const toggleLocations = () => {
    setIsLocationsOpen(!isLocationsOpen);
  };

  const toggleAdminLogin = () => {
    setIsAdminLoginOpen(!isAdminLoginOpen);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Admin login attempt:', loginForm);
  };

  return (
   <nav
      className={`fixed top-0 p-4 left-0 right-0 z-40 transition-all duration-500 ${
        isVisible ? 'translate-y-0 backdrop-blur-sm opacity-100' : '-translate-y-full opacity-0'
      } ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-4'
          : 'bg-transparent'
      }`}
    >

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex-shrink-0">
            <img
              src={
          isScrolled
            ? 'src/assets/Logo.png'
            : isVisible
            ? 'src/assets/Logo2.png'
            : 'src/assets/Logo2.png'
              }
              alt="Sandalu Bungalows"
              className="h-20 w-auto"
            />
          </Link>


          <div className="hidden md:flex items-center space-x-10 cursor-pointer">
            <Link
              to="/"
              className={`text-sm tracking-wider font-light transition-all duration-300 hover:scale-105 ${
                isScrolled
                  ? 'text-neutral-700 hover:text-amber-600'
                  : 'text-white hover:text-amber-400'
              }`}
            >
              Home
            </Link>

            <div className="relative locations-dropdown">
              <button
                onClick={toggleLocations}
                className={`text-sm tracking-wider font-light transition-all duration-300 hover:scale-105 flex items-center gap-1 ${
                  isScrolled
                    ? 'text-neutral-700 hover:text-amber-600'
                    : 'text-white hover:text-amber-400'
                }`}
              >
                Locations
                <ChevronDown size={16} className={`transition-transform duration-300 ${isLocationsOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLocationsOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50">
                  {locations.map((loc) => (
                    <Link
                      key={loc.path}
                      to={loc.path}
                      onClick={() => setIsLocationsOpen(false)}
                      className="block px-4 py-2 text-sm text-neutral-700 hover:bg-amber-50 hover:text-amber-600 transition-colors duration-200"
                    >
                      {loc.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/gallery"
              className={`text-sm tracking-wider font-light transition-all duration-300 hover:scale-105 ${
                isScrolled
                  ? 'text-neutral-700 hover:text-amber-600'
                  : 'text-white hover:text-amber-400'
              }`}
            >
              Gallery
            </Link>
            <Link
              to="/about"
              className={`text-sm tracking-wider font-light transition-all duration-300 hover:scale-105 ${
                isScrolled
                  ? 'text-neutral-700 hover:text-amber-600'
                  : 'text-white hover:text-amber-400'
              }`}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className={`text-sm tracking-wider font-light transition-all duration-300 hover:scale-105 ${
                isScrolled
                  ? 'text-neutral-700 hover:text-amber-600'
                  : 'text-white hover:text-amber-400'
              }`}
            >
              Contact Us
            </Link>
            <Link
              to="/booking"
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-all duration-300 text-sm tracking-wider"
            >
              Book Now
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <a
              href="tel:+1234567890"
              className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                isScrolled
                  ? 'text-neutral-700 hover:bg-amber-100'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              <Phone size={18} />
            </a>
            <a
              href="mailto:info@sandalu.com"
              className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                isScrolled
                  ? 'text-neutral-700 hover:bg-amber-100'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              <Mail size={18} />
            </a>

            {isContactPage && (
              <div className="relative admin-login-dropdown">
                <button
                  onClick={toggleAdminLogin}
                  className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                    isScrolled
                      ? 'text-neutral-700 hover:bg-amber-100'
                      : 'text-white hover:bg-white/20'
                  }`}
                  title="Admin Login"
                >
                  <Lock size={18} />
                </button>

                {isAdminLoginOpen && (
                  <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-2xl p-6 z-50 border border-neutral-200">
                    <div className="flex items-center gap-2 mb-4 pb-4 border-b border-neutral-200">
                      <Lock size={20} className="text-amber-600" />
                      <h3 className="text-lg font-light text-neutral-900">Admin Portal</h3>
                    </div>

                    <form onSubmit={handleLoginSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="admin-email" className="block text-xs font-medium text-neutral-700 mb-1.5">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="admin-email"
                          value={loginForm.email}
                          onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                          className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                          placeholder="admin@sandalu.com"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="admin-password" className="block text-xs font-medium text-neutral-700 mb-1.5">
                          Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            id="admin-password"
                            value={loginForm.password}
                            onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                            className="w-full px-3 py-2 pr-10 text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                            placeholder="••••••••"
                            required
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowPassword(!showPassword);
                            }}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-amber-600 transition-colors duration-200"
                          >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-all duration-300 text-sm font-medium shadow-md hover:shadow-lg"
                      >
                        Login to Portal
                      </button>
                    </form>

                    <p className="text-xs text-neutral-500 text-center mt-4">
                      For authorized personnel only
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${
              isScrolled
                ? 'text-neutral-900 hover:bg-neutral-100'
                : 'text-white hover:bg-white/20'
            }`}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-neutral-200">
          <div className="px-4 py-6 space-y-4">
            <Link
              to="/"
              className="block text-neutral-700 hover:text-amber-600 transition-colors duration-300 text-sm tracking-wider"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>

            <div>
              <p className="text-xs text-neutral-500 uppercase tracking-wider mb-2">Locations</p>
              {locations.map((loc) => (
                <Link
                  key={loc.path}
                  to={loc.path}
                  className="block pl-4 py-2 text-neutral-700 hover:text-amber-600 transition-colors duration-300 text-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {loc.name}
                </Link>
              ))}
            </div>

            <Link
              to="/gallery"
              className="block text-neutral-700 hover:text-amber-600 transition-colors duration-300 text-sm tracking-wider"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Gallery
            </Link>
            <Link
              to="/about"
              className="block text-neutral-700 hover:text-amber-600 transition-colors duration-300 text-sm tracking-wider"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="block text-neutral-700 hover:text-amber-600 transition-colors duration-300 text-sm tracking-wider"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact Us
            </Link>
            <Link
              to="/booking"
              className="block px-4 py-2 bg-amber-600 text-white rounded-lg text-center text-sm tracking-wider"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Book Now
            </Link>
            <div className="flex space-x-4 pt-4 border-t border-neutral-200">
              <a
                href="tel:+1234567890"
                className="flex items-center space-x-2 text-neutral-700 hover:text-amber-600 transition-colors duration-300"
              >
                <Phone size={18} />
                <span className="text-sm">Call Us</span>
              </a>
              <a
                href="mailto:info@sandalu.com"
                className="flex items-center space-x-2 text-neutral-700 hover:text-amber-600 transition-colors duration-300"
              >
                <Mail size={18} />
                <span className="text-sm">Email</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;