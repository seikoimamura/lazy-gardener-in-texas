import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { createPost, getAllPosts } from '@/lib/db';

export async function GET() {
  try {
    const posts = await getAllPosts();
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();
    
    if (!data.title || !data.slug || !data.content || !data.published_at) {
      return NextResponse.json(
        { error: 'Missing required fields: title, slug, content, published_at' },
        { status: 400 }
      );
    }

    const post = await createPost({
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      cover_image: data.cover_image,
      tags: data.tags,
      status: data.status || 'draft',
      published_at: data.published_at,
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error: any) {
    console.error('Error creating post:', error);
    
    if (error.message?.includes('UNIQUE constraint failed')) {
      return NextResponse.json(
        { error: 'A post with this slug already exists' },
        { status: 400 }
      );
    }
    
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
