// app/manifest.ts
import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Boring9.dev',
    short_name: 'Boring9',
    description: 'Personal website and blog of Chanthawat Kiriyadee',
    start_url: '/',
    display: 'standalone',
    background_color: '#111010',
    theme_color: '#111010',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
