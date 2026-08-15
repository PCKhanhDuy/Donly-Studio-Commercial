"use client";

import { motion } from "motion/react";
import Counter from "@/components/motion/counter";
import { EASE } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-media-query";

/*
  Số liệu dựng thành DẢI DỮ LIỆU có ô, không phải bốn con số thả rời trên nền trống.

  Mỗi ô có: thanh chỉ số nhỏ ở trên (01–04), con số rất lớn, rồi nhãn nằm dưới một nét kẻ.
  Các ô ngăn nhau bằng đường kẻ 1px (gap-px trên nền rule) nên cả cụm đọc ra như một
  bảng thông số — thứ hợp với một studio bán sự chính xác.
*/
export default function StatBand({ stats, className = "" }) {
  const reduced = usePrefersReducedMotion();

  return (
    <div className={`grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-4 ${className}`}>
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE, delay: index * 0.07 }}
          className="group bg-surface px-5 py-6 transition-colors duration-500 ease-soft hover:bg-panel md:px-6 md:py-7"
        >
          {/*
            Con số hạ từ 60px xuống 30px và bỏ hẳn thanh chỉ số 01–04 phía trên.
            Bốn con số cỡ 60px chiếm nguyên một dải màn hình cho một thông tin phụ;
            ở cỡ này cả bốn ô gói gọn trong một dải thấp, vẫn đọc rõ và không tranh
            chỗ với ảnh.
          */}
          <p className="font-ui text-3xl leading-none font-black tracking-tight tabular-nums">
            <Counter value={stat.value} />
          </p>

          <p className="label mt-3 text-fg-mute">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
}
