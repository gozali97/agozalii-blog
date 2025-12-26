import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";

interface ArticleCardProps {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  date: string;
  readTime: string;
  index?: number;
}

export function ArticleCard({
  slug,
  title,
  excerpt,
  coverImage,
  date,
  readTime,
  index = 0,
}: ArticleCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link to={`/blog/${slug}`} className="block">
        {/* Image Container */}
        <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-lg bg-muted">
          <img
            src={coverImage}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-foreground/0 transition-colors duration-300 group-hover:bg-foreground/5" />
        </div>

        {/* Content */}
        <div className="space-y-3">
          {/* Meta */}
          <div className="flex items-center gap-4 font-sans text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {readTime}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-display text-xl font-semibold leading-tight text-foreground transition-colors group-hover:text-primary md:text-2xl">
            {title}
          </h3>

          {/* Excerpt */}
          <p className="line-clamp-2 font-body text-muted-foreground">
            {excerpt}
          </p>

          {/* Read More */}
          <span className="inline-flex items-center gap-1 font-sans text-sm font-medium text-primary transition-all group-hover:gap-2">
            Read more
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
