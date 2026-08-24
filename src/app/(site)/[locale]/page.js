import Container from "@/components/container";
import HomeHero from "@/components/home-hero";
import SectionHeading from "@/components/section-heading";
import ClientIndex from "@/components/client-index";
import CtaBand from "@/components/cta-band";
import ServiceCards from "@/components/service-cards";
import GalleryCarousel from "@/components/gallery-carousel";
import StatBand from "@/components/stat-band";
import { Reveal } from "@/components/motion/reveal";
import { ArrowLink } from "@/components/cta";
import { alternatesFor } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { localize } from "@/i18n/localize";
import { site } from "@/lib/site";
import { services, stats } from "@/lib/content";
import { allCollections, clients } from "@/lib/works";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return {
    title: dict.home.metaTitle,
    description: localize(site.description, locale),
    alternates: alternatesFor(locale),
  };
}

/*
  TRANG CHỦ — SÁU PHẦN, KHÔNG HƠN.

  Bản trước có mười phần: hero chia đôi kèm wordmark cỡ 128px, một đoạn tuyên ngôn chạy
  chữ cỡ 44px, một dải dự án nổi bật tràn viền, danh mục khách hàng, dải thư viện, ba thẻ
  dịch vụ cao gần một màn hình, một câu trích cỡ lớn, một dòng thời gian năm bước, một dải
  số liệu cỡ 60px, một dải tên khách chạy ngang, rồi CTA. Phần nào cũng mở bằng nhãn nhỏ
  + tiêu đề rất lớn, nên cuộn xuống là gặp lại đúng một nhịp mười lần và chữ nhiều hơn ảnh.

  Ở đây bỏ hẳn: đoạn tuyên ngôn, dải dự án nổi bật, câu trích, dòng thời gian quy trình,
  dải tên khách chạy ngang. Quy trình và chi tiết dịch vụ vốn đã có đủ ở /services;
  câu chuyện studio đã có đủ ở /about. Trang chủ chỉ trả lời ba câu:
  studio chụp ra ảnh thế nào (hero + thư viện), đã làm cho ai (danh mục), nhận việc gì
  (bảng dịch vụ).
*/

export default async function HomePage({ params }) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  const clientList = localize(clients, locale);
  const serviceList = localize(services, locale);
  const statList = localize(stats, locale);

  /*
    Dải thư viện lấy MỘT khung tiêu biểu của MỖI collection, không đổ hết ảnh của một bộ
    ra màn hình. Đổ nguyên một bộ thì người xem chỉ thấy đi thấy lại một buổi chụp;
    lấy mỗi bộ một tấm thì dải này kể được toàn bộ phạm vi công việc của studio.
  */
  const gallery = allCollections.map((collection) => localize(collection.cover, locale));
  const gallerySlides = gallery.map((image) => ({
    src: image.src,
    alt: image.alt ?? "",
    title: image.alt ?? "",
  }));

  /*
    Hero lấy khung THƯỜNG (A-01) của ba collection đầu, không lấy ảnh bìa A-00.
    Bìa là bản có watermark in sát đáy khung, mà hero cắt ảnh dọc thành khung tràn màn
    hình nên chỉ giữ lại chưa tới một nửa chiều cao — watermark sẽ bị cắt còn một nửa.
    Bìa dành cho chỗ hiện trọn khung: bảng danh mục, ảnh xem trước, dải thư viện.
  */
  const heroImages = allCollections
    .slice(0, 3)
    .map((collection) => localize(collection.plate, locale));

  const indexLabels = {
    client: dict.works.clientCol,
    industry: dict.works.industry,
    year: dict.works.year,
    collections: dict.works.collections,
    frames: dict.works.frames,
  };

  return (
    <>
      <HomeHero images={heroImages} />

      {/* DANH MỤC KHÁCH HÀNG */}
      <section className="border-b border-rule">
        <Container className="py-16 md:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              label={dict.home.worksLabel}
              title={dict.home.worksTitle}
              className="flex-1"
            />
            <Reveal delay={0.2}>
              <ArrowLink href={`/${locale}/works`}>{dict.common.viewAll}</ArrowLink>
            </Reveal>
          </div>

          <ClientIndex clients={clientList} labels={indexLabels} className="mt-10 md:mt-12" />
        </Container>
      </section>

      {/* THƯ VIỆN — mỗi collection một khung, kéo ngang */}
      <section className="border-b border-rule py-16 md:py-20">
        <Container>
          <SectionHeading
            label={dict.home.galleryLabel}
            title={dict.home.galleryTitle}
          />
        </Container>

        <div className="mt-10 md:mt-12">
          <GalleryCarousel
            images={gallery}
            slides={gallerySlides}
            viewLabel={dict.common.view}
            prevLabel={dict.common.previous}
            nextLabel={dict.common.next}
          />
        </div>
      </section>

      {/* BẢNG DỊCH VỤ */}
      <section className="border-b border-rule">
        <Container className="py-16 md:py-24">
          <SectionHeading
            label={dict.home.servicesLabel}
            title={dict.home.servicesTitle}
          />
          <ServiceCards
            services={serviceList}
            locale={locale}
            detailsLabel={dict.common.details}
            className="mt-10 md:mt-12"
          />
        </Container>
      </section>

      {/* SỐ LIỆU */}
      <section className="border-b border-rule">
        <Container className="py-12 md:py-16">
          <StatBand stats={statList} />
        </Container>
      </section>

      <CtaBand locale={locale} dict={dict} />
    </>
  );
}
