import type { Metadata } from 'next';
import PortfolioGrid from '@/components/PortfolioGrid';
import { Section, SectionHeading } from '@/components/Section';
import { projects } from '@/data/portfolio';

export const metadata: Metadata = { title: 'Portfolio', description: 'Software projects across full-stack development, backend engineering, data science, machine learning, and computer vision.' };

export default function PortfolioPage() {
  return (
    <Section className="pt-40 lg:pt-48">
      <SectionHeading title="Portfolio" intro="Filter by category, or open a project to explore its details, technologies, and development process." className="mb-14" />
      <PortfolioGrid projects={projects} showFilter />
    </Section>
  );
}
