export default function BlogCardSkeleton() {
  return (
    <article className="relative flex flex-col bg-gradient-to-br from-gray-900/95 via-gray-900/90 to-gray-800/95 rounded-2xl overflow-hidden border border-gray-800/50 backdrop-blur-sm">
      {/* Image skeleton */}
      <div className="relative w-full aspect-video bg-gray-800 skeleton" />
      
      <div className="relative flex flex-col p-6 flex-grow">
        {/* Category skeleton */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="h-6 w-20 bg-gray-700 rounded-full skeleton" />
          <div className="h-4 w-16 bg-gray-700 rounded skeleton" />
        </div>
        
        {/* Title skeleton */}
        <div className="mb-4">
          <div className="h-6 bg-gray-700 rounded skeleton mb-2" />
          <div className="h-6 bg-gray-700 rounded skeleton w-3/4" />
        </div>
        
        {/* Excerpt skeleton */}
        <div className="mb-6">
          <div className="h-4 bg-gray-700 rounded skeleton mb-2" />
          <div className="h-4 bg-gray-700 rounded skeleton w-5/6" />
        </div>
        
        {/* Author section skeleton */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-700/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-700 rounded-full skeleton" />
            <div className="flex flex-col gap-1">
              <div className="h-4 w-20 bg-gray-700 rounded skeleton" />
              <div className="h-3 w-16 bg-gray-700 rounded skeleton" />
            </div>
          </div>
          <div className="h-4 w-12 bg-gray-700 rounded skeleton" />
        </div>
      </div>
    </article>
  );
}
