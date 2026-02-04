import Link from 'next/link';

const youtubeHandle = process.env.YOUTUBE_HANDLE_NAME || 'LazyGardenerinTexas';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-sage-800 text-cream-100">
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-terracotta-400 via-rose-400 to-sage-400" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sage-400 to-sage-600 flex items-center justify-center">
                <svg className="w-6 h-6 text-cream-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
              </div>
              <div>
                <h3 className="font-display text-lg text-cream-50">Lazy Gardener</h3>
                <p className="text-xs text-sage-400">in Texas</p>
              </div>
            </div>
            <p className="text-sm text-sage-300 leading-relaxed">
              Documenting my journey to create an English cottage garden in the challenging Texas climate. 
              Embracing experiments, failures, and the joy of growing things.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-cream-50 mb-4">Explore</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sage-300 hover:text-cream-50 transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/videos" className="text-sage-300 hover:text-cream-50 transition-colors text-sm">
                  Videos
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sage-300 hover:text-cream-50 transition-colors text-sm">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-display text-cream-50 mb-4">Connect</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href={`https://www.youtube.com/@${youtubeHandle}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sage-300 hover:text-cream-50 transition-colors text-sm flex items-center gap-2"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  YouTube
                </a>
              </li>
              {/* Add more social links as needed */}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-sage-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-sage-400">
            © {currentYear} Lazy Gardener in Texas. Made with 🌱 in Katy, TX.
          </p>
          <p className="text-xs text-sage-500">
            Growing slowly, failing cheerfully.
          </p>
        </div>
      </div>
    </footer>
  );
}
