'use client';

import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useRef, useState } from 'react';
import { LOOKS } from '@/data/collection';

const N = LOOKS.length;

function place(offset: number) {
  if (offset === 0) return { x: '0vw', scale: 1, opacity: 1, filter: 'blur(0px)', zIndex: 3 };
  const side = Math.sign(offset);
  const far = Math.abs(offset) > 1;
  return {
    x: `${side * (far ? 48 : 30)}vw`,
    scale: far ? 0.5 : 0.68,
    opacity: far ? 0 : 0.32,
    filter: 'blur(1.5px)',
    zIndex: 1,
  };
}

export function LookSwitcher() {
  const ref = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    setIndex(Math.min(N - 1, Math.max(0, Math.floor(p * N * 0.999))));
  });

  const goTo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const step = (el.offsetHeight - window.innerHeight) / N;
    window.scrollTo({ top: el.offsetTop + step * i + step / 2, behavior: 'smooth' });
  };

  const look = LOOKS[index];

  return (
    <section id="collection" ref={ref} style={{ height: `${N * 90}vh` }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          {LOOKS.map((l, i) => {
            const offset = i - index;
            return (
              <motion.button
                key={l.id}
                type="button"
                aria-label={l.name}
                onClick={() => offset !== 0 && goTo(i)}
                className="absolute h-[72vh] w-[min(72vh,80vw)] cursor-pointer"
                initial={false}
                animate={place(offset)}
                transition={{ duration: 0.9, ease: [0.65, 0, 0.25, 1] }}
              >
                <img src={l.product} alt={l.name} className="h-full w-full object-contain" />
                {l.model && (
                  <motion.img
                    src={l.model}
                    alt=""
                    className="absolute inset-0 h-full w-full object-contain"
                    animate={{ opacity: offset === 0 ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        <div className="pointer-events-none absolute bottom-[14vh] left-4 z-10 md:bottom-auto md:top-1/2 md:left-8 md:-translate-y-1/2">
          <h1 className="display text-[13vw] md:text-[5.2vw]">
            Меховая
            <br />
            коллекция
          </h1>
          <p className="mt-4 max-w-[240px] text-[12px] leading-snug text-muted">
            Одна форма, пять фактур. Накидка надевается поверх всего, что уже есть в шкафу.
          </p>
        </div>

        <div className="absolute inset-x-0 bottom-6 z-10 flex flex-col items-center gap-2 text-[11px] uppercase tracking-[0.1em]">
          <motion.span key={look.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="font-medium">
            {look.color}
          </motion.span>
          <span className="tabular-nums text-muted">
            {String(index + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}
          </span>
        </div>
      </div>
    </section>
  );
}
