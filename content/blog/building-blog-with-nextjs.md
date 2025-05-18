---
title: "Building a Blog with Next.js and Markdown"
date: "2025-05-15"
excerpt: "Step by step guide to creating your own markdown-powered blog with Next.js"
category: "Tutorials"
tags: ["nextjs", "markdown", "tutorial", "react"]
coverImage: "/images/blog/default-cover.png"
author: "Chanthawat"
authorImage: "/profile.jpeg"
authorBio: "Student at UTCC"
---

# Building a Blog with Next.js and Markdown

Creating a blog with Next.js and Markdown provides an excellent balance of performance, developer experience, and content management. In this tutorial, I'll show you how to build a complete blogging platform that uses Markdown files for content.

## Setting Up Your Next.js Project

First, let's create a new Next.js project:

```bash
npx create-next-app@latest my-markdown-blog
cd my-markdown-blog
```

## Installing Required Dependencies

We'll need a few packages to work with Markdown:

```bash
npm install gray-matter remark remark-html remark-gfm
```

## Project Structure

Here's how we'll organize our project:

```
my-markdown-blog/
├── content/
│   └── blog/
│       ├── first-post.md
│       └── second-post.md
├── components/
│   ├── BlogCard.tsx
│   └── BlogHeader.tsx
├── lib/
│   ├── markdown.ts
│   └── blog.ts
└── app/
    ├── blog/
    │   ├── page.tsx
    │   └── [slug]/
    │       └── page.tsx
    └── layout.tsx
```

## Reading Markdown Files

Here's how you can read and parse your Markdown files:

```typescript
// lib/blog.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map(fileName => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return {
      slug,
      content,
      ...(data as { title: string; date: string; excerpt: string })
    };
  });
}
```

## Implementing the Blog List Page

And finally, displaying your blog posts:

```tsx
// app/blog/page.tsx
import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';

export default function BlogPage() {
  const posts = getAllPosts();
  
  return (
    <div>
      <h1>My Blog</h1>
      <div>
        {posts.map(post => (
          <Link href={`/blog/${post.slug}`} key={post.slug}>
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

## Conclusion

With this setup, you now have a fully functioning blog powered by Markdown. You can simply add new .md files to your content/blog directory, and they'll automatically appear on your blog.

The beauty of this approach is its simplicity — you can edit your content with any text editor, track changes with Git, and deploy without needing a database or CMS!

Happy blogging!
