# Deployment Guide - Vercel & GitHub

## Prerequisites

- GitHub account
- Vercel account (free tier works great)
- Supabase project set up and configured

## Step 1: Prepare for Git

### Update .gitignore

Make sure these files are ignored (already configured):
- ✅ `config.js` (contains credentials)
- ✅ `.env` and `.env.local`
- ✅ Node modules and IDE files

### Keep These Files

Make sure these ARE committed:
- ✅ `config.example.js` (template)
- ✅ `.env.example` (template)
- ✅ All `.md` documentation files
- ✅ All HTML, CSS, JS files (except config.js)
- ✅ `images/` folder with logo and hero image

## Step 2: Initialize Git Repository

Open your terminal in the project folder:

```bash
# Initialize Git repository
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Asamala Mtima Portfolio"
```

## Step 3: Create GitHub Repository

### Option A: Using GitHub Website

1. Go to https://github.com
2. Click the **+** icon → **New repository**
3. Repository name: `asamala-mtima-portfolio` (or your choice)
4. Description: "Artist portfolio website with admin panel"
5. Keep it **Private** (recommended) or Public
6. **DO NOT** initialize with README, .gitignore, or license
7. Click **Create repository**

### Option B: Using GitHub CLI (if installed)

```bash
gh repo create asamala-mtima-portfolio --private --source=. --remote=origin
```

## Step 4: Push to GitHub

Copy the commands from GitHub (they'll look like this):

```bash
# Add remote
git remote add origin https://github.com/YOUR-USERNAME/asamala-mtima-portfolio.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

## Step 5: Deploy to Vercel

### Method 1: Vercel Dashboard (Easiest)

1. Go to https://vercel.com
2. Sign up or log in (you can use GitHub to sign in)
3. Click **Add New...** → **Project**
4. Click **Import Git Repository**
5. Select your repository: `asamala-mtima-portfolio`
6. Click **Import**

### Configure Build Settings

Vercel will auto-detect it's a static site. Just verify:
- **Framework Preset**: Other
- **Root Directory**: `./`
- **Build Command**: (leave empty)
- **Output Directory**: `./`

### Add Environment Variables

Click **Environment Variables** and add:

```
SUPABASE_URL = https://mmkblarmsmfnvaepxzym.supabase.co
SUPABASE_ANON_KEY = your-anon-key-here
```

**IMPORTANT**: These are for reference only. Since this is a static site, the config.js file needs to be created manually after deployment or you can use Vercel's build process to inject them.

### Click Deploy

Wait 1-2 minutes for deployment to complete.

## Step 6: Configure Supabase for Production

In your Supabase dashboard:

1. Go to **Settings** → **API**
2. Scroll to **URL Configuration**
3. Add your Vercel domain to allowed origins:
   - `https://your-site.vercel.app`
   - `https://your-custom-domain.com` (if you have one)

## Step 7: Update config.js on Vercel (Important!)

Since `config.js` is gitignored, you need to create it on Vercel:

### Option A: Use Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link to your project
vercel link

# Set environment variables
vercel env add SUPABASE_URL
vercel env add SUPABASE_ANON_KEY

# Redeploy
vercel --prod
```

### Option B: Manual Setup (Recommended)

After first deployment:

1. Your site will be live but won't load data (config.js missing)
2. Create a serverless function or use Vercel's environment variables
3. **OR** - Commit a production config.js to a separate branch

### Option C: Build-time Injection (Advanced)

Create `build.sh`:
```bash
#!/bin/bash
cat > config.js << EOF
const SUPABASE_URL = '${SUPABASE_URL}';
const SUPABASE_ANON_KEY = '${SUPABASE_ANON_KEY}';
let supabaseClient = null;
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    if (window.supabase) {
      supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      window.supabaseClient = supabaseClient;
      console.log('✅ Supabase client initialized!');
    }
  });
}
EOF
```

## Step 8: Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click **Settings** → **Domains**
3. Add your custom domain
4. Update DNS records as instructed
5. Wait for SSL certificate (automatic)

## Step 9: Test Your Deployment

Visit your Vercel URL and test:

- ✅ Homepage loads
- ✅ Works display from database
- ✅ About page works
- ✅ Admin panel accessible
- ✅ Can log in to admin
- ✅ WhatsApp button shows (if number added)
- ✅ Social media links work

## Automatic Deployments

Now every time you push to GitHub:

```bash
# Make changes
git add .
git commit -m "Update content"
git push

# Vercel automatically deploys!
```

## Vercel URLs

You'll get:
- **Production**: `https://your-project.vercel.app`
- **Preview**: Automatic preview URLs for each commit
- **Custom**: Your own domain (if added)

## Troubleshooting

### Site loads but no data

**Problem**: config.js not deployed
**Solution**: Use one of the config.js deployment methods above

### CORS errors

**Problem**: Supabase doesn't allow your domain
**Solution**: Add Vercel URL to Supabase allowed origins

### Admin panel 404

**Problem**: Vercel routing
**Solution**: Already configured in `vercel.json`

### Images not loading

**Problem**: Relative paths
**Solution**: All images should be in `images/` folder and committed to Git

## Environment Variables Reference

For Vercel, you can use these variable names:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

Access in build script or use static config.js approach.

## Security Checklist

Before going live:

- ✅ `config.js` is in `.gitignore`
- ✅ `.env` files are gitignored
- ✅ No real passwords in committed files
- ✅ Supabase RLS policies enabled
- ✅ Admin email verified in Supabase
- ✅ Strong admin password set
- ✅ Custom domain uses HTTPS
- ✅ Supabase project not paused

## Maintenance

### Updating Content

Just use the admin panel - no redeployment needed!

### Code Updates

```bash
git add .
git commit -m "Description of changes"
git push
```

Vercel deploys automatically.

### Rollback

In Vercel dashboard:
1. Go to **Deployments**
2. Find previous working deployment
3. Click **...** → **Promote to Production**

## Cost

- **Vercel**: Free tier (plenty for this site)
- **Supabase**: Free tier (1GB storage, 2GB bandwidth)
- **GitHub**: Free for public/private repos
- **Custom Domain**: $10-15/year (optional)

## Support

- Vercel Docs: https://vercel.com/docs
- Supabase Docs: https://supabase.com/docs
- GitHub Docs: https://docs.github.com

Your portfolio is now live and ready to impress! 🚀
