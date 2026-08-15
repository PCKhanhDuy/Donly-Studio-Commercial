"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import Logo from "@/components/logo";
import { ArrowLeft } from "@/components/icons";
import { EASE } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-media-query";

/*
  Hero của một collection: MỘT tấm ảnh duy nhất, chia đôi màn hình với khối chữ.

  VÌ SAO KHÔNG GHÉP NHIỀU ẢNH NỮA:
  bản trước xếp ba đến bốn khung dọc cạnh nhau cho kín màn hình. Kết quả là giữa màn hình
  có một đường nối dọc rất rõ, người trong hai tấm bị cắt ngang thân ở chỗ giáp mí —
  nhìn như hai tấm ảnh bị dán ẩu vào nhau.

  Ở đây ảnh chiếm đúng nửa màn hình bên phải. Với màn 16:9, nửa màn hình có tỷ lệ xấp xỉ
  4:5 — đúng bằng tỷ lệ gốc của ảnh lookbook, nên ảnh vừa khít, gần như không xén,
  và không có mối nối nào cả.
*/
export default function CollectionHero({
  client,
  clientHref,
  title,
  image,
  clientLabel,
  studioLabel,
}) {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);

  const words = String(title).split(" ");

  return (
    <section
      ref={ref}
      className="relative grid min-h-[92svh] grid-cols-1 items-stretch lg:min-h-svh lg:grid-cols-2"
    >
      {/* KHỐI CHỮ */}
      <motion.div
        style={reduced ? undefined : { y: textY }}
        className="order-2 flex flex-col justify-end px-5 pt-12 pb-14 md:px-10 md:pb-20 lg:order-1 lg:px-16 lg:pb-24 xl:px-24"
      >
        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
        >
          <Link
            href={clientHref}
            className="group inline-flex items-center gap-2 border-b border-rule pb-4"
          >
            <ArrowLeft className="size-4 text-fg-mute transition-transform duration-400 ease-donly group-hover:-translate-x-1" />
            <span className="label text-fg-mute">
              {clientLabel}: {client}
            </span>
          </Link>
        </motion.div>

        <h1
          aria-label={title}
          className="mt-8 font-display text-[2.5rem] leading-[1.02] font-bold tracking-tight md:text-[3.5rem] lg:text-[4.5rem]"
        >
          {words.map((word, index) => (
            <span key={`${word}-${index}`}>
              <span className="text-mask" aria-hidden="true">
                <motion.span
                  className="inline-block"
                  initial={reduced ? false : { y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.1, ease: EASE, delay: 0.25 + index * 0.06 }}
                >
                  {word}
                </motion.span>
              </span>
              {index < words.length - 1 ? " " : null}
            </span>
          ))}
        </h1>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.6 }}
          className="mt-10 flex items-center gap-4 border-t border-rule pt-6"
        >
          <Logo shape="full" tone="paper" loading="eager" className="h-5 w-auto md:h-6" />
          <span className="font-ui text-[0.6875rem] font-medium tracking-[0.24em] text-fg-mute uppercase">
            {studioLabel}
          </span>
        </motion.div>
      </motion.div>

      {/* ẢNH — nửa màn hình bên phải, không có mối nối */}
      <div className="relative order-1 min-h-[52svh] overflow-hidden bg-panel lg:order-2 lg:min-h-svh">
        <motion.div
          style={reduced ? undefined : { y: imageY }}
          className="absolute -top-[6%] right-0 -bottom-[6%] left-0"
        >
          <Image
            src={image.src}
            alt={image.alt ?? ""}
            fill
            preload
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
