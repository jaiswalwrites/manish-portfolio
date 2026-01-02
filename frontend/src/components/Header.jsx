import React, { useState, useEffect } from 'react';
import { personalInfo } from '../data/mock';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Work', href: '#work' },
    { name: 'Skills', href: '#skills' },
    { name: 'Neurals', href: '#neurals' },
    { name: 'Newsletter', href: '#newsletter' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/90 backdrop-blur-lg border-b border-slate-800 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300"
          >
            MJ
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-slate-300 hover:text-cyan-400 transition-colors duration-300 font-medium relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            <Button
              onClick={(e) => handleNavClick(e, '#contact')}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold px-6 rounded-lg shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300"
            >
              Contact
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-cyan-400 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-slate-800 animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-slate-300 hover:text-cyan-400 transition-colors duration-300 font-medium py-2"
                >
                  {link.name}
                </a>
              ))}
              <Button
                onClick={(e) => handleNavClick(e, '#contact')}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold w-full py-3 rounded-lg"
              >
                Contact
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;