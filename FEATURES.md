# Portfolio Features & Admin Capabilities

## ✅ What Admin Can Manage

### 1. Artist Information
**Admin Panel: Artist Info Tab**

The admin can update:
- Artist name (displays throughout site)
- Biography (shows on About page and artist section)
- Location (e.g., "BASED IN LILONGWE, MALAWI")
- Working scope (e.g., "WORKING GLOBALLY")

**Where it displays:**
- Homepage: Artist section, footer, copyright
- About page: Full bio and details
- All page headers and footers

---

### 2. Practice Description
**Admin Panel: Artist Info Tab**

The admin can update:
- Practice description (artist's philosophy/approach)

**Where it displays:**
- Homepage: "THE PRACTICE" section
- About page: Full practice description

---

### 3. Artworks/Works
**Admin Panel: Works Tab**

The admin can:
- ✅ Add new artworks
- ✅ Upload images directly OR use image URLs
- ✅ Edit existing works
- ✅ Delete works
- Set display order (controls sorting)
- Mark as "large" for featured display

For each work, admin manages:
- Title
- Year
- Medium (e.g., "Oil on canvas")
- Dimensions (e.g., "120 × 180 cm")
- Image (upload or URL)
- Display order
- Large display toggle

**Where it displays:**
- Homepage: "SELECTED WORKS" section
- Works grid with responsive layout
- Large works span 2 rows

---

### 4. Exhibitions
**Admin Panel: Exhibitions Tab**

The admin can:
- ✅ Add new exhibitions
- ✅ Edit existing exhibitions
- ✅ Delete exhibitions
- Set display order

For each exhibition:
- Year
- Title
- Type (e.g., "Solo Exhibition", "Group Exhibition")
- Location (e.g., "Lilongwe, Malawi")
- Display order

**Where it displays:**
- Homepage: "EXHIBITIONS" section
- Chronological display with details

---

### 5. Contact Information
**Admin Panel: Contact Tab**

The admin can update:
- Email address
- Instagram URL
- Twitter/X URL
- YouTube URL

**Where it displays:**
- Contact section: Email link
- Footer: Social media links
- Mobile menu: Social media links
- About page: Social media links

---

## 🌐 Public Pages

### 1. Homepage (index.html)
**Sections:**
- Hero with artist name
- Selected Works (dynamic from database)
- Practice description
- Artist bio preview
- Exhibitions list
- Contact form

**Dynamic Content:**
- ✅ All works from database
- ✅ Exhibition history
- ✅ Artist name everywhere
- ✅ Contact email
- ✅ Social media links
- ✅ Practice description

---

### 2. About Page (about.html)
**Sections:**
- Full artist biography
- Complete practice description
- Location and working scope
- Artist photo

**Dynamic Content:**
- ✅ Artist name
- ✅ Full biography
- ✅ Practice philosophy
- ✅ Location details
- ✅ Social media links

---

### 3. Admin Panel (admin.html)
**Features:**
- ✅ Secure login (Supabase Auth)
- ✅ Four management tabs
- ✅ Image upload capability
- ✅ Real-time updates
- ✅ User-friendly forms
- ✅ Confirmation dialogs

---

## 🔄 How Content Updates Work

1. **Admin logs in** to admin panel
2. **Makes changes** (add/edit/delete)
3. **Saves** the changes
4. **Content stored** in Supabase database
5. **Main site loads** data from database automatically
6. **Changes appear** immediately on refresh

---

## 📸 Image Management

### Upload Options:
1. **Upload file** - Images stored in Supabase Storage
2. **Image URL** - Link to externally hosted images

### Supported Formats:
- JPEG/JPG
- PNG
- WebP
- GIF

### Storage:
- Location: `portfolio-images/works/`
- Public access enabled
- Unique filenames generated automatically

---

## 🎨 Responsive Design

All content is fully responsive:
- ✅ Desktop (1920px+)
- ✅ Laptop (1200px-1920px)
- ✅ Tablet (768px-1200px)
- ✅ Mobile (320px-768px)

Layout adjusts automatically based on:
- Number of works
- Work sizes (large vs regular)
- Screen size
- Content length

---

## 🔒 Security

### Public Site:
- ✅ Read-only access to content
- ✅ No direct database manipulation
- ✅ Secure API calls

### Admin Panel:
- ✅ Email/password authentication
- ✅ Only authenticated users can modify
- ✅ Row Level Security (RLS) policies
- ✅ Secure file uploads

---

## ✨ Special Features

### 1. Animations
- Reveal on scroll
- Smooth transitions
- Hover effects on artworks

### 2. Navigation
- Smooth scroll to sections
- Mobile hamburger menu
- Breadcrumb trails

### 3. SEO
- Dynamic page titles
- Meta descriptions
- Semantic HTML

### 4. Performance
- Image optimization
- Lazy loading
- Minimal dependencies
- Fast load times

---

## 📱 Admin Features

### Easy Content Management:
- No coding required
- Visual feedback
- Error messages
- Success confirmations
- Inline editing

### Work Management:
- Drag to reorder (via display_order)
- Quick edit/delete
- Image preview
- Bulk operations support

### User Experience:
- Auto-save indicators
- Loading states
- Responsive forms
- Mobile-friendly admin

---

## 🚀 Deployment Ready

The site is ready to deploy to:
- Netlify
- Vercel
- GitHub Pages
- Any static host

All content managed through admin panel - no need to edit code!

---

## 📊 Data Structure

All data stored in Supabase:
- `artist` - Artist information
- `practice` - Practice description
- `contact` - Contact details
- `works` - Artwork portfolio
- `exhibitions` - Exhibition history
- `portfolio-images` - Image storage bucket

---

## 🎯 What's Dynamic vs Static

### Dynamic (Admin Controlled):
✅ Artist name and bio
✅ All artwork pieces
✅ Exhibition history
✅ Contact information
✅ Practice description
✅ Social media links

### Static (Fixed):
- Site structure and layout
- Color scheme
- Typography
- Animations
- Navigation structure
- Logo and hero image

---

## 💡 Future Enhancement Ideas

Potential additions (not currently implemented):
- Blog/News section
- Online shop integration
- Newsletter signup
- Advanced search/filter
- Multi-language support
- Dark mode toggle
- Video embeds
- Virtual gallery view

---

## ✅ Everything Works!

All admin changes automatically appear on:
- ✅ Homepage
- ✅ About page
- ✅ All sections
- ✅ Navigation
- ✅ Footer
- ✅ Meta tags

No code editing required after initial setup!
