import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

// Default to empty strings to prevent runtime errors, but log warnings
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  "https://placeholder-project.supabase.co";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY || "placeholder-key";

if (
  !import.meta.env.VITE_SUPABASE_URL ||
  !import.meta.env.VITE_SUPABASE_ANON_KEY
) {
  console.warn(
    "Missing Supabase environment variables. Using placeholder values for development.",
  );
  console.warn(
    "Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment.",
  );
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
