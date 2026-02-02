import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/lib/types';
import { formatDate } from '@/lib/utils';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="card group">
      {/* Cover Image */}
      <div className="relative aspect-[16/10] bg-sage-100 overflow-hidden">
        <Image
          src={post.coverImage || '/images/blog-placeholder.svg'}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 bg-sage-100 text-sage-600 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <time className="text-xs text-sage-500 font-medium">
          {formatDate(post.publishedAt)}
        </time>
        
        <h3 className="font-display text-lg text-sage-800 mt-1 mb-2 line-clamp-2 group-hover:text-sage-600 transition-colors">
          {post.title}
        </h3>
        
        <p className="text-sm text-sage-600 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Read more indicator */}
        <div className="mt-4 flex items-center gap-2 text-sm font-display text-terracotta-600 group-hover:text-terracotta-700 transition-colors">
          Read more
          <svg 
            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
