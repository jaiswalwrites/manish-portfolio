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
  }, [filteredSamples, visibleItems]);

  return (
    <section id="work" ref={sectionRef} className="py-32 bg-slate-900 relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4">Writing Portfolio</h2>
          <div className="w-24 h-px bg-gradient-to-r from-amber-500 to-transparent mb-4" />
          <p className="text-xl text-slate-400 font-light">
            Featured documentation work across blockchain, DevOps, and cloud security
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center gap-3 mb-12">
          <div className="flex items-center gap-2 text-slate-400 mr-2">
            <Filter className="w-5 h-5" />
            <span className="font-light">Filter:</span>
          </div>
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 font-light transition-all duration-300 ${
                filter === category
                  ? 'bg-amber-500 text-slate-950 hover:bg-amber-600'
                  : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-amber-500 border border-slate-700'
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
              className={`transform transition-all duration-700 ${visibleItems.includes(index) ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <Card className="group h-full bg-slate-800/30 border-slate-700/30 hover:border-amber-500/30 overflow-hidden transition-all duration-500 hover:bg-slate-800/50">
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-slate-900">
                  <img
                    src={sample.image}
                    alt={sample.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-60" />
                  
                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-slate-900/80 border border-amber-500/30 text-amber-500 text-xs font-light">
                      {sample.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Company */}
                  <p className="text-amber-500 text-sm font-light mb-2">{sample.company}</p>
                  
                  {/* Title */}
                  <h3 className="text-xl font-light text-white mb-3 group-hover:text-amber-500 transition-colors duration-300">
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
                      className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 font-light text-sm group/link"
                    >
                      View Documentation
                      <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </a>
                  )}
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WritingPortfolio;