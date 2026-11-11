'use client';

import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}
      className="glass inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm text-mist transition-colors hover:border-electric/60 hover:text-bone"
    >
      Back to top <ArrowUp size={16} aria-hidden />
    </button>
  );
}
