# How to Get Your Correct Supabase Credentials

## The Problem

Your current anon key `sb_publishable_-DHQ0MQXiQHvEAqebTd2pA_utvFGHaN` is **not a valid format**.

A real Supabase anon key should look like this (much longer):
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ta2JsYXJtc21mbnZhZXB4enltIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODkxMjM0NTYsImV4cCI6MjAwNDY5OTQ1Nn0.example_signature_here
```

## How to Get the Correct Credentials

### Step 1: Go to Your Project Settings

1. Go to https://app.supabase.com
2. Select your project (should be listed there)
3. Click on the **Settings** (gear icon) in the left sidebar
4. Click on **API** in the settings menu

### Step 2: Copy the Correct Keys

You'll see a section called "Project API keys" with two important values:

#### Project URL
```
https://mmkblarmsmfnvaepxzym.supabase.co
```
✅ This one you already have correct!

#### anon public key
This is a LONG string (usually 200+ characters) that starts with `eyJ...`

Example:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ta2JsYXJtc21mbnZhZXB4enltIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODkxMjM0NTYsImV4cCI6MjAwNDY5OTQ1Nn0.dKz1Xb1vW9Qa-example-rest-of-key
```

❌ **DO NOT** use the "service_role" key - that's for server-side only!
✅ **USE** the "anon" or "anon public" key

### Step 3: Update Your config.js

1. Copy the **anon public** key from Supabase
2. Open `config.js`
3. Replace the SUPABASE_ANON_KEY with the full key:

```javascript
const SUPABASE_URL = 'https://mmkblarmsmfnvaepxzym.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-full-key-here...';
```

### Step 4: Update Your .env (Optional)

Also update the `.env` file with the correct key:

```
SUPABASE_URL=https://mmkblarmsmfnvaepxzym.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-full-key-here...
```

## Visual Guide

Here's what the Supabase dashboard looks like:

```
Settings > API

┌─────────────────────────────────────────────┐
│ Project API keys                            │
├─────────────────────────────────────────────┤
│                                             │
│ Project URL                                 │
│ https://mmkblarmsmfnvaepxzym.supabase.co   │
│ [Copy]                                      │
│                                             │
│ anon public                                 │
│ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVC...     │
│ [Copy] [Reveal]                             │
│                                             │
│ service_role                                │
│ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVC...     │
│ [Copy] [Reveal]                             │
│                                             │
└─────────────────────────────────────────────┘
```

Click **[Copy]** next to "anon public" to copy the full key.

## Important Notes

1. **The anon key is safe to use in browser** - it's meant to be public
2. **The service_role key must NEVER go in browser code** - it has full access
3. **The key is a JWT token** - it contains encoded information about permissions
4. **If the key is wrong, authentication will fail with 400 errors**

## After Updating

1. Save `config.js`
2. Refresh your browser (hard refresh: Ctrl+Shift+R)
3. Check browser console - you should see "✅ Supabase client initialized successfully!"
4. Try logging in again

## Still Not Working?

If you still get errors after using the correct key:

1. Check browser console for the exact error message
2. Verify you created a user in Authentication > Users
3. Make sure the user has "Auto Confirm User" checked
4. Run the SQL from TROUBLESHOOTING.md to confirm the user

## Need Help Finding It?

If you can't find the API keys:

1. Make sure you're logged into Supabase
2. Make sure you've selected your project from the dashboard
3. Look for "Settings" with a gear icon (⚙️) in the left sidebar
4. Under Settings, look for "API" option
5. The keys should be clearly visible there
