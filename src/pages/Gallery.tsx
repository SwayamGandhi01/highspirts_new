import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { useState } from 'react';

import image1 from '@/assets/1.png';
import image2 from '@/assets/2.png';
import image3 from '@/assets/3.png';
import image4 from '@/assets/4.png';
import image5 from '@/assets/5.png';
import heroDish1 from '@/assets/hero-dish-1.jpg';
import heroDish2 from '@/assets/hero-dish-2.jpg';
import heroDish3 from '@/assets/hero-dish-3.jpg';
import dalMakhani from '@/assets/dish-dal-makhani.jpg';
import palakPaneer from '@/assets/dish-palak-paneer.jpg';
import roganJosh from '@/assets/dish-rogan-josh.jpg';
import cocktail from '@/assets/cocktail-signature.jpg';
import winePairing from '@/assets/wine-pairing.jpg';
import restaurantAmbience from '@/assets/restaurant-ambience.jpg';
import Image2 from '@/assets/Image2.jpg';
import Image3 from '@/assets/Image3.jpg';
import Image4 from '@/assets/Image4.jpg';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const galleryImages = [
    // Dine Gallery
    { src: image1, alt: 'Restaurant 1', category: 'dine' },
    { src: restaurantAmbience, alt: 'Restaurant Ambience', category: 'dine' },
    { src: image2, alt: 'Restaurant 2', category: 'dine' },
    { src: Image2, alt: 'Restaurant Detail', category: 'dine' },
    { src: Image3, alt: 'Restaurant View', category: 'dine' },
    { src: image4, alt: 'Restaurant 4', category: 'dine' },
    
    // Food Gallery
    { src: heroDish1, alt: 'Signature Dish', category: 'food' },
    { src: dalMakhani, alt: 'Dal Makhani', category: 'food' },
    { src: heroDish2, alt: 'Tandoori Grill', category: 'food' },
    { src: palakPaneer, alt: 'Palak Paneer', category: 'food' },
    { src: heroDish3, alt: 'Biryani', category: 'food' },
    { src: roganJosh, alt: 'Rogan Josh', category: 'food' },
    
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
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-6 mb-12 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter('dine')}
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
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
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
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
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
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
            className="grid grid-cols-3 gap-4 md:gap-6"
          >
            {filteredImages.map((image, index) => (
              <motion.div
                key={`${image.alt}-${index}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedImage(image.src)}
                className="group relative overflow-hidden rounded-lg aspect-square cursor-pointer"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Overlay on hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-t from-accent/60 via-transparent to-transparent flex items-center justify-center"
                >
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={selectedImage} alt="Gallery" className="w-full h-auto rounded-lg" />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-accent text-accent-foreground rounded-full p-2 hover:bg-accent/90 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* Reservation CTA */}
      <section className="py-24 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-muted-foreground mb-6 text-lg">
              Experience it yourself
            </p>

            <button
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-8 py-4 rounded-md gold-glow transition-all duration-300"
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
