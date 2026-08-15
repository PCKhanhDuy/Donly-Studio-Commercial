"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "@/components/icons";
import { EASE } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-media-query";

/*
  BẢNG DỊCH VỤ — mỗi loại hình MỘT DÒNG, các cột thẳng hàng.

  Bản trước là ba thẻ cao gần một màn hình: mỗi thẻ có một khung mẫu cao 256px, tên cỡ
  36px, một dòng tagline in nghiêng, bốn gạch đầu dòng bàn giao, một số chìm cỡ 208px ở
  góc, rồi liên kết ở chân. Ba thẻ như vậy nhồi quá nhiều chữ cho một phần mà người xem
  chỉ cần biết: có mấy loại hình, mỗi loại chụp gì, tỷ lệ nào.

  Ở đây đúng ba dòng, đọc ngang được như một bảng giá: số · tên · mô tả một câu · tỷ lệ.
  Chi tiết bàn giao để ở trang /services, không đổ hết ra trang chủ.

  Hover: cả dòng sáng lên và thụt vào một chút — chuyển động ngắn, không phóng to gì.
*/
export default function ServiceCards({ services, locale, detailsLabel, className = "" }) {
  const reduced = usePrefersReducedMotion();

  return (
    <ul className={`border-t border-rule ${className}`}>
      {services.map((service, index) => (
        <motion.li
          key={service.slug}
          initial={reduced ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE, delay: index * 0.06 }}
          className="border-b border-rule"
        >
          <Link
            href={`/${locale}/services#${service.slug}`}
            className="group grid grid-cols-12 items-baseline gap-x-4 gap-y-2 py-5 transition-[padding] duration-500 ease-donly hover:pl-2 md:gap-x-6 md:py-6"
          >
            <span className="label col-span-2 text-fg-mute tabular-nums md:col-span-1">
              {service.index}
            </span>

            <h3 className="col-span-10 font-display text-xl leading-none font-bold tracking-tight transition-opacity duration-400 ease-soft group-hover:opacity-70 md:col-span-3 md:text-2xl">
              {service.name}
            </h3>

            <p className="col-span-12 col-start-3 font-body text-sm leading-relaxed text-fg/55 md:col-span-6 md:col-start-auto">
              {service.tagline}
            </p>

            <span className="col-span-12 col-start-3 flex items-center justify-between gap-4 md:col-span-2 md:col-start-auto md:justify-end">
              <span className="label text-fg-mute tabular-nums">{service.ratioShort}</span>
              <span className="flex items-center gap-2 font-ui text-sm md:hidden">
                {detailsLabel}
              </span>
              <ArrowRight className="size-4 shrink-0 text-fg-mute transition-all duration-500 ease-donly group-hover:translate-x-1 group-hover:text-fg" />
            </span>
          </Link>
        </motion.li>
      ))}
    </ul>
  );
}
