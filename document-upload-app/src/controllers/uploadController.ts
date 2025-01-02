import { Request, Response } from 'express';
import { supabase } from '../lib/supabase';
import { processPDFDocument } from '../lib/pdf/processor';

export async function uploadDocument(req: Request, res: Response) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const file = req.file;
    const buffer = file.buffer;

    // Process the document
    const result = await processPDFDocument(buffer);

    // Store document metadata in Supabase
    const { data, error } = await supabase
      .from('documents')
      .insert([
        {
          filename: file.originalname,
          content_type: file.mimetype,
          size: file.size,
          chunks: result.chunks,
          pages: result.pages,
        },
      ])
      .select()
      .single();

    if (error) {
      throw error;
    }

    res.json({
      success: true,
      document: data,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      error: 'Failed to process document',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
