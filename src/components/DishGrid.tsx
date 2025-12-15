import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const dishes = [
  { id: 1, image: '/1.jpg' },
  { id: 2, image: '/2.jpg' },
  { id: 3, image: '/3.jpg' },
  { id: 4, image: '/4.jpg' },
  { id: 5, image: '/5.jpg' },
];

const DishGrid = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % dishes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={ref} className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <p className="text-accent font-inter tracking-widest mb-2 sm:mb-3 uppercase text-xs sm:text-sm">
            Culinary Excellence
          </p>
          <h2
            className="
              font-playfair font-bold text-luxury mb-3 sm:mb-4 text-center
              whitespace-normal break-words leading-tight
              text-2xl sm:text-3xl md:text-4xl lg:text-5xl
            "
          >
            Signature Dishes
          </h2>
        </motion.div>

        {/* Auto-Scroll Carousel */}
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="w-full max-w-3xl"
          >
            {/* Main Image Card */}
            <div className="relative rounded-3xl overflow-hidden bg-white dark:bg-slate-950 border border-gray-100 dark:border-slate-800 elegant-shadow mb-8">
              <div className="w-full overflow-hidden bg-gray-200 dark:bg-slate-800 relative" style={{ aspectRatio: '16 / 9' }}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="w-full h-full"
                >
                  <img
                    src={dishes[currentIndex].image}
                    alt={`Signature Dish ${dishes[currentIndex].id}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            </div>

            {/* Thumbnail Carousel */}
            <div className="flex gap-3 sm:gap-4 justify-center overflow-x-auto pb-4">
              {dishes.map((dish, index) => (
                <motion.button
                  key={dish.id}
                  onClick={() => setCurrentIndex(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex-shrink-0 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                    currentIndex === index
                      ? 'border-accent ring-2 ring-accent/50'
                      : 'border-gray-200 dark:border-slate-700 hover:border-accent/50'
                  }`}
                >
                  <img
                    src={dish.image}
                    alt={`Dish ${dish.id}`}
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover"
                  />
                </motion.button>
              ))}
            </div>

            {/* Progress Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {dishes.map((_, index) => (
                <motion.div
                  key={index}
                  animate={{
                    width: currentIndex === index ? 24 : 8,
                    backgroundColor: currentIndex === index ? 'rgb(217, 119, 6)' : 'rgb(229, 231, 235)',
                  }}
                  transition={{ duration: 0.3 }}
                  className="h-2 rounded-full cursor-pointer"
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DishGrid;