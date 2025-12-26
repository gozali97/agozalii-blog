import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/seo/SEO";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { FeaturedArticle } from "@/components/blog/FeaturedArticle";
import { Button } from "@/components/ui/button";
import { useFeaturedPost, useRecentPosts, calculateReadTime } from "@/hooks/usePosts";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import heroBackground from "@/assets/hero-background.jpg";

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const Index = () => {
  const { data: settings } = useSiteSettings();
  const { data: featuredPost, isLoading: featuredLoading } = useFeaturedPost();
  const { data: recentPosts, isLoading: recentLoading } = useRecentPosts(3, featuredPost?.id);

  const siteTitle = settings?.site_title || "My Blog";
  const siteTagline = settings?.site_tagline || "Sharing insights about coding and life";
  const heroText = settings?.hero_text || "Welcome to my corner of the internet";

  return (
    <Layout>
      <SEO />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroBackground}
            alt=""
            className="h-full w-full object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/80" />
        </div>

        {/* Content */}
        <div className="container relative mx-auto px-4 py-24 md:px-6 md:py-32 lg:py-40">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 inline-block font-sans text-sm font-medium uppercase tracking-widest text-primary"
            >
              {heroText}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6 font-display text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl"
            >
              {siteTagline}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8 font-body text-lg text-muted-foreground md:text-xl"
            >
              {settings?.site_description || "Exploring the art of building digital experiences, one article at a time."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Button asChild size="lg" className="font-sans">
                <Link to="/blog">
                  Browse Articles
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="font-sans"
              >
                <Link to="/about">About Me</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredLoading ? (
        <section className="container mx-auto px-4 py-16 md:px-6 md:py-24">
          <div className="mb-8">
            <div className="h-8 w-48 animate-pulse rounded bg-muted" />
          </div>
          <div className="aspect-[21/9] animate-pulse rounded-xl bg-muted" />
        </section>
      ) : featuredPost ? (
        <section className="container mx-auto px-4 py-16 md:px-6 md:py-24">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="font-display text-2xl font-semibold text-foreground md:text-3xl">
              Featured Article
            </h2>
          </motion.div>

          <FeaturedArticle
            slug={featuredPost.slug}
            title={featuredPost.title}
            excerpt={featuredPost.excerpt || ""}
            coverImage={featuredPost.cover_image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80"}
            date={formatDate(featuredPost.created_at)}
            readTime={calculateReadTime(featuredPost.content)}
          />
        </section>
      ) : null}

      {/* Recent Articles */}
      <section className="container mx-auto px-4 pb-16 md:px-6 md:pb-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-end justify-between"
        >
          <h2 className="font-display text-2xl font-semibold text-foreground md:text-3xl">
            Recent Articles
          </h2>
          <Link
            to="/blog"
            className="hidden items-center gap-1 font-sans text-sm font-medium text-primary transition-all hover:gap-2 md:inline-flex"
          >
            View all articles
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        {recentLoading ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-video rounded-xl bg-muted mb-4" />
                <div className="h-4 w-24 rounded bg-muted mb-2" />
                <div className="h-6 w-full rounded bg-muted mb-2" />
                <div className="h-4 w-3/4 rounded bg-muted" />
              </div>
            ))}
          </div>
        ) : recentPosts && recentPosts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map((post, index) => (
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
          <div className="py-12 text-center">
            <p className="font-body text-muted-foreground">
              No articles yet. Check back soon!
            </p>
          </div>
        )}

        <div className="mt-8 text-center md:hidden">
          <Button variant="outline" asChild className="font-sans">
            <Link to="/blog">
              View all articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="border-t border-border bg-card/50">
        <div className="container mx-auto px-4 py-16 md:px-6 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="mb-4 font-display text-2xl font-semibold text-foreground md:text-3xl">
              Stay Updated
            </h2>
            <p className="mb-8 font-body text-muted-foreground">
              Get the latest articles and insights delivered straight to your
              inbox. No spam, just quality content.
            </p>

            <form className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-lg border border-input bg-background px-4 py-3 font-sans text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <Button type="submit" className="font-sans">
                Subscribe
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
