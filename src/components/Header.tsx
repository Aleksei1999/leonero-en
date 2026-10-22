import { BRAND } from '@/data/collection';

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 grid grid-cols-3 items-center px-4 py-4 text-[11px] font-medium uppercase tracking-[0.08em] mix-blend-difference text-white md:px-8">
      <nav className="flex gap-5">
        <a href="#collection">Collection</a>
        <a href="#about" className="hidden sm:inline">About</a>
      </nav>
      <a href="#" className="justify-self-center font-serif text-[20px] font-medium tracking-[0.3em]">
        {BRAND}
      </a>
      <div className="flex justify-self-end gap-5">
        <a href="#product">Shop</a>
      </div>
    </header>
  );
}
