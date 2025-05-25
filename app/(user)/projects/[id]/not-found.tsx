'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import SectionContainer from '@/components/utils/SectionContainer';
import AnimationContainer from '@/components/utils/AnimationContainer';

export default function ProjectNotFound() {
  return (
    <SectionContainer>
      <AnimationContainer customClassName="flex flex-col items-center justify-center py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-primary">Project Not Found</h1>
        
        <div className="bg-gray-900/70 border border-gray-800/50 rounded-xl p-8 md:p-12 shadow-lg max-w-xl mx-auto mb-8">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-24 w-24 text-gray-600 mx-auto mb-6"
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
          
          <p className="text-gray-300 text-lg mb-8">
            We couldn't find the project you're looking for. It may have been moved or deleted.
          </p>
          
          <Link 
            href="/projects" 
            className="flex items-center justify-center text-white bg-primary-600 hover:bg-primary-700 transition-colors px-6 py-3 rounded-lg font-medium mx-auto w-fit"
          >
            <ArrowLeft size={18} className="mr-2" />
            <span>Back to Projects</span>
          </Link>
        </div>
      </AnimationContainer>
    </SectionContainer>
  );
}
