import React, { useEffect, useRef, useState } from 'react';
import { about } from '../data/mock';
import { Card } from './ui/card';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState(about.stats.map(() => 0));
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          animateCounters();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  const animateCounters = () => {
    about.stats.forEach((stat, index) => {
      const target = parseInt(stat.value);
      const duration = 2000;
      const steps = 60;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setCounters(prev => {
          const newCounters = [...prev];
          newCounters[index] = Math.floor(current);
          return newCounters;
        });
      }, duration / steps);
    });
  };

  return (
    <section id="about" ref={sectionRef} className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            About <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Description */}
          <div className={`space-y-6 transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
            <p className="text-xl text-slate-300 leading-relaxed">
              {about.description}
            </p>
            <p className="text-lg text-slate-400 leading-relaxed">
              With <span className="text-cyan-400 font-semibold">8+ years of experience</span>, I've worked with industry leaders like <span className="text-cyan-400">Harness.io</span>, <span className="text-cyan-400">McAfee</span>, and emerging blockchain companies like <span className="text-cyan-400">Arcana Network</span> and <span className="text-cyan-400">Marlin</span>.
            </p>
            <p className="text-lg text-slate-400 leading-relaxed">
              I'm passionate about <span className="text-cyan-400 font-semibold">docs-as-code</span>, <span className="text-cyan-400 font-semibold">API documentation</span>, and making complex technologies accessible to developers and end users.
            </p>
            <div className="pt-4">
              <div className="inline-block bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg px-6 py-3">
                <p className="text-cyan-400 font-mono text-lg">
                  <span className="text-slate-500">const</span> expertise = <span className="text-slate-500">[</span>
                  <span className="text-green-400">'Technical Writing'</span>, 
                  <span className="text-green-400">'DevOps'</span>, 
                  <span className="text-green-400">'Blockchain'</span>, 
                  <span className="text-green-400">'AI'</span>
                  <span className="text-slate-500">];</span>
                </p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className={`grid grid-cols-2 gap-6 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
            {about.stats.map((stat, index) => (
              <Card 
                key={index} 
                className="p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 group hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/10"
              >
                <div className="text-center">
                  <div className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                    {isVisible ? (
                      stat.value.includes('+') ? `${counters[index]}+` : 
                      stat.value.includes('K') ? `${counters[index]}K+` : 
                      counters[index]
                    ) : '0'}
                  </div>
                  <div className="text-slate-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Expertise Tags */}
        <div className={`transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <h3 className="text-2xl font-bold text-white text-center mb-8">Core Expertise</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'Technical Documentation',
              'API Documentation',
              'SDK Documentation',
              'Docs-as-Code',
              'DevOps',
              'Blockchain/Web3',
              'CI/CD',
              'Cloud Security',
              'Video Creation',
              'Developer Advocacy'
            ].map((skill, index) => (
              <span
                key={index}
                className="px-6 py-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-full text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500 hover:scale-110 transition-all duration-300 cursor-default font-medium"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;