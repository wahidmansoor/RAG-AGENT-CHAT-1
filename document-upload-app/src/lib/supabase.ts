import { createClient } from '@supabase/supabase-js';
import { validateEnv } from '../config/env';

const config = validateEnv();
export const supabase = createClient(
  config.VITE_SUPABASE_URL,
  config.VITE_SUPABASE_ANON_KEY
);
