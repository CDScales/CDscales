import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Calendar, Clock, User, Mail, Phone } from 'lucide-react';
import { toast } from 'sonner';

export const Booking = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mock form submission
    console.log('Booking submitted:', formData);
    
    toast.success('Call booked successfully! We\'ll contact you soon.', {
      description: 'Check your email for confirmation details.',
      duration: 5000,
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      preferredDate: '',
      preferredTime: '',
      message: ''
    });
  };

  return (
    <section id="booking" className="py-24 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Book Your Free Call
          </h2>
          <p className="text-xl text-purple-100">
            No pressure, just a quick call to see if we can help your business grow
          </p>
        </div>

        {/* Booking Form */}
        <Card className="p-8 md:p-12 shadow-2xl border-4 border-purple-400/30 backdrop-blur-sm bg-white/95">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <User className="w-4 h-4 text-purple-600" />
                Full Name *
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="border-2 border-gray-200 focus:border-purple-500 focus:ring-purple-500 transition-colors"
              />
            </div>

            {/* Email and Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-purple-600" />
                  Email Address *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="border-2 border-gray-200 focus:border-purple-500 focus:ring-purple-500 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-purple-600" />
                  Phone Number *
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                  className="border-2 border-gray-200 focus:border-purple-500 focus:ring-purple-500 transition-colors"
                />
              </div>
            </div>

            {/* Preferred Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="preferredDate" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-600" />
                  Preferred Date
                </label>
                <Input
                  id="preferredDate"
                  name="preferredDate"
                  type="date"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  className="border-2 border-gray-200 focus:border-purple-500 focus:ring-purple-500 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="preferredTime" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-purple-600" />
                  Preferred Time
                </label>
                <Input
                  id="preferredTime"
                  name="preferredTime"
                  type="time"
                  value={formData.preferredTime}
                  onChange={handleChange}
                  className="border-2 border-gray-200 focus:border-purple-500 focus:ring-purple-500 transition-colors"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                Tell us about your project (optional)
              </label>
              <Textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="What kind of website do you need? Any specific features or goals?"
                className="border-2 border-gray-200 focus:border-purple-500 focus:ring-purple-500 transition-colors resize-none"
              />
            </div>

            {/* Submit Button */}
            <Button 
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-semibold py-6 text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Book Free Call
            </Button>

            <p className="text-center text-sm text-gray-500 mt-4">
              We typically respond within 24 hours
            </p>
          </form>
        </Card>

        {/* Trust Message */}
        <div className="text-center mt-8 text-purple-100">
          <p className="text-lg">
            ✓ No commitment required  •  ✓ Free consultation  •  ✓ Honest advice
          </p>
        </div>
      </div>
    </section>
  );
};
