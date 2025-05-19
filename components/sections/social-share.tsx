'use client';

import React, { useEffect, useState } from 'react';
import { FaTwitter, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { IconBaseProps } from 'react-icons/lib';

interface SocialShareProps {
  title: string;
}

interface SocialPlatform {
  name: string;
  icon: IconType;
  getShareUrl: (url: string, title: string) => string;
}

const SocialShare: React.FC<SocialShareProps> = ({ title }) => {
  const [currentUrl, setCurrentUrl] = useState<string>('');

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const socialPlatforms: SocialPlatform[] = [
    {
      name: 'twitter',
      icon: FaTwitter,
      getShareUrl: (url: string, title: string) =>
        `https://twitter.com/share?url=${encodeURIComponent(
          url
        )}&text=${encodeURIComponent(title)}`
    },
    {
      name: 'facebook',
      icon: FaFacebook,
      getShareUrl: (url: string, title: string) =>
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`
    },
    {
      name: 'linkedin',
      icon: FaLinkedin,
      getShareUrl: (url: string, title: string) =>
        `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
          url
        )}&title=${encodeURIComponent(title)}`
    }
  ];

  return (
    <div className="flex space-x-4 mb-8">
      {socialPlatforms.map(({ name, icon: Icon, getShareUrl }) => {
        // Cast Icon to any to avoid type issues
        const IconComponent = Icon as React.ComponentType<IconBaseProps>;
        return (
          <a
            key={name}
            href={getShareUrl(currentUrl, title)}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-300 bg-primary-900/30 hover:text-white hover:bg-primary-800/50 rounded-full transition-all duration-300 transform hover:scale-110 border border-primary-700/30 shadow-sm"
            aria-label={`Share on ${name}`}
          >
            <IconComponent size={24} />
          </a>
        );
      })}
    </div>
  );
};

export default SocialShare;
