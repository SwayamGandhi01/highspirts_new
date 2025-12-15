import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const PromoBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState<string>('');

  const STORAGE_KEY = 'promo-banner-dismissed';
  const RESET_HOUR = 6; // Reset dismissal at 6 AM daily

  const promoConfig = {
    message: 'Happy Hour 5-7PM',
    description: '20% off all drinks',
    startTime: 17, // 5 PM
    endTime: 19, // 7 PM
    ctaText: 'Enjoy Now',
    ctaLink: '/menu',
  };

  // Check if banner should be visible
  useEffect(() => {
    const checkVisibility = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinutes = now.getMinutes();

      // Check if it's time for the promo (5 PM to 7 PM)
      const isPromoTime =
        currentHour >= promoConfig.startTime &&
        currentHour < promoConfig.endTime;

      // Check if user dismissed it today
      const dismissedData = localStorage.getItem(STORAGE_KEY);
      let isDismissed = false;

      if (dismissedData) {
        const { date } = JSON.parse(dismissedData);
        const today = new Date().toDateString();
        isDismissed = date === today;
      }

      setIsVisible(isPromoTime && !isDismissed);
    };

    checkVisibility();
    const interval = setInterval(checkVisibility, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  // Countdown timer logic
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinutes = now.getMinutes();

      if (currentHour >= promoConfig.startTime && currentHour < promoConfig.endTime) {
        const minutesLeft = promoConfig.endTime * 60 - (currentHour * 60 + currentMinutes);
        const hours = Math.floor(minutesLeft / 60);
        const minutes = minutesLeft % 60;

        if (hours > 0) {
          setTimeLeft(`${hours}h ${minutes}m left`);
        } else {
          setTimeLeft(`${minutes}m left`);
        }
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [isVisible]);

  const handleDismiss = () => {
    const dismissalData = {
      date: new Date().toDateString(),
      timestamp: new Date().getTime(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dismissalData));
    setIsVisible(false);
  };

  const handleCTA = () => {
    window.location.href = promoConfig.ctaLink;
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="fixed top-20 left-0 right-0 z-40 w-full"
        >
          {/* Banner Background with Gradient */}
          <div className="relative w-full bg-gradient-to-r from-accent/90 via-accent to-accent/80 backdrop-blur-sm">
            {/* Animated Border Light */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            {/* Content Container */}
            <div className="relative container mx-auto px-4 py-3 sm:py-4">
              <div className="flex items-center justify-between gap-2 sm:gap-4 md:gap-6">
                {/* Left Section - Offer Details */}
                <div className="flex-1 min-w-0">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3"
                  >
                    <span className="text-sm sm:text-base md:text-lg font-bold text-slate-900 truncate">
                      ✨ {promoConfig.message}
                    </span>
                    <span className="hidden sm:inline text-sm sm:text-base text-slate-900/80">
                      •
                    </span>
                    <span className="text-xs sm:text-sm md:text-base text-slate-900/90">
                      {promoConfig.description}
                    </span>
                  </motion.div>

                  {/* Countdown Timer */}
                  {timeLeft && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-xs sm:text-sm text-slate-900/70 mt-1 sm:mt-0"
                    >
                      {timeLeft}
                    </motion.p>
                  )}
                </div>

                {/* Middle Section - CTA Button */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.25 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCTA}
                  className="hidden sm:block px-3 md:px-6 py-2 bg-slate-900 text-accent font-semibold rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap text-sm md:text-base"
                >
                  {promoConfig.ctaText}
                </motion.button>

                {/* Right Section - Close Button */}
                <motion.button
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleDismiss}
                  className="flex-shrink-0 p-1.5 sm:p-2 text-slate-900 hover:bg-slate-900/20 rounded-full transition-colors"
                  aria-label="Dismiss banner"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.button>
              </div>

              {/* Mobile CTA Button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                onClick={handleCTA}
                className="sm:hidden w-full mt-3 px-4 py-2 bg-slate-900 text-accent font-semibold rounded-lg hover:bg-slate-800 transition-colors text-sm"
              >
                {promoConfig.ctaText}
              </motion.button>
            </div>
          </div>

          {/* Pulsing indicator dot */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-2 right-4 w-2 h-2 bg-white rounded-full hidden sm:block"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PromoBanner;
