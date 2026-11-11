'use client';

import { motion } from 'framer-motion';
import { EASE } from '@/lib/utils';

// Template dirender ulang tiap pindah route, jadi animasi masuk berjalan di setiap halaman.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }}>
      {children}
    </motion.div>
  );
}
