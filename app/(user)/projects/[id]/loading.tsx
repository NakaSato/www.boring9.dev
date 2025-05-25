import SectionContainer from '@/components/utils/SectionContainer';

export default function ProjectLoading() {
  return (
    <SectionContainer>
      <div className="flex flex-col w-full gap-8">
        <div className="flex items-center justify-between">
          <div className="w-32 h-6 bg-gray-800 rounded animate-pulse"></div>
          <div className="w-24 h-6 bg-gray-800 rounded-full animate-pulse"></div>
        </div>
        
        <div className="space-y-6">
          {/* Title */}
          <div className="w-2/3 h-10 bg-gray-800 rounded animate-pulse"></div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            <div className="flex items-center">
              <div className="w-24 h-5 bg-gray-800 rounded animate-pulse"></div>
            </div>
            
            <div className="w-20 h-5 bg-gray-800 rounded-full animate-pulse"></div>
          </div>
          
          {/* Project Image */}
          <div className="relative w-full h-80 md:h-96 rounded-xl overflow-hidden bg-gray-800 animate-pulse"></div>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-2/3">
              <div className="mb-8 space-y-4">
                <div className="w-40 h-7 bg-gray-800 rounded animate-pulse"></div>
                <div className="space-y-3">
                  <div className="w-full h-5 bg-gray-800 rounded animate-pulse"></div>
                  <div className="w-full h-5 bg-gray-800 rounded animate-pulse"></div>
                  <div className="w-full h-5 bg-gray-800 rounded animate-pulse"></div>
                  <div className="w-2/3 h-5 bg-gray-800 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-1/3">
              <div className="bg-gray-900/70 border border-gray-800/50 rounded-xl p-6 shadow-lg">
                <div className="w-40 h-7 bg-gray-800 rounded mb-4 animate-pulse"></div>
                
                <div className="space-y-4">
                  {/* Tech Stack */}
                  <div>
                    <div className="w-32 h-5 bg-gray-800 rounded mb-2 animate-pulse"></div>
                    <div className="flex flex-wrap gap-2">
                      {[1, 2, 3, 4].map((item) => (
                        <div 
                          key={item} 
                          className="w-20 h-5 bg-gray-800 rounded animate-pulse"
                        ></div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Tags */}
                  <div>
                    <div className="w-20 h-5 bg-gray-800 rounded mb-2 animate-pulse"></div>
                    <div className="flex flex-wrap gap-2">
                      {[1, 2, 3].map((item) => (
                        <div 
                          key={item} 
                          className="w-16 h-5 bg-gray-800 rounded animate-pulse"
                        ></div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Links */}
                  <div className="pt-4 border-t border-gray-800">
                    <div className="flex flex-col gap-3">
                      <div className="w-32 h-5 bg-gray-800 rounded animate-pulse"></div>
                      <div className="w-32 h-5 bg-gray-800 rounded animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Related Projects */}
          <div className="mt-16">
            <div className="w-48 h-8 bg-gray-800 rounded mb-6 animate-pulse"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <div 
                  key={item} 
                  className="block bg-gray-900/80 border border-gray-800/50 rounded-lg overflow-hidden animate-pulse"
                >
                  <div className="h-40 w-full bg-gray-800"></div>
                  
                  <div className="p-4">
                    <div className="w-2/3 h-6 bg-gray-800 rounded mb-2"></div>
                    <div className="w-full h-4 bg-gray-800 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
