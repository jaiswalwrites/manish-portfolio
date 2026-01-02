import React, { useState } from 'react';
import { personalInfo } from '../data/mock';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Mail, Phone, Linkedin, Github, Send, MapPin } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-32 bg-slate-950 relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4">Get In Touch</h2>
          <div className="w-24 h-px bg-gradient-to-r from-amber-500 to-transparent mb-4" />
          <p className="text-xl text-slate-400 font-light">
            Have a project in mind? Let's collaborate and create something amazing.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="p-6 bg-slate-900/30 border-slate-800/30 hover:border-amber-500/30 transition-all duration-500">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <h3 className="text-white font-light mb-1">Email</h3>
                  <a href={`mailto:${personalInfo.email}`} className="text-slate-400 hover:text-amber-500 transition-colors">
                    {personalInfo.email}
                  </a>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-slate-900/30 border-slate-800/30 hover:border-amber-500/30 transition-all duration-500">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <h3 className="text-white font-light mb-1">Phone</h3>
                  <a href={`tel:${personalInfo.phone}`} className="text-slate-400 hover:text-amber-500 transition-colors">
                    {personalInfo.phone}
                  </a>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-slate-900/30 border-slate-800/30 hover:border-amber-500/30 transition-all duration-500">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <h3 className="text-white font-light mb-1">Location</h3>
                  <p className="text-slate-400">Bangalore, India</p>
                </div>
              </div>
            </Card>

            {/* Social Links */}
            <div className="pt-6">
              <h3 className="text-white font-light mb-4">Connect on Social</h3>
              <div className="flex gap-4">
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 border border-slate-800 hover:border-amber-500/50 text-slate-400 hover:text-amber-500 transition-all duration-300"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 border border-slate-800 hover:border-amber-500/50 text-slate-400 hover:text-amber-500 transition-all duration-300"
                >
                  <Github className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="p-8 bg-slate-900/30 border-slate-800/30 hover:border-amber-500/30 transition-all duration-500">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white font-light mb-2">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="bg-slate-900/50 border-slate-700 focus:border-amber-500 text-white placeholder:text-slate-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-white font-light mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                  className="bg-slate-900/50 border-slate-700 focus:border-amber-500 text-white placeholder:text-slate-500"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-white font-light mb-2">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="What's this about?"
                  className="bg-slate-900/50 border-slate-700 focus:border-amber-500 text-white placeholder:text-slate-500"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-white font-light mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell me about your project..."
                  rows={6}
                  className="bg-slate-900/50 border-slate-700 focus:border-amber-500 text-white placeholder:text-slate-500 resize-none"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-light py-6 group"
              >
                Send Message
                <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;