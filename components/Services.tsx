import Image from 'next/image';
import { services } from '@/data/services';
import Reveal from './Reveal';
import { Section, SectionHeading } from './Section';

export default function Services() {
  return (
    <Section id="services">
      <SectionHeading title="What I can build for you" intro="Five ways I can help, each starting from a short conversation about what you need the software to do." />
      <ul className="mt-16 border-t border-white/10">
        {services.map((s) => (
          <li key={s.id} className="border-b border-white/10">
            <Reveal className="grid items-center gap-6 py-8 md:grid-cols-[1.1fr_1.2fr_0.9fr] md:gap-10">
              <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">{s.title}</h3>
              <p className="max-w-md text-pretty leading-relaxed text-mist">{s.description}</p>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10">
                <Image src={s.image} alt={`${s.title}, sample render`} fill sizes="(min-width: 768px) 28vw, 100vw" className="object-cover" />
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
