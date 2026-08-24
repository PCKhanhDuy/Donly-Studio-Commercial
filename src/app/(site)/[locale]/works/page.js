import Container from "@/components/container";
import PageHeader from "@/components/page-header";
import ClientIndex from "@/components/client-index";
import CtaBand from "@/components/cta-band";
import { alternatesFor } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { localize } from "@/i18n/localize";
import { getLiveClients, getLiveCollections } from "@/lib/works-live";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return {
    title: dict.works.metaTitle,
    description: dict.works.metaDescription,
    alternates: alternatesFor(locale, "/works"),
  };
}

export default async function WorksPage({ params }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const [clients, allCollections] = await Promise.all([
    getLiveClients(),
    getLiveCollections(),
  ]);

  const list = localize(clients, locale);

  return (
    <>
      <PageHeader
        label={`${clients.length} ${dict.works.clientsCount} · ${allCollections.length} ${dict.works.collections}`}
        title={dict.works.title}
        lead={dict.works.lead}
      />

      <section>
        <Container className="py-14 md:py-20">
          <ClientIndex
            clients={list}
            labels={{
              client: dict.works.clientCol,
              industry: dict.works.industry,
              year: dict.works.year,
              collections: dict.works.collections,
              frames: dict.works.frames,
            }}
          />
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
