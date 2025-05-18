#!/bin/zsh

# This script creates a sample blog post and copies it to a local directory that simulates GitHub repo
# In a real setup, you would push this to your GitHub repository

# Create sample directory for blog posts (this simulates GitHub repo contents)
mkdir -p .sample-blog-posts

# Copy the markdown file
cp markdown-test.md .sample-blog-posts/getting-started-with-markdown.md

echo "Sample blog post created in .sample-blog-posts directory"
echo "In a real setup, you would push this to your GitHub repository: $GITHUB_REPO"
