# Blog Content Directory

This directory contains all the blog posts for your website in Markdown format.

## Creating a New Blog Post

1. Create a new `.md` file in this directory
2. Name it using kebab-case, e.g., `my-new-blog-post.md` (this will be used for the URL slug)
3. Include the required frontmatter at the top of your file

## Required Frontmatter

Every blog post must include the following frontmatter at the top of the file:

```markdown
---
title: "Your Post Title"
date: "YYYY-MM-DD"
excerpt: "A brief summary of your post (will be displayed in previews)"
category: "Category Name"
tags: ["tag1", "tag2", "tag3"]
coverImage: "/path/to/cover-image.jpg"
author: "Your Name"
authorImage: "/path/to/author-image.jpg"
authorBio: "Brief author biography"
---
```

## Writing Markdown Content

After the frontmatter, write your content using Markdown syntax. Some examples:

### Headers

```markdown
# Header 1
## Header 2
### Header 3
```

### Lists

```markdown
- Item 1
- Item 2
  - Nested item
```

### Code Blocks

````markdown
```javascript
function helloWorld() {
  console.log("Hello, world!");
}
```
````

### Images

```markdown
![Alt text](/path/to/image.jpg)
```

### Links

```markdown
[Link text](https://example.com)
```

## Using the Post Generator Script

For convenience, you can use the sample post generator script:

```bash
./scripts/create-sample-post.sh
```

This will create a new blog post with the current date in the filename.
