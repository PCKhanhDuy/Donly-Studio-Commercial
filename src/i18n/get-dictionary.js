import { defaultLocale, isLocale } from "@/i18n/config";
import vi from "@/i18n/dictionaries/vi";
import en from "@/i18n/dictionaries/en";

const dictionaries = { vi, en };

/*
  Trả về từ điển của một ngôn ngữ.

  Cả hai từ điển đều được nạp tĩnh (không dynamic import) vì tổng dung lượng chỉ vài KB
  và site chỉ có hai thứ tiếng — tách bundle ở quy mô này chỉ thêm phức tạp mà không
  tiết kiệm được gì đáng kể. Đổi lại, từ điển dùng được ở cả server lẫn client component
  mà không cần await.
*/
export function getDictionary(locale) {
  return dictionaries[isLocale(locale) ? locale : defaultLocale];
}
