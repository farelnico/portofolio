import type { Category } from './portfolio';

/**
 * Klik pada layer 3D dan chip kategori di hero membuka /portfolio?category=...
 * Biarkan false selama project belum cukup; ubah ke true kalau sudah siap.
 */
export const heroLinksEnabled = false;

export type Motif = 'ui' | 'server' | 'chart' | 'network' | 'vision';

export interface Layer {
  category: Category; // harus salah satu kategori di data/portfolio.ts (dicek TypeScript)
  motif: Motif;
  blurb: string;
}

// Urutan dari atas ke bawah pada tumpukan 3D di hero, sekaligus urutan daftar di sebelahnya.
export const layers: Layer[] = [
  { category: 'Full-stack Development', motif: 'ui', blurb: 'Web apps from interface to database' },
  { category: 'Backend Engineering', motif: 'server', blurb: 'APIs and services' },
  { category: 'Data Science & Analytics', motif: 'chart', blurb: 'Analysis and insights' },
  { category: 'Machine Learning', motif: 'network', blurb: 'Models that learn from data' },
  { category: 'Computer Vision', motif: 'vision', blurb: 'Detection and image analysis' },
];
