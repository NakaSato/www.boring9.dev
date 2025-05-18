// app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const robotsContent = {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://www.boring9.dev/sitemap.xml',
    host: 'https://www.boring9.dev',
  };

  // Next.js doesn't support comments in robots.txt through the API directly
  // You could add verification code through a custom robots.txt file instead
  // or handle it through a meta tag in your layout.tsx

  return robotsContent;
}
