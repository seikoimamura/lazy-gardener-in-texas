import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { blogPosts, getBlogPostBySlug } from '@/lib/data';
import { formatDate } from '@/lib/utils';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Simple markdown-ish to HTML conversion
  const contentHtml = post.content
    .split('\n')
    .map((line) => {
      // Headers
      if (line.startsWith('### ')) {
        return `<h3 class="font-display text-xl text-sage-800 mt-8 mb-4">${line.slice(4)}</h3>`;
      }
      if (line.startsWith('## ')) {
        return `<h2 class="font-display text-2xl text-sage-800 mt-10 mb-4">${line.slice(3)}</h2>`;
      }
      if (line.startsWith('# ')) {
        return `<h1 class="font-display text-3xl text-sage-800 mt-10 mb-6">${line.slice(2)}</h1>`;
      }
      // Lists
      if (line.startsWith('- **')) {
        const match = line.match(/^- \*\*(.+?)\*\*(.*)$/);
        if (match) {
          return `<li class="mb-2"><strong class="text-sage-700">${match[1]}</strong>${match[2]}</li>`;
        }
      }
      if (line.startsWith('- ')) {
        return `<li class="mb-2">${line.slice(2)}</li>`;
      }
      if (/^\d+\. /.test(line)) {
        return `<li class="mb-2">${line.replace(/^\d+\. /, '')}</li>`;
      }
      // Bold and italic
      let processed = line.replace(/\*\*(.+?)\*\*/g, '<strong class="text-sage-700">$1</strong>');
      processed = processed.replace(/\*(.+?)\*/g, '<em>$1</em>');
      // Empty line = paragraph break
      if (line.trim() === '') {
        return '</p><p class="mb-4 leading-relaxed text-sage-700">';
      }
      return processed;
    })
    .join('\n');

  return (
    <article>
      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-to-br from-sage-100/50 via-cream-50 to-rose-50/30">
        <div className="absolute top-10 right-10 w-64 h-64 bg-rose-200/20 rounded-full blur-3xl" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Back link */}
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-sage-600 hover:text-sage-800 transition-colors mb-6"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Back to Blog
          </Link>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-white/60 backdrop-blur-sm border border-sage-200 rounded-full text-sm text-sage-600"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-sage-800 leading-tight mb-4">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-4 text-sage-600">
            <time>{formatDate(post.publishedAt)}</time>
          </div>
        </div>
      </header>

      {/* Cover Image */}
      {post.coverImage && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4">
          <div className="relative aspect-[21/9] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div 
          className="prose prose-sage max-w-none"
          dangerouslySetInnerHTML={{ 
            __html: `<p class="mb-4 leading-relaxed text-sage-700">${contentHtml}</p>`
              .replace(/<p[^>]*><\/p>/g, '') // Remove empty paragraphs
              .replace(/<li/g, '<ul class="list-disc list-inside mb-4 space-y-1"><li')
              .replace(/<\/li>(?![\s\S]*<li)/g, '</li></ul>') // Close ul after last li
          }}
        />
      </div>

      {/* Footer navigation */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="section-divider mb-8" />
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link 
            href="/blog" 
            className="btn-secondary"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            More Posts
          </Link>
          
          <a
            href="https://www.youtube.com/@LazyGardenerinTexas"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            Watch Videos
          </a>
        </div>
      </div>
    </article>
  );
}
