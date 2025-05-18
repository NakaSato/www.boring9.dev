import { getReadabilityScore } from '@/lib/seo-validator';
import { ReadabilityClient } from './client';

interface ReadabilityData {
  score: number;
  readingLevel: string;
  suggestions: string[];
}

export default async function ReadabilityPage({ params }: { params: { slug: string } }) {
  let data: ReadabilityData | null = null;
  let error: string | null = null;
  
  try {
    data = await getReadabilityScore(params.slug);
  } catch (err) {
    error = err instanceof Error ? err.message : 'An unknown error occurred';
    console.error('Error fetching readability data:', err);
  }
  
  return <ReadabilityClient slug={params.slug} initialData={data} initialError={error} />;
}
