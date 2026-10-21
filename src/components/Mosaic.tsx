'use client';

import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef } from 'react';

const COLS = 12;
const ROWS = 7;
// детерминированный «рандом», чтобы порядок клеток совпадал на сервере и в браузере
const order = Array.from({ length: COLS * ROWS }, (_, i) => ((i * 37) % 97) / 97);

function Cell({ p, at }: { p: MotionValue<number>; at: number }) {
  const opacity = useTransform(p, [at * 0.8, at * 0.8 + 0.2], [1, 0]);
  return <motion.div style={{ opacity }} className="bg-paper" />;
}

export function Mosaic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start start'] });

  return (
    <div ref={ref} className="relative">
      {children}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 grid h-screen"
        style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)`, gridTemplateRows: `repeat(${ROWS}, 1fr)` }}
      >
        {order.map((at, i) => (
          <Cell key={i} p={scrollYProgress} at={at} />
        ))}
      </div>
    </div>
  );
}
