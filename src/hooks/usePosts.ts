import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  cover_image: string | null;
  created_at: string;
  updated_at: string;
  is_published: boolean;
  author_id: string | null;
}

// Estimate read time based on content length
export const calculateReadTime = (content: string | null): string => {
  if (!content) return "1 min read";
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
};

export const usePosts = (publishedOnly = true) => {
  return useQuery({
    queryKey: ["posts", publishedOnly],
    queryFn: async () => {
      let query = supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (publishedOnly) {
        query = query.eq("is_published", true);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as Post[];
    },
  });
};

export const usePost = (slug: string) => {
  return useQuery({
    queryKey: ["post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (error) throw error;
      return data as Post | null;
    },
    enabled: !!slug,
  });
};

export const usePostById = (id: string) => {
  return useQuery({
    queryKey: ["post-by-id", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) throw error;
      return data as Post | null;
    },
    enabled: !!id,
  });
};

export const useFeaturedPost = () => {
  return useQuery({
    queryKey: ["featured-post"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      return data as Post | null;
    },
  });
};

export const useRecentPosts = (limit = 3, excludeId?: string) => {
  return useQuery({
    queryKey: ["recent-posts", limit, excludeId],
    queryFn: async () => {
      let query = supabase
        .from("posts")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false });

      if (excludeId) {
        query = query.neq("id", excludeId);
      }

      const { data, error } = await query.limit(limit);

      if (error) throw error;
      return data as Post[];
    },
  });
};
