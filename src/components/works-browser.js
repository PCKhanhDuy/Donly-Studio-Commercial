"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import WorkCard from "@/components/work-card";
import WorksList from "@/components/works-list";
import { EASE } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-media-query";

/*
  Trình duyệt portfolio: lọc theo loại hình + đổi giữa hai cách xem.

    Danh sách (mặc định) — mục lục kiểu ấn phẩm in, ảnh bám con trỏ. Quét nhanh, đọc được
                           tên client và loại hình mà không phải cuộn qua hàng loạt ảnh.
    Lưới                 — xem bằng mắt, ảnh lớn, dành cho lúc muốn ngắm.

  Mặc định là danh sách vì với 8 dự án trở lên, danh sách cho người xem nắm được phạm vi
  công việc chỉ trong một màn hình — điều mà lưới ảnh không làm được.

  Khi đổi bộ lọc hoặc cách xem, khối cũ mờ đi hẳn rồi khối mới mới hiện (AnimatePresence
  mode="wait") — tránh cảnh các thẻ nhảy chồng chéo lên nhau.
*/
export default function WorksBrowser({
  works,
  categories,
  categoryLabel,
  locale,
  dict,
}) {
  const [active, setActive] = useState("all");
  const [view, setView] = useState("list");
  const reduced = usePrefersReducedMotion();

  const filtered =
    active === "all" ? works : works.filter((work) => work.category === active);

  const views = [
    { id: "list", label: dict.works.viewList },
    { id: "grid", label: dict.works.viewGrid },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-6 border-b border-rule pb-6">
        <div
          className="flex flex-wrap gap-x-8 gap-y-3"
          role="group"
          aria-label={dict.works.filterAria}
        >
          {categories.map((category) => {
            const selected = category.slug === active;

            return (
              <button
                key={category.slug}
                type="button"
                onClick={() => setActive(category.slug)}
                aria-pressed={selected}
                className={`label relative pb-1.5 transition-colors duration-300 ease-soft ${
                  selected ? "text-fg" : "text-fg-mute hover:text-fg"
                }`}
              >
                {category.label}
                {selected ? (
                  <motion.span
                    layoutId="works-filter-underline"
                    className="absolute inset-x-0 bottom-0 h-px bg-fg"
                    transition={reduced ? { duration: 0 } : { duration: 0.5, ease: EASE }}
                  />
                ) : null}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-6">
          <p aria-live="polite" className="label text-fg-mute">
            {String(filtered.length).padStart(2, "0")} {dict.works.projectsCount}
          </p>

          <div
            className="flex items-center gap-4 border-l border-rule pl-6"
            role="group"
            aria-label={dict.works.viewAria}
          >
            {views.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setView(item.id)}
                aria-pressed={view === item.id}
                className={`label relative pb-1.5 transition-colors duration-300 ease-soft ${
                  view === item.id ? "text-fg" : "text-fg-mute hover:text-fg"
                }`}
              >
                {item.label}
                {view === item.id ? (
                  <motion.span
                    layoutId="works-view-underline"
                    className="absolute inset-x-0 bottom-0 h-px bg-fg"
                    transition={reduced ? { duration: 0 } : { duration: 0.5, ease: EASE }}
                  />
                ) : null}
              </button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`${view}-${active}`}
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduced ? undefined : { opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="mt-12"
        >
          {view === "list" ? (
            <WorksList
              works={filtered}
              locale={locale}
              categoryLabel={categoryLabel}
            />
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((work, index) => (
                <WorkCard
                  key={work.slug}
                  work={work}
                  index={index + 1}
                  locale={locale}
                  viewLabel={dict.common.view}
                  categoryLabel={categoryLabel[work.category]}
                  preload={index < 3}
                  revealDelay={Math.min(index, 2) * 0.08}
                />
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
