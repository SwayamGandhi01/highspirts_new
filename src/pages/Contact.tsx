import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('https://calm-actor-864a39d720.strapiapp.com/api/contact-forms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            subject: formData.subject,
            message: formData.message,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      await response.json();
      toast.success("Message sent! We'll respond within 24 hours.");
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Location',
      details: ['1/57 Victoria Street', 'Bunbury 6230', 'Australia'],
    },
    {
      icon: Phone,
      title: 'Phone',
      details: ['0451382958', 'Mon-Sun: 9AM - 11PM'],
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@highspirit.com.au', 'events@highspirit.com.au'],
    },
    {
      icon: Clock,
      title: 'Opening Hours',
      details: [
        'Mon-Thu: 5:30PM - 11PM',
        'Fri-Sat: 5:30PM - 12AM',
        'Sunday: 5:30PM - 10:30PM',
      ],
    },
  ];

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
            Get in Touch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-playfair font-bold text-luxury mb-6"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-foreground max-w-2xl mx-auto"
          >
            We're here to answer your questions and make your experience perfect
          </motion.p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-12 md:py-16 lg:py-24 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-playfair font-bold text-luxury mb-4 md:mb-6">
                  Visit Us Today
                </h2>
                <p className="text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed">
                  Whether you have questions about our menu, want to book a private event, or simply wish to share feedback, we'd love to hear from you.
                </p>
              </div>

              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start space-x-3 md:space-x-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-accent/20 flex items-center justify-center">
                    <info.icon className="w-5 h-5 md:w-6 md:h-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base md:text-lg font-semibold text-foreground mb-1 md:mb-2">
                      {info.title}
                    </h3>
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-xs md:text-sm text-muted-foreground">
                        {detail}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="glass-effect rounded-lg p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-playfair font-bold text-foreground mb-4 md:mb-6">
                  Send Us a Message
                </h3>
                <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-sm md:text-base text-foreground">
                      Your Name
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-secondary/50 border-accent/20 focus:border-accent text-sm md:text-base"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-sm md:text-base text-foreground">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-secondary/50 border-accent/20 focus:border-accent text-sm md:text-base"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-sm md:text-base text-foreground">
                      Phone (Optional)
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="bg-secondary/50 border-accent/20 focus:border-accent text-sm md:text-base"
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject" className="text-sm md:text-base text-foreground">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="bg-secondary/50 border-accent/20 focus:border-accent text-sm md:text-base"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-sm md:text-base text-foreground">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="bg-secondary/50 border-accent/20 focus:border-accent min-h-[120px] md:min-h-[150px] text-sm md:text-base"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isLoading}
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold gold-glow text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 md:py-16 lg:py-24 luxury-gradient">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-luxury mb-2 md:mb-4">
              Find Us
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-muted-foreground">
              Located in the heart of Bunbury's premium dining district
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto rounded-lg overflow-hidden elegant-shadow"
          >
            <div className="w-full aspect-video">
              <iframe
                title="High Spirits Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3015.5851989456766!2d115.32321!3d-33.336549!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2a32a1a1a1a1a1a1%3A0x1a1a1a1a1a1a1a1a!2s1%2F57%20Victoria%20Street%2C%20Bunbury%20WA%206230!5e0!3m2!1sen!2sau!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '300px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
