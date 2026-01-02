import React, { useRef, useEffect, useState } from 'react';
import { neurals } from '../data/mock';
import { Card } from './ui/card';
import { ExternalLink, Check } from 'lucide-react';
import { Button } from './ui/button';

const Neurals = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="neurals" ref={sectionRef} className="py-32 bg-slate-900 relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="mb-20">
          <div className="mb-8">
            <img 
              src={neurals.logo} 
              alt="Neurals" 
              className="h-12 mb-6"
            />
            <div className="w-24 h-px bg-gradient-to-r from-amber-500 to-transparent mb-4" />
          </div>
          <p className="text-xl text-amber-500 font-light mb-4">{neurals.tagline}</p>
          <p className="text-2xl md:text-3xl text-white font-light leading-relaxed max-w-4xl">
            {neurals.description}
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {neurals.highlights.map((highlight, index) => (
            <Card 
              key={index}
              className={`p-6 bg-slate-800/50 border-slate-700/50 hover:border-amber-500/30 hover:bg-slate-800/70 transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <div className="w-5 h-5 border border-amber-500/50 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-amber-500" />
                  </div>
                </div>
                <p className="text-slate-300 leading-relaxed">{highlight}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* AI Agents */}
        <div className="mb-16">
          <h3 className="text-3xl font-light text-white mb-8">AI Agents</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {neurals.agents.map((agent, index) => (
              <Card
                key={index}
                className={`p-6 bg-slate-800/30 border-slate-700/30 hover:border-amber-500/30 hover:bg-slate-800/50 transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${index * 0.05}s` }}
              >
                <h4 className="text-xl font-medium text-white mb-2">{agent.name}</h4>
                <p className="text-amber-500 text-sm mb-3">{agent.role}</p>
                <p className="text-slate-400 text-sm leading-relaxed">{agent.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            size="lg"
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-medium px-8 py-6 text-base group"
            onClick={() => window.open(neurals.website, '_blank')}
          >
            Visit Neurals.in
            <ExternalLink className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Neurals;