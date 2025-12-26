import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/seo/SEO";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { usePosts, calculateReadTime } from "@/hooks/usePosts";
import { Search } from "lucide-react";
import { useState, useMemo } from "react";

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: posts, isLoading } = usePosts(true);

  const filteredPosts = useMemo(() => {
    if (!posts) return [];
    if (!searchQuery) return posts;
    
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [posts, searchQuery]);

  return (
    <Layout>
      <SEO
        title="Blog"
        description="Explore articles about coding, web development, and technology. Find tutorials, best practices, and insights."
      />

      {/* Page Header */}
      <section className="border-b border-border bg-card/30">
        <div className="container mx-auto px-4 py-16 md:px-6 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center"
          >
            <h1 className="mb-4 font-display text-4xl font-bold text-foreground md:text-5xl">
              Blog
            </h1>
            <p className="mb-8 font-body text-lg text-muted-foreground">
              Thoughts, tutorials, and insights on web development, coding best
              practices, and modern technology.
            </p>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-input bg-background py-3 pl-12 pr-4 font-sans text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="container mx-auto px-4 py-16 md:px-6 md:py-24">
        {isLoading ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-video rounded-xl bg-muted mb-4" />
                <div className="h-4 w-24 rounded bg-muted mb-2" />
                <div className="h-6 w-full rounded bg-muted mb-2" />
                <div className="h-4 w-3/4 rounded bg-muted" />
              </div>
            ))}
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post, index) => (
              <ArticleCard
                key={post.id}
                slug={post.slug}
                title={post.title}
                excerpt={post.excerpt || ""}
                coverImage={post.cover_image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80"}
                date={formatDate(post.created_at)}
                readTime={calculateReadTime(post.content)}
                index={index}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-12 text-center"
          >
            <p className="font-body text-lg text-muted-foreground">
              {searchQuery
                ? `No articles found matching "${searchQuery}"`
                : "No articles yet. Check back soon!"}
            </p>
          </motion.div>
        )}
      </section>
    </Layout>
  );
};

export default Blog;
