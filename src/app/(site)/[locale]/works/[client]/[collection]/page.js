import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/container";
import Frame from "@/components/frame";
import CollectionHero from "@/components/collection-hero";
import CtaBand from "@/components/cta-band";
import PullQuote from "@/components/pull-quote";
import { LightboxProvider, LightboxTrigger } from "@/components/lightbox";
import ImageReveal from "@/components/motion/image-reveal";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ArrowRight } from "@/components/icons";
import { alternatesFor, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { localize } from "@/i18n/localize";
import { allCollections, categoryLabel } from "@/lib/works";
import {
  getLiveAdjacent,
  getLiveClient,
  getLiveCollection,
} from "@/lib/works-live";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    allCollections.map((collection) => ({
      locale,
      client: collection.clientSlug,
      collection: collection.slug,
    })),
  );
}

export async function generateMetadata({ params }) {
  const { locale, client, collection: collectionSlug } = await params;
  const dict = getDictionary(locale);
  const raw = await getLiveCollection(client, collectionSlug);

  if (!raw) return { title: dict.work.notFoundTitle };

  const collection = localize(raw, locale);

  return {
    title: `${collection.client} — ${collection.title}`,
    description: collection.summary,
    alternates: alternatesFor(locale, `/works/${client}/${collectionSlug}`),
    openGraph: {
      title: `${collection.client} — ${collection.title}`,
      description: collection.summary,
      type: "article",
      images: collection.cover?.src ? [{ url: collection.cover.src }] : undefined,
    },
  };
}

/*
  Đánh số lightbox theo đúng thứ tự ảnh xuất hiện trên trang.
  Ảnh trong lưới dùng chung tỷ lệ 4:5 để các hàng thẳng nhau, nhưng khi mở lightbox
  thì hiện ở kích thước gốc — nên không mất chi tiết nào của tấm ảnh.
*/
function buildGallery(blocks) {
  const slides = [];

  const decorated = blocks.map((block) => {
    if (!Array.isArray(block.images)) return block;
    return {
      ...block,
      images: block.images.map((image) => {
        slides.push({
          src: image.src,
          alt: image.alt ?? "",
          title: image.caption ?? "",
        });
        return { ...image, slide: slides.length - 1 };
      }),
    };
  });

  return { blocks: decorated, slides };
}

