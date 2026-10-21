import Link from 'next/link';
import { BRAND } from '@/data/collection';

const LINKS = [
  { href: 'https://instagram.com/', label: 'Instagram' },
  { href: 'https://t.me/', label: 'Telegram' },
  { href: '/privacy', label: 'Политика конфиденциальности' },
  { href: '/offer', label: 'Публичная оферта' },
];

export function Footer() {
  return (
    <footer className="border-t border-black/10 bg-paper px-4 py-8 text-[11px] uppercase tracking-[0.1em] md:px-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <span className="font-serif text-[15px] tracking-[0.3em]">{BRAND}</span>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-muted">
          {LINKS.map((l) =>
            l.href.startsWith('/') ? (
              <Link key={l.href} href={l.href} className="transition-colors hover:text-ink">
                {l.label}
              </Link>
            ) : (
              <a key={l.href} href={l.href} className="transition-colors hover:text-ink">
                {l.label}
              </a>
            ),
          )}
        </nav>
        <span className="text-muted">© 2026</span>
      </div>
    </footer>
  );
}
