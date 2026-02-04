import { redirect } from 'next/navigation';
import { isAuthenticated, verifyPassword, createSession } from '@/lib/auth';
import { initializeDatabase } from '@/lib/db';

export default async function AdminPage() {
  // Initialize database on first visit
  await initializeDatabase();
  
  // If already logged in, redirect to posts
  if (await isAuthenticated()) {
    redirect('/admin/posts');
  }

  async function login(formData: FormData) {
    'use server';
    
    const password = formData.get('password') as string;
    
    if (await verifyPassword(password)) {
      await createSession();
      redirect('/admin/posts');
    } else {
      redirect('/admin?error=invalid');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-50 px-4">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl shadow-lg border border-sage-100 p-8">
          <div className="text-center mb-8">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-sage-400 to-sage-600 flex items-center justify-center">
              <svg className="w-6 h-6 text-cream-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="font-display text-2xl text-sage-800">Admin Login</h1>
            <p className="text-sage-500 text-sm mt-1">Enter your password to continue</p>
          </div>

          <form action={login}>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-sage-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:border-sage-400 focus:ring-2 focus:ring-sage-200 outline-none transition-all"
                placeholder="Enter admin password"
              />
            </div>

            <button
              type="submit"
              className="w-full btn-primary justify-center"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
