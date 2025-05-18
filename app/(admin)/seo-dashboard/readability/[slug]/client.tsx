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
  const [isLoading, setIsLoading] = useState(!initialData && !initialError);
  const [readabilityData, setReadabilityData] = useState<ReadabilityData | null>(initialData);
  const [errorMessage, setErrorMessage] = useState<string | null>(initialError);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-4" />
        <h2 className="text-xl font-semibold">Analyzing readability...</h2>
        <p className="text-gray-400 mt-2">This may take a moment</p>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <AlertTriangle className="w-8 h-8 text-red-500 mb-4" />
        <h2 className="text-xl font-semibold">Failed to load readability data</h2>
        <p className="text-gray-400 mt-2">{errorMessage}</p>
        <Link 
          href="/seo-dashboard" 
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Back to Dashboard
        </Link>
      </div>
    );
  }

  if (!readabilityData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <AlertTriangle className="w-8 h-8 text-red-500 mb-4" />
        <h2 className="text-xl font-semibold">No data available</h2>
        <p className="text-gray-400 mt-2">Could not analyze post readability</p>
        <Link 
          href="/seo-dashboard" 
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Back to Dashboard
        </Link>
      </div>
    );
  }

  // Determine score color and message
  let scoreColor = 'text-green-500';
  let scoreMessage = 'Excellent readability';
  
  if (readabilityData.score < 50) {
    scoreColor = 'text-red-500';
    scoreMessage = 'Difficult to read';
  } else if (readabilityData.score < 70) {
    scoreColor = 'text-yellow-500';
    scoreMessage = 'Moderately readable';
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="flex items-center mb-8">
        <Link 
          href="/seo-dashboard" 
          className="text-blue-400 hover:text-blue-300 transition-colors mr-4"
        >
          ← Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold">Readability Analysis</h1>
      </div>
      
      <div className="mb-6">
        <div className="text-sm text-gray-400 mb-2">Post</div>
        <div className="flex items-center">
          <BookOpen className="w-5 h-5 mr-2 text-blue-400" />
          <Link 
            href={`/blog/${slug}`} 
            className="text-lg hover:text-blue-400 transition-colors"
            target="_blank"
          >
            {slug}
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-800 rounded-lg p-6 flex flex-col items-center justify-center text-center">
          <div className="text-sm text-gray-400 mb-2">Readability Score</div>
          <div className={`text-4xl font-bold mb-2 ${scoreColor}`}>{readabilityData.score}</div>
          <div className={`text-sm ${scoreColor}`}>{scoreMessage}</div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6 flex flex-col items-center justify-center text-center">
          <div className="text-sm text-gray-400 mb-2">Reading Level</div>
          <Award className={`w-6 h-6 mb-2 ${
            readabilityData.score > 70 ? 'text-green-500' : 
            readabilityData.score > 50 ? 'text-yellow-500' : 'text-red-500'
          }`} />
          <div className="text-xl font-medium">{readabilityData.readingLevel}</div>
        </div>
      </div>
      
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Suggestions</h3>
        
        {readabilityData.suggestions.length > 0 ? (
          <ul className="space-y-3">
            {readabilityData.suggestions.map((suggestion: string, i: number) => (
              <li key={i} className="flex items-start gap-3">
                {suggestion.includes('No issues') ? (
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
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
    </div>
  );
}
