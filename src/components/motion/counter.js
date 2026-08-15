"use client";

import { useRef, useSyncExternalStore } from "react";
import NumberFlow from "@number-flow/react";
import { useInView } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/use-media-query";

/*
  Số liệu đếm lên khi khối vào khung nhìn. Nhận chuỗi dạng "180+", "24h", "6"
  — phần số được đếm, phần đuôi giữ nguyên.

  Dùng NumberFlow: từng chữ số cuộn như bảng cơ khí thay vì chỉ nhảy giá trị,
  và nó tự khớp chiều rộng nên con số không làm giật bố cục khi đổi từ 1 sang 3 chữ số.

  VỀ SSR: `mounted` đọc bằng useSyncExternalStore với getServerSnapshot trả false.
  React dùng getServerSnapshot trong lúc hydrate, nên HTML server và lần render đầu ở
  client đều là GIÁ TRỊ THẬT — không lệch hydration, và nếu JS không chạy thì con số
  vẫn hiển thị đúng thay vì đứng ở 0. Chỉ sau khi hydrate xong nó mới về 0 rồi đếm lên.
*/

const noop = () => () => {};

export default function Counter({ value, className = "" }) {
  const match = /^(\d+)(.*)$/.exec(String(value));
  const target = match ? Number(match[1]) : 0;
  const suffix = match ? match[2] : "";

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = usePrefersReducedMotion();
  const mounted = useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );

  if (!match) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  // Trước khi hydrate xong, và khi người dùng tắt chuyển động: hiện thẳng giá trị thật
  const shown = !mounted || reduced || inView ? target : 0;

  return (
    <span ref={ref} className={className}>
      <NumberFlow
        value={shown}
        animated={mounted && !reduced}
        transformTiming={{ duration: 1200, easing: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        spinTiming={{ duration: 1200, easing: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        willChange
      />
      {suffix}
    </span>
  );
}
