import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/seo/SEO";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { LogOut, FileText, Settings, LayoutDashboard } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);

      if (!session?.user) {
        navigate("/admin/login");
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);

      if (!session?.user) {
        navigate("/admin/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/admin/login");
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex min-h-[calc(100vh-200px)] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO title="Admin Dashboard" />

      <section className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <h1 className="mb-2 font-display text-3xl font-bold text-foreground">
              Admin Dashboard
            </h1>
            <p className="font-body text-muted-foreground">
              {user?.email ? `Welcome back, ${user.email}` : "Welcome back"}
            </p>
          </div>

          <Button
            variant="outline"
            onClick={handleLogout}
            className="font-sans"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </motion.div>

        {/* Dashboard Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {/* Posts Card */}
          <div className="rounded-lg border border-border bg-card p-6 transition-shadow hover:shadow-md">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 font-display text-xl font-semibold text-foreground">
              Manage Posts
            </h3>
            <p className="mb-4 font-body text-sm text-muted-foreground">
              Create, edit, and publish blog articles.
            </p>
            <Button variant="outline" className="w-full font-sans" asChild>
              <Link to="/admin/posts">Manage Posts</Link>
            </Button>
          </div>

          {/* Settings Card */}
          <div className="rounded-lg border border-border bg-card p-6 transition-shadow hover:shadow-md">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/20">
              <Settings className="h-6 w-6 text-accent" />
            </div>
            <h3 className="mb-2 font-display text-xl font-semibold text-foreground">
              Site Settings
            </h3>
            <p className="mb-4 font-body text-sm text-muted-foreground">
              Update site title, description, and branding.
            </p>
            <Button variant="outline" className="w-full font-sans" asChild>
              <Link to="/admin/settings">Manage Settings</Link>
            </Button>
          </div>

          {/* Analytics Card */}
          <div className="rounded-lg border border-border bg-card p-6 transition-shadow hover:shadow-md">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
              <LayoutDashboard className="h-6 w-6 text-secondary-foreground" />
            </div>
            <h3 className="mb-2 font-display text-xl font-semibold text-foreground">
              Analytics
            </h3>
            <p className="mb-4 font-body text-sm text-muted-foreground">
              View site traffic and article performance.
            </p>
            <Button variant="outline" className="w-full font-sans" disabled>
              Coming Soon
            </Button>
          </div>
        </motion.div>
      </section>
    </Layout>
  );
};

export default AdminDashboard;
