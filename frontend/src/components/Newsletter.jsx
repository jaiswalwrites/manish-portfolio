import React, { useRef, useEffect, useState } from 'react';
import { newsletter } from '../data/mock';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Mail, Send, CheckCircle, Users, Calendar } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const Newsletter = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const sectionRef = useRef(null);
  const { toast } = useToast();

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

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Thanks for subscribing!",
        description: "You'll receive the latest tech writing insights in your inbox.",
      });
      setEmail('');
    }
  };

  return (
    <section id="newsletter" ref={sectionRef} className="py-24 bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Tech Writing <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Insights</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full" />
        </div>

        <Card className={`bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border-slate-700/50 p-8 md:p-12 transform transition-all duration-1000 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="flex items-center gap-4 p-4 bg-slate-900/50 rounded-lg border border-slate-700/30">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{newsletter.subscribers}</div>
                <div className="text-slate-400 text-sm">Subscribers</div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-slate-900/50 rounded-lg border border-slate-700/30">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{newsletter.frequency}</div>
                <div className="text-slate-400 text-sm">Publishing</div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-slate-900/50 rounded-lg border border-slate-700/30">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">Newsletter</div>
                <div className="text-slate-400 text-sm">LinkedIn</div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="text-center mb-8">
            <p className="text-xl text-slate-300 leading-relaxed mb-6">
              {newsletter.description}
            </p>
          </div>

          {/* Topics */}
          <div className="mb-8">
            <h4 className="text-white font-semibold text-center mb-4">Topics Covered:</h4>
            <div className="flex flex-wrap justify-center gap-3">
              {newsletter.topics.map((topic, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-slate-900/50 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-medium hover:bg-cyan-500/10 hover:scale-105 transition-all duration-300 flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  {topic}
                </span>
              ))}
            </div>
          </div>

          {/* Subscribe Form */}
          <div className="max-w-md mx-auto">
            <form onSubmit={handleSubscribe} className="flex gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-slate-900/50 border-slate-700 focus:border-cyan-500 text-white placeholder:text-slate-500 h-12"
              />
              <Button
                type="submit"
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold px-6 rounded-lg shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300 h-12"
              >
                <Send className="w-5 h-5" />
              </Button>
            </form>
            <p className="text-slate-500 text-sm text-center mt-4">
              Join 1,000+ tech writers staying ahead of the curve
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Newsletter;