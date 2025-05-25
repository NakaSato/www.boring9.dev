// components/blog/affiliate-shortcode.tsx
'use client';

import React from 'react';
import { AffiliateLink } from '@/lib/get-content';
import AffiliateLinkComponent from './affiliate-link';

interface AffiliateShortcodeProps {
  linkId: string;
  variant?: 'card' | 'button' | 'inline';
  affiliateLinks: AffiliateLink[];
}

export default function AffiliateShortcode({ 
  linkId, 
  variant = 'inline',
  affiliateLinks 
}: AffiliateShortcodeProps) {
  const link = affiliateLinks.find(l => l.id === linkId);

  if (!link) {
    console.warn(`Affiliate link with ID "${linkId}" not found`);
    return (
      <span className="text-red-500 text-sm">
        [Affiliate link "{linkId}" not found]
      </span>
    );
  }

  return (
    <AffiliateLinkComponent 
      link={link} 
      variant={variant}
      className="my-4"
    />
  );
}
