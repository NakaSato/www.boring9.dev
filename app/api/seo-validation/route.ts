import { validateBlogSEO, getReadabilityScore } from '@/lib/seo-validator';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const slug = searchParams.get('slug');
    
    // If a specific slug is provided, get readability score for that post
    if (slug) {
      const readabilityData = await getReadabilityScore(slug);
      return NextResponse.json({ 
        success: true, 
        data: readabilityData 
      });
    }
    
    // Otherwise, validate all blog posts
    const validation = await validateBlogSEO();
    
    return NextResponse.json({ 
      success: true, 
      data: validation 
    });
    
  } catch (error) {
    console.error('SEO validation error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to validate SEO' 
    }, { status: 500 });
  }
}
