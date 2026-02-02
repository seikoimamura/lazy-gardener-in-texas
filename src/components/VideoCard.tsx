import Image from 'next/image';
import { Video } from '@/lib/types';
import { formatDate, getYouTubeThumbnail, getYouTubeWatchUrl } from '@/lib/utils';

interface VideoCardProps {
  video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
  const thumbnailUrl = video.youtubeId.startsWith('YOUR_')
    ? '/images/video-placeholder.svg'
    : getYouTubeThumbnail(video.youtubeId);

  return (
    <a
      href={getYouTubeWatchUrl(video.youtubeId)}
      target="_blank"
      rel="noopener noreferrer"
      className="card group"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-sage-100 overflow-hidden">
        <Image
          src={thumbnailUrl}
          alt={video.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-16 h-16 rounded-full bg-terracotta-500/90 flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform duration-300">
            <svg className="w-8 h-8 text-cream-50 ml-1" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        {/* YouTube badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
          <svg className="w-4 h-4 text-red-600" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          <span className="text-xs font-medium text-sage-700">YouTube</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <time className="text-xs text-sage-500 font-medium">
          {formatDate(video.publishedAt)}
        </time>
        <h3 className="font-display text-lg text-sage-800 mt-1 mb-2 line-clamp-2 group-hover:text-sage-600 transition-colors">
          {video.title}
        </h3>
        <p className="text-sm text-sage-600 line-clamp-2">
          {video.description}
        </p>
      </div>
    </a>
  );
}
