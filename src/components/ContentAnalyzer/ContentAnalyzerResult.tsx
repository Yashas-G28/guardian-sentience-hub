
import React from 'react';
import { CheckCircle, AlertTriangle, XCircle, BarChart2, Shield, Globe, Film } from 'lucide-react';

type ResultProps = {
  result: {
    score: number;
    category: string;
    details: string;
    plainEnglish: string;
    isDeepfake?: boolean;
  };
};

const ContentAnalyzerResult: React.FC<ResultProps> = ({ result }) => {
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

  const getCategoryIcon = (category: string) => {
    if (category === 'non-english content') return <Globe className="h-4 w-4 mr-2 text-blue-500" />;
    if (category === 'potential synthetic media' || category.includes('deepfake')) return <Film className="h-4 w-4 mr-2 text-purple-500" />;
    return null;
  };

  return (
    <div className="mt-6 animate-fade-in">
      <div className="border-t border-border pt-6">
        <div className="flex items-center mb-4">
          <h3 className="text-xl font-semibold flex items-center">
            Analysis Results
            <BarChart2 className="ml-2 h-5 w-5 text-primary" />
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-secondary/50 rounded-lg p-4 backdrop-blur-sm shadow-sm">
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
          
          <div className="bg-secondary/50 rounded-lg p-4 backdrop-blur-sm shadow-sm">
            <span className="text-sm font-medium text-foreground/70">Content Category</span>
            <p className="font-medium capitalize mt-1 flex items-center">
              {getCategoryIcon(result.category)}
              {result.category}
            </p>
          </div>

          <div className="bg-secondary/50 rounded-lg p-4 backdrop-blur-sm shadow-sm">
            <span className="text-sm font-medium text-foreground/70">Deepfake Detection</span>
            <p className="font-medium mt-1 flex items-center">
              <Film className="h-4 w-4 mr-2 text-purple-500" />
              {result.isDeepfake ? 
                <span className="text-red-500">Potential synthetic media detected</span> : 
                <span className="text-green-500">No synthetic media detected</span>
              }
            </p>
          </div>
        </div>
        
        <div className="bg-secondary/50 rounded-lg p-4 mb-4 backdrop-blur-sm shadow-sm">
          <span className="text-sm font-medium text-foreground/70">Technical Analysis</span>
          <p className="mt-1">
            {result.details}
          </p>
        </div>
        
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 backdrop-blur-sm shadow-sm">
          <span className="text-sm font-medium text-primary">Result</span>
          <p className="mt-1">
            {result.plainEnglish}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContentAnalyzerResult;
