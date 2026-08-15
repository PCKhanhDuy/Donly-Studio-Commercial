"use client";

import { Fragment } from "react";
import { motion } from "motion/react";
import { EASE } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-media-query";

/*
  Chữ trồi lên từ dưới mặt nạ, từng từ một.

  Đây là hiệu ứng chủ đạo cho các tiêu đề lớn — kiểu trình bày quen thuộc của ấn phẩm editorial:
  chữ như được kéo lên khỏi một dòng kẻ. Chỉ dùng cho heading, không dùng cho đoạn văn dài
  (vừa nặng máy, vừa làm người đọc mất kiên nhẫn).

  Mỗi từ nằm trong một span .text-mask (overflow hidden, đã bù phần đuôi chữ g/y/p),
  bên trong là span dịch từ 110% lên 0. Dấu cách nằm NGOÀI mặt nạ — nếu để bên trong,
  inline-block sẽ nuốt mất và các từ dính liền nhau.

  Về trình đọc màn hình: thẻ cha mang aria-label chứa nguyên câu, từng từ đặt aria-hidden,
  nên nội dung vẫn được đọc liền mạch chứ không bị ngắt vụn.
*/
export default function TextReveal({
  text,
  as = "h2",
  className = "",
  delay = 0,
  gap = 0.045,
  duration = 0.95,
  amount = 0.4,
  once = true,
}) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    const Plain = as;
    return <Plain className={className}>{text}</Plain>;
  }

  const MotionTag = motion[as] ?? motion.h2;
  const words = String(text).split(" ");

  return (
    <MotionTag
      className={className}
      aria-label={text}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: gap, delayChildren: delay } },
      }}
    >
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span className="text-mask" aria-hidden="true">
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: "110%" },
                visible: { y: "0%", transition: { duration, ease: EASE } },
              }}
            >
              {word}
            </motion.span>
          </span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </MotionTag>
  );
}
