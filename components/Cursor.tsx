'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

type Mode = 'idle' | 'link' | 'view';

/** Ring pengikut kursor; kursor asli tetap terlihat. Hanya aktif di perangkat dengan mouse. */
export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<Mode>('idle');

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine) and (hover: hover)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;
    setEnabled(true);
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target instanceof Element ? e.target : null;
      if (!t) return;
      if (t.closest('[data-cursor="view"]')) setMode('view');
      else if (t.closest('a, button, input, textarea, select, [role="button"]')) setMode('link');
      else setMode('idle');
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, [x, y]);

  if (!enabled) return null;
  const size = mode === 'view' ? 84 : mode === 'link' ? 48 : 26;

  return (
    <motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-[90]" style={{ x: sx, y: sy }}>
      <motion.div
        animate={{ width: size, height: size }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="-translate-x-1/2 -translate-y-1/2 grid place-items-center rounded-full border border-white/50 text-[11px] font-medium text-white mix-blend-difference"
      >
        {mode === 'view' ? 'View' : null}
      </motion.div>
    </motion.div>
  );
}
