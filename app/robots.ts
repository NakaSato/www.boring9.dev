// app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://www.boring9.dev/sitemap.xml',
    host: 'https://www.boring9.dev',
    googleBot: {
      'google-site-verification': process.env.GOOGLE_VERIFICATION_CODE || '',
    },
  };
}
