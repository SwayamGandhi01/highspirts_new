import { motion } from 'framer-motion';
import { MessageCircle, Phone, Mail, X } from 'lucide-react';
import { useState } from 'react';

const ContactWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  const contactOptions = [
    {
      id: 'whatsapp',
      icon: MessageCircle,
      label: 'WhatsApp',
      bgColor: 'bg-green-500',
      href: 'https://wa.me/61412345678?text=Hi%2C%20I%27d%20like%20to%20inquire%20about%20your%20restaurant',
      tooltip: 'Chat with us on WhatsApp',
    },
    {
      id: 'phone',
      icon: Phone,
      label: 'Call Us',
      bgColor: 'bg-blue-500',
      href: 'tel:+61412345678',
      tooltip: 'Give us a call',
    },
    {
      id: 'email',
      icon: Mail,
      label: 'Email',
      bgColor: 'bg-gray-500',
      href: 'mailto:info@highspirits.com.au?subject=Restaurant%20Inquiry',
      tooltip: 'Send us an email',
    },
  ];

  return (
    <>
      {/* Contact Widget Container */}
      <div className="fixed bottom-2 right-2 sm:bottom-4 sm:right-4 md:bottom-6 md:right-6 lg:bottom-8 lg:right-8 z-40 flex flex-col items-end gap-1.5 sm:gap-2 md:gap-3 max-w-xs">
        {/* Expanded Contact Options */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isOpen ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-1.5 sm:gap-2 md:gap-3"
          style={{
            pointerEvents: isOpen ? 'auto' : 'none',
          }}
        >
          {contactOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-1 sm:gap-2 md:gap-3 justify-end"
              >
                {/* Tooltip - Hidden on small screens */}
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
                  transition={{ delay: index * 0.1 + 0.1 }}
                  className="hidden md:block bg-slate-900 text-white px-2 md:px-3 py-1 md:py-2 rounded text-xs md:text-sm font-medium whitespace-nowrap"
                >
                  {option.tooltip}
                </motion.div>

                {/* Contact Button - Responsive sizing */}
                <motion.a
                  href={option.href}
                  target={option.id === 'whatsapp' ? '_blank' : undefined}
                  rel={option.id === 'whatsapp' ? 'noopener noreferrer' : undefined}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full ${option.bgColor} text-white shadow-md sm:shadow-lg transition-all duration-300 flex-shrink-0`}
                >
                  <Icon size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </motion.a>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Main Toggle Button - Responsive sizing */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-accent text-accent-foreground shadow-md sm:shadow-lg transition-all duration-300 relative flex-shrink-0"
        >
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? <X size={20} className="sm:w-6 sm:h-6 md:w-7 md:h-7" /> : <MessageCircle size={20} className="sm:w-6 sm:h-6 md:w-7 md:h-7" />}
          </motion.div>

          {/* Pulsing Indicator */}
          {!isOpen && (
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="absolute inset-0 rounded-full border-2 border-accent"
            />
          )}
        </motion.button>
      </div>

      {/* Background Overlay - Click to Close */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm"
        />
      )}
    </>
  );
};

export default ContactWidget;
