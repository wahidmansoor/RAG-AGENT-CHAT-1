import { z } from 'zod';

const envSchema = z.object({
  VITE_SUPABASE_URL: z.string().url(),
  VITE_SUPABASE_ANON_KEY: z.string().min(1),
  VITE_GEMINI_API_KEY: z.string().min(1),
  PORT: z.string().default('3001'),
});

export type Config = z.infer<typeof envSchema>;

export function validateEnv(): Config {
  const config = {
    VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
    VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
    VITE_GEMINI_API_KEY: import.meta.env.VITE_GEMINI_API_KEY,
    PORT: process.env.PORT || '3001',
  };

  return envSchema.parse(config);
}
