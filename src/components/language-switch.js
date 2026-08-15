"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeMeta, switchLocalePath } from "@/i18n/config";

/*
  Nút chuyển ngôn ngữ: VI / EN.

  Là <Link> thật chứ không phải nút JavaScript — nghĩa là mỗi ngôn ngữ có một URL riêng,
  mở tab mới được, gửi link cho người khác được, và Google index được cả hai bản.

  switchLocalePath chỉ thay đoạn ngôn ngữ ở đầu đường dẫn và giữ nguyên phần còn lại,
  nên người dùng đang đọc case study nào thì đổi ngôn ngữ vẫn ở đúng case study đó,
  không bị đá về trang chủ.

  hreflang trên mỗi link giúp công cụ tìm kiếm hiểu quan hệ giữa hai bản.
*/
export default function LanguageSwitch({ locale, className = "", tone = "auto" }) {
  const pathname = usePathname();

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {locales.map((code, index) => {
        const active = code === locale;

        return (
          <span key={code} className="flex items-center gap-2">
            {index > 0 ? (
              <span aria-hidden="true" className="opacity-30">
                /
              </span>
            ) : null}

            {active ? (
              <span aria-current="true" className="label">
                {localeMeta[code].short}
              </span>
            ) : (
              <Link
                href={switchLocalePath(pathname, code)}
                hrefLang={code}
                aria-label={localeMeta[code].label}
                className={`label transition-opacity duration-300 ease-soft hover:opacity-100 ${
                  tone === "paper" ? "opacity-50" : "opacity-40"
                }`}
              >
                {localeMeta[code].short}
              </Link>
            )}
          </span>
        );
      })}
    </div>
  );
}
