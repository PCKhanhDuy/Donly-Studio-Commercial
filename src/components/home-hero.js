"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown } from "@/components/icons";
import { usePrefersReducedMotion } from "@/lib/use-media-query";

/*
  HERO — CHỈ ẢNH, KHÔNG CHỮ.

  Bản trước chia đôi màn hình: nửa trái là wordmark cỡ 128px, dòng tagline, hai nút; nửa
  phải là ảnh. Tên studio đã nằm sẵn ở thanh menu ngay phía trên, nên khối chữ đó chỉ lặp
  lại một lần nữa ở cỡ rất lớn và đẩy ảnh xuống còn nửa màn hình.

  Ở đây ảnh chiếm trọn bề ngang. Ba tấm bìa tự chuyển cho nhau bằng cách mờ chồng, mỗi
  tấm dừng 5 giây và phóng rất chậm trong suốt thời gian đó — đủ để thấy là hình đang
  sống, không đủ để gây chú ý. Cuộn xuống thì ảnh trôi chậm hơn trang (parallax) rồi tối
  dần đi, nhường chỗ cho phần danh mục bên dưới.

  Phần duy nhất không phải ảnh là vạch đếm ở đáy và mũi tên cuộn — đều là ký hiệu,
  không phải chữ.
*/

const HOLD_MS = 5000;

export default function HomeHero({ images = [] }) {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);

  // Tối đa ba tấm: đủ để thấy phạm vi công việc, không thành slideshow dài dòng
  const slides = images.slice(0, 3);

  useEffect(() => {
    if (reduced || slides.length < 2) return;
    const timer = setInterval(
      () => setActive((current) => (current + 1) % slides.length),
      HOLD_MS,
    );
    return () => clearInterval(timer);
  }, [reduced, slides.length]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const veil = useTransform(scrollYProgress, [0, 1], [0, 0.55]);

  return (
    <section
      ref={ref}
      aria-label={slides[0]?.alt ?? ""}
      className="relative min-h-[88svh] overflow-hidden bg-panel lg:min-h-svh"
    >
      <motion.div
        style={reduced ? undefined : { y: imageY }}
        className="absolute -top-[9%] right-0 -bottom-[9%] left-0"
      >
        {slides.map((image, index) => (
          <motion.div
            key={image.src}
            aria-hidden={index === active ? undefined : "true"}
            initial={false}
            animate={{
              opacity: index === active ? 1 : 0,
              scale: reduced || index !== active ? 1 : 1.06,
            }}
            transition={{
              opacity: { duration: 1.4, ease: "easeInOut" },
              scale: { duration: HOLD_MS / 1000 + 1.4, ease: "linear" },
            }}
            className="absolute inset-0"
          >
            <Image
              src={image.src}
              alt={index === 0 ? (image.alt ?? "") : ""}
              fill
              preload={index === 0}
              sizes="100vw"
              className="object-cover object-[50%_28%]"
            />
          </motion.div>
        ))}
      </motion.div>

      {/*
        Vệt tối ở mép trên. Thanh menu nằm đè lên hero, mà bìa có tấm nền sáng (tường đá,
        nắng) — chữ menu trắng đặt lên đó gần như không đọc được. Vệt này chỉ tối ở mép và
        tan hết trong khoảng 160px nên không làm bẩn ảnh.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-ink/65 to-transparent"
      />

      {/* Màn tối dâng lên theo lúc cuộn, để chữ ở section kế tiếp không đối đầu với ảnh */}
      <motion.div
        aria-hidden="true"
        style={reduced ? undefined : { opacity: veil }}
        className="absolute inset-0 bg-surface"
      />

      {/* Vạch đếm — mỗi tấm một vạch, vạch đang chạy sáng lên */}
      {slides.length > 1 ? (
        <div className="absolute bottom-8 left-5 flex gap-2 md:left-10 lg:left-16 xl:left-24">
          {slides.map((image, index) => (
            <span
              key={image.src}
              aria-hidden="true"
              className={`h-px w-10 transition-colors duration-700 ease-soft ${
                index === active ? "bg-paper" : "bg-paper/25"
              }`}
            />
          ))}
        </div>
      ) : null}

      <ArrowDown
        aria-hidden="true"
        className="nudge absolute bottom-7 left-1/2 size-5 -translate-x-1/2 text-paper/70"
      />
    </section>
  );
}
