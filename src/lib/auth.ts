import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

// List of allowed admin email addresses
const ALLOWED_ADMINS = (process.env.ALLOWED_ADMIN_EMAILS || '').split(',').map(email => email.trim().toLowerCase());

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Only allow specific email addresses to sign in
      if (user.email && ALLOWED_ADMINS.includes(user.email.toLowerCase())) {
        return true;
      }
      return false;
    },
    async session({ session, token }) {
      // Add user info to session
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  pages: {
    signIn: '/admin',
    error: '/admin',
  },
});

// Helper function to check if user is authenticated admin
export async function isAdmin(): Promise<boolean> {
  const session = await auth();
  return !!session?.user?.email && ALLOWED_ADMINS.includes(session.user.email.toLowerCase());
}
