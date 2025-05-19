import '../../styles/globals.css';
import clsx from 'clsx';
import local from 'next/font/local';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import Head from '../head';
import FlareCursor from '@/components/ui/FlareCursor';
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
        'text-white bg-gray-950',
        graphik.variable
      )}
    >
      <Head />

      <body className="bg-gray-950 min-h-screen flex flex-col transition-colors duration-300">
        <FlareCursor />
        <Header />
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
