'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { BRAND, LOOKS } from '@/data/collection';

export function ZoomReveal() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const scale = useTransform(scrollYProgress, [0, 0.8], [3.2, 1]);
  const wordScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.55]);
  const wordOpacity = useTransform(scrollYProgress, [0.5, 0.85], [1, 0]);
  const look = LOOKS[2];

  return (
    <section ref={ref} className="relative h-[240vh] bg-paper">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <motion.img
          src={look.model ?? look.product}
          alt=""
          style={{ scale }}
          className="h-full w-full object-contain"
        />
        <motion.span
          style={{ scale: wordScale, opacity: wordOpacity }}
          className="display pointer-events-none absolute text-[17vw] text-white mix-blend-difference"
        >
          {BRAND}
        </motion.span>
      </div>
    </section>
  );
}
