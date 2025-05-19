import { NextResponse } from 'next/server';
import { getReadabilityScore } from '@/lib/seo-validator';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const data = await getReadabilityScore(slug);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in readability API:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An unknown error occurred' },
      { status: 500 }
    );
  }
}
