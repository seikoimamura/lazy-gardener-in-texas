import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import { isAuthenticated } from '@/lib/auth';
import { getPostBySlug } from '@/lib/db';
import PostEditor from '@/components/PostEditor';

interface EditPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  if (!(await isAuthenticated())) {
    redirect('/admin');
  }

  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const initialData = {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt || '',
    content: post.content,
    cover_image: post.cover_image,
    tags: post.tags ? JSON.parse(post.tags) : [],
    status: post.status || 'draft' as 'draft' | 'published',
    published_at: post.published_at.split('T')[0],
  };

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <header className="bg-white border-b border-sage-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/posts" className="text-sage-500 hover:text-sage-700 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
              <h1 className="font-display text-xl text-sage-800">Edit Post</h1>
              <span className={`ml-2 inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full ${
                post.status === 'published' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-amber-100 text-amber-700'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${
                  post.status === 'published' ? 'bg-green-500' : 'bg-amber-500'
                }`} />
                {post.status === 'published' ? 'Published' : 'Draft'}
              </span>
            </div>
            
            {/* Preview Button */}
            <Link
              href={`/blog/${post.slug}`}
              target="_blank"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm text-sage-600 hover:text-sage-800 hover:bg-sage-100 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Preview
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-sage-100 p-6 sm:p-8">
          <PostEditor initialData={initialData} isEditing />
        </div>
      </main>
    </div>
  );
}
