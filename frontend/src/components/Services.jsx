import React from 'react';
import { Card } from './ui/card';
import { services } from '../data/mock';
import { CheckCircle } from 'lucide-react';

export const Services = () => {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive web solutions tailored to your business needs
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={service.id}
              className="p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-2 border-transparent hover:border-purple-300 group bg-gradient-to-br from-white to-purple-50/30"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="space-y-3">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-400 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
            </Card>
          ))}
        </div>

        {/* Post-Website Management Highlight */}
        <div className="mt-16 text-center bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-12 text-white">
          <h3 className="text-3xl font-bold mb-4">Post-Website Management</h3>
          <p className="text-lg text-purple-100 max-w-3xl mx-auto mb-6">
            Your website needs ongoing care to stay fresh and perform well. We provide regular updates, maintenance, improvements, and optimization so you can focus on running your business.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-purple-100">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>Regular Updates</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>Content Maintenance</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>Performance Optimization</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>Ongoing Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
