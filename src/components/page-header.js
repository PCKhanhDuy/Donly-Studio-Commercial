import Container from "@/components/container";
import TextReveal from "@/components/motion/text-reveal";
import { Reveal } from "@/components/motion/reveal";

/*
  Đầu trang cho các trang không mở bằng ảnh hero.

  Nhãn, tiêu đề và đoạn dẫn nằm TRÊN MỘT HÀNG chứ không xếp chồng. Bản trước H1 chạy tới
  88px rồi đoạn dẫn thụt xuống dưới, cả khối chiếm trọn màn hình đầu tiên — người xem phải
  cuộn hết một màn mới thấy nội dung thật của trang. Ở đây tiêu đề còn 28–40px, đoạn dẫn
  lùi sang phải ở cỡ chữ nhỏ, cả phần đầu trang cao chừng một phần tư màn hình.
*/
export default function PageHeader({ label, title, lead, children }) {
  return (
    <section className="border-b border-rule pt-28 pb-8 md:pt-32 md:pb-10">
      <Container>
        {label ? (
          <Reveal as="span" y={12} duration={0.6} amount={0.1} className="label block text-fg-mute">
            {label}
          </Reveal>
        ) : null}

        <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-12">
          <TextReveal
            as="h1"
            text={title}
            delay={0.1}
            amount={0.1}
            className="font-display text-[1.75rem] leading-[1.08] font-bold tracking-tight md:text-[2.5rem]"
          />

          {lead ? (
            <Reveal
              as="p"
              delay={0.25}
              amount={0.1}
              className="max-w-md font-body text-sm leading-relaxed text-fg/55 md:shrink-0 md:text-right"
            >
              {lead}
            </Reveal>
          ) : null}
        </div>

        {children}
      </Container>
    </section>
  );
}
