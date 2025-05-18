---
title: "Styling Markdown with Tailwind Typography"
date: "2025-05-10"
excerpt: "Learn how to add beautiful typography to your Markdown content using Tailwind's typography plugin"
category: "Design"
tags: ["tailwind", "css", "typography", "styling"]
coverImage: "/images/blog/default-cover.png"
author: "Chanthawat"
authorImage: "/profile.jpeg"
authorBio: "Student at UTCC"
---

# Styling Markdown with Tailwind Typography

When you're working with Markdown content in your Next.js application, styling that content consistently can be challenging. Tailwind CSS's Typography plugin solves this problem elegantly.

## What is the Typography Plugin?

The Typography plugin is an official Tailwind CSS plugin that provides a set of sensible defaults for styling text content. It's particularly useful for styling Markdown or rich text that comes from a CMS.

## Installation

First, you need to install the plugin:

```bash
npm install -D @tailwindcss/typography
```

Then, add it to your `tailwind.config.js`:

```js
module.exports = {
  theme: {
    // ...
  },
  plugins: [
    require('@tailwindcss/typography'),
    // ...
  ],
}
```

## Basic Usage

The simplest way to use the Typography plugin is to add the `prose` class to the containing element of your Markdown content:

```jsx
<article className="prose">
  {/* Your rendered markdown here */}
</article>
```

## Customizing Typography Styles

You can customize the typography styles by adding theme configuration:

```js
module.exports = {
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.800'),
            h2: {
              color: theme('colors.blue.700'),
            },
            'code::before': {
              content: '""'
            },
            'code::after': {
              content: '""'
            }
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
```

## Dark Mode Support

For dark mode support, you can use the `prose-invert` class or define your own variants:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      typography: (theme) => ({
        dark: {
          css: {
            color: theme('colors.gray.300'),
            h1: {
              color: theme('colors.gray.100'),
            },
            h2: {
              color: theme('colors.gray.100'),
            },
            // ... and more element overrides
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
```

Then, you can use it like this:

```jsx
<article className="prose dark:prose-dark">
  {/* Your rendered markdown here */}
</article>
```

## Size Variants

The Typography plugin comes with size modifiers that you can use to adjust the overall size of your typography:

- `prose-sm`: Smaller text
- `prose-base`: Default size
- `prose-lg`: Larger text
- `prose-xl`: Extra large text
- `prose-2xl`: Even larger text

Example:

```jsx
<article className="prose prose-lg">
  {/* Your rendered markdown here */}
</article>
```

## Conclusion

The Tailwind Typography plugin makes styling Markdown content a breeze. It provides sensible defaults while allowing for extensive customization to match your brand and design system.

By leveraging this plugin, you can ensure your blog posts and other content have consistent, beautiful typography without having to write a lot of custom CSS.
