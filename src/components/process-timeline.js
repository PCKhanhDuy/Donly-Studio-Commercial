"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { EASE } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-media-query";

/*
  Quy trình 5 bước dựng thành STEPPER: mỗi bước là một ô có viền, không phải một cột chữ trôi.

  Cấu trúc từng ô:
    · nét kẻ trên cùng dày lên khi tới lượt
    · số bước ở thanh meta + số chìm cỡ lớn làm nền
    · tên bước, rồi phần mô tả ngăn bằng một nét kẻ nữa

  Xuyên qua cả hàng là một ĐƯỜNG RAY tự vẽ theo lượt cuộn, kèm chấm mốc trên mỗi ô.
  Năm ô chữ xếp cạnh nhau không nói lên rằng đây là một chuỗi có thứ tự; đường ray thì có.
*/
export default function ProcessTimeline({ steps, className = "" }) {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 65%"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.3,
  });

  const scale = useTransform(progress, (v) => (reduced ? 1 : v));

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* ĐƯỜNG RAY — nền mảnh, luôn hiện */}
      <span
        aria-hidden="true"
        className="absolute top-0 left-[7px] h-full w-px bg-rule md:top-0 md:left-0 md:h-px md:w-full"
      />
      {/* ĐƯỜNG RAY — phần đã đi qua, tự vẽ theo lượt cuộn */}
      <motion.span
        aria-hidden="true"
        style={{ scaleY: scale, scaleX: scale }}
        className="absolute top-0 left-[7px] h-full w-px origin-top bg-fg md:top-0 md:left-0 md:h-px md:w-full md:origin-left"
      />

      <ol className="grid gap-px bg-rule md:grid-cols-5">
        {steps.map((step, index) => (
          <motion.li
            key={step.step}
            initial={reduced ? false : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease: EASE, delay: index * 0.07 }}
            className="group relative overflow-hidden bg-surface pt-8 pb-9 pl-9 transition-colors duration-500 ease-soft hover:bg-panel md:px-6 md:pl-6"
          >
            {/* CHẤM MỐC trên đường ray */}
            <span
              aria-hidden="true"
              className="absolute top-[-7px] left-0 size-3.5 rotate-45 border border-fg bg-surface md:top-[-7px] md:left-6"
            />

            {/* SỐ CHÌM làm nền */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-2 -bottom-6 font-display text-[6.5rem] leading-none font-black text-fg/[0.05] transition-colors duration-500 ease-soft group-hover:text-fg/[0.09]"
            >
              {step.step}
            </span>

            <span className="label relative block text-fg-mute">{step.step}</span>

            <h3 className="relative mt-5 font-ui text-lg font-semibold tracking-tight">
              {step.name}
            </h3>

            <p className="relative mt-5 border-t border-rule pt-5 text-sm leading-relaxed text-fg/65">
              {step.body}
            </p>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
