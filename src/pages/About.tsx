import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin, Mail, User } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/seo/SEO";
import { Button } from "@/components/ui/button";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const About = () => {
  const { data: settings } = useSiteSettings();

  const authorAvatar =
    settings?.author_avatar ||
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces";
  const authorName = settings?.author_name || "Ahmad Gozali";

  return (
    <Layout>
      <SEO
        title="About"
        description={`Learn more about ${authorName}, the author behind agozaliBlog - a developer passionate about coding, technology, and sharing knowledge.`}
      />

      <section className="container mx-auto px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <div className="mb-6 inline-block overflow-hidden rounded-full border-4 border-primary/20">
              {authorAvatar ? (
                <img
                  src={authorAvatar}
                  alt={authorName}
                  className="h-32 w-32 object-cover"
                />
              ) : (
                <div className="flex h-32 w-32 items-center justify-center bg-muted">
                  <User className="h-16 w-16 text-muted-foreground" />
                </div>
              )}
            </div>
            <h1 className="mb-4 font-display text-4xl font-bold text-foreground md:text-5xl">
              About Me
            </h1>
            <p className="font-body text-lg text-muted-foreground">
              Developer. Writer. Lifelong Learner.
            </p>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="prose-editorial mb-12"
          >
            <p className="font-body text-lg leading-relaxed text-foreground/90">
              Hello! I'm a passionate software developer with a love for
              creating elegant solutions to complex problems. With over a decade
              of experience in web development, I've worked with a wide range of
              technologies and frameworks.
            </p>

            <h2 className="mb-4 mt-10 font-display text-2xl font-semibold text-foreground">
              My Journey
            </h2>
            <p className="font-body leading-relaxed text-foreground/90">
              My journey into programming began when I was 15, tinkering with
              HTML and CSS to build my first website. Since then, I've fallen in
              love with the ever-evolving world of web development. From
              mastering JavaScript to exploring the depths of TypeScript and
              React, every step has been a learning adventure.
            </p>

            <h2 className="mb-4 mt-10 font-display text-2xl font-semibold text-foreground">
              Why I Write
            </h2>
            <p className="font-body leading-relaxed text-foreground/90">
              Writing is my way of giving back to the developer community. The
              tutorials and articles I've read over the years have been
              instrumental in my growth, and I hope my content can do the same
              for others. I believe in explaining complex concepts in simple
              terms, making technology accessible to everyone.
            </p>

            <h2 className="mb-4 mt-10 font-display text-2xl font-semibold text-foreground">
              What I Cover
            </h2>
            <ul className="list-disc space-y-2 pl-6 font-body text-foreground/90">
              <li>Modern JavaScript and TypeScript development</li>
              <li>React and frontend frameworks</li>
              <li>Backend development with Node.js and databases</li>
              <li>Best practices and clean code principles</li>
              <li>Developer tools and productivity tips</li>
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="border-t border-border pt-8"
          >
            <h3 className="mb-4 text-center font-sans text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Connect With Me
            </h3>
            <div className="flex justify-center gap-4">
              <Button variant="outline" size="icon" asChild>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="mailto:ahmadmulti10@gmail.com" aria-label="Email">
                  <Mail className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <Button asChild size="lg" className="font-sans">
              <Link to="/blog">Read My Articles</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
