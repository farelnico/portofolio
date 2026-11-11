import { tools } from '@/data/skills';
import Reveal from './Reveal';
import { Section, SectionHeading } from './Section';

export default function Skills() {
  return (
    <Section id="skills">
      <SectionHeading title="Tech I work with" intro="The languages and tools behind my projects, and what I use each one for" />
      <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((t, i) => (
          <li key={t.name}>
            <Reveal delay={0.05 * (i % 3)} className="glass group h-full rounded-3xl p-7 transition-colors duration-500 hover:border-electric/50">
              <div className="grid h-14 w-14 place-items-center rounded-2xl border border-white/15 bg-gradient-to-br from-electric/40 to-electric-violet/10 font-display text-lg font-bold" aria-hidden>
                {t.mark}
              </div>
              <h3 className="mt-6 text-xl font-semibold tracking-tight">{t.name}</h3>
              <p className="mt-2 text-mist">{t.use}</p>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
