"use client";

import { motion } from "motion/react";
import { DURATION, EASE, RISE, STAGGER } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-media-query";

/*
  Ba primitive dùng lại khắp site:

    <Reveal>        — một khối trồi lên + hiện dần khi vào khung nhìn
    <Stagger>       — khối cha, các con lần lượt trồi lên cách nhau vài chục ms
    <StaggerItem>   — con của Stagger

  Tất cả đều tự tắt khi người dùng bật "giảm chuyển động": nội dung hiện thẳng, không animation.
  Mặc định `once` = true — hiệu ứng chạy một lần, không lặp lại khi cuộn ngược, tránh gây rối mắt.
*/

/*
  motion là một Proxy có cache: motion.div, motion.li… được tạo một lần rồi giữ nguyên
  danh tính qua các lần render. Vì vậy phải TRA THẲNG (motion[as]) chứ không bọc trong
  một hàm trả về component — hàm đó bị xem là "tạo component trong lúc render",
  và React sẽ reset state của cây con mỗi lần render lại.
*/

export function Reveal({
  as = "div",
  className = "",
  delay = 0,
  y = RISE,
  duration = DURATION.base,
  amount = 0.2,
  once = true,
  children,
  ...rest
}) {
  const reduced = usePrefersReducedMotion();
  const Tag = motion[as] ?? motion.div;

  if (reduced) {
    const Plain = as;
    return (
      <Plain className={className} {...rest}>
        {children}
      </Plain>
    );
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function Stagger({
  as = "div",
  className = "",
  delay = 0,
  gap = STAGGER,
  amount = 0.15,
  once = true,
  children,
  ...rest
}) {
  const reduced = usePrefersReducedMotion();
  const Tag = motion[as] ?? motion.div;

  if (reduced) {
    const Plain = as;
    return (
      <Plain className={className} {...rest}>
        {children}
      </Plain>
    );
  }

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: gap, delayChildren: delay } },
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({
  as = "div",
  className = "",
  y = RISE,
  duration = DURATION.base,
  children,
  ...rest
}) {
  const reduced = usePrefersReducedMotion();
  const Tag = motion[as] ?? motion.div;

  if (reduced) {
    const Plain = as;
    return (
      <Plain className={className} {...rest}>
        {children}
      </Plain>
    );
  }

  return (
    <Tag
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        visible: { opacity: 1, y: 0, transition: { duration, ease: EASE } },
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
