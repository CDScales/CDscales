import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              CDScales
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('services')} className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
              Services
            </button>
            <button onClick={() => scrollToSection('how-it-works')} className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
              Process
            </button>
            <button onClick={() => scrollToSection('pricing')} className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
              Pricing
            </button>
            <button onClick={() => scrollToSection('portfolio')} className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
              Portfolio
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
              Contact
            </button>
            <Button onClick={() => scrollToSection('booking')} className="bg-purple-600 hover:bg-purple-700 text-white">
              Book a Call
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-purple-600 transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 bg-white border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              <button onClick={() => scrollToSection('services')} className="text-gray-700 hover:text-purple-600 transition-colors font-medium text-left">
                Services
              </button>
              <button onClick={() => scrollToSection('how-it-works')} className="text-gray-700 hover:text-purple-600 transition-colors font-medium text-left">
                Process
              </button>
              <button onClick={() => scrollToSection('pricing')} className="text-gray-700 hover:text-purple-600 transition-colors font-medium text-left">
                Pricing
              </button>
              <button onClick={() => scrollToSection('portfolio')} className="text-gray-700 hover:text-purple-600 transition-colors font-medium text-left">
                Portfolio
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-purple-600 transition-colors font-medium text-left">
                Contact
              </button>
              <Button onClick={() => scrollToSection('booking')} className="bg-purple-600 hover:bg-purple-700 text-white w-full">
                Book a Call
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
