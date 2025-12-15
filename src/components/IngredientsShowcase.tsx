import { motion } from 'framer-motion';

const IngredientsShowcase = () => {
  const ingredients = [
    {
      name: "Signature Butter Chicken",
      origin: "Chef's Special",
      image: "/signature buuter chicken.jpg",
      description: "Succulent chicken in a velvety tomato and butter sauce, perfected over two decades with a touch of cream and aromatic spices"
    },
    {
      name: "Tandoori Mixed Grill",
      origin: "Signature Selection",
      image: "/tandoori mixed grill.jpg",
      description: "Premium selection of tandoor-roasted meats, marinated in aromatic spices and Australian native herbs, served sizzling"
    },
    {
      name: "Biryani Royale",
      origin: "Royal Heritage",
      image: "/biryani royale.jpg",
      description: "Fragrant basmati rice layered with tender lamb, saffron, and 23 secret spices—a royal feast for the discerning palate"
    },
    {
      name: "Dal Makhani",
      origin: "Punjab Tradition",
      image: "/truffle dal makhani.jpg",
      description: "18-hour slow-cooked black lentils finished with cream and Australian black truffle, a luxurious rendition of a classic"
    },
    {
      name: "Palak Paneer",
      origin: "Farm Fresh",
      image: "/plaak paneer  supreme.jpg",
      description: "Silky spinach sauce with house-made paneer, enhanced with organic Victorian produce and aromatic spices"
    },
    {
      name: "Tasmanian Lamb Rogan Josh",
      origin: "Tasmania Excellence",
      image: "/rasmanian lamb.jpg",
      description: "Premium Tasmanian lamb in aromatic Kashmiri gravy—where Australian excellence meets authentic Indian culinary tradition"
    }
  ];

  return (
    <section className="py-32 bg-gradient-to-b from-background to-secondary/20 relative overflow-hidden">
      {/* Animated background pattern */}
      <motion.div
        animate={{ 
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(203, 161, 53, 0.4) 0%, transparent 50%)`,
          backgroundSize: '200% 200%'
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-center mb-20"
        >
          <motion.p
            className="text-accent font-inter tracking-widest mb-4 uppercase text-sm"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            From Farm to Table
          </motion.p>
       <h2
  className="
    font-playfair font-bold text-luxury mb-6 text-center
    whitespace-normal break-words leading-tight
    text-[clamp(2.2rem,6vw,4.2rem)]
  "
>
  Premium Ingredients
</h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A harmonious fusion of the finest Australian produce and authentic Indian heritage ingredients
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {ingredients.map((ingredient, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="group relative overflow-hidden rounded-2xl elegant-shadow cursor-pointer"
            >
              {/* Image with macro effect */}
              <div className="relative h-96 overflow-hidden">
                <motion.img
                  src={ingredient.image}
                  alt={ingredient.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  whileHover={{ filter: 'brightness(1.1)' }}
                />
                
                {/* Gold glow on hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-t from-accent/30 via-transparent to-transparent"
                  transition={{ duration: 0.5 }}
                />
                
                {/* Golden shimmer effect */}
                <motion.div
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/20 to-transparent skew-x-12"
                />
              </div>

              {/* Content overlay */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 + 0.3 }}
                className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-primary via-primary/95 to-transparent"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-3xl font-playfair font-bold text-luxury">
                    {ingredient.name}
                  </h3>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-2 h-2 bg-accent rounded-full gold-glow"
                  />
                </div>
                
                <p className="text-accent text-sm font-semibold mb-3 tracking-wider uppercase">
                  {ingredient.origin}
                </p>
                
                <p className="text-foreground/90 leading-relaxed">
                  {ingredient.description}
                </p>
              </motion.div>

              {/* Border glow */}
              <div className="absolute inset-0 border-2 border-accent/0 group-hover:border-accent/30 rounded-2xl transition-all duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Sustainability message */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="mt-20 text-center glass-effect rounded-2xl p-12 max-w-4xl mx-auto"
        >
          <h3 className="text-3xl font-playfair font-bold text-foreground mb-4">
            Ethical Sourcing & Sustainability
          </h3>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Every ingredient tells a story of respect—for the land, for tradition, and for the future. 
            We partner exclusively with farmers and suppliers who share our commitment to sustainable practices, 
            fair trade, and environmental stewardship. From organic farms in Victoria to heritage producers in Punjab, 
            our supply chain reflects our values of quality, integrity, and responsibility.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default IngredientsShowcase;
