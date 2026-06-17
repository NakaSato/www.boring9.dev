# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal blog/portfolio for boring9.dev. **Next.js 16 App Router**, TypeScript, Tailwind CSS v4, Bun. Dark-first design with custom cursor effects. Markdown blog content with an affiliate-link system and FTC compliance.

## Commands

```bash
bun dev            # Dev server (localhost:3000)
bun build          # Production build → ./build (distDir), output: standalone
bun start          # Serve production build
bun lint           # next lint (ESLint 9 + eslint-config-next)
bun check-links    # Validate external URLs across all blog posts (scripts/check-broken-links.ts)
bun check-images   # Verify affiliate image assets exist
bun fix-affiliates # Generate missing affiliate placeholder images
bun seo-validate   # GET /api/seo-validation (dev server must be running)
```

No test runner configured. Package manager is **Bun 1.0.30** (`bun.lock`); do not use npm/yarn. Prettier: single quotes, 2-space tabs, no trailing comma, always-parens arrows.

## Architecture

### Dual layout (App Router route groups)
- `app/(user)/` — public blog/portfolio. Dark theme, Graphik fonts, custom cursor.
- `app/(admin)/` — admin dashboard: `seo-dashboard`, `affiliate-manager`. Inter font.
- `app/api/` — `seo-validation`, `blog/upload`, `readability/[slug]`.

### Content pipeline — local filesystem
Blog posts are Markdown in `content/blog/*.md` with gray-matter frontmatter.
- **`lib/content.ts`** is the active source (`getAllBlogPosts`, `getBlogPostBySlug`). Pages/components import from `@/lib/content`. Reads `content/blog`, parses frontmatter, renders via `lib/markdown.ts`, computes reading time via `lib/read-time.ts`.
- **`lib/get-content.ts`** is the legacy GitHub-API fetcher (`GITHUB_REPO`, `GITHUB_TOKEN` envs). No longer the content source, but still **exports the shared `BlogPostProps` type** that `content.ts` and `get-local-content.ts` import — do not delete without relocating that type.
- `lib/markdown.ts` — remark/rehype pipeline (gfm, prism syntax highlight, sanitize, auto heading IDs via `lib/rehype-auto-headings.ts`).

> Note: `.github/copilot-instructions.md` describes a "Next.js 15, GitHub-based content" setup. That is **outdated** — repo is now Next 16 with local-filesystem content. Trust this file over copilot instructions on those two points.

### Affiliate system
- Links declared in post frontmatter as a structured `affiliateLinks` array (id, url, platform, title, price, imageUrl).
- `lib/affiliate-utils.ts` — platform-specific URL handling + validation. Auto `rel="sponsored"` and FTC disclosures.
- Images at `public/images/affiliates/` (400x400 SVG preferred). `scripts/fix-affiliate-images.js` generates missing placeholders.

### Caching — `proxy.ts` (Next 16 renamed middleware)
Sets `Cache-Control` by path: static assets 1 week, `/blog/*` posts 1 day, other pages 5 min (all `stale-while-revalidate`).

### Config notes
- `next.config.mjs`: `distDir: 'build'`, `output: 'standalone'`, security headers (X-Frame-Options DENY, nosniff, etc.), remote image patterns (githubusercontent, github, pbs.twimg, youtube).
- `tsconfig.json`: `strict`, path alias `@/*` → repo root.

## Layout

- `lib/` — content, markdown, affiliate, SEO (`seo-validator.ts`), projects (`projects.ts`), image utils.
- `components/blog/`, `components/admin/`, `components/content/` (homepage sections), `components/ui/` (shared primitives).
- `content/blog/` — Markdown posts. `scripts/` — link/image validation + asset generation (mix of `.ts` and `.js`).
