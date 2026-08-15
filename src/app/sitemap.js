import { locales } from "@/i18n/config";
import { site } from "@/lib/site";
import { allCollections, clients } from "@/lib/works";

/*
  Sitemap liệt kê CẢ HAI bản ngôn ngữ của mọi trang, kèm khối `alternates.languages`
  để công cụ tìm kiếm hiểu bản vi và bản en là hai phiên bản của cùng một trang
  chứ không phải hai trang trùng nội dung.
*/

const PAGES = [
  { path: "", priority: 1, changeFrequency: "monthly" },
  { path: "/works", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "yearly" },
  { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
];

function entry(path, priority, changeFrequency, lastModified) {
  return locales.map((locale) => ({
    url: `${site.url}/${locale}${path}`,
    lastModified,
    changeFrequency,
    priority,
    alternates: {
      languages: Object.fromEntries(
        locales.map((code) => [code, `${site.url}/${code}${path}`]),
      ),
    },
  }));
}

export default function sitemap() {
  const lastModified = new Date();

  return [
    ...PAGES.flatMap((page) =>
      entry(page.path, page.priority, page.changeFrequency, lastModified),
    ),
    // Trang khách hàng đứng trên trang collection về mức ưu tiên
    ...clients.flatMap((client) =>
      entry(`/works/${client.slug}`, 0.7, "monthly", lastModified),
    ),
    ...allCollections.flatMap((collection) =>
      entry(collection.href, 0.6, "yearly", lastModified),
    ),
  ];
}
