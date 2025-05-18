// app/(user)/layout-metadata.ts
import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.boring9.dev'),
  title: {
    default: 'Chanthawat Kiriyadee | Developer',
    template: '%s | Boring9.dev'
  },
  description: 'Personal website and blog of Chanthawat Kiriyadee, a software engineer focusing on web development with React, Next.js, and TypeScript.',
  keywords: ['web development', 'javascript', 'typescript', 'react', 'next.js', 'developer', 'blog'],
  authors: [{ name: 'Chanthawat Kiriyadee' }],
  creator: 'Chanthawat Kiriyadee',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.boring9.dev',
    siteName: 'Boring9.dev',
    title: 'Chanthawat Kiriyadee | Developer',
    description: 'Personal website and blog of Chanthawat Kiriyadee, a software engineer focusing on web development with React, Next.js, and TypeScript.',
    images: [
      {
        url: '/profile.jpeg',
        width: 1200,
        height: 630,
        alt: 'Chanthawat Kiriyadee - Developer'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chanthawat Kiriyadee | Developer',
    description: 'Personal website and blog of Chanthawat Kiriyadee',
    creator: '@boring9dev',
    images: ['/profile.jpeg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
};
