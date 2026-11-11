import type { Metadata } from 'next';
import About from '@/components/About';
import Skills from '@/components/Skills';

export const metadata: Metadata = { title: 'About', description: 'About me: a software engineer and Informatics Engineering student, my skills, and the tech I work with.' };

export default function AboutPage() {
  return (
    <div className="pt-20">
      <About />
      <Skills />
    </div>
  );
}
