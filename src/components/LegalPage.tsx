import Link from 'next/link';
import { BRAND } from '@/data/collection';

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-paper px-4 py-8 md:px-8">
      <Link href="/" className="font-serif text-[18px] tracking-[0.3em]">
        {BRAND}
      </Link>
      <article className="mx-auto mt-16 max-w-[680px] pb-24 text-[15px] leading-relaxed [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-[12px] [&_h2]:font-medium [&_h2]:uppercase [&_h2]:tracking-[0.1em] [&_li]:mt-1 [&_p]:mt-3 [&_ul]:list-disc [&_ul]:pl-5">
        <h1 className="display text-[8vw] md:text-[40px]">{title}</h1>
        <p className="text-[12px] text-muted">Редакция от {updated}</p>
        {children}
      </article>
    </main>
  );
}
