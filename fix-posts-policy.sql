-- Fix Posts RLS Policy for public access
-- Run this in Supabase SQL Editor

-- First, drop the existing policy
DROP POLICY IF EXISTS "Published posts are viewable by everyone" ON public.posts;

-- Create new policy that allows:
-- 1. Anyone (anonymous/public) to view published posts
-- 2. Authenticated users to view all posts (including drafts)
CREATE POLICY "Published posts are viewable by everyone"
  ON public.posts FOR SELECT
  USING (is_published = true OR auth.uid() IS NOT NULL);

-- Alternative: If you want ONLY published posts visible to public
-- and ALL posts visible to logged-in users, use the above.

-- If posts are still not showing, the issue might be that
-- the posts in database have is_published = false.
-- Run this query to check:
-- SELECT id, title, is_published FROM posts;

-- To publish all existing posts, run:
-- UPDATE posts SET is_published = true;
