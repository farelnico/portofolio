'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { EASE } from '@/lib/utils';
import LinkButton from './Button';
import Hero3D from './Hero3D';
import { useReady } from './Providers';

const lines = ['FROM CODE TO', 'INTELLIGENT', 'SYSTEMS'];

export default function Hero() {
  const ready = useReady();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 80]);
  const state = reduce || ready ? 'show' : 'hidden';

  return (
    <section ref={ref} id="home" className="relative isolate overflow-hidden">
      <div className="mx-auto grid min-h-[100svh] max-w-[1440px] items-center gap-10 px-6 pb-16 pt-28 lg:grid-cols-[1.2fr_1fr] lg:gap-8 lg:px-12">
        {/* Kolom kiri: teks. Kolom kanan: scene 3D. Keduanya tidak saling menimpa. */}
        <div className="relative z-20 min-w-0">
          <h1 className="text-[clamp(1.5rem,7vw,2.6rem)] font-extrabold uppercase leading-[0.98] tracking-tight lg:text-[clamp(2.1rem,3.2vw,3.2rem)]">
            {lines.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.08em] lg:whitespace-nowrap">
                <motion.span
                  className="block"
                  initial={{ y: '115%' }}
                  animate={state === 'show' ? { y: 0 } : { y: '115%' }}
                  transition={{ duration: reduce ? 0 : 0.9, delay: reduce ? 0 : 0.09 * i, ease: EASE }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={state === 'show' ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: reduce ? 0 : 0.8, delay: reduce ? 0 : 0.6, ease: EASE }}
            className="mt-8 grid max-w-xl gap-8"
          >
            <p className="text-pretty text-lg leading-relaxed text-mist">
              I&apos;m a software engineer who builds web applications, backend systems, and machine learning models. The layers beside this text are rendered live in your browser, one for each area I work in.
            </p>
            <div className="flex flex-wrap gap-3">
              <LinkButton href="/portfolio">Explore My Work</LinkButton>
              <LinkButton href="/contact" variant="ghost">Contact Me</LinkButton>
            </div>
          </motion.div>
        </div>

        <motion.div
          style={{ y }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={state === 'show' ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
          transition={{ duration: reduce ? 0 : 1.2, delay: reduce ? 0 : 0.3, ease: EASE }}
          className="relative z-10 -mx-6 h-[62svh] min-w-0 lg:mx-0 lg:h-[min(74svh,46rem)]"
        >
          <div aria-hidden className="pointer-events-none absolute left-1/2 top-[40%] h-[65%] w-[75%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric/25 blur-[120px]" />
          <Hero3D />
        </motion.div>
      </div>
    </section>
  );
}
