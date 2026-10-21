import { BRAND } from '@/data/collection';

export function Footer() {
  return (
    <footer className="bg-ink px-4 pt-16 pb-6 text-paper md:px-8">
      <div className="flex flex-wrap justify-between gap-6 text-[12px] uppercase tracking-[0.08em]">
        <div className="flex gap-6">
          <a href="https://instagram.com/">Instagram</a>
          <a href="https://t.me/">Telegram</a>
        </div>
        <span className="text-paper/50">© 2026</span>
      </div>
      <p className="display mt-12 text-[17.5vw] leading-[0.8]">{BRAND}</p>
    </footer>
  );
}
