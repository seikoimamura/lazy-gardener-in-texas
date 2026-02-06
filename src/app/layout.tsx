import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'Lazy Gardener in Texas',
    template: '%s | Lazy Gardener in Texas',
  },
  description: 'Documenting my journey to create an English cottage garden in Texas. Embracing experiments, failures, and the joy of growing things.',
  keywords: ['gardening', 'Texas', 'cottage garden', 'roses', 'lazy gardening', 'Katy Texas'],
  authors: [{ name: 'Lazy Gardener in Texas' }],
  creator: 'Lazy Gardener in Texas',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Lazy Gardener in Texas',
    title: 'Lazy Gardener in Texas',
    description: 'Documenting my journey to create an English cottage garden in Texas.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lazy Gardener in Texas',
    description: 'Documenting my journey to create an English cottage garden in Texas.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
