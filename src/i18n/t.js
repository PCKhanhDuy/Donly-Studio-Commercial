import { defaultLocale } from "@/i18n/config";

/*
  Hai hàm nhỏ để nhúng bản dịch ngay cạnh bản gốc trong file dữ liệu.

    title: t("Bộ gốm mộc", "Raw-glaze ceramics")   ← chuỗi có dịch
    client: "AURE"                                  ← chuỗi không cần dịch, để nguyên

  Cách này thay cho việc nhân đôi toàn bộ file dữ liệu ra hai bản vi/en. Nhân đôi file
  nghe thì gọn, nhưng chỉ cần sửa một bên là hai bản lệch nhau về cấu trúc (thiếu ảnh,
  sai tỷ lệ, lệch số phần tử) — lỗi rất khó thấy. Ở đây cấu trúc chỉ tồn tại một bản.
*/

export function t(vi, en) {
  return { vi, en };
}

/* Lấy đúng ngôn ngữ; chuỗi thường và mảng đi qua nguyên vẹn */
export function tr(value, locale = defaultLocale) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value[locale] ?? value[defaultLocale] ?? "";
  }
  return value;
}

/* Dịch cả mảng — dùng cho danh sách hạng mục bàn giao, scope dự án… */
export function trList(list, locale = defaultLocale) {
  if (!Array.isArray(list)) return [];
  return list.map((item) => tr(item, locale));
}
