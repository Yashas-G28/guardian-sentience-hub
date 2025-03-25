
import React, { useState } from 'react';
import { Shield } from 'lucide-react';
import ContentAnalyzerResult from './ContentAnalyzer/ContentAnalyzerResult';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';

const ContentAnalyzer = () => {
  const [content, setContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<null | {
    score: number;
    category: string;
    details: string;
    plainEnglish: string;
    isDeepfake: boolean;
  }>(null);

  // Comprehensive list of abusive words
  const abusiveWords = [
    'arse', 'arsehead', 'arsehole', 'ass', 'ass hole', 'asshole', 'bastard', 'bitch', 'bloody', 
    'bollocks', 'brotherfucker', 'bugger', 'bullshit', 'child-fucker', 'christ on a bike', 
    'christ on a cracker', 'cock', 'cocksucker', 'crap', 'cunt', 'dammit', 'damn', 'damned', 
    'damn it', 'dick', 'dick-head', 'dickhead', 'dumb ass', 'dumb-ass', 'dumbass', 'dyke', 
    'faggot', 'father-fucker', 'fatherfucker', 'fuck', 'fucked', 'fucker', 'fucking', 
    'god dammit', 'goddammit', 'god damn', 'goddamn', 'goddamned', 'goddamnit', 'godsdamn', 
    'hell', 'holy shit', 'horseshit', 'in shit', 'jackarse', 'jack-ass', 'jackass', 
    'jesus christ', 'jesus fuck', 'jesus harold christ', 'jesus h. christ', 
    'jesus, mary and joseph', 'jesus wept', 'kike', 'mother fucker', 'mother-fucker', 
    'motherfucker', 'nigga', 'nigra', 'pigfucker', 'piss', 'prick', 'pussy', 
    'shit', 'shit ass', 'shite', 'sibling fucker', 'sisterfuck', 'sisterfucker', 
    'slut', 'son of a bitch', 'son of a whore', 'spastic', 'sweet jesus', 'twat', 'wanker'
  ];

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
      let isDeepfake = false;
      
      // Extended analysis logic with categories for harmful content
      const harmfulWords = ['hate', 'kill', 'attack', 'threat', 'violence', 'racist'];
      const misinfoWords = ['fake news', 'conspiracy', 'hoax', 'they don\'t want you to know'];
      const bullyingPhrases = [
        'nobody likes you', 'you\'re nothing', 'kill yourself', 'you deserve', 
        'should die', 'everyone hates', 'pathetic', 'go cry', 'weak', 'failure'
      ];
      
      const deepfakeIndicators = [
        'ai generated', 'deepfake', 'synthetic media', 'fake video', 
        'artificially created', 'manipulated image', 'not real person', 'artificial intelligence generated',
        'computer generated', 'machine learning created', 'fake face', 'generated face'
      ];
      
      const foreignLanguageIndicators = [
        'translate', 'foreign', 'non-english', 'multilingual',
        // Common non-English words/phrases that might indicate foreign language
        'hola', 'bonjour', 'こんにちは', '你好', 'привет', 'مرحبا'
      ];
      
      // Check for various content categories
      const harmfulCount = harmfulWords.filter(word => contentLower.includes(word)).length;
      const misinfoCount = misinfoWords.filter(word => contentLower.includes(word)).length;
      const abusiveCount = abusiveWords.filter(word => contentLower.includes(word)).length;
      const bullyingCount = bullyingPhrases.filter(phrase => contentLower.includes(phrase)).length;
      const deepfakeCount = deepfakeIndicators.filter(indicator => contentLower.includes(indicator)).length;
      const foreignCount = foreignLanguageIndicators.filter(indicator => contentLower.includes(indicator)).length;
      
      // Set deepfake detection flag
      isDeepfake = deepfakeCount > 0;
      
      // Prioritize detection based on severity (highest to lowest)
      if (bullyingCount > 0) {
        score = 0.7 + (bullyingCount * 0.1);
        category = 'bullying content';
        details = `Detected ${bullyingCount} bullying ${bullyingCount === 1 ? 'phrase' : 'phrases'} that may cause emotional harm.`;
        plainEnglish = 'This content contains language patterns typically associated with bullying behavior. It includes phrases meant to demean, intimidate, or cause emotional distress to the recipient.';
      } else if (abusiveCount > 0) {
        score = 0.6 + (abusiveCount * 0.1);
        category = 'explicit/abusive language';
        details = `Found ${abusiveCount} instances of explicit or abusive language that violates community standards.`;
        plainEnglish = 'This content contains explicit or abusive language that violates our community standards. Such language is inappropriate and may be offensive to many users.';
      } else if (harmfulCount > 0) {
        score = 0.3 + (harmfulCount * 0.2);
        category = 'potentially harmful';
        details = `Detected ${harmfulCount} potentially harmful terms that may violate community guidelines.`;
        plainEnglish = 'This content contains language that could be considered harmful. It uses words often associated with aggression or hate speech that many would find offensive.';
      } else if (misinfoCount > 0) {
        score = 0.4 + (misinfoCount * 0.15);
        category = 'potential misinformation';
        details = `Identified ${misinfoCount} phrases commonly associated with misinformation.`;
        plainEnglish = 'This content has language patterns commonly used in misleading information. It contains phrases frequently seen in content designed to spread unverified claims.';
      } else if (deepfakeCount > 0) {
        score = 0.45 + (deepfakeCount * 0.15);
        category = 'potential synthetic media';
        details = `Identified ${deepfakeCount} indicators of AI-generated or manipulated media.`;
        plainEnglish = 'This content appears to reference or contain synthetic media created using AI. It may include deepfake videos, artificially generated images, or other manipulated content.';
      } else if (foreignCount > 0) {
        // Lower risk score for foreign language - just flagging for review
        score = 0.25 + (foreignCount * 0.05);
        category = 'non-english content';
        details = `Detected indicators of non-English content that may require specialized review.`;
        plainEnglish = 'This content appears to contain non-English text or references multilingual content. Our system has flagged it for specialized review to ensure proper moderation across languages.';
      } else {
        // Calculate general safety score based on content length and complexity
        const wordCount = content.split(/\s+/).length;
        score = Math.min(0.1 + (wordCount > 20 ? 0.1 : 0), 0.2);
        category = 'safe';
        details = 'No harmful content detected. Content appears to be safe.';
        plainEnglish = 'This content seems safe. We didn\'t find any concerning language or patterns that would suggest harmful intent, explicit language, abusive language, bullying, deepfakes, or misinformation.';
      }
      
      setResult({
        score: Math.min(score, 0.9),
        category,
        details,
        plainEnglish,
        isDeepfake
      });
      
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <section id="content-analyzer" className="section-padding bg-gradient-to-b from-background to-card/50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-primary">
            Content Analyzer
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Test our AI-powered content moderation system. Enter any text to analyze for potential harmful content, explicit language, abusive language, bullying, deepfakes, multilingual content, or misinformation.
          </p>
        </div>

        <div className="glass-morphism rounded-2xl p-6 shadow-lg border border-border/30">
          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-medium mb-2">
              Enter content to analyze
            </label>
            <Textarea
              id="content"
              rows={5}
              className="w-full rounded-lg bg-background/50 border border-border p-3 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter text to analyze for potentially harmful content, explicit language, abusive language, bullying, deepfakes, or non-English content..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          
          <div className="flex justify-end">
            <Button
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
            </Button>
          </div>
          
          {result && <ContentAnalyzerResult result={result} />}
        </div>
      </div>
    </section>
  );
};

export default ContentAnalyzer;
