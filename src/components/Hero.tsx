
import React, { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const circleBgRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!circleBgRef.current) return;
      
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      const moveX = (x - 0.5) * 20;
      const moveY = (y - 0.5) * 20;
      
      circleBgRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          ref={circleBgRef}
          className="w-[800px] h-[800px] rounded-full bg-primary/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 ease-out"
        />
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="bg-primary/10 text-primary text-xs rounded-full px-4 py-1.5 mb-2 opacity-0 animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            Introducing NeuralSafe
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight opacity-0 animate-fade-in text-balance" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            <span className="block">The Future of Intelligent</span>
            <span className="block mt-1">Content Moderation</span>
          </h1>
          
          <p className="max-w-xl text-foreground/70 text-lg md:text-xl opacity-0 animate-fade-in text-balance" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            A cutting-edge, AI-powered moderation system engineered to detect, analyze, and neutralize harmful online content in real-time.
          </p>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
            <a 
              href="#product" 
              className="rounded-full bg-primary text-white px-8 py-3 font-medium hover-scale"
            >
              Discover
            </a>
            <a 
              href="#philosophy" 
              className="rounded-full bg-secondary text-foreground px-8 py-3 font-medium hover-scale"
            >
              Learn more
            </a>
          </div>
        </div>
      </div>
      
      <a 
        href="#product" 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-0 animate-fade-in hover:text-primary transition-colors"
        style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}
      >
        <span className="text-sm font-medium mb-2">Scroll down</span>
        <ArrowDown size={18} className="animate-bounce" />
      </a>
    </section>
  );
};

export default Hero;
