// components/blog/affiliate-link.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { ExternalLink, Tag, ArrowRight } from 'lucide-react';
import { AffiliateLink } from '@/lib/get-content';
import { useAffiliateTracking } from '@/hooks/useAffiliateTracking';

interface AffiliateLinkProps {
  link: AffiliateLink;
  variant?: 'card' | 'button' | 'inline';
  className?: string;
  context?: string;
}

export default function AffiliateLinkComponent({ 
  link, 
  variant = 'card',
  className = '',
  context = 'blog-post'
}: AffiliateLinkProps) {
  const { trackClick } = useAffiliateTracking();

  const handleClick = () => {
    trackClick(link, context);
  };

  if (variant === 'inline') {
    return (
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer sponsored"
        onClick={handleClick}
        className={`inline-flex items-center gap-1 text-primary-400 hover:text-primary-300 transition-colors duration-200 underline decoration-dotted ${className}`}
      >
        {link.title}
        <ExternalLink className="w-3 h-3" />
      </a>
    );
  }

  if (variant === 'button') {
    return (
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer sponsored"
        onClick={handleClick}
        className={`inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${className}`}
      >
        {link.title}
        <ArrowRight className="w-4 h-4" />
      </a>
    );
  }

  // Card variant (default)
  return (
    <div className={`bg-gray-900/50 border border-primary-800/20 rounded-xl p-6 hover:border-primary-600/30 transition-all duration-300 ${className}`}>
      <div className="flex items-start gap-4">
        {link.imageUrl && (
          <div className="flex-shrink-0">
            <Image
              src={link.imageUrl}
              alt={link.title}
              width={80}
              height={80}
              className="rounded-lg object-contain"
              onError={(e) => {
                // If image fails to load, replace with a placeholder
                e.currentTarget.src = `/images/affiliates/product.svg`;
              }}
            />
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-medium px-2 py-1 bg-primary-900/50 text-primary-300 rounded-full">
              {link.platform}
            </span>
            {link.discount && (
              <span className="text-xs font-medium px-2 py-1 bg-green-900/50 text-green-300 rounded-full flex items-center gap-1">
                <Tag className="w-3 h-3" />
                {link.discount}
              </span>
            )}
          </div>
          
          <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
            {link.title}
          </h3>
          
          {link.description && (
            <p className="text-gray-300 text-sm mb-3 line-clamp-2">
              {link.description}
            </p>
          )}
          
          <div className="flex items-center justify-between">
            {link.price && (
              <span className="text-primary-400 font-bold text-lg">
                {link.price}
              </span>
            )}
            
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              onClick={handleClick}
              className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-sm"
            >
              View Deal
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
