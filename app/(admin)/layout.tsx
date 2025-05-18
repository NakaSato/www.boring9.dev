import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import Link from 'next/link';

// Use the Inter font
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Admin Dashboard | Boring9.dev',
  description: 'Admin dashboard for Boring9.dev',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`}>
        <div className="flex min-h-screen flex-col">
          <header className="bg-gray-900 border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link href="/" className="font-bold text-xl hover:text-blue-400 transition-colors">
                  Boring9.dev
                </Link>
                <span className="text-sm px-2 py-1 bg-blue-900 text-blue-200 rounded">Admin</span>
              </div>
              <nav>
                <ul className="flex space-x-6">
                  <li>
                    <Link href="/seo-dashboard" className="text-gray-300 hover:text-white transition-colors">
                      SEO Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                      Back to Site
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </header>
          <main className="flex-grow bg-gray-900">
            {children}
          </main>
          <footer className="bg-gray-900 border-t border-gray-800 py-4 text-center text-sm text-gray-500">
            Boring9.dev Admin Dashboard
          </footer>
        </div>
      </body>
    </html>
  );
}
