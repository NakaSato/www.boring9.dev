// lib/affiliate-utils.ts
import { AffiliateLink } from './get-content';

export interface AffiliateLinkTemplate {
  platform: string;
  baseUrl: string;
  trackingParam: string;
}

// Common affiliate platform templates
export const AFFILIATE_PLATFORMS: Record<string, AffiliateLinkTemplate> = {
  amazon: {
    platform: 'Amazon',
    baseUrl: 'https://amazon.com',
    trackingParam: 'tag'
  },
  aliexpress: {
    platform: 'AliExpress',
    baseUrl: 'https://aliexpress.com',
    trackingParam: 'aff_trace_key'
  },
  ebay: {
    platform: 'eBay',
    baseUrl: 'https://ebay.com',
    trackingParam: 'campid'
  },
  shopee: {
    platform: 'Shopee',
    baseUrl: 'https://shopee.com',
    trackingParam: 'af_sub_id'
  },
  lazada: {
    platform: 'Lazada',
    baseUrl: 'https://lazada.com',
    trackingParam: 'aff_sub'
  },
  booking: {
    platform: 'Booking.com',
    baseUrl: 'https://booking.com',
    trackingParam: 'aid'
  },
  agoda: {
    platform: 'Agoda',
    baseUrl: 'https://agoda.com',
    trackingParam: 'cid'
  }
};

/**
 * Generate an affiliate link with proper tracking parameters
 */
export function generateAffiliateLink(
  productUrl: string,
  platform: string,
  affiliateId: string
): string {
  const platformConfig = AFFILIATE_PLATFORMS[platform.toLowerCase()];
  
  if (!platformConfig) {
    console.warn(`Unknown affiliate platform: ${platform}`);
    return productUrl;
  }

  try {
    const url = new URL(productUrl);
    url.searchParams.set(platformConfig.trackingParam, affiliateId);
    return url.toString();
  } catch (error) {
    console.error('Error generating affiliate link:', error);
    return productUrl;
  }
}

/**
 * Validate affiliate link structure
 */
export function validateAffiliateLink(link: AffiliateLink): string[] {
  const errors: string[] = [];

  if (!link.id) errors.push('ID is required');
  if (!link.url) errors.push('URL is required');
  if (!link.platform) errors.push('Platform is required');
  if (!link.title) errors.push('Title is required');

  // Validate URL format
  if (link.url) {
    try {
      new URL(link.url);
    } catch {
      errors.push('Invalid URL format');
    }
  }

  return errors;
}

/**
 * Extract platform from URL if not specified
 */
export function detectPlatform(url: string): string {
  try {
    const hostname = new URL(url).hostname.toLowerCase();
    
    if (hostname.includes('amazon')) return 'amazon';
    if (hostname.includes('aliexpress')) return 'aliexpress';
    if (hostname.includes('ebay')) return 'ebay';
    if (hostname.includes('shopee')) return 'shopee';
    if (hostname.includes('lazada')) return 'lazada';
    if (hostname.includes('booking')) return 'booking';
    if (hostname.includes('agoda')) return 'agoda';
    
    return 'other';
  } catch {
    return 'unknown';
  }
}

/**
 * Format price with currency symbol
 */
export function formatPrice(price: string, currency: string = 'USD'): string {
  const symbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    THB: '฿',
    JPY: '¥',
    CNY: '¥'
  };

  const symbol = symbols[currency] || currency;
  const numericPrice = price.replace(/[^\d.,]/g, '');
  
  return `${symbol}${numericPrice}`;
}

/**
 * Create affiliate link shortcode for markdown
 */
export function createAffiliateLinkShortcode(
  linkId: string,
  variant: 'card' | 'button' | 'inline' = 'inline'
): string {
  return `[affiliate:${linkId}:${variant}]`;
}

/**
 * Parse affiliate link shortcodes from markdown content
 */
export function parseAffiliateLinkShortcodes(content: string): {
  content: string;
  linkIds: string[];
} {
  const shortcodeRegex = /\[affiliate:([^:]+):([^\]]+)\]/g;
  const linkIds: string[] = [];
  
  const updatedContent = content.replace(shortcodeRegex, (match, linkId, variant) => {
    linkIds.push(linkId);
    // Replace with a placeholder that can be processed on the client side
    return `<div data-affiliate-link="${linkId}" data-variant="${variant}"></div>`;
  });

  return {
    content: updatedContent,
    linkIds: Array.from(new Set(linkIds)) // Remove duplicates
  };
}
