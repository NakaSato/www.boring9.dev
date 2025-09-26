# Copilot Instructions for Boring9.dev

This is a **Next.js 15 blog/portfolio** using App Router with dual layouts, GitHub-based content management, and a comprehensive affiliate link system.

## Architecture Overview

**Dual Layout System:**

- `app/(user)/` - Public blog/portfolio with dark theme, custom cursor effects, and Graphik fonts
- `app/(admin)/` - Admin dashboard for SEO and affiliate management (Inter font)

**Content Management:**

- Blog posts stored as `.md` files in GitHub repository (configured via `GITHUB_REPO` env var)
- Content fetched from GitHub API at build time via `lib/get-content.ts`
- Frontmatter-driven metadata including affiliate links array

**Affiliate System Architecture:**

- Affiliate links defined in blog post frontmatter as structured arrays
- Platform-specific URL generation via `lib/affiliate-utils.ts`
- Automatic FTC compliance disclosures
- Click tracking integration with analytics

## Essential Development Workflows

**Development Commands:**

```bash
bun dev          # Start development server
bun build        # Production build (outputs to ./build)
bun check-links  # Validate all external links in blog posts
bun check-images # Verify affiliate image assets exist
bun fix-affiliates # Generate missing affiliate placeholder images
```

**Content Workflow:**

1. Add `.md` files to GitHub repo root (configured via `GITHUB_REPO`)
2. Include frontmatter with affiliate links array if needed
3. Run `bun check-links` to validate external URLs
4. Use `/admin/affiliate-manager` for guided affiliate setup

## Key Patterns & Conventions

**Affiliate Link Structure:**

```yaml
# In blog post frontmatter
affiliateLinks:
  - id: 'unique-product-id'
    url: 'https://platform.com/product?tracking=code'
    platform: 'Amazon' # Matches AFFILIATE_PLATFORMS keys
    title: 'Product Name'
    price: '$29.99'
    imageUrl: '/images/affiliates/product.svg' # SVG preferred
```

**Component Organization:**

- `components/blog/` - Blog-specific UI (cards, pagination, affiliate displays)
- `components/admin/` - Admin interface components
- `components/content/` - Homepage sections (Hero, AboutMe, etc.)
- `components/ui/` - Shared UI primitives

**Styling Approach:**

- Tailwind CSS with dark-first design (`bg-black text-gray-100`)
- CSS modules for specific animations (`mobileMenu.module.css`)
- Custom cursor effects via `AdvancedFlareCursor` component

## Critical Integration Points

**GitHub API Integration:**

- Uses `GITHUB_TOKEN` for authenticated requests when available
- Falls back to public API if token missing
- Content caching handled by Next.js but can be bypassed with `Cache-Control: no-cache`

**Image Handling:**

- Next.js Image component with remote patterns for GitHub, YouTube, Twitter
- Affiliate images at `/public/images/affiliates/` (400x400px SVG preferred)
- Auto-generates missing affiliate placeholders via script

**SEO & Analytics:**

- Automatic `rel="sponsored"` on affiliate links
- Middleware-based caching strategy (static: 1 week, posts: 1 day, pages: 5 min)
- Reading time calculation via `reading-time` package

## Essential Files to Reference

**Core Content Logic:**

- `lib/get-content.ts` - GitHub API content fetching
- `lib/affiliate-utils.ts` - Affiliate link processing and validation
- `middleware.ts` - Caching strategy and headers

**Layout Templates:**

- `app/(user)/layout.tsx` - Public site layout with dark theme
- `app/(admin)/layout.tsx` - Admin dashboard layout
- `components/blog/affiliate-links-section.tsx` - Affiliate display component

**Build & Scripts:**

- `scripts/check-broken-links.ts` - URL validation across all posts
- `scripts/fix-affiliate-images.js` - Asset management automation

## Development Context

- **Package Manager:** Bun (v1.0.30)
- **Runtime:** Next.js 15 with standalone output for deployment
- **Content Source:** GitHub repository specified in `GITHUB_REPO` env var
- **Admin Access:** `/admin/` routes for content management
- **Analytics:** Supports Google Analytics and Plausible via tracking hooks

When adding new features, follow the established patterns: dual layouts for user/admin, GitHub-first content, frontmatter-driven metadata, and automated compliance for affiliate content.
