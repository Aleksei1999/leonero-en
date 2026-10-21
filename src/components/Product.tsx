"use client";

import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import { LOOKS, ORDER_URL, SIZES, formatPrice } from "@/data/collection";

const DETAILS = [
  [
    "Состав",
    "Искусственный мех, подкладка из вискозы. Мех не линяет и держит форму.",
  ],
  [
    "Как носить",
    "Поверх водолазки, пальто или платья. Высокий ворот закрывает шею от ветра.",
  ],
  ["Уход", "Деликатная ручная стирка при 30°, сушить в расправленном виде."],
  ["Доставка", "По России СДЭК, 2–5 дней. Обмен в течение 14 дней."],
];

export function Product() {
  const [i, setI] = useState(0);
  const [size, setSize] = useState(SIZES[1]);
  const [open, setOpen] = useState<number | null>(null);
  const look = LOOKS[i];
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  // вещь уезжает вверх, снизу выезжает модель в ней
  const garmentY = useTransform(scrollYProgress, [0.3, 0.7], ["0%", "-100%"]);
  const modelY = useTransform(scrollYProgress, [0.3, 0.7], ["100%", "0%"]);

  return (
    <section id="product" ref={ref} className="relative bg-paper md:h-[220vh]">
      <div className="grid grid-cols-1 pt-16 md:sticky md:top-0 md:h-screen md:grid-cols-[1fr_1.3fr_1fr]">
        <div className="flex flex-col justify-between gap-8 px-4 py-8 md:px-8">
          <h2 className="display text-[10vw] md:text-[3vw]">
            Один крой.
            <br />
            Пять
            <br />
            настроений.
          </h2>
          <p className="max-w-[300px] text-[13px] leading-relaxed text-muted">
            Накидку не нужно подбирать под фигуру: асимметричный крой ложится
            сам, а ворот держит форму без застёжек.
          </p>
        </div>

        <div className="relative aspect-[3/4] overflow-hidden bg-[#e7e3de] md:aspect-auto">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={look.id}
              className="absolute inset-0"
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 0.6 }}
            >
              <motion.img
                src={look.garment ?? look.product}
                alt={look.name}
                style={{ y: look.model ? garmentY : 0 }}
                className="absolute inset-0 h-full w-full object-cover"
              />
              {look.model && (
                <motion.img
                  src={look.model}
                  alt={`${look.name} на модели`}
                  style={{ y: modelY }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex flex-col gap-6 px-4 py-8 md:px-8">
          <div>
            <p className="text-[11px] uppercase tracking-[0.1em] text-muted">
              Осень–зима
            </p>
            <h3 className="mt-2 text-xl font-bold">{look.name}</h3>
            <p className="mt-1 text-[15px] tabular-nums">
              {formatPrice(look.price)}
            </p>
          </div>

          <div>
            <p className="mb-2 text-[11px] uppercase tracking-[0.1em]">
              Цвет <span className="text-muted">— {look.color}</span>
            </p>
            <div className="flex gap-2">
              {LOOKS.map((l, j) => (
                <button
                  key={l.id}
                  type="button"
                  aria-label={l.color}
                  onClick={() => setI(j)}
                  className={`h-7 w-7 rounded-full border transition ${j === i ? "border-ink ring-1 ring-ink ring-offset-2 ring-offset-paper" : "border-black/15"}`}
                  style={{ background: l.swatch }}
                />
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-[11px] uppercase tracking-[0.1em]">
              Размер
            </p>
            <div className="flex gap-2">
              {SIZES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={`border px-3 py-2 text-[12px] transition ${s === size ? "border-ink bg-ink text-paper" : "border-black/15"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <a
            href={`${ORDER_URL}`}
            target="_blank"
            rel="noreferrer"
            className="bg-ink py-3.5 text-center text-[12px] font-medium uppercase tracking-[0.1em] text-paper"
          >
            Заказать · {size}
          </a>

          <div className="border-t border-black/10">
            {DETAILS.map(([title, text], k) => (
              <div key={title} className="border-b border-black/10">
                <button
                  type="button"
                  onClick={() => setOpen(open === k ? null : k)}
                  className="flex w-full justify-between py-3 text-[12px] uppercase tracking-[0.08em]"
                >
                  {title}
                  <span>{open === k ? "−" : "+"}</span>
                </button>
                <AnimatePresence initial={false}>
                  {open === k && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden pb-3 text-[13px] leading-relaxed text-muted"
                    >
                      {text}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
