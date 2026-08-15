import Image from "next/image";

/*
  Wordmark DONLY.

  Kích thước truyền vào next/image là kích thước pixel THẬT của file
  (file đặt tên 600x200 nhưng thực tế là 600×180) — sai số này sẽ làm logo bị bóp méo,
  điều guideline cấm tuyệt đối. Luôn chỉnh kích thước bằng class chiều cao + w-auto.
*/

const ASSETS = {
  "full-ink": { src: "/logo/Donly-Logo-Black-600x200.png", width: 600, height: 180 },
  "full-paper": { src: "/logo/Donly-Logo-White-600x200.png", width: 600, height: 180 },
  "mark-ink": { src: "/logo/Donly-Logo-Black-short-400x400.png", width: 400, height: 400 },
  "mark-paper": { src: "/logo/Donly-Logo-White-short-400x400.png", width: 400, height: 400 },
};

export default function Logo({
  shape = "full", // "full" = wordmark DONLY · "mark" = chữ D
  tone = "ink", // "ink" = logo đen (dùng trên nền sáng) · "paper" = logo trắng (nền tối)
  className = "h-5 w-auto",
  // Next 16 đã bỏ prop `priority` của next/image, thay bằng `preload`.
  preload = false,
  // Cho phép ép eager mà KHÔNG preload — dùng cho ảnh dưới màn hình đầu nhưng
  // trùng URL với ảnh đã preload ở trên (tải lại là trúng cache, không tốn gì).
  loading,
}) {
  const asset = ASSETS[`${shape}-${tone}`] ?? ASSETS["full-ink"];

  return (
    <Image
      src={asset.src}
      width={asset.width}
      height={asset.height}
      alt="DONLY Studio Commercial"
      preload={preload}
      loading={loading}
      className={className}
    />
  );
}
