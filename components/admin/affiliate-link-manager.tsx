// components/admin/affiliate-link-manager.tsx
'use client';

import React, { useState } from 'react';
import { AffiliateLink } from '@/lib/get-content';
import { validateAffiliateLink, detectPlatform, AFFILIATE_PLATFORMS } from '@/lib/affiliate-utils';
import { Plus, Trash2, Edit2, ExternalLink } from 'lucide-react';

interface AffiliateLinkManagerProps {
  initialLinks?: AffiliateLink[];
  onLinksChange?: (links: AffiliateLink[]) => void;
}

export default function AffiliateLinkManager({ 
  initialLinks = [], 
  onLinksChange 
}: AffiliateLinkManagerProps) {
  const [links, setLinks] = useState<AffiliateLink[]>(initialLinks);
  const [editingLink, setEditingLink] = useState<AffiliateLink | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [formData, setFormData] = useState<Partial<AffiliateLink>>({
    id: '',
    url: '',
    platform: '',
    title: '',
    description: '',
    price: '',
    discount: '',
    imageUrl: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.id || !formData.url || !formData.platform || !formData.title) {
      alert('Please fill in all required fields');
      return;
    }

    const newLink: AffiliateLink = {
      id: formData.id,
      url: formData.url,
      platform: formData.platform,
      title: formData.title,
      description: formData.description,
      price: formData.price,
      discount: formData.discount,
      imageUrl: formData.imageUrl
    };

    const errors = validateAffiliateLink(newLink);
    if (errors.length > 0) {
      alert('Validation errors:\n' + errors.join('\n'));
      return;
    }

    let updatedLinks;
    if (editingLink) {
      updatedLinks = links.map(link => 
        link.id === editingLink.id ? newLink : link
      );
    } else {
      updatedLinks = [...links, newLink];
    }

    setLinks(updatedLinks);
    onLinksChange?.(updatedLinks);
    resetForm();
  };

  const handleDelete = (linkId: string) => {
    if (confirm('Are you sure you want to delete this affiliate link?')) {
      const updatedLinks = links.filter(link => link.id !== linkId);
      setLinks(updatedLinks);
      onLinksChange?.(updatedLinks);
    }
  };

  const handleEdit = (link: AffiliateLink) => {
    setFormData(link);
    setEditingLink(link);
    setIsCreating(true);
  };

  const resetForm = () => {
    setFormData({
      id: '',
      url: '',
      platform: '',
      title: '',
      description: '',
      price: '',
      discount: '',
      imageUrl: ''
    });
    setEditingLink(null);
    setIsCreating(false);
  };

  const handleUrlChange = (url: string) => {
    setFormData(prev => ({
      ...prev,
      url,
      platform: prev.platform || detectPlatform(url)
    }));
  };

  const exportToYaml = () => {
    const yamlContent = `affiliateLinks:\n${links.map(link => 
      `  - id: "${link.id}"\n` +
      `    url: "${link.url}"\n` +
      `    platform: "${link.platform}"\n` +
      `    title: "${link.title}"\n` +
      (link.description ? `    description: "${link.description}"\n` : '') +
      (link.price ? `    price: "${link.price}"\n` : '') +
      (link.discount ? `    discount: "${link.discount}"\n` : '') +
      (link.imageUrl ? `    imageUrl: "${link.imageUrl}"\n` : '')
    ).join('')}`;

    navigator.clipboard.writeText(yamlContent);
    alert('YAML copied to clipboard! You can paste this into your blog post frontmatter.');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Affiliate Link Manager</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            Add Link
          </button>
          {links.length > 0 && (
            <button
              onClick={exportToYaml}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Export YAML
            </button>
          )}
        </div>
      </div>

      {isCreating && (
        <div className="bg-gray-800 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-4">
            {editingLink ? 'Edit' : 'Create'} Affiliate Link
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">ID *</label>
              <input
                type="text"
                value={formData.id}
                onChange={(e) => setFormData(prev => ({ ...prev, id: e.target.value }))}
                className="w-full p-2 bg-gray-700 rounded border border-gray-600"
                placeholder="unique-link-id"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Platform *</label>
              <select
                value={formData.platform}
                onChange={(e) => setFormData(prev => ({ ...prev, platform: e.target.value }))}
                className="w-full p-2 bg-gray-700 rounded border border-gray-600"
                required
              >
                <option value="">Select platform</option>
                {Object.values(AFFILIATE_PLATFORMS).map(platform => (
                  <option key={platform.platform} value={platform.platform}>
                    {platform.platform}
                  </option>
                ))}
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">URL *</label>
              <input
                type="url"
                value={formData.url}
                onChange={(e) => handleUrlChange(e.target.value)}
                className="w-full p-2 bg-gray-700 rounded border border-gray-600"
                placeholder="https://example.com/product?ref=yourcode"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full p-2 bg-gray-700 rounded border border-gray-600"
                placeholder="Product or service name"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full p-2 bg-gray-700 rounded border border-gray-600 h-20"
                placeholder="Brief description of the product or service"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Price</label>
              <input
                type="text"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                className="w-full p-2 bg-gray-700 rounded border border-gray-600"
                placeholder="$29.99"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Discount</label>
              <input
                type="text"
                value={formData.discount}
                onChange={(e) => setFormData(prev => ({ ...prev, discount: e.target.value }))}
                className="w-full p-2 bg-gray-700 rounded border border-gray-600"
                placeholder="20% off"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Image URL</label>
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                className="w-full p-2 bg-gray-700 rounded border border-gray-600"
                placeholder="/images/affiliates/product.jpg"
              />
            </div>

            <div className="md:col-span-2 flex gap-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                {editingLink ? 'Update' : 'Create'} Link
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {links.map(link => (
          <div key={link.id} className="bg-gray-800 p-4 rounded-lg flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium">{link.title}</span>
                <span className="text-sm bg-gray-700 px-2 py-1 rounded">{link.platform}</span>
                {link.price && (
                  <span className="text-sm text-green-400">{link.price}</span>
                )}
              </div>
              <p className="text-sm text-gray-400 mb-2">{link.description}</p>
              <p className="text-xs text-gray-500">ID: {link.id}</p>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-white"
                title="Open link"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
              <button
                onClick={() => handleEdit(link)}
                className="p-2 text-gray-400 hover:text-white"
                title="Edit link"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(link.id)}
                className="p-2 text-gray-400 hover:text-red-400"
                title="Delete link"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {links.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 mb-4">No affiliate links created yet.</p>
          <button
            onClick={() => setIsCreating(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Create Your First Affiliate Link
          </button>
        </div>
      )}
    </div>
  );
}
