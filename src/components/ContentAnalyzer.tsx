
import React, { useState, useRef } from 'react';
import { Shield, Upload, AlertTriangle } from 'lucide-react';
import ContentAnalyzerResult from './ContentAnalyzer/ContentAnalyzerResult';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { useToast } from '@/hooks/use-toast';
import FileUploadPreview from './ContentAnalyzer/FileUploadPreview';

const ContentAnalyzer = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [fileType, setFileType] = useState<'image' | 'video' | 'other' | null>(null);
  const [cussWordCount, setCussWordCount] = useState(0);
  const [isBanned, setIsBanned] = useState(false);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploadedFile(file);
    
    // Determine file type
    const fileTypeString = file.type.split('/')[0];
    if (fileTypeString === 'image') {
      setFileType('image');
    } else if (fileTypeString === 'video') {
      setFileType('video');
    } else {
      setFileType('other');
    }
    
    // Create preview
    if (fileTypeString === 'image') {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFilePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else if (fileTypeString === 'video') {
      setFilePreview(URL.createObjectURL(file));
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const clearUploadedFile = () => {
    setUploadedFile(null);
    setFilePreview(null);
    setFileType(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const checkForCussWords = (text: string) => {
    const lowerText = text.toLowerCase();
    let count = 0;
    
    for (const word of abusiveWords) {
      if (lowerText.includes(word)) {
        count++;
      }
    }
    
    return count;
  };

  const analyzeContent = () => {
    if ((!content.trim() && !uploadedFile) || isBanned) return;
    
    setIsAnalyzing(true);
    
    // Check for cuss words in the text content
    if (content.trim()) {
      const cussWordsFound = checkForCussWords(content);
      const updatedCussWordCount = cussWordCount + cussWordsFound;
      setCussWordCount(updatedCussWordCount);
      
      // Ban user if they've used 3 or more cuss words
      if (updatedCussWordCount >= 3) {
        setIsBanned(true);
        toast({
          title: "Account Warning",
          description: "You have been banned for using inappropriate language.",
          variant: "destructive"
        });
        setIsAnalyzing(false);
        return;
      } else if (cussWordsFound > 0) {
        toast({
          title: "Warning",
          description: `Inappropriate language detected. ${3 - updatedCussWordCount} more violations will result in a ban.`,
          variant: "destructive"
        });
      }
    }
    
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
      
      // Check for deepfake in uploaded file (simulated)
      if (uploadedFile) {
        if (fileType === 'image' || fileType === 'video') {
          // In a real implementation, you would send the file to a backend service for analysis
          // Here we're just simulating a random deepfake detection for demonstration
          isDeepfake = Math.random() > 0.5;
          
          if (isDeepfake) {
            score = 0.75;
            category = 'potential synthetic media';
            details = `Our AI analysis has detected indicators that this ${fileType} may be synthetically generated or manipulated.`;
            plainEnglish = `This ${fileType} appears to be AI-generated or manipulated. The content shows characteristics typical of deepfakes or other synthetic media.`;
          } else {
            score = 0.2;
            category = 'authentic media';
            details = `No synthetic manipulation detected in this ${fileType}.`;
            plainEnglish = `This ${fileType} appears to be authentic. Our analysis didn't detect any indicators of AI manipulation or generation.`;
          }
        } else {
          score = 0.3;
          category = 'unsupported file type';
          details = 'The uploaded file type is not supported for deepfake detection.';
          plainEnglish = 'We cannot analyze this file type for synthetic content. Deepfake detection currently supports only image and video files.';
        }
      } else {
        // Set deepfake detection flag for text
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
            Test our AI-powered content moderation system. Enter text or upload files to analyze for potential harmful content, synthetic media, explicit language, or misinformation.
          </p>
        </div>

        {isBanned && (
          <div className="mb-6 p-4 bg-destructive/20 rounded-lg border border-destructive">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <p className="font-medium text-destructive">Your account has been banned for violating our community guidelines.</p>
            </div>
            <p className="mt-2 text-sm">You have used inappropriate language multiple times. Please contact support for assistance.</p>
          </div>
        )}

        <div className="glass-morphism rounded-2xl p-6 shadow-lg border border-border/30">
          <div className={`opacity-${isBanned ? '50' : '100'} pointer-events-${isBanned ? 'none' : 'auto'}`}>
            <div className="mb-4">
              <label htmlFor="content" className="block text-sm font-medium mb-2">
                Enter content to analyze
              </label>
              <Textarea
                id="content"
                rows={5}
                className="w-full rounded-lg bg-background/50 border border-border p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter text to analyze for potentially harmful content..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={isBanned}
              />
            </div>
            
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium">
                  Upload image or video for deepfake detection
                </label>
                <p className="text-xs text-muted-foreground">
                  Supports JPG, PNG, GIF, MP4 (max 10MB)
                </p>
              </div>
              
              <input 
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*,video/*"
                onChange={handleFileChange}
                disabled={isBanned}
              />
              
              {!uploadedFile ? (
                <div 
                  onClick={triggerFileUpload}
                  className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:bg-background/50 cursor-pointer transition-colors"
                >
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-muted-foreground">Click to upload a file for deepfake detection</p>
                </div>
              ) : (
                <FileUploadPreview 
                  file={uploadedFile}
                  preview={filePreview}
                  fileType={fileType}
                  onClear={clearUploadedFile}
                />
              )}
            </div>
            
            <div className="flex justify-end">
              <Button
                onClick={analyzeContent}
                disabled={isAnalyzing || (!content.trim() && !uploadedFile) || isBanned}
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
          </div>
          
          {result && <ContentAnalyzerResult result={result} />}
        </div>
        
        {cussWordCount > 0 && !isBanned && (
          <div className="mt-4 text-sm text-center text-muted-foreground">
            <span className="font-medium">Warning:</span> You have used inappropriate language {cussWordCount} time{cussWordCount !== 1 ? 's' : ''}. 
            {cussWordCount < 3 ? ` ${3 - cussWordCount} more violation${3 - cussWordCount !== 1 ? 's' : ''} will result in a ban.` : ''}
          </div>
        )}
      </div>
    </section>
  );
};

export default ContentAnalyzer;
