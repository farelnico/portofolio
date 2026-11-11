import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/data/portfolio';
import { cn } from '@/lib/utils';

export default function PortfolioCard({ project, aspect, priority = false }: { project: Project; aspect: string; priority?: boolean }) {
  return (
    <Link href={`/portfolio/${project.slug}`} data-cursor="view" className="group block">
      <div className={cn('relative overflow-hidden rounded-3xl border border-white/10 transition-shadow duration-500 group-hover:shadow-[0_0_0_1px_rgba(90,92,255,0.55),0_30px_80px_-30px_rgba(90,92,255,0.55)] group-focus-visible:shadow-[0_0_0_2px_#8f90ff]', aspect)}>
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <span aria-hidden className="absolute right-4 top-4 grid h-11 w-11 translate-y-2 place-items-center rounded-full bg-bone text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight size={18} />
        </span>
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{project.title}</h3>
        <p className="shrink-0 text-sm text-mist">{project.category}, {project.year}</p>
      </div>
      <p className="mt-2 line-clamp-2 max-w-lg text-mist">{project.summary}</p>
    </Link>
  );
}
