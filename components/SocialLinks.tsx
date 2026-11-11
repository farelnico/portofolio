import { Github, Instagram, Linkedin } from 'lucide-react';
import { site } from '@/data/site';

const icons = { instagram: Instagram, linkedin: Linkedin, github: Github } as const;

export default function SocialLinks({ withLabels = false }: { withLabels?: boolean }) {
  return (
    <ul className="flex flex-wrap items-center gap-3">
      {site.socials.map((s) => {
        const Icon = icons[s.id];
        return (
          <li key={s.id}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={withLabels ? undefined : s.label}
              className="glass inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm text-mist transition-colors hover:border-electric/60 hover:text-bone"
            >
              <Icon size={16} aria-hidden />
              {withLabels && <span>{s.label}</span>}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
