import React from 'react';
import { Card } from './ui/card';
import { Target, Zap, Building2, CheckCircle2, Headphones, Rocket } from 'lucide-react';
import { whyChooseUs } from '../data/mock';

const iconMap = {
  Target: Target,
  Zap: Zap,
  Building2: Building2,
  CheckCircle2: CheckCircle2,
  HeadphonesIcon: Headphones,
  Rocket: Rocket
};

export const WhyUs = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Why Choose <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">CDScales?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We focus on results, not empty promises. Here's what makes us different.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyChooseUs.map((feature, index) => {
            const IconComponent = iconMap[feature.icon];
            return (
              <Card 
                key={feature.id}
                className="p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-purple-200 group"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <div className="mb-4 inline-flex p-3 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
