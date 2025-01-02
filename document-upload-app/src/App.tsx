import React from 'react';
import { FileUpload } from './components/FileUpload';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-4">Document Upload</h1>
          <FileUpload />
        </div>
      </div>
    </div>
  );
}
