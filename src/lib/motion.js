/*
  Hằng số chuyển động dùng chung.

  Tính cách thương hiệu là "điềm tĩnh, tinh tế" nên mọi chuyển động đều theo một quy tắc:
  đi nhanh lúc đầu rồi trôi chậm về đích (expo-out), quãng đường ngắn, không nảy, không xoay.
  Không có hiệu ứng nào kéo dài quá 1.2s.
*/

// Expo-out — dùng cho reveal khi cuộn
export const EASE = [0.16, 1, 0.3, 1];

// Mềm hơn — dùng cho hover và chuyển trạng thái ngắn
export const EASE_SOFT = [0.22, 0.61, 0.36, 1];

export const DURATION = {
  fast: 0.4,
  base: 0.8,
  slow: 1.1,
};

// Khoảng cách trồi lên mặc định khi phần tử vào khung nhìn
export const RISE = 28;

// Độ trễ giữa các phần tử trong cùng một nhóm
export const STAGGER = 0.08;

// Rèm ảnh kéo lên: che kín từ dưới → mở hết
export const CURTAIN = {
  hidden: { clipPath: "inset(0% 0% 100% 0%)" },
  visible: { clipPath: "inset(0% 0% 0% 0%)" },
};

// Ngưỡng phần tử lộ ra trước khi kích hoạt animation
export const VIEWPORT = { once: true, amount: 0.2 };
export const VIEWPORT_EARLY = { once: true, amount: 0.05 };
