import React, { useCallback, useState } from 'react';
import { Upload, AlertCircle } from 'lucide-react';

const ACCEPTED_FILE_TYPES = [
  'application/pdf',
  'text/plain',
  'text/markdown',
  'application/json',
  'text/csv'
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export function FileUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = useCallback(async (file: File) => {
    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      setError('Invalid file type. Please upload a supported file type.');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError(`File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit`);
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      // Placeholder for actual upload logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('File uploaded:', file.name);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload file');
    } finally {
      setIsUploading(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (isUploading) return;

    const files = Array.from(e.dataTransfer.files);
    files.forEach(handleFileUpload);
  }, [isUploading, handleFileUpload]);

  return (
    <div 
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className={`
        relative border-2 border-dashed rounded-lg p-8
        transition-colors
        ${isUploading ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-blue-500'}
        ${error ? 'border-red-300 bg-red-50' : ''}
      `}
    >
      <div className="text-center">
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          Drop your files here, or click to select
          <br />
          <span className="text-xs text-gray-500">
            Supported formats: PDF, TXT, MD, JSON, CSV (max {MAX_FILE_SIZE / 1024 / 1024}MB)
          </span>
        </p>
      </div>

      {error && (
        <div className="mt-2 flex items-center justify-center text-sm text-red-500">
          <AlertCircle className="h-4 w-4 mr-1" />
          {error}
        </div>
      )}

      <input
        type="file"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        accept={ACCEPTED_FILE_TYPES.join(',')}
        onChange={(e) => {
          const files = Array.from(e.target.files || []);
          files.forEach(handleFileUpload);
        }}
        disabled={isUploading}
      />
    </div>
  );
}
