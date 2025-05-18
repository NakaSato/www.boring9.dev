'use client';

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function BackToCategoriesButton() {
  return (
    <Link
      href="/blog/categories"
      className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
    >
      <ChevronLeft size={16} className="mr-1" />
      <span>Back to All Categories</span>
    </Link>
  );
}
