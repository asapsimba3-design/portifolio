# Supabase Setup Guide

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Create a new project
4. Note down your project URL and anon key

## Step 2: Create Database Tables

Go to the SQL Editor in your Supabase dashboard and run these queries:

### Create Tables

```sql
-- Artist table
CREATE TABLE artist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  bio TEXT,
  location TEXT,
  working_scope TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Practice table
CREATE TABLE practice (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Contact table
CREATE TABLE contact (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  whatsapp TEXT,
  instagram TEXT,
  twitter TEXT,
  youtube TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Works table
CREATE TABLE works (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  year TEXT,
  medium TEXT,
  dimensions TEXT,
  image_url TEXT,
  is_large BOOLEAN DEFAULT FALSE,
  display_order INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Exhibitions table
CREATE TABLE exhibitions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  year TEXT NOT NULL,
  title TEXT NOT NULL,
  type TEXT,
  location TEXT,
  display_order INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);
```

### Insert Initial Data

```sql
-- Insert artist data
INSERT INTO artist (name, bio, location, working_scope)
VALUES (
  'ASAMALA MTIMA',
  'Asamala Mtima is a visual artist working across painting and mixed media. His practice explores the human experience, cultural identity and the landscapes that shape us.',
  'BASED IN LILONGWE, MALAWI',
  'WORKING GLOBALLY'
);

-- Insert practice data
INSERT INTO practice (description)
VALUES ('I create images that explore memory, identity, emotion, and the spaces between what we see and what we feel.');

-- Insert contact data
INSERT INTO contact (email, instagram, twitter, youtube)
VALUES ('studio@example.com', '#', '#', '#');

-- Insert works
INSERT INTO works (title, year, medium, dimensions, image_url, is_large, display_order)
VALUES 
  ('Roots & Resilience', '2025', 'Oil on canvas', '120 × 180 cm', 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=1200&q=85', true, 1),
  ('The Journey', '2025', 'Acrylic on canvas', '100 × 150 cm', 'https://images.unsplash.com/photo-1577083288073-40892c0860a4?auto=format&fit=crop&w=1000&q=85', false, 2),
  ('Stillness', '2025', 'Mixed media', '90 × 120 cm', 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=1000&q=85', false, 3),
  ('The Healer', '2024', 'Oil on canvas', '80 × 100 cm', 'https://images.unsplash.com/photo-1578301978018-3005759f48f7?auto=format&fit=crop&w=1000&q=85', false, 4),
  ('Daily Routines', '2025', 'Acrylic on canvas', '70 × 100 cm', 'https://images.unsplash.com/photo-1578926287939-58a0c5f5d9d7?auto=format&fit=crop&w=1000&q=85', false, 5);

-- Insert exhibitions
INSERT INTO exhibitions (year, title, type, location, display_order)
VALUES 
  ('2026', 'Bound by Place', 'Group Exhibition', 'Lilongwe, Malawi', 1),
  ('2025', 'Faces & Landscapes', 'Solo Exhibition', 'Blantyre, Malawi', 2),
  ('2024', 'The Human Condition', 'Group Exhibition', 'Johannesburg, South Africa', 3);
```

### Enable Row Level Security (RLS)

```sql
-- Enable RLS
ALTER TABLE artist ENABLE ROW LEVEL SECURITY;
ALTER TABLE practice ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact ENABLE ROW LEVEL SECURITY;
ALTER TABLE works ENABLE ROW LEVEL SECURITY;
ALTER TABLE exhibitions ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public read access" ON artist FOR SELECT USING (true);
CREATE POLICY "Public read access" ON practice FOR SELECT USING (true);
CREATE POLICY "Public read access" ON contact FOR SELECT USING (true);
CREATE POLICY "Public read access" ON works FOR SELECT USING (true);
CREATE POLICY "Public read access" ON exhibitions FOR SELECT USING (true);

-- Allow authenticated users to modify (admin access)
CREATE POLICY "Authenticated users full access" ON artist FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users full access" ON practice FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users full access" ON contact FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users full access" ON works FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users full access" ON exhibitions FOR ALL USING (auth.role() = 'authenticated');
```

## Step 3: Configure Your App

### Important Security Notes
- **NEVER commit `config.js` with real credentials** to version control
- The `.gitignore` file is set up to exclude `config.js` automatically
- Always use `config.example.js` as a template

### Setup Configuration

1. Copy the example configuration:
   ```bash
   copy config.example.js config.js
   ```
   Or on Mac/Linux:
   ```bash
   cp config.example.js config.js
   ```

2. Open `config.js` and replace the placeholder values:
   ```javascript
   const SUPABASE_URL = 'https://your-actual-project-id.supabase.co';
   const SUPABASE_ANON_KEY = 'your-actual-anon-key-here';
   ```

3. Find your credentials in Supabase:
   - Go to your project settings
   - Click on "API" in the left sidebar
   - Copy the "Project URL" (this is your `SUPABASE_URL`)
   - Copy the "anon public" key (this is your `SUPABASE_ANON_KEY`)

### Alternative: Using Environment Variables (Advanced)

If you're using a build tool like Vite, Webpack, or Parcel:

1. Create a `.env.local` file:
   ```
   SUPABASE_URL=https://your-project-id.supabase.co
   SUPABASE_ANON_KEY=your-anon-key-here
   ```

2. Update your build configuration to inject environment variables
3. The `.env.local` file is already in `.gitignore`

### For Production Deployment

When deploying to platforms like Netlify, Vercel, or similar:

1. Add environment variables in the platform's dashboard:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`

2. Configure the platform to inject these during build time

3. Update `config.js` to use environment variables if available

## Step 4: Set Up Authentication

In Supabase dashboard:
1. Go to Authentication > Providers
2. Enable Email authentication
3. Create an admin user in Authentication > Users
4. Use this user to log into the admin panel

## Notes

- The public website reads data anonymously
- The admin panel requires authentication
- Images can be stored in Supabase Storage or use external URLs
- For production, add custom domain and configure CORS in Supabase settings
