const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const config = {
  headers: {
    apikey: supabaseKey,
    Authorization: `Bearer ${supabaseKey}`,
    Prefer: "return=representation",
  },
};

export default config;