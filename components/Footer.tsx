import Link from 'next/link';
import { nav, site } from '@/data/site';
import BackToTop from './BackToTop';
import SocialLinks from './SocialLinks';

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08] px-6 py-16 lg:px-12">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-3xl font-semibold tracking-tight">{site.name}</p>
            <p className="mt-3 max-w-sm text-mist">{site.role}</p>
          </div>
          <nav aria-label="Footer">
            <p className="text-sm text-mist">Pages</p>
            <ul className="mt-4 space-y-2">
              {nav.map((n) => (
                <li key={n.href}><Link href={n.href} className="transition-colors hover:text-electric-soft">{n.label}</Link></li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="text-sm text-mist">Find me on</p>
            <div className="mt-4"><SocialLinks withLabels /></div>
          </div>
        </div>
        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-white/[0.08] pt-8 sm:flex-row sm:items-center">
          <p className="text-sm text-mist">&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
