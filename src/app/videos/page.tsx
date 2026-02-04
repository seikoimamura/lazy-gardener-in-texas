import { Metadata } from 'next';
import VideoCard from '@/components/VideoCard';
import { getYouTubeVideos } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Videos',
  description: 'Watch gardening videos from Lazy Gardener in Texas - cottage gardening, rose care, and more.',
};

const youtubeHandle = process.env.YOUTUBE_HANDLE_NAME || 'LazyGardenerinTexas';

export default async function VideosPage() {
  const videos = await getYouTubeVideos();

  return (
    <>
      {/* Page Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sage-100/50 via-cream-50 to-rose-50/30">
        <div className="absolute top-10 right-20 w-48 h-48 bg-terracotta-200/30 rounded-full blur-3xl" />
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="max-w-2xl">
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-sage-800 mb-4">
              Videos
            </h1>
            <p className="text-lg text-sage-600 leading-relaxed">
              Watch my gardening journey unfold—from planting experiments to seasonal updates. 
              All my videos are also available on{' '}
              <a 
                href={`https://www.youtube.com/@${youtubeHandle}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-terracotta-600 hover:text-terracotta-700 underline underline-offset-2"
              >
                YouTube
              </a>.
            </p>
          </div>
        </div>
      </section>

      {/* Videos Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {videos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video, index) => (
              <div 
                key={video.id}
                className="animate-slide-up opacity-0"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'forwards'
                }}
              >
                <VideoCard video={video} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-sage-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-sage-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-display text-xl text-sage-700 mb-2">No videos yet</h3>
            <p className="text-sage-500">Check back soon for new content!</p>
          </div>
        )}
      </section>

      {/* Subscribe CTA */}
      <section className="bg-sage-50/50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-2xl text-sage-800 mb-4">
            Don&apos;t miss a video
          </h2>
          <p className="text-sage-600 mb-6 max-w-xl mx-auto">
            Subscribe on YouTube to get notified when I post new gardening content.
          </p>
          <a
            href={`https://www.youtube.com/@${youtubeHandle}?sub_confirmation=1`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            Subscribe on YouTube
          </a>
        </div>
      </section>
    </>
  );
}
