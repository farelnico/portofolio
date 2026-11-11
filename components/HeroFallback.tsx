import { cn } from '@/lib/utils';
import { layers } from '@/data/layers';

/** Tampilan pengganti saat WebGL tidak tersedia, gagal dimuat, atau sedang loading: tumpukan layer dari CSS. */
export default function HeroFallback({ pulse = false }: { pulse?: boolean }) {
  return (
    <div className="grid h-full w-full place-items-center" style={{ perspective: 1200 }} aria-hidden>
      <div
        className={cn('relative aspect-[3/2] h-[min(46%,15rem)]', pulse && 'animate-pulse')}
        style={{ transform: 'rotateX(58deg) rotateZ(-32deg)', transformStyle: 'preserve-3d' }}
      >
        {layers.map((l, i) => (
          <span
            key={l.category}
            className="absolute inset-0 rounded-2xl border border-electric/50 bg-electric/[0.06]"
            style={{ transform: `translateZ(${(layers.length - 1 - i) * 34}px)` }}
          />
        ))}
      </div>
    </div>
  );
}
