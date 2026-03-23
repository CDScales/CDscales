import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/90 via-purple-800/85 to-black/90 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
          alt="Web Development"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <div className={`transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-8">
            <Sparkles className="w-4 h-4 text-purple-300" />
            <span className="text-sm font-medium text-white">Professional Web Development Agency</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            We Build Websites That
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-300 bg-clip-text text-transparent mt-2">
              Bring You Clients
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
            Helping small businesses and startups go online with high-converting websites that generate real results.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={() => scrollToSection('booking')}
              size="lg"
              className="bg-white text-purple-900 hover:bg-gray-100 font-semibold px-8 py-6 text-lg group transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              Book a Free Call
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              onClick={() => scrollToSection('services')}
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-purple-900 font-semibold px-8 py-6 text-lg transition-all duration-300 transform hover:scale-105"
            >
              Get Started
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 text-white">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-300">50+</div>
              <div className="text-sm text-gray-300 mt-1">Websites Launched</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-300">100%</div>
              <div className="text-sm text-gray-300 mt-1">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-300">7-14</div>
              <div className="text-sm text-gray-300 mt-1">Days Average Delivery</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};
