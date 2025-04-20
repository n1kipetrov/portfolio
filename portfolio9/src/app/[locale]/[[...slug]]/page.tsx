import { notFound, redirect } from 'next/navigation';
import HomePage from '@/app/page';

// We only have these locales
const validLocales = ['en', 'ru'];

export default function LocalizedPage({ params }: { params: { locale: string, slug?: string[] } }) {
  // Validate locale
  const locale = params.locale;
  if (!validLocales.includes(locale)) {
    notFound();
  }
  
  // For English (default locale), we redirect to non-localized URL
  if (locale === 'en') {
    const path = params.slug ? `/${params.slug.join('/')}` : '/';
    redirect(path);
  }
  
  // For the home page with locale prefix
  if (!params.slug || params.slug.length === 0) {
    return <HomePage />;
  }
  
  // Handle specific routes
  const path = params.slug.join('/');
  
  // For now, reuse the Homepage component for all routes
  // In a real app, you'd import and use specific page components here
  return <HomePage />;
} 