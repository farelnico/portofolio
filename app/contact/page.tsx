import type { Metadata } from 'next';
import Contact from '@/components/Contact';

export const metadata: Metadata = { title: 'Contact', description: 'Get in touch about full-stack development, backend engineering, data science, machine learning, and computer vision projects.' };

export default function ContactPage() {
  return (
    <div className="pt-20">
      <Contact />
    </div>
  );
}
