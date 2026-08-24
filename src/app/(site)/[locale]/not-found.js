"use client";

import { usePathname } from "next/navigation";
import Container from "@/components/container";
import { CtaLink } from "@/components/cta";
import { defaultLocale, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

/*
  Trang 404 cho các lỗi notFound() xảy ra BÊN TRONG một ngôn ngữ
  (ví dụ /vi/works/slug-khong-ton-tai).

  Next không truyền params vào not-found.js, nên ngôn ngữ được đọc từ đường dẫn hiện tại.
  Đây cũng là lý do component này chạy phía client.

  Trang 404 cho URL không khớp bất kỳ route nào nằm ở app/global-not-found.js.
*/
export default function NotFound() {
  const pathname = usePathname();
  const segment = String(pathname || "").split("/").filter(Boolean)[0];
  const locale = isLocale(segment) ? segment : defaultLocale;
  const dict = getDictionary(locale);

  return (
    <section className="flex min-h-[70svh] items-center pt-24">
      <Container className="py-20">
        <span className="label text-fg-mute">{dict.notFound.label}</span>

        <h1 className="mt-6 max-w-2xl font-display text-[2.5rem] leading-[1.08] font-bold tracking-tight md:text-5xl">
          {dict.notFound.title}
        </h1>

        <p className="mt-8 max-w-lg leading-relaxed text-fg/70">{dict.notFound.body}</p>

        <div className="mt-12 flex flex-wrap gap-4">
          <CtaLink href={`/${locale}`}>{dict.notFound.home}</CtaLink>
          <CtaLink href={`/${locale}/works`} variant="outline">
            {dict.notFound.works}
          </CtaLink>
        </div>
      </Container>
    </section>
  );
}
