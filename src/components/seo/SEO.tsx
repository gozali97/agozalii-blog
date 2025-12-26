import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  article?: boolean;
  publishedTime?: string;
  author?: string;
  keywords?: string;
  canonicalUrl?: string;
}

const defaultMeta = {
  siteName: "agozaliBlog",
  title: "agozaliBlog - Personal Blog about Coding, Technology & Development",
  description:
    "agozaliBlog adalah blog personal yang berbagi insight, tutorial, dan pengalaman seputar coding, web development, dan teknologi terkini. Dibuat oleh Ahmad Gozali.",
  image: "/og-image.jpg",
  url: typeof window !== "undefined" ? window.location.origin : "",
  author: "Ahmad Gozali",
  keywords:
    "blog programming, tutorial coding, web development, teknologi, react, laravel, javascript, typescript, ahmad gozali, agozali",
  twitterHandle: "@agozali",
  locale: "id_ID",
};

export function SEO({
  title,
  description,
  image,
  article = false,
  publishedTime,
  author,
  keywords,
  canonicalUrl,
}: SEOProps) {
  const seo = {
    title: title ? `${title} | ${defaultMeta.siteName}` : defaultMeta.title,
    description: description || defaultMeta.description,
    image: image || defaultMeta.image,
    url: typeof window !== "undefined" ? window.location.href : "",
    keywords: keywords || defaultMeta.keywords,
  };

  // Ensure image URL is absolute
  const absoluteImageUrl = seo.image.startsWith("http")
    ? seo.image
    : `${defaultMeta.url}${seo.image}`;

  const jsonLd = article
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: title,
        description: description,
        image: absoluteImageUrl,
        author: {
          "@type": "Person",
          name: author || defaultMeta.author,
          url: defaultMeta.url,
        },
        publisher: {
          "@type": "Organization",
          name: defaultMeta.siteName,
          logo: {
            "@type": "ImageObject",
            url: `${defaultMeta.url}/logo.png`,
          },
        },
        datePublished: publishedTime,
        dateModified: publishedTime,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": seo.url,
        },
        inLanguage: "id-ID",
      }
    : {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: defaultMeta.siteName,
        description: defaultMeta.description,
        url: defaultMeta.url,
        author: {
          "@type": "Person",
          name: defaultMeta.author,
        },
        inLanguage: "id-ID",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${defaultMeta.url}/blog?search={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      };

  // Person schema for author pages
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: defaultMeta.author,
    url: defaultMeta.url,
    sameAs: [
      "https://github.com/agozali",
      "https://linkedin.com/in/agozali",
      "https://twitter.com/agozali",
    ],
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <html lang="id" />
      <title>{seo.title}</title>
      <meta name="title" content={seo.title} />
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      <meta name="author" content={author || defaultMeta.author} />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="language" content="Indonesian" />
      <meta name="revisit-after" content="7 days" />

      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {!canonicalUrl && <link rel="canonical" href={seo.url} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={absoluteImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={defaultMeta.siteName} />
      <meta property="og:locale" content={defaultMeta.locale} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={defaultMeta.twitterHandle} />
      <meta name="twitter:creator" content={defaultMeta.twitterHandle} />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={absoluteImageUrl} />

      {/* Article specific */}
      {article && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {article && author && <meta property="article:author" content={author} />}
      {article && <meta property="article:section" content="Technology" />}

      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#8b5cf6" />
      <meta name="msapplication-TileColor" content="#8b5cf6" />

      {/* Structured Data - Website/Article */}
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>

      {/* Structured Data - Person (for author recognition) */}
      <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
    </Helmet>
  );
}
