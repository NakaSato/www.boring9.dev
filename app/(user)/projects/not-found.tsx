import Link from 'next/link';
import { FolderX, ArrowLeft } from 'lucide-react';
import SectionContainer from '@/components/utils/SectionContainer';
import AnimationContainer from '@/components/utils/AnimationContainer';

export default function ProjectNotFound() {
  return (
    <SectionContainer>
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <AnimationContainer>
          <FolderX className="w-20 h-20 text-gray-600 mb-6" />
          
          <h1 className="text-3xl md:text-4xl font-bold text-gradient-primary mb-4">
            Project Not Found
          </h1>
          
          <p className="text-lg text-gray-300 mb-8 max-w-lg">
            Sorry, we couldn't find the project you're looking for. It may have been moved or doesn't exist.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/projects"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <ArrowLeft size={18} />
              <span>Back to Projects</span>
            </Link>
            
            <Link 
              href="/"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <span>Go to Homepage</span>
            </Link>
          </div>
        </AnimationContainer>
      </div>
    </SectionContainer>
  );
}
