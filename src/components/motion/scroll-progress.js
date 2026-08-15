"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/use-media-query";

/*
  Vạch tiến độ đọc, dày đúng 1px, chạy ngang đỉnh màn hình.

  Dùng mix-blend-difference nên vạch tự đảo màu theo nền phía dưới: đen trên nền trắng,
  trắng trên nền đen. Nhờ vậy nó luôn nhìn thấy được khi cuộn qua các section đen/trắng xen kẽ
  mà không cần thêm bất kỳ màu nào ngoài bảng màu.
*/
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduced = usePrefersReducedMotion();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    mass: 0.3,
  });

  if (reduced) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-60 h-px origin-left bg-paper mix-blend-difference"
    />
  );
}
