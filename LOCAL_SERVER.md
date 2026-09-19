# Running a Local Development Server

Due to browser security restrictions with the `file://` protocol, you need to run a local web server to test your site properly with Supabase.

## Quick Options

### Option 1: Python (Easiest - Built into most systems)

**If you have Python 3:**
```bash
python -m http.server 8000
```

**If you have Python 2:**
```bash
python -m SimpleHTTPServer 8000
```

Then open: http://localhost:8000

### Option 2: Node.js (http-server)

**Install globally:**
```bash
npm install -g http-server
```

**Run:**
```bash
http-server
```

Then open: http://localhost:8080

### Option 3: VS Code Live Server Extension

1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"
4. Site opens automatically at http://127.0.0.1:5500

### Option 4: PHP (if installed)

```bash
php -S localhost:8000
```

Then open: http://localhost:8000

## Why You Need a Local Server

The `file://` protocol has restrictions that prevent:
- Loading external scripts (like Supabase)
- Making API calls
- Using localStorage across different HTML files
- Loading modules

Running a local server solves all these issues.

## Testing the Site

Once your local server is running:

1. **Main Site:** http://localhost:8000/index.html
2. **Admin Panel:** http://localhost:8000/admin.html

## Common Issues

### "Port already in use"
Change the port number:
```bash
python -m http.server 8001
```

### "Command not found"
Make sure Python/Node.js is installed and added to your PATH.

### Still seeing errors?
1. Check browser console (F12)
2. Verify `config.js` has correct Supabase credentials
3. Make sure Supabase database tables are created
4. Check that RLS policies are configured

## For Production

When deploying, platforms like Netlify, Vercel, or GitHub Pages automatically serve your files properly. No local server needed!
