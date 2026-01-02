import React from 'react';
import { personalInfo } from '../data/mock';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-light text-white mb-2">
              {personalInfo.name}
            </h3>
            <p className="text-slate-400 text-sm font-light">
              {personalInfo.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-light mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-slate-400 hover:text-amber-500 transition-colors font-light">
                  About
                </a>
              </li>
              <li>
                <a href="#experience" className="text-slate-400 hover:text-amber-500 transition-colors font-light">
                  Experience
                </a>
              </li>
              <li>
                <a href="#work" className="text-slate-400 hover:text-amber-500 transition-colors font-light">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#skills" className="text-slate-400 hover:text-amber-500 transition-colors font-light">
                  Skills
                </a>
              </li>
              <li>
                <a href="#contact" className="text-slate-400 hover:text-amber-500 transition-colors font-light">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-white font-light mb-4">Connect</h4>
            <div className="flex gap-4">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border border-slate-800 hover:border-amber-500/50 text-slate-400 hover:text-amber-500 transition-all duration-300"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border border-slate-800 hover:border-amber-500/50 text-slate-400 hover:text-amber-500 transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="p-3 border border-slate-800 hover:border-amber-500/50 text-slate-400 hover:text-amber-500 transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-slate-900">
          <div className="text-center">
            <p className="text-slate-400 text-sm font-light">
              © {currentYear} {personalInfo.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;