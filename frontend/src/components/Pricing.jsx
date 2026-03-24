import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { pricingPlans, monthlyManagement } from '../data/mock';
import { Check, Star, Repeat, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Pricing = () => {
  const { t, formatPrice } = useApp();

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
            {t.pricing.title} <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">{t.pricing.titleHighlight}</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t.pricing.subtitle}
          </p>
        </div>

        {/* Single Pricing Card */}
        <div className="max-w-2xl mx-auto mb-16">
          {pricingPlans.map((plan) => (
            <Card 
              key={plan.id}
              className="relative p-10 border-4 border-purple-600 shadow-2xl bg-gradient-to-br from-white to-purple-50"
            >
              {/* Popular Badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                  <Star className="w-4 h-4 fill-current" />
                  Best Value Package
                </div>
              </div>

              {/* Plan Name */}
              <h3 className="text-3xl font-bold text-gray-900 mb-3 text-center mt-4">{plan.name}</h3>
              
              {/* Price */}
              <div className="mb-6 text-center">
                <span className="text-6xl font-bold text-gray-900">{formatPrice(plan.priceUSD)}</span>
                <span className="text-gray-500 ml-2 text-lg">{t.pricing.oneTime}</span>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-8 leading-relaxed text-center text-lg">{plan.description}</p>

              {/* CTA Button */}
              <Button 
                onClick={scrollToBooking}
                className="w-full mb-8 font-semibold py-7 text-xl bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                {t.pricing.getStarted}
              </Button>

              {/* Features List */}
              <div className="space-y-4">
                <h4 className="font-bold text-gray-900 text-lg mb-4">What's Included:</h4>
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center bg-purple-600">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700 text-lg">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Background Gradient Effect */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-purple-400/5 to-purple-600/5 pointer-events-none"></div>
            </Card>
          ))}
        </div>

        {/* Monthly Management - Required */}
        <div className="max-w-5xl mx-auto">
          <Card className="p-10 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 text-white shadow-2xl border-4 border-purple-500 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

            {/* Required Badge */}
            <div className="absolute -top-3 -right-3">
              <div className="bg-yellow-400 text-purple-900 px-4 py-2 rounded-lg text-sm font-bold shadow-xl flex items-center gap-2 rotate-12">
                <AlertCircle className="w-4 h-4" />
                REQUIRED
              </div>
            </div>

            <div className="relative z-10">
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
                <Repeat className="w-8 h-8 text-white" />
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-4xl font-bold mb-4">{t.pricing.monthlyManagement}</h3>
                  
                  {/* Required Notice */}
                  <div className="bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-xl p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                      <p className="text-white font-semibold text-sm">
                        This service is mandatory to keep your website secure, updated, and running smoothly at all times.
                      </p>
                    </div>
                  </div>

                  <p className="text-purple-100 text-lg mb-6 leading-relaxed">
                    {t.pricing.monthlyDescription}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {monthlyManagement.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-purple-200 flex-shrink-0" />
                        <span className="text-purple-100">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center md:text-right">
                  <div className="mb-6">
                    <div className="text-7xl font-bold mb-2">{formatPrice(monthlyManagement.priceUSD)}</div>
                    <div className="text-purple-200 text-2xl">{t.pricing.perMonth}</div>
                  </div>

                  <Button 
                    onClick={scrollToBooking}
                    size="lg"
                    className="bg-white text-purple-900 hover:bg-gray-100 font-bold px-10 py-7 text-xl transition-all duration-300 transform hover:scale-105 shadow-xl w-full md:w-auto"
                  >
                    {t.pricing.subscribeNow}
                  </Button>
                  
                  <p className="text-purple-200 text-sm mt-4">
                    Included with every website package
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Bottom Note */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 text-lg">
            {t.pricing.notSure}{' '}
            <button 
              onClick={scrollToBooking}
              className="text-purple-600 font-semibold hover:text-purple-700 underline transition-colors"
            >
              {t.pricing.bookCall}
            </button>
            {' '}{t.pricing.helpText}
          </p>
        </div>
      </div>
    </section>
  );
};
