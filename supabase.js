import { createClient } from "@supabase/supabase-js";
const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL =
  "https://agquvnnrhyypibcezqou.supabase.co");
const supabaseKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY =
  " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFncXV2bm5yaHl5cGliY2V6cW91Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwNzgxMzcsImV4cCI6MjA2MDY1NDEzN30.APSLQknX6VeX2rePzePWk8vhXbVBrCpezNubCHMecIU");

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
