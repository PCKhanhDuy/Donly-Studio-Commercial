"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { ArrowRight } from "@/components/icons";
import { EASE, EASE_SOFT } from "@/lib/motion";
import { useFinePointer } from "@/lib/use-media-query";

/*
  Danh sách dự án kiểu mục lục ấn phẩm in.

  Mỗi hàng có bốn phần, ngăn nhau bằng lưới 12 cột:
    số thứ tự · tên client cỡ lớn · tên dự án · chip loại hình + năm + mũi tên

  Chip loại hình là ô có viền chứ không phải chữ trơn — nó cho hàng một điểm neo thị giác
  ở cột phải, và cả cột chip xếp thẳng nhau thành một dải đọc được theo chiều dọc.

  Khi rê chuột lên một hàng:
    · nền hàng nâng lên một nấc (surface → panel), toàn hàng đẩy sang phải
    · số thứ tự và mũi tên sáng lên
    · các hàng còn lại mờ đi
    · ảnh bìa bám theo con trỏ — chỉ trên thiết bị có chuột
*/
export default function WorksList({ works, locale, categoryLabel }) {
  const finePointer = useFinePointer();
  const [active, setActive] = useState(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const config = { stiffness: 260, damping: 28, mass: 0.4 };
  const previewX = useSpring(x, config);
  const previewY = useSpring(y, config);

  function handleMouseMove(event) {
    if (!finePointer) return;
    x.set(event.clientX);
    y.set(event.clientY);
  }

  const activeWork = active !== null ? works[active] : null;

  return (
    <div onMouseMove={handleMouseMove} onMouseLeave={() => setActive(null)}>
      <ul className="border-t border-rule">
        {works.map((work, index) => {
          const hovered = finePointer && active === index;
          const dimmed = finePointer && active !== null && active !== index;

          return (
            <li key={work.slug} className="border-b border-rule">
              <Link
                href={`/${locale}/works/${work.slug}`}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                className={`group grid grid-cols-12 items-center gap-x-4 gap-y-3 px-3 py-6 transition-all duration-500 ease-donly md:gap-x-8 md:px-5 md:py-8 ${
                  dimmed ? "opacity-30" : "opacity-100"
                } ${hovered ? "bg-panel md:translate-x-2" : ""}`}
              >
                <span
                  className={`label col-span-2 transition-colors duration-500 ease-soft md:col-span-1 ${
                    hovered ? "text-fg" : "text-fg-mute"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="col-span-10 font-display text-[1.75rem] leading-none font-bold tracking-tight md:col-span-4 md:text-[2.5rem]">
                  {work.client}
                </h3>

                <p className="col-span-8 col-start-3 text-fg/55 md:col-span-3 md:col-start-auto">
                  {work.title}
                </p>

                {/* Chip loại hình — ô viền, không phải chữ trơn */}
                <span
                  className={`label col-span-4 justify-self-end border px-3 py-2 transition-colors duration-500 ease-soft md:col-span-2 md:justify-self-start ${
                    hovered ? "border-fg text-fg" : "border-rule text-fg-mute"
                  }`}
                >
                  {categoryLabel[work.category]}
                </span>

                <span className="label hidden text-fg-mute md:col-span-1 md:block">
                  {work.year}
                </span>

                <ArrowRight
                  className={`col-span-1 hidden size-5 justify-self-end transition-all duration-500 ease-donly md:block ${
                    hovered ? "translate-x-1.5 text-fg" : "text-fg-mute"
                  }`}
                />
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Ảnh bám con trỏ */}
      {finePointer ? (
        <motion.div
          aria-hidden="true"
          style={{ left: previewX, top: previewY, x: "-50%", y: "-50%" }}
          className="pointer-events-none fixed z-40 hidden w-[clamp(240px,20vw,320px)] lg:block"
        >
          <AnimatePresence mode="wait">
            {activeWork?.cover?.src ? (
              <motion.div
                key={activeWork.slug}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: EASE_SOFT }}
                className="relative aspect-3/4 overflow-hidden"
              >
                <Image
                  src={activeWork.cover.src}
                  alt=""
                  fill
                  sizes="320px"
                  className="object-cover"
                />
                <motion.div
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.06 }}
                  className="absolute inset-x-0 bottom-0 bg-linear-to-t from-ink/80 to-transparent p-4 text-paper"
                >
                  <p className="label">{activeWork.title}</p>
                </motion.div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      ) : null}
    </div>
  );
}
