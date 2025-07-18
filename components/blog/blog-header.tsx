'use client';

import {
  Clock,
  Calendar,
  Share2,
  Twitter,
  Facebook,
  Linkedin,
  Copy,
  Check
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface BlogHeaderProps {
  author: {
    name: string;
    handle: string;
    avatar?: string;
    bio?: string;
  };
  date: string;
  updatedDate?: string;
  readingTime: string;
  title?: string;
  url?: string;
  category?: string;
  tags?: string[];
}

export function BlogHeader({
  author,
  date,
  updatedDate,
  readingTime,
  title,
  url,
  category,
  tags
}: BlogHeaderProps) {
  const [shareDropdownOpen, setShareDropdownOpen] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  const handleShare = (platform: string) => {
    const shareUrl = url || window.location.href;
    const shareTitle = title || document.title;

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    };

    if (platform in shareUrls) {
      window.open(
        shareUrls[platform as keyof typeof shareUrls],
        '_blank',
        'width=600,height=400'
      );
    }
  };

  const handleCopyUrl = async () => {
    const urlToCopy = url || window.location.href;
    try {
      await navigator.clipboard.writeText(urlToCopy);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="relative">
      {/* Enhanced Header with gradient background */}
      <div className="bg-gradient-to-br from-gray-950/95 via-gray-900/90 to-gray-950/95 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6 sm:p-8 mb-8">
        {/* Category Badge */}
        {category && (
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500/20 to-purple-500/20 text-primary-300 border border-primary-500/30 rounded-xl text-sm font-semibold backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary-400 to-purple-400" />
              {category}
            </span>
          </div>
        )}

        {/* Author and Meta Information */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Author Section */}
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
              <div className="relative">
                {author.avatar ? (
                  <Image
                    src={author.avatar}
                    alt={author.name}
                    width={56}
                    height={56}
                    className="rounded-full object-cover border-2 border-gray-700/50"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 border-2 border-gray-600/50 flex items-center justify-center">
                    <span className="text-xl font-bold text-gray-200">
                      {author.name[0]}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-lg text-white">{author.name}</h4>
                <span className="text-gray-400 text-sm">@{author.handle}</span>
              </div>
              {author.bio && (
                <p className="text-gray-400 text-sm max-w-md">{author.bio}</p>
              )}
            </div>
          </div>

          {/* Share Section */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary-400" />
                <time dateTime={new Date(date).toISOString()}>
                  {formatDate(date)}
                </time>
              </div>

              {updatedDate && (
                <>
                  <span className="text-gray-600">•</span>
                  <span>Updated {formatDate(updatedDate)}</span>
                </>
              )}

              <span className="text-gray-600">•</span>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-400" />
                <span className="font-medium">{readingTime}</span>
              </div>
            </div>

            {/* Enhanced Share Buttons */}
            <div className="relative">
              <button
                onClick={() => setShareDropdownOpen(!shareDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 hover:border-gray-600/50 rounded-xl text-gray-300 hover:text-white transition-all duration-300 backdrop-blur-sm"
                aria-label="Share options"
              >
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline text-sm font-medium">
                  Share
                </span>
              </button>

              {/* Enhanced Share Dropdown */}
              {shareDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-xl shadow-2xl z-50 p-2">
                  <div className="space-y-1">
                    <button
                      onClick={() => handleShare('twitter')}
                      className="w-full flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200"
                    >
                      <Twitter className="w-4 h-4 text-blue-400" />
                      <span className="text-sm">Share on X</span>
                    </button>

                    <button
                      onClick={() => handleShare('facebook')}
                      className="w-full flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200"
                    >
                      <Facebook className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">Share on Facebook</span>
                    </button>

                    <button
                      onClick={() => handleShare('linkedin')}
                      className="w-full flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200"
                    >
                      <Linkedin className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">Share on LinkedIn</span>
                    </button>

                    <hr className="border-gray-700/50 my-1" />

                    <button
                      onClick={handleCopyUrl}
                      className="w-full flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200"
                    >
                      {copiedUrl ? (
                        <>
                          <Check className="w-4 h-4 text-green-400" />
                          <span className="text-sm text-green-400">
                            Copied!
                          </span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span className="text-sm">Copy Link</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Meta Information */}
        <div className="sm:hidden mt-6 pt-4 border-t border-gray-800/50">
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary-400" />
              <time dateTime={new Date(date).toISOString()}>
                {formatDate(date)}
              </time>
            </div>

            {updatedDate && (
              <div className="flex items-center gap-2">
                <span>Updated {formatDate(updatedDate)}</span>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-400" />
              <span className="font-medium">{readingTime}</span>
            </div>
          </div>
        </div>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-800/50">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 text-gray-300 text-xs font-medium rounded-lg transition-colors duration-200 cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Gradient overlay effects */}
        <div className="absolute inset-0 pointer-events-none rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-purple-500/5 rounded-2xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.05),transparent_60%)] rounded-2xl" />
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {shareDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShareDropdownOpen(false)}
        />
      )}
    </div>
  );
}
