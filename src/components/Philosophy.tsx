
import React, { useRef, useState, useEffect } from 'react';

const philosophies = [
  {
    id: 1,
    title: "Simplicity",
    description: "Good design is as little design as possible. Less, but better – because it concentrates on the essential aspects, and the products are not burdened with non-essentials.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle">
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Honesty",
    description: "Design should make a product useful and understandable. It clarifies the product's structure. Better still, it can make the product clearly express its function through user intuition.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Innovation",
    description: "Good design emphasizes the usefulness of a product while disregarding anything that could possibly detract from it. Nothing must be arbitrary or left to chance.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lightbulb">
        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
        <path d="M9 18h6" />
        <path d="M10 22h4" />
      </svg>
    ),
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {philosophies.map((item, index) => (
            <div 
              key={item.id} 
              className={`bg-white rounded-2xl p-8 shadow-sm border border-border/20 hover-scale opacity-0 ${isVisible ? 'animate-fade-in' : ''}`}
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
      </div>
    </section>
  );
};

export default Philosophy;
