
import React, { useRef, useState, useEffect } from 'react';
import { 
  Shield, 
  AlertTriangle, 
  Globe, 
  Film, 
  Sparkles, 
  RefreshCw,
  Layers,
  Link,
  FileCheck 
} from 'lucide-react';

const Features = () => {
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

  const features = [
    {
      title: "Advanced Machine Learning & NLP",
      icon: Sparkles,
      description: "Leverages deep learning models for precise detection of hate speech, toxicity, and harmful discourse, ensuring contextual accuracy."
    },
    {
      title: "AI-Powered Misinformation Detection",
      icon: AlertTriangle,
      description: "Utilizes Generative AI to identify and mitigate deepfake media, false narratives, and deceptive content with unparalleled precision."
    },
    {
      title: "Multimodal Intelligence",
      icon: Layers,
      description: "Integrates sophisticated analysis of text, audio, images, and video, delivering a holistic moderation framework."
    },
    {
      title: "Real-Time Integration",
      icon: RefreshCw,
      description: "A robust AI-driven moderation API designed for effortless deployment across social media platforms, messaging ecosystems, and online communities."
    },
    {
      title: "Multilingual Detection",
      icon: Globe,
      description: "Utilizes deep learning to recognize abusive language, threats, and harmful discourse across diverse languages and cultural contexts."
    },
    {
      title: "Advanced Deepfake Detection",
      icon: Film,
      description: "Leverages generative AI and multimodal analysis to identify manipulated images, videos, and synthetic media in real time."
    },
    {
      title: "Seamless API Integration",
      icon: Link,
      description: "Designed for effortless deployment across social media, messaging platforms, and content-sharing ecosystems."
    },
    {
      title: "Ethical & Explainable AI",
      icon: FileCheck,
      description: "Provides clear reasoning for flagged content, promoting transparency and trust in moderation decisions."
    }
  ];

  return (
    <section id="product" ref={sectionRef} className="section-padding bg-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className={`inline-block bg-primary/10 text-primary text-xs rounded-full px-4 py-1.5 mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Key Features
          </div>
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            How NeuralSafe Transforms Content Moderation
          </h2>
          <p className={`text-foreground/70 max-w-2xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Unlike conventional moderation systems reliant on simplistic keyword filtering, NeuralSafe employs contextual analysis to distinguish between harmful intent and legitimate discourse.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={feature.title}
                className={`glass-morphism rounded-2xl p-6 hover:shadow-lg transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="bg-primary/10 p-3 rounded-xl inline-block mb-4">
                  <IconComponent className="text-primary h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-foreground/70 text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>
        
        <div className={`mt-16 text-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center justify-center bg-primary/10 text-primary rounded-full px-5 py-2 text-sm">
            <Shield className="w-4 h-4 mr-2" /> Precision. Fairness. Scalability.
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
