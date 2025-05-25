// components/blog/affiliate-links-section.tsx
import React from 'react';
import { AffiliateLink } from '@/lib/get-content';
import AffiliateLinkComponent from './affiliate-link';
import AffiliateDisclosure from './affiliate-disclosure';

interface AffiliateLinksSectionProps {
  links: AffiliateLink[];
  title?: string;
  showDisclosure?: boolean;
  className?: string;
}

export default function AffiliateLinksSection({ 
  links, 
  title = "Recommended Products",
  showDisclosure = true,
  className = '' 
}: AffiliateLinksSectionProps) {
  if (!links || links.length === 0) {
    return null;
  }
  
  // Log for debugging
  console.log('Rendering affiliate links section:', links.map(l => ({
    id: l.id,
    title: l.title,
    imageUrl: l.imageUrl
  })));

  return (
    <div className={`my-8 ${className}`}>
      {showDisclosure && (
        <AffiliateDisclosure variant="banner" className="mb-6" />
      )}
      
      <h3 className="text-2xl font-bold text-white mb-6">{title}</h3>
      
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {links.map((link) => (
          <AffiliateLinkComponent 
            key={link.id} 
            link={link} 
            variant="card"
          />
        ))}
      </div>
    </div>
  );
}
