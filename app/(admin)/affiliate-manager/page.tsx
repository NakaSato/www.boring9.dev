// app/(admin)/affiliate-manager/page.tsx
'use client';

import React from 'react';
import AffiliateLinkManager from '@/components/admin/affiliate-link-manager';

export default function AffiliateManagerPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Affiliate Link Management</h1>
          <p className="text-gray-400">
            Create and manage affiliate links for your blog posts. Use the generated YAML 
            in your blog post frontmatter to display affiliate links.
          </p>
        </div>

        <AffiliateLinkManager />

        <div className="mt-12 bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Usage Instructions</h2>
          <div className="space-y-4 text-sm text-gray-300">
            <div>
              <h3 className="font-medium text-white mb-2">1. Create Affiliate Links</h3>
              <p>Use the form above to create affiliate links with all necessary information including tracking URLs.</p>
            </div>
            
            <div>
              <h3 className="font-medium text-white mb-2">2. Export to Blog Post</h3>
              <p>Click "Export YAML" to copy the frontmatter configuration and paste it into your blog post.</p>
            </div>
            
            <div>
              <h3 className="font-medium text-white mb-2">3. Display in Content</h3>
              <p>The affiliate links will automatically appear in a dedicated section at the bottom of your blog post.</p>
            </div>
            
            <div>
              <h3 className="font-medium text-white mb-2">4. Track Performance</h3>
              <p>All clicks are automatically tracked in Google Analytics and other configured analytics platforms.</p>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-yellow-900/20 border border-yellow-800/30 p-6 rounded-lg">
          <h3 className="text-yellow-300 font-medium mb-2">Legal Compliance</h3>
          <p className="text-yellow-200/80 text-sm">
            Remember to comply with FTC guidelines and local regulations regarding affiliate marketing:
          </p>
          <ul className="text-yellow-200/80 text-sm mt-2 space-y-1 list-disc list-inside">
            <li>Include proper affiliate disclosures (automatically handled)</li>
            <li>Only promote products you genuinely recommend</li>
            <li>Ensure all affiliate links use proper rel attributes</li>
            <li>Be transparent about financial relationships</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
