"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { BRAND, asset } from "@/data/collection";

const SPLIT = 49.5; // % ширины кадра: белая щель между полами шубы

// руки распахивают шубу поверх начала блока примерки; p — от 0 до 1
export function HandsOpen({ p }: { p: MotionValue<number> }) {
  const leftX = useTransform(p, [0.05, 0.7], ["0%", "-62%"]);
  const rightX = useTransform(p, [0.05, 0.7], ["0%", "62%"]);
  const wordScale = useTransform(p, [0, 0.45], [1, 1.12]);
  const wordOpacity = useTransform(p, [0.28, 0.45], [1, 0]);
  const visibility = useTransform(p, (v) => (v >= 1 ? "hidden" : "visible"));

  // кадр рук 16:9 крупнее экрана (джинсы снизу уходят за край), проценты разреза совпадают с фото
  const frame =
    "absolute top-1/2 left-1/2 aspect-video w-[max(128vw,227vh)] -translate-x-1/2 -translate-y-[44%]";

  return (
    <motion.div
      style={{ visibility }}
      className="pointer-events-none absolute inset-0 z-20"
    >
      <motion.div
        style={{ opacity: wordOpacity }}
        className="absolute inset-0 flex items-center justify-center bg-paper"
      >
        <motion.span
          style={{ scale: wordScale }}
          className="display pl-[0.12em] text-[12vw]"
        >
          {BRAND}
        </motion.span>
      </motion.div>
      <motion.div style={{ x: leftX }} className="absolute inset-0">
        <div
          className={frame}
          style={{ clipPath: `inset(0 ${100 - SPLIT}% 0 0)` }}
        >
          <img src={asset("/model/hands.webp")} alt="" className="h-full w-full" />
        </div>
      </motion.div>
      <motion.div style={{ x: rightX }} className="absolute inset-0">
        <div className={frame} style={{ clipPath: `inset(0 0 0 ${SPLIT}%)` }}>
          <img src={asset("/model/hands.webp")} alt="" className="h-full w-full" />
        </div>
      </motion.div>
    </motion.div>
  );
}
