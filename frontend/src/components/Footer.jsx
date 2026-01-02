import React from 'react';
import { personalInfo } from '../data/mock';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
              {personalInfo.name}
            </h3>
            <p className="text-slate-400 text-sm">
              {personalInfo.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#experience" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Experience
                </a>
              </li>
              <li>
                <a href="#work" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#skills" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Skills
                </a>
              </li>
              <li>
                <a href="#contact" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-slate-900 rounded-lg border border-slate-800 hover:border-cyan-500 hover:bg-cyan-500/10 text-slate-400 hover:text-cyan-400 transform hover:scale-110 transition-all duration-300"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-slate-900 rounded-lg border border-slate-800 hover:border-cyan-500 hover:bg-cyan-500/10 text-slate-400 hover:text-cyan-400 transform hover:scale-110 transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="p-3 bg-slate-900 rounded-lg border border-slate-800 hover:border-cyan-500 hover:bg-cyan-500/10 text-slate-400 hover:text-cyan-400 transform hover:scale-110 transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              © {currentYear} {personalInfo.name}. All rights reserved.
            </p>
            <p className="text-slate-400 text-sm flex items-center gap-2">
              Made with <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" /> using React & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;