import { t } from "@/i18n/t";

/*
  Thông tin thương hiệu dùng chung toàn site.
  Số điện thoại / email / địa chỉ / link social hiện là placeholder — thay bằng thông tin thật
  trước khi deploy.

  Tagline giữ nguyên tiếng Anh ở cả hai bản ngôn ngữ: đó là tagline chính thức trong
  guideline, không phải câu cần dịch.
*/
/*
  ĐỊA CHỈ GỐC CỦA SITE.

  Dùng cho metadataBase (link ảnh OG khi chia sẻ), thẻ canonical và sitemap.xml — toàn
  những chỗ bắt buộc phải là đường dẫn tuyệt đối và ĐÚNG tên miền đang chạy.

  Thứ tự ưu tiên:
    1. NEXT_PUBLIC_SITE_URL      — tên miền thật, tự đặt trong Vercel khi đã có domain
    2. VERCEL_PROJECT_PRODUCTION_URL — Vercel tự cấp, dạng <project>.vercel.app
    3. localhost                 — lúc chạy máy mình

  Viết cứng một tên miền chưa mua vào đây thì sitemap và canonical trỏ vào chỗ không tồn
  tại, Google đọc vào là hỏng phần lập chỉ mục. Đọc từ biến môi trường thì deploy lên đâu
  cũng đúng, và ngày mua được domain chỉ cần thêm một biến trong Vercel, không phải sửa code.
*/
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const site = {
  name: "DONLY",
  fullName: "DONLY Studio Commercial",
  legalName: "DONLY Studio Commercial",
  url: siteUrl,

  tagline: "Commercial photography, refined.",
  taglineServices: "Lookbook. Campaign. Product.",
  taglineAbout: "We shoot with intention.",
  taglineSocial: "Less noise, more image.",

  description: t(
    "DONLY Studio Commercial — studio nhiếp ảnh thương mại chuyên Lookbook, Campaign và Product cho thương hiệu thời trang, lifestyle và tiêu dùng.",
    "DONLY Studio Commercial — a commercial photography studio specialising in lookbook, campaign and product work for fashion, lifestyle and consumer brands.",
  ),

  keywords: t(
    [
      "studio chụp ảnh thương mại",
      "chụp lookbook",
      "chụp campaign",
      "chụp ảnh sản phẩm",
      "commercial photography",
      "DONLY Studio",
    ],
    [
      "commercial photography studio",
      "lookbook photography",
      "campaign photography",
      "product photography",
      "fashion photography Vietnam",
      "DONLY Studio",
    ],
  ),

  // Dùng cho dòng meta ở hero: "EST. 2019 — TP. HỒ CHÍ MINH"
  established: "2019",

  email: "hello@donly.studio",
  phone: "+84 90 123 4567",
  phoneHref: "+84901234567",

  address: {
    street: t("27 Nguyễn Văn Thủ, Phường Đa Kao", "27 Nguyen Van Thu, Da Kao Ward"),
    district: t("Quận 1", "District 1"),
    city: t("TP. Hồ Chí Minh", "Ho Chi Minh City"),
    country: t("Việt Nam", "Vietnam"),
  },

  hours: t("Thứ Hai – Thứ Bảy, 09:00 – 18:00", "Monday – Saturday, 09:00 – 18:00"),

  social: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Behance", href: "https://behance.net" },
  ],
};

/*
  Thanh điều hướng — nhãn giữ tiếng Anh ở cả hai bản.
  Đây là lựa chọn có chủ đích: tên section trong guideline (Works, Services, About, Contact)
  vốn là tiếng Anh, và giữ nguyên giúp thanh nav không đổi độ rộng khi chuyển ngôn ngữ.
  href là đường dẫn KHÔNG có tiền tố ngôn ngữ — mỗi nơi dùng sẽ tự ghép /vi hoặc /en.
*/
export const nav = [
  { label: "Works", href: "/works" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
