"use client";

import { ReactLenis } from "lenis/react";
import { usePrefersReducedMotion } from "@/lib/use-media-query";

/*
  Smooth scroll toàn trang bằng Lenis.

  lerp thấp (0.09) cho cảm giác trôi có quán tính nhưng vẫn bám tay — không "trượt" quá đà.
  syncTouch tắt: trên mobile giữ nguyên cuộn gốc của hệ điều hành, đó là thứ người dùng quen tay.
  anchors bật kèm offset -96px để link #services không bị header cố định che mất tiêu đề.

  Khi người dùng bật "giảm chuyển động", Lenis vẫn được mount (để không phải dựng lại cây React)
  nhưng chạy ở chế độ tức thời — cuộn nhảy thẳng tới đích, đúng như cuộn gốc.
*/
export default function SmoothScroll({ children }) {
  const reduced = usePrefersReducedMotion();

  const options = reduced
    ? {
        duration: 0,
        lerp: 1,
        smoothWheel: false,
        syncTouch: false,
        anchors: { offset: -96, immediate: true },
      }
    : {
        lerp: 0.09,
        wheelMultiplier: 0.9,
        smoothWheel: true,
        syncTouch: false,
        anchors: { offset: -96 },
      };

  return (
    <ReactLenis root options={options}>
      {children}
    </ReactLenis>
  );
}
