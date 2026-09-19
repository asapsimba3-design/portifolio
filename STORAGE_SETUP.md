# Supabase Storage Setup for Image Uploads

To enable image uploads in the admin panel, you need to create a storage bucket in Supabase.

## Step 1: Create Storage Bucket

1. Go to your Supabase dashboard: https://app.supabase.com
2. Select your project
3. Click on **Storage** in the left sidebar
4. Click **New bucket**
5. Fill in the details:
   - **Name**: `portfolio-images`
   - **Public bucket**: ✅ Check this box (images need to be publicly accessible)
   - **File size limit**: 50 MB (or adjust as needed)
   - **Allowed MIME types**: Leave empty or add: `image/jpeg, image/png, image/webp, image/gif`
6. Click **Create bucket**

## Step 2: Set Up Storage Policies

After creating the bucket, set up security policies:

### Option 1: Using the Dashboard UI

1. Click on your `portfolio-images` bucket
2. Go to **Policies** tab
3. Click **New policy**

**Policy 1: Public Read Access**
- Policy name: `Public read access`
- Allowed operations: SELECT
- Target roles: `public`
- Policy definition:
  ```sql
  (bucket_id = 'portfolio-images'::text)
  ```

**Policy 2: Authenticated Upload**
- Policy name: `Authenticated users can upload`
- Allowed operations: INSERT
- Target roles: `authenticated`
- Policy definition:
  ```sql
  (bucket_id = 'portfolio-images'::text)
  ```

**Policy 3: Authenticated Update/Delete**
- Policy name: `Authenticated users can update/delete`
- Allowed operations: UPDATE, DELETE
- Target roles: `authenticated`
- Policy definition:
  ```sql
  (bucket_id = 'portfolio-images'::text)
  ```

### Option 2: Using SQL (Faster)

Go to **SQL Editor** and run:

```sql
-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'portfolio-images');

-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'portfolio-images' AND auth.role() = 'authenticated');

-- Allow authenticated users to update
CREATE POLICY "Authenticated users can update"
ON storage.objects FOR UPDATE
USING (bucket_id = 'portfolio-images' AND auth.role() = 'authenticated');

-- Allow authenticated users to delete
CREATE POLICY "Authenticated users can delete"
ON storage.objects FOR DELETE
USING (bucket_id = 'portfolio-images' AND auth.role() = 'authenticated');
```

## Step 3: Test the Setup

1. Log in to your admin panel
2. Try adding a new work
3. Click "Choose File" and select an image
4. Click "Save Work"
5. The image should upload and display on your site

## Folder Structure

Images will be uploaded to:
```
portfolio-images/
  └── works/
      ├── 1234567890-abc123.jpg
      ├── 1234567891-def456.png
      └── ...
```

## Supported Image Formats

- JPEG/JPG
- PNG
- WebP
- GIF

## File Size Limits

Default: 50 MB per file
You can adjust this in the bucket settings.

## Image Optimization Tips

For better performance:
1. **Resize large images** before uploading (recommended max: 2000px width)
2. **Use JPEG** for photographs (smaller file size)
3. **Use PNG** for images with transparency
4. **Use WebP** for best compression (not supported by all browsers)

## Troubleshooting

### Error: "new row violates row-level security policy"

Your storage policies aren't set up correctly:
- Make sure RLS is enabled on `storage.objects`
- Verify the policy definitions match your bucket name exactly
- Check that you're logged in (authenticated)

### Error: "The resource already exists"

The file name conflicts with an existing file:
- The system automatically generates unique names
- Try again, it should work
- If it persists, check your bucket for duplicate files

### Images not displaying

1. Check that the bucket is **public**
2. Verify the image URL is correct (check browser console)
3. Make sure CORS is configured (usually automatic)
4. Check that the image file uploaded successfully in Storage dashboard

### Upload is slow

- Large images take longer to upload
- Resize images before uploading
- Check your internet connection
- Supabase free tier has bandwidth limits

## Alternative: Use Image URLs

If you don't want to set up Supabase Storage:
- Leave the file upload empty
- Use the "Image URL" field instead
- Host images on:
  - Cloudinary (free tier available)
  - ImgBB
  - Imgur
  - Your own CDN

## Storage Limits

**Supabase Free Tier:**
- 1 GB storage
- 2 GB bandwidth per month
- Unlimited file uploads

**Paid Tiers:**
- Pro: 100 GB storage, $0.021/GB after
- More bandwidth available
