import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { TestimonialSkeleton } from '@/components/skeletons/TestimonialSkeleton';

interface Testimonial {
  name: string;
  review: string;
  rating: number;
  avatar?: string;
}

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [displayCount, setDisplayCount] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [displayedTexts, setDisplayedTexts] = useState<{ [key: number]: string }>({});

  const testimonials: Testimonial[] = [
    {
      name: 'Emma Thompson',
      review: 'Absolutely exquisite! The butter chicken was perfection, and the ambience transported us to luxury. Every bite was a journey through authentic Indian flavors.',
      rating: 5,
      avatar: '👩‍🦰',
    },
    {
      name: 'James Wilson',
      review: 'Best Indian restaurant in Australia. The attention to detail in every dish is remarkable. The service was impeccable and the entire experience unforgettable.',
      rating: 5,
      avatar: '👨‍💼',
    },
    {
      name: 'Sophia Martinez',
      review: 'A true fine dining experience. From the moment we walked in, we felt like royalty. The wine pairing suggestions were exceptional.',
      rating: 5,
      avatar: '👩‍🦱',
    },
    {
      name: 'David Chen',
      review: 'The most authentic Indian cuisine I\'ve ever tasted outside of India. The biryani is absolutely divine and worth every penny.',
      rating: 5,
      avatar: '👨‍🦲',
    },
    {
      name: 'Lisa Anderson',
      review: 'Celebrated our anniversary here and it was absolutely perfect. The staff remembered our preferences and the surprise dessert was a lovely touch.',
      rating: 5,
      avatar: '👩‍🎤',
    },
  ];

  // Handle responsive display count
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setDisplayCount(1);
      } else if (window.innerWidth < 1024) {
        setDisplayCount(2);
      } else {
        setDisplayCount(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Simulate testimonials loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  // Auto-advance testimonials
  useEffect(() => {
    if (!isAutoPlay) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlay, testimonials.length]);

  // Typewriter effect for all testimonial quotes
  useEffect(() => {
    // Initialize typewriter for all testimonials on mount
    testimonials.forEach((testimonial, index) => {
      if (!displayedTexts[index]) {
        let charIndex = 0;
        const text = testimonial.review;
        // Slower, more visible typing: ~4-5 seconds per full quote
        // Average testimonial is ~140 characters, so 30-35ms per character
        const charDelay = 32; // Visible, smooth character-by-character typing

        const typeInterval = setInterval(() => {
          if (charIndex <= text.length) {
            setDisplayedTexts((prev) => ({
              ...prev,
              [index]: text.slice(0, charIndex),
            }));
            charIndex++;
          } else {
            clearInterval(typeInterval);
          }
        }, charDelay);

        return () => clearInterval(typeInterval);
      }
    });
  }, [testimonials, displayedTexts]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlay(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlay(false);
  };

  const visibleTestimonials = Array.from({ length: displayCount }).map((_, i) => {
    return testimonials[(currentIndex + i) % testimonials.length];
  });

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-accent font-inter tracking-widest mb-3 uppercase text-xs sm:text-sm">
            Guest Reviews
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-luxury mb-4">
            What Our Guests Say
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Discover why diners from around the world choose High Spirits for their culinary journey
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Testimonials Grid */}
          {isLoading ? (
            <TestimonialSkeleton count={displayCount} />
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
              >
                {visibleTestimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    onMouseEnter={() => setIsAutoPlay(false)}
                    onMouseLeave={() => setIsAutoPlay(true)}
                    className="glass-effect rounded-xl p-6 sm:p-8 hover:scale-105 transition-transform duration-300 h-full flex flex-col"
                  >
                    {/* Star Rating */}
                    <motion.div
                      className="flex gap-1 mb-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="star"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                        >
                          <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-accent text-accent" />
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* Review Text - Typewriter Effect */}
                    <p className="text-sm sm:text-base text-muted-foreground italic mb-6 flex-grow leading-relaxed">
                      "
                      <span className="typewriter-text">
                        {displayedTexts[(currentIndex + index) % testimonials.length] !== undefined
                          ? displayedTexts[(currentIndex + index) % testimonials.length]
                          : testimonial.review}
                      </span>
                      "
                    </p>

                    {/* Customer Info */}
                    <div className="flex items-center gap-3 pt-4 border-t border-accent/20">
                      <div className="text-2xl sm:text-3xl testimonial-avatar">{testimonial.avatar}</div>
                      <div>
                        <p className="text-accent font-semibold text-sm sm:text-base">
                          {testimonial.name}
                        </p>
                        <p className="text-xs text-muted-foreground">Verified Guest</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {/* Navigation Buttons */}
          {!isLoading && (
            <>
              <div className="flex items-center justify-between mt-8 sm:mt-10 md:mt-12 gap-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePrev}
                  className="p-2 sm:p-3 rounded-full border-2 border-accent text-accent hover:bg-accent/10 transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.button>

                {/* Dots Indicator */}
                <div className="flex gap-2 flex-wrap justify-center flex-1">
                  {testimonials.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => {
                        setCurrentIndex(index);
                        setIsAutoPlay(false);
                      }}
                      className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? 'bg-accent w-6 sm:w-8'
                          : 'bg-accent/30 w-2 sm:w-2.5 hover:bg-accent/50'
                      }`}
                      whileHover={{ scale: 1.2 }}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNext}
                  className="p-2 sm:p-3 rounded-full border-2 border-accent text-accent hover:bg-accent/10 transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.button>
              </div>

              {/* Auto-play Indicator */}
              <motion.div
                animate={{ opacity: isAutoPlay ? 1 : 0.5 }}
                className="text-center mt-6 text-xs sm:text-sm text-muted-foreground"
              >
                {isAutoPlay ? 'Auto-playing' : 'Paused'} • {currentIndex + 1} of {testimonials.length}
              </motion.div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
