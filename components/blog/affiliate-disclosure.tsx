// components/blog/affiliate-disclosure.tsx
import React from 'react';
import { Info } from 'lucide-react';

interface AffiliateDisclosureProps {
  className?: string;
  variant?: 'banner' | 'inline' | 'footer';
}

export default function AffiliateDisclosure({ 
  className = '',
  variant = 'banner'
}: AffiliateDisclosureProps) {
  const disclosureText = {
    banner: "This post contains affiliate links. If you click through and make a purchase, I may receive a commission at no additional cost to you. I only recommend products and services I personally use and believe will add value to my readers.",
    inline: "This is an affiliate link. I may earn a commission if you make a purchase.",
    footer: "Some links in this post are affiliate links, which means I may earn a commission if you make a purchase through them at no additional cost to you."
  };

  if (variant === 'inline') {
    return (
      <span className={`text-xs text-gray-500 italic ${className}`}>
        {disclosureText.inline}
      </span>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={`mt-8 pt-6 border-t border-gray-800 ${className}`}>
        <p className="text-sm text-gray-400 leading-relaxed">
          <strong className="text-gray-300">Affiliate Disclosure:</strong> {disclosureText.footer}
        </p>
      </div>
    );
  }

  // Banner variant (default)
  return (
    <div className={`bg-blue-900/20 border border-blue-800/30 rounded-lg p-4 mb-8 ${className}`}>
      <div className="flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-blue-300 font-medium mb-1">Affiliate Disclosure</h4>
          <p className="text-blue-200/80 text-sm leading-relaxed">
            {disclosureText.banner}
          </p>
        </div>
      </div>
    </div>
  );
}
