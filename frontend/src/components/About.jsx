import React, { useRef, useEffect, useState } from 'react';
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
      const target = stat.value;
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

  const formatNumber = (num, label) => {
    if (label === "Newsletter Subscribers") {
      return num >= 1000 ? `${(num / 1000).toFixed(1)}K+` : `${num}+`;
    }
    return `${num}+`;
  };

  return (
    <section id="about" ref={sectionRef} className="py-32 bg-slate-950 relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4">About Me</h2>
          <div className="w-24 h-px bg-gradient-to-r from-amber-500 to-transparent" />
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start mb-20">
          {/* Description */}
          <div className={`space-y-6 transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <p className="text-xl text-slate-300 leading-relaxed font-light">
              {about.description}
            </p>
            <p className="text-lg text-slate-400 leading-relaxed">
              With <span className="text-amber-500">8+ years of experience</span>, I've worked with industry 
              leaders like <span className="text-white">Harness.io</span>, <span className="text-white">McAfee</span>, and emerging blockchain 
              companies like <span className="text-white">Arcana Network</span> and <span className="text-white">Marlin</span>.
            </p>
            <p className="text-lg text-slate-400 leading-relaxed">
              I'm passionate about <span className="text-amber-500">docs-as-code</span>, <span className="text-amber-500">API documentation</span>, 
              and making complex technologies accessible to developers and end users.
            </p>
          </div>

          {/* Stats Grid */}
          <div className={`grid grid-cols-2 gap-6 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            {about.stats.map((stat, index) => (
              <Card 
                key={index} 
                className="p-6 bg-slate-800/30 border-slate-700/30 hover:border-amber-500/30 hover:bg-slate-800/50 transition-all duration-500"
              >
                <div className="text-center">
                  <div className="text-5xl font-light text-amber-500 mb-2">
                    {isVisible ? formatNumber(counters[index], stat.label) : '0'}
                  </div>
                  <div className="text-slate-400 text-sm font-light">
                    {stat.label}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Expertise Tags */}
        <div className={`transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h3 className="text-2xl font-light text-white mb-8">Core Expertise</h3>
          <div className="flex flex-wrap gap-3">
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
                className="px-6 py-2 border border-slate-700 text-slate-300 hover:border-amber-500/50 hover:text-amber-500 transition-all duration-300 cursor-default font-light"
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