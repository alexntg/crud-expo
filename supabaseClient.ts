import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://cukqazudgbsnphkkmnvz.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1a3FhenVkZ2JzbnBoa2ttbnZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3MjUwNDEsImV4cCI6MjA0NjMwMTA0MX0.NaQ5MDdc3daC7MAKZFAItTd5FGUkIy1hHI5skAafOdE';

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error('Las variables de entorno SUPABASE_URL y SUPABASE_KEY deben estar definidas.');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);


