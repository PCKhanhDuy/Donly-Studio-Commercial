"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "motion/react";
import Frame from "@/components/frame";
import ImageReveal from "@/components/motion/image-reveal";
import { ArrowRight } from "@/components/icons";
import { EASE_SOFT } from "@/lib/motion";
import { useFinePointer } from "@/lib/use-media-query";

/*
  Thẻ dự án trong lưới portfolio.

  Bố cục: một hàng meta mảnh nằm TRÊN ảnh (số thứ tự — loại hình), ảnh ở giữa, và hàng
  tên client nằm dưới. Hai nét kẻ ôm lấy ảnh biến mỗi thẻ thành một khung có hệ thống
  chứ không phải một tấm ảnh thả trôi kèm caption.

  Ba lớp tương tác, theo thứ tự người dùng cảm nhận:
    1. Ảnh lộ ra kiểu kéo rèm khi cuộn tới
    2. Hover: ảnh phóng 1.04 trong 500ms (guideline mục 5), tên client gạch chân dần
    3. Chỉ trên thiết bị có chuột: ô "Xem" bám theo con trỏ với độ trễ đàn hồi

  Ô "Xem" giữ góc vuông và chỉ dùng đen/trắng — guideline cấm bo góc lớn và cấm màu
  ngoài bảng. Trên thiết bị cảm ứng, toàn bộ lớp 3 không được render.
*/
export default function WorkCard({
  work,
  locale,
  viewLabel,
  categoryLabel,
  index,
  preload = false,
  revealDelay = 0,
}) {
  const finePointer = useFinePointer();
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 350, damping: 32, mass: 0.35 };
  const cursorX = useSpring(x, springConfig);
  const cursorY = useSpring(y, springConfig);

  function handleMouseMove(event) {
    if (!finePointer) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - bounds.left);
    y.set(event.clientY - bounds.top);
  }

  return (
    <Link
      href={`/${locale}/works/${work.slug}`}
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* HÀNG META TRÊN ẢNH */}
      <div className="flex items-center justify-between gap-4 border-t border-rule pt-3 pb-4">
        <span className="label text-fg-mute">
          {typeof index === "number" ? String(index).padStart(2, "0") : categoryLabel}
        </span>
        <span className="label text-fg-mute">
          {typeof index === "number" ? categoryLabel : work.year}
        </span>
      </div>

      <ImageReveal delay={revealDelay} className={finePointer ? "cursor-none" : ""}>
        <Frame
          image={work.cover}
          zoom
          preload={preload}
          sizes="(min-width: 1024px) 45vw, (min-width: 640px) 50vw, 100vw"
        >
          {finePointer ? (
            <motion.span
              aria-hidden="true"
              style={{ left: cursorX, top: cursorY, x: "-50%", y: "-50%" }}
              initial={false}
              animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.5 }}
              transition={{ duration: 0.35, ease: EASE_SOFT }}
              className="pointer-events-none absolute z-10 grid size-20 place-items-center bg-ink text-paper"
            >
              <span className="label">{viewLabel}</span>
            </motion.span>
          ) : null}
        </Frame>
      </ImageReveal>

      {/* HÀNG TÊN DƯỚI ẢNH */}
      <div className="mt-5 flex items-end justify-between gap-4 border-b border-rule pb-4">
        <div>
          <h3 className="underline-draw inline font-display text-2xl leading-none font-bold tracking-tight md:text-[1.75rem]">
            {work.client}
          </h3>
          <p className="mt-3 text-sm text-fg-mute">{work.title}</p>
        </div>

        <span className="flex shrink-0 items-center gap-3">
          <span className="label text-fg-mute">{work.year}</span>
          <ArrowRight className="size-4 text-fg-mute transition-transform duration-500 ease-donly group-hover:translate-x-1.5 group-hover:text-fg" />
        </span>
      </div>
    </Link>
  );
}
