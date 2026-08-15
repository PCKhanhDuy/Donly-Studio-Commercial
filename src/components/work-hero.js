"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import Container from "@/components/container";
import Logo from "@/components/logo";
import { SpecPlaceholder } from "@/components/frame";
import { EASE } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-media-query";

/*
  Hero của trang case study.

  Ba trường hợp ảnh nền, theo đúng thứ tự ưu tiên:

    1. TRIPTYCH — dự án chỉ có ảnh DỌC (lookbook 4:5). Ba ảnh xếp ngang, mỗi ảnh giữ
       nguyên tỷ lệ gốc và cao bằng cả dải. Ba khung 4:5 cạnh nhau cho tỷ lệ tổng 12:5,
       vừa khít một dải hero rộng — nên không phải xén dọc, không cắt mất đầu hay chân.
       Hai ảnh ngoài rìa có thể bị cắt bớt bề ngang, điều đó thì vô hại.
    2. MỘT ẢNH NGANG — phủ kín dải bằng object-cover như bình thường.
    3. CHƯA CÓ ẢNH — vẽ khung spec, để dải hero vẫn có hình khối chứ không trống hoác.

  Chữ đặt góc dưới trái theo đúng quy ước text-on-image của guideline mục 4.
  Chuyển động: ảnh trôi chậm, chữ trôi nhanh hơn và mờ dần.
*/
export default function WorkHero({
  client,
  title,
  image,
  triptych,
  clientLabel,
  studioLabel,
}) {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const backdropY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const words = String(title).split(" ");
  const strip = Array.isArray(triptych) ? triptych.filter((i) => i?.src) : [];

  return (
    <section
      ref={ref}
      className="relative flex h-[72svh] min-h-[440px] flex-col justify-end overflow-hidden bg-ink text-paper md:h-[82svh]"
    >
      <motion.div
        style={reduced ? undefined : { y: backdropY }}
        className="absolute top-0 right-0 left-0 -bottom-[16%]"
        aria-hidden="true"
      >
        {strip.length > 0 ? (
          <div className="flex h-full justify-center">
            {strip.map((item, index) => (
              <div
                key={`${item.src}-${index}`}
                className={`relative h-full shrink-0 aspect-4/5 ${
                  index === 0 ? "" : "hidden md:block"
                } ${index === 2 ? "hidden lg:block" : ""}`}
              >
                {/*
                  Preload CẢ BA khung: cả ba đều nằm trên màn hình đầu tiên, nên bất kỳ
                  khung nào cũng có thể là ảnh LCP tuỳ chiều rộng màn hình. Chỉ preload
                  khung đầu thì hai khung còn lại tải muộn và kéo LCP xuống.
                */}
                <Image
                  src={item.src}
                  alt=""
                  fill
                  preload
                  sizes="40vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        ) : image?.src ? (
          <Image src={image.src} alt="" fill preload sizes="100vw" className="object-cover" />
        ) : (
          <SpecPlaceholder ratio={image?.ratio ?? "16:9"} tone={image?.tone ?? 5} />
        )}
      </motion.div>

      <div
        className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-ink/90 via-ink/40 to-transparent"
        aria-hidden="true"
      />

      <motion.div
        style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative"
      >
        <Container className="pb-12 md:pb-16">
          <motion.p
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
            className="label text-paper/70"
          >
            {clientLabel}: {client}
          </motion.p>

          <h1
            aria-label={title}
            className="mt-6 max-w-3xl font-display text-[2.5rem] leading-[1.08] font-bold tracking-tight md:text-5xl lg:text-[3.5rem]"
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
            className="mt-10 flex items-center gap-4"
          >
            <Logo shape="full" tone="paper" loading="eager" className="h-5 w-auto md:h-6" />
            <span className="font-ui text-[0.6875rem] font-medium tracking-[0.24em] text-paper/70 uppercase">
              {studioLabel}
            </span>
          </motion.div>
        </Container>
      </motion.div>
    </section>
  );
}
