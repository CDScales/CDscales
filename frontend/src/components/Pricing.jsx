import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { pricingPlans } from '../data/mock';
import { Check, Star } from 'lucide-react';

export const Pricing = () => {
  const scrollToBooking = () => {
    const element = document.getElementById('booking');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Simple, Transparent <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">Pricing</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your business. All plans include quality design and professional development.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <Card 
              key={plan.id}
              className={`relative p-8 transition-all duration-500 transform hover:scale-105 ${
                plan.popular 
                  ? 'border-4 border-purple-600 shadow-2xl bg-gradient-to-br from-white to-purple-50' 
                  : 'border-2 border-gray-200 hover:border-purple-300 hover:shadow-xl'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
                    <Star className="w-4 h-4 fill-current" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan Name */}
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              
              {/* Price */}
              <div className="mb-4">
                <span className="text-5xl font-bold text-gray-900">${plan.price}</span>
                <span className="text-gray-500 ml-2">one-time</span>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-6 leading-relaxed">{plan.description}</p>

              {/* CTA Button */}
              <Button 
                onClick={scrollToBooking}
                className={`w-full mb-6 font-semibold py-6 transition-all duration-300 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white shadow-lg hover:shadow-xl'
                    : 'bg-gray-900 hover:bg-purple-600 text-white'
                }`}
              >
                Get Started
              </Button>

              {/* Features List */}
              <div className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                      plan.popular ? 'bg-purple-600' : 'bg-gray-900'
                    }`}>
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Background Gradient Effect */}
              {plan.popular && (
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-purple-400/5 to-purple-600/5 pointer-events-none"></div>
              )}
            </Card>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 text-lg">
            Not sure which plan is right for you?{' '}
            <button 
              onClick={scrollToBooking}
              className="text-purple-600 font-semibold hover:text-purple-700 underline transition-colors"
            >
              Book a free call
            </button>
            {' '}and we'll help you choose.
          </p>
        </div>
      </div>
    </section>
  );
};
