import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://srtconstructions.in';

  const staticRoutes = [
    '',
    '/about',
    '/services',
    '/portfolio',
    '/materials',
    '/contact',
    '/faq',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return staticRoutes;
}
