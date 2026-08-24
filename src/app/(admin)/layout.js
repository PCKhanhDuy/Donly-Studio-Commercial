import { Merriweather, Montserrat, Roboto } from "next/font/google";
import "../globals.css";

/*
  ROOT LAYOUT RIÊNG CHO KHU QUẢN TRỊ.

  Site có HAI root layout, tách bằng route group:
    app/(site)/[locale]/layout.js   — trang công khai, <html lang> đổi theo ngôn ngữ
    app/(admin)/layout.js           — khu quản trị, luôn tiếng Việt

  Phải tách vì root layout của trang công khai nằm trong segment động [locale]: mọi thứ
  bên dưới nó đều bị coi là một ngôn ngữ, nên /admin sẽ bị hiểu thành locale "admin" rồi
  rơi vào notFound(). Đưa admin sang một group khác thì nó có root layout của riêng mình
  và không đi qua tầng ngôn ngữ nữa.

  Khu này không có smooth scroll, không animation, không header/footer của site — nó là
  công cụ làm việc, không phải trang giới thiệu.
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

const roboto = Roboto({
  subsets: ["latin", "vietnamese"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata = {
  title: "Quản trị — DONLY",
  // Khu quản trị không bao giờ được lọt vào kết quả tìm kiếm
  robots: { index: false, follow: false },
};

export const viewport = { themeColor: "#0d0d0d" };

export default function AdminLayout({ children }) {
  return (
    <html
      lang="vi"
      className={`${merriweather.variable} ${montserrat.variable} ${roboto.variable}`}
    >
      <body className="min-h-svh bg-surface text-fg antialiased">{children}</body>
    </html>
  );
}
