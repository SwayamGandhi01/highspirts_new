import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon, Clock, Users } from 'lucide-react';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const Reservations = () => {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>('');
  const [currentBanner, setCurrentBanner] = useState(0);
  const [nextBanner, setNextBanner] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    guests: '',
    specialRequests: '',
    occasion: '',
  });

  const banners = ['/banner.jpg', '/banner1.jpg'];

  useEffect(() => {
    const displayTimer = setTimeout(() => {
      setIsTransitioning(true);
    }, 7000);

    const changeTimer = setTimeout(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
      setNextBanner((prev) => (prev + 1) % banners.length);
      setIsTransitioning(false);
    }, 8500);

    return () => {
      clearTimeout(displayTimer);
      clearTimeout(changeTimer);
    };
  }, [currentBanner]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleOccasionChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      occasion: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !time) {
      toast.error('Please select both date and time');
      return;
    }

    if (!formData.guests) {
      toast.error('Please select number of guests');
      return;
    }

    setIsLoading(true);

    try {
      // Combine date and time for the API
      const [hours, minutes] = time.split(':');
      const dateTime = new Date(date);
      dateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

      const payload = {
        data: {
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim(),
          phone: parseInt(formData.phone.trim()) || 0,
          dateTime: dateTime.toISOString(),
          guests: parseInt(formData.guests),
          specialRequests: formData.specialRequests.trim() || '',
          occasion: formData.occasion.trim() || '',
        },
      };

      const response = await fetch('https://calm-actor-864a39d720.strapiapp.com/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.error('API Error:', responseData);
        throw new Error(responseData.error?.message || 'Failed to submit reservation');
      }

      toast.success('Reservation request submitted! We\'ll confirm your booking shortly.');
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        guests: '',
        specialRequests: '',
        occasion: '',
      });
      setDate(undefined);
      setTime('');
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit reservation. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section with Banner Carousel */}
      <section className="relative w-full mt-20 overflow-hidden" style={{height: '850px'}}>
        {/* Current Banner - Base Layer */}
        <div
          className="absolute inset-0 transition-opacity duration-1500 ease-in-out"
          style={{
            backgroundImage: `url(${banners[currentBanner]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: isTransitioning ? 0 : 1,
          }}
        />
        
        {/* Next Banner - Overlay Layer */}
        <div
          className="absolute inset-0 transition-opacity duration-1500 ease-in-out"
          style={{
            backgroundImage: `url(${banners[nextBanner]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: isTransitioning ? 1 : 0,
          }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 pointer-events-none"></div>
      </section>

      {/* Reservation Form */}
      <section className="py-24 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4">
          {/* Text Section Above Form */}
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-accent font-inter tracking-widest mb-4 uppercase text-sm"
            >
              Reserve Your Table
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-playfair font-bold text-luxury mb-6"
            >
              Book a Table
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-foreground max-w-2xl mx-auto"
            >
              Secure your spot for an unforgettable dining experience
            </motion.p>
          </div>

          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="glass-effect rounded-lg p-8 md:p-12"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-foreground">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="bg-secondary/50 border-accent/20 focus:border-accent"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-foreground">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="bg-secondary/50 border-accent/20 focus:border-accent"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-secondary/50 border-accent/20 focus:border-accent"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-foreground">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="bg-secondary/50 border-accent/20 focus:border-accent"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label className="text-foreground flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-accent" />
                      Date
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            'w-full justify-start text-left font-normal bg-secondary/50 border-accent/20',
                            !date && 'text-muted-foreground'
                          )}
                        >
                          {date ? format(date, 'PPP') : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-foreground flex items-center gap-2">
                      <Clock className="w-4 h-4 text-accent" />
                      Time
                    </Label>
                    <Select value={time} onValueChange={setTime} required>
                      <SelectTrigger className="bg-secondary/50 border-accent/20">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 14 }, (_, i) => {
                          const hour = Math.floor((17 + i * 0.5) % 24);
                          const minute = i % 2 === 0 ? '00' : '30';
                          return (
                            <SelectItem key={i} value={`${hour}:${minute}`}>
                              {hour}:{minute} {hour >= 12 ? 'PM' : 'AM'}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-foreground flex items-center gap-2">
                      <Users className="w-4 h-4 text-accent" />
                      Guests
                    </Label>
                    <Select value={formData.guests} onValueChange={(value) => setFormData(prev => ({ ...prev, guests: value }))} required>
                      <SelectTrigger className="bg-secondary/50 border-accent/20">
                        <SelectValue placeholder="Select guests" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 10 }, (_, i) => (
                          <SelectItem key={i + 1} value={`${i + 1}`}>
                            {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-foreground">Occasion (Optional)</Label>
                  <Select value={formData.occasion} onValueChange={handleOccasionChange}>
                    <SelectTrigger className="bg-secondary/50 border-accent/20">
                      <SelectValue placeholder="Select occasion" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="birthday,">Birthday</SelectItem>
                      <SelectItem value="anniversary,">Anniversary</SelectItem>
                      <SelectItem value="business party,">Business Meeting</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialRequests" className="text-foreground">
                    Special Requests (Optional)
                  </Label>
                  <Textarea
                    id="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    placeholder="Dietary restrictions, special occasions, seating preferences..."
                    className="bg-secondary/50 border-accent/20 focus:border-accent min-h-[100px]"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  size="lg"
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-lg py-6 gold-glow disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Submitting...' : 'Confirm Reservation'}
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  Reservations are subject to availability. We'll confirm your booking via email within 24 hours.
                </p>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-12 text-center"
            >
              <p className="text-muted-foreground mb-4">
                Need immediate assistance? Call us directly
              </p>
              <a
                href="tel:+61234567890"
                className="text-2xl font-playfair font-bold text-accent hover:text-accent/80 transition-colors"
              >
                +61 2 3456 7890
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Reservations;