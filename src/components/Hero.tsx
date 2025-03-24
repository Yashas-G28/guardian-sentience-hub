
import React, { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Create neural network nodes
    const nodeCount = 100;
    const nodes: {x: number; y: number; vx: number; vy: number; connections: number[]}[] = [];
    
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        connections: []
      });
    }
    
    // Connect nearby nodes
    const connectionDistance = 150;
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < connectionDistance) {
          nodes[i].connections.push(j);
        }
      }
    }
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections
      ctx.strokeStyle = 'rgba(32, 162, 255, 0.1)';
      ctx.lineWidth = 1;
      
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        
        // Update position
        node.x += node.vx;
        node.y += node.vy;
        
        // Bounce off edges
        if (node.x <= 0 || node.x >= canvas.width) node.vx *= -1;
        if (node.y <= 0 || node.y >= canvas.height) node.vy *= -1;
        
        // Draw connections
        for (const j of node.connections) {
          const targetNode = nodes[j];
          const dx = node.x - targetNode.x;
          const dy = node.y - targetNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(targetNode.x, targetNode.y);
            ctx.stroke();
          }
        }
      }
      
      // Draw nodes
      ctx.fillStyle = 'rgba(32, 162, 255, 0.6)';
      for (const node of nodes) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Neural network background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0"
      />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="bg-primary/10 text-primary text-xs rounded-full px-4 py-1.5 mb-2 opacity-0 animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            Introducing NeuralSafe
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight opacity-0 animate-fade-in text-balance" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            <span className="block">Intelligent Content</span>
            <span className="block mt-1">Moderation</span>
          </h1>
          
          <p className="max-w-xl text-foreground/70 text-lg md:text-xl opacity-0 animate-fade-in text-balance" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            A cutting-edge, AI-powered moderation system that detects, analyzes, and neutralizes harmful online content in real-time.
          </p>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
            <a 
              href="#product" 
              className="rounded-full bg-primary text-white px-8 py-3 font-medium hover-scale"
            >
              Discover
            </a>
            <a 
              href="#content-analyzer" 
              className="rounded-full bg-secondary text-foreground px-8 py-3 font-medium hover-scale"
            >
              Try Content Analyzer
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
