export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  createdAt: string;
  readTime: string;
  isPublished: boolean;
}

export const mockPosts: Post[] = [
  {
    id: "1",
    slug: "building-modern-web-applications",
    title: "Building Modern Web Applications with React and TypeScript",
    excerpt:
      "Explore the best practices for creating scalable and maintainable web applications using React and TypeScript. Learn about component architecture, state management, and more.",
    content: `
# Building Modern Web Applications

In the ever-evolving landscape of web development, creating robust and maintainable applications requires careful consideration of the tools and patterns we employ. React and TypeScript have emerged as a powerful combination for building modern web applications.

## Why React and TypeScript?

React provides a declarative, component-based approach to building user interfaces. When combined with TypeScript, we gain the benefits of static type checking, improved IDE support, and better documentation through types.

### Key Benefits

1. **Type Safety**: Catch errors at compile time rather than runtime
2. **Better Developer Experience**: Enhanced autocomplete and refactoring support
3. **Self-Documenting Code**: Types serve as inline documentation
4. **Scalability**: Easier to maintain large codebases

## Component Architecture

A well-structured component architecture is crucial for long-term maintainability. Consider organizing your components by feature rather than type:

\`\`\`
src/
  features/
    auth/
      components/
      hooks/
      utils/
    blog/
      components/
      hooks/
      utils/
\`\`\`

## State Management

Modern React applications have several options for state management:

- **React Context + useReducer**: Great for medium-sized applications
- **Zustand**: Lightweight and simple to use
- **TanStack Query**: Perfect for server state management

## Conclusion

Building modern web applications is both an art and a science. By leveraging React and TypeScript together, we can create applications that are not only powerful but also maintainable and scalable.
    `,
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
    createdAt: "2024-01-15",
    readTime: "8 min read",
    isPublished: true,
  },
  {
    id: "2",
    slug: "mastering-css-grid-layouts",
    title: "Mastering CSS Grid: A Complete Guide to Modern Layouts",
    excerpt:
      "CSS Grid has revolutionized how we approach web layouts. This comprehensive guide covers everything from basic concepts to advanced techniques.",
    content: `
# Mastering CSS Grid

CSS Grid Layout is a two-dimensional layout system that has fundamentally changed how we approach web design. Unlike Flexbox, which is primarily one-dimensional, Grid allows you to work with rows and columns simultaneously.

## Getting Started

To create a grid container, simply apply \`display: grid\` to an element:

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
\`\`\`

## Key Concepts

### Grid Lines
Grid lines are the dividing lines that make up the structure of the grid. They can be referenced by number or by name.

### Grid Tracks
A grid track is the space between two adjacent grid lines—essentially a row or column.

### Grid Cells
The intersection of a row and column creates a grid cell, the smallest unit of the grid.

## Conclusion

CSS Grid provides an incredibly powerful and flexible system for creating complex layouts with clean, maintainable code.
    `,
    coverImage: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&auto=format&fit=crop&q=80",
    createdAt: "2024-01-10",
    readTime: "6 min read",
    isPublished: true,
  },
  {
    id: "3",
    slug: "introduction-to-supabase",
    title: "Introduction to Supabase: The Open Source Firebase Alternative",
    excerpt:
      "Discover how Supabase can accelerate your development with its powerful backend-as-a-service features including authentication, database, and real-time subscriptions.",
    content: `
# Introduction to Supabase

Supabase is an open-source alternative to Firebase that provides a suite of tools for building modern applications. It includes a PostgreSQL database, authentication, instant APIs, real-time subscriptions, and storage.

## Why Choose Supabase?

### PostgreSQL at Its Core
Unlike Firebase's NoSQL database, Supabase uses PostgreSQL, giving you the power of a relational database with all its features.

### Row Level Security
Supabase leverages PostgreSQL's Row Level Security (RLS) policies, providing fine-grained access control directly at the database level.

### Real-time Capabilities
Subscribe to database changes and receive updates in real-time, perfect for building collaborative applications.

## Getting Started

Setting up a Supabase project is straightforward:

1. Create a project on supabase.com
2. Set up your database schema
3. Configure authentication providers
4. Start building!

## Conclusion

Supabase provides a powerful, open-source backend solution that can significantly accelerate your development workflow.
    `,
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80",
    createdAt: "2024-01-05",
    readTime: "5 min read",
    isPublished: true,
  },
  {
    id: "4",
    slug: "the-art-of-clean-code",
    title: "The Art of Clean Code: Principles Every Developer Should Know",
    excerpt:
      "Writing clean, maintainable code is an essential skill for every developer. Learn the fundamental principles that will improve your code quality.",
    content: `
# The Art of Clean Code

Clean code is not just about making your code work—it's about making it understandable, maintainable, and a pleasure to work with.

## Fundamental Principles

### 1. Meaningful Names
Choose names that reveal intent. A variable name should tell you why it exists, what it does, and how it is used.

### 2. Small Functions
Functions should do one thing. They should do it well. They should do it only.

### 3. Comments Are Not Excuses
The best comment is the one you didn't have to write. Strive to make your code self-explanatory.

### 4. DRY - Don't Repeat Yourself
Every piece of knowledge must have a single, unambiguous, authoritative representation within a system.

## Conclusion

Clean code is a continuous practice. The more you write, the better you become at recognizing patterns and applying these principles.
    `,
    coverImage: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&auto=format&fit=crop&q=80",
    createdAt: "2024-01-01",
    readTime: "7 min read",
    isPublished: true,
  },
];
