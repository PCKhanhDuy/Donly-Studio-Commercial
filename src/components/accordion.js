"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "@/components/icons";
import { EASE } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-media-query";

/*
  Accordion cho phần câu hỏi thường gặp.

  Dùng button + aria-expanded + region thay vì <details> gốc, vì <details> không cho phép
  chuyển tiếp chiều cao — nội dung bật ra tức thì, giật cả trang khi câu trả lời dài.
  Ở đây chiều cao chạy từ 0 đến auto trong 450ms, dấu cộng xoay 45° thành dấu X.

  Mỗi lần chỉ mở một mục: người đọc không phải cuộn qua một bức tường chữ để tìm câu tiếp theo.
*/
export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);
  const reduced = usePrefersReducedMotion();
  const baseId = useId();

  return (
    <div className="divide-y divide-rule border-y border-rule">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;

        return (
          <div key={item.q}>
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left"
              >
                <span className="font-ui text-lg font-semibold tracking-tight">
                  {item.q}
                </span>
                <Plus
                  className={`size-5 shrink-0 transition-transform duration-400 ease-donly ${
                    isOpen ? "rotate-45" : ""
                  }`}
                />
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  key="panel"
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={reduced ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduced ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="max-w-3xl pb-6 leading-relaxed text-fg/70">
                    {item.a}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
