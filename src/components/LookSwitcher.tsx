'use client';

import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useRef, useState } from 'react';
import { BASE_MODEL, LOOKS } from '@/data/collection';

const STEPS = [{ id: 'base', color: 'Базовый образ', product: undefined, model: BASE_MODEL }, ...LOOKS];
const N = STEPS.length;
const EASE = [0.65, 0, 0.25, 1] as const;

function ghost(offset: number, hasModel: boolean) {
  // вещь с фото на модели «влетает» в центр и растворяется в нём — её заменяет слой модели
  if (offset === 0) return { x: '0vw', scale: 1, opacity: hasModel ? 0 : 1, filter: 'blur(0px)', zIndex: 2 };
  const side = Math.sign(offset);
  const far = Math.abs(offset) > 1;
  return {
    x: `${side * (far ? 48 : 30)}vw`,
    scale: far ? 0.5 : 0.62,
    opacity: far ? 0 : 0.3,
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

  const step = STEPS[index];
  const box = 'absolute h-[80vh] w-[min(66vh,86vw)]';

  return (
    <section id="collection" ref={ref} style={{ height: `${N * 90}vh` }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 flex items-end justify-center">
          {STEPS.map((s, i) =>
            s.model ? (
              <motion.img
                key={`m-${s.id}`}
                src={s.model}
                alt=""
                className={`${box} bottom-0 object-contain object-bottom`}
                initial={false}
                animate={
                  i === index
                    ? { opacity: 1, filter: 'blur(0px)', scale: 1 }
                    : { opacity: 0, filter: 'blur(14px)', scale: 1.03 }
                }
                transition={{ duration: 0.8, ease: EASE, delay: i === index ? 0.25 : 0 }}
                style={{ zIndex: 3 }}
              />
            ) : null,
          )}
        </div>

        <div className="absolute inset-0 flex items-end justify-center">
          {STEPS.map((s, i) =>
            s.product ? (
              <motion.button
                key={s.id}
                type="button"
                aria-label={s.color}
                onClick={() => i !== index && goTo(i)}
                className={`${box} bottom-0 cursor-pointer`}
                initial={false}
                animate={ghost(i - index, Boolean(s.model))}
                transition={{ duration: 0.9, ease: EASE }}
              >
                <img src={s.product} alt="" className="h-full w-full object-contain object-bottom" />
              </motion.button>
            ) : null,
          )}
        </div>

        <div className="pointer-events-none absolute bottom-[16vh] left-4 z-10 md:bottom-auto md:top-1/2 md:left-8 md:-translate-y-1/2">
          <h1 className="display text-[13vw] md:text-[5.2vw]">
            Меховая
            <br />
            коллекция
          </h1>
          <p className="mt-4 max-w-[240px] text-[12px] leading-snug text-muted">
            Листайте вниз: вещи по очереди примеряются на модель.
          </p>
        </div>

        <div className="absolute right-4 bottom-6 z-10 flex flex-col items-end gap-1 text-[11px] uppercase tracking-[0.1em] md:right-8">
          <motion.span key={step.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="font-medium">
            {step.color}
          </motion.span>
          <span className="tabular-nums text-muted">
            {String(index + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}
          </span>
        </div>
      </div>
    </section>
  );
}
