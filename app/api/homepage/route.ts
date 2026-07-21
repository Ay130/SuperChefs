import { NextRequest, NextResponse } from 'next/server';
import { getHomepageContent, updateHomepageContent } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const content = await getHomepageContent();
    return NextResponse.json(content);
  } catch (error) {
    console.error('Error fetching homepage content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch homepage content' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const content = await updateHomepageContent(body);
    return NextResponse.json(content);
  } catch (error) {
    console.error('Error updating homepage content:', error);
    return NextResponse.json(
      { error: 'Failed to update homepage content' },
      { status: 500 }
    );
  }
}
