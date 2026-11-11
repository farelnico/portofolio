import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export default function LinkButton({ href, children, variant = 'primary', className }: { href: string; children: ReactNode; variant?: 'primary' | 'ghost'; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-medium transition-colors duration-300 ease-out',
        variant === 'primary' ? 'bg-bone text-ink hover:bg-electric hover:text-white' : 'glass text-bone hover:border-white/30 hover:bg-white/10',
        className,
      )}
    >
      {children}
    </Link>
  );
}
