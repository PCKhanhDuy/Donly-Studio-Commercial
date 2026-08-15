"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/use-media-query";

/*
  Parallax nhẹ theo scroll.

  `speed` là biên độ dịch chuyển tính theo % chiều cao phần tử. Giữ ở mức 0.06–0.15:
  đủ để mắt cảm nhận chiều sâu, chưa đủ để nhận ra đó là hiệu ứng. Vượt quá 0.2 là bắt đầu
  rẻ tiền và gây khó chịu khi cuộn nhanh.

  Giá trị được đưa qua spring để khi cuộn giật (trackpad, chuột lăn nhanh) chuyển động vẫn mượt.
*/
export default function Parallax({
  speed = 0.1,
  className = "",
  children,
  ...rest
}) {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  const y = useTransform(
    smooth,
    [0, 1],
    [`${-speed * 100}%`, `${speed * 100}%`],
  );

  if (reduced) {
    return (
      <div ref={ref} className={className} {...rest}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={className} {...rest}>
      <motion.div style={{ y }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}
