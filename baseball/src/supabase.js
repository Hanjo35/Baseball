import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zjuedvrxdvcgvuqscgsd.supabase.co"; // 복사한 주소
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqdWVkdnJ4ZHZjZ3Z1cXNjZ3NkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1NjY4NzEsImV4cCI6MjA2MTE0Mjg3MX0.FYf1xDOmtx9ZHQzXV_Wij6ijIs0xbtpj0Xu79_eJLaI";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
