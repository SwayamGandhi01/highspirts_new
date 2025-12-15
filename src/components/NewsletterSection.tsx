import { motion } from 'framer-motion';
import { Mail, Check } from 'lucide-react';
import { useState } from 'react';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Basic email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    try {
      // Post to Strapi API
      const response = await fetch('https://calm-actor-864a39d720.strapiapp.com/api/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            email: email,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to subscribe');
      }

      setEmail('');
      setIsSuccess(true);

      // Reset success state after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    } catch (err) {
      setError('Failed to subscribe. Please try again.');
      console.error('Subscription error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative w-full py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden bg-black">
      {/* Background Gradient - Using primary green */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-primary/20 to-primary/30"></div>

      {/* Content Container */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-4 sm:space-y-6 mb-8 sm:mb-10"
        >
          {/* Mail Icon */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-accent/20 rounded-full"
          >
            <Mail className="w-6 h-6 sm:w-7 sm:h-7 text-accent" />
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground"
          >
            Join Our Culinary Circle
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-sm sm:text-base md:text-lg text-muted-foreground"
          >
            Exclusive offers, menu previews, and dining tips delivered to your inbox
          </motion.p>

          {/* Incentive Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="inline-block bg-accent/20 text-accent px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold"
          >
            ✨ Get 10% off your first visit
          </motion.div>
        </motion.div>

        {/* Newsletter Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="space-y-3 sm:space-y-4"
        >
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-2">
            {/* Email Input */}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              disabled={isLoading || isSuccess}
              className="flex-1 px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg border-2 border-input bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
            />

            {/* Subscribe Button */}
            <motion.button
              type="submit"
              disabled={isLoading || isSuccess}
              whileHover={{ scale: isLoading || isSuccess ? 1 : 1.02 }}
              whileTap={{ scale: isLoading || isSuccess ? 1 : 0.98 }}
              className="px-6 sm:px-8 py-2.5 sm:py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-fit text-sm sm:text-base"
            >
              {isSuccess ? (
                <>
                  <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">Subscribed!</span>
                  <span className="sm:hidden">Done!</span>
                </>
              ) : isLoading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-accent-foreground border-t-transparent rounded-full"
                  />
                  <span className="hidden sm:inline">Subscribing...</span>
                </>
              ) : (
                <>
                  <span>Subscribe Now</span>
                </>
              )}
            </motion.button>
          </div>

          {/* Error Message */}
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-xs sm:text-sm text-center"
            >
              {error}
            </motion.p>
          )}

          {/* Success Message */}
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-primary/20 border-2 border-primary text-foreground px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm text-center"
            >
              ✓ Thank you for subscribing! Check your email for your exclusive offer.
            </motion.div>
          )}
        </motion.form>

        {/* Privacy Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center text-xs sm:text-sm text-muted-foreground mt-6 sm:mt-8"
        >
          We respect your privacy. Unsubscribe anytime.
        </motion.p>
      </div>
    </section>
  );
};

export default NewsletterSection;
