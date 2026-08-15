"use client";

import { motion } from "motion/react";
import { EASE } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-media-query";

/*
  Ảnh hiện dần khi vào khung nhìn: mờ → rõ, đồng thời thu nhẹ từ 1.06 về 1.

  TRƯỚC ĐÂY component này animate `clip-path` kiểu kéo rèm. Nhìn đẹp hơn, nhưng thực tế
  chạy thì rèm KHÔNG BAO GIỜ MỞ — ảnh trong thẻ dự án bị che trắng vĩnh viễn. Kiểm tra
  trực tiếp trong trình duyệt: phần tử nằm trọn khung nhìn, chờ 2.5 giây, clip-path vẫn
  đứng nguyên ở `inset(0% 0% 100%)`.

  Nên ở đây chỉ dùng `opacity` và `transform` — đúng hai thuộc tính mà <Reveal> và
  <TextReveal> đang chạy ổn định trên cùng trang. Đánh đổi một chút hiệu ứng để lấy
  thứ chắc chắn hiện ra: một tấm ảnh không hiện thì không có hiệu ứng nào cứu được.
*/
export default function ImageReveal({
  className = "",
  delay = 0,
  duration = 1,
  amount = 0.15,
  once = true,
  children,
}) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return <div className={`overflow-hidden ${className}`}>{children}</div>;
  }

  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial={{ opacity: 0, scale: 1.06 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once, amount }}
      transition={{ duration, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
