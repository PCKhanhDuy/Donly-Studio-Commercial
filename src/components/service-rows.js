"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import Frame from "@/components/frame";
import { ArrowRight } from "@/components/icons";
import { EASE, EASE_SOFT } from "@/lib/motion";
import { useFinePointer } from "@/lib/use-media-query";

/*
  Ba dịch vụ trình bày thành BA HÀNG thay vì ba thẻ cạnh nhau.

  Lý do: ba thẻ bằng nhau là bố cục ai cũng dùng, và nó bắt mắt đọc theo chiều ngang —
  trong khi nội dung ở đây có thứ tự (01, 02, 03). Dạng hàng cho phép đặt số thứ tự
  cỡ lớn ở lề trái, và cho mỗi dịch vụ trọn chiều ngang để thở.

  Khi rê chuột lên một hàng (chỉ trên thiết bị có chuột):
    · số thứ tự chuyển từ xám nhạt sang đen đặc
    · cả hàng đẩy nhẹ sang phải
    · khung tỷ lệ của dịch vụ đó trượt vào từ bên phải — nhìn là biết ngay
      lookbook dọc, campaign ngang hay product vuông
*/
export default function ServiceRows({ services, locale, detailsLabel, className = "" }) {
  const finePointer = useFinePointer();
  const [active, setActive] = useState(null);

  return (
    <div className={`divide-y divide-rule border-y border-rule ${className}`}>
      {services.map((service, index) => {
        const hovered = finePointer && active === index;

        return (
          <Link
            key={service.slug}
            href={`/${locale}/services#${service.slug}`}
            onMouseEnter={() => setActive(index)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(index)}
            onBlur={() => setActive(null)}
            className={`group relative grid items-start gap-6 py-10 transition-transform duration-500 ease-donly md:grid-cols-12 md:gap-8 md:py-14 ${
              hovered ? "md:translate-x-2" : ""
            }`}
          >
            <span
              className={`font-display text-4xl leading-none font-black transition-colors duration-500 ease-soft md:col-span-2 md:text-6xl ${
                hovered ? "text-fg" : "text-rule"
              }`}
            >
              {service.index}
            </span>

            <div className="md:col-span-4">
              <h3 className="font-ui text-2xl font-bold tracking-tight md:text-3xl">
                {service.name}
              </h3>
              <p className="mt-4 font-display text-lg italic text-fg/60">
                {service.tagline}
              </p>
            </div>

            <div className="md:col-span-4">
              <p className="leading-relaxed text-fg/70">{service.description}</p>
            </div>

            <div className="flex flex-col justify-between gap-6 md:col-span-2">
              <p className="text-sm text-fg-mute">{service.ratio}</p>
              <span className="inline-flex items-center gap-2 font-ui text-[0.9375rem]">
                <span className="border-b border-current pb-0.5">{detailsLabel}</span>
                <ArrowRight className="size-4 transition-transform duration-400 ease-donly group-hover:translate-x-1.5" />
              </span>
            </div>

            {/* Khung tỷ lệ trượt vào khi hover — chỉ dựng trên màn lớn có chuột */}
            {finePointer ? (
              <AnimatePresence>
                {hovered ? (
                  <motion.div
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="pointer-events-none absolute top-1/2 right-0 hidden w-40 -translate-y-1/2 xl:block"
                    aria-hidden="true"
                  >
                    <Frame image={service.image} />
                  </motion.div>
                ) : null}
              </AnimatePresence>
            ) : null}

            {/* Nét kẻ chạy ngang chân hàng khi hover */}
            <motion.span
              aria-hidden="true"
              initial={false}
              animate={{ scaleX: hovered ? 1 : 0 }}
              transition={{ duration: 0.6, ease: EASE_SOFT }}
              className="absolute inset-x-0 -bottom-px h-px origin-left bg-fg"
            />
          </Link>
        );
      })}
    </div>
  );
}
