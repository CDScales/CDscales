import React from 'react';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

export const FinalCTA = () => {
  const scrollToBooking = () => {
    const element = document.getElementById('booking');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Main Message */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Stop Losing Clients
          <span className="block mt-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Without a Website
          </span>
        </h2>

        <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          Every day without a professional website is a day you're losing potential clients to your competitors. Let's change that.
        </p>

        {/* CTA Button */}
        <Button 
          onClick={scrollToBooking}
          size="lg"
          className="bg-white text-purple-900 hover:bg-gray-100 font-bold px-12 py-8 text-xl group transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-3xl"
        >
          Book Your Free Call Now
          <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
        </Button>

        {/* Value Props */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 text-purple-200">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            <span>Free consultation</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            <span>No obligation</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            <span>Quick turnaround</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            <span>Results guaranteed</span>
          </div>
        </div>
      </div>
    </section>
  );
};
