
import { createClient } from '@supabase/supabase-js';

// Hardcoded fallbacks to ensure Netlify deployment works immediately without dashboard config
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ywxwuyxrjhyvxfatknqy.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3eHd1eXhyamh5dnhmYXRrbnF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg0Mzk4MzcsImV4cCI6MjA4NDAxNTgzN30.OwKvhGv25PtTFKqWzG1DJ5DYhWfMaiRbsfJL8VWIETw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
