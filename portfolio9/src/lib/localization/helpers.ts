export function getLocalizedPath(path: string, locale: string): string {
  // Strip any existing locale prefix
  let cleanPath = path;
  if (path.startsWith('/ru/') || path.startsWith('/en/')) {
    cleanPath = path.substring(3);
  } else if (path === '/ru' || path === '/en') {
    cleanPath = '/';
  }
  
  // Don't add prefix for default locale (English)
  if (locale === 'en') {
    return cleanPath;
  }
  
  // Add the locale prefix
  return `/${locale}${cleanPath === '/' ? '' : cleanPath}`;
} 