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
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Work <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Experience</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full mb-4" />
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            8+ years crafting documentation for industry leaders and innovative startups
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-cyan-500/50 via-blue-500/50 to-cyan-500/50" />

          {/* Experience items */}
          <div className="space-y-12">
            {experience.map((job, index) => (
              <div
                key={job.id}
                ref={(el) => (itemRefs.current[index] = el)}
                className={`relative transform transition-all duration-700 ${visibleItems.includes(index) ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
              >
                {/* Timeline dot */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-8">
                  <div className="w-6 h-6 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full border-4 border-slate-950 shadow-lg shadow-cyan-500/50 animate-pulse" />
                </div>

                {/* Content card - alternating sides */}
                <div className={`md:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'}`}>
                  <Card className="p-6 md:p-8 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-sm border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 group hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/10">
                    {/* Company badge */}
                    <div className="inline-block mb-4">
                      <span className="px-4 py-1.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-semibold">
                        {job.domain}
                      </span>
                    </div>

                    {/* Company name and role */}
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                        {job.company}
                      </h3>
                      <div className="flex items-center gap-2 text-cyan-400 font-semibold text-lg mb-3">
                        <Briefcase className="w-5 h-5" />
                        {job.role}
                      </div>
                      <div className="flex flex-wrap gap-4 text-slate-400 text-sm">
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

                    {/* Description */}
                    <p className="text-slate-300 mb-4 leading-relaxed">
                      {job.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-2">
                      {job.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <div className="mt-1.5 w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0" />
                          <p className="text-slate-400 text-sm leading-relaxed">{highlight}</p>
                        </div>
                      ))}
                    </div>

                    {/* Hover effect line */}
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b" />
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;