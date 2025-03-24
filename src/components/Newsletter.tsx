
import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Newsletter = () => {
  const { toast } = useToast();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    toast({
      title: "Thank you for subscribing",
      description: "We'll keep you updated on NeuralSafe's latest features and news.",
    });
    
    setEmail('');
  };
  
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
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="section-padding bg-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full" />
      
      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        <div className={`glass-morphism rounded-3xl overflow-hidden shadow-sm opacity-0 ${isVisible ? 'animate-fade-in' : ''}`} style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          <div className="p-8 md:p-12">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay updated</h2>
              <p className="text-foreground/70 text-balance">
                Subscribe to our newsletter for the latest updates on content moderation technology and NeuralSafe features.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-full border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="bg-primary text-white font-medium px-6 py-3 rounded-full hover-scale flex items-center justify-center"
                >
                  Subscribe
                  <ArrowRight size={16} className="ml-2" />
                </button>
              </div>
              <p className="text-xs text-foreground/50 mt-4 text-center">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
