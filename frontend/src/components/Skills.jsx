import React, { useRef, useEffect, useState } from 'react';
import { skills, certifications, achievements } from '../data/mock';
import { Card } from './ui/card';
import { Award, CheckCircle2, Code, Wrench, Cloud, FileText, Palette, Blocks } from 'lucide-react';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const skillCategories = [
    { title: 'Languages', items: skills.languages, icon: Code, color: 'from-cyan-500 to-blue-500' },
    { title: 'Documentation Tools', items: skills.tools, icon: FileText, color: 'from-blue-500 to-purple-500' },
    { title: 'DevOps & Cloud', items: skills.devops, icon: Cloud, color: 'from-purple-500 to-pink-500' },
    { title: 'Technical Writing', items: skills.documentation, icon: Wrench, color: 'from-pink-500 to-red-500' },
    { title: 'Design Tools', items: skills.design, icon: Palette, color: 'from-red-500 to-orange-500' },
    { title: 'Blockchain/Web3', items: skills.blockchain, icon: Blocks, color: 'from-orange-500 to-cyan-500' },
  ];

  return (
    <section id="skills" ref={sectionRef} className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Skills & <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Expertise</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full" />
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card
                key={index}
                className={`p-6 bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:border-cyan-500/50 transition-all duration-500 group hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/10 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                {/* Icon */}
                <div className="mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300">
                  {category.title}
                </h3>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {category.items.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-slate-900/50 border border-slate-700 rounded-full text-slate-300 text-sm hover:bg-cyan-500/10 hover:border-cyan-500 hover:text-cyan-400 transition-all duration-300 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Certifications */}
        <div className={`mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <h3 className="text-3xl font-bold text-white text-center mb-8 flex items-center justify-center gap-3">
            <Award className="w-8 h-8 text-cyan-400" />
            Certifications
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <Card
                key={index}
                className="p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 group hover:scale-105"
                style={{ transitionDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Award className="w-5 h-5 text-cyan-400" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold mb-1 group-hover:text-cyan-400 transition-colors duration-300">
                      {cert.name}
                    </h4>
                    <p className="text-slate-400 text-sm">{cert.issuer}</p>
                    <p className="text-cyan-400 text-sm font-medium mt-1">{cert.year}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <h3 className="text-3xl font-bold text-white text-center mb-8 flex items-center justify-center gap-3">
            <CheckCircle2 className="w-8 h-8 text-cyan-400" />
            Key Achievements
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <Card
                key={index}
                className="p-6 bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 group hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/10"
                style={{ transitionDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <h4 className="text-white font-bold mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                      {achievement.title}
                    </h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;