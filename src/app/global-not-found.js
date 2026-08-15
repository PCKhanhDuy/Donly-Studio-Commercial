import Link from "next/link";
import { Merriweather, Montserrat } from "next/font/google";
import "./globals.css";
import { defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

/*
  Trang 404 cho URL không khớp BẤT KỲ route nào (ví dụ /khong-ton-tai, /fr/works).

  Vì root layout của site nằm trong segment động app/[locale]/layout.js, Next không có
  layout nào để dựng trang 404 toàn cục — nên file này phải tự trả về một tài liệu HTML
  đầy đủ, tự import CSS và font của riêng nó.

  Cố tình để nhẹ: chỉ nạp 2 font thay vì 3, không header, không footer, không JavaScript
  animation. Người dùng vào đây là đang lạc đường — thứ họ cần là một lối ra rõ ràng,
  không phải một màn trình diễn.

  Trang này không biết người dùng muốn đọc thứ tiếng nào nên hiển thị song ngữ.
*/

const merriweather = Merriweather({
  subsets: ["latin", "vietnamese"],
  variable: "--font-merriweather",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin", "vietnamese"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata = {
  title: "404",
};

export default function GlobalNotFound() {
  const vi = getDictionary("vi").notFound;
  const en = getDictionary("en").notFound;

  return (
    <html lang={defaultLocale} className={`${merriweather.variable} ${montserrat.variable}`}>
      <body className="flex min-h-svh flex-col items-start justify-center bg-paper px-5 py-20 text-ink md:px-20">
        <span className="label text-mute">404</span>

        <h1 className="mt-6 max-w-2xl font-display text-[2.5rem] leading-[1.08] font-bold tracking-tight md:text-5xl">
          {vi.title}
        </h1>
        <p className="mt-4 max-w-2xl font-display text-xl italic text-mute md:text-2xl">
          {en.title}
        </p>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href="/vi"
            className="border border-ink bg-ink px-6 py-3.5 font-ui text-[0.9375rem] text-paper transition-colors duration-300 hover:bg-paper hover:text-ink"
          >
            {vi.home}
          </Link>
          <Link
            href="/en"
            className="border border-ink px-6 py-3.5 font-ui text-[0.9375rem] transition-colors duration-300 hover:bg-ink hover:text-paper"
          >
            {en.home}
          </Link>
        </div>
      </body>
    </html>
  );
}
