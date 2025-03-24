
import React from 'react';
import { Mail, Linkedin, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-background py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="relative w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
              </div>
              <span className="text-lg font-semibold tracking-tight">NeuralSafe</span>
            </div>
            <p className="text-foreground/70 max-w-xs">
              Safeguarding digital integrity with intelligent content moderation powered by advanced neural networks.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-foreground/70 hover:text-primary transition-colors">
                <Mail size={18} />
                <a href="mailto:yashasgangadhar28@gmail.com" className="hover:underline">
                  yashasgangadhar28@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-foreground/70 hover:text-primary transition-colors">
                <Linkedin size={18} />
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
                <a href="#product" className="text-foreground/70 hover:text-primary transition-colors hover:underline">
                  Features
                </a>
              </li>
              <li>
                <a href="#philosophy" className="text-foreground/70 hover:text-primary transition-colors hover:underline">
                  Philosophy
                </a>
              </li>
              <li>
                <a href="#analysis" className="text-foreground/70 hover:text-primary transition-colors hover:underline">
                  Analysis
                </a>
              </li>
              <li>
                <a href="#contact" className="text-foreground/70 hover:text-primary transition-colors hover:underline">
                  Newsletter
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-foreground/60 mb-4 md:mb-0">
            &copy; {currentYear} NeuralSafe. All rights reserved.
          </p>
          
          <div className="flex space-x-6">
            <a href="https://twitter.com" className="text-foreground/60 hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/yashasg28" className="text-foreground/60 hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a href="mailto:yashasgangadhar28@gmail.com" className="text-foreground/60 hover:text-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
