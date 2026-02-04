import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getPublishedPosts, getPublishedPostBySlug, getPostBySlug } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';
import { formatDate } from '@/lib/utils';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// Revalidate every 60 seconds
export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt || undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      type: 'article',
      publishedTime: post.published_at,
    },
  };
}

// Simple markdown to HTML conversion
function markdownToHtml(content: string): string {
  let html = content;

  // Code blocks (must be done before inline code)
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
    return `<pre class="bg-sage-800 text-cream-100 p-4 rounded-xl overflow-x-auto my-4"><code class="language-${lang}">${code.trim()}</code></pre>`;
  });

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code class="bg-sage-100 text-sage-700 px-1.5 py-0.5 rounded text-sm">$1</code>');

  // Headers
  html = html.replace(/^### (.+)$/gm, '<h3 class="font-display text-xl text-sage-800 mt-8 mb-4">$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2 class="font-display text-2xl text-sage-800 mt-10 mb-4">$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1 class="font-display text-3xl text-sage-800 mt-10 mb-6">$1</h1>');

  // Images
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="rounded-xl my-6 w-full" />');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-terracotta-600 hover:text-terracotta-700 underline underline-offset-2">$1</a>');

  // Bold
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-sage-700 font-semibold">$1</strong>');

  // Italic
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');

  // Unordered lists
  html = html.replace(/^- (.+)$/gm, '<li class="ml-4">$1</li>');
  html = html.replace(/(<li.*<\/li>\n?)+/g, '<ul class="list-disc list-outside mb-4 space-y-1 pl-4">$&</ul>');

  // Ordered lists
  html = html.replace(/^\d+\. (.+)$/gm, '<li class="ml-4">$1</li>');

  // Blockquotes
  html = html.replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-sage-300 pl-4 italic text-sage-600 my-4">$1</blockquote>');

  // Horizontal rules
  html = html.replace(/^---$/gm, '<hr class="my-8 border-sage-200" />');

  // Paragraphs - wrap text blocks
  const lines = html.split('\n');
  const processed: string[] = [];
  let inParagraph = false;

  for (const line of lines) {
    const trimmed = line.trim();
    
    // Skip if it's already an HTML element or empty
    if (trimmed === '' || 
        trimmed.startsWith('<h') || 
        trimmed.startsWith('<ul') || 
        trimmed.startsWith('<ol') || 
        trimmed.startsWith('<li') || 
        trimmed.startsWith('<pre') || 
        trimmed.startsWith('<blockquote') ||
        trimmed.startsWith('<hr') ||
        trimmed.startsWith('<img') ||
        trimmed.startsWith('</')) {
      if (inParagraph) {
        processed.push('</p>');
        inParagraph = false;
      }
      processed.push(line);
    } else {
      if (!inParagraph) {
        processed.push('<p class="mb-4 leading-relaxed text-sage-700">');
        inParagraph = true;
      }
      processed.push(line);
    }
  }

  if (inParagraph) {
    processed.push('</p>');
  }

  return processed.join('\n');
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const isAdmin = await isAuthenticated();
  
  // If admin, get any post (including drafts). Otherwise, only published posts.
  const post = isAdmin 
    ? await getPostBySlug(slug)
    : await getPublishedPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const isDraft = post.status === 'draft';
  const tags = post.tags ? JSON.parse(post.tags) : [];
  const contentHtml = markdownToHtml(post.content);

  return (
    <article>
      {/* Draft Preview Banner */}
      {isDraft && isAdmin && (
        <div className="bg-amber-100 border-b border-amber-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-800">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span className="font-medium">Draft Preview</span>
                <span className="text-sm">— This post is not visible to the public</span>
              </div>
              <Link
                href={`/admin/posts/${slug}`}
                className="text-sm font-medium text-amber-800 hover:text-amber-900 underline underline-offset-2"
              >
                Edit Post
              </Link>
            </div>
          </div>
        </div>
      )}

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
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-white/60 backdrop-blur-sm border border-sage-200 rounded-full text-sm text-sage-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-sage-800 leading-tight mb-4">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-4 text-sage-600">
            <time>{formatDate(post.published_at)}</time>
          </div>
        </div>
      </header>

      {/* Cover Image */}
      {post.cover_image && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4">
          <div className="relative aspect-[21/9] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={post.cover_image}
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
          dangerouslySetInnerHTML={{ __html: contentHtml }}
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
            href={`https://www.youtube.com/@${process.env.NEXT_PUBLIC_YOUTUBE_HANDLE || 'LazyGardenerinTexas'}`}
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
