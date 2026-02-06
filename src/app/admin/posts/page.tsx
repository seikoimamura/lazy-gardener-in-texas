import { redirect } from 'next/navigation';
import Link from 'next/link';
import { auth, signOut, isAdmin } from '@/lib/auth';
import { getAllPosts } from '@/lib/db';
import { formatDate } from '@/lib/utils';

export default async function AdminPostsPage() {
  const session = await auth();

  if (!session?.user || !(await isAdmin())) {
    redirect('/admin');
  }

  const posts = await getAllPosts();

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <header className="bg-white border-b border-sage-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-sage-500 hover:text-sage-700 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
              <h1 className="font-display text-xl text-sage-800">Blog Admin</h1>
            </div>
              <form
                action={async () => {
                  'use server';
                  await signOut({ redirectTo: '/admin' });
                }}
              >
                <button
                  type="submit"
                  className="text-sm text-sage-500 hover:text-sage-700 transition-colors"
                >
                  Sign out
                </button>
              </form>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-2xl text-sage-800">Posts</h2>
          <Link href="/admin/posts/new" className="btn-primary">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Post
          </Link>
        </div>

        {posts.length > 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-sage-100 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-sage-100 bg-sage-50/50">
                  <th className="text-left px-6 py-4 font-display text-sm text-sage-600">Title</th>
                  <th className="text-left px-6 py-4 font-display text-sm text-sage-600 hidden sm:table-cell">Status</th>
                  <th className="text-left px-6 py-4 font-display text-sm text-sage-600 hidden md:table-cell">Date</th>
                  <th className="text-left px-6 py-4 font-display text-sm text-sage-600 hidden lg:table-cell">Tags</th>
                  <th className="text-right px-6 py-4 font-display text-sm text-sage-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} className="border-b border-sage-50 last:border-0 hover:bg-sage-50/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sage-800">
                          {post.title}
                        </span>
                        {/* Mobile status badge */}
                        <span className={`sm:hidden inline-flex px-2 py-0.5 text-xs rounded-full ${
                          post.status === 'published' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-amber-100 text-amber-700'
                        }`}>
                          {post.status === 'published' ? 'Live' : 'Draft'}
                        </span>
                      </div>
                      <p className="text-sm text-sage-500 md:hidden mt-1">
                        {formatDate(post.published_at)}
                      </p>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full ${
                        post.status === 'published' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          post.status === 'published' ? 'bg-green-500' : 'bg-amber-500'
                        }`} />
                        {post.status === 'published' ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-sage-600 hidden md:table-cell">
                      {formatDate(post.published_at)}
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {post.tags && JSON.parse(post.tags).map((tag: string) => (
                          <span key={tag} className="text-xs px-2 py-1 bg-sage-100 text-sage-600 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-1 text-sm text-sage-500 hover:text-sage-700 transition-colors"
                          title="Preview"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          <span className="hidden sm:inline">Preview</span>
                        </Link>
                        <Link
                          href={`/admin/posts/${post.slug}`}
                          className="inline-flex items-center gap-1 text-sm text-terracotta-600 hover:text-terracotta-700 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          <span className="hidden sm:inline">Edit</span>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-sage-100 p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-sage-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-sage-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h3 className="font-display text-xl text-sage-700 mb-2">No posts yet</h3>
            <p className="text-sage-500 mb-6">Create your first blog post to get started.</p>
            <Link href="/admin/posts/new" className="btn-primary">
              Create First Post
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
