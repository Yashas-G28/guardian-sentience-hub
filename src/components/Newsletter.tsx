
import React, { useRef, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

const Newsletter = () => {
  const { toast } = useToast();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
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
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-br from-primary to-primary/70 bg-clip-text text-transparent">Stay Connected</h2>
              <p className="text-foreground/70 text-balance mb-6">
                Follow our journey as we develop cutting-edge content moderation technology and expand NeuralSafe's features.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
