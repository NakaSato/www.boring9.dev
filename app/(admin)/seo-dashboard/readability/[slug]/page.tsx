import { getReadabilityScore } from '@/lib/seo-validator';
import { ReadabilityClient } from './client';

interface ReadabilityData {
  score: number;
  readingLevel: string;
  suggestions: string[];
}

export default async function ReadabilityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  let data: ReadabilityData | null = null;
  let error: string | null = null;
  
  // Await the params object before accessing its properties
  const { slug } = await params;
  
  try {
    data = await getReadabilityScore(slug);
  } catch (err) {
    error = err instanceof Error ? err.message : 'An unknown error occurred';
    console.error('Error fetching readability data:', err);
  }
  
  return <ReadabilityClient slug={slug} initialData={data} initialError={error} />;
}
