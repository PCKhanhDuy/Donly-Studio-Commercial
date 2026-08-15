/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    /*
      Root layout của site nằm trong segment động app/[locale]/layout.js (để đặt được
      <html lang> đúng theo ngôn ngữ). Khi root layout nằm trong segment động thì
      app/not-found.js không có layout để dựng lên, nên trang 404 cho URL không khớp
      route nào phải khai báo riêng ở app/global-not-found.js — cờ này bật nó lên.
    */
    globalNotFound: true,
  },

  async redirects() {
    /*
      Mọi trang đều có tiền tố ngôn ngữ (/vi, /en). Các đường dẫn cũ không tiền tố
      được đưa về bản tiếng Việt. Chỉ liệt kê đúng những route đã tồn tại —
      không dùng pattern bắt tất cả, vì redirect chạy TRƯỚC khi Next tìm file tĩnh
      và sẽ nuốt luôn cả /logo/*.png, /placeholder/*.jpg.
    */
    const paths = ["/works", "/services", "/about", "/contact"];

    return [
      { source: "/", destination: "/vi", permanent: false },
      { source: "/works/:slug", destination: "/vi/works/:slug", permanent: false },
      ...paths.map((path) => ({
        source: path,
        destination: `/vi${path}`,
        permanent: false,
      })),
    ];
  },
};

export default nextConfig;
