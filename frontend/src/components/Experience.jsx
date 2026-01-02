import React, { useRef, useEffect, useState } from 'react';
import { experience } from '../data/mock';
import { Card } from './ui/card';
import { Briefcase, MapPin, Calendar } from 'lucide-react';

const Experience = () => {
  const [visibleItems, setVisibleItems] = useState([]);
  const sectionRef = useRef(null);
  const itemRefs = useRef([]);

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
  }, [visibleItems]);

  return (
    <section id="experience" ref={sectionRef} className="py-32 bg-slate-950 relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4">Experience</h2>
          <div className="w-24 h-px bg-gradient-to-r from-amber-500 to-transparent mb-4" />
          <p className="text-xl text-slate-400 font-light">
            8+ years crafting documentation for industry leaders and innovative startups
          </p>
        </div>

        {/* Experience items */}
        <div className="space-y-8">
          {experience.map((job, index) => (
            <div
              key={job.id}
              ref={(el) => (itemRefs.current[index] = el)}
              className={`transform transition-all duration-700 ${visibleItems.includes(index) ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            >
              <Card className="p-8 bg-slate-900/30 border-slate-800/50 hover:border-amber-500/30 hover:bg-slate-900/50 transition-all duration-500">
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                  <div className="flex-1">
                    <h3 className="text-2xl font-light text-white mb-2">
                      {job.company}
                    </h3>
                    <div className="flex items-center gap-2 text-amber-500 font-light text-lg mb-3">
                      <Briefcase className="w-5 h-5" />
                      {job.role}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="inline-block px-4 py-1.5 border border-amber-500/30 text-amber-500 text-sm mb-2">
                      {job.domain}
                    </div>
                    <div className="flex items-center gap-4 text-slate-400 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {job.duration}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-300 mb-6 leading-relaxed">
                  {job.description}
                </p>

                {/* Highlights */}
                <div className="space-y-3 border-t border-slate-800 pt-6">
                  {job.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="mt-1.5 w-1.5 h-1.5 bg-amber-500 flex-shrink-0" />
                      <p className="text-slate-400 text-sm leading-relaxed">{highlight}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;