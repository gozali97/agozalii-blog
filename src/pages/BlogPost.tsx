import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/seo/SEO";
import { Button } from "@/components/ui/button";
import { usePost, calculateReadTime } from "@/hooks/usePosts";
import { toast } from "@/hooks/use-toast";

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Simple markdown-to-HTML converter for demo purposes
const renderMarkdown = (content: string) => {
  return content
    .split("\n")
    .map((line) => {
      // Headers
      if (line.startsWith("### ")) {
        return `<h3 class="mt-8 mb-4 font-display text-xl font-semibold text-foreground">${line.slice(4)}</h3>`;
      }
      if (line.startsWith("## ")) {
        return `<h2 class="mt-10 mb-4 font-display text-2xl font-semibold text-foreground">${line.slice(3)}</h2>`;
      }
      if (line.startsWith("# ")) {
        return `<h1 class="mt-12 mb-6 font-display text-3xl font-bold text-foreground">${line.slice(2)}</h1>`;
      }

      // Code blocks (simplified)
      if (line.startsWith("```")) {
        return "";
      }

      // Bold
      line = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

      // Lists
      if (line.match(/^\d+\.\s/)) {
        return `<li class="ml-6 mb-2">${line.replace(/^\d+\.\s/, "")}</li>`;
      }
      if (line.startsWith("- ")) {
        return `<li class="ml-6 mb-2 list-disc">${line.slice(2)}</li>`;
      }

      // Regular paragraphs
      if (line.trim()) {
        return `<p class="mb-4 leading-relaxed text-foreground/90">${line}</p>`;
      }

      return "";
    })
    .join("\n");
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading, error } = usePost(slug || "");

  const handleShare = async () => {
    if (!post) return;
    
    try {
      await navigator.share({
        title: post.title,
        text: post.excerpt || "",
        url: window.location.href,
      });
    } catch {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Article link has been copied to clipboard.",
      });
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <SEO title="Loading..." />
        <div className="container mx-auto px-4 py-24">
          <div className="mx-auto max-w-3xl animate-pulse">
            <div className="h-4 w-24 rounded bg-muted mb-8" />
            <div className="h-8 w-3/4 rounded bg-muted mb-4" />
            <div className="h-6 w-1/2 rounded bg-muted mb-8" />
            <div className="aspect-video rounded-xl bg-muted mb-8" />
            <div className="space-y-4">
              <div className="h-4 w-full rounded bg-muted" />
              <div className="h-4 w-full rounded bg-muted" />
              <div className="h-4 w-3/4 rounded bg-muted" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !post) {
    return (
      <Layout>
        <SEO title="Article Not Found" />
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="mb-4 font-display text-3xl font-bold text-foreground">
            Article Not Found
          </h1>
          <p className="mb-8 font-body text-muted-foreground">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/blog">Back to Blog</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const readTime = calculateReadTime(post.content);
  const coverImage = post.cover_image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80";

  return (
    <Layout>
      <SEO
        title={post.title}
        description={post.excerpt || ""}
        image={coverImage}
        article
        publishedTime={post.created_at}
        author="Blog Author"
      />

      <article>
        {/* Header */}
        <header className="border-b border-border bg-card/30">
          <div className="container mx-auto px-4 py-8 md:px-6">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                to="/blog"
                className="mb-8 inline-flex items-center gap-2 font-sans text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Link>
            </motion.div>

            <div className="mx-auto max-w-3xl">
              {/* Meta */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-6 flex flex-wrap items-center gap-4 font-sans text-sm text-muted-foreground"
              >
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(post.created_at)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {readTime}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="mb-6 font-display text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl"
              >
                {post.title}
              </motion.h1>

              {/* Excerpt */}
              {post.excerpt && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="mb-6 font-body text-lg text-muted-foreground md:text-xl"
                >
                  {post.excerpt}
                </motion.p>
              )}

              {/* Share Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  className="font-sans"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </motion.div>
            </div>
          </div>
        </header>

        {/* Cover Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="container mx-auto px-4 py-8 md:px-6"
        >
          <div className="mx-auto max-w-4xl overflow-hidden rounded-xl">
            <img
              src={coverImage}
              alt={post.title}
              className="aspect-video w-full object-cover"
            />
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="container mx-auto px-4 pb-16 md:px-6 md:pb-24"
        >
          <div
            className="prose-editorial mx-auto max-w-3xl font-body"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content || "") }}
          />
        </motion.div>

        {/* Footer */}
        <div className="border-t border-border">
          <div className="container mx-auto px-4 py-8 md:px-6">
            <div className="mx-auto flex max-w-3xl items-center justify-between">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 font-sans text-sm font-medium text-primary transition-all hover:gap-3"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to all articles
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="font-sans"
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default BlogPost;
