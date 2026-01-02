import React, { useRef, useEffect, useState } from 'react';
import { writingSamples } from '../data/mock';
import { Card } from './ui/card';
import { ExternalLink, Filter } from 'lucide-react';
import { Button } from './ui/button';

const WritingPortfolio = () => {
  const [filter, setFilter] = useState('All');
  const [visibleItems, setVisibleItems] = useState([]);
  const sectionRef = useRef(null);
  const itemRefs = useRef([]);

  const categories = ['All', 'Blockchain', 'DevOps', 'Cloud Security'];

  const filteredSamples = filter === 'All' 
    ? writingSamples 
    : writingSamples.filter(sample => sample.category === filter);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = itemRefs.current.indexOf(entry.target);
            if (index !== -1 && !visibleItems.includes(index)) {
              setVisibleItems((prev) => [...prev, index]);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [filteredSamples]);

  return (
    <section id="work" ref={sectionRef} className="py-24 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Writing <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Portfolio</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full mb-4" />
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Featured documentation work across blockchain, DevOps, and cloud security domains
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <div className="flex items-center gap-2 text-slate-400 mr-2">
            <Filter className="w-5 h-5" />
            <span className="font-medium">Filter:</span>
          </div>
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                filter === category
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50'
                  : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700 hover:text-cyan-400 border border-slate-700'
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSamples.map((sample, index) => (
            <div
              key={sample.id}
              ref={(el) => (itemRefs.current[index] = el)}
              className={`transform transition-all duration-700 ${visibleItems.includes(index) ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <Card className="group h-full bg-slate-900/50 backdrop-blur-sm border-slate-700/50 hover:border-cyan-500/50 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/10">
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-slate-800">
                  <img
                    src={sample.image}
                    alt={sample.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                  
                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-slate-900/80 backdrop-blur-sm border border-cyan-500/30 rounded-full text-cyan-400 text-xs font-semibold">
                      {sample.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Company */}
                  <p className="text-cyan-400 text-sm font-semibold mb-2">{sample.company}</p>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                    {sample.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">
                    {sample.description}
                  </p>

                  {/* Link button */}
                  {sample.link !== '#' && (
                    <a
                      href={sample.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium text-sm group/link"
                    >
                      View Documentation
                      <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </a>
                  )}
                </div>

                {/* Bottom gradient line */}
                <div className="h-1 bg-gradient-to-r from-cyan-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </Card>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredSamples.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">No samples found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default WritingPortfolio;