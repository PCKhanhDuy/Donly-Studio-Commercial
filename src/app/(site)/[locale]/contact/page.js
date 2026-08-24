import Container from "@/components/container";
import PageHeader from "@/components/page-header";
import Frame from "@/components/frame";
import BookingForm from "@/components/booking-form";
import ImageReveal from "@/components/motion/image-reveal";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ArrowLink } from "@/components/cta";
import { Behance, Instagram } from "@/components/icons";
import { alternatesFor } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { localize } from "@/i18n/localize";
import { mapImage } from "@/lib/content";
import { site } from "@/lib/site";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return {
    title: dict.contact.metaTitle,
    description: dict.contact.metaDescription,
    alternates: alternatesFor(locale, "/contact"),
  };
}

const SOCIAL_ICONS = { Instagram, Behance };

export default async function ContactPage({ params }) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  const address = localize(site.address, locale);
  const hours = localize(site.hours, locale);
  const map = localize(mapImage, locale);

  return (
    <>
      <PageHeader
        label={dict.contact.label}
        title={dict.contact.title}
        lead={dict.contact.lead}
      />

      <section>
        <Container className="py-14 md:py-20">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-7">
              <BookingForm locale={locale} dict={dict} />
            </Reveal>

            {/* Cột thông tin được ghim lại trong lúc form dài bên trái cuộn qua */}
            <aside className="lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <Reveal className="border-t border-rule pt-8">
                  <p className="label text-fg-mute">{dict.contact.directLabel}</p>
                  <a
                    href={`mailto:${site.email}`}
                    className="underline-draw mt-6 inline-block font-ui text-xl tracking-tight"
                  >
                    {site.email}
                  </a>
                  <br />
                  <a
                    href={`tel:${site.phoneHref}`}
                    className="underline-draw mt-2 inline-block font-ui text-xl tracking-tight"
                  >
                    {site.phone}
                  </a>
                </Reveal>

                <Reveal delay={0.1} className="mt-12 border-t border-rule pt-8">
                  <p className="label text-fg-mute">{dict.contact.studioLabel}</p>
                  <address className="mt-6 space-y-1 text-fg/75 not-italic">
                    <p>{address.street}</p>
                    <p>
                      {address.district}, {address.city}
                    </p>
                    <p>{address.country}</p>
                  </address>
                  <p className="mt-4 text-sm text-fg-mute">{hours}</p>
                </Reveal>

                <Reveal delay={0.18} className="mt-12 border-t border-rule pt-8">
                  <p className="label text-fg-mute">{dict.contact.followLabel}</p>
                  <ul className="mt-6 space-y-3">
                    {site.social.map((item) => {
                      const Icon = SOCIAL_ICONS[item.label];
                      return (
                        <li key={item.label}>
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-3 text-fg/75 transition-colors duration-300 ease-soft hover:text-fg"
                          >
                            {Icon ? <Icon className="size-4" /> : null}
                            <span className="underline-draw">{item.label}</span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </Reveal>

                <Reveal delay={0.26} className="mt-12 border-t border-rule bg-panel p-8">
                  <p className="label text-fg-mute">{dict.contact.checklistLabel}</p>
                  <Stagger as="ul" gap={0.06} className="mt-6 space-y-3">
                    {dict.contact.checklist.map((item) => (
                      <StaggerItem
                        as="li"
                        key={item}
                        y={12}
                        className="flex gap-4 text-sm text-fg/75"
                      >
                        <span aria-hidden="true" className="mt-2 h-px w-4 shrink-0 bg-fg" />
                        {item}
                      </StaggerItem>
                    ))}
                  </Stagger>
                  <div className="mt-8">
                    <ArrowLink href={`/${locale}/services`}>
                      {dict.contact.pricingLink}
                    </ArrowLink>
                  </div>
                </Reveal>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* ĐƯỜNG TỚI STUDIO */}
      <section className="border-t border-rule bg-panel">
        <Container className="py-14 md:py-20">
          <Reveal as="p" y={10} duration={0.6} className="label text-fg-mute">
            {dict.contact.mapLabel}
          </Reveal>
          <ImageReveal className="mt-8">
            <Frame image={map} sizes="100vw" />
          </ImageReveal>
          <Reveal as="p" y={10} duration={0.6} className="mt-4 text-xs text-fg-mute">
            {dict.contact.mapNote}
          </Reveal>
        </Container>
      </section>
    </>
  );
}
