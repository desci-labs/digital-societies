import { createClient } from "@supabase/supabase-js";
import { Database } from "./types";

export const supabaseUrl = process.env.SUPABASE_URL;
export const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
export const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

if (!supabaseUrl || !supabaseSecretKey) {
  throw new Error("Missing API keys for Supabase");
}

export const supabase = createClient<Database>(supabaseUrl, supabaseSecretKey);
