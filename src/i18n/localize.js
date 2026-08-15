import { defaultLocale } from "@/i18n/config";

/*
  Duyệt sâu một cấu trúc dữ liệu và thay MỌI ô t("vi", "en") bằng chuỗi của đúng ngôn ngữ.

  Nhờ hàm này, các trang chỉ cần gọi localize(works, locale) MỘT lần ở đầu, rồi mọi
  component phía dưới nhận về chuỗi thường — không component nào phải biết tới i18n,
  không phải truyền locale xuống từng cấp chỉ để dịch một cái alt của ảnh.

  Nhận diện ô dịch: object có ĐÚNG hai khoá "vi" và "en". Dữ liệu thật trong site
  không có object nào trùng hình dạng đó, nên không thể nhầm.
*/

function isTranslation(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const keys = Object.keys(value);
  return keys.length === 2 && keys.includes("vi") && keys.includes("en");
}

export function localize(value, locale = defaultLocale) {
  if (isTranslation(value)) {
    return value[locale] ?? value[defaultLocale];
  }

  if (Array.isArray(value)) {
    return value.map((item) => localize(item, locale));
  }

  if (value && typeof value === "object") {
    const result = {};
    for (const [key, item] of Object.entries(value)) {
      result[key] = localize(item, locale);
    }
    return result;
  }

  return value;
}
