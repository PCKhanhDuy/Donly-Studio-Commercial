"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import Container from "@/components/container";
import Logo from "@/components/logo";
import { SpecPlaceholder } from "@/components/frame";
import { ArrowRight } from "@/components/icons";
import { EASE } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-media-query";

/*
  Dải dự án nổi bật: tràn viền hoàn toàn, cao gần hết màn hình, chen giữa các section
  có container. Đây là chỗ nhịp trang bị bẻ gãy — mắt đang quen với lề trái cố định
  thì đột ngột không còn lề nào nữa.

  Ảnh nền dùng cùng cách xử lý với hero case study: nếu dự án chỉ có ảnh DỌC thì xếp
  nhiều khung 4:5 cạnh nhau, mỗi khung giữ nguyên tỷ lệ gốc — không xén dọc nên không
  cắt mất đầu hay chân người trong ảnh.

  Chữ đặt đúng quy ước text-on-image của guideline mục 4:
    góc dưới trái → "CLIENT:" + tên client → wordmark DONLY → dòng STUDIO COMMERCIAL.
*/
export default function FeaturedBand({ work, locale, label, clientLabel, studioLabel }) {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  /*
    MỘT tấm ảnh duy nhất, không ghép nhiều tấm cạnh nhau.
    Ghép ảnh dọc để phủ kín một dải ngang luôn để lại đường nối giữa hai tấm và cắt ngang
    thân người ở chỗ giáp mí. Ở đây là một tấm, xén rộng theo chiều ngang và neo lên phía
    trên (object-top) để giữ lại phần đầu và thân trên — chỗ đáng nhìn của ảnh thời trang.
  */
  const single = work.hero?.src ? work.hero : work.cover;

  return (
    <section ref={ref} className="relative h-[86svh] min-h-[520px] overflow-hidden bg-ink">
      <motion.div
        style={reduced ? undefined : { y }}
        className="absolute -top-[8%] right-0 -bottom-[8%] left-0"
        aria-hidden="true"
      >
        {single?.src ? (
          <Image
            src={single.src}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[center_22%]"
          />
        ) : (
          <SpecPlaceholder ratio={single?.ratio ?? "16:9"} tone={single?.tone ?? 5} />
        )}
      </motion.div>

      <div
        className="absolute inset-x-0 bottom-0 h-3/4 bg-linear-to-t from-ink/85 via-ink/35 to-transparent"
        aria-hidden="true"
      />

      <div className="relative flex h-full flex-col justify-between py-12 md:py-16">
        <Container>
          <motion.span
            initial={reduced ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="label text-paper/70"
          >
            {label}
          </motion.span>
        </Container>

        <Container>
          <Link href={`/${locale}${work.href}`} className="group block text-paper">
            <motion.p
              initial={reduced ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="label text-paper/70"
            >
              {clientLabel}: {work.client}
            </motion.p>

            {/*
              whileInView đặt ở THẺ CHA, con chỉ nhận variants.
              Nếu đặt thẳng lên chính chữ đang bị đẩy xuống 110%, bộ quan sát khung nhìn
              đo theo vị trí ĐÃ dịch chuyển — chữ nằm ngoài vùng quan sát nên hiệu ứng
              không bao giờ kích hoạt và tiêu đề mất hút. Đây đúng là lỗi đã xảy ra.
            */}
            <motion.div
              className="mt-5 overflow-hidden"
              initial={reduced ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.h2
                variants={{
                  hidden: { y: "110%" },
                  visible: {
                    y: "0%",
                    transition: { duration: 1.1, ease: EASE, delay: 0.08 },
                  },
                }}
                className="font-display text-[2.5rem] leading-[1.05] font-bold tracking-tight md:text-6xl lg:text-[4.5rem]"
              >
                {work.title}
              </motion.h2>
            </motion.div>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
              className="mt-10 flex flex-wrap items-end justify-between gap-6"
            >
              <div className="flex items-center gap-4">
                <Logo shape="full" tone="paper" loading="eager" className="h-5 w-auto md:h-6" />
                <span className="font-ui text-[0.6875rem] font-medium tracking-[0.24em] text-paper/70 uppercase">
                  {studioLabel}
                </span>
              </div>

              <ArrowRight className="size-8 transition-transform duration-500 ease-donly group-hover:translate-x-3" />
            </motion.div>
          </Link>
        </Container>
      </div>
    </section>
  );
}
