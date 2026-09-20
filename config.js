// Supabase Configuration
// IMPORTANT: Do not commit this file with real credentials!
// This file should be listed in .gitignore

console.log('🔵 config.js loading...');
console.log('🔵 window.supabase available?', typeof window !== 'undefined' && typeof window.supabase !== 'undefined');

// For development: Replace these values with your actual Supabase credentials
// For production: Use environment variables or a secure config service

const SUPABASE_URL = 'https://mmkblarmsmfnvaepxzym.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ta2JsYXJtc21mbnZhZXB4enltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk4MDcwMTAsImV4cCI6MjEwNTM4MzAxMH0.DdB16q3lPjKRzu--Ut9pGXbfaZ0AaYGKM9sYX0XbGUQ';

console.log('🔵 SUPABASE_URL:', SUPABASE_URL);
console.log('🔵 ANON_KEY valid?', SUPABASE_ANON_KEY.startsWith('eyJ'));

// Validate configuration
if (SUPABASE_URL === 'YOUR_SUPABASE_PROJECT_URL' || SUPABASE_ANON_KEY === 'YOUR_SUPABASE_ANON_KEY') {
  console.error('⚠️ Supabase credentials not configured!');
  console.error('📖 See SETUP.md for instructions.');
} else if (!SUPABASE_ANON_KEY.startsWith('eyJ')) {
  console.error('❌ Invalid Supabase anon key format!');
  console.error('The anon key should be a JWT token starting with "eyJ"');
  console.error('Your current key:', SUPABASE_ANON_KEY);
  console.error('📖 See GET_CREDENTIALS.md for instructions on getting the correct key.');
  alert('Invalid Supabase credentials! Check browser console and see GET_CREDENTIALS.md');
}

// Initialize Supabase client (will be available globally as window.supabaseClient)
let supabaseClient = null;

// Initialize immediately when script loads
if (typeof window !== 'undefined') {
  // Check if Supabase library is already loaded
  const initializeSupabase = () => {
    console.log('🔵 initializeSupabase called');
    console.log('🔵 window.supabase:', window.supabase);
    if (window.supabase && SUPABASE_URL !== 'YOUR_SUPABASE_PROJECT_URL') {
      if (SUPABASE_ANON_KEY.startsWith('eyJ')) {
        console.log('🔵 Creating Supabase client...');
        supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        window.supabaseClient = supabaseClient;
        console.log('✅ Supabase client initialized successfully!');
        console.log('🔵 window.supabaseClient:', window.supabaseClient);
      } else {
        console.error('Cannot initialize Supabase with invalid anon key');
      }
    } else if (SUPABASE_URL === 'YOUR_SUPABASE_PROJECT_URL') {
      console.warn('Supabase not configured. Please set up your credentials in config.js');
    } else if (!window.supabase) {
      console.error('🔴 window.supabase is not available!');
    }
  };
  
  // Try to initialize immediately
  if (window.supabase) {
    initializeSupabase();
  } else {
    // If Supabase library not loaded yet, wait for it
    window.addEventListener('DOMContentLoaded', initializeSupabase);
  }
}
