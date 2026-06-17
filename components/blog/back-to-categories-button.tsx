'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function BackToCategoriesButton() {
  return (
    <Link
      href="/blog/categories"
      className="group inline-flex items-center gap-2 text-sm text-gray-400 transition-colors duration-200 hover:text-primary-400"
    >
      <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
      <span>All categories</span>
    </Link>
  );
}
