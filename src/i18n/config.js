/*
  Cấu hình đa ngôn ngữ.

  Ngôn ngữ nằm ngay trong đường dẫn (/vi/works, /en/works) chứ không phải trong state ở client.
  Lý do: bản tiếng Anh cần có URL riêng để Google index được. Nếu chỉ đổi ngôn ngữ bằng
  JavaScript thì với công cụ tìm kiếm, site này chỉ tồn tại một thứ tiếng — mất đúng cái lợi
  mà vì nó chúng ta chọn Next.js ngay từ đầu.
*/

export const locales = ["vi", "en"];

export const defaultLocale = "vi";

// Dùng cho thẻ <html lang> và og:locale
export const localeMeta = {
  vi: { htmlLang: "vi", ogLocale: "vi_VN", label: "Tiếng Việt", short: "VI" },
  en: { htmlLang: "en", ogLocale: "en_US", label: "English", short: "EN" },
};

export function isLocale(value) {
  return locales.includes(value);
}

/* Ngôn ngữ còn lại — dùng cho nút chuyển đổi (chỉ có hai thứ tiếng) */
export function otherLocale(locale) {
  return locale === "vi" ? "en" : "vi";
}

/*
  Đổi tiền tố ngôn ngữ của một đường dẫn, giữ nguyên phần còn lại.
  /vi/works/aure-resort-25 → /en/works/aure-resort-25
  Nhờ vậy người dùng đổi ngôn ngữ mà vẫn ở đúng trang đang đọc, không bị đá về trang chủ.
*/
/*
  Khối alternates cho metadata của từng trang.

  canonical nói với Google "đây là bản chính thức của URL này", còn languages sinh ra thẻ
  hreflang trỏ chéo giữa hai bản. Thiếu hreflang, Google có thể coi bản vi và bản en là
  hai trang trùng nội dung và tự chọn bỏ bớt một bản khỏi kết quả tìm kiếm.

  x-default trỏ về bản tiếng Việt — đó là bản mặc định khi không khớp ngôn ngữ nào.
*/
export function alternatesFor(locale, path = "") {
  return {
    canonical: `/${locale}${path}`,
    languages: {
      vi: `/vi${path}`,
      en: `/en${path}`,
      "x-default": `/vi${path}`,
    },
  };
}

export function switchLocalePath(pathname, nextLocale) {
  const segments = String(pathname || "/").split("/").filter(Boolean);

  if (isLocale(segments[0])) {
    segments[0] = nextLocale;
  } else {
    segments.unshift(nextLocale);
  }

  return `/${segments.join("/")}`;
}
