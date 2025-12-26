import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";

interface FeaturedArticleProps {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  date: string;
  readTime: string;
}

export function FeaturedArticle({
  slug,
  title,
  excerpt,
  coverImage,
  date,
  readTime,
}: FeaturedArticleProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="group relative overflow-hidden rounded-xl bg-card"
    >
      <Link to={`/blog/${slug}`} className="block">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto md:h-full">
            <img
              src={coverImage}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center p-6 md:p-8 lg:p-10">
            {/* Badge */}
            <span className="mb-4 inline-block w-fit rounded-full bg-primary/10 px-3 py-1 font-sans text-xs font-medium uppercase tracking-wider text-primary">
              Featured
            </span>

            {/* Meta */}
            <div className="mb-4 flex items-center gap-4 font-sans text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {readTime}
              </span>
            </div>

            {/* Title */}
            <h2 className="mb-4 font-display text-2xl font-bold leading-tight text-foreground transition-colors group-hover:text-primary md:text-3xl lg:text-4xl">
              {title}
            </h2>

            {/* Excerpt */}
            <p className="mb-6 line-clamp-3 font-body text-lg text-muted-foreground">
              {excerpt}
            </p>

            {/* CTA */}
            <span className="inline-flex items-center gap-2 font-sans text-base font-semibold text-primary transition-all group-hover:gap-3">
              Read article
              <ArrowRight className="h-5 w-5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
