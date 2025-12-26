-- Create storage bucket for profile images
-- Run this in Supabase SQL Editor

-- Create the profile-images bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'profile-images',
  'profile-images',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
) ON CONFLICT (id) DO NOTHING;

-- Storage policies for profile-images bucket
DROP POLICY IF EXISTS "Profile images are publicly accessible" ON storage.objects;
CREATE POLICY "Profile images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'profile-images');

DROP POLICY IF EXISTS "Authenticated users can upload profile images" ON storage.objects;
CREATE POLICY "Authenticated users can upload profile images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'profile-images');

DROP POLICY IF EXISTS "Authenticated users can update profile images" ON storage.objects;
CREATE POLICY "Authenticated users can update profile images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'profile-images');

DROP POLICY IF EXISTS "Authenticated users can delete profile images" ON storage.objects;
CREATE POLICY "Authenticated users can delete profile images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'profile-images');

-- Add author_avatar to site_settings if not exists
INSERT INTO public.site_settings (key, value, label, type) VALUES
  ('author_avatar', '', 'Author Avatar URL', 'text'),
  ('author_name', 'Ahmad Gozali', 'Author Name', 'text')
  ON CONFLICT (key) DO NOTHING;
