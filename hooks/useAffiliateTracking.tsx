// hooks/useAffiliateTracking.tsx
'use client';

import { useCallback } from 'react';
import { AffiliateLink } from '@/lib/get-content';

interface AffiliateTrackingEvent {
  linkId: string;
  platform: string;
  url: string;
  title: string;
  timestamp: number;
}

export function useAffiliateTracking() {
  const trackClick = useCallback((link: AffiliateLink, context?: string) => {
    const event: AffiliateTrackingEvent = {
      linkId: link.id,
      platform: link.platform,
      url: link.url,
      title: link.title,
      timestamp: Date.now()
    };

    // Send to Google Analytics if available
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'affiliate_click', {
        event_category: 'affiliate',
        event_label: link.platform,
        value: link.id,
        custom_parameters: {
          affiliate_id: link.id,
          affiliate_platform: link.platform,
          context: context || 'unknown'
        }
      });
    }

    // Send to other analytics services
    if (typeof window !== 'undefined' && window.plausible) {
      window.plausible('Affiliate Click', {
        props: {
          platform: link.platform,
          linkId: link.id,
          context: context || 'unknown'
        }
      });
    }

    // Store in localStorage for reporting
    if (typeof window !== 'undefined') {
      try {
        const existingEvents = JSON.parse(
          localStorage.getItem('affiliate_clicks') || '[]'
        );
        existingEvents.push(event);
        
        // Keep only last 100 events
        const recentEvents = existingEvents.slice(-100);
        localStorage.setItem('affiliate_clicks', JSON.stringify(recentEvents));
      } catch (error) {
        console.warn('Failed to store affiliate tracking data:', error);
      }
    }

    console.log('Affiliate click tracked:', event);
  }, []);

  const getClickHistory = useCallback((): AffiliateTrackingEvent[] => {
    if (typeof window === 'undefined') return [];
    
    try {
      return JSON.parse(localStorage.getItem('affiliate_clicks') || '[]');
    } catch {
      return [];
    }
  }, []);

  const clearClickHistory = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('affiliate_clicks');
    }
  }, []);

  return {
    trackClick,
    getClickHistory,
    clearClickHistory
  };
}

// Extend window type for analytics
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    plausible?: (event: string, options?: any) => void;
  }
}
