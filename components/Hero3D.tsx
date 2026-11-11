'use client';

import { useInView, useReducedMotion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { heroLinksEnabled, layers } from '@/data/layers';
import { cn } from '@/lib/utils';
import { hasWebGL } from '@/lib/webgl';
import HeroFallback from './HeroFallback';
import SceneBoundary from './SceneBoundary';

// Konten 3D di-lazy-load dan tidak dirender di server.
const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false, loading: () => <HeroFallback pulse /> });

const hrefFor = (category: string) => `/portfolio?category=${encodeURIComponent(category)}`;

export default function Hero3D() {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '100px' });
  const reduce = useReducedMotion();
  const [supported, setSupported] = useState<boolean | null>(null);
  const [hovered, setHovered] = useState(-1);

  useEffect(() => { setSupported(hasWebGL()); }, []);

  const Wrapper = heroLinksEnabled ? 'nav' : 'div';
  const onSelect = useCallback((i: number) => router.push(hrefFor(layers[i].category)), [router]);

  return (
    <div className="relative flex h-full w-full flex-col">
      <div
        ref={ref}
        role="img"
        aria-label={`Interactive 3D stack of five layers, one for each area of my work. Drag to rotate.${heroLinksEnabled ? ' Click a layer to see its projects.' : ''}`}
        className="min-h-0 flex-1 cursor-grab active:cursor-grabbing"
      >
        {supported === null && <HeroFallback pulse />}
        {supported === false && <HeroFallback />}
        {supported && (
          <SceneBoundary fallback={<HeroFallback />}>
            <HeroScene running={inView} autoRotate={!reduce} hovered={hovered} onHover={setHovered} onSelect={heroLinksEnabled ? onSelect : undefined} />
          </SceneBoundary>
        )}
      </div>

      {/* Daftar area yang sama dalam HTML. Jadi link jika heroLinksEnabled = true, selain itu hanya label. */}
      <Wrapper aria-label={heroLinksEnabled ? 'Browse projects by area' : 'Areas I work in'} className="relative z-10 shrink-0 px-4 pt-4">
        <ul className="flex flex-wrap justify-center gap-2">
          {layers.map((layer, i) => {
            const cls = cn('glass block rounded-full px-4 py-2 text-sm transition-colors duration-300', hovered === i ? 'border-electric/70 bg-electric/15 text-bone' : 'text-mist', heroLinksEnabled && hovered !== i && 'hover:bg-white/10 hover:text-bone');
            return (
              <li key={layer.category}>
                {heroLinksEnabled ? (
                  <Link
                    href={hrefFor(layer.category)}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(-1)}
                    onFocus={() => setHovered(i)}
                    onBlur={() => setHovered(-1)}
                    title={layer.blurb}
                    className={cls}
                  >
                    {layer.category}
                  </Link>
                ) : (
                  <span onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(-1)} title={layer.blurb} className={cls}>
                    {layer.category}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </Wrapper>
    </div>
  );
}
