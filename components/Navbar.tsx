'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { nav, site } from '@/data/site';
import { cn, EASE } from '@/lib/utils';

function isActive(pathname: string, href: string) {
  if (href.startsWith('/#')) return false;
  return href === '/' ? pathname === '/' : pathname.startsWith(href);
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <header className={cn('fixed inset-x-0 top-0 z-50 transition-colors duration-500', scrolled && !open ? 'border-b border-white/[0.06] bg-ink/70 backdrop-blur-xl' : 'border-b border-transparent')}>
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 lg:px-12">
          <Link href="/" className="flex items-center gap-3" aria-label={`${site.brand}, home`}>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-electric font-display text-sm font-bold text-white">{site.brand.slice(0, 1)}</span>
            <span className="font-display text-lg font-semibold tracking-tight">{site.brand}</span>
          </Link>

          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-9">
              {nav.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href} className="relative">
                    <Link href={item.href} aria-current={active ? 'page' : undefined} className={cn('py-2 text-sm transition-colors', active ? 'text-bone' : 'text-mist hover:text-bone')}>
                      {item.label}
                    </Link>
                    {active && <motion.span layoutId="nav-dot" className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-electric" />}
                  </li>
                );
              })}
            </ul>
          </nav>

          <button
            type="button"
            className="relative z-50 grid h-11 w-11 place-items-center rounded-full glass md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col justify-center bg-ink/95 px-6 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <ul className="space-y-2">
              {nav.map((item, i) => (
                <motion.li key={item.href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i, duration: 0.5, ease: EASE }}>
                  <Link href={item.href} onClick={() => setOpen(false)} className="block py-2 font-display text-4xl font-semibold tracking-tight">
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
