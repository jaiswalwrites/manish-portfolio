import React, { useEffect, useState } from 'react';
import { personalInfo } from '../data/mock';
import { Github, Linkedin, Mail, FileText, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20 - 10,
        y: (e.clientY / window.innerHeight) * 20 - 10,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-1/4 -left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        />
        <div 
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
            transition: 'transform 0.3s ease-out',
            animationDelay: '1s'
          }}
        />
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-full animate-spin-slow" />
          <div className="absolute inset-8 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-full animate-spin-slower" />
        </div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptMCAyYy0yLjIxIDAtNCAxLjc5LTQgNHMxLjc5IDQgNCA0IDQtMS43OSA0LTQtMS43OS00LTQtNHoiIGZpbGw9IiMyMjIiIG9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-20" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
        {/* Profile Image with 3D effect */}
        <div className="mb-8 flex justify-center">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse" />
            <img
              src={personalInfo.image}
              alt={personalInfo.name}
              className="relative w-40 h-40 rounded-full object-cover border-4 border-slate-900 shadow-2xl transform group-hover:scale-105 transition duration-300"
            />
          </div>
        </div>

        {/* Animated Title */}
        <div className="mb-6 space-y-2">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 animate-fade-in">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent animate-gradient">
              {personalInfo.name}
            </span>
          </h1>
          <p className="text-2xl md:text-3xl font-light text-cyan-400 mb-2 animate-fade-in-delay-1">
            Founder of Neurals.in
          </p>
          <p className="text-xl md:text-2xl text-slate-300 animate-fade-in-delay-2">
            Technical Writer | AI Engineer | Blockchain Writer
          </p>
        </div>

        {/* Tagline */}
        <p className="text-3xl md:text-4xl font-mono text-slate-400 mb-12 animate-fade-in-delay-3">
          <span className="text-cyan-400">&lt;</span>
          {personalInfo.tagline}
          <span className="text-cyan-400">/&gt;</span>
        </p>

        {/* Description */}
        <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-in-delay-4">
          Seasoned Technical Writer, certified DevOps professional, and advocate for Blockchain, Web3, and AI. 
          I craft documentation that bridges complex technology and end users.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-16 animate-fade-in-delay-5">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300"
            onClick={() => scrollToSection('work')}
          >
            View My Work
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 font-semibold px-8 py-6 text-lg rounded-lg backdrop-blur-sm transform hover:scale-105 transition-all duration-300"
            onClick={() => scrollToSection('contact')}
          >
            Get In Touch
          </Button>
        </div>

        {/* Social Links */}
        <div className="flex gap-6 justify-center animate-fade-in-delay-6">
          <a 
            href={personalInfo.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-3 bg-slate-800/50 backdrop-blur-sm rounded-full hover:bg-cyan-500/20 hover:text-cyan-400 text-slate-400 transform hover:scale-110 hover:-translate-y-1 transition-all duration-300 border border-slate-700 hover:border-cyan-500"
          >
            <Github className="w-6 h-6" />
          </a>
          <a 
            href={personalInfo.linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-3 bg-slate-800/50 backdrop-blur-sm rounded-full hover:bg-cyan-500/20 hover:text-cyan-400 text-slate-400 transform hover:scale-110 hover:-translate-y-1 transition-all duration-300 border border-slate-700 hover:border-cyan-500"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a 
            href={`mailto:${personalInfo.email}`}
            className="p-3 bg-slate-800/50 backdrop-blur-sm rounded-full hover:bg-cyan-500/20 hover:text-cyan-400 text-slate-400 transform hover:scale-110 hover:-translate-y-1 transition-all duration-300 border border-slate-700 hover:border-cyan-500"
          >
            <Mail className="w-6 h-6" />
          </a>
          <a 
            href={personalInfo.resumeUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-3 bg-slate-800/50 backdrop-blur-sm rounded-full hover:bg-cyan-500/20 hover:text-cyan-400 text-slate-400 transform hover:scale-110 hover:-translate-y-1 transition-all duration-300 border border-slate-700 hover:border-cyan-500"
          >
            <FileText className="w-6 h-6" />
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-cyan-400" />
        </div>
      </div>
    </section>
  );
};

export default Hero;