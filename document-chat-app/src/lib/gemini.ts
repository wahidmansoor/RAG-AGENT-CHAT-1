import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('Missing Gemini API key');
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export async function generateAnswer(query: string, context: string): Promise<string> {
  try {
    const prompt = `Context: ${context}\n\nQuestion: ${query}\n\nAnswer the question based only on the provided context. If you cannot find the answer in the context, say so.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini error:', error);
    throw new Error('Failed to generate answer');
  }
}
