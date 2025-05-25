# Affiliate Link System Documentation

This documentation explains how to use the affiliate link system in your blog posts.

## Overview

The affiliate link system allows you to:
- Add affiliate links to blog posts via frontmatter
- Display them in organized sections
- Track clicks and performance
- Maintain FTC compliance with automatic disclosures
- Support multiple e-commerce platforms

## Quick Start

### 1. Add Affiliate Links to Frontmatter

Add affiliate links to your blog post's frontmatter:

```yaml
---
title: "Your Blog Post Title"
# ... other frontmatter fields
affiliateLinks:
  - id: "product-1"
    url: "https://amazon.com/product?tag=yourcode"
    platform: "Amazon"
    title: "Product Name"
    description: "Brief product description"
    price: "$29.99"
    discount: "20% off"
    imageUrl: "/images/affiliates/product.jpg"
---
```

### 2. Automatic Display

Affiliate links will automatically appear:
- In a dedicated section at the bottom of your blog post
- With proper FTC compliance disclosures
- With click tracking enabled

## Supported Platforms

The system includes built-in support for:

- **Amazon** - Amazon Associates
- **AliExpress** - AliExpress Affiliate Program
- **eBay** - eBay Partner Network
- **Shopee** - Shopee Affiliate Program
- **Lazada** - Lazada Affiliate Program
- **Booking.com** - Booking.com Affiliate
- **Agoda** - Agoda Affiliate
- **Custom platforms** - Any other affiliate program

## Affiliate Link Properties

### Required Fields

- `id`: Unique identifier for the link
- `url`: Complete affiliate URL with tracking parameters
- `platform`: Platform name (e.g., "Amazon", "eBay")
- `title`: Product or service name

### Optional Fields

- `description`: Brief description of the product
- `price`: Current price (e.g., "$29.99", "€25.00")
- `discount`: Discount information (e.g., "20% off", "Save $10")
- `imageUrl`: Path to product image

## Display Variants

### Card Display (Default)
```yaml
# Displays as a card with image, description, and call-to-action button
# This is the default display in the affiliate links section
```

### Button Display
```yaml
# For inline button-style links (future feature for shortcodes)
```

### Inline Display
```yaml
# For inline text links within content (future feature for shortcodes)
```

## Image Guidelines

### Image Specifications
- **Size**: 400x400px recommended
- **Format**: SVG (preferred), JPG, PNG, or WebP
- **Location**: `/public/images/affiliates/`
- **Naming**: Use descriptive names matching the affiliate ID

### Example Image Structure
```
/public/images/affiliates/
├── github-copilot.svg
├── vercel.svg
├── figma.svg
├── webstorm.svg
└── amazon-aws.svg
```

## FTC Compliance

The system automatically handles FTC compliance:

### Automatic Disclosures
- Banner disclosure at the top of affiliate content
- Footer disclosure with legal text
- Proper `rel="sponsored"` attributes on all affiliate links

### Disclosure Text
The system includes pre-written FTC-compliant disclosure text that explains the affiliate relationship to readers.

## Analytics and Tracking

### Automatic Tracking
All affiliate link clicks are automatically tracked:
- Google Analytics events
- Plausible Analytics events
- Local storage for reporting

### Tracked Data
- Link ID and platform
- Timestamp of click
- Context (blog post, section, etc.)
- User session information

### Analytics Integration
To enable analytics tracking, ensure you have:
- Google Analytics or Plausible Analytics installed
- Proper tracking codes in your application
- Event tracking configured

## Best Practices

### Content Guidelines
1. **Authenticity**: Only promote products you genuinely use and recommend
2. **Relevance**: Ensure affiliate products are relevant to your content
3. **Transparency**: Be honest about your affiliate relationships
4. **Value**: Focus on providing value to your readers

### Technical Guidelines
1. **Image Optimization**: Use optimized images for faster loading
2. **Link Testing**: Regularly test affiliate links to ensure they work
3. **Performance**: Monitor click-through rates and conversions
4. **Compliance**: Keep up with FTC guidelines and platform policies

### SEO Considerations
1. **Rel Attributes**: All affiliate links include `rel="sponsored"` automatically
2. **No-follow**: Consider adding `rel="nofollow"` for additional SEO safety
3. **Balance**: Maintain a good balance of affiliate and non-affiliate content

## Example Blog Post

Here's a complete example of a blog post with affiliate links:

```markdown
---
title: "Best Productivity Tools for Developers"
date: "2025-05-25"
excerpt: "Discover the tools that can boost your productivity as a developer"
category: "Tools"
tags: ["productivity", "tools", "development"]
affiliateLinks:
  - id: "notion-pro"
    url: "https://notion.so/pricing?ref=yourcode"
    platform: "Notion"
    title: "Notion Pro Plan"
    description: "All-in-one workspace for notes, tasks, and documentation"
    price: "$10/month"
    imageUrl: "/images/affiliates/notion-pro.jpg"
  - id: "github-copilot"
    url: "https://github.com/features/copilot?ref=yourcode"
    platform: "GitHub"
    title: "GitHub Copilot"
    description: "AI-powered code completion and suggestions"
    price: "$10/month"
    discount: "Free for students"
    imageUrl: "/images/affiliates/github-copilot.jpg"
---

# Best Productivity Tools for Developers

As developers, we're always looking for tools that can help us work more efficiently...

[Your blog content here]

<!-- Affiliate links will automatically appear at the bottom -->
```

## Management Interface

Access the affiliate link management interface at `/admin/affiliate-manager` to:
- Create and edit affiliate links
- Export frontmatter YAML
- Manage affiliate link database
- View usage guidelines

## Troubleshooting

### Common Issues

**Affiliate links not displaying:**
- Check frontmatter syntax
- Ensure `affiliateLinks` array is properly formatted
- Verify all required fields are present

**Images not loading:**
- Check image paths are correct (we recommend using SVG files)
- Ensure images exist in `/public/images/affiliates/`
- Verify image file extensions match the reference in the blog post
- If needed, run `node scripts/fix-affiliate-images.js` to generate missing placeholder images

**Tracking not working:**
- Confirm analytics is properly installed
- Check browser console for errors
- Verify tracking code is active

### Support

For technical support or feature requests:
1. Check the documentation first
2. Review example implementations
3. Test with the management interface
4. Contact the development team if issues persist

## Future Enhancements

Planned features include:
- Shortcode support for inline affiliate links
- Performance analytics dashboard
- A/B testing for affiliate placements
- Integration with affiliate networks
- Automated link validation
- Revenue tracking and reporting
