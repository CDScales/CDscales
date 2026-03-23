import React, { useState } from 'react';
import { Card } from './ui/card';
import { portfolioItems } from '../data/mock';
import { ExternalLink } from 'lucide-react';

export const Portfolio = () => {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section id="portfolio" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">Work</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Showcasing websites that deliver results for our clients
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item) => (
            <Card 
              key={item.id}
              className="group relative overflow-hidden cursor-pointer border-2 border-gray-200 hover:border-purple-400 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl"
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-purple-900/90 via-purple-800/50 to-transparent transition-opacity duration-500 ${
                  hoveredId === item.id ? 'opacity-100' : 'opacity-0'
                }`}></div>

                {/* Content Overlay */}
                <div className={`absolute inset-0 flex flex-col justify-end p-6 transition-all duration-500 ${
                  hoveredId === item.id ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold text-purple-300 bg-purple-900/50 px-2 py-1 rounded">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <div className="flex items-center gap-2 text-white">
                    <span className="text-sm">View Project</span>
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Static Info (Visible when not hovering) */}
              <div className={`p-4 transition-opacity duration-500 ${
                hoveredId === item.id ? 'opacity-0' : 'opacity-100'
              }`}>
                <span className="text-xs font-semibold text-purple-600 uppercase tracking-wide">
                  {item.category}
                </span>
                <h3 className="text-lg font-bold text-gray-900 mt-1">{item.title}</h3>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
