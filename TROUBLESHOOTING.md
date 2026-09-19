# Troubleshooting Guide

## Login Issues

### Error: "400 Bad Request" when logging in

This usually means the user account is not properly set up. Follow these steps:

#### Solution 1: Create User with Auto-Confirm

1. Go to your Supabase dashboard: https://app.supabase.com
2. Select your project
3. Navigate to **Authentication** → **Users**
4. Click **Add user** → **Create new user**
5. Fill in:
   - Email: your-email@example.com
   - Password: (create a strong password)
   - ✅ **Auto Confirm User** ← IMPORTANT: Check this box!
6. Click **Create user**
7. Try logging in again

#### Solution 2: Manually Confirm Existing User

If you already created a user but forgot to auto-confirm:

1. Go to **SQL Editor** in Supabase
2. Run this query:
   ```sql
   UPDATE auth.users 
   SET email_confirmed_at = NOW() 
   WHERE email = 'your-email@example.com';
   ```
3. Replace `your-email@example.com` with your actual email
4. Click **Run**
5. Try logging in again

#### Solution 3: Check Email Authentication

1. Go to **Authentication** → **Providers**
2. Make sure **Email** provider is **Enabled**
3. Save changes if you made any
4. Try logging in again

### Error: "Invalid login credentials"

- Double-check your email and password
- Email is case-sensitive
- Make sure there are no extra spaces
- Try resetting the password in Supabase dashboard

### Error: "Email not confirmed"

Your user needs email confirmation:
- Run the SQL query from Solution 2 above
- Or recreate the user with "Auto Confirm User" checked

## Database Issues

### Error: "relation does not exist"

You haven't created the database tables yet:

1. Open `SETUP.md`
2. Copy the SQL from "Create Tables" section
3. Go to Supabase **SQL Editor**
4. Paste and run the SQL
5. Do the same for "Insert Initial Data" section
6. And "Enable Row Level Security" section

### Error: "permission denied"

Your RLS (Row Level Security) policies aren't set up:

1. Go to Supabase **SQL Editor**
2. Copy and run all SQL from the "Enable Row Level Security" section in `SETUP.md`

## Connection Issues

### Error: "Supabase not initialized"

1. Check that `config.js` has your correct credentials
2. Make sure you're using a local server (not file://)
3. Check browser console for any loading errors
4. Verify Supabase CDN is loading (check Network tab)

### Site not loading data

1. Open browser console (F12)
2. Check for errors
3. Verify database tables exist
4. Check that RLS policies allow public SELECT
5. Try refreshing the page

## General Tips

### Check Browser Console

Always open the browser console (F12) to see detailed error messages:
- Chrome/Edge: F12 or Ctrl+Shift+I
- Firefox: F12 or Ctrl+Shift+K
- Safari: Cmd+Option+I

### Check Network Tab

See what requests are failing:
1. Open DevTools (F12)
2. Go to "Network" tab
3. Try logging in
4. Look for red (failed) requests
5. Click on them to see details

### Verify Supabase Project is Active

1. Go to your Supabase dashboard
2. Make sure your project is not paused
3. Free tier projects pause after 1 week of inactivity
4. Click to restore if paused

### Check Supabase Project URL

Make sure the URL in `config.js` matches your project:
```javascript
// Should look like:
const SUPABASE_URL = 'https://your-project-id.supabase.co';
```

### Reset Everything

If nothing works:

1. Delete all data from tables
2. Re-run the SQL from `SETUP.md`
3. Create a fresh user with auto-confirm
4. Clear browser cache
5. Try again

## Still Having Issues?

1. Check Supabase status: https://status.supabase.com
2. Review Supabase docs: https://supabase.com/docs
3. Check browser console for specific errors
4. Make sure you're running a local server (see `LOCAL_SERVER.md`)
5. Verify all SQL queries from `SETUP.md` were executed successfully
