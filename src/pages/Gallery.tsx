import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { GalleryImageSkeleton } from '@/components/skeletons/GalleryImageSkeleton';
import ShareButtons from '@/components/ShareButtons';
import { TiltImage } from '@/components/TiltImage';
import { Share2, X } from 'lucide-react';

import image1 from '@/assets/1.png';
import image2 from '@/assets/2.png';
import image3 from '@/assets/3.png';
import image4 from '@/assets/4.png';
import image5 from '@/assets/5.png';
import cocktail from '@/assets/cocktail-signature.jpg';
import winePairing from '@/assets/wine-pairing.jpg';
import restaurantAmbience from '@/assets/restaurant-ambience.jpg';
import Image2 from '@/assets/Image2.jpg';
import Image3 from '@/assets/Image3.jpg';
import Image4 from '@/assets/Image4.jpg';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const galleryImages = [
    // Dine Gallery
    { src: image1, alt: 'Restaurant 1', category: 'dine' },
    { src: restaurantAmbience, alt: 'Restaurant Ambience', category: 'dine' },
    { src: image2, alt: 'Restaurant 2', category: 'dine' },
    { src: Image2, alt: 'Restaurant Detail', category: 'dine' },
    { src: Image3, alt: 'Restaurant View', category: 'dine' },
    { src: image4, alt: 'Restaurant 4', category: 'dine' },
    
    // Food Gallery
    { src: '/7.jpg', alt: 'Signature Dish', category: 'food' },
    { src: '/8.jpg', alt: 'Dal Makhani', category: 'food' },
    { src: '/9.jpg', alt: 'Tandoori Grill', category: 'food' },
    
    // Venue Gallery
    { src: image3, alt: 'Restaurant 3', category: 'venue' },
    { src: cocktail, alt: 'Cocktail', category: 'venue' },
    { src: winePairing, alt: 'Wine Pairing', category: 'venue' },
    { src: image5, alt: 'Restaurant 5', category: 'venue' },
    { src: Image4, alt: 'Restaurant Interior', category: 'venue' },
    { src: cocktail, alt: 'Cocktail Detail', category: 'venue' },
  ];

  const filteredImages = activeFilter === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeFilter);

  // Simulate image loading - in real app, this would be based on actual image load events
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [activeFilter]);

  // Intersection Observer for image zoom animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('zoom-in-animation');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    imageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [filteredImages]);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden mt-20 luxury-gradient">
        <div className="relative z-10 text-center px-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-accent font-inter tracking-widest mb-4 uppercase text-sm"
          >
            Visual Journey
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="
              font-playfair font-bold text-luxury mb-6 text-center 
              whitespace-normal break-words leading-tight
              text-[clamp(2.2rem,6vw,4.8rem)]
            "
          >
            Gallery
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-foreground max-w-2xl mx-auto"
          >
            Discover the beauty of our cuisine and ambience
          </motion.p>
        </div>
      </section>

      {/* Image Grid Gallery Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 bg-background">
        <div className="container mx-auto px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 mb-8 sm:mb-10 md:mb-12 lg:mb-16 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter('all')}
              className={`px-3 xs:px-4 sm:px-6 md:px-8 py-1.5 xs:py-2 sm:py-3 rounded-lg text-xs sm:text-sm md:text-base font-semibold transition-all duration-300 ${
                activeFilter === 'all'
                  ? 'bg-accent text-accent-foreground'
                  : 'border-2 border-accent text-accent hover:bg-accent/10'
              }`}
            >
              ALL
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter('dine')}
              className={`px-3 xs:px-4 sm:px-6 md:px-8 py-1.5 xs:py-2 sm:py-3 rounded-lg text-xs sm:text-sm md:text-base font-semibold transition-all duration-300 ${
                activeFilter === 'dine'
                  ? 'bg-accent text-accent-foreground'
                  : 'border-2 border-accent text-accent hover:bg-accent/10'
              }`}
            >
              DINE GALLERY
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter('venue')}
              className={`px-3 xs:px-4 sm:px-6 md:px-8 py-1.5 xs:py-2 sm:py-3 rounded-lg text-xs sm:text-sm md:text-base font-semibold transition-all duration-300 ${
                activeFilter === 'venue'
                  ? 'bg-accent text-accent-foreground'
                  : 'border-2 border-accent text-accent hover:bg-accent/10'
              }`}
            >
              VENUE GALLERY
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter('food')}
              className={`px-3 xs:px-4 sm:px-6 md:px-8 py-1.5 xs:py-2 sm:py-3 rounded-lg text-xs sm:text-sm md:text-base font-semibold transition-all duration-300 ${
                activeFilter === 'food'
                  ? 'bg-accent text-accent-foreground'
                  : 'border-2 border-accent text-accent hover:bg-accent/10'
              }`}
            >
              FOOD GALLERY
            </motion.button>
          </div>

          {/* Gallery Grid */}
          <motion.div 
            layout
            className="grid grid-cols-3 gap-2 xs:gap-2.5 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6"
          >
            {isLoading ? (
              <GalleryImageSkeleton count={filteredImages.length} />
            ) : (
              filteredImages.map((image, index) => (
                <motion.div
                  key={`${image.alt}-${index}`}
                  ref={(el) => {
                    if (el) imageRefs.current[index] = el;
                  }}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group relative overflow-hidden rounded-lg xs:rounded-lg sm:rounded-xl aspect-square cursor-pointer shadow-sm xs:shadow-md md:shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <TiltImage
                    src={image.src}
                    alt={image.alt}
                    onClick={() => setSelectedImage(image.src)}
                    className="w-full h-full"
                  >
                    {/* Overlay on hover with play button and share */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-gradient-to-t from-accent/60 via-transparent to-transparent flex items-center justify-center gap-3 xs:gap-4"
                    >
                      {/* Play button */}
                      <svg className="w-6 xs:w-7 sm:w-8 md:w-9 lg:w-10 xl:w-12 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </motion.div>
                    
                    {/* Share button on hover - bottom right corner */}
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage(image.src);
                      }}
                      className="absolute bottom-2 xs:bottom-3 sm:bottom-4 right-2 xs:right-3 sm:right-4 bg-accent/90 hover:bg-accent text-accent-foreground rounded-full p-1.5 xs:p-2 sm:p-2.5 shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 z-10 pointer-events-auto"
                      title="View & Share"
                    >
                      <Share2 className="w-4 xs:w-5 sm:w-5 md:w-6" />
                    </motion.button>
                  </TiltImage>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal - Fully Responsive */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 xs:p-3 sm:p-4 md:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-5xl bg-background/95 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button - Top Right */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 xs:top-3 sm:top-4 right-2 xs:right-3 sm:right-4 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full p-1.5 xs:p-2 sm:p-2.5 z-10 transition-all duration-300"
                title="Close"
              >
                <X className="w-5 xs:w-6 sm:w-6 md:w-7" />
              </motion.button>

              {/* Image Container */}
              <div className="relative w-full">
                <motion.img 
                  src={selectedImage} 
                  alt="Gallery Full View" 
                  className="w-full h-auto max-h-[60vh] sm:max-h-[70vh] md:max-h-[80vh] object-contain"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                />
              </div>

              {/* Share Section - Responsive Layout */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="bg-background/98 backdrop-blur-md border-t border-accent/20 p-3 xs:p-4 sm:p-5 md:p-6 space-y-3 xs:space-y-3 sm:space-y-4"
              >
                {/* Share Label */}
                <div className="flex items-center gap-2">
                  <Share2 className="w-4 xs:w-5 sm:w-5 text-accent" />
                  <span className="text-xs xs:text-sm sm:text-base font-semibold text-accent">
                    Share this moment
                  </span>
                </div>

                {/* Share Buttons */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="flex flex-wrap gap-2 xs:gap-3 sm:gap-4"
                >
                  <ShareButtons 
                    title="High Spirits Gallery" 
                    description="Check out this beautiful moment from our restaurant"
                    showLabel={false}
                    size="md"
                  />
                </motion.div>

                {/* Image Info */}
                <div className="text-xs xs:text-sm sm:text-base text-muted-foreground pt-2 xs:pt-3 sm:pt-4 border-t border-accent/10">
                  Click outside or press the X button to close
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reservation CTA */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-muted-foreground mb-3 xs:mb-4 sm:mb-5 md:mb-6 text-sm xs:text-base sm:text-lg">
              Experience it yourself
            </p>

            <button
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-4 xs:px-5 sm:px-6 md:px-8 py-2.5 xs:py-3 sm:py-3 md:py-4 rounded-md gold-glow transition-all duration-300 text-xs xs:text-sm sm:text-base"
              onClick={() => window.location.href = '/reservations'}
            >
              Make a Reservation
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Gallery;
