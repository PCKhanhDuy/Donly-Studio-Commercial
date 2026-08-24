import { site } from "@/lib/site";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      /*
        Khu quản trị đã có thẻ noindex trong metadata, nhưng chặn thêm ở đây để công cụ
        tìm kiếm không tốn lượt quét vào một khu chỉ trả về trang đăng nhập. Hai lớp này
        bổ sung cho nhau: robots.txt ngăn quét, noindex ngăn hiện trong kết quả.
      */
      disallow: "/admin",
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
