# Quick Start Guide

Get your portfolio site running in 15 minutes!

## Prerequisites

- A web browser
- A Supabase account (free tier works great)
- Basic understanding of copying and pasting

## Step-by-Step Setup

### 1. Create Supabase Project (5 minutes)

1. Go to [supabase.com](https://supabase.com) and sign up
2. Click "New Project"
3. Fill in:
   - Project name: `asamala-portfolio`
   - Database password: (generate a strong one)
   - Region: (choose closest to your location)
4. Wait for project to initialize (~2 minutes)

### 2. Set Up Database (3 minutes)

1. In your Supabase dashboard, click "SQL Editor"
2. Open `SETUP.md` in this project
3. Copy all the SQL from "Create Tables" section
4. Paste into SQL Editor and click "Run"
5. Copy and run the "Insert Initial Data" SQL
6. Copy and run the "Enable Row Level Security" SQL

### 3. Configure Your Site (2 minutes)

1. In your project folder, copy the config file:
   ```bash
   copy config.example.js config.js
   ```

2. In Supabase dashboard:
   - Click Settings (gear icon)
   - Click "API"
   - Copy "Project URL"
   - Copy "anon public" key

3. Open `config.js` and paste your credentials:
   ```javascript
   const SUPABASE_URL = 'paste-your-project-url-here';
   const SUPABASE_ANON_KEY = 'paste-your-anon-key-here';
   ```

### 4. Create Admin User (2 minutes)

1. In Supabase dashboard, click "Authentication"
2. Click "Add user" → "Create new user"
3. Enter:
   - Email: your-email@example.com
   - Password: (create a strong password)
   - Auto Confirm User: ✅ (check this box)
4. Click "Create user"

### 5. Test Your Site (3 minutes)

1. Open `index.html` in your browser
   - You should see the portfolio site with sample data

2. Open `admin.html` in your browser
   - Log in with the email and password you just created
   - Try editing the artist info
   - Add a new work or exhibition
   - Go back to `index.html` and refresh - see your changes!

## Next Steps

### Customize Content

1. Log into the admin panel (`admin.html`)
2. Update artist information with real details
3. Replace sample works with actual artwork
4. Update exhibitions and contact info

### Add Your Images

**Option 1: Use Image URLs**
- Upload images to any image host (Imgur, Cloudinary, etc.)
- Copy the direct image URL
- Paste into admin panel when adding/editing works

**Option 2: Use Supabase Storage**
1. In Supabase, go to Storage
2. Create a new bucket called "images" (make it public)
3. Upload your images
4. Copy the public URL
5. Use in admin panel

### Replace Logo and Hero Image

1. Replace files in the `images/` folder:
   - `Asap-logo.png` - Your logo (PNG with transparency recommended)
   - `Hero- image.png` - Hero section background
   - `Artist Image.jpg` - Your artist photo

2. Keep the same file names, or update references in `style.css`

## Deploy Your Site

### Option 1: Netlify (Easiest)

1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your project folder
3. In Site settings → Environment variables, add:
   - `SUPABASE_URL`: your-url
   - `SUPABASE_ANON_KEY`: your-key
4. Done! Your site is live

### Option 2: Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in your project folder
3. Follow the prompts
4. Add environment variables in Vercel dashboard

### Option 3: GitHub Pages

1. Create a GitHub repository
2. Push your code (`.gitignore` will protect `config.js`)
3. Enable GitHub Pages in repository settings
4. Your site will be at `username.github.io/repo-name`

**Note:** For GitHub Pages, you'll need to commit a `config.js` with credentials (or use a build process).

## Troubleshooting

### "Error loading data"
- Check that you've updated `config.js` with real credentials
- Verify your Supabase project is active (not paused)
- Check browser console for specific error messages

### "Cannot log in to admin"
- Confirm user was created in Supabase Authentication
- Make sure "Auto Confirm User" was checked
- Try resetting the password in Supabase dashboard

### Images not showing
- Verify image URLs are public and accessible
- Check that URLs start with `https://`
- Try opening image URL directly in browser

## Need Help?

1. Review `SETUP.md` for detailed instructions
2. Check `README.md` for comprehensive documentation
3. Visit Supabase docs: [supabase.com/docs](https://supabase.com/docs)
4. Check browser console for error messages

## Success! 🎉

Your portfolio is now live and you can manage all content through the admin panel. No coding required!
