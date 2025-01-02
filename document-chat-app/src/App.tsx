import React from 'react';
import { Chat } from './components/Chat';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 h-[600px]">
          <h1 className="text-2xl font-bold mb-4">Chat with Documents</h1>
          <Chat />
        </div>
      </div>
    </div>
  );
}
