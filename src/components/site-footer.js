import Link from "next/link";
import Container from "@/components/container";
import Logo from "@/components/logo";
import LanguageSwitch from "@/components/language-switch";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Behance, Instagram } from "@/components/icons";
import { localize } from "@/i18n/localize";
import { nav, site } from "@/lib/site";
import { services } from "@/lib/content";

const SOCIAL_ICONS = { Instagram, Behance };

/*
  Footer giữ nền tối. Ngay phía trên nó là dải CTA màu trắng — hai khối sáng nằm liền nhau
  sẽ dính thành một mảng, nên footer tối lại chính là thứ đóng khung cho dải CTA.
*/
export default function SiteFooter({ locale, dict }) {
  const year = new Date().getFullYear();
  const address = localize(site.address, locale);
  const hours = localize(site.hours, locale);
  const serviceList = localize(services, locale);

  return (
    <footer className="border-t border-rule bg-surface text-fg">
      <Container className="py-20 md:py-28">
        <Reveal className="flex flex-col gap-12 border-b border-rule pb-14 md:flex-row md:items-end md:justify-between md:gap-8">
          <div>
            <Logo shape="full" tone="paper" loading="eager" className="h-8 w-auto md:h-12" />
            <p className="mt-7 max-w-md font-display text-xl italic md:text-2xl">
              {site.tagline}
            </p>
          </div>

          <div>
            <p className="label text-fg-mute">{dict.footer.quoteLabel}</p>
            <a
              href={`mailto:${site.email}`}
              className="underline-draw mt-5 inline-block font-ui text-xl tracking-tight md:text-2xl"
            >
              {site.email}
            </a>
            <br />
            <a
              href={`tel:${site.phoneHref}`}
              className="underline-draw mt-1 inline-block font-ui text-xl tracking-tight md:text-2xl"
            >
              {site.phone}
            </a>
          </div>
        </Reveal>

        <Stagger gap={0.08} className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <StaggerItem>
            <p className="label text-fg-mute">{dict.footer.navigation}</p>
            <ul className="mt-6 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={`/${locale}${item.href}`} className="underline-draw text-fg/75">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </StaggerItem>

          <StaggerItem>
            <p className="label text-fg-mute">{dict.footer.services}</p>
            <ul className="mt-6 space-y-3">
              {serviceList.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/${locale}/services#${service.slug}`}
                    className="underline-draw text-fg/75"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </StaggerItem>

          <StaggerItem>
            <p className="label text-fg-mute">{dict.footer.studio}</p>
            <address className="mt-6 space-y-1 text-fg/75 not-italic">
              <p>{address.street}</p>
              <p>
                {address.district}, {address.city}
              </p>
              <p>{address.country}</p>
            </address>
            <p className="mt-4 text-sm text-fg-mute">{hours}</p>
          </StaggerItem>

          <StaggerItem>
            <p className="label text-fg-mute">{dict.footer.follow}</p>
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

            <div className="mt-8">
              <p className="label text-fg-mute">{dict.common.languageLabel}</p>
              <LanguageSwitch locale={locale} tone="paper" className="mt-4" />
            </div>
          </StaggerItem>
        </Stagger>

        <div className="flex flex-col gap-3 border-t border-rule pt-8 text-sm text-fg-mute sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. {dict.footer.rights}
          </p>
          <p className="font-ui tracking-[0.2em] uppercase">{site.taglineSocial}</p>
        </div>
      </Container>
    </footer>
  );
}
