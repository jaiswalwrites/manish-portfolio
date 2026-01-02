import React, { useRef, useEffect, useState } from 'react';
import { neurals } from '../data/mock';
import { Card } from './ui/card';
import { ExternalLink, Sparkles, Code, Blocks, Users } from 'lucide-react';
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

  const icons = [Sparkles, Code, Blocks, Users];

  return (
    <section id="neurals" ref={sectionRef} className="py-24 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur-lg opacity-30 animate-pulse" />
              <h2 className="relative text-5xl md:text-6xl font-bold text-white px-6 py-3">
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  {neurals.name}
                </span>
              </h2>
            </div>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full" />
        </div>

        {/* Main Card */}
        <Card className={`bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border-slate-700/50 p-8 md:p-12 transform transition-all duration-1000 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          {/* Description */}
          <p className="text-xl md:text-2xl text-slate-300 leading-relaxed text-center mb-12">
            {neurals.description}
          </p>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {neurals.features.map((feature, index) => {
              const Icon = icons[index];
              return (
                <div
                  key={index}
                  className={`group p-6 bg-slate-900/50 rounded-lg border border-slate-700/50 hover:border-cyan-500/50 hover:bg-slate-800/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <div className="mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-cyan-400" />
                    </div>
                  </div>
                  <p className="text-slate-300 font-medium leading-relaxed">
                    {feature}
                  </p>
                </div>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="text-center pt-8 border-t border-slate-700/50">
            <p className="text-lg text-slate-400 mb-6">
              Transforming complex AI and Web3 technologies into clear, actionable documentation
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300 group"
              onClick={() => window.open(neurals.website, '_blank')}
            >
              Visit Neurals.in
              <ExternalLink className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Floating particles effect */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-cyan-400/30 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </Card>

        {/* Tech Stack Pills */}
        <div className="mt-12 text-center">
          <p className="text-slate-400 mb-4">Technologies & Domains</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['AI/ML', 'Blockchain', 'Web3', 'Smart Contracts', 'DevOps', 'Cloud Security', 'DeFi', 'NFTs'].map((tech, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-slate-800/30 backdrop-blur-sm border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-medium hover:bg-cyan-500/10 hover:scale-110 transition-all duration-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Neurals;