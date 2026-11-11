import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function Section({ id, children, className }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={cn('relative scroll-mt-16 px-6 py-24 lg:px-12 lg:py-36', className)}>
      <div className="mx-auto max-w-[1440px]">{children}</div>
    </section>
  );
}

export function SectionHeading({ title, intro, className }: { title: string; intro?: string; className?: string }) {
  return (
    <div className={cn('max-w-3xl', className)}>
      <h2 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">{title}</h2>
      {intro && <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-mist">{intro}</p>}
    </div>
  );
}