export default async function CollectionPage({ params }) {
  const { locale, client: clientSlug, collection: collectionSlug } = await params;
  const [rawCollection, rawClient, rawNext] = await Promise.all([
    getLiveCollection(clientSlug, collectionSlug),
    getLiveClient(clientSlug),
    getLiveAdjacent(clientSlug, collectionSlug),
  ]);

  if (!rawCollection) notFound();

  const dict = getDictionary(locale);
  const collection = localize(rawCollection, locale);
  const client = localize(rawClient, locale);
  const next = localize(rawNext, locale);
  const labels = localize(categoryLabel, locale);
  const { blocks, slides } = buildGallery(collection.blocks);

  return (
    <LightboxProvider slides={slides}>
      <CollectionHero
        client={collection.client}
        clientHref={`/${locale}/works/${clientSlug}`}
        title={collection.title}
        image={collection.hero}
        clientLabel={dict.work.client}
        studioLabel={dict.common.studioCommercial}
      />

      {/* THÔNG TIN */}
      <section>
        <Container className="py-16 md:py-24">
          <Stagger as="dl" gap={0.07} className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { term: dict.work.client, value: collection.client },
              { term: dict.work.type, value: labels[collection.category] },
              { term: dict.work.year, value: collection.year },
              { term: dict.work.location, value: collection.location },
            ].map((row) => (
              <StaggerItem key={row.term}>
                <dt className="label text-fg-mute">{row.term}</dt>
                <dd className="mt-4 font-ui text-lg font-semibold tracking-tight">
                  {row.value}
                </dd>
              </StaggerItem>
            ))}
          </Stagger>

          <Stagger as="ul" gap={0.05} className="mt-12 flex flex-wrap gap-3">
            {[
              ...collection.scope,
              `${collection.frameCount} ${dict.works.frames}`,
            ].map((item) => (
              <StaggerItem
                as="li"
                key={item}
                y={12}
                className="label border border-rule px-4 py-2.5 text-fg/70"
              >
                {item}
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* BÀI TOÁN · CÁCH LÀM · KẾT QUẢ */}
      <section className="border-y border-rule bg-panel">
        <Container className="py-20 md:py-28">
          <Stagger gap={0.1} className="grid gap-12 lg:grid-cols-3 lg:gap-8">
            {[
              { label: dict.work.brief, body: collection.brief },
              { label: dict.work.approach, body: collection.approach },
              { label: dict.work.result, body: collection.result },
            ].map((column) => (
              <StaggerItem key={column.label}>
                <p className="label text-fg-mute">{column.label}</p>
                <p className="mt-6 leading-relaxed text-fg/75">{column.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/*
        BỘ ẢNH — lưới ba cột ĐỀU NHAU, cùng một tỷ lệ, cùng một khoảng cách.
        Nhịp đều là thứ làm một bộ ảnh đọc ra như contact sheet của buổi chụp;
        đổi nhịp liên tục chỉ khiến trang trông lộn xộn.
      */}
      <section>
        <Container className="py-20 md:py-28">
          <div className="flex flex-col gap-6 md:gap-8">
            {blocks.map((block, index) =>
              block.type === "quote" ? (
                <PullQuote
                  key={`quote-${index}`}
                  text={block.text}
                  attribution={collection.client}
                  className="my-10 md:my-16"
                />
              ) : (
                <div
                  key={`row-${index}`}
                  className="grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-8"
                >
                  {block.images.map((image) => (
                    <ImageReveal key={image.src}>
                      <LightboxTrigger
                        index={image.slide}
                        label={`${dict.common.view} — ${image.alt ?? ""}`}
                        className="w-full"
                      >
                        <Frame
                          image={image}
                          zoom
                          sizes="(min-width: 768px) 33vw, 50vw"
                        />
                      </LightboxTrigger>
                    </ImageReveal>
                  ))}
                </div>
              ),
            )}
          </div>
        </Container>
      </section>

      {/* CREDITS */}
      <section className="border-t border-rule">
        <Container className="py-20 md:py-24">
          <Reveal as="p" y={10} duration={0.6} className="label text-fg-mute">
            {dict.work.credits}
          </Reveal>
          <Stagger as="dl" gap={0.06} className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {collection.credits.map((credit) => (
              <StaggerItem key={credit.role}>
                <dt className="text-sm text-fg-mute">{credit.role}</dt>
                <dd className="mt-2 font-ui font-semibold tracking-tight">{credit.name}</dd>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* CÁC COLLECTION KHÁC CỦA CÙNG KHÁCH HÀNG */}
      {client.collections.length > 1 ? (
        <section className="border-t border-rule bg-panel">
          <Container className="py-16 md:py-20">
            <Reveal as="p" y={10} duration={0.6} className="label text-fg-mute">
              {client.name}
            </Reveal>
            <Stagger as="ul" gap={0.06} className="mt-8 flex flex-wrap gap-3">
              {client.collections.map((item) => {
                const current = item.slug === collection.slug;
                return (
                  <StaggerItem as="li" key={item.slug} y={12}>
                    <Link
                      href={`/${locale}${item.href}`}
                      aria-current={current ? "page" : undefined}
                      className={`label inline-block border px-4 py-2.5 transition-colors duration-300 ease-soft ${
                        current
                          ? "border-fg text-fg"
                          : "border-rule text-fg-mute hover:border-fg hover:text-fg"
                      }`}
                    >
                      {item.title}
                    </Link>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </Container>
        </section>
      ) : null}

      {/* COLLECTION TIẾP THEO */}
      {next ? (
        <section className="border-t border-rule">
          <Container className="py-20 md:py-28">
            <Reveal>
              <Link href={`/${locale}${next.href}`} className="group block">
                <p className="label text-fg-mute">{dict.work.nextProject}</p>
                <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
                  <div>
                    <p className="underline-draw inline font-display text-3xl leading-tight font-bold tracking-tight md:text-5xl">
                      {next.client}
                    </p>
                    <p className="mt-3 text-lg text-fg-mute">{next.title}</p>
                  </div>
                  <ArrowRight className="size-8 transition-transform duration-500 ease-donly group-hover:translate-x-3" />
                </div>
              </Link>
            </Reveal>
          </Container>
        </section>
      ) : null}

      <CtaBand
        locale={locale}
        dict={dict}
        label={dict.work.ctaLabel}
        title={dict.work.ctaTitle}
      />
    </LightboxProvider>
  );
}
