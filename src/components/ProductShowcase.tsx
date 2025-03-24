
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const products = [
  {
    id: 1,
    title: "The perfect balance",
    description: "Form follows function with every detail meticulously crafted for intuitive interaction.",
    imageSrc: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Elegantly simple",
    description: "Clarity in communication is essential. Every element is purposeful and intentional.",
    imageSrc: "https://images.unsplash.com/photo-1602080858428-57174f9431cf?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Mindfully crafted",
    description: "Superior craftsmanship combined with innovative technology for a seamless experience.",
    imageSrc: "https://images.unsplash.com/photo-1609081144289-ca5f5b54ef95?q=80&w=1600&auto=format&fit=crop",
  },
];

const ProductShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  const goToNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % products.length);
  };
  
  const goToPrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
  };
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
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
    <section id="product" ref={sectionRef} className="section-padding relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16 max-w-2xl">
          <h2 className={`text-3xl md:text-4xl font-bold mb-6 opacity-0 ${isVisible ? 'animate-fade-in' : ''}`} style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            Thoughtfully designed in every detail
          </h2>
          <p className={`text-foreground/70 text-lg opacity-0 ${isVisible ? 'animate-fade-in' : ''} text-balance`} style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            Our designs are informed by how people actually interact with objects. We remove complexity to focus on what matters.
          </p>
        </div>
        
        <div className={`relative h-[500px] md:h-[600px] opacity-0 ${isVisible ? 'animate-fade-in' : ''}`} style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`absolute inset-0 transition-all duration-700 ease-in-out flex flex-col md:flex-row items-center ${
                index === activeIndex 
                  ? 'opacity-100 translate-x-0 z-20' 
                  : index < activeIndex 
                    ? 'opacity-0 -translate-x-full z-10' 
                    : 'opacity-0 translate-x-full z-10'
              }`}
            >
              <div className="w-full md:w-1/2 p-8 md:pr-16 order-2 md:order-1">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">{product.title}</h3>
                <p className="text-foreground/70 text-lg mb-8 text-balance">{product.description}</p>
                <a href="#" className="text-primary flex items-center font-medium group">
                  Learn more 
                  <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
              <div className="w-full md:w-1/2 order-1 md:order-2">
                <div className="relative w-full h-[300px] md:h-[500px] overflow-hidden rounded-2xl">
                  <img 
                    src={product.imageSrc} 
                    alt={product.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>
            </div>
          ))}
          
          <div className="absolute bottom-0 left-8 md:left-0 z-30 flex space-x-4">
            <button 
              onClick={goToPrev}
              className="w-10 h-10 rounded-full flex items-center justify-center border border-border hover:bg-secondary transition-colors"
              aria-label="Previous product"
            >
              <ArrowLeft size={16} />
            </button>
            <button 
              onClick={goToNext}
              className="w-10 h-10 rounded-full flex items-center justify-center border border-border hover:bg-secondary transition-colors"
              aria-label="Next product"
            >
              <ArrowRight size={16} />
            </button>
          </div>
          
          <div className="absolute bottom-0 right-8 md:right-0 z-30 flex space-x-2">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === activeIndex ? 'w-8 bg-primary' : 'bg-primary/30'
                }`}
                aria-label={`Go to product ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
