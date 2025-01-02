import cors from 'cors';

export const corsMiddleware = cors({
  origin: 'http://localhost:3000', // Document Upload App
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
});
