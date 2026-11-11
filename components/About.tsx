'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { site } from '@/data/site';
import { skills } from '@/data/skills';
import { Section } from './Section';
import Reveal from './Reveal';

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-28, 28]);

  return (
    <Section id="about">
      <div className="grid items-center gap-14 lg:grid-cols-[5fr_6fr] lg:gap-24">
        <div ref={ref} className="relative mx-auto w-full max-w-md overflow-hidden rounded-[2rem] border border-white/10 lg:mx-0">
          <motion.div style={{ y, scale: 1.12 }} className="relative aspect-[4/5]">
            <Image src="/images/cover.jpg" alt={`Portrait placeholder of ${site.name}`} fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
          </motion.div>
        </div>

        <div>
          <Reveal>
            <h2 className="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">{site.name}</h2>
            <p className="mt-4 text-lg text-electric-soft">{site.role}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-mist">
              I'm a software engineer and an Informatics Engineering student. I build web applications, develop data-driven systems, and create computer vision prototypes, with a strong focus on writing clean, efficient, and maintainable code.
            </p>
            <p className="mt-4 max-w-xl text-pretty leading-relaxed text-mist">
              My everyday stack includes React, Next.js, and Python, which I use to build web applications, develop software solutions, and work on computer vision projects. My thesis applies deep learning object detection to chest X-ray images.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <ul className="mt-10 flex flex-wrap gap-2">
              {skills.map((s) => (
                <li key={s} className="glass rounded-full px-4 py-2 text-sm">{s}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
