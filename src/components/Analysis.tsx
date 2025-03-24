
import React, { useRef, useState, useEffect } from 'react';
import { Shield, Eye, BarChart3, FileText } from 'lucide-react';

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
      title: "Threat Detection",
      icon: Shield,
      content: "Our analysis identified 17 potential vulnerabilities in your system. 94% of these have been automatically mitigated using our adaptive neural defense mechanisms."
    },
    {
      title: "Performance Metrics",
      icon: BarChart3,
      content: "System performance improved by 28% after optimization. Resource usage is now 34% more efficient with neural load balancing algorithms."
    },
    {
      title: "Risk Assessment",
      icon: Eye,
      content: "Network traffic analysis shows a 75% reduction in suspicious activity. We've identified and blocked 23 potential data breach attempts in real-time."
    },
    {
      title: "Plain English Summary",
      icon: FileText,
      content: "Your system is now well-protected with minimal security risks. We've fixed almost all vulnerabilities, improved system speed, and are constantly monitoring for threats. In simple terms, you're safer and faster than before."
    }
  ];

  return (
    <section id="analysis" ref={sectionRef} className="section-padding bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Analysis Results
          </h2>
          <p className={`text-foreground/70 max-w-2xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Our neural networks provide clear, actionable insights into your system's security and performance.
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
