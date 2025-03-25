
import React from 'react';
import { X, File, FileImage, FileVideo } from 'lucide-react';
import { Button } from '../ui/button';

interface FileUploadPreviewProps {
  file: File;
  preview: string | null;
  fileType: 'image' | 'video' | 'other' | null;
  onClear: () => void;
}

const FileUploadPreview: React.FC<FileUploadPreviewProps> = ({ 
  file, 
  preview, 
  fileType, 
  onClear 
}) => {
  const renderPreview = () => {
    if (!preview) {
      return (
        <div className="flex items-center justify-center p-4 bg-background/50 rounded-lg">
          <File className="h-8 w-8 text-muted-foreground" />
          <span className="ml-2 text-muted-foreground">No preview available</span>
        </div>
      );
    }

    if (fileType === 'image') {
      return (
        <div className="relative rounded-lg overflow-hidden bg-background/50">
          <img 
            src={preview} 
            alt="Uploaded content" 
            className="w-full h-auto object-contain max-h-64" 
          />
        </div>
      );
    }

    if (fileType === 'video') {
      return (
        <div className="relative rounded-lg overflow-hidden bg-background/50">
          <video 
            src={preview} 
            controls 
            className="w-full h-auto max-h-64"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center p-4 bg-background/50 rounded-lg">
        <File className="h-8 w-8 text-muted-foreground" />
        <span className="ml-2 text-muted-foreground">Unsupported file format</span>
      </div>
    );
  };

  const getFileIcon = () => {
    if (fileType === 'image') return <FileImage className="h-4 w-4 mr-2" />;
    if (fileType === 'video') return <FileVideo className="h-4 w-4 mr-2" />;
    return <File className="h-4 w-4 mr-2" />;
  };

  return (
    <div className="border rounded-lg p-4 bg-background/10">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          {getFileIcon()}
          <span className="text-sm font-medium truncate max-w-[250px]">
            {file.name}
          </span>
          <span className="text-xs ml-2 text-muted-foreground">
            ({(file.size / 1024 / 1024).toFixed(2)} MB)
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="h-8 w-8 p-0 rounded-full"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Remove file</span>
        </Button>
      </div>
      {renderPreview()}
    </div>
  );
};

export default FileUploadPreview;
