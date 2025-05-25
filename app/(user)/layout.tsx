import '../../styles/globals.css';
import clsx from 'clsx';
import local from 'next/font/local';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import Head from '../head';
import ClientOnlyFlareCursor from '@/components/ui/ClientOnlyFlareCursor';
import { metadata } from './layout-metadata';

export { metadata };

const graphik = local({
  src: [
    {
      path: '../../public/fonts/Graphik-Regular.ttf',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../../public/fonts/Graphik-Medium.ttf',
      weight: '600',
      style: 'bold'
    }
  ],
  variable: '--font-graphik',
  display: 'swap'
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html
      lang="en"
      className={clsx(
        'text-gray-100 bg-black dark',
        graphik.variable
      )}
    >
      <Head />

      <body className="bg-black text-gray-100 min-h-screen flex flex-col transition-colors duration-300">
        <ClientOnlyFlareCursor />
        <Header />
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 bg-black">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
