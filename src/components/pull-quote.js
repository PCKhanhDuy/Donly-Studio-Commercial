import TextReveal from "@/components/motion/text-reveal";
import { Reveal } from "@/components/motion/reveal";

/*
  Khối trích dẫn dựng như một trang pull-quote của ấn phẩm in.

  Ba chi tiết biến một câu chữ to thành một khối có thiết kế:
    · dấu ngoặc kép cỡ khổng lồ đặt lệch lên trên, dùng như một hình khối chứ không phải chữ
    · hai nét kẻ ôm trên dưới, đóng khung câu trích lại
    · dòng ghi nguồn có gạch đầu dòng, đặt lệch sang cột phải

  Câu trích tự nó không cần thêm gì; nhưng nếu chỉ thả chữ giữa khoảng trống thì
  nó đọc như một đoạn văn bị phóng to, không phải một điểm nhấn có chủ đích.
*/
export default function PullQuote({ text, note, attribution, className = "" }) {
  return (
    <figure className={`relative border-y border-rule py-16 md:py-24 ${className}`}>
      {/* Dấu ngoặc kép dùng như hình khối */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 -left-3 font-display text-[12rem] leading-none font-black text-fg/[0.06] select-none md:-top-16 md:text-[18rem]"
      >
        “
      </span>

      <blockquote className="relative">
        <TextReveal
          as="p"
          text={text}
          gap={0.05}
          duration={1.05}
          className="max-w-5xl font-display text-[2.25rem] leading-[1.12] italic md:text-[3.5rem] lg:text-[4.5rem]"
        />
      </blockquote>

      {note || attribution ? (
        <Reveal
          as="figcaption"
          delay={0.28}
          className="relative mt-12 grid gap-6 md:grid-cols-12 md:gap-8"
        >
          {attribution ? (
            <p className="label flex items-center gap-3 text-fg-mute md:col-span-3">
              <span aria-hidden="true" className="h-px w-6 bg-fg/40" />
              {attribution}
            </p>
          ) : null}

          {note ? (
            <p className="text-lg leading-relaxed text-fg/60 md:col-span-6 md:col-start-7">
              {note}
            </p>
          ) : null}
        </Reveal>
      ) : null}
    </figure>
  );
}
