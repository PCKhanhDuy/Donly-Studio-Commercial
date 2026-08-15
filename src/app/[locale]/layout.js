import { notFound } from "next/navigation";
import { Merriweather, Montserrat, Roboto } from "next/font/google";
import "../globals.css";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import SmoothScroll from "@/components/motion/smooth-scroll";
import ScrollProgress from "@/components/motion/scroll-progress";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, locales, localeMeta } from "@/i18n/config";
import { tr } from "@/i18n/t";
import { site } from "@/lib/site";

/*
  Đây là ROOT LAYOUT của site — nó nằm trong segment động [locale] chứ không phải ở app/,
  vì thẻ <html lang> phải đổi theo ngôn ngữ mà chỉ root layout mới đặt được thẻ đó.
  Hệ quả: trang 404 cho URL không khớp route nào phải khai báo riêng ở app/global-not-found.js.

  Hệ thống chữ theo guideline mục 3 — đúng 3 bộ, không thêm bộ thứ 4:
    Merriweather  → Heading, wordmark, pull-quote
    Montserrat    → Subheading, nav, label, CTA
    Roboto        → Body

  Cả ba đều nạp subset "vietnamese"; thiếu subset này thì chữ có dấu sẽ rơi về font hệ thống
  và phá vỡ tính nhất quán của bộ nhận diện.
*/

const merriweather = Merriweather({
  subsets: ["latin", "vietnamese"],
  style: ["normal", "italic"],
  variable: "--font-merriweather",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin", "vietnamese"],
  variable: "--font-montserrat",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin", "vietnamese"],
  style: ["normal", "italic"],
  variable: "--font-roboto",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const dict = getDictionary(locale);
  const description = tr(site.description, locale);

  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${site.name} — ${dict.common.studioCommercial}`,
      template: `%s — ${site.name}`,
    },
    description,
    keywords: tr(site.keywords, locale),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        vi: "/vi",
        en: "/en",
        "x-default": "/vi",
      },
    },
    openGraph: {
      type: "website",
      locale: localeMeta[locale].ogLocale,
      url: `${site.url}/${locale}`,
      siteName: site.fullName,
      title: `${site.name} — ${dict.common.studioCommercial}`,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${site.name} — ${dict.common.studioCommercial}`,
      description,
    },
    robots: { index: true, follow: true },
  };
}

export const viewport = {
  themeColor: "#0d0d0d",
};

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  // Chặn các đoạn đường dẫn không phải ngôn ngữ (vd /abc/works) ngay từ layout
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);

  return (
    // Lenis đặt lại chiều cao html thành auto, nên chiều cao tối thiểu của trang
    // được neo vào body bằng min-h-svh thay vì kế thừa từ html.
    <html
      lang={localeMeta[locale].htmlLang}
      className={`${merriweather.variable} ${montserrat.variable} ${roboto.variable}`}
    >
      <body className="flex min-h-svh flex-col">
        {/*
          Lưới an toàn cho trường hợp JavaScript không chạy (người dùng tắt, hoặc bundle
          lỗi mạng). Thư viện motion in sẵn trạng thái BẮT ĐẦU của animation vào HTML —
          opacity 0, dịch xuống, clip-path che kín — và chỉ gỡ ra khi JS chạy. Không có JS
          thì phần lớn tiêu đề và ảnh sẽ vô hình dù nội dung vẫn nằm trong DOM.

          Ba selector dưới chỉ chạm vào phần tử có style NỘI TUYẾN (do motion đặt), nên
          không đụng tới các class tĩnh của Tailwind như scale-y-0 của lớp phủ nút CTA.
        */}
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html: `
                [style*="opacity"]{opacity:1!important}
                [style*="transform"]{transform:none!important}
                [style*="clip-path"]{clip-path:none!important}
              `,
            }}
          />
        </noscript>

        <a
          href="#main"
          className="sr-only font-ui focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:bg-paper focus:px-4 focus:py-2 focus:text-ink"
        >
          {dict.common.skipNav}
        </a>

        <SmoothScroll>
          <ScrollProgress />
          <SiteHeader locale={locale} dict={dict} />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter locale={locale} dict={dict} />
        </SmoothScroll>
      </body>
    </html>
  );
}
