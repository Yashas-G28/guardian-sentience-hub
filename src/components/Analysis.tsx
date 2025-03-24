
import React, { useRef, useState, useEffect } from 'react';
import { Shield, Eye, BarChart3, FileText, CheckCircle } from 'lucide-react';

const Analysis = () => {
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

  const analysisCards = [
    {
      title: "Harmful Content Detection",
      icon: Shield,
      content: "Our analysis detected 147 instances of potential harmful content across your platforms. 96% were automatically moderated with our advanced neural models."
    },
    {
      title: "Misinformation Analysis",
      icon: Eye,
      content: "NeuralSafe identified 32 potential misinformation posts and 8 deepfake media instances, preventing their spread in real-time."
    },
    {
      title: "Moderation Efficiency",
      icon: BarChart3,
      content: "System reduced manual moderation needs by 86% while improving detection accuracy to 97.3%, resulting in faster response times and fewer false positives."
    },
    {
      title: "Plain English Results",
      icon: FileText,
      content: "Your platforms are now safer with far less harmful content. Our AI system automatically catches almost all problematic posts before users see them, including fake news and manipulated media. Your team spends less time on manual moderation, and users report a more positive experience."
    }
  ];

  return (
    <section id="analysis" ref={sectionRef} className="section-padding bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Impact Analysis
          </h2>
          <p className={`text-foreground/70 max-w-2xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Our neural networks provide clear, actionable insights into your content moderation effectiveness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {analysisCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <div 
                key={card.title}
                className={`glass-morphism rounded-2xl p-8 hover:shadow-lg transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-xl">
                    <IconComponent className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                    <p className="text-foreground/70 leading-relaxed">{card.content}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Analysis;
