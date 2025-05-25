---
title: "Your Post Title"
date: "YYYY-MM-DD"
excerpt: "A brief summary of your post (will be displayed in previews)"
category: "Category Name"
tags: ["tag1", "tag2", "tag3"]
coverImage: "/images/blog/default-cover.jpg"
author: "Your Name"
authorImage: "/profile.jpeg"
authorBio: "Brief author biography"
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

## Affiliate Links (Optional)

You can add affiliate links to your blog posts by including them in the frontmatter. These will automatically display in a dedicated section with proper FTC compliance disclosures.

### Example Affiliate Links

```markdown
affiliateLinks:
  - id: "unique-product-id"
    url: "https://platform.com/product?ref=yourcode"
    platform: "Platform Name"
    title: "Product Title"
    description: "Brief description"
    price: "$29.99"
    discount: "20% off"
    imageUrl: "/images/affiliates/product.jpg"
```

### Supported Platforms

- Amazon Associates
- AliExpress Affiliate
- eBay Partner Network
- Shopee Affiliate
- Lazada Affiliate
- Booking.com
- Agoda
- Custom platforms

### Management

Use the affiliate link manager at `/admin/affiliate-manager` to create and manage your affiliate links with a visual interface.

For detailed documentation, see `/docs/AFFILIATE_LINKS.md`.

## Using the Post Generator Script