import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/seo/SEO";
import { Button } from "@/components/ui/button";
import { usePosts, calculateReadTime } from "@/hooks/usePosts";
import { useDeletePost, useTogglePublish } from "@/hooks/usePostMutations";
import {
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  ExternalLink,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const AdminPosts = () => {
  const { data: posts, isLoading } = usePosts(false); // Get all posts including unpublished
  const deletePost = useDeletePost();
  const togglePublish = useTogglePublish();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    await deletePost.mutateAsync(id);
    setDeletingId(null);
  };

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    await togglePublish.mutateAsync({ id, is_published: !currentStatus });
  };

  return (
    <Layout>
      <SEO title="Manage Posts | Admin" />

      <section className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            to="/admin/dashboard"
            className="mb-4 inline-flex items-center gap-2 font-sans text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="mb-2 font-display text-3xl font-bold text-foreground">
                Manage Posts
              </h1>
              <p className="font-body text-muted-foreground">
                Create, edit, and manage your blog articles.
              </p>
            </div>
            <Button asChild className="font-sans">
              <Link to="/admin/posts/new">
                <Plus className="mr-2 h-4 w-4" />
                New Post
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Posts List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="animate-pulse rounded-lg border border-border bg-card p-6"
                >
                  <div className="h-6 w-2/3 rounded bg-muted mb-2" />
                  <div className="h-4 w-1/3 rounded bg-muted" />
                </div>
              ))}
            </div>
          ) : posts && posts.length > 0 ? (
            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="flex flex-col gap-4 rounded-lg border border-border bg-card p-6 transition-shadow hover:shadow-md md:flex-row md:items-center md:justify-between"
                >
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <h3 className="font-display text-lg font-semibold text-foreground">
                        {post.title}
                      </h3>
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                          post.is_published
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                        }`}
                      >
                        {post.is_published ? "Published" : "Draft"}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 font-sans text-sm text-muted-foreground">
                      <span>{formatDate(post.created_at)}</span>
                      <span>•</span>
                      <span>{calculateReadTime(post.content)}</span>
                      <span>•</span>
                      <span className="font-mono text-xs">
                        /blog/{post.slug}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {post.is_published && (
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="font-sans"
                      >
                        <Link to={`/blog/${post.slug}`} target="_blank">
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      </Button>
                    )}

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        handleTogglePublish(post.id, post.is_published)
                      }
                      disabled={togglePublish.isPending}
                      className="font-sans"
                    >
                      {post.is_published ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className="font-sans"
                    >
                      <Link to={`/admin/posts/${post.id}/edit`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="font-sans text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Post</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{post.title}"? This
                            action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(post.id)}
                            disabled={deletingId === post.id}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            {deletingId === post.id ? "Deleting..." : "Delete"}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-border bg-card/50 p-12 text-center">
              <p className="mb-4 font-body text-muted-foreground">
                No posts yet. Create your first article!
              </p>
              <Button asChild className="font-sans">
                <Link to="/admin/posts/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Post
                </Link>
              </Button>
            </div>
          )}
        </motion.div>
      </section>
    </Layout>
  );
};

export default AdminPosts;
