import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { projects } from '@/data/portfolio';
import PortfolioGrid from './PortfolioGrid';
import { Section, SectionHeading } from './Section';

export default function PortfolioPreview() {
  const featured = projects.filter((p) => p.featured).slice(0, 6);
  return (
    <Section id="portfolio">
      <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
        <SectionHeading title="Selected projects" intro="Projects spanning full-stack development, backend engineering, data science, machine learning, and computer vision." />
        <Link href="/portfolio" className="group inline-flex items-center gap-2 text-bone transition-colors hover:text-electric-soft">
          View all projects <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" aria-hidden />
        </Link>
      </div>
      <PortfolioGrid projects={featured} />
    </Section>
  );
}
