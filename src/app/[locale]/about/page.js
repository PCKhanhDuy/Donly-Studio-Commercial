import Container from "@/components/container";
import PageHeader from "@/components/page-header";
import SectionHeading from "@/components/section-heading";
import Frame from "@/components/frame";
import CtaBand from "@/components/cta-band";
import Counter from "@/components/motion/counter";
import ImageReveal from "@/components/motion/image-reveal";
import Parallax from "@/components/motion/parallax";
import TextReveal from "@/components/motion/text-reveal";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ArrowLink } from "@/components/cta";
import { alternatesFor } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { localize } from "@/i18n/localize";
import { btsImages, positioning, principles, stats, studioImage } from "@/lib/content";
import { site } from "@/lib/site";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return {
    title: dict.about.metaTitle,
    description: dict.about.metaDescription,
    alternates: alternatesFor(locale, "/about"),
  };  
}

export default async function AboutPage({ params }) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  const principleList = localize(principles, locale);
  const positioningList = localize(positioning, locale);
  const statList = localize(stats, locale);
  const bts = localize(btsImages, locale);
  const studio = localize(studioImage, locale);

  return (
    <>
      <PageHeader
        label={dict.about.label}
        title={site.taglineAbout}
        lead={dict.about.lead}
      />

      {/* CÂU CHUYỆN */}
      <section>
        <Container className="py-16 md:py-24">
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              {/*
                Ảnh phóng 1.14 rồi trôi ngược chiều scroll trong khung đã cắt.
                Phần dư 14% chính là quãng đường parallax chạy — nhờ vậy không bao giờ hở mép.
              */}
              <ImageReveal>
                <div className="overflow-hidden">
                  <Parallax speed={0.07} className="scale-[1.14]">
                    <Frame image={studio} preload sizes="(min-width: 1024px) 40vw, 100vw" />
                  </Parallax>
                </div>
              </ImageReveal>
              <Reveal as="p" y={10} duration={0.6} className="mt-4 text-xs text-fg-mute">
                {dict.about.studioCaption}
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <Reveal as="span" y={12} duration={0.6} className="label block text-fg-mute">
                {dict.about.storyLabel}
              </Reveal>

              <TextReveal
                as="p"
                delay={0.08}
                gap={0.035}
                text={dict.about.storyLead}
                className="mt-5 font-display text-lg leading-[1.45] md:text-xl"
              />

              <Stagger gap={0.09} className="mt-8 space-y-6 leading-relaxed text-fg/75">
                {dict.about.storyBody.map((paragraph) => (
                  <StaggerItem as="p" key={paragraph.slice(0, 24)}>
                    {paragraph}
                  </StaggerItem>
                ))}
              </Stagger>

              <Reveal delay={0.15} className="mt-10">
                <ArrowLink href={`/${locale}/works`}>{dict.about.viewWorks}</ArrowLink>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* SỨ MỆNH & TẦM NHÌN — nền đen */}
      {/* Sứ mệnh & tầm nhìn — mảng panel nổi hơn nền một nấc, không cần đảo màu */}
      <section className="border-y border-rule bg-panel">
        <Container className="py-16 md:py-24">
          <div className="grid gap-20 lg:grid-cols-2 lg:gap-24">
            {[
              {
                label: dict.about.missionLabel,
                text: dict.about.missionText,
                note: dict.about.missionNote,
              },
              {
                label: dict.about.visionLabel,
                text: dict.about.visionText,
                note: dict.about.visionNote,
              },
            ].map((column) => (
              <div key={column.label}>
                <Reveal as="span" y={12} duration={0.6} className="label block text-fg-mute">
                  {column.label}
                </Reveal>
                <TextReveal
                  as="p"
                  delay={0.08}
                  gap={0.035}
                  text={column.text}
                  className="mt-5 font-display text-lg leading-[1.4] md:text-xl"
                />
                <Reveal
                  as="p"
                  delay={0.25}
                  className="mt-6 leading-relaxed text-fg/65"
                >
                  {column.note}
                </Reveal>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* NGUYÊN TẮC */}
      <section>
        <Container className="py-16 md:py-24">
          <SectionHeading
            label={dict.about.principlesLabel}
            title={dict.about.principlesTitle}
            emphasis
          />
  
          <Stagger
            as="ol"
            gap={0.08}
            className="mt-10 divide-y divide-rule border-t border-rule"
          >
            {principleList.map((principle, index) => (
              <StaggerItem
                as="li"
                key={principle.name}
                className="grid gap-4 py-8 md:grid-cols-12 md:gap-8"
              >
                <span className="label text-fg-mute md:col-span-2">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-ui text-xl font-semibold tracking-tight md:col-span-3">
                  {principle.name}
                </h3>
                <p className="leading-relaxed text-fg/70 md:col-span-7">
                  {principle.body}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* ĐỊNH VỊ */}
      <section className="border-t border-rule bg-panel">
        <Container className="py-16 md:py-24">
          <SectionHeading
            label={dict.about.positioningLabel}
            title={dict.about.positioningTitle}
          />

          <Stagger
            as="dl"
            gap={0.07}
            className="mt-14 divide-y divide-rule border-y border-rule"
          >
            {positioningList.map((row) => (
              <StaggerItem key={row.term} className="grid gap-3 py-6 md:grid-cols-12 md:gap-8">
                <dt className="label pt-1 text-fg-mute md:col-span-3">{row.term}</dt>
                <dd className="leading-relaxed text-fg/75 md:col-span-9">{row.detail}</dd>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* HẬU TRƯỜNG */}
      <section>
        <Container className="py-14 md:py-20">
          <Reveal as="p" y={10} duration={0.6} className="label text-fg-mute">
            {dict.about.btsLabel}
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-3 md:gap-8">
            {bts.map((image, index) => (
              // key theo vị trí: ảnh placeholder không có `src` nên dùng src làm key
              // sẽ ra undefined cho cả ba phần tử. Danh sách này tĩnh nên vị trí là khoá ổn định.
              <ImageReveal key={`bts-${index}`} delay={index * 0.12}>
                <Frame image={image} sizes="(min-width: 768px) 33vw, 100vw" />
              </ImageReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* SỐ LIỆU — số đứng trước, nhãn đứng sau: con số là thứ đáng đọc trước */}
      <section className="border-t border-rule">
        <Container className="py-14 md:py-20">
          <Stagger as="dl" className="grid gap-14 sm:grid-cols-2 lg:grid-cols-4">
            {statList.map((stat) => (
              <StaggerItem key={stat.label}>
                <dd className="font-ui text-3xl leading-none font-black tracking-tight md:text-4xl">
                  <Counter value={stat.value} />
                </dd>
                <dt className="label mt-5 text-fg-mute">{stat.label}</dt>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <CtaBand
        locale={locale}
        dict={dict}
        label={dict.about.ctaLabel}
        title={dict.about.ctaTitle}
      />
    </>
  );
}
