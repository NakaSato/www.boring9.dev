'use client';

import { TwitterIcon, FacebookIcon, LinkedinIcon, LinkIcon } from 'lucide-react';
import { useState } from 'react';

interface SocialSharingProps {
  title: string;
  url: string;
  summary?: string;
}

export default function SocialSharing({ title, url, summary = '' }: SocialSharingProps) {
  const [copied, setCopied] = useState(false);
  
  // Ensure we have the full URL (client-side only)
  const fullUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}${url.startsWith('/') ? url : `/${url}`}`
    : url;
  
  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedSummary = encodeURIComponent(summary);
  
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedSummary}`;
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  
  return (
    <div className="flex items-center gap-4 my-6">
      <p className="text-sm text-gray-400">Share this post:</p>
      <div className="flex gap-2">
        <a 
          href={twitterUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Share on Twitter"
          className="p-2 text-gray-400 hover:text-blue-400 transition-colors rounded-full hover:bg-gray-800"
        >
          <TwitterIcon size={18} />
        </a>
        <a 
          href={facebookUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Share on Facebook"
          className="p-2 text-gray-400 hover:text-blue-600 transition-colors rounded-full hover:bg-gray-800"
        >
          <FacebookIcon size={18} />
        </a>
        <a 
          href={linkedinUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn"
          className="p-2 text-gray-400 hover:text-blue-500 transition-colors rounded-full hover:bg-gray-800"
        >
          <LinkedinIcon size={18} />
        </a>
        <button
          onClick={copyToClipboard}
          aria-label="Copy link to clipboard"
          className="p-2 text-gray-400 hover:text-emerald-400 transition-colors rounded-full hover:bg-gray-800 relative"
        >
          <LinkIcon size={18} />
          {copied && (
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-emerald-600 text-white text-xs rounded whitespace-nowrap">
              Link copied!
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
