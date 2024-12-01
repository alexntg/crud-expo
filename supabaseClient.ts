import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = '';
const SUPABASE_KEY = '';

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error('Las variables de entorno SUPABASE_URL y SUPABASE_KEY deben estar definidas.');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);


