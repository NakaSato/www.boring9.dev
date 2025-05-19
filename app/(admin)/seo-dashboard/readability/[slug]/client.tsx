'use client';

import { useState } from 'react';
import { Loader2, AlertTriangle, BookOpen, CheckCircle, Award } from 'lucide-react';
import Link from 'next/link';

interface ReadabilityData {
  score: number;
  readingLevel: string;
  suggestions: string[];
}

interface ReadabilityClientProps {
  slug: string;
  initialData: ReadabilityData | null;
  initialError: string | null;
}

export function ReadabilityClient({ slug, initialData, initialError }: ReadabilityClientProps) {
  const [data, setData] = useState<ReadabilityData | null>(initialData);
  const [error, setError] = useState<string | null>(initialError);
  const [loading, setLoading] = useState<boolean>(false);

  const refreshData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/readability/${slug}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const freshData = await response.json();
      setData(freshData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Error refreshing readability data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="p-4 bg-gray-900 border border-accent-700 rounded-md shadow-lg">
        <div className="flex items-center mb-2">
          <AlertTriangle className="w-5 h-5 text-accent-500 mr-2" />
          <h2 className="text-lg font-semibold text-accent-400">Error</h2>
        </div>
        <p className="text-gray-300">{error}</p>
        <button 
          onClick={refreshData}
          className="mt-4 px-4 py-2 bg-accent-600 text-white rounded-md hover:bg-accent-700 transition-colors focus:ring-2 focus:ring-accent-400 focus:ring-opacity-50"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Retrying...
            </span>
          ) : 'Retry'}
        </button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-4 bg-gray-900 border border-gray-800 rounded-md shadow-lg">
        <p className="text-gray-300">No readability data available.</p>
        <button 
          onClick={refreshData}
          className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors focus:ring-2 focus:ring-primary-400 focus:ring-opacity-50"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </span>
          ) : 'Load Data'}
        </button>
      </div>
    );
  }

  // Determine score color and message
  let scoreColor = 'text-secondary-500';
  let scoreMessage = 'Excellent readability';
  
  if (data.score < 50) {
    scoreColor = 'text-accent-500';
    scoreMessage = 'Difficult to read';
  } else if (data.score < 70) {
    scoreColor = 'text-yellow-500';
    scoreMessage = 'Moderately readable';
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold text-white">Readability Analysis</h1>
        <Link 
          href="/seo-dashboard" 
          className="text-primary-400 hover:text-primary-300 transition-colors flex items-center"
        >
          ← Back to Dashboard
        </Link>
      </div>
      
      <div className="mb-6 bg-gray-900 p-4 rounded-lg border border-gray-800">
        <div className="text-sm text-gray-400 mb-2">Analyzing Post</div>
        <div className="flex items-center">
          <BookOpen className="w-5 h-5 mr-2 text-primary-400" />
          <Link 
            href={`/blog/${slug}`} 
            className="text-lg hover:text-primary-400 transition-colors"
            target="_blank"
          >
            {slug}
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-900 rounded-lg p-6 flex flex-col items-center justify-center text-center border border-gray-800 shadow-lg hover:border-primary-800 transition-all">
          <div className="text-sm text-gray-400 mb-2">Readability Score</div>
          <div className={`text-4xl font-bold mb-2 ${scoreColor}`}>{data.score}</div>
          <div className={`text-sm ${scoreColor}`}>{scoreMessage}</div>
        </div>
        
        <div className="bg-gray-900 rounded-lg p-6 flex flex-col items-center justify-center text-center border border-gray-800 shadow-lg hover:border-primary-800 transition-all">
          <div className="text-sm text-gray-400 mb-2">Reading Level</div>
          <Award className={`w-6 h-6 mb-2 ${
            data.score > 70 ? 'text-secondary-500' : 
            data.score > 50 ? 'text-yellow-500' : 'text-accent-500'
          }`} />
          <div className="text-xl font-medium text-white">{data.readingLevel}</div>
        </div>
      </div>
      
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">Suggestions</h3>
          <button 
            onClick={refreshData}
            className="px-3 py-1.5 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors text-sm focus:ring-2 focus:ring-primary-400 focus:ring-opacity-50 flex items-center"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center">
                <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                Refreshing...
              </span>
            ) : (
              <span>Refresh Analysis</span>
            )}
          </button>
        </div>
        
        {data.suggestions.length > 0 ? (
          <ul className="space-y-3">
            {data.suggestions.map((suggestion: string, i: number) => (
              <li key={i} className="flex items-start gap-3 bg-gray-800 p-3 rounded-md">
                {suggestion.includes('No issues') ? (
                  <CheckCircle className="w-5 h-5 text-secondary-500 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                )}
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex items-center justify-center py-10 text-center">
            <div>
              <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-3" />
              <h4 className="text-xl font-medium mb-1">No issues found!</h4>
              <p className="text-gray-400">This post has excellent readability.</p>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Readability Tips</h3>
        <div className="bg-gray-800 rounded-lg p-6">
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span>• Use shorter sentences (15-20 words on average)</span>
            </li>
            <li className="flex items-start gap-3">
              <span>• Break up long paragraphs (3-4 sentences maximum)</span>
            </li>
            <li className="flex items-start gap-3">
              <span>• Use simpler words when possible</span>
            </li>
            <li className="flex items-start gap-3">
              <span>• Add subheadings to organize your content</span>
            </li>
            <li className="flex items-start gap-3">
              <span>• Use bullet points and lists for easier scanning</span>
            </li>
            <li className="flex items-start gap-3">
              <span>• Include transitional phrases between sections</span>
            </li>
            <li className="flex items-start gap-3">
              <span>• Aim for an 8th-grade reading level for general audiences</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="mt-6 flex justify-end">
        <button 
          onClick={refreshData}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Refreshing...
            </>
          ) : (
            <>Refresh Analysis</>
          )}
        </button>
      </div>
    </div>
  );
}
