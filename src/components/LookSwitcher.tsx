"use client";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef, useState } from "react";
import { BASE_MODEL, type Look } from "@/data/collection";

const GAP = 34; // vw между соседними вещами
const TRAIL = [
  { dx: 0, k: 1 },
  { dx: 2.2, k: 0.45 },
  { dx: 4.4, k: 0.2 },
];

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
// насколько вещь k «надета» при позиции прокрутки pos: 1 — ровно на модели
const worn = (k: number, pos: number) => 1 - clamp01(Math.abs(k - pos) / 0.32);

function ghostOpacity(d: number) {
  if (d > 1.7) return 0;
  if (d > 1.1) return (0.32 * (1.7 - d)) / 0.6;
  if (d > 0.3) return 0.32;
  return 0.32 * clamp01((d - 0.06) / 0.24);
}

function Ghost({
  look,
  k,
  pos,
}: {
  look: Look;
  k: number;
  pos: MotionValue<number>;
}) {
  const opacity = useTransform(pos, (v) => ghostOpacity(Math.abs(k - v)));
  const aligned = Boolean(look.garment);
  return (
    <motion.div
      style={{ opacity }}
      className="pointer-events-none absolute inset-0"
    >
      {TRAIL.map((t) => (
        <TrailCopy
          key={t.dx}
          src={look.garment ?? look.product}
          aligned={aligned}
          k={k}
          pos={pos}
          dx={t.dx}
          weight={t.k}
        />
      ))}
    </motion.div>
  );
}

function TrailCopy(props: {
  src: string;
  aligned: boolean;
  k: number;
  pos: MotionValue<number>;
  dx: number;
  weight: number;
}) {
  const { src, aligned, k, pos, dx, weight } = props;
  const x = useTransform(pos, (v) => `${(k - v) * GAP + dx}vw`);
  return (
    <motion.img
      src={src}
      alt=""
      style={{ x, opacity: weight }}
      className={
        aligned
          ? "absolute inset-0 h-full w-full object-contain"
          : "absolute top-[24%] left-[calc(51.7%-19vh)] h-[38vh] w-[38vh] object-contain grayscale"
      }
    />
  );
}

function Dressed({
  look,
  k,
  pos,
}: {
  look: Look;
  k: number;
  pos: MotionValue<number>;
}) {
  const opacity = useTransform(pos, (v) => worn(k, v));
  const filter = useTransform(pos, (v) => `blur(${(1 - worn(k, v)) * 10}px)`);
  return (
    <motion.img
      src={look.model}
      alt={look.name}
      style={{ opacity, filter }}
      className="absolute inset-0 h-full w-full object-contain"
    />
  );
}

type Props = {
  id: string;
  looks: Look[];
  title: [string, string];
  note: string;
  // заголовок страницы только у первого блока
  primary?: boolean;
};

export function LookSwitcher({ id, looks, title, note, primary }: Props) {
  const N = looks.length + 1;
  const Heading = primary ? "h1" : "h2";
  const ref = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const pos = useTransform(scrollYProgress, [0, 1], [0, N - 1]);
  const baseOpacity = useTransform(
    pos,
    (v) =>
      1 - Math.max(0, ...looks.map((l, i) => (l.model ? worn(i + 1, v) : 0))),
  );

  useMotionValueEvent(pos, "change", (v) => setIndex(Math.round(v)));

  const label = index === 0 ? "Базовый образ" : looks[index - 1].color;

  return (
    <section
      id={id}
      ref={ref}
      style={{ height: `${N * 80}vh` }}
      className="relative"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute bottom-0 left-1/2 aspect-video h-[64vh] -translate-x-1/2 md:h-[90vh]">
          <motion.img
            src={BASE_MODEL}
            alt=""
            style={{ opacity: baseOpacity }}
            className="absolute inset-0 h-full w-full object-contain"
          />
          {looks.map((l, i) =>
            l.model ? (
              <Dressed key={l.id} look={l} k={i + 1} pos={pos} />
            ) : null,
          )}
          {looks.map((l, i) => (
            <Ghost key={l.id} look={l} k={i + 1} pos={pos} />
          ))}
        </div>

        <div className="pointer-events-none absolute top-24 left-4 z-10 md:top-1/2 md:left-8 md:-translate-y-1/2">
          <Heading className="display text-[10vw] md:text-[4.2vw]">
            {title[0]}
            <br />
            {title[1]}
          </Heading>
          <p className="mt-4 max-w-[240px] text-[12px] leading-snug text-muted">
            {note}
          </p>
        </div>

        <div className="absolute inset-x-0 bottom-6 z-10 flex justify-center gap-3 text-[11px] uppercase tracking-[0.1em]">
          <span className="tabular-nums">
            {String(index + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
          </span>
          <span className="text-muted">{label}</span>
        </div>
      </div>
    </section>
  );
}
