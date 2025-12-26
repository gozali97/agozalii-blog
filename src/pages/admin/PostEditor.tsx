import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/seo/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ImageUpload } from "@/components/ui/image-upload";
import { RichTextEditor } from "@/components/editor/RichTextEditor";
import { usePostById } from "@/hooks/usePosts";
import { useCreatePost, useUpdatePost } from "@/hooks/usePostMutations";
import { ArrowLeft, Save, Eye, Loader2 } from "lucide-react";
import { z } from "zod";

const postSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(200, "Slug too long")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase with hyphens only"
    ),
  excerpt: z.string().max(500, "Excerpt too long").optional(),
  content: z.string().optional(),
  cover_image: z
    .string()
    .url("Must be a valid URL")
    .or(z.literal(""))
    .optional(),
  is_published: z.boolean().default(false),
});

type PostFormData = z.infer<typeof postSchema>;

const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
};

const PostEditor = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const { data: existingPost, isLoading: loadingPost } = usePostById(id || "");
  const createPost = useCreatePost();
  const updatePost = useUpdatePost();

  const [formData, setFormData] = useState<PostFormData>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    cover_image: "",
    is_published: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [autoSlug, setAutoSlug] = useState(true);
  const [isFormInitialized, setIsFormInitialized] = useState(false);

  // Load existing post data when editing
  useEffect(() => {
    if (isEditing && existingPost && !isFormInitialized) {
      setFormData({
        title: existingPost.title,
        slug: existingPost.slug,
        excerpt: existingPost.excerpt || "",
        content: existingPost.content || "",
        cover_image: existingPost.cover_image || "",
        is_published: existingPost.is_published,
      });
      setAutoSlug(false);
      setIsFormInitialized(true);
    }
  }, [isEditing, existingPost, isFormInitialized]);

  // Reset form initialization when switching between create/edit
  useEffect(() => {
    if (!isEditing) {
      setIsFormInitialized(false);
      setAutoSlug(true);
    }
  }, [isEditing]);

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: autoSlug ? generateSlug(title) : prev.slug,
    }));
  };

  const handleSlugChange = (slug: string) => {
    setAutoSlug(false);
    setFormData((prev) => ({ ...prev, slug }));
  };

  const handleContentChange = (content: string) => {
    setFormData((prev) => ({ ...prev, content }));
  };

  const validateForm = (): boolean => {
    const result = postSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const postData = {
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt,
        content: formData.content,
        cover_image: formData.cover_image,
        is_published: formData.is_published,
      };

      if (isEditing && id) {
        await updatePost.mutateAsync({ id, ...postData });
      } else {
        await createPost.mutateAsync(postData);
      }
      navigate("/admin/posts");
    } catch (error) {
      // Error is handled in the mutation
    }
  };

  const handleSaveDraft = async () => {
    if (!validateForm()) return;

    try {
      const postData = {
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt,
        content: formData.content,
        cover_image: formData.cover_image,
        is_published: false,
      };

      if (isEditing && id) {
        await updatePost.mutateAsync({ id, ...postData });
      } else {
        await createPost.mutateAsync(postData);
      }
      navigate("/admin/posts");
    } catch (error) {
      // Error is handled in the mutation
    }
  };

  const isSaving = createPost.isPending || updatePost.isPending;

  // Show loading state when fetching post for editing
  if (isEditing && loadingPost) {
    return (
      <Layout>
        <SEO title="Loading... | Admin" />
        <div className="flex min-h-[calc(100vh-200px)] items-center justify-center">
          <div className="text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
            <p className="mt-4 font-body text-muted-foreground">
              Loading post...
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO title={isEditing ? "Edit Post | Admin" : "New Post | Admin"} />

      <section className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            to="/admin/posts"
            className="mb-4 inline-flex items-center gap-2 font-sans text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Posts
          </Link>

          <h1 className="font-display text-3xl font-bold text-foreground">
            {isEditing ? "Edit Post" : "Create New Post"}
          </h1>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="grid gap-8 lg:grid-cols-3"
        >
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="font-sans">
                Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Enter post title..."
                className="font-sans text-lg"
              />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title}</p>
              )}
            </div>

            {/* Slug */}
            <div className="space-y-2">
              <Label htmlFor="slug" className="font-sans">
                URL Slug <span className="text-destructive">*</span>
              </Label>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm text-muted-foreground">
                  /blog/
                </span>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => handleSlugChange(e.target.value)}
                  placeholder="post-url-slug"
                  className="font-mono"
                />
              </div>
              {errors.slug && (
                <p className="text-sm text-destructive">{errors.slug}</p>
              )}
            </div>

            {/* Excerpt */}
            <div className="space-y-2">
              <Label htmlFor="excerpt" className="font-sans">
                Excerpt
              </Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, excerpt: e.target.value }))
                }
                placeholder="Brief description for SEO and previews..."
                rows={3}
                className="font-sans"
              />
              {errors.excerpt && (
                <p className="text-sm text-destructive">{errors.excerpt}</p>
              )}
              <p className="text-xs text-muted-foreground">
                {formData.excerpt?.length || 0}/500 characters
              </p>
            </div>

            {/* Content - Rich Text Editor */}
            <div className="space-y-2">
              <Label className="font-sans">Content</Label>
              <RichTextEditor
                content={formData.content || ""}
                onChange={handleContentChange}
                placeholder="Write your article content here..."
              />
              {errors.content && (
                <p className="text-sm text-destructive">{errors.content}</p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish Settings */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="mb-4 font-display text-lg font-semibold text-foreground">
                Publish
              </h3>

              <div className="mb-6 flex items-center justify-between">
                <Label htmlFor="is_published" className="font-sans">
                  Published
                </Label>
                <Switch
                  id="is_published"
                  checked={formData.is_published}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, is_published: checked }))
                  }
                />
              </div>

              <div className="flex flex-col gap-2">
                <Button
                  type="submit"
                  disabled={isSaving}
                  className="w-full font-sans"
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isSaving
                    ? "Saving..."
                    : formData.is_published
                    ? "Publish"
                    : "Save"}
                </Button>

                {!formData.is_published && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleSaveDraft}
                    disabled={isSaving}
                    className="w-full font-sans"
                  >
                    Save as Draft
                  </Button>
                )}

                {isEditing && formData.is_published && formData.slug && (
                  <Button
                    type="button"
                    variant="outline"
                    asChild
                    className="w-full font-sans"
                  >
                    <Link to={`/blog/${formData.slug}`} target="_blank">
                      <Eye className="mr-2 h-4 w-4" />
                      View Post
                    </Link>
                  </Button>
                )}
              </div>
            </div>

            {/* Cover Image */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="mb-4 font-display text-lg font-semibold text-foreground">
                Cover Image
              </h3>

              <ImageUpload
                value={formData.cover_image || ""}
                onChange={(url) =>
                  setFormData((prev) => ({
                    ...prev,
                    cover_image: url,
                  }))
                }
                bucket="blog-assets"
                folder="covers"
                label=""
                aspectRatio="video"
                placeholder="https://example.com/image.jpg"
              />
              {errors.cover_image && (
                <p className="mt-2 text-sm text-destructive">
                  {errors.cover_image}
                </p>
              )}
            </div>

            {/* Editor Tips */}
            <div className="rounded-lg border border-border bg-muted/30 p-6">
              <h3 className="mb-2 font-display text-sm font-semibold text-foreground">
                Editor Tips
              </h3>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li>• Use toolbar buttons to format text</li>
                <li>• Click link icon to add hyperlinks</li>
                <li>• Click image icon to add images</li>
                <li>• Ctrl+Z to undo, Ctrl+Y to redo</li>
              </ul>
            </div>
          </div>
        </motion.form>
      </section>
    </Layout>
  );
};

export default PostEditor;
