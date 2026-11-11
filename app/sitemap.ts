import type { MetadataRoute } from 'next';
import { projects } from '@/data/portfolio';
import { site } from '@/data/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/about', '/portfolio', '/contact'].map((p) => ({ url: `${site.url}${p}` }));
  const works = projects.map((p) => ({ url: `${site.url}/portfolio/${p.slug}` }));
  return [...pages, ...works];
}
