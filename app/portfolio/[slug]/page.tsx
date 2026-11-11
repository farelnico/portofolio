import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Reveal from '@/components/Reveal';
import { getNextProject, getProject, projects } from '@/data/portfolio';

interface Props { params: { slug: string } }

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const project = getProject(params.slug);
  if (!project) return { title: 'Project not found' };
  return {
    title: project.title,
    description: project.summary,
    openGraph: { title: project.title, description: project.summary, images: [project.cover.src] },
  };
}

export default function ProjectPage({ params }: Props) {
  const project = getProject(params.slug);
  if (!project) notFound();
  const next = getNextProject(project.slug);

  return (
    <article className="px-6 pb-24 pt-32 lg:px-12 lg:pt-40">
      <div className="mx-auto max-w-[1440px]">
        <Link href="/portfolio" className="group inline-flex items-center gap-2 text-mist transition-colors hover:text-bone">
          <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" aria-hidden /> Back to portfolio
        </Link>

        <h1 className="mt-8 text-balance text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-8xl">{project.title}</h1>
        <dl className="mt-10 grid gap-6 border-y border-white/10 py-6 sm:grid-cols-3">
          <div><dt className="text-sm text-mist">Category</dt><dd className="mt-1">{project.category}</dd></div>
          <div><dt className="text-sm text-mist">Year</dt><dd className="mt-1">{project.year}</dd></div>
          <div><dt className="text-sm text-mist">Role</dt><dd className="mt-1">{project.role}</dd></div>
        </dl>

        <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-[2rem] border border-white/10 sm:aspect-[16/10]">
          <Image src={project.cover.src} alt={project.cover.alt} fill priority sizes="(min-width: 1440px) 1376px, 100vw" className="object-cover" />
        </div>

        <div className="mt-20 grid gap-14 lg:grid-cols-[7fr_4fr] lg:gap-24">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight">About this project</h2>
            <div className="mt-6 max-w-2xl space-y-4 text-lg leading-relaxed text-mist">
              {project.description.map((para) => <p key={para}>{para}</p>)}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl font-semibold tracking-tight">Tech stack</h2>
            <ul className="mt-6 flex flex-wrap gap-2">
              {project.tools.map((t) => <li key={t} className="glass rounded-full px-4 py-2 text-sm">{t}</li>)}
            </ul>
          </Reveal>
        </div>

        <section aria-labelledby="workflow" className="mt-24">
          <h2 id="workflow" className="text-3xl font-semibold tracking-tight">Development process</h2>
          <ol className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {project.workflow.map((step, i) => (
              <li key={step.title} className="bg-ink p-7">
                <span className="font-display text-sm text-electric-soft">Step {i + 1}</span>
                <h3 className="mt-3 text-xl font-semibold tracking-tight">{step.title}</h3>
                <p className="mt-3 text-mist">{step.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="gallery" className="mt-24">
          <h2 id="gallery" className="sr-only">Gallery</h2>
          <ul className="grid gap-6 md:grid-cols-2">
            {project.gallery.map((img, i) => (
              <li key={img.src} className={i === 0 ? 'md:col-span-2' : ''}>
                <Reveal className={`relative overflow-hidden rounded-3xl border border-white/10 ${i === 0 ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
                  <Image src={img.src} alt={img.alt} fill sizes={i === 0 ? '100vw' : '(min-width: 768px) 50vw, 100vw'} className="object-cover" />
                </Reveal>
              </li>
            ))}
          </ul>
        </section>

        <nav aria-label="Project navigation" className="mt-24 flex flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-10">
          <Link href="/portfolio" className="group inline-flex items-center gap-2 transition-colors hover:text-electric-soft">
            <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" aria-hidden /> Back to portfolio
          </Link>
          <Link href={`/portfolio/${next.slug}`} className="group inline-flex items-center gap-2 text-xl transition-colors hover:text-electric-soft">
            Next: {next.title} <ArrowUpRight size={20} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </nav>
      </div>
    </article>
  );
}
