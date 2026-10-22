'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { BRAND, LOOKS } from '@/data/collection';

export function Lookbook() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const clip = useTransform(scrollYProgress, [0, 0.6], ['inset(18% 34% 18% 34%)', 'inset(0% 0% 0% 0%)']);
  const scale = useTransform(scrollYProgress, [0, 0.6], [1.25, 1]);
  const stripY = useTransform(scrollYProgress, [0.55, 1], ['100%', '0%']);
  const hero = LOOKS[4];

  return (
    <section id="about" ref={ref} className="relative h-[260vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-paper">
        <motion.div style={{ clipPath: clip }} className="absolute inset-0 bg-[#e7e3de]">
          <motion.img
            src={hero.model ?? hero.product}
            alt=""
            style={{ scale }}
            className="h-full w-full object-cover object-top md:object-contain"
          />
        </motion.div>

        <motion.div
          style={{ y: stripY }}
          className="absolute inset-x-0 bottom-0 bg-paper px-4 pt-5 pb-6 md:px-8"
        >
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="display text-3xl md:text-5xl">@{BRAND.toLowerCase()}</p>
              <p className="mt-2 text-[12px] text-muted">How our customers wear their capes</p>
            </div>
            <a
              href="https://instagram.com/"
              className="shrink-0 bg-ink px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.08em] text-paper"
            >
              View
            </a>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
            {[...LOOKS, ...LOOKS].map((l, i) => (
              <div key={i} className="aspect-[3/4] w-[38vw] shrink-0 overflow-hidden rounded-[14px] bg-[#e7e3de] sm:w-[22vw] md:w-[14vw]">
                <img src={l.model ?? l.product} alt={l.name} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
