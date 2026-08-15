import Container from "@/components/container";
import PageHeader from "@/components/page-header";
import SectionHeading from "@/components/section-heading";
import Frame from "@/components/frame";
import CtaBand from "@/components/cta-band";
import Accordion from "@/components/accordion";
import ImageReveal from "@/components/motion/image-reveal";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { CtaLink } from "@/components/cta";
import { alternatesFor } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { localize } from "@/i18n/localize";
import { addOns, faqs, packages, process, services } from "@/lib/content";
import { site } from "@/lib/site";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return {
    title: dict.services.metaTitle,
    description: dict.services.metaDescription,
    alternates: alternatesFor(locale, "/services"),
  };
}

export default async function ServicesPage({ params }) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  const serviceList = localize(services, locale);
  const packageList = localize(packages, locale);
  const addOnList = localize(addOns, locale);
  const processList = localize(process, locale);
  const faqList = localize(faqs, locale);

  return (
    <>
      <PageHeader
        label={dict.services.label}
        title={site.taglineServices}
        lead={dict.services.lead}
      />

      {/*
        CHI TIẾT TỪNG DỊCH VỤ
        Ảnh mẫu được ghim (sticky) trong lúc cột chữ bên cạnh cuộn qua — người đọc luôn nhìn thấy
        tỷ lệ khung đang được mô tả. scroll-mt-32 để khi nhảy từ link #lookbook, tiêu đề
        không bị header cố định che.
      */}
      {serviceList.map((service, index) => (
        // Nền sáng/off-white xen kẽ thay cho đường kẻ ngăn cách — ba khối dịch vụ
        // tách nhau bằng sắc độ chứ không bằng thêm một nét kẻ nữa.
        <section
          key={service.slug}
          id={service.slug}
          className={`scroll-mt-32 ${index % 2 === 1 ? "bg-panel" : ""}`}
        >
          <Container className="py-16 md:py-24">
            <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
              <div className={`lg:col-span-5 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="lg:sticky lg:top-32">
                  <ImageReveal>
                    <Frame
                      image={service.image}
                      // Ảnh đầu tiên là LCP của trang — nạp ngay, không lazy
                      preload={index === 0}
                      sizes="(min-width: 1024px) 40vw, 100vw"
                    />
                  </ImageReveal>
                  <Reveal as="p" y={10} duration={0.6} className="mt-4 text-xs text-fg-mute">
                    {service.ratio}
                  </Reveal>
                </div>
              </div>

              <div className="lg:col-span-7">
                <Reveal className="flex items-baseline gap-4">
                  <span className="label text-fg-mute">{service.index}</span>
                  <h2 className="font-ui text-2xl font-bold tracking-tight">
                    {service.name}
                  </h2>
                </Reveal>

                <Reveal
                  as="p"
                  delay={0.1}
                  className="mt-3 font-display text-base italic text-fg/60 md:text-lg"
                >
                  {service.tagline}
                </Reveal>

                <Reveal
                  as="p"
                  delay={0.18}
                  className="mt-5 max-w-xl text-sm leading-relaxed text-fg/70"
                >
                  {service.description}
                </Reveal>

                <div className="mt-10 border-t border-rule pt-8">
                  <Reveal as="p" y={10} duration={0.6} className="label text-fg-mute">
                    {dict.services.deliverables}
                  </Reveal>
                  <Stagger as="ul" gap={0.07} className="mt-6 space-y-3">
                    {service.deliverables.map((item) => (
                      <StaggerItem as="li" key={item} y={14} className="flex gap-4 text-fg/75">
                        <span
                          aria-hidden="true"
                          className="mt-2.5 h-px w-4 shrink-0 bg-fg"
                        />
                        {item}
                      </StaggerItem>
                    ))}
                  </Stagger>
                </div>

                <Reveal as="p" delay={0.1} className="mt-10 text-sm text-fg-mute">
                  {dict.services.bestFor} {service.bestFor}
                </Reveal>
              </div>
            </div>
          </Container>
        </section>
      ))}

      {/* BẢNG GÓI */}
      <section className="border-t border-rule bg-panel">
        <Container className="py-16 md:py-24">
          <SectionHeading
            label={dict.services.pricingLabel}
            title={dict.services.pricingTitle}
            lead={dict.services.pricingLead}
            emphasis
          />

          {/*
            Gói nổi bật ĐẢO SÁNG: nền trắng chữ đen giữa hai thẻ tối.
            Trên nền tối, một thẻ đen không thể nổi lên được — phải đảo hẳn màu mới tách ra.
          */}
          <Stagger gap={0.1} className="mt-10 grid gap-px bg-rule lg:grid-cols-3">
            {packageList.map((pack) => (
              <StaggerItem
                key={pack.name}
                className={`flex flex-col p-8 md:p-10 ${
                  pack.featured ? "bg-paper text-ink" : "bg-surface"
                }`}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-ui text-xl font-bold tracking-tight">
                    {pack.name}
                  </h3>
                  {pack.featured ? (
                    <span className="label text-ink/50">{dict.services.popular}</span>
                  ) : null}
                </div>

                <p className="mt-6 font-display text-3xl font-bold tracking-tight">
                  {pack.price}
                </p>
                <p
                  className={`mt-2 text-sm ${
                    pack.featured ? "text-ink/50" : "text-fg-mute"
                  }`}
                >
                  / {pack.unit}
                </p>

                <p
                  className={`mt-8 leading-relaxed ${
                    pack.featured ? "text-ink/70" : "text-fg/70"
                  }`}
                >
                  {pack.summary}
                </p>

                <ul
                  className={`mt-8 flex-1 space-y-3 border-t pt-8 ${
                    pack.featured ? "border-ink/15" : "border-rule"
                  }`}
                >
                  {pack.includes.map((item) => (
                    <li
                      key={item}
                      className={`flex gap-4 text-sm ${
                        pack.featured ? "text-ink/75" : "text-fg/75"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`mt-2 h-px w-4 shrink-0 ${
                          pack.featured ? "bg-ink" : "bg-fg"
                        }`}
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-10">
                  <CtaLink
                    href={`/${locale}/contact`}
                    variant={pack.featured ? "solid" : "outline"}
                    tone={pack.featured ? "ink" : "paper"}
                  >
                    {dict.common.getQuote}
                  </CtaLink>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          {/* DỊCH VỤ BỔ SUNG */}
          <div className="mt-14 border-t border-rule pt-10">
            <Reveal as="p" y={10} duration={0.6} className="label text-fg-mute">
              {dict.services.addOns}
            </Reveal>
            <Stagger
              as="ul"
              gap={0.05}
              className="mt-8 grid gap-x-12 gap-y-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {addOnList.map((item) => (
                <StaggerItem
                  as="li"
                  key={item.name}
                  y={14}
                  className="flex items-baseline justify-between gap-4 border-b border-rule pb-4"
                >
                  <span className="text-fg/75">{item.name}</span>
                  <span className="shrink-0 text-sm text-fg-mute">{item.note}</span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Container>
      </section>

      {/* QUY TRÌNH */}
      <section>
        <Container className="py-16 md:py-24">
          <SectionHeading
            label={dict.services.processLabel}
            title={dict.services.processTitle}
          />

          <Stagger
            as="ol"
            gap={0.08}
            className="mt-10 divide-y divide-rule border-t border-rule"
          >
            {processList.map((item) => (
              <StaggerItem
                as="li"
                key={item.step}
                className="grid gap-3 py-6 md:grid-cols-12 md:gap-8"
              >
                <span className="label text-fg-mute md:col-span-2">{item.step}</span>
                <h3 className="font-ui text-xl font-semibold tracking-tight md:col-span-4">
                  {item.name}
                </h3>
                <p className="leading-relaxed text-fg/70 md:col-span-6">{item.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* FAQ */}
      <section className="border-t border-rule bg-panel">
        <Container className="py-16 md:py-24">
          <SectionHeading
            label={dict.services.faqLabel}
            title={dict.services.faqTitle}
          />

          <Reveal delay={0.15} className="mt-10">
            <Accordion items={faqList} />
          </Reveal>
        </Container>
      </section>

      <CtaBand
        locale={locale}
        dict={dict}
        label={dict.services.ctaLabel}
        title={dict.services.ctaTitle}
      />
    </>
  );
}
