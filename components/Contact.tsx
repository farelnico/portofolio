import { Mail } from 'lucide-react';
import { site } from '@/data/site';
import ContactForm from './ContactForm';
import Reveal from './Reveal';
import { Section } from './Section';
import SocialLinks from './SocialLinks';

export default function Contact() {
  return (
    <Section id="contact">
      <div className="grid gap-16 lg:grid-cols-[5fr_6fr] lg:gap-24">
        <Reveal>
          <h2 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">Have an idea or a project? Let&apos;s build it.</h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-mist">Tell me what you want to build or improve. I will reply by email.</p>
          <a href={`mailto:${site.email}`} className="mt-10 inline-flex items-center gap-3 text-xl transition-colors hover:text-electric-soft sm:text-2xl">
            <Mail size={22} aria-hidden /> {site.email}
          </a>
          <div className="mt-8"><SocialLinks withLabels /></div>
        </Reveal>
        <Reveal delay={0.1} className="glass relative rounded-[2rem] p-7 sm:p-10">
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
