
import React, { useState } from 'react';
import { CheckCircle, AlertTriangle, XCircle, BarChart2, Shield } from 'lucide-react';

const ContentAnalyzer = () => {
  const [content, setContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<null | {
    score: number;
    category: string;
    details: string;
    plainEnglish: string;
  }>(null);

  const analyzeContent = () => {
    if (!content.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // This is a mock implementation - in a real app, this would call an actual API
      const contentLower = content.toLowerCase();
      let score = 0;
      let category = 'safe';
      let details = '';
      let plainEnglish = '';
      
      // Simple analysis logic based on keywords
      const harmfulWords = ['hate', 'kill', 'attack', 'threat', 'violence', 'racist'];
      const misinfoWords = ['fake news', 'conspiracy', 'hoax', 'they don\'t want you to know'];
      
      // Check for harmful content
      const harmfulCount = harmfulWords.filter(word => contentLower.includes(word)).length;
      const misinfoCount = misinfoWords.filter(word => contentLower.includes(word)).length;
      
      if (harmfulCount > 0) {
        score = 0.3 + (harmfulCount * 0.2);
        category = 'potentially harmful';
        details = `Detected ${harmfulCount} potentially harmful terms that may violate community guidelines.`;
        plainEnglish = 'This content contains language that could be considered harmful. It uses words often associated with aggression or hate speech that many would find offensive.';
      } else if (misinfoCount > 0) {
        score = 0.4 + (misinfoCount * 0.15);
        category = 'potential misinformation';
        details = `Identified ${misinfoCount} phrases commonly associated with misinformation.`;
        plainEnglish = 'This content has language patterns commonly used in misleading information. It contains phrases frequently seen in content designed to spread unverified claims.';
      } else {
        // Calculate general safety score based on content length and complexity
        const wordCount = content.split(/\s+/).length;
        score = Math.min(0.1 + (wordCount > 20 ? 0.1 : 0), 0.2);
        category = 'safe';
        details = 'No harmful content detected. Content appears to be safe.';
        plainEnglish = 'This content seems safe. We didn\'t find any concerning language or patterns that would suggest harmful intent or misinformation.';
      }
      
      setResult({
        score: Math.min(score, 0.9),
        category,
        details,
        plainEnglish
      });
      
      setIsAnalyzing(false);
    }, 1500);
  };

  const getRiskLevel = (score: number) => {
    if (score < 0.3) return ['Low Risk', 'bg-green-500/20', 'text-green-500'];
    if (score < 0.6) return ['Medium Risk', 'bg-yellow-500/20', 'text-yellow-500'];
    return ['High Risk', 'bg-red-500/20', 'text-red-500'];
  };

  const getRiskIcon = (score: number) => {
    if (score < 0.3) return <CheckCircle className="h-5 w-5 text-green-500" />;
    if (score < 0.6) return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    return <XCircle className="h-5 w-5 text-red-500" />;
  };

  return (
    <section id="content-analyzer" className="section-padding bg-gradient-to-b from-background to-card/50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Content Analyzer
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Test our AI-powered content moderation system. Enter any text to analyze for potential harmful content, misinformation, or policy violations.
          </p>
        </div>

        <div className="bg-card/60 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-border">
          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-medium mb-2">
              Enter content to analyze
            </label>
            <textarea
              id="content"
              rows={5}
              className="w-full rounded-lg bg-background border border-border p-3 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter text to analyze for potential policy violations..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={analyzeContent}
              disabled={isAnalyzing || !content.trim()}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? (
                <span className="inline-block h-4 w-4 rounded-full border-2 border-t-transparent border-white animate-spin mr-2"></span>
              ) : (
                <Shield className="h-4 w-4 mr-2" />
              )}
              {isAnalyzing ? 'Analyzing...' : 'Analyze Content'}
            </button>
          </div>
          
          {result && (
            <div className="mt-6 animate-fade-in">
              <div className="border-t border-border pt-6">
                <div className="flex items-center mb-4">
                  <h3 className="text-xl font-semibold flex items-center">
                    Analysis Results
                    <BarChart2 className="ml-2 h-5 w-5 text-primary" />
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground/70">Risk Level</span>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${getRiskLevel(result.score)[1]}`}>
                        {getRiskIcon(result.score)}
                        <span className={`ml-1 ${getRiskLevel(result.score)[2]}`}>{getRiskLevel(result.score)[0]}</span>
                      </div>
                    </div>
                    <div className="w-full bg-background rounded-full h-2.5">
                      <div 
                        className="h-2.5 rounded-full bg-primary" 
                        style={{ width: `${result.score * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <span className="text-sm font-medium text-foreground/70">Content Category</span>
                    <p className="font-medium capitalize mt-1">
                      {result.category}
                    </p>
                  </div>
                </div>
                
                <div className="bg-secondary/50 rounded-lg p-4 mb-4">
                  <span className="text-sm font-medium text-foreground/70">Technical Analysis</span>
                  <p className="mt-1">
                    {result.details}
                  </p>
                </div>
                
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                  <span className="text-sm font-medium text-primary">Plain English Explanation</span>
                  <p className="mt-1">
                    {result.plainEnglish}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContentAnalyzer;
