'use client';

import { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, Info, Loader2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface SEOValidationError {
  type: string;
  message: string;
  page?: string;
  severity: 'error' | 'warning';
}

interface ValidationData {
  errors: SEOValidationError[];
  stats: {
    totalPosts: number;
    postsWithMissingMetadata: number;
    postsWithShortContent: number;
    postsWithoutTags: number;
    postsWithoutImages: number;
  };
}

const PANEL = 'bg-gray-800 rounded-lg p-6 shadow-md';

// Full-screen centered state (loading / error / empty).
function StatusScreen({
  icon: Icon,
  iconClass,
  title,
  subtitle,
  spin
}: {
  icon: LucideIcon;
  iconClass: string;
  title: string;
  subtitle: string;
  spin?: boolean;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Icon className={`w-8 h-8 mb-4 ${iconClass} ${spin ? 'animate-spin' : ''}`} />
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-gray-400 mt-2">{subtitle}</p>
    </div>
  );
}

// Top summary metric card.
function StatCard({
  label,
  value,
  valueClass
}: {
  label: string;
  value: React.ReactNode;
  valueClass: string;
}) {
  return (
    <div className={PANEL}>
      <h3 className="text-lg text-gray-400 mb-2">{label}</h3>
      <div className={`text-4xl font-bold ${valueClass}`}>{value}</div>
    </div>
  );
}

// Labeled percentage progress bar. `percent` is the raw (unrounded) value.
function HealthBar({ label, percent }: { label: string; percent: number }) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span>{label}</span>
        <span>{Math.round(percent)}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div
          className="bg-blue-500 rounded-full h-2"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
}

export default function SEODashboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ValidationData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/seo-validation');
        const result = await response.json();

        if (!result.success) {
          throw new Error(result.error || 'Failed to fetch SEO validation data');
        }

        setData(result.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <StatusScreen
        icon={Loader2}
        iconClass="text-blue-500"
        spin
        title="Analyzing SEO metrics..."
        subtitle="This may take a moment"
      />
    );
  }

  if (error) {
    return (
      <StatusScreen
        icon={AlertTriangle}
        iconClass="text-red-500"
        title="Failed to load SEO data"
        subtitle={error}
      />
    );
  }

  if (!data) {
    return (
      <StatusScreen
        icon={Info}
        iconClass="text-blue-500"
        title="No data available"
        subtitle="Please try again later"
      />
    );
  }

  // Calculate SEO health score (0-100)
  const totalIssues = data.errors.length;
  const criticalIssues = data.errors.filter((e) => e.severity === 'error').length;

  const seoScore = Math.max(
    0,
    Math.min(
      100,
      Math.round(100 - criticalIssues * 10 - (totalIssues - criticalIssues) * 2)
    )
  );

  // Determine score color
  let scoreColorClass = 'text-green-500';
  if (seoScore < 70) scoreColorClass = 'text-red-500';
  else if (seoScore < 90) scoreColorClass = 'text-yellow-500';

  const { stats } = data;
  const pct = (n: number) => 100 - (n / stats.totalPosts) * 100;

  const summaryCards = [
    { label: 'SEO Health Score', value: `${seoScore}%`, valueClass: scoreColorClass },
    { label: 'Total Blog Posts', value: stats.totalPosts, valueClass: 'text-white' },
    { label: 'Critical Issues', value: criticalIssues, valueClass: 'text-red-500' },
    {
      label: 'Warnings',
      value: totalIssues - criticalIssues,
      valueClass: 'text-yellow-500'
    }
  ];

  const contentIssues = [
    { label: 'Missing metadata', value: stats.postsWithMissingMetadata },
    { label: 'Short content', value: stats.postsWithShortContent },
    { label: 'Missing tags', value: stats.postsWithoutTags },
    { label: 'Missing images', value: stats.postsWithoutImages }
  ];

  const healthBars = [
    { label: 'Metadata Completion', percent: pct(stats.postsWithMissingMetadata) },
    { label: 'Content Quality', percent: pct(stats.postsWithShortContent) },
    { label: 'Media Usage', percent: pct(stats.postsWithoutImages) }
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8">SEO Dashboard</h1>

      {/* Summary stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {summaryCards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>

      {/* Detailed stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className={PANEL}>
          <h3 className="text-xl font-semibold mb-4">Content Issues</h3>
          <ul className="space-y-3">
            {contentIssues.map((issue) => (
              <li
                key={issue.label}
                className="flex items-center justify-between"
              >
                <span>{issue.label}</span>
                <span className="text-yellow-500">{issue.value}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={PANEL}>
          <h3 className="text-xl font-semibold mb-4">SEO Health</h3>
          <div className="space-y-4">
            {healthBars.map((bar) => (
              <HealthBar key={bar.label} {...bar} />
            ))}
          </div>
        </div>
      </div>

      {/* Issues list */}
      <div className={PANEL}>
        <h3 className="text-xl font-semibold mb-4">
          SEO Issues ({data.errors.length})
        </h3>

        <div className="space-y-2">
          <div className="flex gap-2 mb-4">
            <button
              className="px-3 py-1 rounded bg-gray-700 text-white text-sm hover:bg-gray-600"
              onClick={() =>
                setData({
                  ...data,
                  errors: [...data.errors].sort((a, b) =>
                    a.severity === 'error' && b.severity !== 'error'
                      ? -1
                      : a.severity !== 'error' && b.severity === 'error'
                        ? 1
                        : 0
                  )
                })
              }
            >
              Sort by Severity
            </button>
            <button
              className="px-3 py-1 rounded bg-gray-700 text-white text-sm hover:bg-gray-600"
              onClick={() =>
                setData({
                  ...data,
                  errors: [...data.errors].sort((a, b) =>
                    a.type.localeCompare(b.type)
                  )
                })
              }
            >
              Sort by Type
            </button>
          </div>

          {data.errors.length > 0 ? (
            <div className="space-y-3">
              {data.errors.map((err, idx) => {
                const isError = err.severity === 'error';
                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg flex items-start gap-3 ${
                      isError ? 'bg-red-900/30' : 'bg-yellow-900/30'
                    }`}
                  >
                    {isError ? (
                      <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <Info className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    )}

                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-sm font-medium uppercase ${
                            isError ? 'text-red-400' : 'text-yellow-400'
                          }`}
                        >
                          {err.type}
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm text-gray-400">
                          {isError ? 'Critical' : 'Warning'}
                        </span>
                      </div>
                      <p className="mt-1">{err.message}</p>
                      {err.page && (
                        <a
                          href={err.page}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 text-sm mt-1 inline-block"
                        >
                          View Post →
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center py-10 text-center">
              <div>
                <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-3" />
                <h4 className="text-xl font-medium mb-1">No SEO issues found!</h4>
                <p className="text-gray-400">
                  Your blog posts are well-optimized for search engines.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
