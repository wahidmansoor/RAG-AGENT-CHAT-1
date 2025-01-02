import { Request, Response } from 'express';
import { supabase } from '../lib/supabase';
import { generateAnswer } from '../lib/ai/client';
import { searchSimilarChunks } from '../lib/storage/vectorStore';

export async function sendMessage(req: Request, res: Response) {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Search for relevant document chunks
    const relevantChunks = await searchSimilarChunks(message);
    const context = relevantChunks.map(chunk => chunk.content).join('\n\n');

    // Generate AI response
    const response = await generateAnswer(message, context);

    // Store in chat history
    const { error: historyError } = await supabase
      .from('chat_history')
      .insert({
        user_query: message,
        ai_response: response,
        relevant_docs: relevantChunks.map(chunk => chunk.id),
      });

    if (historyError) {
      throw historyError;
    }

    res.json({
      response,
      relevantChunks,
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({
      error: 'Failed to process message',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

export async function getChatHistory(req: Request, res: Response) {
  try {
    const { data, error } = await supabase
      .from('chat_history')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      throw error;
    }

    res.json(data);
  } catch (error) {
    console.error('History error:', error);
    res.status(500).json({
      error: 'Failed to fetch chat history',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
