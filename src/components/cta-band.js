import Container from "@/components/container";
import { CtaLink } from "@/components/cta";
import TextReveal from "@/components/motion/text-reveal";
import { Reveal } from "@/components/motion/reveal";
import { site } from "@/lib/site";

/*
  Dải kêu gọi hành động cuối trang — ĐẢO SÁNG trên site nền tối.
  Cả trang đen, riêng khối này trắng đặc: mắt không thể lướt qua nó được.
*/
export default function CtaBand({ locale, dict, label, title }) {
  return (
    <section className="bg-paper text-ink">
      {/*
        Dải này hạ từ py-36 + tiêu đề 72px xuống py-16 + tiêu đề 32px, và đoạn dẫn dài
        được bỏ. Nó là bước cuối của trang, không phải một chương mới: chỉ cần một câu
        mời và hai đường liên hệ, đặt trên cùng một hàng với nút.
      */}
      <Container className="py-14 md:py-20">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div>
            <Reveal as="span" y={12} duration={0.6} className="label block text-ink/45">
              {label ?? dict.cta.label}
            </Reveal>

            <TextReveal
              as="h2"
              text={title ?? dict.cta.title}
              delay={0.06}
              amount={0.3}
              className="mt-4 max-w-2xl font-display text-2xl leading-[1.1] font-bold tracking-tight md:text-[2rem]"
            />
          </div>

          <Reveal delay={0.2} className="flex shrink-0 flex-wrap items-center gap-4">
            <CtaLink href={`/${locale}/contact`} variant="solid" tone="ink">
              {dict.common.bookShoot}
            </CtaLink>
            <a
              href={`mailto:${site.email}`}
              className="border border-ink/30 px-6 py-3.5 font-ui text-sm tracking-wide transition-colors duration-300 ease-soft hover:border-ink hover:bg-ink hover:text-paper"
            >
              {site.email}
            </a>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
