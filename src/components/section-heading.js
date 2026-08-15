import TextReveal from "@/components/motion/text-reveal";
import { Reveal } from "@/components/motion/reveal";

/*
  Đầu section — nhãn nhỏ ở trên, tiêu đề ngay dưới, cả hai bám lề trái.

  Bản trước đặt nhãn ở cột 1–3 và tiêu đề thụt vào từ cột 4 của lưới 12 cột. Khi khối này
  nằm trong một hàng flex cùng liên kết "xem toàn bộ", phần thụt đó đẩy tiêu đề ra giữa
  màn hình, trông như căn giữa hụt chứ không ra ý đồ.

  Cỡ tiêu đề cũng hạ từ 56px xuống 24–32px: nó chỉ cần đủ để phân đoạn trang.
  Ảnh mới là nội dung, không phải dòng tiêu đề.
*/
export default function SectionHeading({
  label,
  title,
  lead,
  invert = false,
  className = "",
  children,
}) {
  return (
    <div className={className}>
      {label ? (
        <Reveal
          as="span"
          y={12}
          duration={0.6}
          className={`label block ${invert ? "text-ink/45" : "text-fg-mute"}`}
        >
          {label}
        </Reveal>
      ) : null}

      <TextReveal
        as="h2"
        text={title}
        delay={0.06}
        className={`mt-4 max-w-3xl font-display text-2xl leading-[1.12] font-bold tracking-tight lg:text-[2rem] ${
          invert ? "text-ink" : "text-fg"
        }`}
      />

      {lead ? (
        <Reveal
          as="p"
          delay={0.18}
          className={`mt-4 max-w-xl font-body text-sm leading-relaxed ${
            invert ? "text-ink/65" : "text-fg/60"
          }`}
        >
          {lead}
        </Reveal>
      ) : null}

      {children}
    </div>
  );
}
