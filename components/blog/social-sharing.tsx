'use client';

import {
  TwitterIcon,
  FacebookIcon,
  LinkedinIcon,
  LinkIcon,
  CheckIcon
} from 'lucide-react';
import { useState } from 'react';

interface SocialSharingProps {
  title: string;
  url: string;
  summary?: string;
}

export default function SocialSharing({
  title,
  url,
  summary = ''
}: SocialSharingProps) {
  const [copied, setCopied] = useState(false);

  const fullUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}${url.startsWith('/') ? url : `/${url}`}`
      : url;

  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedSummary = encodeURIComponent(summary);

  const links = [
    {
      label: 'Share on Twitter',
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      Icon: TwitterIcon
    },
    {
      label: 'Share on Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      Icon: FacebookIcon
    },
    {
      label: 'Share on LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedSummary}`,
      Icon: LinkedinIcon
    }
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const iconClass =
    'flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.02] text-gray-400 transition-colors duration-200 hover:border-primary-500/40 hover:text-primary-400';

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="font-mono text-xs uppercase tracking-[0.18em] text-gray-500">
        Share
      </span>
      <div className="flex gap-2">
        {links.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={iconClass}
          >
            <Icon size={16} />
          </a>
        ))}
        <button
          onClick={copyToClipboard}
          aria-label="Copy link to clipboard"
          className={iconClass}
        >
          {copied ? (
            <CheckIcon size={16} className="text-primary-400" />
          ) : (
            <LinkIcon size={16} />
          )}
        </button>
      </div>
    </div>
  );
}
