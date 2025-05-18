'use client';

import { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, Info, Loader2 } from 'lucide-react';

interface SEOValidationError {
  type: string;
  message: string;
  page?: string;
  severity: 'error' | 'warning';
}

interface ValidationData {
  errors: SEOValidationError[];
  stats: {
    totalPosts: number;
    postsWithMissingMetadata: number;
    postsWithShortContent: number;
    postsWithoutTags: number;
    postsWithoutImages: number;
  };
}

export default function SEODashboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ValidationData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/seo-validation');
        const result = await response.json();
        
        if (!result.success) {
          throw new Error(result.error || 'Failed to fetch SEO validation data');
        }
        
        setData(result.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-4" />
        <h2 className="text-xl font-semibold">Analyzing SEO metrics...</h2>
        <p className="text-gray-400 mt-2">This may take a moment</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <AlertTriangle className="w-8 h-8 text-red-500 mb-4" />
        <h2 className="text-xl font-semibold">Failed to load SEO data</h2>
        <p className="text-gray-400 mt-2">{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <Info className="w-8 h-8 text-blue-500 mb-4" />
        <h2 className="text-xl font-semibold">No data available</h2>
        <p className="text-gray-400 mt-2">Please try again later</p>
      </div>
    );
  }

  // Calculate SEO health score (0-100)
  const totalIssues = data.errors.length;
  const criticalIssues = data.errors.filter(e => e.severity === 'error').length;
  
  const seoScore = Math.max(0, Math.min(100, Math.round(
    100 - (criticalIssues * 10) - (totalIssues - criticalIssues) * 2
  )));
  
  // Determine score color
  let scoreColorClass = 'text-green-500';
  if (seoScore < 70) scoreColorClass = 'text-red-500';
  else if (seoScore < 90) scoreColorClass = 'text-yellow-500';

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8">SEO Dashboard</h1>
      
      {/* Summary stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-800 rounded-lg p-6 shadow-md">
          <h3 className="text-lg text-gray-400 mb-2">SEO Health Score</h3>
          <div className={`text-4xl font-bold ${scoreColorClass}`}>
            {seoScore}%
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6 shadow-md">
          <h3 className="text-lg text-gray-400 mb-2">Total Blog Posts</h3>
          <div className="text-4xl font-bold text-white">
            {data.stats.totalPosts}
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6 shadow-md">
          <h3 className="text-lg text-gray-400 mb-2">Critical Issues</h3>
          <div className="text-4xl font-bold text-red-500">
            {criticalIssues}
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6 shadow-md">
          <h3 className="text-lg text-gray-400 mb-2">Warnings</h3>
          <div className="text-4xl font-bold text-yellow-500">
            {totalIssues - criticalIssues}
          </div>
        </div>
      </div>
      
      {/* Detailed stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-800 rounded-lg p-6 shadow-md">
          <h3 className="text-xl font-semibold mb-4">Content Issues</h3>
          <ul className="space-y-3">
            <li className="flex items-center justify-between">
              <span>Missing metadata</span>
              <span className="text-yellow-500">{data.stats.postsWithMissingMetadata}</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Short content</span>
              <span className="text-yellow-500">{data.stats.postsWithShortContent}</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Missing tags</span>
              <span className="text-yellow-500">{data.stats.postsWithoutTags}</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Missing images</span>
              <span className="text-yellow-500">{data.stats.postsWithoutImages}</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6 shadow-md">
          <h3 className="text-xl font-semibold mb-4">SEO Health</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span>Metadata Completion</span>
                <span>
                  {Math.round(100 - (data.stats.postsWithMissingMetadata / data.stats.totalPosts * 100))}%
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-500 rounded-full h-2" 
                  style={{ width: `${100 - (data.stats.postsWithMissingMetadata / data.stats.totalPosts * 100)}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span>Content Quality</span>
                <span>
                  {Math.round(100 - (data.stats.postsWithShortContent / data.stats.totalPosts * 100))}%
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-500 rounded-full h-2" 
                  style={{ width: `${100 - (data.stats.postsWithShortContent / data.stats.totalPosts * 100)}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span>Media Usage</span>
                <span>
                  {Math.round(100 - (data.stats.postsWithoutImages / data.stats.totalPosts * 100))}%
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-500 rounded-full h-2" 
                  style={{ width: `${100 - (data.stats.postsWithoutImages / data.stats.totalPosts * 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Issues list */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-md">
        <h3 className="text-xl font-semibold mb-4">SEO Issues ({data.errors.length})</h3>
        
        <div className="space-y-2">
          <div className="flex gap-2 mb-4">
            <button 
              className="px-3 py-1 rounded bg-gray-700 text-white text-sm hover:bg-gray-600"
              onClick={() => setData({
                ...data,
                errors: [...data.errors].sort((a, b) => 
                  a.severity === 'error' && b.severity !== 'error' ? -1 : 
                  a.severity !== 'error' && b.severity === 'error' ? 1 : 0
                )
              })}
            >
              Sort by Severity
            </button>
            <button 
              className="px-3 py-1 rounded bg-gray-700 text-white text-sm hover:bg-gray-600"
              onClick={() => setData({
                ...data,
                errors: [...data.errors].sort((a, b) => (a.type).localeCompare(b.type))
              })}
            >
              Sort by Type
            </button>
          </div>
          
          {data.errors.length > 0 ? (
            <div className="space-y-3">
              {data.errors.map((error, idx) => (
                <div 
                  key={idx} 
                  className={`p-4 rounded-lg flex items-start gap-3 ${
                    error.severity === 'error' ? 'bg-red-900/30' : 'bg-yellow-900/30'
                  }`}
                >
                  {error.severity === 'error' ? (
                    <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  ) : (
                    <Info className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  )}
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-medium uppercase ${
                        error.severity === 'error' ? 'text-red-400' : 'text-yellow-400'
                      }`}>
                        {error.type}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="text-sm text-gray-400">
                        {error.severity === 'error' ? 'Critical' : 'Warning'}
                      </span>
                    </div>
                    <p className="mt-1">{error.message}</p>
                    {error.page && (
                      <a 
                        href={error.page} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 text-sm mt-1 inline-block"
                      >
                        View Post →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center py-10 text-center">
              <div>
                <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-3" />
                <h4 className="text-xl font-medium mb-1">No SEO issues found!</h4>
                <p className="text-gray-400">Your blog posts are well-optimized for search engines.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
