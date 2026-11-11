'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { categories, type Category, type Project } from '@/data/portfolio';
import { cn, EASE } from '@/lib/utils';
import PortfolioCard from './PortfolioCard';

// Pola layout editorial: lebar kolom dan rasio gambar berselang-seling.
const spans = ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-5', 'lg:col-span-7', 'lg:col-span-6', 'lg:col-span-6'];
const aspects = ['aspect-[4/3]', 'aspect-[4/5]', 'aspect-[4/5]', 'aspect-[4/3]', 'aspect-[1/1]', 'aspect-[1/1]'];

type Filter = Category | 'All';

function Grid({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return <p className="py-20 text-mist">No projects in this category yet. Add one in data/portfolio.ts.</p>;
  }
  return (
    <motion.ul layout className="grid gap-x-8 gap-y-16 lg:grid-cols-12">
      <AnimatePresence mode="popLayout" initial={false}>
        {projects.map((project, i) => (
          <motion.li
            key={project.slug}
            layout
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.6, ease: EASE }}
            className={spans[i % spans.length]}
          >
            <PortfolioCard project={project} aspect={aspects[i % aspects.length]} priority={i < 2} />
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  );
}

/** Filter yang tersinkron dengan URL (?category=...), sehingga link dari hero langsung membuka kategori yang dipilih. */
function FilteredGrid({ projects }: { projects: Project[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  // Hanya kategori yang sudah punya project. Kategori kosong otomatis muncul lagi setelah ada project-nya.
  const available = useMemo(() => categories.filter((c) => projects.some((p) => p.category === c)), [projects]);
  const fromUrl: Filter = available.find((c) => c === params.get('category')) ?? 'All';
  const [active, setActive] = useState<Filter>(fromUrl);

  // Ikuti perubahan URL (tombol back/forward, atau link dari halaman lain)
  useEffect(() => { setActive(fromUrl); }, [fromUrl]);

  const select = (cat: Filter) => {
    setActive(cat);
    router.replace(cat === 'All' ? pathname : `${pathname}?category=${encodeURIComponent(cat)}`, { scroll: false });
  };

  const counts = useMemo(() => {
    const c = new Map<string, number>([['All', projects.length]]);
    available.forEach((cat) => c.set(cat, projects.filter((p) => p.category === cat).length));
    return c;
  }, [projects, available]);

  const visible = active === 'All' ? projects : projects.filter((p) => p.category === active);

  return (
    <div>
      {/* Filter hanya berguna kalau ada lebih dari satu kategori berisi */}
      {available.length > 1 && (
      <div role="group" aria-label="Filter projects by category" className="mb-12 flex flex-wrap gap-2">
        {(['All', ...available] as const).map((cat) => (
          <button
            key={cat}
            type="button"
            aria-pressed={active === cat}
            onClick={() => select(cat)}
            className={cn('rounded-full border px-4 py-2 text-sm transition-colors duration-300', active === cat ? 'border-electric bg-electric text-white' : 'glass text-mist hover:text-bone')}
          >
            {cat} <span className="ml-1 opacity-70">{counts.get(cat)}</span>
          </button>
        ))}
      </div>
      )}
      <Grid projects={visible} />
    </div>
  );
}

export default function PortfolioGrid({ projects, showFilter = false }: { projects: Project[]; showFilter?: boolean }) {
  if (!showFilter) return <Grid projects={projects} />;
  // useSearchParams wajib dibungkus Suspense agar halaman tetap bisa di-render statis.
  return (
    <Suspense fallback={<Grid projects={projects} />}>
      <FilteredGrid projects={projects} />
    </Suspense>
  );
}
