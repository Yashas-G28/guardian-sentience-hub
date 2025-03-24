
import React from 'react';
import { Mail, Linkedin, MapPin, Github, Twitter, Brain } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-card py-16 px-6 md:px-12 border-t border-border/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="relative w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Brain size={24} className="text-primary animate-pulse" />
              </div>
              <span className="text-xl font-semibold tracking-tight">NeuralSafe</span>
            </div>
            <p className="text-foreground/70 max-w-xs">
              Safeguarding digital integrity with intelligent content moderation powered by advanced neural networks.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-foreground/70 hover:text-primary transition-colors">
                <Mail size={18} className="flex-shrink-0" />
                <a href="mailto:yashasgangadhar28@gmail.com" className="hover:underline overflow-hidden text-ellipsis">
                  yashasgangadhar28@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-foreground/70 hover:text-primary transition-colors">
                <Linkedin size={18} className="flex-shrink-0" />
                <a href="https://www.linkedin.com/in/yashasg28" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  linkedin.com/in/yashasg28
                </a>
              </li>
              <li className="flex items-start gap-3 text-foreground/70">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>Bengaluru, India</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#product" className="text-foreground/70 hover:text-primary transition-colors hover:underline block">
                  Features
                </a>
              </li>
              <li>
                <a href="#philosophy" className="text-foreground/70 hover:text-primary transition-colors hover:underline block">
                  Philosophy
                </a>
              </li>
              <li>
                <a href="#analysis" className="text-foreground/70 hover:text-primary transition-colors hover:underline block">
                  Analysis
                </a>
              </li>
              <li>
                <a href="#content-analyzer" className="text-foreground/70 hover:text-primary transition-colors hover:underline block">
                  Content Analyzer
                </a>
              </li>
              <li>
                <a href="#login" className="text-foreground/70 hover:text-primary transition-colors hover:underline block">
                  Login
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-6">Stay Connected</h3>
            <div className="space-y-4">
              <p className="text-foreground/70">
                Follow us on social media for the latest updates on AI content moderation technology.
              </p>
              <div className="flex space-x-4">
                <a href="https://twitter.com" className="w-10 h-10 rounded-full bg-secondary/80 flex items-center justify-center text-foreground/70 hover:text-primary hover:bg-secondary transition-colors" target="_blank" rel="noopener noreferrer">
                  <Twitter size={18} />
                </a>
                <a href="https://github.com" className="w-10 h-10 rounded-full bg-secondary/80 flex items-center justify-center text-foreground/70 hover:text-primary hover:bg-secondary transition-colors" target="_blank" rel="noopener noreferrer">
                  <Github size={18} />
                </a>
                <a href="https://www.linkedin.com/in/yashasg28" className="w-10 h-10 rounded-full bg-secondary/80 flex items-center justify-center text-foreground/70 hover:text-primary hover:bg-secondary transition-colors" target="_blank" rel="noopener noreferrer">
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-foreground/60 mb-4 md:mb-0">
            &copy; {currentYear} NeuralSafe. All rights reserved.
          </p>
          
          <div className="flex space-x-6">
            <a href="https://twitter.com" className="text-foreground/60 hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
              <Twitter size={18} />
            </a>
            <a href="https://www.linkedin.com/in/yashasg28" className="text-foreground/60 hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
              <Linkedin size={18} />
            </a>
            <a href="mailto:yashasgangadhar28@gmail.com" className="text-foreground/60 hover:text-primary transition-colors">
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
