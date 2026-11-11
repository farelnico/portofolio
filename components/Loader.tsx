'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { site } from '@/data/site';
import { EASE } from '@/lib/utils';

const KEY = 'portfolio:intro-seen';

export default function Loader({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true);
  const doneRef = useRef(onDone);

  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem(KEY) === '1'; } catch { /* storage tidak tersedia */ }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t = setTimeout(() => {
      try { sessionStorage.setItem(KEY, '1'); } catch { /* abaikan */ }
      setVisible(false);
      doneRef.current();
    }, seen || reduce ? 0 : 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          role="status"
          aria-label="Loading"
          className="loader fixed inset-0 z-[100] grid place-items-center bg-ink"
          exit={{ y: '-100%', transition: { duration: 0.8, ease: EASE } }}
        >
          <div className="w-[min(78vw,22rem)]">
            <p className="font-display text-3xl font-semibold tracking-tight">{site.brand}</p>
            <p className="mt-1 text-sm text-mist">{site.role}</p>
            <div className="mt-8 h-px w-full bg-white/10">
              <motion.div
                className="h-px origin-left bg-electric"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.3, ease: EASE }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
