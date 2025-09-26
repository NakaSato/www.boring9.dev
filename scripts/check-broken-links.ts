#!/usr/bin/env ts-node
/**
 * This script checks for broken links in all blog posts.
 * Run with: npx ts-node scripts/check-broken-links.ts
 */
import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import { Response } from 'node-fetch';
import { getLocalBlogPosts } from '@/lib/get-local-content';

// RegEx to find URLs in markdown content
const URL_REGEX = /\[(.*?)\]\((https?:\/\/[^\s)]+)\)/g;
const HTML_URL_REGEX = /<a\s+(?:[^>]*?\s+)?href="(https?:\/\/[^"]*)"[^>]*>/g;
const IMAGE_URL_REGEX = /!\[(.*?)\]\((https?:\/\/[^\s)]+)\)/g;
const HTML_IMAGE_REGEX = /<img\s+(?:[^>]*?\s+)?src="(https?:\/\/[^"]*)"[^>]*>/g;

// Domains we want to skip checking (e.g., local development URLs)
const SKIP_DOMAINS = ['localhost', '127.0.0.1', 'example.com'];

interface LinkCheckResult {
  post: string;
  url: string;
  text: string;
  status: number | string;
  type: 'link' | 'image';
}

async function checkUrl(url: string): Promise<number | string> {
  try {
    // Skip checking certain domains
    if (SKIP_DOMAINS.some((domain) => url.includes(domain))) {
      return 'skipped';
    }

    // Use AbortController for timeout since node-fetch v3 doesn't support timeout option
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    try {
      const response = await fetch(url, {
        method: 'HEAD',
        headers: {
          'User-Agent': 'Mozilla/5.0 Blog Link Checker'
        },
        redirect: 'follow',
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      return response.status;
    } catch (fetchError) {
      clearTimeout(timeoutId);
      throw fetchError;
    }
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return 'error: request timeout after 5 seconds';
    }
    return 'error: ' + (error instanceof Error ? error.message : String(error));
  }
}

async function extractAndCheckLinks(
  content: string,
  postSlug: string
): Promise<LinkCheckResult[]> {
  const results: LinkCheckResult[] = [];
  const links: { url: string; text: string; type: 'link' | 'image' }[] = [];

  // Extract markdown links
  let match;
  while ((match = URL_REGEX.exec(content)) !== null) {
    links.push({ url: match[2], text: match[1], type: 'link' });
  }

  // Extract HTML links
  while ((match = HTML_URL_REGEX.exec(content)) !== null) {
    links.push({ url: match[1], text: 'HTML Link', type: 'link' });
  }

  // Extract markdown images
  while ((match = IMAGE_URL_REGEX.exec(content)) !== null) {
    links.push({ url: match[2], text: match[1], type: 'image' });
  }

  // Extract HTML images
  while ((match = HTML_IMAGE_REGEX.exec(content)) !== null) {
    links.push({ url: match[1], text: 'HTML Image', type: 'image' });
  }

  // Check all extracted links
  for (const link of links) {
    const status = await checkUrl(link.url);
    results.push({
      post: postSlug,
      url: link.url,
      text: link.text,
      status,
      type: link.type
    });

    // Log as we go for visibility
    const statusStr = typeof status === 'number' ? status.toString() : status;

    const statusColor =
      statusStr === 'skipped'
        ? '\x1b[33m' // Yellow for skipped
        : statusStr.startsWith('error')
          ? '\x1b[31m' // Red for errors
          : statusStr.startsWith('2')
            ? '\x1b[32m' // Green for 2xx
            : statusStr.startsWith('3')
              ? '\x1b[36m' // Cyan for 3xx
              : '\x1b[31m'; // Red for 4xx/5xx

    console.log(
      `${statusColor}${statusStr}\x1b[0m - ${link.type === 'image' ? '(Image)' : '(Link)'} ${link.url.substring(0, 70)}${link.url.length > 70 ? '...' : ''} [${postSlug}]`
    );
  }

  return results;
}

async function main() {
  console.log('Checking for broken links in all blog posts...');

  const posts = await getLocalBlogPosts();
  const results: LinkCheckResult[] = [];

  let count = 0;
  for (const post of posts) {
    console.log(`\nChecking post (${++count}/${posts.length}): ${post.slug}`);
    const postResults = await extractAndCheckLinks(post.content, post.slug);
    results.push(...postResults);
  }

  // Count by status
  const statuses = results.reduce(
    (acc, result) => {
      const status =
        typeof result.status === 'number'
          ? result.status.toString()
          : result.status;
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  // Group results by post
  const resultsByPost = results.reduce(
    (acc, result) => {
      if (!acc[result.post]) {
        acc[result.post] = [];
      }
      acc[result.post].push(result);
      return acc;
    },
    {} as Record<string, LinkCheckResult[]>
  );

  // Print summary
  console.log('\n========== SUMMARY ==========');
  console.log(`Total links checked: ${results.length}`);

  // Status counts
  console.log('\nStatus codes:');
  for (const [status, count] of Object.entries(statuses)) {
    const statusColor =
      status === 'skipped'
        ? '\x1b[33m' // Yellow for skipped
        : status.startsWith('error')
          ? '\x1b[31m' // Red for errors
          : status.startsWith('2')
            ? '\x1b[32m' // Green for 2xx
            : status.startsWith('3')
              ? '\x1b[36m' // Cyan for 3xx
              : '\x1b[31m'; // Red for 4xx/5xx

    console.log(`  ${statusColor}${status}\x1b[0m: ${count}`);
  }

  // Broken links
  const brokenLinks = results.filter((r) =>
    typeof r.status === 'number'
      ? r.status >= 400
      : r.status.startsWith('error')
  );

  if (brokenLinks.length > 0) {
    console.log('\n========== BROKEN LINKS ==========');
    for (const link of brokenLinks) {
      console.log(`\x1b[31m${link.status}\x1b[0m - ${link.url}`);
      console.log(`  Post: ${link.post}`);
      console.log(
        `  Text: "${link.text.substring(0, 50)}${link.text.length > 50 ? '...' : ''}"`
      );
      console.log();
    }
  } else {
    console.log('\n\x1b[32mNo broken links found!\x1b[0m');
  }

  // Write report to file
  const report = {
    date: new Date().toISOString(),
    summary: {
      totalLinks: results.length,
      totalPosts: posts.length,
      statusCounts: statuses,
      brokenLinks: brokenLinks.length
    },
    results: resultsByPost
  };

  fs.writeFileSync(
    path.join(process.cwd(), 'link-check-report.json'),
    JSON.stringify(report, null, 2)
  );

  console.log('\nFull report saved to link-check-report.json');
}

main().catch((error) => {
  console.error('Error running link checker:', error);
  process.exit(1);
});
