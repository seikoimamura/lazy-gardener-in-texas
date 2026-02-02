import { Metadata } from 'next';
import BlogCard from '@/components/BlogCard';
import { blogPosts } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read gardening articles, plant guides, and garden journal entries from Lazy Gardener in Texas.',
};

export default function BlogPage() {
  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  // Get all unique tags
  const allTags = Array.from(new Set(blogPosts.flatMap((post) => post.tags)));

  return (
    <>
      {/* Page Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-rose-50/50 via-cream-50 to-sage-50/30">
        <div className="absolute bottom-10 left-20 w-48 h-48 bg-sage-200/30 rounded-full blur-3xl" />
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="max-w-2xl">
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-sage-800 mb-4">
              Blog
            </h1>
            <p className="text-lg text-sage-600 leading-relaxed">
              Longer thoughts on gardening, plant recommendations, experiments in progress, 
              and lessons learned (often the hard way).
            </p>
          </div>

          {/* Tags */}
          {allTags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 bg-white/60 backdrop-blur-sm border border-sage-200 rounded-full text-sm text-sage-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Blog Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {sortedPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedPosts.map((post, index) => (
              <div 
                key={post.slug}
                className="animate-slide-up opacity-0"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'forwards'
                }}
              >
                <BlogCard post={post} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-sage-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-sage-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h3 className="font-display text-xl text-sage-700 mb-2">No blog posts yet</h3>
            <p className="text-sage-500">Check back soon for new articles!</p>
          </div>
        )}
      </section>
    </>
  );
}
