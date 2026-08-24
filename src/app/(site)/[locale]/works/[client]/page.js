import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/container";
import PageHeader from "@/components/page-header";
import CtaBand from "@/components/cta-band";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ArrowLeft, ArrowRight } from "@/components/icons";
import { alternatesFor, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { localize } from "@/i18n/localize";
import { clients } from "@/lib/works";
import { getLiveClient } from "@/lib/works-live";

/*
  Trang KHÁCH HÀNG: liệt kê các collection mà studio đã chụp cho khách đó.
  Đây là tầng giữa của cấu trúc ba cấp — thiếu nó thì các collection của cùng một khách
  nằm rời rạc, người xem không thấy được quan hệ dài hạn với khách hàng.
*/

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    clients.map((client) => ({ locale, client: client.slug })),
  );
}

export async function generateMetadata({ params }) {
  const { locale, client: clientSlug } = await params;
  const dict = getDictionary(locale);
  const raw = await getLiveClient(clientSlug);

  if (!raw) return { title: dict.work.notFoundTitle };

  const client = localize(raw, locale);

  return {
    title: client.name,
    description: client.summary,
    alternates: alternatesFor(locale, `/works/${client.slug}`),
    openGraph: {
      title: client.name,
      description: client.summary,
      images: [{ url: client.cover.src }],
    },
  };
}

export default async function ClientPage({ params }) {
  const { locale, client: clientSlug } = await params;
  const raw = await getLiveClient(clientSlug);

  if (!raw) notFound();

  const dict = getDictionary(locale);
  const client = localize(raw, locale);

  return (
    <>
      <PageHeader
        label={`${client.industry} · ${client.since}`}
        title={client.name}
        lead={client.summary}
      >
        <Reveal delay={0.3} className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4">
          <span className="label text-fg-mute">
            {client.collectionCount} {dict.works.collections}
          </span>
          <span className="label text-fg-mute">
            {client.frameCount} {dict.works.frames}
          </span>
          <Link
            href={`/${locale}/works`}
            className="group inline-flex items-center gap-2 font-ui text-sm text-fg-mute transition-colors duration-300 ease-soft hover:text-fg"
          >
            <ArrowLeft className="size-4 transition-transform duration-400 ease-donly group-hover:-translate-x-1" />
            {dict.works.backToClients}
          </Link>
        </Reveal>
      </PageHeader>

      <section>
        <Container className="py-20 md:py-28">
          <Reveal as="p" y={12} duration={0.6} className="label text-fg-mute">
            {dict.works.allCollections}
          </Reveal>

          <Stagger gap={0.08} className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {client.collections.map((collection, index) => (
              <StaggerItem key={collection.slug}>
                <Link href={`/${locale}${collection.href}`} className="group block">
                  <div className="relative aspect-3/4 overflow-hidden bg-panel">
                    <Image
                      src={collection.cover.src}
                      alt={collection.cover.alt ?? ""}
                      fill
                      preload={index < 3}
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                      className="object-cover transition-transform duration-700 ease-donly group-hover:scale-[1.05]"
                    />
                  </div>

                  <div className="mt-5 flex items-start justify-between gap-4 border-t border-rule pt-4">
                    <div>
                      <h2 className="font-display text-2xl leading-none font-bold tracking-tight">
                        <span className="underline-draw">{collection.title}</span>
                      </h2>
                      <p className="mt-3 text-sm text-fg/55">{collection.summary}</p>
                    </div>
                    <ArrowRight className="mt-1 size-4 shrink-0 text-fg-mute transition-all duration-500 ease-donly group-hover:translate-x-1.5 group-hover:text-fg" />
                  </div>

                  <p className="label mt-4 text-fg-mute">
                    {collection.year} · {collection.frameCount} {dict.works.frames}
                  </p>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <CtaBand
        locale={locale}
        dict={dict}
        label={dict.works.ctaLabel}
        title={dict.works.ctaTitle}
      />
    </>
  );
}
