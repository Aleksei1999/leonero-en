'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { BRAND, LOOKS } from '@/data/collection';

const TILES = [LOOKS[0], LOOKS[3], LOOKS[4]];

export function Intro() {
  const [shown, setShown] = useState(true);

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    const t = setTimeout(() => {
      setShown(false);
      document.documentElement.style.overflow = '';
    }, 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {shown && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col bg-paper px-4 pt-16 pb-6 md:px-8"
          exit={{ opacity: 0, filter: 'blur(12px)' }}
          transition={{ duration: 0.8, ease: [0.7, 0, 0.3, 1] }}
        >
          <div className="grid flex-1 grid-cols-3 gap-2">
            {TILES.map((l, i) => (
              <motion.div
                key={l.id}
                className="relative overflow-hidden bg-[#e7e3de]"
                initial={{ clipPath: 'inset(100% 0 0 0)' }}
                animate={{ clipPath: 'inset(0% 0 0 0)' }}
                transition={{ duration: 1, delay: 0.15 * i, ease: [0.7, 0, 0.3, 1] }}
              >
                <motion.img
                  src={l.product}
                  alt=""
                  className="h-full w-full object-cover"
                  initial={{ scale: 1.4, filter: 'blur(10px)' }}
                  animate={{ scale: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 1.6, delay: 0.15 * i, ease: [0.2, 0, 0, 1] }}
                />
              </motion.div>
            ))}
          </div>
          <div className="mt-6 flex items-end justify-between overflow-hidden">
            <motion.span
              className="display text-[18vw] md:text-[12vw]"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.2, 0, 0, 1] }}
            >
              {BRAND}
            </motion.span>
            <span className="pb-3 text-[11px] uppercase tracking-[0.1em] text-muted">Осень–зима</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
