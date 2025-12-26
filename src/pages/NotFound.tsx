import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/seo/SEO";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <SEO title="Page Not Found" />
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="mb-4 font-display text-8xl font-bold text-primary">
            404
          </h1>
          <h2 className="mb-4 font-display text-3xl font-semibold text-foreground">
            Page Not Found
          </h2>
          <p className="mb-8 max-w-md font-body text-muted-foreground">
            Oops! The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild className="font-sans">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Link>
            </Button>
            <Button variant="outline" asChild className="font-sans">
              <Link to="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Browse Blog
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default NotFound;
