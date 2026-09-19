# Asamala Mtima - Artist Portfolio

> Professional portfolio website with full content management system

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR-USERNAME/asamala-mtima-portfolio)

## 🎨 About

This is a modern, responsive portfolio website for visual artist Asamala Mtima. The site features a complete admin panel for managing artworks, exhibitions, and contact information—no coding required!

## ✨ Features

- 🎨 **Dynamic Portfolio** - Works load from Supabase database
- 🔐 **Admin Panel** - Secure login to manage all content
- 📸 **Image Uploads** - Direct upload to Supabase Storage
- 📱 **Fully Responsive** - Beautiful on all devices
- 💬 **WhatsApp Integration** - Floating contact button
- 🎭 **Smooth Animations** - Professional reveal effects
- ⚡ **Fast Loading** - Optimized static site
- 🔒 **Secure** - Row Level Security with Supabase

## 🚀 Quick Start

### Prerequisites

- [Supabase](https://supabase.com) account (free tier)
- Modern web browser
- Text editor (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR-USERNAME/asamala-mtima-portfolio.git
   cd asamala-mtima-portfolio
   ```

2. **Set up Supabase**
   - Follow instructions in `SETUP.md`
   - Run SQL queries to create tables
   - Create admin user

3. **Configure credentials**
   ```bash
   cp config.example.js config.js
   ```
   - Edit `config.js` with your Supabase credentials

4. **Run locally**
   ```bash
   python -m http.server 8000
   ```
   - Visit `http://localhost:8000`

## 📚 Documentation

- **[SETUP.md](SETUP.md)** - Complete Supabase setup guide
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Deploy to Vercel & GitHub
- **[FEATURES.md](FEATURES.md)** - Full feature list
- **[STORAGE_SETUP.md](STORAGE_SETUP.md)** - Image upload configuration
- **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Common issues & solutions

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **Auth**: Supabase Authentication
- **Deployment**: Vercel / Netlify / GitHub Pages
- **Fonts**: Google Fonts (Cormorant Garamond, DM Sans)

## 📁 Project Structure

```
├── index.html              # Main homepage
├── about.html             # About page
├── admin.html             # Admin panel
├── script.js              # Main site logic
├── about-script.js        # About page logic  
├── admin-script.js        # Admin panel logic
├── style.css              # Global styles
├── admin-style.css        # Admin panel styles
├── config.js              # Supabase config (gitignored)
├── config.example.js      # Config template
├── images/                # Image assets
├── vercel.json           # Vercel configuration
└── docs/                  # Documentation
```

## 🎯 Admin Capabilities

The admin can manage:

✅ Artist name and biography  
✅ Practice description  
✅ Artwork portfolio (with image uploads)  
✅ Exhibition history  
✅ Contact information  
✅ Social media links  
✅ WhatsApp number  

All changes reflect immediately on the live site!

## 🌐 Live Demo

- **Production**: `https://your-site.vercel.app`
- **Admin Panel**: `https://your-site.vercel.app/admin.html`

## 🔒 Security

- Row Level Security (RLS) enabled on all tables
- Public can only read data
- Only authenticated users can modify content
- Credentials stored securely in Supabase
- config.js excluded from version control

## 📱 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## 🤝 Contributing

This is a private portfolio project. For bugs or suggestions, please open an issue.

## 📄 License

Private - All rights reserved © 2026 Asamala Mtima

## 👨‍💻 Developer

Built with ❤️ for Asamala Mtima

## 🆘 Support

- Check `TROUBLESHOOTING.md` for common issues
- Review documentation in the docs folder
- Supabase Docs: https://supabase.com/docs
- Vercel Docs: https://vercel.com/docs

---

**Note**: Remember to update `config.js` with your actual Supabase credentials before deploying!


A modern, responsive portfolio website for visual artist Asamala Mtima with a full content management system powered by Supabase.

## Features

- **Dynamic Content Management**: Artist can update all content through an admin panel
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Smooth Animations**: Elegant reveal animations and transitions
- **Supabase Backend**: Secure database and authentication
- **Real-time Updates**: Changes reflect immediately on the public site

## Tech Stack

- HTML5, CSS3, JavaScript (Vanilla)
- Supabase (Backend, Database, Authentication)
- Google Fonts (Cormorant Garamond, DM Sans)

## Setup Instructions

### 1. Supabase Configuration

Follow the detailed instructions in `SETUP.md` to:
- Create a Supabase project
- Set up database tables
- Configure Row Level Security
- Enable authentication

### 2. Configure Your Credentials

**IMPORTANT: Never commit `config.js` with real credentials!**

1. Copy the example configuration:
   ```bash
   copy config.example.js config.js
   ```
   Or on Mac/Linux:
   ```bash
   cp config.example.js config.js
   ```

2. Edit `config.js` and replace with your Supabase credentials:
   ```javascript
   const SUPABASE_URL = 'https://your-project.supabase.co';
   const SUPABASE_ANON_KEY = 'your-anon-key-here';
   ```

3. Get your credentials from Supabase Dashboard:
   - Go to Project Settings → API
   - Copy "Project URL" and "anon public" key

**Note:** The `.gitignore` file is configured to exclude `config.js` from version control.

### 3. Create Admin User

In your Supabase dashboard:
1. Go to **Authentication > Users**
2. Click **Add user**
3. Create an account with email and password
4. Use these credentials to log into the admin panel

### 4. Deploy

You can deploy this site to any static hosting service:
- **Netlify**: Drag and drop your folder
- **Vercel**: Connect your Git repository
- **GitHub Pages**: Push to a repository and enable Pages
- **Supabase Storage**: Use as a static site host

### 5. Local Development (Important!)

**You must use a local web server** - opening HTML files directly (file://) won't work due to browser security restrictions.

**Quickest way:**
```bash
python -m http.server 8000
```

Then visit: http://localhost:8000

See `LOCAL_SERVER.md` for more options and details.

## File Structure

```
├── index.html           # Main portfolio page
├── admin.html          # Admin panel
├── config.js           # Supabase configuration
├── script.js           # Main site functionality
├── admin-script.js     # Admin panel functionality
├── style.css           # Main site styles
├── admin-style.css     # Admin panel styles
├── data.json           # Initial data (for reference)
├── images/             # Image assets
│   ├── Asap-logo.png
│   ├── Artist Image.jpg
│   └── Hero- image.png
├── SETUP.md            # Detailed Supabase setup guide
└── README.md           # This file
```

## Admin Panel Usage

### Accessing the Admin Panel

1. Navigate to `admin.html` in your browser
2. Log in with your Supabase user credentials
3. You'll see four main sections:

### Artist Info

Update:
- Artist name
- Biography
- Location
- Working scope
- Practice description

### Works

Manage your artwork portfolio:
- Add new works with title, year, medium, dimensions
- Upload image URLs
- Set display order
- Mark works as "large" for featured display
- Edit or delete existing works

### Exhibitions

Manage your exhibition history:
- Add exhibitions with year, title, type, location
- Set display order
- Edit or delete exhibitions

### Contact

Update contact information:
- Email address
- Social media links (Instagram, Twitter, YouTube)

## Image Management

### Option 1: External URLs
Use image hosting services like:
- Unsplash (free stock photos)
- Cloudinary
- ImgBB
- Any CDN

### Option 2: Supabase Storage
1. Go to Supabase Storage in your dashboard
2. Create a public bucket named "images"
3. Upload images
4. Copy the public URL
5. Use in the admin panel

## Customization

### Colors

Edit the CSS variables in `style.css`:

```css
:root {
  --cream: #f3f0e9;
  --ink: #171614;
  --muted: #77736b;
  --line: #d7d2c8;
  --white: #fff;
}
```

### Fonts

Replace Google Fonts links in `index.html` and update CSS variables:

```css
--serif: "Your Serif Font", Georgia, serif;
--sans: "Your Sans Font", Arial, sans-serif;
```

### Background Images

Replace images in the `images/` folder:
- `Hero- image.png` - Hero section background
- `Artist Image.jpg` - Artist photo section
- `Asap-logo.png` - Logo used in header and loader

## Security Notes

- **Critical:** `config.js` contains your API keys and should NEVER be committed to version control
- The `.gitignore` file is configured to exclude `config.js`, `.env`, and `.env.local`
- Always use `config.example.js` as a template when setting up new environments
- The Supabase anon key is safe to use in browser (it's public) when combined with RLS policies
- Supabase RLS policies ensure:
  - Public can only read data
  - Only authenticated users can modify content through admin panel
- For production, consider:
  - Using environment variables through your hosting platform
  - Enabling Supabase email confirmation for new users
  - Setting up custom domain for your Supabase project
  - Adding additional RLS policies if needed

### Credential Management Best Practices

1. **Development:**
   - Use `config.js` (gitignored)
   - Never share credentials in chat, screenshots, or documentation

2. **Production:**
   - Use platform environment variables (Netlify, Vercel, etc.)
   - Rotate keys periodically
   - Monitor API usage in Supabase dashboard

3. **Team Collaboration:**
   - Share `config.example.js` only
   - Send credentials through secure channels (password managers, encrypted messages)
   - Each team member creates their own `config.js` locally

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Lazy loading for images
- Minimal dependencies
- Optimized CSS and JavaScript
- Supabase CDN for fast data delivery

## Troubleshooting

### "Error loading data"
- Check Supabase credentials in `config.js`
- Verify RLS policies are set correctly
- Check browser console for specific errors

### "Cannot log in to admin panel"
- Verify user exists in Supabase Authentication
- Check email and password are correct
- Ensure Supabase project is not paused

### Images not loading
- Verify image URLs are publicly accessible
- Check CORS settings if using external hosting
- Ensure image URLs use HTTPS

## Support

For issues or questions:
1. Check the `SETUP.md` guide
2. Review Supabase documentation
3. Check browser console for errors

## License

Private project for Asamala Mtima. All rights reserved.

## Credits

- Design and Development: Custom built
- Backend: Supabase
- Fonts: Google Fonts
- Icons: Custom SVG
