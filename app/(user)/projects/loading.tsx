import SectionContainer from '@/components/utils/SectionContainer';
import TitleSectionPageContainer from '@/components/utils/TitleSectionPageContainer';

export default function ProjectsLoading() {
  return (
    <SectionContainer>
      <div className="flex flex-col w-full gap-6">
        <TitleSectionPageContainer title="Projects" />

        <div className="w-full flex flex-col gap-5 mb-8">
          <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-800/50 shadow-lg animate-pulse">
            <div className="w-3/4 h-5 bg-gray-800 rounded"></div>
            <div className="w-full h-5 bg-gray-800 rounded mt-3"></div>
            <div className="w-2/3 h-5 bg-gray-800 rounded mt-3"></div>
          </div>
        </div>

        {/* Featured Projects Skeleton */}
        <section className="mb-12">
          <div className="mb-6">
            <div className="w-56 h-8 bg-gray-800 rounded animate-pulse"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div 
                key={item} 
                className="flex flex-col bg-gray-900/90 rounded-xl overflow-hidden shadow-lg border border-gray-800/50 animate-pulse"
              >
                <div className="w-full h-48 bg-gray-800"></div>
                <div className="p-5 space-y-4">
                  <div className="w-2/3 h-6 bg-gray-800 rounded"></div>
                  <div className="w-full h-4 bg-gray-800 rounded"></div>
                  <div className="w-full h-4 bg-gray-800 rounded"></div>
                  <div className="flex space-x-2">
                    {[1, 2, 3].map((tag) => (
                      <div key={tag} className="w-16 h-5 bg-gray-800 rounded"></div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Project List Skeleton */}
        <section>
          <div className="mb-6">
            <div className="w-40 h-8 bg-gray-800 rounded animate-pulse"></div>
          </div>
          
          <div className="w-full h-14 bg-gray-900/70 border border-gray-800/50 rounded-lg mb-8"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            {/* Filters */}
            <div className="lg:col-span-1 space-y-6">
              <div className="space-y-3">
                <div className="w-32 h-5 bg-gray-800 rounded"></div>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="w-20 h-8 bg-gray-800 rounded-full"></div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="w-32 h-5 bg-gray-800 rounded"></div>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} className="w-16 h-6 bg-gray-800 rounded-full"></div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Projects */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div 
                    key={item} 
                    className="flex flex-col bg-gray-900/90 rounded-xl overflow-hidden shadow-lg border border-gray-800/50 animate-pulse"
                  >
                    <div className="w-full h-48 bg-gray-800"></div>
                    <div className="p-5 space-y-4">
                      <div className="w-2/3 h-6 bg-gray-800 rounded"></div>
                      <div className="w-full h-4 bg-gray-800 rounded"></div>
                      <div className="w-full h-4 bg-gray-800 rounded"></div>
                      <div className="flex space-x-2">
                        {[1, 2, 3].map((tag) => (
                          <div key={tag} className="w-16 h-5 bg-gray-800 rounded"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </SectionContainer>
  );
}
