import Link from 'next/link';
import VideoCard from '@/components/VideoCard';
import BlogCard from '@/components/BlogCard';
import { getRecentVideos } from '@/lib/data';
import { getRecentPosts } from '@/lib/db';

const youtubeHandle = process.env.YOUTUBE_HANDLE_NAME || 'LazyGardenerinTexas';

// Revalidate every 60 seconds
export const revalidate = 60;

export default async function Home() {
  const recentVideos = await getRecentVideos(3);
  const dbPosts = await getRecentPosts(3);

  // Transform DB posts to match BlogCard expected format
  const recentPosts = dbPosts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt || '',
    content: post.content,
    publishedAt: post.published_at,
    coverImage: post.cover_image || '/images/blog-placeholder.svg',
    tags: post.tags ? JSON.parse(post.tags) : [],
  }));

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-sage-100/50 via-transparent to-rose-100/30" />
        <div className="absolute top-20 right-10 w-64 h-64 bg-terracotta-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-sage-200/40 rounded-full blur-3xl" />
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-sage-200 mb-6 animate-fade-in">
              <span className="w-2 h-2 bg-terracotta-400 rounded-full animate-pulse" />
              <span className="text-sm text-sage-600">Gardening in Zone 9a</span>
            </div>

            {/* Main heading */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-sage-800 leading-tight mb-6 animate-slide-up">
              Growing an{' '}
              <span className="relative inline-block">
                <span className="relative z-10">English cottage garden</span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-rose-200/60 -rotate-1" />
              </span>{' '}
              in Texas
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-sage-600 mb-8 leading-relaxed animate-slide-up animate-delay-100">
              I&apos;m documenting my journey to create a cottage garden in my small suburban yard, 
              despite the heat, humidity, and clay soil. Join me as I experiment, fail cheerfully, 
              and occasionally succeed.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 animate-slide-up animate-delay-200">
              <a
                href={`https://www.youtube.com/@${youtubeHandle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                Watch on YouTube
              </a>
              <Link href="/blog" className="btn-secondary">
                Read the Blog
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Divider with botanical motif */}
      <div className="flex items-center justify-center gap-4 py-8">
        <div className="w-16 h-px bg-sage-200" />
        <svg className="w-6 h-6 text-sage-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
        <div className="w-16 h-px bg-sage-200" />
      </div>

      {/* Recent Videos Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl text-sage-800 mb-2">Latest Videos</h2>
            <p className="text-sage-600">Watch my gardening experiments unfold</p>
          </div>
          <Link href="/videos" className="hidden sm:flex items-center gap-2 text-terracotta-600 hover:text-terracotta-700 font-display transition-colors">
            View all
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {recentVideos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentVideos.map((video, index) => (
              <div 
                key={video.id} 
                className="animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <VideoCard video={video} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-sage-50/50 rounded-2xl">
            <p className="text-sage-600">Videos coming soon! Subscribe on YouTube to be notified.</p>
          </div>
        )}

        <Link href="/videos" className="sm:hidden flex items-center justify-center gap-2 mt-6 text-terracotta-600 font-display">
          View all videos
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </section>

      {/* Recent Blog Posts Section */}
      <section className="bg-sage-50/50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl text-sage-800 mb-2">From the Blog</h2>
              <p className="text-sage-600">Longer thoughts, plant guides, and garden wisdom</p>
            </div>
            <Link href="/blog" className="hidden sm:flex items-center gap-2 text-terracotta-600 hover:text-terracotta-700 font-display transition-colors">
              View all
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {recentPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPosts.map((post, index) => (
                <div 
                  key={post.slug} 
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <BlogCard post={post} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white/50 rounded-2xl">
              <p className="text-sage-600">Blog posts coming soon!</p>
            </div>
          )}

          <Link href="/blog" className="sm:hidden flex items-center justify-center gap-2 mt-6 text-terracotta-600 font-display">
            View all posts
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Newsletter / About Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative bg-gradient-to-br from-sage-700 to-sage-800 rounded-3xl p-8 sm:p-12 overflow-hidden">
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-sage-600/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-terracotta-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative max-w-2xl mx-auto text-center">
            <h2 className="font-display text-2xl sm:text-3xl text-cream-50 mb-4">
              About the Lazy Gardener
            </h2>
            <p className="text-sage-200 leading-relaxed mb-6">
              I&apos;m a hobbyist gardener in Katy, Texas, attempting to grow an English cottage garden 
              complete with Old Garden Roses in our challenging hot, humid climate. I call myself 
              &ldquo;lazy&rdquo; because I refuse to fight nature—if a plant struggles, I replace it 
              with one that wants to be here. This channel documents my experiments, failures, and 
              occasional triumphs.
            </p>
            <a
              href={`https://www.youtube.com/@${youtubeHandle}?sub_confirmation=1`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-terracotta-500 text-cream-50 font-display rounded-full hover:bg-terracotta-600 transition-colors shadow-lg"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              Subscribe to Join the Journey
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
