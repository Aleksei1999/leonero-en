'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { BRAND } from '@/data/collection';

const SPLIT = 49.5; // % ширины кадра: белая щель между полами шубы

export function OpenReveal() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const leftX = useTransform(scrollYProgress, [0.1, 0.85], ['0%', '-62%']);
  const rightX = useTransform(scrollYProgress, [0.1, 0.85], ['0%', '62%']);
  const wordScale = useTransform(scrollYProgress, [0, 0.6], [1, 1.12]);
  const wordOpacity = useTransform(scrollYProgress, [0.38, 0.62], [1, 0]);
  const photoScale = useTransform(scrollYProgress, [0.3, 1], [1.18, 1]);

  // кадр рук 16:9 крупнее экрана (джинсы снизу уходят за край), проценты разреза совпадают с фото
  const frame = 'absolute top-1/2 left-1/2 aspect-video w-[max(128vw,227vh)] -translate-x-1/2 -translate-y-[44%]';
  const photoFrame = 'absolute top-1/2 left-1/2 aspect-video w-[max(100vw,177.78vh)] -translate-x-1/2 -translate-y-1/2';

  return (
    <section ref={ref} className="relative h-[280vh] bg-white">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ scale: photoScale }} className={photoFrame}>
          <img src="/model/alps-2.jpg" alt="Девушка в белом меховом жилете со львёнком" className="h-full w-full object-cover" />
        </motion.div>

        <motion.div style={{ opacity: wordOpacity }} className="absolute inset-0 flex items-center justify-center bg-white">
          <motion.span style={{ scale: wordScale }} className="display pl-[0.12em] text-[12vw]">
            {BRAND}
          </motion.span>
        </motion.div>

        <motion.div style={{ x: leftX }} className="absolute inset-0">
          <div className={frame} style={{ clipPath: `inset(0 ${100 - SPLIT}% 0 0)` }}>
            <img src="/model/hands.png" alt="" className="h-full w-full" />
          </div>
        </motion.div>
        <motion.div style={{ x: rightX }} className="absolute inset-0">
          <div className={frame} style={{ clipPath: `inset(0 0 0 ${SPLIT}%)` }}>
            <img src="/model/hands.png" alt="" className="h-full w-full" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
