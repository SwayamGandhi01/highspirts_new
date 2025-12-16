import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = [
        'home',
        'signature-dishes',
        'experiences',
        'chef-philosophy',
        'timeline',
        'ingredients',
        'ambience-tour',
      ];

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/', id: 'home' },
    { name: 'Signature Dishes', path: '/', id: 'signature-dishes' },
    { name: 'Experiences', path: '/', id: 'experiences' },
    { name: 'About', path: '/about' },
    { name: 'Menu', path: '/menu' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Events', path: '/events' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleScrollToSection = (sectionId) => {
    // If on homepage, just scroll to section
    if (location.pathname === '/') {
      if (sectionId && sectionId !== 'home') {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setIsMobileMenuOpen(false);
        }
      } else if (sectionId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setIsMobileMenuOpen(false);
      }
    } else {
      // If on different page, navigate to homepage and scroll to section
      navigate('/');
      setIsMobileMenuOpen(false);
      // Scroll after navigation completes
      setTimeout(() => {
        if (sectionId && sectionId !== 'home') {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'backdrop-blur-lg bg-black/40 shadow-lg shadow-accent/20'
          : 'bg-transparent'
      }`}
    >
      <div className="px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-center h-14 sm:h-16 md:h-20 relative">
          {/* Logo - Left side */}
          <motion.button
            onClick={() => handleScrollToSection('home')}
            className="flex items-center gap-2 cursor-pointer flex-shrink-0 min-w-0 absolute left-0"
            whileHover={{ scale: 1.05 }}
          >
            <motion.img
              whileHover={{ scale: 1.05 }}
              src="/logo.png"
              alt="High Spirits Logo"
              className="h-10 sm:h-12 md:h-14 w-auto object-contain flex-shrink-0"
            />
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl font-playfair font-bold text-luxury tracking-wider hidden xs:block truncate"
            >
              HIGH SPIRITS
            </motion.div>
          </motion.button>

          {/* Desktop Navigation - Center */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6 justify-center">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.path + link.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {link.id ? (
                  <button
                    onClick={() => handleScrollToSection(link.id)}
                    className={`text-foreground hover:text-accent transition-colors duration-300 font-inter text-xs md:text-sm font-medium tracking-wide relative group whitespace-nowrap ${
                      activeSection === link.id ? 'text-accent' : ''
                    }`}
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 h-0.5 bg-accent transition-all duration-300 w-0 group-hover:w-full" />
                  </button>
                ) : (
                  <Link
                    to={link.path}
                    className="text-foreground hover:text-accent transition-colors duration-300 font-inter text-xs md:text-sm font-medium tracking-wide relative group whitespace-nowrap"
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 h-0.5 bg-accent transition-all duration-300 w-0 group-hover:w-full" />
                  </Link>
                )}
              </motion.div>
            ))}
            <Link to="/reservations">
              <Button
                variant="default"
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-4 md:px-5 text-xs md:text-sm gold-glow whitespace-nowrap"
              >
                Book a Table
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button - Right side */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-accent p-2 hover:bg-accent/10 rounded-lg transition-colors flex-shrink-0 absolute right-0"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-primary/98 backdrop-blur-lg border-t border-accent/20 overflow-hidden"
          >
            <div className="px-2 sm:px-4 py-3 space-y-1">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path + link.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {link.id ? (
                    <button
                      onClick={() => handleScrollToSection(link.id)}
                      className={`w-full text-left px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base font-inter rounded-lg transition-all duration-300 ${
                        activeSection === link.id
                          ? 'text-accent bg-accent/10'
                          : 'text-foreground hover:text-accent hover:bg-accent/5'
                      }`}
                    >
                      {link.name}
                    </button>
                  ) : (
                    <Link
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base font-inter text-foreground hover:text-accent transition-colors duration-300 rounded-lg hover:bg-accent/5"
                    >
                      {link.name}
                    </Link>
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="pt-2 sm:pt-3"
              >
                <Link to="/reservations" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-xs sm:text-sm">
                    Book a Table
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;