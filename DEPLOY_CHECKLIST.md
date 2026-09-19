# Pre-Deployment Checklist

Use this checklist before pushing to GitHub and deploying to Vercel.

## ✅ Supabase Setup

- [ ] Supabase project created
- [ ] All database tables created (artist, practice, contact, works, exhibitions)
- [ ] Row Level Security (RLS) enabled on all tables
- [ ] RLS policies configured (public read, authenticated write)
- [ ] Storage bucket created (`portfolio-images`)
- [ ] Storage policies configured
- [ ] Admin user created in Authentication
- [ ] Admin user email confirmed
- [ ] Test data added to all tables

## ✅ Configuration Files

- [ ] `config.js` has correct Supabase credentials (DO NOT COMMIT)
- [ ] `config.example.js` exists as template
- [ ] `.gitignore` includes `config.js` and `.env`
- [ ] `.env.example` exists
- [ ] `vercel.json` configured
- [ ] `package.json` created

## ✅ Content

- [ ] Artist name updated in database
- [ ] Biography written
- [ ] Practice description added
- [ ] At least 3 works added with images
- [ ] Exhibition history added
- [ ] Contact email set
- [ ] Social media links added (optional)
- [ ] WhatsApp number added (optional)

## ✅ Images

- [ ] Logo uploaded (`images/Asap-logo.png`)
- [ ] Hero image uploaded (`images/Hero- image.png`)
- [ ] Artist photo uploaded (`images/Artist Image.jpg`)
- [ ] All image files committed to Git

## ✅ Testing Locally

- [ ] Site runs on local server
- [ ] Homepage loads correctly
- [ ] Works display from database
- [ ] About page works
- [ ] Admin panel accessible
- [ ] Can log in to admin
- [ ] Can add/edit/delete works
- [ ] Image upload works
- [ ] WhatsApp button shows (if number added)
- [ ] All links work
- [ ] Mobile responsive (test on phone/tablet)

## ✅ Git Preparation

- [ ] Git repository initialized
- [ ] All necessary files added
- [ ] `.gitignore` working correctly
- [ ] `config.js` NOT in Git (verify with `git status`)
- [ ] Initial commit created
- [ ] Commit message is descriptive

## ✅ GitHub

- [ ] GitHub repository created
- [ ] Repository is private (or public if desired)
- [ ] Remote origin added
- [ ] Code pushed to main branch
- [ ] README.md displays correctly on GitHub

## ✅ Vercel Preparation

- [ ] Vercel account created
- [ ] Connected to GitHub
- [ ] Environment variables ready:
  - `SUPABASE_URL`
  - `SUPABASE_ANON_KEY`

## ✅ Post-Deployment

- [ ] Site deployed successfully
- [ ] Production URL works
- [ ] SSL certificate active (HTTPS)
- [ ] Homepage loads
- [ ] Data loads from Supabase
- [ ] Admin panel accessible
- [ ] Can log in to admin
- [ ] Images display correctly
- [ ] Forms work
- [ ] WhatsApp button works
- [ ] All sections display properly
- [ ] Mobile version works

## ✅ Supabase Production Config

- [ ] Vercel domain added to Supabase allowed origins
- [ ] API settings reviewed
- [ ] Usage limits checked (free tier)
- [ ] Backup plan considered

## ✅ SEO & Performance

- [ ] Page titles are correct
- [ ] Meta descriptions added
- [ ] Images optimized
- [ ] Site loads quickly
- [ ] No console errors

## ✅ Security

- [ ] Admin password is strong
- [ ] No credentials in Git
- [ ] RLS policies prevent unauthorized access
- [ ] Storage bucket has correct permissions
- [ ] HTTPS enabled on production

## ✅ Documentation

- [ ] README.md updated with correct info
- [ ] Deployment instructions clear
- [ ] Contact information for support
- [ ] Version number updated

## 🚀 Ready to Deploy!

When all items are checked:

```bash
# Final check
git status

# Push to GitHub
git push origin main

# Deploy on Vercel
# (Vercel will auto-deploy when you push)
```

## 📞 Final Test

After deployment, test everything one more time:

1. Visit your live site
2. Browse all pages
3. Log in to admin
4. Add a test work
5. Verify it appears on homepage
6. Test on mobile device
7. Share with a friend for feedback!

---

**Remember**: You can always update content through the admin panel without redeploying. Code changes require a new Git push.

Good luck with your launch! 🎉
