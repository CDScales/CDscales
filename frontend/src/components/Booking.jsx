import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Calendar, Clock, User, Mail, Phone, Globe } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Common timezones
const timezones = [
  { value: 'America/New_York', label: 'Eastern Time (ET)' },
  { value: 'America/Chicago', label: 'Central Time (CT)' },
  { value: 'America/Denver', label: 'Mountain Time (MT)' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
  { value: 'Europe/London', label: 'London (GMT)' },
  { value: 'Europe/Paris', label: 'Central European (CET)' },
  { value: 'Europe/Warsaw', label: 'Warsaw (CET)' },
  { value: 'Asia/Dubai', label: 'Dubai (GST)' },
  { value: 'Asia/Kolkata', label: 'India (IST)' },
  { value: 'Asia/Singapore', label: 'Singapore (SGT)' },
  { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
  { value: 'Australia/Sydney', label: 'Sydney (AEST)' },
];

export const Booking = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    timezone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleTimezoneChange = (value) => {
    setFormData({
      ...formData,
      timezone: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await axios.post(`${API}/booking`, formData);
      
      if (response.data.success) {
        toast.success('Call booked successfully!', {
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
          timezone: '',
          message: ''
        });
      }
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Failed to book call', {
        description: 'Please try again or contact us directly.',
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
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

            {/* Preferred Date, Time and Timezone */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

              <div>
                <label htmlFor="timezone" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-purple-600" />
                  Your Timezone *
                </label>
                <Select value={formData.timezone} onValueChange={handleTimezoneChange} required>
                  <SelectTrigger className="border-2 border-gray-200 focus:border-purple-500 focus:ring-purple-500">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    {timezones.map((tz) => (
                      <SelectItem key={tz.value} value={tz.value}>
                        {tz.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-semibold py-6 text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Booking...' : 'Book Free Call'}
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
