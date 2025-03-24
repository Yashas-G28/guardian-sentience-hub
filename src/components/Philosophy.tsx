
import React, { useRef, useState, useEffect } from 'react';
import { Circle, Heart, Lightbulb, Shield, Target, Zap } from 'lucide-react';

const philosophies = [
  {
    id: 1,
    title: "Simplicity",
    description: "Good design is as little design as possible. Less, but better – because it concentrates on the essential aspects, and the products are not burdened with non-essentials.",
    icon: <Circle className="h-5 w-5" />,
  },
  {
    id: 2,
    title: "Honesty",
    description: "Design should make a product useful and understandable. It clarifies the product's structure. Better still, it can make the product clearly express its function through user intuition.",
    icon: <Heart className="h-5 w-5" />,
  },
  {
    id: 3,
    title: "Innovation",
    description: "Good design emphasizes the usefulness of a product while disregarding anything that could possibly detract from it. Nothing must be arbitrary or left to chance.",
    icon: <Lightbulb className="h-5 w-5" />,
  },
];

const additionalPrinciples = [
  {
    id: 4,
    title: "Precision",
    description: "Our AI models are designed with meticulous attention to detail, ensuring accurate content analysis and reducing false positives to maintain trust and reliability.",
    icon: <Target className="h-5 w-5" />,
  },
  {
    id: 5,
    title: "Protection",
    description: "We prioritize safety by implementing robust safeguards that protect users from harmful content while preserving the freedom of legitimate expression.",
    icon: <Shield className="h-5 w-5" />,
  },
  {
    id: 6,
    title: "Performance",
    description: "Our systems are engineered for speed and efficiency, delivering real-time content moderation without compromising on accuracy or thoroughness.",
    icon: <Zap className="h-5 w-5" />,
  },
];

const Philosophy = () => {
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
    <section id="philosophy" ref={sectionRef} className="section-padding bg-secondary/50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className={`text-3xl md:text-4xl font-bold mb-6 opacity-0 ${isVisible ? 'animate-fade-in' : ''}`} style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            Our design philosophy
          </h2>
          <p className={`text-foreground/70 text-lg opacity-0 ${isVisible ? 'animate-fade-in' : ''} text-balance`} style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            We believe that great design should be intuitive, purposeful, and timeless. Our approach is guided by these core principles.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {philosophies.map((item, index) => (
            <div 
              key={item.id} 
              className={`bg-card rounded-2xl p-8 shadow-sm border border-border/20 hover-scale opacity-0 ${isVisible ? 'animate-fade-in' : ''}`}
              style={{ animationDelay: `${0.6 + index * 0.2}s`, animationFillMode: 'forwards' }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-foreground/70 text-balance">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className={`text-2xl md:text-3xl font-bold mb-6 opacity-0 ${isVisible ? 'animate-fade-in' : ''}`} style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}>
            Core values that drive our technology
          </h2>
          <p className={`text-foreground/70 text-lg opacity-0 ${isVisible ? 'animate-fade-in' : ''} text-balance`} style={{ animationDelay: '1.4s', animationFillMode: 'forwards' }}>
            Beyond aesthetics, our AI systems are built on fundamental principles that ensure ethical, effective, and reliable content moderation.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {additionalPrinciples.map((item, index) => (
            <div 
              key={item.id} 
              className={`bg-card rounded-2xl p-8 shadow-sm border border-border/20 hover-scale opacity-0 ${isVisible ? 'animate-fade-in' : ''}`}
              style={{ animationDelay: `${1.6 + index * 0.2}s`, animationFillMode: 'forwards' }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-foreground/70 text-balance">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
