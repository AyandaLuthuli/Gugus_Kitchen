import { createClient } from "@supabase/supabase-js";
const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL =
  "https://dqnmbayimyiuqfzdalox.supabase.co");
const supabaseKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY =
  " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxbm1iYXlpbXlpdXFmemRhbG94Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5OTIwOTYsImV4cCI6MjA3MDU2ODA5Nn0.XPsThMYTgbUX4JU743QhdDwPvVMcPZ1_3OBvMMGW5o4");

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
