"use client";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { BASE_MODEL, type Look } from "@/data/collection";
import { HandsOpen } from "@/components/HandsOpen";

// сдвиги в % ширины кадра модели, а не экрана: на телефоне кадр шире экрана и вещи не налезают друг на друга
const GAP = 30;
const TRAIL = [
  { dx: 0, k: 1 },
  { dx: 2, k: 0.45 },
  { dx: 4, k: 0.2 },
];

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
// насколько вещь k «надета» при позиции прокрутки pos: 1 — ровно на модели
const worn = (k: number, pos: number) => 1 - clamp01(Math.abs(k - pos) / 0.32);

function ghostOpacity(d: number, narrow: boolean) {
  // на телефоне следующая вещь появляется только на подходе, чтобы на старте была модель в майке
  if (narrow) {
    if (d > 0.85) return 0;
    if (d > 0.3) return (0.32 * (0.85 - d)) / 0.55;
    return 0.32 * clamp01((d - 0.06) / 0.24);
  }
  if (d > 1.7) return 0;
  if (d > 1.1) return (0.32 * (1.7 - d)) / 0.6;
  if (d > 0.3) return 0.32;
  return 0.32 * clamp01((d - 0.06) / 0.24);
}

function useNarrow() {
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setNarrow(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return narrow;
}

function Ghost({
  look,
  k,
  pos,
  narrow,
}: {
  look: Look;
  k: number;
  pos: MotionValue<number>;
  narrow: boolean;
}) {
  const opacity = useTransform(pos, (v) =>
    ghostOpacity(Math.abs(k - v), narrow),
  );
  // невидимые слои не рисуем — иначе прокрутка дёргается
  const visibility = useTransform(opacity, (o) =>
    o > 0.005 ? "visible" : "hidden",
  );
  const aligned = Boolean(look.garment);
  return (
    <motion.div
      style={{ opacity, visibility }}
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
  const x = useTransform(pos, (v) => `${(k - v) * GAP + dx}%`);
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
  // размытие только во время смены: на полностью надетой вещи фильтр не считается
  const filter = useTransform(pos, (v) => {
    const w = worn(k, v);
    return w > 0 && w < 0.98 ? `blur(${(1 - w) * 10}px)` : "none";
  });
  const visibility = useTransform(opacity, (o) =>
    o > 0.005 ? "visible" : "hidden",
  );
  return (
    <motion.img
      src={look.model}
      alt={look.name}
      decoding="async"
      style={{ opacity, filter, visibility }}
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
  // начать блок с рук, распахивающих шубу
  opening?: boolean;
};

const INTRO = 220; // vh прокрутки на распахивание шубы
const STEP = 50; // vh прокрутки на одну вещь
const FIRST = 50; // первая вещь едет с той же скоростью, что и остальные

export function LookSwitcher({
  id,
  looks,
  title,
  note,
  primary,
  opening,
}: Props) {
  const N = looks.length + 1;
  const Heading = primary ? "h1" : "h2";
  const narrow = useNarrow();
  const ref = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const intro = opening ? INTRO : 0;
  const range = intro + FIRST + (N - 2) * STEP;
  const introEnd = intro / range;
  // накидка начинает ехать, как только под шубой видна модель, пока руки ещё уходят за края
  const start = introEnd * 0.5;
  const firstEnd = start + FIRST / range;
  const pos = useTransform(
    scrollYProgress,
    [start, firstEnd, 1],
    [0, 1, N - 1],
  );
  const handsP = useTransform(scrollYProgress, [0, introEnd || 1], [0, 1]);
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
      style={{ height: `${range + 100}vh` }}
      className="relative"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {opening && <HandsOpen p={handsP} />}
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
            <Ghost key={l.id} look={l} k={i + 1} pos={pos} narrow={narrow} />
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
